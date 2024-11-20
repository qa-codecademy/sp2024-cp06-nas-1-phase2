using DomainModels;

namespace DataAccess.Interfaces
{
    public interface IArticleRepository : IRepository<Article>
    {
        Task<IEnumerable<Article>> GetPaginatedArticlesByTitleAndLinkAsync(string keyword, int pageNumber, int pageSize);
        Task<IEnumerable<Article>> GetPaginatedArticlesByRssFeedIdAsync(int rssFeedId, int pageNumber, int pageSize);
        Task<IEnumerable<Article>> GetPaginatedAllArticlesAsync(int pageNumber, int pageSize);
        Task<int> GetTotalCountAsync();
        Task<int> GetTotalCountByRssFeedIdAsync(int rssFeedId);
        Task AddRangeAsync(IEnumerable<Article> articles, CancellationToken cancellationToken);
        Task<Article> GetLatestArticleByRssFeedIdAsync(int rssFeedId);
        Task<int> GetTotalCountByKeywordAsync(string keyword);
    }
}
