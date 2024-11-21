export class Feedback
{
    constructor({articleId, rating, comment, trustMeter}) {
        this.articleId = articleId;
        this.rating = rating;
        this.comment = comment;
        this.trustMeter = trustMeter;
    }
}