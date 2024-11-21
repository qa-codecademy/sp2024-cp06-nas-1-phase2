using AutoMapper;
using DTOs.Comment;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace sp2024_cp06_nas_1_phase2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService, IMapper mapper)
        {
            _commentService = commentService;
        }

        [HttpPost("saveComment")]
        public async Task<IActionResult> AddComment([FromBody] CommentDto comment)
        {
            try
            {
                await _commentService.AddCommentAsync(comment);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("getComments/{articleId}")]
        public async Task<IActionResult> GetComments(int articleId)
        {
            try
            {
                var test = await _commentService.GetCommentsByArticleIdAsync(articleId);
                return Ok(test);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
