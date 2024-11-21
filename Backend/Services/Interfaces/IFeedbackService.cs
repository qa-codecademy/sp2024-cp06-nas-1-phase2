using DTOs.Feedback;

namespace Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<IEnumerable<FeedbackDto>> GetFeedbackByArticleIdAsync(int articleId);
        Task<double> CalculateTrustMeterAsync(int articleId);
        Task<FeedbackDto> AddFeedbackAsync(FeedbackDto feedback);
        Task DeleteFeedbackAsync(int id);
    }
}
