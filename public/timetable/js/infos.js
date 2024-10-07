//从左到右的数据为：周目、第几节课、科目ID、科目名字、其他信息。
//如在周五第三节课有一节课为篮球课，编号是cxk，在舞蹈房上课，则是l("5","3","cxk","篮球课","舞蹈房"");

let cla = [
	{ className: "RFID技术与应用", classID: "08503336-04", classDay: "1", classRoom: "文华-7号教学楼-501", classTeacher: ["刘飞飞", "白瑞琴"], classWeek: ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "1" },
	{ className: "物联网信息安全技术", classID: "08503337-04", classDay: "1", classRoom: "文华-4号教学楼-403", classTeacher: ["李泽仁 "], classWeek: ["10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "2" },
	{ className: "物联网信息安全技术", classID: "08503337-04", classDay: "1", classRoom: "文华-8号教学楼-101", classTeacher: ["李泽仁 "], classWeek: ["10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "3" },
	{ className: "RFID技术与应用", classID: "08503336-04", classDay: "1", classRoom: "文华-7号教学楼-501", classTeacher: ["刘飞飞", "白瑞琴"], classWeek: ["8", "10", "12", "14", "16", "18"], classTime: "4" },

	{ className: "计算机应用技能实训", classID: "08503243-04", classDay: "2", classRoom: "文华-4号教学楼-404", classTeacher: ["高华"], classWeek: ["8", "9", "10", "11", "12", "13", "14"], classTime: "2" },
	{ className: "形势与政策", classID: "00100305-150", classDay: "2", classRoom: "文华-11号教学楼-105", classTeacher: ["鲁玲"], classWeek: ["13", "14", "15", "16"], classTime: "5" },
	{ className: "中国近现代史纲要", classID: "00500301-16", classDay: "2", classRoom: "文华-5号教学楼-102", classTeacher: ["王玮玮"], classWeek: ["18"], classTime: "5" },

	{ className: "数据库原理与应用", classID: "08503338-04", classDay: "3", classRoom: "文华-5号教学楼-307", classTeacher: ["杨旭"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "1" },
	{ className: "计算机组成原理", classID: "08503339-04", classDay: "3", classRoom: "文华-6号教学楼-309", classTeacher: ["杜智宏"], classWeek: ["6", "7", "8", "9"], classTime: "2" },
	{ className: "数据库原理与应用", classID: "08503338-04", classDay: "3", classRoom: "文华-4号教学楼-504", classTeacher: ["杨旭"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "3" },
	{ className: "中国近现代史纲要", classID: "00500301-16", classDay: "3", classRoom: "文华-5号教学楼-104", classTeacher: ["王玮玮"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "4" },

	{ className: "RFID技术与应用", classID: "08503336-04", classDay: "4", classRoom: "文华-4号教学楼-501", classTeacher: ["刘飞飞", "白瑞琴"], classWeek: ["6", "7", "8", "9"], classTime: "1" },
	{ className: "物联网信息安全技术", classID: "08503337-04", classDay: "4", classRoom: "文华-4号教学楼-305", classTeacher: ["李泽仁 "], classWeek: ["10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "1" },
	{ className: "中国近现代史纲要", classID: "00500301-16", classDay: "4", classRoom: "文华-5号教学楼-104", classTeacher: ["王玮玮"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "2" },
	{ className: "计算机应用技能实训", classID: "08503243-04", classDay: "4", classRoom: "文华-4号教学楼-404", classTeacher: ["高华"], classWeek: ["6", "7", "8", "9", "12", "13", "14", "15", "16", "17", "18"], classTime: "3" },
	{ className: "计算机组成原理", classID: "08503339-04", classDay: "4", classRoom: "文华-1号教学楼-207", classTeacher: ["杜智宏"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "4" },

	{ className: "RFID技术与应用", classID: "08503336-04", classDay: "5", classRoom: "文华-6号教学楼-306", classTeacher: ["刘飞飞", "白瑞琴"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "1" },
	{ className: "数据库原理与应用", classID: "08503338-04", classDay: "5", classRoom: "文华-4号教学楼-504", classTeacher: ["杨旭"], classWeek: ["13", "14", "15", "16", "17"], classTime: "2" },
	{ className: "数据库原理与应用", classID: "08503338-04", classDay: "5", classRoom: "文华-4号教学楼-204", classTeacher: ["杨旭"], classWeek: ["6", "7", "8", "9", "10"], classTime: "2" },
	{ className: "RFID技术与应用", classID: "08503336-04", classDay: "5", classRoom: "文华-6号教学楼-309", classTeacher: ["刘飞飞", "白瑞琴"], classWeek: ["10"], classTime: "3" },
	{ className: "计算机组成原理", classID: "08503339-04", classDay: "5", classRoom: "文华-6号教学楼-309", classTeacher: ["杜智宏"], classWeek: ["9"], classTime: "3" },
	{ className: "计算机组成原理", classID: "08503339-04", classDay: "5", classRoom: "文华-2号教学楼-404", classTeacher: ["杜智宏"], classWeek: ["10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "4" },

	// { className: "军事理论", classID: "00100110-23", classDay: "", classRoom: "无固定教室", classTeacher: ["王曌"], classWeek: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "" }

]
//今天是第 week 周
let weekNum = (function getWeekNumber() {
	const currentDate = new Date();
	const firstDayOfSeptember = new Date(2024, 8, 2);
	const diffTime = currentDate.getTime() - firstDayOfSeptember.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const daysDiff = Math.floor(diffTime / oneDay);
	const weekDiff = Math.floor(daysDiff / 7);
	return weekDiff + 1;
})()

console.log("今天是第" + weekNum + "周");


//计算出这周的课程
let weekClass = [];
cla.forEach(i => {
	i.classWeek.forEach(j => {
		if (j == weekNum) {
			weekClass.push(i);
		}
	})
});
//如果是第六周,星期六上星期三的课
if (weekNum == 6) {
	let arr = [
		{ className: "数据库原理与应用", classID: "08503338-04", classDay: "6", classRoom: "文华-5号教学楼-307", classTeacher: ["杨旭"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "1" },
		{ className: "计算机组成原理", classID: "08503339-04", classDay: "6", classRoom: "文华-6号教学楼-309", classTeacher: ["杜智宏"], classWeek: ["6", "7", "8", "9"], classTime: "2" },
		{ className: "数据库原理与应用", classID: "08503338-04", classDay: "6", classRoom: "文华-4号教学楼-504", classTeacher: ["杨旭"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "3" },
		{ className: "中国近现代史纲要", classID: "00500301-16", classDay: "6", classRoom: "文华-5号教学楼-104", classTeacher: ["王玮玮"], classWeek: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], classTime: "4" },
	]
	arr.forEach(i => {
		weekClass.push(i);
	})
	//console.log(weekClass);

}


//把这周的课程按照 l("1", "4", "f", "形式与政治", "L1-601（单周）"); 放在这里
for (let i = 0; i < weekClass.length; i++) {
	//${weekClass[i].classID}
	let abc = ["a", "b", "c", "d", "e", "f"]
	l(`${weekClass[i].classDay}`, `${weekClass[i].classTime}`, `${abc[i % abc.length]}`, `《${weekClass[i].className}》`, `${weekClass[i].classTeacher} ${weekClass[i].classRoom.slice(3)}`)
}

function l(c, t, n, clsname, intext) {
	var id = "info" + c + t, clsid = "info " + n; var elm = document.getElementById(id); if (t == "1") { var time = "08:20-10:50 "; } else if (t == "2") { var time = "10:20-12:00 "; } else if (t == "3") { var time = "14:10-15:50 "; } else if (t == "4") { var time = "16:10-17:50 "; } else if (t == "5") { var time = "19:00-20:40 "; } else { var time = "~ "; };
	elm.innerHTML = time + "<div class='intext'>" + clsname + "</div>" + "<div class='intext'>" + intext + "</div>";
	elm.className = clsid; elm.style.color = "#fff"; elm.style.display = "block"
};

//如果是第六周,在最后提示
if (weekNum == 6) {
	var PSSat = document.getElementById("info65");
	PSSat.innerHTML = "PS：周六上星期三的课";
}

