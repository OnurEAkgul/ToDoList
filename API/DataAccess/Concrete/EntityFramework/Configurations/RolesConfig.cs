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
    public class RolesConfig : IEntityTypeConfiguration<IdentityRole>
    {

        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            var UserRoleId = "afc66ff4-b07e-46e1-b388-e8fdcf1067d4";
            var AdminRoleId = "2b62112c-3386-45e1-9dee-5beeaf31b9eb";

            var Roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = UserRoleId,
                    Name = "userRole",
                    NormalizedName = "userRole".ToUpper(),
                    ConcurrencyStamp = UserRoleId
                },
                new IdentityRole()
                {
                    Id = AdminRoleId,
                    Name = "adminRole",
                    NormalizedName = "adminRole".ToUpper(),
                    ConcurrencyStamp = AdminRoleId
                }
            };
            builder.HasData(Roles);
        }
    }
}
