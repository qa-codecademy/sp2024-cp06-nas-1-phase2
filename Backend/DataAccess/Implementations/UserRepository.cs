using DataAccess.Interfaces;
using DomainModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccess.Implementations
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly NewsAggregatorDbContext _context;

        public UserRepository(NewsAggregatorDbContext context, ILogger<Repository<User>> logger) : base(context, logger)
        {
            _context = context;
        }

        public async Task <User> LoginAsync(string username, string hashPassword)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.Username == username && x.Password == hashPassword);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> CheckPasswordAsync(string hashPassword)
        {
            try
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.Password == hashPassword);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> Register(User registerUser)
        {
            Console.WriteLine("Starting user registration process.");
            try
            {
                _context.Users.Add(registerUser);
                Console.WriteLine("Calling save changes.");
                await _context.SaveChangesAsync();
                Console.WriteLine("User registration success.");
                return registerUser;
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception("Database update error: " + dbEx.InnerException?.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
