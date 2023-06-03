'use strict';

/**
 * imdb-review service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::imdb-review.imdb-review');
