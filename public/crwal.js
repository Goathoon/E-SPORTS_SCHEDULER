const https = require("https")
const parser = require("node-html-parser")
const url = "https://game.naver.com/esports/general/schedule/vct?date=2022-09"

const header = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
}

https.get(
    url, header, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        console.log(data)
        res.on("end", () => {
            const root = parser.parse(data)
            console.log(root)
            const list = root.querySelectorAll("#civ")
            console.log(list)
            list.forEach((item) => {
                console.log(item.innerText.trim())
            })
        })
    }
)