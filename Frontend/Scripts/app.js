import { NewsService } from "../Modules/news-service.js";
import { Ads } from '../Modules/ads.js';

//debugger;
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.locale('mk');
const adsInstance = new Ads();
const newsService = new NewsService();

window.newsService = newsService;
