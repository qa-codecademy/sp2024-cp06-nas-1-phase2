namespace DomainModels
{
    public class TrustMeter : BaseEntity
    {
        public int ArticleId { get; set; }
        public double TrustScore { get; set; } // calculated from feedback

        public Article Article { get; set; } // Navigation property
    }
}
