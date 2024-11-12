using System.Xml.Linq;

namespace DomainModels
{
    public class Article : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string? Author { get; set; }
        public DateTime? PubDate { get; set; }
        //public DateTime? PubDateParsed { get; set; } //new property...
        public string FeedUrl { get; set; }

        // Foreign key to RssFeed
        public int RssFeedId { get; set; }
        public RssFeed RssFeed { get; set; } // Navigation property to RssFeed

        public string UrlToImage { get; set; } // For image extraction
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}
