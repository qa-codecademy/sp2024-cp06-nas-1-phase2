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
                <h3>${source.source}</h3>
                <p>URL: <a href="${source.sourceUrl}" target="_blank">${source.sourceUrl}</a></p>
                <p>Feed URL: <a href="${source.feedUrl}" target="_blank">${source.feedUrl}</a></p>
                <p>Description: ${source.description}</p>
            `;
            // Append the source container to sourcesContainer
            this.sourcesContainer.appendChild(sourceDiv);
        });
    }
}