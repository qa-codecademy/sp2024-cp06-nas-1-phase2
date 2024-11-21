using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DomainModels;
using Common.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;


namespace Services.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        public TokenService(IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }
        public Task<JwtSecurityToken> GenerateTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            var token = GetJwt(claims);
            return Task.FromResult(token);
        }

        private JwtSecurityToken GetJwt(IEnumerable<Claim> authClaims)
        {
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],//_appSettings.ValidIssuer,//_configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],//_appSettings.ValidAudience,//_configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddYears(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
            );
            return token;
        }
    }
}
