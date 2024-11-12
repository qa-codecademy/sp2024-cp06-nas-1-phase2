using DomainModels;
using DTOs.Article;
using Services.Helpers;
using System.Xml.Linq;

namespace Services.Interfaces
{
    public interface IArticleService
    {
        Task<PaginatedResult<ArticleDto>> GetPagedArticlesAsync(int pageNumber, int pageSize);
        Task<PaginatedResult<ArticleDto>> GetAllArticlesByRssFeedAsync(int rssFeedId, int pageNumber, int pageSize);
        Task AddArticlesAsync(IEnumerable<ArticleDto> addArticles, CancellationToken cancellationToken);
        Task<IEnumerable<ArticleDto>> GetPagedArticlesBySourceAsync(int rssFeedId, int pageNumber, int pageSize);
        Task<ArticleDto> GetArticleByIdAsync(int id);
    }
}
