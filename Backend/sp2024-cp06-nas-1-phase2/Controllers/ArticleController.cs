using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace sp2024_cp06_nas_1_phase2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }
        [HttpGet("getNews")]
        public async Task<IActionResult> GetAllNews(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                var paginatedResult = await _articleService.GetPagedArticlesAsync(pageNumber, pageSize);
    
                return Ok(paginatedResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getNewsById/{id}")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            try
            {
                var article = await _articleService.GetArticleByIdAsync(id);
                if (article == null)
                {
                    return BadRequest("No article with that id");
                }
                return Ok(article);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getNewsBySource/{rssFeedId}")]
        public async Task<IActionResult> GetNewsBySource(int rssFeedId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var paginatedResult = await _articleService.GetPagedArticlesBySourceAsync(rssFeedId, pageNumber, pageSize);
                return Ok(paginatedResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
