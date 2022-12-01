const https = require("https")
const html_parser = require("node-html-parser")
const url = "https://game.naver.com/esports/League_of_Legends/schedule/world_championship?date=2022-11"

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

        res.on("end", () => {
            const root = html_parser.parse(data)
            const list = root.querySelectorAll("#__NEXT_DATA__")
            list.forEach((item) => {
                schedule_json = item.innerText.trim()
            })

            schedule_json = JSON.parse(schedule_json)
            monthly_schedule_list = schedule_json.props.initialState.schedule.monthSchedule

            for (i = 0; i < monthly_schedule_list.length; i++) {
                let daily_schedule = monthly_schedule_list[i].schedules

                for (j = 0; j < daily_schedule.length; j++) {
                    let detail = daily_schedule[j]
                    let track = detail.date + " " + detail.time + " " + detail.homeTeam.name + " " + detail.awayTeam.name
                    console.log(track)
                }
            }
        })
    }
)