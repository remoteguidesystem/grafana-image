async function getLatestImageUrl() {
    const query = `
        from(bucket: "GPS_data")
        |> range(start: -1d)
        |> filter(fn: (r) => r._measurement == "sensor_data" )
        |> filter(fn: (r) => r.device == "demo")
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

    let imageUrl = "https://remoteguidesystem.github.io/grafana-image/yaba101.png";
    for (let line of lines) {
        const columns = line.split(",");
        if (columns.length > 6 && columns[6] === "locID") {
            imageUrl = "https://remoteguidesystem.github.io/grafana-image/yaba" & columns[7] & ".png";
        }
    }
    return imageUrl;
}

async function updateImage() {
    const imageUrl = await getLatestImageUrl();
    document.getElementById("dynamicImage").src = imageUrl;
}

// 5秒ごとに画像を更新
setInterval(updateImage, 5000);
