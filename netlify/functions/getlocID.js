
export async function handler(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // ここで locID を取得する処理（環境変数などから仮で設定）
  const locID = process.env.LATEST_LOCID || '103';  // 環境変数が未設定なら '1' を返す
  //  const data = JSON.parse(event.body);
  //  const locID = data.locID;
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locID }),
  };
}
