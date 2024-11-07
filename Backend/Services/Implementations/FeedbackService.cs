using System.Runtime.CompilerServices;
using System.Text;
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
                _logger.LogError(ex, "Error while getting comments.");
                throw;
            }
        }

        public async Task<FeedbackDto> AddFeedbackAsync(FeedbackDto feedback)
        {
            try
            {
                var feedbackModel = _mapper.Map<Feedback>(feedback);
                await _feedbackRepository.AddAsync(feedbackModel);
                //await AddTrustMeter(feedbackModel.ArticleId);
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
                //var feedbackModel = _mapper.Map<Feedback>(feedback);
                var feedback = _feedbackRepository.GetByIdAsync(id);
                if (feedback == null)
                {
                    throw new KeyNotFoundException($"The feedback with {id} does not exist.");
                }

                await _feedbackRepository.DeleteAsync(id);
                //return _mapper.Map<FeedbackDto>(feedback);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding feedback!");
                throw new Exception(ex.Message);
            }
        }

        //private async Task AddTrustMeter(int articleId)
        //{
        //    try
        //    {
        //        var calculateTrustMeter = await _trustMeterRepository.CalculateTrustMeterAsync(articleId);
        //        var trustMeter = new TrustMeter
        //        {
        //            ArticleId = articleId,
        //            TrustScore = calculateTrustMeter
        //        };

        //        await _trustMeterRepository.AddAsync(trustMeter);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
    }
}
