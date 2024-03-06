using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework.Configurations
{
    public class AdminRoleConfig : IEntityTypeConfiguration<IdentityUserRole<string>>
    {

        public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
        {

            builder.HasKey(ur => new { ur.UserId, ur.RoleId }); // Define the composite primary key


            var UserRoleId = "afc66ff4-b07e-46e1-b388-e8fdcf1067d4";
            var AdminRoleId = "2b62112c-3386-45e1-9dee-5beeaf31b9eb";
            var AdminUserId = "4795ef64-44c4-434e-8f6a-3d614bb9373a";
            var AdminRole = new List<IdentityUserRole<string>>
            {
                new()
                {
                    UserId=AdminUserId,
                    RoleId=AdminRoleId
                },
                new()
                {

                    UserId=AdminUserId,
                    RoleId=UserRoleId
                }
            };
            builder.HasData(AdminRole);
        }
    }
}
