//import { ApiService } from "./api-service.js";
import { Article } from "../Models/article.js";
import { RenderFullStory } from "../Scripts/render-full-story.js";
import { Render } from "../Scripts/render.js";
import { RenderPagination } from "../render-pagination.js";
import { RenderFeedback } from "../Scripts/render-feedback.js";
//import { RenderSourcesContainers } from "../Scripts/render-sources-containers.js";
import { RssFeed } from "../Models/rssFeed.js";

export class NewsService {
	constructor(apiService, rssFeedService) {
		this.apiService = apiService;
		this.rssFeedService = rssFeedService;

		this.renderPagination = new RenderPagination(this);
		this.RenderFeedback = new RenderFeedback();
		this.render = new Render(this);
		//this.renderSourcesContainers = new RenderSourcesContainers("sourcesContainer");
		//this.rssFeedService = new RssFeedService();

		this.notification = document.getElementById("notification");
		this.cardContainer = document.getElementById("cardContainer");
		this.sourcesContainer = document.getElementById("sourcesContainer");
		this.fullStoryContainer = document.getElementById("fullStoryContainer");
		this.fullStoryContent = document.getElementById("fullStoryContent");

		this.paginationContainer = document.getElementById("paginationContainer");
		this.paginationContainerArchive = document.getElementById("paginationContainerArchive");

		this.dropdownItems = document.getElementById("dropdownItems");
		this.spinnerWrapper = document.getElementById("spinner-wrapper");

		this.newsArray = [];
		this.mappedNews = [];

		//this.currentPage = this.paginationService.currentPage;
		this.itemsPerPage = 10;

		this.initializeEventHandlers();
		//debugger;
		//this.Test();
        //this.mainNews(this.itemsPerPage, 1);
        this.getTopThreeNews();
        this.getTopThreeNewsFromAllSources();
		this.hideElements();
	}

	async Test()
	{
		const article = await this.apiService.fetchArticleById(5);
		//console.log(article);
		const trustScoreResponse = await this.apiService.fetchTrustScore(5);
		const trustScore = trustScoreResponse.trustScore;
		//console.log(comments);
		console.log(trustScore);
		let articleWithTrustScore = new Article({...article, trustScore});
		console.log(articleWithTrustScore);

		// const sourceById = this.rssFeedService.fetchRssFeedById(article.rssFeedId);
		// console.log(sourceById);
	}
	async mainNews(itemsPerPage, page, calledFrom, sourceId) {
		try {   
			console.log("Items per page from Main: " + itemsPerPage);
			
            const pageSize = itemsPerPage;
			let newsData = null;
			if(calledFrom === "main" || calledFrom === "update")
			{
				newsData = await this.apiService.fetchRssFeed(page, pageSize);
				//console.log(newsData);
				
			}
			if(calledFrom === "source")
			{
				newsData = await this.apiService.fetchBySources(sourceId, page, pageSize);
				//console.log(newsData);
			}
			if (newsData.length === 0) {
				throw new Error("No news found! Try again");
			}

			this.newsArray = await Promise.all(newsData.items.map(async (item) => {
				const newsIitem = new Article(item);				
				const trustScoreData = await this.apiService.fetchTrustScore(newsIitem.id);
				newsIitem.trustScore = trustScoreData.trustScore;
				return newsIitem;
			}));			
			
			this.currentPage = newsData.pageNumber;
			console.log("Current page from Main: " + this.currentPage);
			
			this.sourcesContainer.innerHTML = "";
			this.renderPage(this.cardContainer, this.newsArray, this);
			this.renderPagination.updatePaginationData(
				newsData.totalPages,
				newsData.pageNumber,
				newsData.hasPreviousPage,
				newsData.hasNextPage);
			this.showElements();
		} catch (error) {
			this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
		} finally {
			this.hideSpinner();
		}
	}

