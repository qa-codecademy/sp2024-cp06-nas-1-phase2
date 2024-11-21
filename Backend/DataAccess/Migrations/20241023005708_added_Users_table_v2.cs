﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class added_Users_table_v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "RssFeeds",
                keyColumn: "Id",
                keyValue: 5);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "RssFeeds",
                columns: new[] { "Id", "Attribute", "Author", "CreatedOn", "Description", "FeedUrl", "Link", "ModifiedOn", "PubDate", "Query", "Regex", "Source", "SourceUrl", "Title" },
                values: new object[,]
                {
                    { 1, "url", "author", new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4336), "description", "https://mia.mk/feed", "link", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "pubDate", "enclosure", null, "MIA", "https://mia.mk", "title" },
                    { 2, null, "dc:creator", new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4454), "content:encoded", "https://telma.com.mk/feed/", "link", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "pubDate", "content:encoded", "<img[^>]*src=\\\"([^\\\"]*)\\\"", "Telma", "https://telma.com.mk", "title" },
                    { 3, "src", "", new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4457), "content", "https://admin.24.mk/api/rss.xml", "link", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "pubDate", "img", null, "24Vesti", "https://24.mk", "title" },
                    { 4, null, "dc:creator", new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4460), "description", "https://sitel.com.mk/rss.xml", "link", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "pubDate", "description", "<img[^>]*src=\\\"([^\\\"]*)\\\"", "Sitel", "https://sitel.com.mk", "title" },
                    { 5, null, "author", new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4463), "content", "https://kanal5.com.mk/rss.aspx", "link", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "pubDate", "thumbnail", null, "Kanal5", "https://kanal5.com.mk", "title" }
                });
        }
    }
}
