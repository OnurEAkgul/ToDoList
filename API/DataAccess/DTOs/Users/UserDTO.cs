using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTOs.Users
{
    public class UserDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        // Add other properties if needed

        //public UserDTO(IdentityUser user, List<string> roles)
        //{
        //    UserId = user.Id;
        //    UserName = user.UserName;
        //    Email = user.Email;
        //    Roles = roles;

        //    // Map other properties as needed
        //}

    }
}
