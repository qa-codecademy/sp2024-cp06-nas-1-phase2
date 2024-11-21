namespace DomainModels
{
    public class Feedback : BaseEntity
    {
        public int ArticleId { get; set; }
        public Article Article { get; set; } // Navigation property
        public int Rating { get; set; }
    }
}
