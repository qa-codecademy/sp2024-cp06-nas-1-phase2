using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class Removed_Unused_Properties_in_FeedbackModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Feedback");

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 13, 22, 19, 31, 957, DateTimeKind.Local).AddTicks(3751));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 13, 22, 19, 31, 957, DateTimeKind.Local).AddTicks(3808));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 13, 22, 19, 31, 957, DateTimeKind.Local).AddTicks(3813));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 13, 22, 19, 31, 957, DateTimeKind.Local).AddTicks(3819));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 13, 22, 19, 31, 957, DateTimeKind.Local).AddTicks(3822));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Feedback",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 22, 5, 29, 119, DateTimeKind.Local).AddTicks(1002));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 22, 5, 29, 119, DateTimeKind.Local).AddTicks(1067));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 22, 5, 29, 119, DateTimeKind.Local).AddTicks(1072));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 22, 5, 29, 119, DateTimeKind.Local).AddTicks(1078));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 22, 5, 29, 119, DateTimeKind.Local).AddTicks(1082));
        }
    }
}
