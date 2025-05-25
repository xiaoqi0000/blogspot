const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 定义user模型
const user = mongoose.model('user', new Schema({
    indexNum: Number,
    timetableNum: Number,
    livesNum: Number,
    GKDTimeTableNum: Number,
}));


//#region
// 定义单门课程对应的子模式，对应原数据结构中cla数组里的每个对象元素
const ClassSchema = new mongoose.Schema({
    className: String,
    classID: String,
    classDay: String,
    classRoom: String,
    classTeacher: [String],  // 使用教师子模式来定义教师数组
    classWeek: [String],
    classTime: String
});
// 定义整体的包含课程列表的模式，对应最外层包含cla数组的那个结构
const CourseScheduleSchema = new mongoose.Schema({
    cla: [ClassSchema]  // 使用课程子模式来定义课程数组
});
//#endregion
//定义timetable模型
const timetable = mongoose.model('timetable', CourseScheduleSchema);


//#region
// 定义单个资源对象的模式
const ResourceItemSchema = new mongoose.Schema({
    name: String,  // 资源名称，如文件或图片的名字，类型为字符串
    path: String,  // 资源对应的路径，这里是URL形式的字符串
    jsonPath: String  // 对应的JSON解析路径，同样是字符串类型
});

// 定义整体包含资源列表的模式，对应最外层包含content数组的那个结构
const ResourceSchema = new mongoose.Schema({
    content: [ResourceItemSchema]  // content字段是一个由ResourceItemSchema结构组成的数组
});
//#endregion
// 定义mpan模型
const mpan = mongoose.model('mpan', ResourceSchema);

//#region
// 定义单个热门内容（hot里的元素）的子模式
const HotItemSchema = new mongoose.Schema({
    title: String,  // 标题，字符串类型
    time: String,  // 时间，字符串类型（这里可以根据实际需求后续优化为日期类型等更合适的格式）
    description: String,  // 描述内容，字符串类型
    image: String  // 对应的图片名称，字符串类型
});

// 定义单个具体内容（content里的元素）的子模式
const ContentItemSchema = new mongoose.Schema({
    tag: [String],  // 标签，是一个字符串数组
    title: String,  // 标题，字符串类型
    description: String,  // 描述内容，字符串类型
    details: String,  // 详细内容，字符串类型
    publisher: String,  // 发布者，字符串类型
    time: String,  // 发布时间，字符串类型（同样可按需优化日期格式）
    like_num: Number,  // 点赞数，数字类型
    video: String,  // 视频文件名，字符串类型
    img: String  // 对应的图片文件名，字符串类型
});

// 定义整体的模式
const PostSchema = new mongoose.Schema({
    hot: [HotItemSchema],  // hot字段是由HotItemSchema结构组成的数组
    content: [ContentItemSchema],  // content字段是由ContentItemSchema结构组成的数组
    tag: [String]  // 总的标签列表，是一个字符串数组
});
//#endregion
// 定义lives模型
const lives = mongoose.model('lives', PostSchema);

//#region
// 定义整体的模式
const labSchema = new mongoose.Schema({
    hot: [HotItemSchema],  // hot字段是由HotItemSchema结构组成的数组
    content: [ContentItemSchema],  // content字段是由ContentItemSchema结构组成的数组
});

//#endregion
// 定义lab模型
const lab = mongoose.model('lab', labSchema);


//#region
// 定义line数组中单个元素（事件记录）的子模式
const LineItemSchema = new mongoose.Schema({
    time: String,  // 时间，这里暂时按原始数据的字符串格式定义，后续可按需优化为日期类型等
    thing: String  // 事件描述，字符串类型
});

// 定义整体的模式
const ProfileSchema = new mongoose.Schema({
    hobby: [String],  // 爱好列表，是一个字符串数组
    line: [LineItemSchema]  // 事件记录线，是由LineItemSchema结构组成的数组
});
//#endregion
// 定义info模型
const info = mongoose.model('info', ProfileSchema);

// 定义game模型
const game = mongoose.model('game', labSchema);


// 定义autox模型
const autox = mongoose.model('autox', labSchema);

// 定义课程的 Schema
const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // 假设 id 是唯一的
    },
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    classNumber: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    weeks: {
        type: [Number],
        required: true
    },
    weekday: {
        type: Number,
        required: true
    },
    classPeriod: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    }
});

// 创建课程模型
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


module.exports = {
    user,
    timetable,
    mpan,
    lives,
    lab,
    info,
    game,
    autox,
    Course
};