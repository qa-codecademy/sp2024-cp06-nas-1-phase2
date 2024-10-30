export class ApiService {
	constructor() {
		this.jsonUrl = {
			//0: 'https://localhost:5002/News',
			1: "https://dnisko.ddns.net:7105/api/",
		};
	}

    async fetchRssFeed(pageNumber, pageSize) {
        try {
            let response;
            try {
                response = await fetch(
                    this.jsonUrl[0] +
                    `Api/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`
                );
                if (!response.ok) {
                    console.warn(
                        `Failed to fetch from ${this.jsonUrl[0]} with status ${response.status}`
                    );
                    throw new Error(`Failed to fetch from ${this.jsonUrl[0]}`);
                }
            } catch (error) {
                console.warn(`First fetch attempt failed: ${error.message}`);
                response = await fetch(
                    this.jsonUrl[1] +
                    `Api/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`
                );

                if (!response.ok) {
                    console.error(
                        `Failed to fetch from ${this.jsonUrl[1]} with status ${response.status}`
                    );
                    throw new Error(`Failed to fetch from ${this.jsonUrl[1]}`);
                }
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error("Error fetching RSS feed:", error);
            return [];
        }
    }

	async fetchTopThreeNews(pageNumber, pageSize) {
		try {
			const response = await fetch(
				this.jsonUrl[1] +
					`Api/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`
			);
			if (!response.ok) {
				throw new Error(`HTTP ERROR. Status: ${response.status}`);
			}
			const jsonData = await response.json();
			return jsonData;
		} catch (error) {
			console.error("Error fetching top three news:", error);
			return [];
		}
	}

	async fetchSources() {
		try {
			const response = await fetch(this.jsonUrl[1] + `RssFeed/getAll`);
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

	async fetchBySources(sourceId, pageNumber, pageSize) {
		try {
			const response = await fetch(
				this.jsonUrl[1] +
					`Api/getNewsBySource/${sourceId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
			);
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
}
