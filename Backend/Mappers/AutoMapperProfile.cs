using AutoMapper;
using DomainModels;
using DTOs.Article;
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
        }
    }
}
