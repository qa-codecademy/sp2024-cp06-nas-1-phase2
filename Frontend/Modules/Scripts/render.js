import { RssFeedService } from "../Services/rss-feed-service.js";
export class Render
{
  constructor() {
    this.rssFeedService = new RssFeedService();
  }
  /*static main(news, element, newsService)
  {
    //console.log(element);
    element.innerHTML = '';    
    console.log(news);
      const newsHtml = news.map(newsItem => `
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${newsItem.urlToImage || 'fallback-image-url.jpg'}" class="img-fluid rounded-start" alt="${newsItem.title || 'No title available'}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${newsItem.title}</h5>
                    <p class="card-text">${newsItem.description ? newsItem.description.substring(0, 100) + '...' : 'No description available.'}</p>
                    <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.pubDate, 'DD-MM-YYYY HH:mm').format('dddd, D MMM, YYYY HH:mm')}</small></p>
                    <p class="card-text">Source: ${newsItem.feedUrl}</p>
                    <p class="card-text">Trust meter: ${newsItem.trustScore}</p>
                    <a href="#" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
                    <a href="${newsItem.link}" class="btn btn-primary">View source</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');
  
      // Set the innerHTML once
      element.innerHTML = newsHtml;
  
      // Add event listeners for buttons
      Render.addEventListeners(newsService);
    }
    */

    async main(news, element, newsService) {
      // Clear the container
      element.innerHTML = '';
      
      console.log(news[0].rssFeedId);
      //debugger;
      let feed1 = await this.rssFeedService.fetchRssFeedById(news[0].rssFeedId);
      console.log(feed1.source);
      
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
          pubDateSmall.textContent = `Published: ${dayjs(newsItem.pubDate, 'DD-MM-YYYY HH:mm').format('dddd, D MMM, YYYY HH:mm')}`;
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
      });
  
      // Add event listeners for buttons
      Render.addEventListeners(newsService);
  }

renderSources(sources, element) {
  debugger;
  console.log(sources);
  
  element.innerHTML = '';
  sources.forEach(sourceGroup => {
      // Container for each source
      const newsItems = Array.isArray(sourceGroup.news) ? sourceGroup.news : JSON.parse(sourceGroup.news || '[]');

      const sourceContainerDiv = document.createElement('div');
      sourceContainerDiv.classList.add('source-container');

      // Source title
      const sourceNameDiv = document.createElement('div');
      sourceNameDiv.className = 'source-title';
      sourceNameDiv.innerHTML = `<h2>${sourceGroup.source.source}</h2>`;
      sourceContainerDiv.appendChild(sourceNameDiv);

      console.log(sourceGroup);
      console.log(newsItems);
      
      // Render each news item
      newsItems.forEach(newsItem => {
        
          // Main row container for news item
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('row', 'justify-content-center', 'mb-4');

          const colDiv = document.createElement('div');
          colDiv.classList.add('col-auto');

          const cardDiv = document.createElement('div');
          cardDiv.classList.add('card', 'mb-3');
          cardDiv.style.maxWidth = '540px';

          const innerRowDiv = document.createElement('div');
          innerRowDiv.classList.add('row', 'g-0');

          // Image column
          const imageColDiv = document.createElement('div');
          imageColDiv.classList.add('col-md-4');
          const image = document.createElement('img');
          image.src = newsItem.urlToImage || 'fallback-image-url.jpg';
          image.classList.add('img-fluid', 'rounded-start');
          image.alt = newsItem.title || 'No title available';
          imageColDiv.appendChild(image);

          // Text column
          const textColDiv = document.createElement('div');
          textColDiv.classList.add('col-md-8');

          // Card body
          const cardBodyDiv = document.createElement('div');
          cardBodyDiv.classList.add('card-body');

          // News item elements
          const title = document.createElement('h5');
          title.classList.add('card-title');
          title.textContent = newsItem.title;

          const description = document.createElement('p');
          description.classList.add('card-text');
          description.textContent = newsItem.description ? `${newsItem.description.substring(0, 100)}...` : 'No description available.';

          const pubDate = document.createElement('p');
          pubDate.classList.add('card-text');
          const dateSmall = document.createElement('small');
          dateSmall.classList.add('text-body-secondary');
          dateSmall.textContent = `Published: ${dayjs(newsItem.pubDate, 'DD-MM-YYYY HH:mm').format('dddd, D MMM, YYYY HH:mm')}`;
          pubDate.appendChild(dateSmall);

          const sourceText = document.createElement('p');
          sourceText.classList.add('card-text');
          sourceText.textContent = `Source: ${sourceGroup.source || 'Unknown source'}`;

          const trustMeter = document.createElement('p');
          trustMeter.classList.add('card-text');
          trustMeter.textContent = `Trust meter: ${newsItem.trustScore || 'N/A'}`;

          // Buttons
          const readMoreBtn = document.createElement('a');
          readMoreBtn.href = '#';
          readMoreBtn.classList.add('btn', 'btn-primary', 'view-full-story');
          readMoreBtn.dataset.id = newsItem.id;
          readMoreBtn.textContent = 'Read more';

          const viewSourceBtn = document.createElement('a');
          viewSourceBtn.href = newsItem.link;
          viewSourceBtn.classList.add('btn', 'btn-primary');
          viewSourceBtn.textContent = 'View source';

          // Append elements to card body
          cardBodyDiv.append(title, description, pubDate, sourceText, trustMeter, readMoreBtn, viewSourceBtn);

          // Assemble card structure
          textColDiv.appendChild(cardBodyDiv);
          innerRowDiv.append(imageColDiv, textColDiv);
          cardDiv.appendChild(innerRowDiv);
          colDiv.appendChild(cardDiv);
          rowDiv.appendChild(colDiv);
          sourceContainerDiv.appendChild(rowDiv);
      });

      // Append source container to the main element
      element.appendChild(sourceContainerDiv);
  });
}

  static addEventListeners()
  {
    document.querySelectorAll('.view-full-story').forEach(button =>
    {
      button.addEventListener('click', function (event)
      {
        event.preventDefault();
        const id = parseInt(this.getAttribute('data-id'));
        newsService.viewFullStory(id);
      });
    });
  }
}