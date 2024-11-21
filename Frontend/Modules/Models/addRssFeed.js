export class AddRssFeed {
	constructor({
		source,
		sourceUrl,
		feedUrl,
		title,
		description,
		link,
		author,
		pubDate,
		query,
		attribute,
		regex,
	}) {
		this.source = source;
		this.sourceUrl = sourceUrl;
		this.feedUrl = feedUrl;
		this.title = title;
		this.description = description;
		this.link = link;
		this.author = author;
		this.pubDate = pubDate;
		this.query = query;
		this.attribute = attribute;
		this.regex = regex;
	}
}
