using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Concrete.EntityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        private readonly UserDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UserManager(UserManager<IdentityUser> userManager,UserDbContext dbContext)
        {
            _userManager = userManager;
            _context = dbContext;
        }
        public async Task<IResult> SignUpAsync(IdentityUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            return result.Succeeded
                ? new SuccessResult("User registered successfully.")
                : new ErrorResult(string.Join(", ", "Kayıt oluşturma hatası"));
        }

        public async Task<IDataResult<IdentityUser>> LoginAsync(string email, string password, string username)
        {
            IdentityUser user = null;
            if (!string.IsNullOrEmpty(email))
            {
                user = await _userManager.FindByEmailAsync(email);
            }

            // If user is not found by email, try finding by username
            if (user == null && !string.IsNullOrEmpty(username))
            {
                user = await _userManager.FindByNameAsync(username);
            }
            if (user != null && await _userManager.CheckPasswordAsync(user, password))
            {
                return new SuccessDataResult<IdentityUser>(user, "Login successful.");
            }

            return new ErrorDataResult<IdentityUser>(null, "Invalid email or password.");
        }

        public async Task<IResult> UpdateUserAsync(IdentityUser user)
        {
            if (user == null)
            {
                return new ErrorResult("User not found.");
            }
            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded
                ? new SuccessResult("User updated successfully.")
                : new ErrorResult(string.Join(", ", "Kullanıcı güncelleme hatası"));
        }

        public async Task<IResult> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return new ErrorResult("User not found.");
            }

            var result = await _userManager.DeleteAsync(user);

            return result.Succeeded
                ? new SuccessResult("User deleted successfully.")
                : new ErrorResult(string.Join(", ","Kullanıcı silme hatası"));
        }

        public async Task<IDataResult<IdentityUser>> GetUserByNameAsync(string name)
        {
            var user = await _userManager.FindByNameAsync(name);

            return user != null
                ? new SuccessDataResult<IdentityUser>(user, "User retrieved successfully.")
                : new ErrorDataResult<IdentityUser>(null, "User not found.");
        }
        public async Task<IDataResult<IdentityUser>> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            return user != null
                ? new SuccessDataResult<IdentityUser>(user, "User retrieved successfully.")
                : new ErrorDataResult<IdentityUser>(null, "User not found.");
        }

        public async Task<IDataResult<IdentityUser>> GetUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user != null
                ? new SuccessDataResult<IdentityUser>(user, "User retrieved successfully.")
                : new ErrorDataResult<IdentityUser>(null, "User not found.");
        }

        public async Task<IDataResult<List<IdentityUser>>> GetAllUsersAsync()
        {
            var users = await Task.Run(() => _userManager.Users.ToList());

            return new SuccessDataResult<List<IdentityUser>>(users, "Users retrieved successfully.");
        }

        public async Task<List<string>> GetRolesAsync(IdentityUser user)
        {
            var roles = await _userManager.GetRolesAsync(user) as List<string>;

            if (roles == null || roles.Count == 0)
            {
                // If the user doesn't have any roles assigned directly, check for roles through user's role claims
                var roleClaims = await _userManager.GetClaimsAsync(user);

                roles = roleClaims
                    .Where(c => c.Type == ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList();
            }

            return roles;
        }

        public async Task<IResult> AddToRoleAsync(IdentityUser user, string role)
        {
            try
            {
                var result = await _userManager.AddToRoleAsync(user, role);

                if (result.Succeeded)
                {
                    return new SuccessResult($"User added to the {role} role successfully.");
                }
                else
                {
                    // If there are any errors during role assignment, return the error messages
                    var errors = result.Errors.Select(e => e.Description).ToList();
                    return new ErrorResult(string.Join(", ", errors));
                }
            }
            catch (Exception ex)
            {
                return new ErrorResult(ex.Message);
            }
        }
    }
}
