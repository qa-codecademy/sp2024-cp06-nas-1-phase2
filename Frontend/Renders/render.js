//import dayjs from 'dayjs';
export class Render
{
  //debugger;
  static main(news, element, newsService)
  {
    //console.log(element);
    element.innerHTML = '';
    console.log(news);
    /*
    news.forEach((newsItem) =>
      {
        element.innerHTML += `
          <div class="row justify-content-center mb-4">
            <div class="col-auto">
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">

                  <div class="col-md-4">
                    <img src="${newsItem.urlToImage}" class="img-fluid rounded-start" alt="${newsItem.title}">
                  </div>

                  <div class="col-md-8">

                    <div class="card-body">
                      <h5 class="card-title">${newsItem.title}</h5>
                      <p class="card-text">${newsItem.description.substring(0, 100)}...</p>
                      <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
                      <p class="card-text">Source: ${newsItem.source}</p>
                      <p class="card-text">Thrust meter: ${newsItem.trustScore}</p>
                      <a href="#" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
                      <a href="${newsItem.link}" class="btn btn-primary">View source</a>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>`;
      });

      Render.addEventListeners();
      */

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
                    <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
                    <p class="card-text">Source: ${newsItem.source || 'Unknown source'}</p>
                    <p class="card-text">Trust meter: ${newsItem.trustScore || 'N/A'}</p>
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

    static renderSources(sources, element) {
      element.innerHTML = ''; // Clear existing content

    // Create grid layout for each source
    sources.forEach(sourceGroup => {
        const sourceContainerDiv = document.createElement('div');
        sourceContainerDiv.className = 'source-container';

        // Create and add the source title
        const sourceNameDiv = document.createElement('div');
        sourceNameDiv.className = 'source-title';
        sourceNameDiv.innerHTML = `<h2>${sourceGroup.source}</h2>`;
        sourceContainerDiv.appendChild(sourceNameDiv);

        // Create each news item within the current source group
        sourceGroup.news.forEach(newsItem => {
            const newsItemDiv = document.createElement('div');
            newsItemDiv.className = 'news-item';

            newsItemDiv.innerHTML = `
                <h5>${newsItem.title}</h5>
                <p>${newsItem.description ? newsItem.description.substring(0, 100) + '...' : 'No description available.'}</p>
                <p><small>Published: ${dayjs(newsItem.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
                <p>Source: ${newsItem.source || 'Unknown source'}</p>
                <p>Trust meter: ${newsItem.trustScore || 'N/A'}</p>
                <a href="#" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
                <a href="${newsItem.link}" class="btn btn-secondary">View source</a>
            `;

            sourceContainerDiv.appendChild(newsItemDiv);
        });

        // Append each source container to the main element
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