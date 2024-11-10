export class RenderSourcesContainers {
    constructor(sourcesContainerId) {
        this.sourcesContainer = document.getElementById(sourcesContainerId);
    }
    renderSources(sources, element) {
        //debugger;
        //console.log(sources);
        
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
      
            //console.log(sourceGroup);
            //console.log(newsItems);
            
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
                sourceText.textContent = `Source: ${sourceGroup.source.source || 'Unknown source'}`;
      
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
    }
    /*render(news) {
        if (!this.sourcesContainer) {
            console.error(`Element with ID "${sourcesContainerId}" not found.`);
            return;
        }

        // Clear any existing content
        this.sourcesContainer.innerHTML = '';

        // Loop through each source and create the necessary HTML structure
        news.forEach(newsItem => {
            const sourceDiv = document.createElement('div');
            sourceDiv.classList.add('source-container');
            sourceDiv.innerHTML = `
            <div class="row justify-content-center mb-4">
                <div class="col-auto">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${newsItem.news.urlToImage || 'fallback-image-url.jpg'}" class="img-fluid rounded-start" alt="${newsItem.news.title || 'No title available'}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${newsItem.news.title}</h5>
                                        <p class="card-text">${newsItem.news.description ? newsItem.news.description.substring(0, 100) + '...' : 'No description available.'}</p>
                                        <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.news.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
                                        <p class="card-text">Source: ${newsItem.source || 'Unknown source'}</p>
                                        <p class="card-text">Trust meter: ${newsItem.news.trustScore || 'N/A'}</p>
                                        <a href="#" class="btn btn-primary view-full-story" data-id="${newsItem.news.id}">Read more</a>
                                        <a href="${newsItem.news.link}" class="btn btn-primary">View source</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            `;
            // Append the source container to sourcesContainer
            this.sourcesContainer.appendChild(sourceDiv);
        });
    }
}
*/
/* <h3>${source.source}</h3>
                <p>URL: <a href="${source.sourceUrl}" target="_blank">${source.sourceUrl}</a></p>
                <p>Feed URL: <a href="${source.feedUrl}" target="_blank">${source.feedUrl}</a></p>
                <p>Description: ${source.description}</p> */