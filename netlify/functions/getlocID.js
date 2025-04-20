export async function handler(event, context) {
  let result = {
    method: event.httpMethod,
    rawBody: event.body || null,
    parsed: null,
    error: null,
  };

  if (event.httpMethod === 'POST') {
    try {
      result.parsed = JSON.parse(event.body);
    } catch (err) {
      result.error = err.toString();
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
}
