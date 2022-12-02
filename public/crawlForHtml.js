//DOM parser 객체 생성
const parser = new DOMParser();

function loadJson() {
    return fetch("./lol.json", { method: "GET" }).then((response) => response.json()).then((json) => json.monthGame);
}

loadJson().then((schedules) => {
    const teams = new Set();
    for (let day = 0; day < schedules.length; day++) {
        const htmlForDay = document.querySelector(".calendar_day");
        const date = schedules[day]["date"];
        const dayInfo = document.createElement("div");
        dayInfo.className = "calendar_day-date";

        dayInfo.innerHTML = date;
        htmlForDay.appendChild(dayInfo);
        for (let game = 0; game < schedules[day]["dayGame"].length; game++) {
            const container1 = document.createElement("div");
            container1.className = "calendar_day-match-list";
            htmlForDay.appendChild(container1);
            // 이후에 해당 container1의 원소들 이후에 child노드로 append과정
            const card = document.createElement("div");
            card.className = "hor-card";

            const cardChild = document.createElement("div");
            cardChild.className = "hor-card-container";

            const cardTime = document.createElement("div");
            cardTime.className = "hor-card-time";
            cardChild.append(cardTime);
            const matchContainer = document.createElement("div");
            matchContainer.className = "hor-card-match-container";
            cardChild.append(matchContainer);

            const teamHome = document.createElement("div");
            teamHome.id = "hor-card-team_1-name"; teamHome.className = "hor-card-name";
            matchContainer.append(teamHome);
            const emblem1 = document.createElement("div");
            emblem1.id = "hor-card-team_1-embelm-container";
            emblem1.className = "hor-card-embelm-container icon-container";
            const img1 = document.createElement("img");
            img1.src = "./asset/close.svg";
            img1.alt = "hor-card-team_1-embelm";
            img1.id = "hor-card-team_1-embelm";
            img1.className = "hor-card-emblem icon";
            emblem1.append(img1);
            matchContainer.append(emblem1);

            const vs = document.createElement("div");
            vs.className = "hor-card-vs";
            matchContainer.append(vs);

            const emblem2 = document.createElement("div");
            emblem2.id = "hor-card-team_2-emblem-container icon-container";
            emblem2.className = "hor-card-emblem-container icon-container";
            const img2 = document.createElement("img");
            img2.src = "./asset/close.svg";
            img2.alt = "hor-card-team_2-embelm";
            img2.id = "hor-card-team_2-embelm";
            img2.className = "hor-card-emblem icon";
            emblem2.append(img2);
            matchContainer.append(emblem2);

            const awayHome = document.createElement("div");
            awayHome.id = "hor-card-team_2-name"; awayHome.className = "hor-card-name";
            matchContainer.append(awayHome);

            card.append(cardChild);
            container1.append(card);
            htmlForDay.append(container1);
            /////////////////////////////////////////////////////// 기본 component 끝
            const daygame = schedules[day]["dayGame"][game];
            const addFilter = document.createElement("div");
            addFilter.className = "add-list-list";


            const team1 = daygame["homeTeam"];
            const team2 = daygame["awayTeam"];
            cardTime.innerText = daygame["time"];
            teamHome.innerText = team1;
            awayHome.innerText = team2;

            teams.add(team1);
            teams.add(team2);

            addFilter.append();
        }
    }
    const teams_sort = Array.from(teams);
    teams_sort.sort();


    const addFilter = document.querySelector(".add-list-list");
    for (let i = 0; i < teams_sort.length; i++) {
        const teamfilter = document.createElement("div");
        teamfilter.className = "add-list-item";

        const teamname = document.createElement("label");
        teamname.className = "add-list-item-text";

        const teamname_checkbox = document.createElement("input");
        teamname_checkbox.className = "add-list-item-checkbox";
        teamname_checkbox.type = "checkbox";
        teamname_checkbox.name = "championship";
        teamname_checkbox.id = "add-list-item_LCK";
        teamname_checkbox.value = teams_sort[i];

        teamfilter.append(teamname);
        teamfilter.append(teamname_checkbox);
        addFilter.append(teamfilter);
    }

});
