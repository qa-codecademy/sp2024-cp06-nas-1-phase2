export class Article
{
    constructor({
        id,
        title,
        description,
        link,
        author,
        pubDate,
        feedUrl,
        rssFeedId,
        urlToImage
    })
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
        this.author = author;
        this.pubDate = pubDate;
        this.feedUrl = feedUrl;
        this.rssFeedId = rssFeedId;
        this.urlToImage = urlToImage;
    }
}