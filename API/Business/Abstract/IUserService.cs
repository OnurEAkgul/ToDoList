using Core.Utilities.Results;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        Task<IResult> SignUpAsync(IdentityUser user, string password);
        Task<IDataResult<IdentityUser>> LoginAsync(string email, string password);
        Task<IResult> UpdateUserAsync(IdentityUser user);
        Task<IResult> DeleteUserAsync(string userId);
        Task<IDataResult<IdentityUser>> GetUserByNameAsync(string name);
        Task<IDataResult<IdentityUser>> GetUserByIdAsync(string userId);
        Task<IDataResult<IdentityUser>> GetUserByEmailAsync(string email);
        Task<IDataResult<List<IdentityUser>>> GetAllUsersAsync();
        Task<List<string>> GetRolesAsync(IdentityUser user);
        Task<IResult> AddToRoleAsync(IdentityUser user, string role);

    }
}
