const fs = require("fs")
const https = require("https")
const html_parser = require("node-html-parser")
const url = "https://game.naver.com/esports/League_of_Legends/schedule/world_championship?date=2022-10"

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

            var finalData = new Object()
            var monthList = new Array()

            for (i = 0; i < monthly_schedule_list.length; i++) {
                let daily_schedule = monthly_schedule_list[i].schedules
                var dailyList = new Array()
                var dailyDate = ""

                for (j = 0; j < daily_schedule.length; j++) {
                    var daily_data = new Object()
                    let detail = daily_schedule[j]

                    dailyDate = detail.date
                    daily_data.time = detail.time
                    daily_data.homeTeam = detail.homeTeam.name
                    daily_data.awayTeam = detail.awayTeam.name

                    dailyList.push(daily_data)
                }

                var monthly_data = new Object()

                monthly_data.date = dailyDate
                monthly_data.dayGame = dailyList

                monthList.push(monthly_data)
            }

            finalData.monthGame = monthList

            var jsonData = JSON.stringify(finalData)

            fs.writeFileSync("lol.json", jsonData)
        })
    }
)