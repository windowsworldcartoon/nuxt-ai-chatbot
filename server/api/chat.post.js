export default defineEventHandler(async (event) => {
	if (event.request.method === 'GET') {
	  return {
		statusCode: 503,
		message: 'Service Unavailable',
	  };
	}
  
	// Handle POST requests as before
	// ...
  });
