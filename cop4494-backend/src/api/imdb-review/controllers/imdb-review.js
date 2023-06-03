'use strict';

/**
 * imdb-review controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::imdb-review.imdb-review', ({strapi}) => ({
  async analyzeSentiment(ctx) {
    const axios = require('axios');
    const {id} = ctx.request.body;


    const reviewEntity = await strapi.db.query("api::imdb-review.imdb-review").findOne({where: {id: id}});
    if (!reviewEntity) {
      throw new Error(`No review found with id ${id}`);
    }

    const review = reviewEntity.review;


    let data = {
      "kind": "SentimentAnalysis",
      "parameters": {
        "modelVersion": "latest",
        "opinionMining": "True"
      },
      "analysisInput": {
        "documents": [
          {
            "id": id.toString(),
            "language": "en",
            "text": review
          }
        ]
      }
    };


    const azureEndpoint = process.env.AZURE_ENDPOINT  // replace with your actual endpoint
    const azureApiKey = process.env.AZURE_API_KEY;  // replace with your actual key


    let response = await axios.post(azureEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': azureApiKey
      }
    });

    const {sentiment, confidenceScores} = response.data.results.documents[0];

    const sentimentResponse = {
      sentiment,
      confidenceScores,
    };
    const query = {
      where: {
        id: reviewEntity["id"],
      },
      data: {
        sentiment: sentiment
      }
    };

    await strapi.db.query("api::imdb-review.imdb-review").update(query);

    return sentimentResponse;
  },
}));
