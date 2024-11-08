//import { ApiService } from "./api-service.js";
import { Article } from "../Models/article.js";
import { RenderFullStory } from "../Scripts/render-full-story.js";
import { Render } from "../Scripts/render.js";
//import { PaginationService } from "../pagination-service.js";
import { RenderFeedback } from "../Scripts/render-feedback.js";

export class NewsService {
	constructor() {
		this.apiService = apiService;
		//this.paginationService = new PaginationService(this);
		this.RenderFeedback = new RenderFeedback();

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

		this.currentPage = this.paginationService.currentPage;
		this.itemsPerPage = this.paginationService.itemsPerPage;

		//debugger;
		//this.Test();
        this.mainNews();
        //this.getTopThreeNews();
        //this.getTopThreeNewsFromAllSources();
		this.initializeEventHandlers();
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
	}
	async mainNews() {
		try {   
            const pageNumber = 1; // Requesting the first page
            const pageSize = 3;   // Setting the page size to 3 to get the top three items
			const newsData = await this.apiService.fetchRssFeed(pageNumber, pageSize);
			console.log("================================================");

			console.log(newsData);
			console.log(newsData.items);

			if (newsData.length === 0) {
				throw new Error("No news found! Try again");
			}

			//const sortedNews = newsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
			//this.mappedNews = this.mapNewsData(newsData.items);

			this.newsArray = await Promise.all(newsData.items.map(async (item) => {
				const newsIitem = new Article(item);
				const trustScoreData = await this.apiService.fetchTrustScore(newsIitem.id);
				newsIitem.trustScore = trustScoreData.trustScore;
				return newsIitem;
			}));

			this.currentPage = 1;
			console.log("Articles with trust scores: ", this.newsArray);
			
			this.renderPage(this.currentPage, this.cardContainer, this.newsArray);

            const sources = await this.apiService.fetchSources();
            //console.log(sources);
            //this.RenderSourcesContainers.render(sources);
		} catch (error) {
			this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
		} finally {
			//this.hideSpinner();
		}
	}
    async getTopThreeNews() {
        const pageNumber = 1; // Requesting the first page
        const pageSize = 3;   // Setting the page size to 3 to get the top three items
        
        try {
            const newsData = await this.apiService.fetchTopThreeNews(pageNumber, pageSize);

			if (newsData.length === 0) {
				throw new Error("No news found! Try again");
			}
    
            this.newsArray = newsData.items;
			this.currentPage = 1;
			this.renderPage(this.currentPage, this.cardContainer, this.newsArray);

            const sources = await this.apiService.fetchSources();
            console.log(sources);
            this.RenderSourcesContainers.render(sources);
        } catch (error) {
            console.error("Error fetching top news:", error);
        }
    }

    async getTopThreeNewsFromAllSources() {
        try {
            // const sources = await this.apiService.fetchSources();
            // //debugger;
            // let topNewsResult = [];
            // for (const source of sources) {
            //     const pageNumber = 1;
            //     const pageSize = 3;
			const newsData = await this.apiService.fetchTopThreeNews(pageNumber, pageSize);
			const result = await this.addSourceToNews(newsData);
            //const topNews = await this.apiService.fetchBySources(source.id, pageNumber, pageSize)
            //     topNewsResult.push({source: source.source, news: topNews});
            // }
			console.log("================================================");
			
            console.log(result);
			
            Render.renderSources(result, this.sourcesContainer);
            this.hideSpinner();
            
        } catch (error) {
            console.error("Error fetching top news from all sources:", error);
            this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        }
    }

	async addSourceToNews(news)
	{
		const sources = await this.apiService.fetchSources();
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
	mapNewsData(news) {
		return news.map((newsItem, index) => new Article({ ...newsItem, id: index }));
	}

	async archiveNews() {
		// debugger;
		this.cardContainer.innerHTML = "";

		this.newsArray.sort((a, b) => b.id - a.id);

		this.currentPage = 1;
		this.renderPage(this.currentPage, this.cardContainer, this.newsArray);
		this.showElements();
	}

	//Pagination
	//https://webdesign.tutsplus.com/pagination-with-vanilla-javascript--cms-41896t
	renderPage(page, container = this.cardContainer, newsData = this.newsArray, rssFeedId) {
		debugger;
		this.showSpinner();
		const start = (page - 1) * this.itemsPerPage;
		const end = start + this.itemsPerPage;
		const newsToRender = newsData.slice(start, end);
		Render.main(newsToRender, container, rssFeedId);
		this.paginationService.renderPagination();
		this.hideSpinner();
	}

	async viewFullStory(id) {
		try {
			const newsItem = await this.newsArray.find((item) => item.id === id);
			if (newsItem) {
				this.cardContainer.style.display = "none";
				this.fullStoryContainer.style.display = "block";
				this.hideElements();
				RenderFullStory.fullStory(newsItem, this.fullStoryContent);
			} else {
				console.error("News item not found");
			}
		} catch (error) {
			console.error("Error viewing full story:", error);
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
		const layoutDropdown = document.getElementById("layoutDropdown");
		layoutDropdown.addEventListener("click", (event) => {
			//debugger;
			if (event.target.classList.contains("dropdown-item")) {
				const layoutType = event.target.getAttribute("data-value");
				setCardLayout(layoutType);
			}
		});
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
		this.renderPage(this.currentPage);
	}

	showSpinner() {
		console.log("Show spinner called");
		this.spinnerWrapper.style.display = "flex";
	}

	hideSpinner() {
		setTimeout(() => {
			this.spinnerWrapper.style.display = "none";
		}, 1000);
	}
}
