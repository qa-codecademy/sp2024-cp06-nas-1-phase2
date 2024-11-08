export class RenderSourcesContainers {
    constructor(sourcesContainerId) {
        this.sourcesContainer = document.getElementById(sourcesContainerId);
    }

    render(sources) {
        if (!this.sourcesContainer) {
            console.error(`Element with ID "${this.sourcesContainerId}" not found.`);
            return;
        }

        // Clear any existing content
        this.sourcesContainer.innerHTML = '';

        // Loop through each source and create the necessary HTML structure
        sources.forEach(source => {
            const sourceDiv = document.createElement('div');
            sourceDiv.classList.add('source-container');
            sourceDiv.innerHTML = `
            <div class="row justify-content-center mb-4">
                <div class="col-auto">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${source.urlToImage || 'fallback-image-url.jpg'}" class="img-fluid rounded-start" alt="${source.title || 'No title available'}">
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
                
            `;
            // Append the source container to sourcesContainer
            this.sourcesContainer.appendChild(sourceDiv);
        });
    }
}

/* <h3>${source.source}</h3>
                <p>URL: <a href="${source.sourceUrl}" target="_blank">${source.sourceUrl}</a></p>
                <p>Feed URL: <a href="${source.feedUrl}" target="_blank">${source.feedUrl}</a></p>
                <p>Description: ${source.description}</p> */