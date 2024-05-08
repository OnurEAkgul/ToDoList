using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4588f2c9-1b1f-4539-97c2-f3ea5621a157", "AQAAAAIAAYagAAAAEBlJK2FmJaRucFY5vIEHZtHWjGmrIGSYxVKmbMEvkj/5uEj8Wl6RFxpte6bBlW1tCQ==", "f013f54f-c738-42d8-ac7b-70d8f5b2bbcd" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2a830e26-bb52-4e37-936a-eecdc40f9985", "AQAAAAIAAYagAAAAEIbH+//Eicl7R1y/zmqch1h1GlOZSJNtwp3sDpB22B97K7FrjztNsriM6xbglHU51g==", "8a41b8e0-48b1-4dd5-9d4b-c9fe22870333" });
        }
    }
}
