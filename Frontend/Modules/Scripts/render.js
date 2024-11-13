import { RssFeedService } from "../Services/rss-feed-service.js";
import { RenderSourcesContainers } from "../Scripts/render-sources-containers.js";
export class Render
{
  constructor(newsService) {
    this.newsService = newsService;
    this.rssFeedService = new RssFeedService();
    this.renderSourcesContainers = new RenderSourcesContainers("sourcesContainer", newsService);
  }
    async main(news, element, newsService) {
      
      element.innerHTML = '';
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'source-title';
      if(news.source !== undefined)
      {
        titleDiv.innerHTML = `<h2><a href="#" id="topNewsLink"><i class="bi bi-newspaper"></i> ${news.source.source}</a></h2>`;
      }
      else
      {
        titleDiv.innerHTML = `<h2><a href="#" id="topNewsLink"><i class="bi bi-newspaper"></i> Top News</a></h2>`;
      }
      element.appendChild(titleDiv);

      const topNewsLink = document.getElementById("topNewsLink");
      topNewsLink.addEventListener("click", (event) => {
        debugger;
          event.preventDefault();
          newsService.mainNews(this.newsService.itemsPerPage, 1, "main");
          console.log("Top News clicked");
      });

      news.forEach(async newsItem => {
          let feed = await this.rssFeedService.fetchRssFeedById(newsItem.rssFeedId);
          // Outer row container
          const row = document.createElement('div');
          row.className = 'row justify-content-center mb-4';
  
          // Column container
          const col = document.createElement('div');
          col.className = 'col-auto';
  
          // Card container
          const card = document.createElement('div');
          card.className = 'card mb-3';
          card.style.maxWidth = '540px';
  
          // Card row
          const cardRow = document.createElement('div');
          cardRow.className = 'row g-0';
  
          // Image column
          const imageCol = document.createElement('div');
          imageCol.className = 'col-md-4';
  
          // Image
          const img = document.createElement('img');
          img.src = newsItem.urlToImage || 'fallback-image-url.jpg';
          img.className = 'img-fluid rounded-start';
          img.alt = newsItem.title || 'No title available';
  
          // Append image to image column
          imageCol.appendChild(img);
  
          // Content column
          const contentCol = document.createElement('div');
          contentCol.className = 'col-md-8';
  
          // Card body
          const cardBody = document.createElement('div');
          cardBody.className = 'card-body';
  
          // Title
          const title = document.createElement('h5');
          title.className = 'card-title';
          title.textContent = newsItem.title || 'No title available';
  
          // Description
          const description = document.createElement('p');
          description.className = 'card-text';
          description.textContent = newsItem.description ? newsItem.description.substring(0, 100) + '...' : 'No description available.';
  
          // Publication Date
          const pubDate = document.createElement('p');
          pubDate.className = 'card-text';
          const pubDateSmall = document.createElement('small');
          pubDateSmall.className = 'text-body-secondary';
          pubDateSmall.textContent = `Published: ${dayjs(newsItem.pubDate).format('dddd, D MMM, YYYY HH:mm')}`;
          pubDate.appendChild(pubDateSmall);
  
          // Source
          const source = document.createElement('p');
          source.className = 'card-text';
          source.textContent = `Source: ${feed.source}`;
  
          // Trust meter
          const trustMeter = document.createElement('p');
          trustMeter.className = 'card-text';
          trustMeter.textContent = `Trust meter: ${newsItem.trustScore || 'N/A'}`;
  
          // "Read more" button
          const readMoreBtn = document.createElement('a');
          readMoreBtn.className = 'btn btn-primary view-full-story';
          readMoreBtn.href = '#';
          readMoreBtn.dataset.id = newsItem.id;
          readMoreBtn.textContent = 'Read more';
  
          // "View source" button
          const viewSourceBtn = document.createElement('a');
          viewSourceBtn.className = 'btn btn-primary';
          viewSourceBtn.href = newsItem.link;
          viewSourceBtn.textContent = 'View source';
  
          // Append elements to card body
          cardBody.append(title, description, pubDate, source, trustMeter, readMoreBtn, viewSourceBtn);
  
          // Append card body to content column
          contentCol.appendChild(cardBody);
  
          // Append columns to card row
          cardRow.append(imageCol, contentCol);
  
          // Append card row to card
          card.appendChild(cardRow);
  
          // Append card to column
          col.appendChild(card);
  
          // Append column to row
          row.appendChild(col);
  
          // Append row to the main container
          element.appendChild(row);
          
          readMoreBtn.addEventListener('click', (event) => {
            event.preventDefault();
            //const id = parseInt(this.getAttribute('data-id'));
            newsService.viewFullStory(newsItem);
        });
      });
  
      // Add event listeners for buttons
      const delay = ms => new Promise(res => setTimeout(res, ms));
      const yourFunction = async () => {
        await delay(5000);
        Render.addEventListeners(newsService);
      };
      //yourFunction();
      
  }

renderSources(data, element) {
  this.renderSourcesContainers.renderSources(data, element);
}

renderBySource(sources, element) {
  this.renderSourcesContainers.renderSources(sources, element);
}

  static addEventListeners(newsService)
  {
    // const buttons = document.querySelectorAll('.view-full-story');
    // console.log('Buttons found:', buttons);  // Check if buttons are found
    // document.querySelectorAll('.view-full-story').forEach(button =>
    // {
    //   button.addEventListener('click', function (event)
    //   {
    //     event.preventDefault();
    //     const id = parseInt(this.getAttribute('data-id'));
    //     newsService.viewFullStory(id);
    //   });
    // });
  }
}