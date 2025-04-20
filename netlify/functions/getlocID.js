// グローバルに最新のlocIDを保持（セッション中のみ有効）
let latestLocID = "103";

export async function handler(event, context) {
  // CORS 対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: '',
    };
  }

  // POST: デバイスから locID を更新する
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      if (body.locID) {
        latestLocID = body.locID;
        console.log("locID updated to:", latestLocID);
      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ status: 'success', locID: latestLocID }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid JSON' }),
      };
    }
  }

  // GET: 表示用PCが最新のlocIDを取得
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ locID: latestLocID }),
    };
  }

  // それ以外のメソッドは拒否
  return {
    statusCode: 405,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
}
