import { ApiService } from "./Services/api-service.js";
import { NewsService } from "./Services/news-service.js";
import { RssFeedService } from "./Services/rss-feed-service.js";
import { Ads } from './ads.js';

//debugger;
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.locale('mk');
const adsInstance = new Ads();
const apiService = new ApiService();
const newsService = new NewsService();
const rssFeedService = new RssFeedService();

window.newsService = newsService;
