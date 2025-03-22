//眼睛部分交互
const eye = document.querySelector("#eye");

eye.addEventListener("click", function () {
    if (eye.src.match("open")) {
        eye.src = eye.src.replace("open", "close");
        //显示今天
        const div1 = document.querySelector(".show-one");
        const div2 = document.querySelector(".show-week");
        div1.style.display = "block";
        div2.style.display = "none";
    } else {
        eye.src = eye.src.replace("close", "open");
        //显示本周
        const div1 = document.querySelector(".show-one");
        const div2 = document.querySelector(".show-week");
        div2.style.display = "block";
        div1.style.display = "none";
    }
});

//更多内列表交互
const listElements = document.querySelectorAll(".list");
// console.log(listElements);
listElements.forEach(element => {
    element.addEventListener("click", function () {
        if (element.classList.contains('active')) {
            // console.log('元素有 active 类。');
        } else {
            // console.log('元素没有 active 类。');
            element.classList.add('active');
            listElements.forEach(otherElement => {
                if (otherElement !== element && otherElement.classList.contains('active')) {
                    otherElement.classList.remove('active');
                }
            });
        }
    });
});

//加载js显示课程表
let cla = []

cla = window.myData


//计算各周的课程
let classes = []
for (let m = 0; m < 19; m++) {
    let weekClass = [];
    cla.forEach(i => {

        if (i.weeks.includes(m)) {
            weekClass.push(i);
        }
    });
    classes.push(weekClass);
}
console.log("classes", classes);


//今天是第 week 周

let weekNum = (function getWeekNumber() {
    const currentDate = new Date();
    const firstDayOfSeptember = new Date(2025, 1, 24);
    const diffTime = currentDate.getTime() - firstDayOfSeptember.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor(diffTime / oneDay);
    const weekDiff = Math.floor(daysDiff / 7);
    return weekDiff + 1;
})()



console.log("今天是第" + weekNum + "周");

//加载课程表，激活对应课程
for (let i = 0; i < listElements.length; i++) {
    // console.log(listElements[i].innerHTML);
    if (listElements[i].innerHTML.match(weekNum)) {
        //激活侧边栏
        listElements[i].classList.add('active');
        //更改标题
        let h3 = document.querySelector(".head h3");
        h3.innerHTML = "第" + weekNum + "周";
        //加载课程表
        loadAllClass(classes[weekNum])
        break;
    }
}
//刷新课程表
/***
 * 加载课程表
 * @param {*} arr 第n周的所有课程
 */
function loadAllClass(arr) {
    //清除所有课程
    let TimeString = ["<div>08:20 - 10:00</div>", "<div>10:20 - 12:00</div>", "<div>14:10 - 15:50</div>", "<div>16:10 - 17:50</div>", "<div>19:00 - 20:40</div>"]
    for (let i = 1; i < 8; i++) {
        let divLoad = document.querySelector(`#d${i}`);
        divLoad.innerHTML = `
                    <div class="card-item">
                        <div>08:20 - 10:00</div>
                    </div>
                    <div class="card-item">
                        <div>10:20 - 12:00</div>
                    </div>
                    <div class="card-item">
                        <div>14:10 - 15:50</div>
                    </div>
                    <div class="card-item">
                        <div>16:10 - 17:50</div>
                    </div>
                    <div class="card-item">
                        <div>19:00 - 20:40</div>
                    </div>`;

    }

    console.log(arr);
    arr.forEach(i => {
        let divLoad = document.querySelector(`#d${i.weekday}`);
        let divChildren = divLoad.children;
        divChildren[(i.classPeriod[0] - 1) / 2].innerHTML = `${TimeString[(i.classPeriod[0] - 1) / 2]}
                        <div>《${i.courseName}》</div>
                        <div>${i.teacher} ${i.building}-${i.classroom}</div > `;

        //背景颜色
        let bgc = ["#108B96", "#2A6E3F", "#C0392B", "#E58E26", "#192A56"]
        divChildren[(i.classPeriod[0] - 1) / 2].style.backgroundColor = bgc[(i.classPeriod[0] - 1) / 2];
        divChildren[(i.classPeriod[0] - 1) / 2].style.color = "#fff";

    });
}

//加载今天课程
let divToday = document.querySelector("#d0")
const today = new Date();
let Today = today.getDay();
if (Today == 0) {
    Today = 7;
}
let divTodayLoad = document.querySelector(`#d${Today}`);
divToday.innerHTML = divTodayLoad.innerHTML;


//侧边栏点击事件--更改周数，加载课程表
// console.log(listElements);
listElements.forEach(element => {
    element.addEventListener("click", function () {
        console.log(element.innerHTML);
        //加载课程表
        loadAllClass(classes[parseInt(element.innerHTML.match(/\d+/)[0])])
        //更改标题
        let h3 = document.querySelector(".head h3");
        h3.innerHTML = element.innerHTML;

    });
});
