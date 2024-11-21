using DomainModels;
using System.Linq.Expressions;

namespace DataAccess.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<IEnumerable<T>> GetAllByConditionAsync(Expression<Func<T, bool>> predicate);
    }
}
