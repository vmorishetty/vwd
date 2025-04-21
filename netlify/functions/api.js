// netlify/functions/api.js
const { storage } = require('../../server/storage');

exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions/api', '');
  const segments = path.split('/').filter(Boolean);
  const method = event.httpMethod;

  try {
    // CORS Headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Content-Type': 'application/json'
    };

    // Handle OPTIONS (preflight) request
    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Preflight call successful' }),
      };
    }

    // API Routes
    // GET /api/categories
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'categories' && !segments[2]) {
      const categories = await storage.getCategories();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(categories),
      };
    }

    // GET /api/articles
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && !segments[2]) {
      const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 10;
      const offset = event.queryStringParameters?.offset ? parseInt(event.queryStringParameters.offset) : 0;
      const articles = await storage.getArticles(limit, offset);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(articles),
      };
    }

    // GET /api/articles/featured
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && segments[2] === 'featured') {
      const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 1;
      const featuredArticles = await storage.getFeaturedArticles(limit);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(featuredArticles),
      };
    }

    // GET /api/articles/trending
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && segments[2] === 'trending') {
      const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 3;
      const trendingArticles = await storage.getTrendingArticles(limit);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(trendingArticles),
      };
    }

    // GET /api/articles/category/:slug
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && segments[2] === 'category' && segments[3]) {
      const slug = segments[3];
      const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 10;
      const offset = event.queryStringParameters?.offset ? parseInt(event.queryStringParameters.offset) : 0;
      const articles = await storage.getArticlesByCategorySlug(slug, limit, offset);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(articles),
      };
    }

    // GET /api/articles/:slug
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && segments[2] && !segments[3]) {
      const slug = segments[2];
      const article = await storage.getArticleBySlug(slug);
      if (!article) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Article not found' }),
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(article),
      };
    }

    // GET /api/articles/:slug/related
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'articles' && segments[2] && segments[3] === 'related') {
      const slug = segments[2];
      const article = await storage.getArticleBySlug(slug);
      if (!article) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Article not found' }),
        };
      }
      const relatedArticles = await storage.getRelatedArticles(article.id, 2);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(relatedArticles),
      };
    }

    // GET /api/search
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'search') {
      const query = event.queryStringParameters?.q || '';
      const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 10;
      const offset = event.queryStringParameters?.offset ? parseInt(event.queryStringParameters.offset) : 0;
      const articles = await storage.searchArticles(query, limit, offset);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(articles),
      };
    }

    // POST /api/newsletter/subscribe
    if (method === 'POST' && segments[0] === 'api' && segments[1] === 'newsletter' && segments[2] === 'subscribe') {
      const { email } = JSON.parse(event.body || '{}');
      if (!email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email is required' }),
        };
      }
      
      try {
        const subscription = await storage.subscribeToNewsletter(email);
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(subscription),
        };
      } catch (error) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: error.message }),
        };
      }
    }

    // Default - Not Found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};