	async getAllNewsFromSource(itemsPerPage, page, sourceId) {
		this.mainNews(itemsPerPage, page, "source", sourceId);
	}
	async getAllNewsFromSource1(itemsPerPage, page, sourceId) {
        try {
            
			const sources = await this.rssFeedService.fetchSources();
			const foundSource = await sources.find(s => s.id === sourceId);

			if (!foundSource) {
				throw new Error("Source not found!");
			}
			const source = new RssFeed(foundSource);

			const newsData = await this.apiService.fetchBySources(sourceId, page, itemsPerPage);
			const articles = newsData.map(article => new Article(article));
			const structuredSources = {
					source,
					news: articles
				};

				//console.log(structuredSources);
				
			this.renderPage(this.cardContainer, structuredSources, this);
			this.renderPagination.updatePaginationData(
				newsData.totalPages,
				newsData.pageNumber,
				newsData.hasPreviousPage,
				newsData.hasNextPage
			);

			this.showElements();
        } catch (error) {
            console.error("Error fetching top news from all sources:", error);
            this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        }
    }

	async getSourceByName(name){
		try {
			const source = await this.apiService.fetchRssFeedByName(name);
			console.log(source);
			
			return source;
		} catch (error) {
			console.error(error);
		}
	}
    async getTopThreeNews() {
        const pageNumber = 1; // Requesting the first page
        const pageSize = 3;   // Setting the page size to 3 to get the top three items
        //debugger;
        try {
            const newsData = await this.apiService.fetchTopThreeNews(pageNumber, pageSize);
			if (newsData.length === 0) {
				throw new Error("No news found! Try again");
			}
            this.newsArray = newsData.items;
			this.renderPage(this.cardContainer, this.newsArray, this);
        } catch (error) {
            console.error("Error fetching top news:", error);
        }
    }

    async getTopThreeNewsFromAllSources(pageNumber = 1, pageSize = 3) {
        try {
            
			const sources = await this.rssFeedService.fetchSources();
			const structuredSources = await Promise.all(sources.map(async (item) => {
				
				const source = new RssFeed(item);
				const newsData = await this.apiService.fetchBySources(source.id, pageNumber, pageSize);
				
				const articles = newsData.items.map(article => new Article(article));
				
				return {
					source,
					news: articles
				};
			}));
			//debugger;
			//this.renderSourcesContainers.renderSources(structuredSources, this.sourcesContainer);
			this.render.renderSources(structuredSources, this.sourcesContainer);
        } catch (error) {
            console.error("Error fetching top news from all sources:", error);
            this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        }
    }

	async addSourceToNews(news)
	{
		const sources = await this.rssFeedService.fetchSources();
		let newsResult = [];
		for (const newsItem of news) {
			const source = sources.find(s => s.id === newsItem.rssFeedId);
			if (source)
			{
				newsResult.push({
					source: source.source,
					news: newsItem
				})
			}
		}
		return newsResult;
	}

	async archiveNews() {
		// debugger;
		this.cardContainer.innerHTML = "";

		this.newsArray.sort((a, b) => b.id - a.id);

		this.currentPage = 1;
		this.renderPage(this.currentPage, this.cardContainer, this.newsArray);
		this.showElements();
	}

	renderPage(container, newsData, newsService) {
		//debugger;
		this.showSpinner();
		this.render.main(newsData, container, newsService);
		this.hideSpinner();
	}

	async viewFullStory(newsItem) {
		try {
			
			if (newsItem) {
				this.cardContainer.style.display = "none";
				this.sourcesContainer.style.display = "none";
				this.fullStoryContainer.style.display = "block";
				this.hideElements();
				RenderFullStory.fullStory(newsItem, this.fullStoryContent, this);
			} else {
				console.error("News item not found");
			}
		} catch (error) {
			console.error("Error viewing full story:", error);
		}
	}

	async fetchCommentsFOrArticle(articleId) {
		try {
			const comments = await this.apiService.fetchCommentsFOrArticle(articleId);
			console.log(comments);
			
			return comments;
		} catch (error) {
			console.error("Error fetching comments for article:", error);
		}
	}

	async saveFeedback(articleId, rating, comment, username) {
		try {
			await this.apiService.saveFeedback(articleId, rating, comment, username);
			this.notification.innerHTML = `<div class='alert-success'>Feedback saved successfully!</div>`;
		} catch (error) {
			console.error("Error saving feedback:", error);
			this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
		}
	}
	
