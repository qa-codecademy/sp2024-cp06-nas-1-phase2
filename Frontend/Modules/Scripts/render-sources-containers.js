export class RenderSourcesContainers {
    constructor(sourcesContainerId, newsService) {
        this.sourcesContainer = document.getElementById(sourcesContainerId);
        this.newsService = newsService;
    }
    async renderSources(data, element) {
        
        element.innerHTML = '';
        data.forEach(sourceGroup => {
            // Container for each source
            const newsItems = Array.isArray(sourceGroup.news) ? sourceGroup.news : JSON.parse(sourceGroup.news || '[]');
      
            const sourceContainerDiv = document.createElement('div');
            sourceContainerDiv.classList.add('source-container');
      
            // Source title
            const sourceNameDiv = document.createElement('div');
            sourceNameDiv.className = 'source-title';
            const sourceId = sourceGroup.source.id;
            const sourceName = sourceGroup.source.source;
            sourceNameDiv.innerHTML = `<h2><a href="#" id="newsLink${sourceId}"><i class="bi bi-newspaper"></i>${sourceName}</a></h2>`;
            sourceContainerDiv.appendChild(sourceNameDiv);
      
            const newsLink = sourceNameDiv.querySelector(`#newsLink${sourceId}`);
            newsLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.newsService.getAllNewsFromSource(this.newsService.itemsPerPage, 1, sourceId);
                console.log(`News link clicked for source: ${sourceName}`);
            });
            
            // Create a row container for the cards
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'g-4'); // Grid for responsive layout, with gap between items

            // Render each news item
            newsItems.forEach(newsItem => {
      
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-auto');
                //colDiv.classList.add('col');
      
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card', 'mb-3');
                cardDiv.style.maxWidth = '100%'; 
                cardDiv.style.border = '1px solid #ddd';
                cardDiv.style.padding = '10px';
      
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
                
                dateSmall.textContent = `Published: ${dayjs(newsItem.pubDate).format('dddd, D MMM, YYYY HH:mm')}`;
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
                readMoreBtn.classList.add('btn', 'btn-success', 'view-full-story');
                readMoreBtn.dataset.id = newsItem.id;
                readMoreBtn.textContent = 'Read more';
      
                const viewSourceBtn = document.createElement('a');
                viewSourceBtn.href = newsItem.link;
                viewSourceBtn.classList.add('btn', 'btn-primary');
                viewSourceBtn.target = '_blank';
                viewSourceBtn.textContent = 'View source';
      
                // Append elements to card body
                cardBodyDiv.append(title, description, pubDate, sourceText, trustMeter, readMoreBtn, viewSourceBtn);
      
                // Assemble card structure
                textColDiv.appendChild(cardBodyDiv);
                innerRowDiv.append(imageColDiv, textColDiv);
                cardDiv.appendChild(innerRowDiv);
                colDiv.appendChild(cardDiv);
                rowDiv.appendChild(colDiv);
                //sourceContainerDiv.appendChild(rowDiv);

                readMoreBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    newsService.viewFullStory(newsItem);
                });
            });
      
            sourceContainerDiv.appendChild(rowDiv);
            // Append source container to the main element
            element.appendChild(sourceContainerDiv);
            
        });
      }

      static addEventListeners(newsService){
    }
}