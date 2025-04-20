exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { locID } = JSON.parse(event.body);

  // locID に応じた画像ファイル名を生成
  const imageFile = `yaba${locID}.jpg`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageUrl: `/images/${imageFile}`
    })
  };
};
