async function fetchLocIdAndUpdateImage() {
  try {
    const response = await fetch('/.netlify/functions/getlocID');
    const data = await response.json();

    const locID = data.locID;  // 例: "42"
    console.log("取得した locID:", locID);

    // 画像のファイル名（例: yaba42.jpg）を作成
    const imageUrl = `/images/yaba${locID}.jpg`;

    const imgElement = document.getElementById('location-image');
    imgElement.src = imageUrl;

    // 画像読み込み失敗時のフォールバック
    imgElement.onerror = function () {
      imgElement.src = '/images/default.jpg';
    };
  } catch (error) {
    console.error("画像の更新に失敗:", error);
  }
}

// 1秒ごとに locID を取得して画像を更新
setInterval(fetchLocIdAndUpdateImage, 5000);

// 初回読み込みでも即実行
document.addEventListener('DOMContentLoaded', fetchLocIdAndUpdateImage);
