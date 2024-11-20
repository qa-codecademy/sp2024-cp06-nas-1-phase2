using DTOs.Article;
using Services.Helpers;

namespace Services.Interfaces
{
    public interface IArticleService
    {
        Task<PaginatedResult<ArticleDto>> GetPagedArticlesAsync(int pageNumber, int pageSize);
        Task<PaginatedResult<ArticleDto>> GetPagedArticlesBySourceAsync(int rssFeedId, int pageNumber, int pageSize);
        Task AddArticlesAsync(IEnumerable<ArticleDto> addArticles, CancellationToken cancellationToken);
        Task<ArticleDto> GetArticleByIdAsync(int id);
        Task<PaginatedResult<ArticleDto>> GetArticleByKeywordAsync(string keyword, int pageNumber, int pageSize);
    }
}
