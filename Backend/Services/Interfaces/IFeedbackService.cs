using DTOs.Feedback;

namespace Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<double> CalculateTrustMeterAsync(int articleId);
        Task<FeedbackDto> AddFeedbackAsync(FeedbackDto feedback);
        Task DeleteFeedbackAsync(int id);
    }
}
