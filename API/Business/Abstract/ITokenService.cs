using Core.Utilities.Results;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITokenService
    {
        Task<IDataResult<string>> CreateJwtTokenAsync(IdentityUser user, List<string> roles,bool rememberMe);
        Task<IDataResult<bool>> ValidateTokenAsync(string token);
    }
}