	async reloadFeedbackAndComments(articleId) {
		try {
			// Fetch the updated comments for the article
			const commentsResponse = await fetch(`${this.apiUrl}/Comments/getCommentsForArticle/${articleId}`);
			if (!commentsResponse.ok) {
				throw new Error("Failed to fetch updated comments.");
			}
			const comments = await commentsResponse.json();
	
			// Update the comment section in the UI
			this.render.updateCommentsSection(comments);
	
			// Fetch the updated rating
			const ratingResponse = await fetch(`${this.apiUrl}/Feedback/getRatingForArticle/${articleId}`);
			if (!ratingResponse.ok) {
				throw new Error("Failed to fetch updated rating.");
			}
			const ratingData = await ratingResponse.json();
	
			// Update the rating section in the UI
			this.render.updateRatingSection(ratingData);
		} catch (error) {
			console.error("Error reloading feedback and comments:", error);
		}
	}
	initializeEventHandlers() {
		//items per page dropdown click
		document
			.getElementById("itemsPerPageDropdown")
			.addEventListener("click", (event) => {
				if (event.target.classList.contains("dropdown-item")) {
					const itemsPerPage = parseInt(
						event.target.getAttribute("data-value")
					);
					console.log("Items per page from EventHandler: " + itemsPerPage);
					this.updateItemsPerPage(itemsPerPage);
				}
			});

		//#region Card Layout (NOT WORKING)

		// Function to set card layout - to be fixed using bootstrap
		function setCardLayout(layoutType) {
			const cardContainer = document.getElementById("cardContainer");
			cardContainer.className = ""; // Clear existing classes
			switch (layoutType) {
				case "single":
					cardContainer.classList.add("card-single");
					break;
				case "triple":
					cardContainer.classList.add("card-triple");
					break;
				default:
					cardContainer.classList.add("card-single");
					break;
			}
		}

		// Set default layout
		setCardLayout("single");

		// Event listener for the "Card Layout" dropdown
		// const layoutDropdown = document.getElementById("layoutDropdown");
		// layoutDropdown.addEventListener("click", (event) => {
		// 	//debugger;
		// 	if (event.target.classList.contains("dropdown-item")) {
		// 		const layoutType = event.target.getAttribute("data-value");
		// 		setCardLayout(layoutType);
		// 	}
		// });
		//#endregion

		//archive link click
		const archiveLink = document.getElementById("archive-link");
		archiveLink.addEventListener("click", async (event) => {
			event.preventDefault();
			this.showSpinner();
			await this.archiveNews();
			this.hideSpinner();
		});

		//feedback link click
		const feedbackLink = document.getElementById("feedback-link");
		feedbackLink.addEventListener("click", async (event) => {
			event.preventDefault();
			this.showSpinner();
			RenderFeedback.render(this.cardContainer);
			this.hideElements();
			this.hideSpinner();
		});
	}
	hideFullStory() {
		this.fullStoryContainer.style.display = "none";
		this.cardContainer.style.display = "block";
		this.sourcesContainer.style.display = "grid";
		this.showElements();
	}

	hideElements() {
		this.paginationContainer.style.visibility = "hidden";
		this.paginationContainerArchive.style.visibility = "hidden";
		this.dropdownItems.style.visibility = "hidden";
	}

	showElements() {
		this.paginationContainer.style.visibility = "visible";
		this.paginationContainerArchive.style.visibility = "visible";
		this.dropdownItems.style.visibility = "visible";
	}

	updateItemsPerPage(itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
		this.currentPage = 1;
		//this.renderPage(this.currentPage);
		console.log("Items per page from updatePages: " + itemsPerPage);		
		
		this.mainNews(itemsPerPage, 1, "update");
	}

	showSpinner() {
		//console.log("Show spinner called");
		this.spinnerWrapper.style.display = "flex";
	}

	hideSpinner() {
		setTimeout(() => {
			this.spinnerWrapper.style.display = "none";
		}, 1000);
	}
}
