using Azure.Core;
using Business.Abstract;
using Business.Concrete;
using Core.Utilities.Results;
using DataAccess.Concrete.EntityFramework;
using DataAccess.Domains; // Adjust this namespace based on your actual structure
using DataAccess.DTOs.Users; // Adjust this namespace based on your actual structure
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Presentation.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UsersController(IUserService userService, UserManager<IdentityUser> userManager, ITokenService tokenService, UserDbContext dbContext)
        {
            _userService = userService;
            _userManager = userManager;
            _tokenService = tokenService;
            _userDbContext = dbContext;
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpDTO request)
        {
            // Check if the request is valid
            if (request == null)
            {
                return BadRequest("Invalid request");
            }

            var user = new IdentityUser
            {
                UserName = request.UserName.Trim(),
                Email = request.Email.Trim(),
            };

            var existingUserMailResult = await _userService.GetUserByEmailAsync(request.Email);

            if (existingUserMailResult.Success && existingUserMailResult.Data != null)
            {
                ModelState.AddModelError("hata", "E-posta zaten kullanılıyor");
                return ValidationProblem(ModelState);
            }

            // Check if a user with the same username already exists
            var existingUserNameResult = await _userService.GetUserByNameAsync(request.UserName);

            if (existingUserNameResult.Success && existingUserNameResult.Data != null)
            {
                ModelState.AddModelError("hata", "Kullanıcı adı zaten kullanılıyor");
                return ValidationProblem(ModelState);
            }

            var result = await _userService.SignUpAsync(user, request.Password);

            if (!result.Success)
            {
                // Log the errors
                foreach (var error in result.Message)
                {
                    Console.WriteLine($"Error during sign-up: {error.ToString()}");
                }

                return BadRequest(result.Message);
            }

            // Assign the "User" role to the user upon successful creation
            var roleResult = await _userService.AddToRoleAsync(user, "userRole");

            if (!roleResult.Success)
            {
                // Log the errors during role assignment
                foreach (var error in roleResult.Message)
                {
                    Console.WriteLine($"Error during role assignment: {error.ToString()}");
                }

                return BadRequest($"Role assignment failed. {roleResult.Message}");
            }

            return Ok(request);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO request)
        {
            var result= await _userService.LoginAsync(request.Email, request.Password, request.UserName);
        
            if (!result.Success)
            {
                return BadRequest("Hatalı giriş");

            }
            var user = result.Data;

            // Generate JWT token
            var tokenResult = await _tokenService.CreateJwtTokenAsync(user, await _userService.GetRolesAsync(user),request.RememberMe);

            var roles = await _userService.GetRolesAsync(user);
            var validateToken = await _tokenService.ValidateTokenAsync(tokenResult.Data);
            if (!validateToken.Success)
            {
                return ValidationProblem("Token doğrulama hatası") ;
            }
            if (tokenResult.Success)
            {

                var token = tokenResult.Data;

                var respone = new UserLoginResponeDTO
                {
                    Token = token,

                };

                // Include the token in the response
                return Ok(respone);
            }

            return BadRequest($"Token generation failed. {tokenResult.Message}"); ;
        }

        [HttpPut]
        [Authorize(Roles = "userRole")]
        [Route("Update/{UserId}")]
        public async Task<IActionResult> UpdateUser([FromRoute] string UserId, UserUpdateDTO userUpdateDTO)
        {

            // İstek geçerli değilse BadRequest döndür
            if (userUpdateDTO == null)
            {
                return BadRequest("Geçersiz istek");
            }

            using (var Transaction = await _userDbContext.Database.BeginTransactionAsync())
            {

                try
                {
                    var identityUser = await _userManager.FindByIdAsync(UserId);

                    if (identityUser == null)
                    {
                        return NotFound();
                    }

                    bool isAdmin = await _userManager.IsInRoleAsync(identityUser, "adminRole");

                    if (!isAdmin || (isAdmin && string.IsNullOrEmpty(userUpdateDTO.NewPassword)))
                    {
                        if (!await _userManager.CheckPasswordAsync(identityUser, userUpdateDTO.CurrentPassword))
                        {
                            return BadRequest("Yanlış şifre girdiniz");
                        }
                    }

                    if (!string.IsNullOrEmpty(userUpdateDTO.NewPassword))
                    {
                        // Update the existing IdentityUser with the new information
                        identityUser.UserName = userUpdateDTO.UserName;
                        identityUser.Email = userUpdateDTO.Email;
                        identityUser.NormalizedEmail = userUpdateDTO.Email.Trim().ToUpper();
                        identityUser.NormalizedUserName = userUpdateDTO.UserName.Trim().ToUpper();
                        identityUser.PasswordHash = _userManager.PasswordHasher.HashPassword(identityUser, userUpdateDTO.NewPassword);

                        var result = await _userService.UpdateUserAsync(identityUser);

                        if (!result.Success)
                        {
                            throw new Exception(result.Message);
                        }
                    }
                    else
                    {
                        // Update the existing IdentityUser with the new information
                        identityUser.UserName = userUpdateDTO.UserName;
                        identityUser.Email = userUpdateDTO.Email;
                        identityUser.NormalizedEmail = userUpdateDTO.Email.Trim().ToUpper();
                        identityUser.NormalizedUserName = userUpdateDTO.UserName.Trim().ToUpper();

                        var result = await _userService.UpdateUserAsync(identityUser);

                        if (!result.Success)
                        {
                            throw new Exception(result.Message);
                        }
                    }

                    await Transaction.CommitAsync();

                    return Ok(userUpdateDTO);
                }
                catch (Exception ex)
                {
                    await Transaction.RollbackAsync();
                    throw;
                }
            }
        }

        [HttpDelete]
        [Authorize(Roles = "userRole")]
        [Route("DeleteUser/{UserId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string UserId)
        {
            var result = await _userService.DeleteUserAsync(UserId);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }


        [HttpGet("getAllUsers")]
        [Authorize(Roles ="adminRole")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllUsersAsync();

           
            if (result.Success)
            {
                // Perform the conversion from IdentityUser to UserDTO here if needed
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("GetUserById/{UserId}")]
        public async Task<IActionResult> GetUserById([FromRoute] string UserId)
        {

            var result = await _userService.GetUserByIdAsync(UserId);
            if (result.Success)
            {
                var response = new UserInfoDTO
                {

                    Email = result.Data.Email,
                    UserId = result.Data.Id,
                    UserName = result.Data.UserName,

                };
                // Perform the conversion from IdentityUser to UserDTO here if needed
                return Ok(response);
            }
            return BadRequest(result.Message);
        }
    }

}
