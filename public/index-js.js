<<<<<<< HEAD
//DOM parser 객체 생성
const parser = new DOMParser();


//게임 필터 add button 및 필터효과 추가
const addbtn = document.querySelector('.tag-add-btn-container');
addbtn.addEventListener('click', () => {
    fetch('./components.html', { method: 'GET' })
        .then((res) => res.text())
        .then((res) => {
            const doc = parser.parseFromString(res, 'text/html');
            const add_container = doc.getElementsByClassName('add-list-list-container');
            //(추가하는 컴포넌트가 렌더링된 상태일 때) addbtn의 이미지를 변경하는 조건문;
            const make_src = (addbtn.children[0].src).split('/').slice(-1); //path를 불러오기 빡세서 배열로 만들고 그냥 강제로 불러왔습니다.
            let filterString = "";
            if (make_src[0] === 'Arrow.svg') {
                //addbtn의 이미지를 minus.svg 파일로 변경해주세요 
                const dom_remove = document.querySelector('.add-list-list-container');
                dom_remove.remove();
                addbtn.children[0].src = './asset/add.svg';
            }
            else {
                let filter_arr;
                if (localStorage.getItem("checked")) {
                    filterString = localStorage.getItem("checked");
                    filter_arr = filterString.split('?');
                }
                const script_tag = document.querySelector('script');
                script_tag.insertAdjacentElement('beforebegin', add_container[0]);
                addbtn.children[0].src = './asset/Arrow.svg';
                const checkboxes = document.getElementsByClassName('add-list-item-checkbox');
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
            const addFilter = document.querySelector('.add-list-btn');
            addFilter.addEventListener('click', () => {
                const checkboxes = document.getElementsByClassName('add-list-item-checkbox');
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        // console.log(checkboxes[i].value);
                        // 해당 value들을 arr에 저장함으로써 filter 기능 구현.
                        if (!(filterString.includes(checkboxes[i].value))) { //중복 필터 제거
                            filterString += checkboxes[i].value + "?";
                            localStorage.setItem("checked", filterString);
                            //-----------아래는 예시 코드----------------//
                            // localStorage.setItem("checked", filterString + "MSI?");
                        }
                    }
                }
                const dom_remove = document.querySelector('.add-list-list-container');
                dom_remove.remove();
                addbtn.children[0].src = './asset/add.svg';
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
=======
//DOM parser 객체 생성
const parser = new DOMParser();

//동영상 autoplay안 되는 문제 해결
await document.querySelector(".banner-video").play();

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
            //(추가하는 컴포넌트가 렌더링된 상태일 때) addbtn의 이미지를 변경하는 조건문;
            const make_src = addbtn.children[0].src.split("/").slice(-1); //path를 불러오기 빡세서 배열로 만들고 그냥 강제로 불러왔습니다.
            let filterString = "";
            if (make_src[0] === "remove.svg") {
                const dom_remove = document.querySelector(
                    ".add-list-list-container"
                );
                dom_remove.remove();
                addbtn.children[0].src = "./asset/add.svg";
            } else {
                let filter_arr;
                if (localStorage.getItem("checked")) {
                    filterString = localStorage.getItem("checked");
                    filter_arr = filterString.split("?");
                }
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
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        // console.log(checkboxes[i].value);
                        // 해당 value들을 arr에 저장함으로써 filter 기능 구현.
                        if (!filterString.includes(checkboxes[i].value)) {
                            //중복 필터 제거
                            filterString += checkboxes[i].value + "?";
                            localStorage.setItem("checked", filterString);
                            //-----------아래는 예시 코드----------------//
                            // localStorage.setItem("checked", filterString + "MSI?");
                        }
                    }
                }
                const dom_remove = document.querySelector(
                    ".add-list-list-container"
                );
                dom_remove.remove();
                addbtn.children[0].src = "./asset/add.svg";
            });
        });
});

//주간 달력, 일간 달력 클릭 이벤트 발생
//초기화면을 무엇으로 할지 생각해주세요. 일단 초기화면은 일간 일정으로 정했습니다.
const toggleDayWeek = document.querySelector(".mode");
toggleDayWeek.addEventListener("click", () => {
    const dayCalendar = document.querySelector(".calendar_day-list");
    const weekCalendar = document.querySelector(".calendar_week-list");
    console.log(dayCalendar);
    console.log(weekCalendar);
    dayCalendar.classList.toggle("act");
    weekCalendar.classList.toggle("act");
    const iconImage = toggleDayWeek.children[0].children[0];
    const make_iconsrc = iconImage.src.split("/").slice(-1);
    console.log(make_iconsrc);
    if (make_iconsrc[0] === "calendar_view_week.svg") {
        iconImage.src = "./asset/calendar_view_day.svg"
    }
    else {
        iconImage.src = "./asset/calendar_view_week.svg";
        console.log('here');
    }
});
>>>>>>> add
