export async function handler(event, context) {
  let locID = '102'; // デフォルト値

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      locID = data.locID || locID;
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON body' }),
      };
    }
  }

  // GETでもPOSTでもOK
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locID }),
  };
}
