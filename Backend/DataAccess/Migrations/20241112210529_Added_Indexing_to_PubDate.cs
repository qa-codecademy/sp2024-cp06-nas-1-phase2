using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class Added_Indexing_to_PubDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PubDateParsed",
                table: "Articles");

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

            migrationBuilder.CreateIndex(
                name: "IX_Articles_PubDate",
                table: "Articles",
                column: "PubDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Articles_PubDate",
                table: "Articles");

            migrationBuilder.AddColumn<DateTime>(
                name: "PubDateParsed",
                table: "Articles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 21, 39, 25, 342, DateTimeKind.Local).AddTicks(6123));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 21, 39, 25, 342, DateTimeKind.Local).AddTicks(6184));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 21, 39, 25, 342, DateTimeKind.Local).AddTicks(6187));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 21, 39, 25, 342, DateTimeKind.Local).AddTicks(6194));

            migrationBuilder.UpdateData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedOn",
                value: new DateTime(2024, 11, 12, 21, 39, 25, 342, DateTimeKind.Local).AddTicks(6197));
        }
    }
}
