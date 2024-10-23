using DTOs.User;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<LoginUserDto> LoginUser(UserDto loginUser);
        Task<UserDto> EditUser(UserDto editUser, string username);
        Task<RegisterUserDto> RegisterUser(UserDto registerUser);
    }
}
