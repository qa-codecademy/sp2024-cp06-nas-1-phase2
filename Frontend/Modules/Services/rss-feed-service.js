import { RssFeed } from "../Models/rssFeed";
import { config } from "../../Utils/config";

export class RssFeedService {
    constructor() {
        this.apiUrl = config.apiUrls.production;
    }
    static async fetchRssFeedById(id) {
        try{
            const response = await fetch(`${this.apiUrl}/RssFeed/getById/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return new RssFeed(data);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
            return null;
        }
    }
}