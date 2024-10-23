using DomainModels;
using DTOs.Comment;

namespace Services.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetCommentsByArticleIdAsync(int articleId);
        Task AddCommentAsync(CommentDto comment);
        Task DeleteCommentAsync(int commentId);
    }
}
