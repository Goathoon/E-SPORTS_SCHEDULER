//DOM parser 객체 생성
const parser = new DOMParser();


//게임 필터 add button
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
                if (localStorage.getItem("checked")) {
                    filterString = localStorage.getItem("checked");
                    const filter_arr = filterString.split('?');
                    console.log(filter_arr);
                }
                const checkboxes = document.getElementsByClassName('add-list-item-checkbox');
                console.log(checkboxes);
                const script_tag = document.querySelector('script');
                script_tag.insertAdjacentElement('beforebegin', add_container[0]);
                addbtn.children[0].src = './asset/Arrow.svg';
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
                            localStorage.setItem("", filterString);
                        }
                    }
                }
                console.log('click');
                const dom_remove = document.querySelector('.add-list-list-container');
                dom_remove.remove();
                addbtn.children[0].src = './asset/add.svg';
            });
        });
});


