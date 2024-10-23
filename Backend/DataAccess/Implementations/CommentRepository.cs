using DataAccess.Interfaces;
using DomainModels;
using Microsoft.Extensions.Logging;

namespace DataAccess.Implementations
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(NewsAggregatorDbContext context, ILogger<Repository<Comment>> logger) : base(context, logger)
        {
        }
    }
}
