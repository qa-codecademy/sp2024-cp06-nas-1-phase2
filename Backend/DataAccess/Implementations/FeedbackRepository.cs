using System.Runtime.CompilerServices;
using DataAccess.Interfaces;
using DomainModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccess.Implementations
{
    public class FeedbackRepository : Repository<Feedback>, IFeedbackRepository
    {
        private readonly NewsAggregatorDbContext _context;
        public FeedbackRepository(NewsAggregatorDbContext context, ILogger<Repository<Feedback>> logger) : base(context, logger)
        {
            _context = context;
        }

        public async Task<double> CalculateTrustMeterAsync(int articleId)
        {
            try
            {
                var feedback = await _context.Feedback.Where(x => x.ArticleId == articleId).ToListAsync();
                return feedback.Any() ? feedback.Average(x => x.Rating) : 0.0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
