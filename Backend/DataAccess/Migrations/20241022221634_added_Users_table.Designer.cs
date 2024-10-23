﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(NewsAggregatorDbContext))]
    [Migration("20241022221634_added_Users_table")]
    partial class added_Users_table
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.33")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DomainModels.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FeedUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("PubDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RssFeedId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UrlToImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RssFeedId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("DomainModels.RssFeed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Attribute")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FeedUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("PubDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Query")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Regex")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SourceUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("RssFeeds");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Attribute = "url",
                            Author = "author",
                            CreatedOn = new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4336),
                            Description = "description",
                            FeedUrl = "https://mia.mk/feed",
                            Link = "link",
                            ModifiedOn = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PubDate = "pubDate",
                            Query = "enclosure",
                            Source = "MIA",
                            SourceUrl = "https://mia.mk",
                            Title = "title"
                        },
                        new
                        {
                            Id = 2,
                            Author = "dc:creator",
                            CreatedOn = new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4454),
                            Description = "content:encoded",
                            FeedUrl = "https://telma.com.mk/feed/",
                            Link = "link",
                            ModifiedOn = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PubDate = "pubDate",
                            Query = "content:encoded",
                            Regex = "<img[^>]*src=\\\"([^\\\"]*)\\\"",
                            Source = "Telma",
                            SourceUrl = "https://telma.com.mk",
                            Title = "title"
                        },
                        new
                        {
                            Id = 3,
                            Attribute = "src",
                            Author = "",
                            CreatedOn = new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4457),
                            Description = "content",
                            FeedUrl = "https://admin.24.mk/api/rss.xml",
                            Link = "link",
                            ModifiedOn = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PubDate = "pubDate",
                            Query = "img",
                            Source = "24Vesti",
                            SourceUrl = "https://24.mk",
                            Title = "title"
                        },
                        new
                        {
                            Id = 4,
                            Author = "dc:creator",
                            CreatedOn = new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4460),
                            Description = "description",
                            FeedUrl = "https://sitel.com.mk/rss.xml",
                            Link = "link",
                            ModifiedOn = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PubDate = "pubDate",
                            Query = "description",
                            Regex = "<img[^>]*src=\\\"([^\\\"]*)\\\"",
                            Source = "Sitel",
                            SourceUrl = "https://sitel.com.mk",
                            Title = "title"
                        },
                        new
                        {
                            Id = 5,
                            Author = "author",
                            CreatedOn = new DateTime(2024, 10, 23, 0, 16, 33, 362, DateTimeKind.Local).AddTicks(4463),
                            Description = "content",
                            FeedUrl = "https://kanal5.com.mk/rss.aspx",
                            Link = "link",
                            ModifiedOn = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PubDate = "pubDate",
                            Query = "thumbnail",
                            Source = "Kanal5",
                            SourceUrl = "https://kanal5.com.mk",
                            Title = "title"
                        });
                });

            modelBuilder.Entity("DomainModels.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DomainModels.Article", b =>
                {
                    b.HasOne("DomainModels.RssFeed", "RssFeed")
                        .WithMany("Articles")
                        .HasForeignKey("RssFeedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RssFeed");
                });

            modelBuilder.Entity("DomainModels.RssFeed", b =>
                {
                    b.Navigation("Articles");
                });
#pragma warning restore 612, 618
        }
    }
}
