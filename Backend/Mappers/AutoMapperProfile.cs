using AutoMapper;
using DomainModels;
using DTOs.Article;
using DTOs.Comment;
using DTOs.Feedback;
using DTOs.RssFeed;
using DTOs.User;

namespace Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //RssFeed
            CreateMap<RssFeed, RssFeedDto>().ReverseMap();
            CreateMap<RssFeed, AddRssFeedDto>().ReverseMap();
            CreateMap<RssFeed, UpdateRssFeedDto>().ReverseMap();

            //Article
            CreateMap<Article, ArticleDto>().ReverseMap();

            //User
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, RegisterUserDto>().ReverseMap();

            //Feedback
            CreateMap<Feedback, FeedbackDto>().ReverseMap();

            //Comments
            CreateMap<Comment, CommentDto>().ReverseMap();
        }
    }
}
