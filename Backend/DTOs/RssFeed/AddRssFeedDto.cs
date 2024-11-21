using Swashbuckle.AspNetCore.Annotations;

namespace DTOs.RssFeed
{
    public class AddRssFeedDto
    {
        [SwaggerSchema("Name of the RSS source")]
        public string Source { get; set; }

        [SwaggerSchema("URL of the RSS source's main website.")]
        public string SourceUrl { get; set; }
        
        [SwaggerSchema("URL of the RSS feed.")]
        public string FeedUrl { get; set; }

        [SwaggerSchema("Title of the News article.")]
        public string Title { get; set; }

        [SwaggerSchema("Description of the News article.")]
        public string Description { get; set; }

        [SwaggerSchema("Link XML tag.")]
        public string Link { get; set; }

        [SwaggerSchema("Author XML tag.")]
        public string Author { get; set; }

        [SwaggerSchema("PubDate XML tag.")]
        public string PubDate { get; set; }

        [SwaggerSchema("Image XML tag.")]
        public string Query { get; set; }

        [SwaggerSchema("If needed, property in the Image XML tag (from above)." +
                       "\nEg.: Image XML tag: &quot;img&quot;. Property for the XML tag where the img link is: &quot;src&quot;." +
                       "\nThis makes the XML like this: &lt;img src=&quot;url-to-img&quot;&gt; &lt;/img&gt;")]
        public string? Attribute { get; set; }

        [SwaggerSchema("If needed, custom Regex for the img, inside the Image XML tag (from above)." +
                       "\nEg.: Image main XML tag is: &quot;content:encoded&quot;. There are more tags or properties to search for, the regex is: &quot;&lt;img[^&gt;]*src=\\&quot;([^\\&quot;]*)\\&quot;&quot;." +
                       "\nThis makes the XML like this: &lt;content:encoded&gt;&lt;img src=&quot;url-to-img&quot;&gt;&lt;/img&gt;&lt;/encoded&gt;")]
        public string? Regex { get; set; }
    }
}
