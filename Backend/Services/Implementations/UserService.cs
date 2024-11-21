using AutoMapper;
using DataAccess.Interfaces;
using DTOs.User;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerHelper _logger;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepository userRepository, IMapper mapper, ILoggerHelper logger, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
            _tokenService = tokenService;
        }
        public async Task<LoginUserDto> LoginUser(UserDto loginUser)
        {
            try
            {

                if (string.IsNullOrWhiteSpace(loginUser.Username) || string.IsNullOrWhiteSpace(loginUser.Password))
                {
                    _logger.LogInfo("Username and password must be provided!");
                    throw new Exception("Username and password must be provided!");
                }

                var user = await _userRepository.GetByUsernameAsync(loginUser.Username);
                if (user == null)
                {
                    _logger.LogInfo("User not found!");
                    throw new Exception("User not found!");
                }

                var hashedPassword = HashPassword(loginUser.Password);
                var isPasswordValid = await _userRepository.CheckPasswordAsync(hashedPassword);
                if (isPasswordValid == null)
                {
                    _logger.LogInfo("Invalid password!");
                    throw new Exception("Invalid password!");
                }

                var token = await _tokenService.GenerateTokenAsync(user);

                return new LoginUserDto { Token = new JwtSecurityTokenHandler().WriteToken(token), ValidTo = token.ValidTo };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while logging.");
                throw new Exception(ex.Message);
            }
        }
        public async Task<UserDto> EditUser(UserDto editUser, string username)
        {
            try
            {
                var user = await _userRepository.GetByUsernameAsync(username);
                if (user == null)
                {
                    _logger.LogInfo("User not found!");
                    throw new Exception("User not found!");
                }

                editUser.Password = HashPassword(editUser.Password);
                _mapper.Map(editUser, user);

                await _userRepository.UpdateAsync(user);
                
                return _mapper.Map<UserDto>(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating user.");
                throw new Exception(ex.Message);
            }
        }
        public async Task<RegisterUserDto> RegisterUser(UserDto registerUser)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(registerUser.Username) || string.IsNullOrWhiteSpace(registerUser.Password))
                {
                    _logger.LogInfo("Username and password must be provided!");
                    throw new ArgumentException("Username and password must be provided!");
                }

                var hashedPassword = HashPassword(registerUser.Password);
                var user = new User { Username = registerUser.Username, Password = hashedPassword};
                await _userRepository.Register(user);

                _logger.LogInfo($"User with username \"{registerUser.Username}\" was added.");
                return _mapper.Map<RegisterUserDto>(user);
            }
            catch (DbUpdateException dbEx)
            {
                // Log specific EF-related exception
                _logger.LogError(dbEx, "Database update error occurred.");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while registering user!");
                throw new Exception(ex.Message);
            }
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = sha256.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashBytes);
        }
    }
}
