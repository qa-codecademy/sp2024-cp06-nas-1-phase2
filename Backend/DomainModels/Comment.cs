﻿namespace DomainModels
{
    public class Comment : BaseEntity
    {
        public string Username { get; set; }
        public string Content { get; set; }
        public int ArticleId { get; set; }
        public Article Article { get; set; } // Navigation property
    }
}
