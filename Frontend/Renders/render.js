export class Render
{
  static main(news, element, newsService)
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

//     static renderSources(sources, element) {
//       element.innerHTML = ''; // Clear existing content

//     // Create grid layout for each source
//     sources.forEach(sourceGroup => {
//         // const sourceContainerDiv = document.createElement('div');
//         // sourceContainerDiv.className = 'source-container';
//         sourceDiv 
//         const sourceContainerDiv = document.createElement('div');
//         sourceContainerDiv.classList.add("source-container");
//         // Create and add the source title
//         const sourceNameDiv = document.createElement('div');
//         sourceNameDiv.className = 'source-title';
//         sourceNameDiv.innerHTML = `<h2>${sourceGroup.source}</h2>`;
//         sourceContainerDiv.appendChild(sourceNameDiv);
//         console.log("OVDE");
        
//         console.log(sourceGroup);
//         // Create each news item within the current source group
//         sourceGroup.news.forEach(newsItem => {
//           debugger;
//           console.log(newsItem);
          
          

//           // Main row container
//           const rowDiv = document.createElement("div");
//           rowDiv.classList.add("row", "justify-content-center", "mb-4");

//           // Column container
//           const colDiv = document.createElement("div");
//           colDiv.classList.add("col-auto");

//           // Card container
//           const cardDiv = document.createElement("div");
//           cardDiv.classList.add("card", "mb-3");
//           cardDiv.style.maxWidth = "540px";

//           // Inner row for image and text
//           const innerRowDiv = document.createElement("div");
//           innerRowDiv.classList.add("row", "g-0");

//           // Image column
//           const imageColDiv = document.createElement("div");
//           imageColDiv.classList.add("col-md-4");
//           const image = document.createElement("img");
//           image.src = newsItem.urlToImage || "fallback-image-url.jpg";
//           image.classList.add("img-fluid", "rounded-start");
//           image.alt = newsItem.title || "No title available";
//           imageColDiv.appendChild(image);

//           // Text column
//           const textColDiv = document.createElement("div");
//           textColDiv.classList.add("col-md-8");

//           // Card body
//           const cardBodyDiv = document.createElement("div");
//           cardBodyDiv.classList.add("card-body");

//           // Title
//           const title = document.createElement("h5");
//           title.classList.add("card-title");
//           title.textContent = newsItem.title;
//           cardBodyDiv.appendChild(title);

//           // Description
//           const description = document.createElement("p");
//           description.classList.add("card-text");
//           description.textContent = newsItem.description
//             ? newsItem.description.substring(0, 100) + "..."
//             : "No description available.";
//           cardBodyDiv.appendChild(description);

//           // Publication date
//           const pubDate = document.createElement("p");
//           pubDate.classList.add("card-text");
//           const dateSmall = document.createElement("small");
//           dateSmall.classList.add("text-body-secondary");
//           dateSmall.textContent = `Published: ${dayjs(newsItem.pubDate).format(
//             "ddd, D MMM, YYYY HH:mm"
//           )}`;
//           pubDate.appendChild(dateSmall);
//           cardBodyDiv.appendChild(pubDate);

//           // Source
//           const sourceText = document.createElement("p");
//           sourceText.classList.add("card-text");
//           sourceText.textContent = `Source: ${newsItem.source || "Unknown source"}`;
//           cardBodyDiv.appendChild(sourceText);

//           // Trust meter
//           const trustMeter = document.createElement("p");
//           trustMeter.classList.add("card-text");
//           trustMeter.textContent = `Trust meter: ${newsItem.trustScore || "N/A"}`;
//           cardBodyDiv.appendChild(trustMeter);

//           // Read more button
//           const readMoreBtn = document.createElement("a");
//           readMoreBtn.href = "#";
//           readMoreBtn.classList.add("btn", "btn-primary", "view-full-story");
//           readMoreBtn.dataset.id = newsItem.id;
//           readMoreBtn.textContent = "Read more";
//           cardBodyDiv.appendChild(readMoreBtn);

//           // View source button
//           const viewSourceBtn = document.createElement("a");
//           viewSourceBtn.href = newsItem.link;
//           viewSourceBtn.classList.add("btn", "btn-primary");
//           viewSourceBtn.textContent = "View source";
//           cardBodyDiv.appendChild(viewSourceBtn);

//           // Assembling the elements
//           textColDiv.appendChild(cardBodyDiv);
//           innerRowDiv.appendChild(imageColDiv);
//           innerRowDiv.appendChild(textColDiv);
//           cardDiv.appendChild(innerRowDiv);
//           colDiv.appendChild(cardDiv);
//           rowDiv.appendChild(colDiv);
//           sourceContainerDiv.appendChild(rowDiv);
//             // const newsItemDiv = document.createElement('div');
//             // newsItemDiv.className = 'news-item';
//             // newsItemDiv.innerHTML = `
//             //     <h5>${newsItem.title}</h5>
//             //     <p>${newsItem.description ? newsItem.description.substring(0, 100) + '...' : 'No description available.'}</p>
//             //     <p><small>Published: ${dayjs(newsItem.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
//             //     <p>Source: ${newsItem.feedUrl || 'Unknown source'}</p>
//             //     <p>Trust meter: ${newsItem.trustScore || 'N/A'}</p>
//             //     <a href="#" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
//             //     <a href="${newsItem.link}" class="btn btn-secondary">View source</a>
//             // `;

//             sourceContainerDiv.appendChild(newsItemDiv);
//         });

//         // Append each source container to the main element
//         element.appendChild(sourceContainerDiv);
//     });
// }

static renderSources(sources, element) {
  element.innerHTML = '';
  sources.forEach(sourceGroup => {
      // Container for each source
      const sourceContainerDiv = document.createElement('div');
      sourceContainerDiv.classList.add('source-container');

      // Source title
      const sourceNameDiv = document.createElement('div');
      sourceNameDiv.className = 'source-title';
      sourceNameDiv.innerHTML = `<h2>${sourceGroup.source}</h2>`;
      sourceContainerDiv.appendChild(sourceNameDiv);

      // Render each news item
      sourceGroup.news.forEach(newsItem => {
        
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