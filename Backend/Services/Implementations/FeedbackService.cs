using AutoMapper;
using DataAccess.Interfaces;
using DomainModels;
using DTOs.Feedback;
using Services.Interfaces;

namespace Services.Implementations
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerHelper _logger;

        public FeedbackService(IFeedbackRepository feedbackRepository, IMapper mapper, ILoggerHelper logger)
        {
            _feedbackRepository = feedbackRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<FeedbackDto>> GetFeedbackByArticleIdAsync(int articleId)
        {
            try
            {
                var feedback = await _feedbackRepository.GetAllByConditionAsync(x => x.ArticleId == articleId);
                var mappedFeedback = _mapper.Map<IEnumerable<FeedbackDto>>(feedback);
                return mappedFeedback;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting feedback.");
                throw;
            }
        }
        public async Task<FeedbackDto> AddFeedbackAsync(FeedbackDto feedback)
        {
            try
            {
                var feedbackModel = _mapper.Map<Feedback>(feedback);
                await _feedbackRepository.AddAsync(feedbackModel);
                return _mapper.Map<FeedbackDto>(feedbackModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding feedback!");
                throw new Exception(ex.Message);
            }
        }
        public async Task<double> CalculateTrustMeterAsync(int articleId)
        {
            try
            {
                return await _feedbackRepository.CalculateTrustMeterAsync(articleId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while calculating trust meter!");
                throw new Exception(ex.Message);
            }
        }
        public async Task DeleteFeedbackAsync(int id)
        {
            try
            {
                var feedback = _feedbackRepository.GetByIdAsync(id);
                if (feedback == null)
                {
                    throw new KeyNotFoundException($"The feedback with {id} does not exist.");
                }

                await _feedbackRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding feedback!");
                throw new Exception(ex.Message);
            }
        }
    }
}
