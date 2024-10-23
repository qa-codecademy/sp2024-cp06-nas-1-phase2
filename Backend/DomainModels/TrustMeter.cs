namespace DomainModels
{
    public class TrustMeter : BaseClass
    {
        public int ArticleId { get; set; }
        public double TrustScore { get; set; } // e.g., calculated from feedback

        public Article Article { get; set; } // Navigation property
    }
}
