import { RssFeed } from "../Models/rssFeed.js";
import { config } from "../../Utils/config.js";

export class RssFeedService {
    constructor() {
        this.apiUrl = config.apiUrls.production;
    }

    async fetchSources() {
		try {
            console.log(`${this.apiUrl}/RssFeed/getAll`);
            
			const response = await fetch(`${this.apiUrl}/RssFeed/getAll`);
			if (!response.ok) {
				throw new Error(`Failed to fetch sources: ${response.status}`);
			}
			const sourcesData = await response.json();
			return sourcesData;
		} catch (error) {
			console.error("Error fetching sources:", error);
			return [];
		}
	}

    async fetchRssFeedById(id) {
        try{
            //debugger;
            //console.log(this.apiUrl);
            const response = await fetch(`${this.apiUrl}/RssFeed/getById/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //console.log(data);
            return new RssFeed(data);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
            return null;
        }
    }
}