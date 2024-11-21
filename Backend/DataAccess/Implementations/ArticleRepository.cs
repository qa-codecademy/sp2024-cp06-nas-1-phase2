using DataAccess.Interfaces;
using DomainModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace DataAccess.Implementations
{
    public class ArticleRepository : Repository<Article>, IArticleRepository
    {
        private readonly NewsAggregatorDbContext _context;
        public ArticleRepository(NewsAggregatorDbContext context, ILogger<Repository<Article>> logger) : base(context, logger)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Article>> GetPaginatedArticlesByTitleAndLinkAsync(string keyword, int pageNumber, int pageSize)
        {
            return await _context.Articles
                .Where(x => x.Description.Contains(keyword))// || x.Link.Contains(keyword))
                .OrderByDescending(article => article.PubDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task AddRangeAsync(IEnumerable<Article> articles, CancellationToken cancellationToken)
        {
            try
            {
                Console.WriteLine("Starting AddRangeAsync method");

                await _context.Articles.AddRangeAsync(articles, cancellationToken);
                Console.WriteLine("Articles added");

                await _context.SaveChangesAsync(cancellationToken);
                Console.WriteLine("Changes saved");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw new Exception(ex.Message);
            }
        }
        public async Task<Article> GetLatestArticleByRssFeedIdAsync(int rssFeedId)
        {
            return (await _context.Articles
                .Where(x => x.RssFeedId == rssFeedId)
                .OrderByDescending(x => x.PubDate)
                .FirstOrDefaultAsync())!;
        }
        public async Task<IEnumerable<Article>> GetPaginatedArticlesByRssFeedIdAsync(int rssFeedId, int pageNumber, int pageSize)
        {
            try
            {
                return await _context.Articles
                    .Where(x => x.RssFeedId == rssFeedId)
                    .OrderByDescending(article => article.PubDate)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<IEnumerable<Article>> GetPaginatedAllArticlesAsync(int pageNumber, int pageSize)
        {
            try
            {
                return await _context.Articles
                   .OrderByDescending(article => article.PubDate)
                   .Skip((pageNumber - 1) * pageSize)
                   .Take(pageSize)
                   .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<IEnumerable<Article>> GetPaginatedArticlesBetweenDates(
            DateTime startDate, DateTime endDate, int pageNumber, int pageSize)
        {
            return await _context.Articles
                .Where(x => x.PubDate >= startDate && x.PubDate <= endDate)
                .OrderByDescending(article => article.PubDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Articles.CountAsync();
        }
        public async Task<int> GetTotalCountByRssFeedIdAsync(int rssFeedId)
        {
            return await _context.Articles
                .Where(x => x.RssFeedId == rssFeedId)
                .CountAsync();
        }
        public async Task<int> GetTotalCountByKeywordAsync(string keyword)
        {
            return await _context.Articles
                .Where(x => x.Description.Contains(keyword))// || x.Link.Contains(keyword))
                .CountAsync();
        }
        public async Task<int> GetTotalCountBetweenDates(DateTime startDate, DateTime endDate)
        {
            return await _context.Articles
                .Where(x => x.PubDate >= startDate && x.PubDate <= endDate)// || x.Link.Contains(keyword))
                .CountAsync();
        }
    }
}
