using DomainModels;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class NewsAggregatorDbContext : DbContext
    {
        public NewsAggregatorDbContext(DbContextOptions options) : base(options)
        {
            Console.WriteLine("DbContext instance created");
        }
        public override int SaveChanges()
        {
            Console.WriteLine("SaveChanges called");
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            Console.WriteLine("SaveChangesAsync called");
            return base.SaveChangesAsync(cancellationToken);
        }
        public DbSet<Article> Articles { get; set; }
        public DbSet<RssFeed> RssFeeds { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        //public DbSet<TrustMeter> TrustMeter { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Article>()
                .HasIndex(article => article.PubDate)
                .HasDatabaseName("IX_Articles_PubDate");

            PopulateDb.Seed(builder);
        }
    }
}
