using AutoMapper;
using DomainModels;
using DTOs.Feedback;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace sp2024_cp06_nas_1_phase2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService, IMapper mapper)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost]
        public async Task<IActionResult> AddFeedback([FromBody] FeedbackDto feedback)
        {
            try
            {
                await _feedbackService.AddFeedbackAsync(feedback);
                return Ok(feedback);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("trust-meter/{articleId}")]
        public async Task<IActionResult> GetTrustMeter(int articleId)
        {
            var trustScore = await _feedbackService.CalculateTrustMeterAsync(articleId);
            return Ok(new { TrustScore = trustScore });
        }
    }
}
