using DomainModels;
using System.IdentityModel.Tokens.Jwt;

namespace Services.Interfaces
{
    public interface ITokenService
    {
        Task<JwtSecurityToken> GenerateTokenAsync(User user);
    }
}
