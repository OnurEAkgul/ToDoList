using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework.Configurations
{
    public class AdminUserConfig : IEntityTypeConfiguration<IdentityUser>
    {
        public void Configure(EntityTypeBuilder<IdentityUser> builder)
        {
            var AdminUserId = "4795ef64-44c4-434e-8f6a-3d614bb9373a";

            var AdminUser = new IdentityUser
            {
                Id = AdminUserId,
                Email = "admin@todo.com",
                NormalizedEmail = "admin@todo.com".ToUpper(),
                UserName = "admin@todo.com",
                NormalizedUserName = "admin@todo.com".ToUpper(),
            };
            AdminUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(AdminUser, "123456");
            builder.HasData(AdminUser);

        }
    }

}
