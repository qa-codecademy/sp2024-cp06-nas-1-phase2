using Common.Modules;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace UpdateArticleDates
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            var options = new DbContextOptionsBuilder<NewsAggregatorDbContext>()
                .UseSqlServer(
                    "Server=Server;Database=NewsAggregatorDb;User Id=dnisko;Password=1q2w3e4r5t;") // Use your actual connection string
                .Options;

            await UpdateDates(options);
            //await CreateNewDatesColumn(options);
        }

        private static async Task UpdateDates(DbContextOptions<NewsAggregatorDbContext> options)
        {
            using (var context = new NewsAggregatorDbContext(options))
            {
                var articles = await context.Articles.ToListAsync();

                foreach (var article in articles)
                {
                    var parsedDate = article.PubDate;
                    Console.WriteLine($"Article: {article.Id} - {article.PubDate}");
                    if (parsedDate.HasValue)
                    {
                        //article.PubDateParsed = parsedDate.Value; // Assuming `PubDateParsed` is of type DateTime
                        Console.WriteLine($"To parse: {parsedDate.Value}");
                        //Console.WriteLine($"Parsed: {article.PubDateParsed}");
                    }
                    else
                    {
                        Console.WriteLine($"Could not parse PubDate for article ID {article.Id}: {article.PubDate}");
                    }
                }

                await context.SaveChangesAsync();
                Console.WriteLine("Publication dates updated successfully.");
            }
        }

        private static async Task CreateNewDatesColumn(DbContextOptions<NewsAggregatorDbContext> options)
        {
            using (var context = new NewsAggregatorDbContext(options))
            {
                await context.Database.ExecuteSqlRawAsync(@"
                    UPDATE Articles
                    SET PubDateParsed = TRY_CAST(PubDate AS datetime)");

                Console.WriteLine("New dates column populated successfully.");
            }
        }
    }
}