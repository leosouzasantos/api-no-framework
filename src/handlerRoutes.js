const router = require('./routes');

const handler = (request, response) => {
  const url = request.url;
  const method = request.method;
  const urlSplit = url.split('/').filter(Boolean);

  const result = router.filter((item) => {
    return (
      item.method.toLowerCase() === method.toLowerCase() &&
      item.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
    );
  });

  const execute = result.find((item) => {
    const routerUrlSplit = item.url.split('/').filter(Boolean);
    return urlSplit.length === routerUrlSplit.length;
  });

  if (!execute) {
    response.statusCode = 404;
    return response.end(JSON.stringify({error: 'Not Found'}));
  }

  const routerSplitUrl = execute.url.split('/').filter(Boolean);

  const params = {};

  routerSplitUrl.forEach((item, index) => {
    if (item.startsWith(':')) {
      const formatField = item.replace(':', '');
      params[formatField] = urlSplit[index];
    }
  });
  request.params = params;
  return execute.controller(request, response);
};

module.exports = handler;
