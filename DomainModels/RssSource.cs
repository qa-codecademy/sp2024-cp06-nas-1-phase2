﻿namespace DomainModels
{
    public class RssSource : BaseClass
    {
        public string Source { get; set; }
        public string SourceUrl { get; set; }
        public string FeedUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string Author { get; set; }
        public string PubDate { get; set; }

        // Navigation properties
        public ICollection<Article> Articles { get; set; } // RssSource has many Articles
        public ICollection<UrlToImageConfig> UrlToImageConfigs { get; set; } // RssSource has many UrlToImageConfigs
    }
}
