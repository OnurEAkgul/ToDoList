using Business.Abstract;
using Core.Utilities.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class TokenManager : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IDataResult<string>> CreateJwtTokenAsync(IdentityUser user, List<string> roles, bool rememberMe)
        {
            try
            {
                var identityUser = user as IdentityUser;

                var tokenHandler = new JwtSecurityTokenHandler();

                // JWT için kullanılacak anahtarı byte dizisine çevir
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                // JWT token'da bulunacak talepleri tanımla
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, identityUser.UserName), // Kullanıcı adını içeren talep
                    new Claim(ClaimTypes.Email, identityUser.Email), // E-postayı içeren talep
                    new Claim(ClaimTypes.NameIdentifier, identityUser.Id)
                };

                // Rolleri taleplere ekle
                claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

                // JWT token parametrelerini belirle
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    Subject = new ClaimsIdentity(claims),
                    Expires = rememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.UtcNow.AddMinutes(15),
                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                };

                // Token oluştur
                var token = tokenHandler.CreateToken(tokenDescriptor);

                // Token'ı string olarak döndür
                var tokenString = tokenHandler.WriteToken(token);

                return new SuccessDataResult<string>(tokenString, "JWT token başarıyla oluşturuldu.");
            }
            catch (Exception ex)
            {
                return new ErrorDataResult<string>(ex.Message);
            }
        }

        public async Task<IDataResult<bool>> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                // Token doğrulama parametrelerini belirle
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false, // İstekte bulunana özel duruma göre bu değerleri ayarlayabilirsiniz
                    ValidateAudience = false, // İstekte bulunana özel duruma göre bu değerleri ayarlayabilirsiniz
                    RequireExpirationTime = true,
                    ValidateLifetime = true
                };

                // Token'ı doğrula
                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                // İsteğe bağlı olarak, taleplerden bilgi çıkartabilirsiniz
                var userId = principal.FindFirst(ClaimTypes.Name)?.Value;

                // Token geçerli
                return new SuccessDataResult<bool>(true, "Token geçerli.");
            }
            catch (SecurityTokenException ex)
            {
                // Token doğrulama başarısız oldu
                return new ErrorDataResult<bool>(false, ex.Message);
            }
            catch (Exception ex)
            {
                // Diğer hatalar
                return new ErrorDataResult<bool>(false, ex.Message);
            }
        }
    }
}
