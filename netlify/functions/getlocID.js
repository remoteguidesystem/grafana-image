const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'locID.json');

// 初期値を設定（ファイルがなければ）
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({ locID: "103" }), 'utf8');
}

export async function handler(event, context) {
  let locID = "103"; // デフォルト

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      locID = String(data.locID || locID);

      // locID をファイルに保存
      fs.writeFileSync(dataFilePath, JSON.stringify({ locID }), 'utf8');
    } catch (err) {
      console.error('[ERROR] Failed to parse JSON:', err);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON body' }),
      };
    }
  }

  // 最新の locID を返す
  return {
    statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',  // ★ CORS を許可する！
  },
    body: JSON.stringify({ locID }),
  };
}
