namespace DTOs.RssFeed
{
    public class UpdateRssFeedDto
    {
        public string Source { get; set; }
        public string SourceUrl { get; set; }
        public string FeedUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string Author { get; set; }
        public string PubDate { get; set; }
        public string Query { get; set; }
        public string? Attribute { get; set; }
        public string? Regex { get; set; }
    }
}
