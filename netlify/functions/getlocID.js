export async function handler(event, context) {
  let locID = '103'; // デフォルト

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      locID = String(data.locID || locID);
    } catch (err) {
      console.error('[ERROR] Failed to parse JSON:', err);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON body' }),
      };
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locID }),
  };
}
