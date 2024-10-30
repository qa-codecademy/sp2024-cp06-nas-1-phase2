using System.Linq.Expressions;
using DataAccess.Interfaces;
using DomainModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccess.Implementations
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly NewsAggregatorDbContext _context;
        private readonly DbSet<T> _table;
        private readonly ILogger<Repository<T>> _logger;

        public Repository(NewsAggregatorDbContext context, ILogger<Repository<T>> logger)
        {
            _context = context;
            _table = context.Set<T>();
            _logger = logger;
        }
        
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation($"Calling GetAllAsync from {typeof(T).Name} Repository.");
                return await _table.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong in GetAllAsync.", ex.InnerException);
            }
        }

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Calling GetByIdAsync from {typeof(T).Name} Repository.");
                if (id < 0 || id > _table.Count())
                {
                    throw new KeyNotFoundException($"Entity with id: {id} is not found.");
                }
                return (await _table.FindAsync(id))!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task AddAsync(T entity)
        {
            try
            {
                _logger.LogInformation($"Calling AddAsync from {typeof(T).Name} Repository.");
                _table.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateAsync(T entity)
        {
            try
            {
                _logger.LogInformation($"Calling UpdateAsync from {typeof(T).Name} Repository.");
                _table.Update(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                _logger.LogInformation($"Calling DeleteAsync from {typeof(T).Name} Repository.");
                var entity = await _table.FindAsync(id);
                if (entity != null)
                {
                    _table.Remove(entity);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new KeyNotFoundException($"Entity with id: {id} is not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<T>> GetAllByConditionAsync(Expression<Func<T, bool>> predicate)
        {
            return await _table.Where(predicate).ToListAsync();
        }
    }
}
