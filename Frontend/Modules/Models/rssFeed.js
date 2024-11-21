export class RssFeed
{
    constructor({
        id,
        source,
        sourceUrl,
        title,
        description,
        link,
        feedUrl,
        author,
        pubDate
    })
    {
        this.id = id;
        this.source = source;
        this.sourceUrl = sourceUrl;
        this.title = title;
        this.description = description;
        this.link = link;
        this.feedUrl = feedUrl;
        this.author = author;
        this.pubDate = pubDate;
    }
}