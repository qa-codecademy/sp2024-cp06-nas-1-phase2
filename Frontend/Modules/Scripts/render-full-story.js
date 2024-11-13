export class RenderFullStory
{
    static fullStory(news, element) {
        // Clear the element content
        element.innerHTML = '';
    
        // Card container
        const card = document.createElement('div');
        card.className = 'card mb-3';
    
        // Image
        const img = document.createElement('img');
        img.src = news.urlToImage;
        img.className = 'card-img-top';
        img.alt = news.title;
        card.appendChild(img);
    
        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
    
        // Title
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = news.title;
        cardBody.appendChild(title);
    
        // Description
        const description = document.createElement('p');
        description.className = 'card-text';
        description.textContent = news.description;
        cardBody.appendChild(description);
    
        // Author
        const author = document.createElement('p');
        author.className = 'card-text';
        author.textContent = `By ${news.author}`;
        cardBody.appendChild(author);
    
        // Publication date
        const pubDate = document.createElement('p');
        pubDate.className = 'card-text';
        const pubDateSmall = document.createElement('small');
        pubDateSmall.className = 'text-muted';
        pubDateSmall.textContent = dayjs(news.pubDate).format('ddd, D MMM, YYYY HH:mm');
        pubDate.appendChild(pubDateSmall);
        cardBody.appendChild(pubDate);
    
        // Feedback Section
        const feedbackSection = document.createElement('div');
        feedbackSection.className = 'feedback-section mt-4';
    
        // Username Input
        const usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username:';
        usernameLabel.setAttribute('for', 'usernameInput');
        feedbackSection.appendChild(usernameLabel);
    
        const usernameInput = document.createElement('input');
        usernameInput.className = 'form-control mt-2';
        usernameInput.id = 'usernameInput';
        usernameInput.placeholder = 'Anonymous';
        feedbackSection.appendChild(usernameInput);
    
        // Rating Label
        const ratingLabel = document.createElement('p');
        ratingLabel.className = 'mt-3';
        ratingLabel.textContent = 'Rate this article:';
        feedbackSection.appendChild(ratingLabel);
    
        // Star Rating
        const starContainer = document.createElement('div');
        starContainer.className = 'star-rating';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.dataset.rating = i;
            star.textContent = '★'; // Unicode for star
            starContainer.appendChild(star);
            star.addEventListener('click', (event) => {
                const rating = event.target.dataset.rating;
                document.querySelectorAll('.star').forEach(s => {
                    s.style.color = s.dataset.rating <= rating ? 'gold' : 'gray';
                });
                feedbackSection.dataset.userRating = rating; // Store rating
                //this.newsService.updateRating(news.id, rating);
            });
        }
        feedbackSection.appendChild(starContainer);
    
        // Comment Section
        const commentLabel = document.createElement('label');
        commentLabel.textContent = 'Leave a comment:';
        commentLabel.setAttribute('for', 'commentInput');
        feedbackSection.appendChild(commentLabel);
    
        const commentInput = document.createElement('textarea');
        commentInput.className = 'form-control mt-2';
        commentInput.id = 'commentInput';
        commentInput.rows = 3;
        feedbackSection.appendChild(commentInput);
    
        // Submit Feedback Button
        const submitFeedback = document.createElement('button');
        submitFeedback.className = 'btn btn-primary mt-3';
        submitFeedback.textContent = 'Submit Feedback';
        submitFeedback.addEventListener('click', () => {
            const username = usernameInput.value.trim() || 'Anonymous'; // Default to "Anonymous"
            const rating = feedbackSection.dataset.userRating || 'No rating';
            const comment = commentInput.value.trim() || 'No comment';
            console.log(`User Feedback: Username - ${username}, Rating - ${rating}, Comment - ${comment}`);
            // Process feedback (e.g., save to database, display confirmation message, etc.)
            this.newsService.saveFeedback(news.id, rating, comment, username);
        });
        feedbackSection.appendChild(submitFeedback);
    
        // Append feedback section to card body
        cardBody.appendChild(feedbackSection);
    
        // Append card body to card
        card.appendChild(cardBody);
    
        // Append card to the main element
        element.appendChild(card);

        // element.innerHTML = '';
        // element.innerHTML += `
        // <div class="card mb-3">
        //     <img src="${news.urlToImage}" class="card-img-top" alt="${news.title}"/>
        //     <div class="card-body">
        //         <h5 class="card-title">${news.title}</h5>
        //         <p class="card-text">${news.description}</p>
        //         <p class="card-text">${news.author}</p>
        //         <p class="card-text">
        //             <small class="text-muted">${dayjs(news.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small>
        //         </p>
        //     </div>
        // </div>`;
    };
}