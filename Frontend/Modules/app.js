import { ApiService } from "./Services/api-service.js";
import { NewsService } from "./Services/news-service.js";
import { RssFeedService } from "./Services/rss-feed-service.js";
import { Ads } from './ads.js';

//debugger;
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.locale('mk');
//document.addEventListener("DOMContentLoaded", () => {
    const adsInstance = new Ads();
    const apiService = new ApiService();
    const rssFeedService = new RssFeedService();
    const newsService = new NewsService(apiService, rssFeedService);
    //render.addEventListeners(); // Now add the event listeners once DOM is ready
    window.newsService = newsService;
//});
//window.newsService = newsService;
//window.apiService = apiService;