localStorage.clear();
//DOM parser 객체 생성
const parser = new DOMParser();

//동영상 autoplay안 되는 문제 해결
await document.querySelector(".banner-video").play();

function loadJson() {
    return fetch("./lol.json", { method: "GET" }).then((response) => response.json()).then((json) => json.monthGame);
}
const addedTeam = new Set(); //필터 중복 빼기위해서.
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
            // const addFilter = document.createElement("div");
            // addFilter.className = "add-list-list";
            const team1 = daygame["homeTeam"];
            const team2 = daygame["awayTeam"];
            cardTime.innerText = daygame["time"];
            teamHome.innerText = team1;
            awayHome.innerText = team2;

            teams.add(team1);
            teams.add(team2);

            // addFilter.append();
        }
    }
    const teams_sort = Array.from(teams);
    teams_sort.sort();


    //게임 필터 add button 및 필터효과 추가
    const addbtn = document.querySelector(".tag-add-btn-container");
    addbtn.addEventListener("click", () => {
        fetch("./components.html", { method: "GET" })
            .then((res) => res.text())
            .then((res) => {
                const doc = parser.parseFromString(res, "text/html");
                const add_container = doc.getElementsByClassName(
                    "add-list-list-container"
                );
                const addFilterteam = doc.querySelector(".add-list-list");
                for (let i = 0; i < teams_sort.length; i++) {
                    const teamfilter = document.createElement("div");
                    teamfilter.className = "add-list-item";

                    const teamname = document.createElement("label");
                    teamname.innerText = teams_sort[i];
                    teamname.className = "add-list-item-text";

                    const teamname_checkbox = document.createElement("input");
                    teamname_checkbox.className = "add-list-item-checkbox";
                    teamname_checkbox.type = "checkbox";
                    teamname_checkbox.name = "championship";
                    teamname_checkbox.id = "add-list-item_LCK";
                    teamname_checkbox.value = teams_sort[i];

                    teamfilter.append(teamname);
                    teamfilter.append(teamname_checkbox);
                    addFilterteam.append(teamfilter);
                }
                //(추가하는 컴포넌트가 렌더링된 상태일 때) addbtn의 이미지를 변경하는 조건문;
                const make_src = addbtn.children[0].src.split("/").slice(-1); //path를 불러오기 빡세서 배열로 만들고 그냥 강제로 불러왔습니다.
                if (make_src[0] === "remove.svg") {
                    const dom_remove = document.querySelector(
                        ".add-list-list-container"
                    );
                    dom_remove.remove();
                    addbtn.children[0].src = "./asset/add.svg";
                } else {
                    let filter_arr;

                    const script_tag = document.querySelector("script");
                    script_tag.insertAdjacentElement(
                        "beforebegin",
                        add_container[0]
                    );
                    addbtn.children[0].src = "./asset/remove.svg";
                    const checkboxes = document.getElementsByClassName(
                        "add-list-item-checkbox"
                    );
                    for (let i = 0; i < checkboxes.length; i++) {
                        if (filter_arr) {
                            for (let j = 0; j < filter_arr.length - 1; j++) {
                                if (checkboxes[i].value == filter_arr[j]) {
                                    checkboxes[i].checked = "True";
                                }
                            }
                        }
                    }
                }
                const addFilter = document.querySelector(".add-list-btn");

                addFilter.addEventListener("click", () => {
                    const checkboxes = document.getElementsByClassName(
                        "add-list-item-checkbox"
                    );
                    const addedFilter = document.querySelector('.tag-bar-list');
                    for (let i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            // console.log(checkboxes[i].value);
                            // 해당 value들을 arr에 저장함으로써 filter 기능 구현.

                            const tag = document.createElement('div');
                            tag.className = "tag";

                            const tagContainer = document.createElement('div');
                            tagContainer.className = "tag-container";

                            const iconlol = document.createElement("div");
                            iconlol.className = "tag-icon-container icon-container";
                            const iconimg = document.createElement("img");
                            iconimg.src = "./asset/icons8-league-of-legends.svg";
                            iconimg.alt = "tag-icon";
                            iconimg.className = "tag-icon icon";
                            iconlol.append(iconimg);

                            const tagteam = document.createElement('div');
                            tagteam.className = "tag-label";
                            tagteam.innerHTML = checkboxes[i].value;
                            if (addedTeam.has(checkboxes[i].value)) {
                                continue;
                            }
                            addedTeam.add(checkboxes[i].value);

                            const tagRemove = document.createElement('div');
                            tagRemove.className = "tag-remove-container icon-container";
                            const tagRemoveImg = document.createElement('img');
                            tagRemoveImg.src = "./asset/close.svg";
                            tagRemoveImg.alt = "tag-remove";
                            tagRemoveImg.className = "tag-remove icon"
                            tagRemove.append(tagRemoveImg);
                            tagContainer.append(iconlol);
                            tagContainer.append(tagteam);
                            tagContainer.append(tagRemove);
                            tag.append(tagContainer);
                            addedFilter.append(tag);
                            tagRemove.addEventListener('click', () => {
                                tagRemove.parentNode.parentNode.remove();
                                console.log(tagRemove.previousSibling.innerHTML);
                                addedTeam.delete(tagRemove.previousSibling.innerHTML);
                                doFilter(addedTeam);
                                if (addedTeam.length === 0) {
                                    for (let i = 0; i < allgames.length; i += 2) {
                                        allgames[i].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
                                    }
                                }
                            })

                        }
                    }
                    const dom_remove = document.querySelector(
                        ".add-list-list-container"
                    );
                    dom_remove.remove();
                    addbtn.children[0].src = "./asset/add.svg";
                    doFilter(addedTeam);

                });

            });
    });

});


//주간 달력, 일간 달력 클릭 이벤트 발생
//초기화면을 무엇으로 할지 생각해주세요. 일단 초기화면은 일간 일정으로 정했습니다.
const toggleDayWeek = document.querySelector(".mode");
toggleDayWeek.addEventListener("click", () => {
    const dayCalendar = document.querySelector(".calendar_day-list");
    const weekCalendar = document.querySelector(".calendar_week-list");
    dayCalendar.classList.toggle("act");
    weekCalendar.classList.toggle("act");
    const iconImage = toggleDayWeek.children[0].children[0];
    const make_iconsrc = iconImage.src.split("/").slice(-1);
    if (make_iconsrc[0] === "calendar_view_week.svg") {
        iconImage.src = "./asset/calendar_view_day.svg"
    }
    else {
        iconImage.src = "./asset/calendar_view_week.svg";
    }
});

function doFilter(set) {
    const filter_arr = Array.from(set);
    const allgames = document.getElementsByClassName('hor-card-name');
    for (let i = 0; i < allgames.length; i += 2) {
        allgames[i].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
    }
    for (let j = 0; j < filter_arr.length; j++) {
        for (let i = 0; i < allgames.length; i += 2) {
            if (allgames[i].innerHTML !== filter_arr[j] &&
                allgames[i + 1].innerHTML !== filter_arr[j]) {
                allgames[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }
}
