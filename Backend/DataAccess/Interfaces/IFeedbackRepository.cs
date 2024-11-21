using DomainModels;

namespace DataAccess.Interfaces
{
    public interface IFeedbackRepository : IRepository<Feedback>
    {
        Task<double> CalculateTrustMeterAsync(int articleId);
    }
}
