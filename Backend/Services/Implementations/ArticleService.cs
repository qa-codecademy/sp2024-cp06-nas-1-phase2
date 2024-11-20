using AutoMapper;
using DataAccess.Interfaces;
using DomainModels;
using DTOs.Article;
using Services.Helpers;
using Services.Interfaces;

namespace Services.Implementations
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerHelper _logger;

        public ArticleService(IArticleRepository articleRepository,
            IMapper mapper,
            ILoggerHelper logger)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<PaginatedResult<ArticleDto>> GetPagedArticlesAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _articleRepository.GetTotalCountAsync();
            var articles = await _articleRepository.GetPaginatedAllArticlesAsync(pageNumber, pageSize);

            var articleDtos = articles.Select(article => _mapper.Map<ArticleDto>(article));

            return new PaginatedResult<ArticleDto>(articleDtos, totalCount, pageNumber, pageSize);
        }
        public async Task<PaginatedResult<ArticleDto>> GetPagedArticlesBySourceAsync(int rssFeedId, int pageNumber, int pageSize)
        {
            try
            {
                var totalCount = await _articleRepository.GetTotalCountByRssFeedIdAsync(rssFeedId);
                var articles = await _articleRepository.GetPaginatedArticlesByRssFeedIdAsync(rssFeedId, pageNumber, pageSize);

                var articleDtos = articles.Select(article => _mapper.Map<ArticleDto>(article));
                return new PaginatedResult<ArticleDto>(articleDtos, totalCount, pageNumber, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching articles by source.", ex);
            }
        }
        public async Task AddArticlesAsync(IEnumerable<ArticleDto> addArticles, CancellationToken cancellationToken)
        {
            try
            {
                var articles = _mapper.Map<IEnumerable<Article>>(addArticles);
                var newArticles = new List<Article>();
                
                foreach (var article in articles)
                {
                    var latestArticle = await _articleRepository.GetLatestArticleByRssFeedIdAsync(article.RssFeedId);

                    if (latestArticle != null && latestArticle.Title == article.Title &&
                        latestArticle.Link == article.Link)
                    {
                        break;
                    }
                    newArticles.Add(article);
                }

                if (newArticles.Any())
                {
                    newArticles.Reverse();
                    await _articleRepository.AddRangeAsync(newArticles, cancellationToken);
                    _logger.LogInfo($"Added {newArticles.Count} articles from " +
                                    $"{newArticles.Select(x => x.RssFeed.Source)}");
                }
                else
                {
                    _logger.LogInfo($"No new articles from" +
                                    $"{newArticles.Select(x => x.RssFeed.Source)}");

                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Cannot add articles.");
                throw new Exception("Error adding articles.", ex);
            }
        }
        public async Task<ArticleDto> GetArticleByIdAsync(int id)
        {
            var article = await _articleRepository.GetByIdAsync(id);
            var mappedArticle = _mapper.Map<ArticleDto>(article);
            return mappedArticle;
        }
        public async Task<PaginatedResult<ArticleDto>> GetArticleByKeywordAsync(string keyword, int pageNumber, int pageSize)
        {
            try
            {
                var articles = await _articleRepository
                    .GetPaginatedArticlesByTitleAndLinkAsync(keyword, pageNumber, pageSize);
                if (!articles.Any())
                {
                    throw new Exception("No articles found for the given keyword");
                }

                var totalCount = await _articleRepository.GetTotalCountByKeywordAsync(keyword);
                var articleDtos = _mapper.Map<IEnumerable<ArticleDto>>(articles);

                return new PaginatedResult<ArticleDto>(articleDtos, totalCount, pageNumber, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
