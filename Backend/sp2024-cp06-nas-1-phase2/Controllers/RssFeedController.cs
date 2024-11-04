using DTOs.RssFeed;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace sp2024_cp06_nas_1_phase2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RssFeedController : ControllerBase
    {
        private readonly IRssFeedService _rssFeedService;

        public RssFeedController(IRssFeedService rssFeedService)
        {
            _rssFeedService = rssFeedService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _rssFeedService.GetAllRssFeedsAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("getBySource")]
        public async Task<IActionResult> GetBySource(string source)
        {
            try
            {
                var response = await _rssFeedService.GetRssFeedBySourceAsync(source);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addRssFeed")]
        [SwaggerOperation(
            Summary = "Add a new RSS feed",
            Description = "Adds a new RSS feed to the database with details like source name, URL, feed URL, title, description, and image query parameters."
        )]
        [SwaggerResponse(200, "The RSS feed was added successfully.")]
        [SwaggerResponse(400, "Invalid input data.")]
        public async Task<IActionResult> AddRssFeed([
                FromBody, 
                SwaggerParameter("Details of the RSS feed to add. See each property for specific info.")] 
            AddRssFeedDto addRssFeedDto)
        {
            try
            {
                await _rssFeedService.AddRssFeedAsync(addRssFeedDto);
                return Ok($"The RSS {addRssFeedDto.Source} was added to the database!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateRssFeed/{id}")]
        public async Task<IActionResult> UpdateRssFeed(int id, [FromBody] UpdateRssFeedDto updateRssFeedDto)
        {
            try
            {
                await _rssFeedService.UpdateRssFeedAsync(id, updateRssFeedDto);
                return Ok($"The RSS {updateRssFeedDto.Source} was updated!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteRssFeed/{id}")]
        public async Task<IActionResult> DeleteRssFeed(int id)
        {
            try
            {
                await _rssFeedService.DeleteRssFeedAsync(id);
                return Ok($"The RSS with id: {id} was deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> FetchAndProcessRssFeedsAsync(CancellationToken cancellationToken)
        {
            try
            {
                await _rssFeedService.FetchAndProcessRssFeedsAsync(cancellationToken);
                return Ok($"The Articles were added to the database!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
