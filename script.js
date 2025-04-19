async function getLatestImageUrl() {
    console.time("getLatestImageUrl");
    const query = `
        from(bucket: "GPS_data")
        |> range(start: -10s)
        |> filter(fn: (r) => r._measurement == "sensor_data" )
        |> filter(fn: (r) => r.device == "GPS-MW01")
        |> filter(fn: (r) => r._field == "locID" )        
        |> last()
    `;

    const response = await fetch("https://us-east-1-1.aws.cloud2.influxdata.com/api/v2/query", {
        method: "POST",
        headers: {
            "Authorization": "Token eU2wHHZ_bamNRtQ6Cc6EsCehGdbqowfiMIYruds7juUEUVfApEsveBr4K3jMVhr5u8AeLPyBDDgijLECTjE9HQ==",
            "Content-Type": "application/vnd.flux",
            "Accept": "application/csv"
        },
        body: query
    });

    const text = await response.text();
    console.log(text); // デバッグ用
    const lines = text.split("\n");

    let imageUrl = "/images/yaba101.jpg";
    for (let line of lines) {
        const columns = line.split(",");
        console.log("columns[6] locID :", columns[6]);
        if (columns.length > 6 && columns[7] === "locID") {
            imageUrl = "/images/yaba" + columns[6] + ".jpg";
        }
    }
        console.log("Image URL:", imageUrl);
        console.timeEnd("getLatestImageUrl");
    return imageUrl;
}

async function updateImage() {
    const imageUrl = await getLatestImageUrl();
    document.getElementById("dynamicImage").src = imageUrl;
}

// 5秒ごとに画像を更新
// setInterval(updateImage, 2000);

async function updateLoop() {
    await updateImage();
    setTimeout(updateLoop, 1000); // 1秒後に次の更新を開始
}

updateLoop(); // 最初の呼び出し
