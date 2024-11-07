using AutoMapper;
using DataAccess.Interfaces;
using DomainModels;
using DTOs.Comment;
using Services.Interfaces;

namespace Services.Implementations
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly ILoggerHelper _logger;

        public CommentService(ICommentRepository commentRepository, ILoggerHelper logger, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByArticleIdAsync(int articleId)
        {
            try
            {
                //var comments = await _commentRepository.GetAllByConditionAsync(x => x.ArticleId == articleId);
                //var mappedComment = _mapper.Map<IEnumerable<CommentDto>>(comments);
                //return mappedComment;
                var comments = await _commentRepository.GetAllByConditionAsync(x => x.ArticleId == articleId);
                //Console.WriteLine($"Retrieved {comments.Count()} comments for ArticleId {articleId}" + comments.Count(), articleId);

                var mappedComment = _mapper.Map<IEnumerable<CommentDto>>(comments);
                //Console.WriteLine($"Mapped {comments.Count()} comments to CommentDto", mappedComment.Count());

                return mappedComment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting comments.");
                throw;
            }
        }

        public async Task AddCommentAsync(CommentDto comment)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(comment.Content))
                {
                    throw new ArgumentException("Comment content cannot be empty.");
                }

                var mappedComment = _mapper.Map<Comment>(comment);
                mappedComment.CreatedOn = DateTime.UtcNow;
                await _commentRepository.AddAsync(mappedComment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding comments.");
                throw;
            }
        }

        public async Task DeleteCommentAsync(int commentId)
        {
            try
            {
                var comment = await _commentRepository.GetByIdAsync(commentId);
                if (comment != null)
                {
                    await _commentRepository.DeleteAsync(commentId);
                }

                throw new KeyNotFoundException($"Comment with {commentId} was not found!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting comments.");
                throw;
            }
        }
    }
}
