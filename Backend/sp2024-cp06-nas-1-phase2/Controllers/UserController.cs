using DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Services.Interfaces;

namespace sp2024_cp06_nas_1_phase2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync([FromBody] UserDto model)
        {
            try
            {
                var result = await _userService.LoginUser(model);
                return result == null ? throw new Exception("Something went wrong!") : Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto registerUser)
        {
            try
            {
                var result = await _userService.RegisterUser(registerUser);
                return result == null
                    ? throw new Exception("Something went wrong!")
                    : StatusCode(StatusCodes.Status201Created, "User created successfully!");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [Authorize]
        [HttpPut("Update/{username}")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UserDto editUser, string username)
        {
            try
            {
                var response = await _userService.EditUser(editUser, username);
                return response == null ? throw new Exception("Something went wrong!") : Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
