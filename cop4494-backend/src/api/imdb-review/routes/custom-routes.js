module.exports = {
  routes: [
    {
      "method": "POST",
      "path": "/imdb-reviews/analyze",
      "handler": "imdb-review.analyzeSentiment",
      "config": {
        "policies": []
      }
    }
  ]
}
