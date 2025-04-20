export async function handler(event, context) {
    console.log(`[LOG] HTTP Method: ${event.httpMethod}`);
  console.log(`[LOG] Raw event.body: ${event.body}`);
  let locID = '104'; // デフォルト値

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
            console.log(`[LOG] Parsed data:`, data);
      const rawLocID = data.locID;
      locID = String(rawLocID || locID); // 数値でも文字列でも対応
    } catch (err) {
            console.error('[ERROR] Failed to parse JSON:', err);
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
