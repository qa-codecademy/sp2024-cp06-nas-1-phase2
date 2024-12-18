import { config } from "../../Utils/config.js";

export class ApiService {
	constructor(){
		this.apiUrl = config.apiUrls.production;
	}
	async fetchTrustScore(articleId) {
		try {
			const response = await fetch(`${this.apiUrl}/Feedback/trust-meter/${articleId}`);
			const jsonData = await response.json();
			//console.log(jsonData);
			
			return jsonData;
		} catch (error) {
			//console.error(error);
		}
	}
	async fetchArticleById(articleId) {
		try {
			const response = await fetch(`${this.apiUrl}/Article/getNewsById/${articleId}`);
			const jsonData = await response.json();
			//console.log(jsonData);
			
			return jsonData;
		} catch (error) {
			console.error(error);
		}
	}
	async fetchCommentsFOrArticle(articleId) {
		try {
			const response = await fetch(`${this.apiUrl}/Comments/getComments/${articleId}`);
			const jsonData = await response.json();
			//console.log(jsonData);
			
			return jsonData;
		} catch (error) {
			//console.error(error);
		}
	}
    async fetchRssFeed(pageNumber, pageSize) {
        try {
			
            let response;
            try {
                response = await fetch(`${this.apiUrl}/Article/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                if (!response.ok) {
                    console.warn(
                        `Failed to fetch from ${this.apiUrl}/} with status ${response.status}`
                    );
                    throw new Error(`Failed to fetch from ${this.apiUrl}/}`);
                }
            } catch (error) {
                console.warn(`First fetch attempt failed: ${error.message}`);
                response = await fetch(`${this.apiUrl}/Article/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`);

                if (!response.ok) {
                    console.error(
                        `Failed to fetch from ${this.apiUrl}/} with status ${response.status}`
                    );
                    throw new Error(`Failed to fetch from ${this.apiUrl}/}`);
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
			const response = await fetch(`${this.apiUrl}/Article/getNews?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
	async fetchBySources(sourceId, pageNumber, pageSize) {
		try {
			//debugger;
			const response = await fetch(`${this.apiUrl}/Article/getNewsBySource/${sourceId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
	async saveFeedback(articleId, rating, content, username) {
		try {
			debugger;
			if (!articleId) {
				throw new Error("Article ID is required.");
			}

			if (rating) {
				const response = await fetch(`${this.apiUrl}/Feedback/saveFeedback`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ articleId, rating }),
				});
				if (!response.ok) {
					throw new Error(`Failed to save feedback: ${response.status}`);
				}
			}

			if (content) {
				const response = await fetch(`${this.apiUrl}/Comments/saveComment`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, content, articleId }),
				});
				if (!response.ok) {
					throw new Error(`Failed to save feedback: ${response.status}`);
				}
			}
		} catch (error) {
			console.error("Error saving feedback:", error);
		}
	}
	async fetchArticleByKeyword(keyword, pageNumber, pageSize) {
		try {
			const response = await fetch(`${this.apiUrl}/Article/getByKeyword?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
			const jsonData = await response.json();
			//console.log(jsonData);
			
			return jsonData;
		} catch (error) {
			console.error(error);
		}
	}
	async fetchArchive(startDate, endDate, pageNumber, pageSize) {
		try {
			console.log(startDate);
			console.log(endDate);
			
			const response = await fetch(`${this.apiUrl}/Article/betweenDates?startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
			const jsonData = await response.json();
			//console.log(jsonData);
			
			return jsonData;
		} catch (error) {
			console.error(error);
		}
	}
}
