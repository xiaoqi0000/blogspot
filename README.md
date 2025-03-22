# 我的博客

一枚怀揣梦想、渴望踏入互联网行业的大学生倾心撰写的个人博客。



## 介绍

该项目运用 nodejs 以及 express 框架精心搭建而成，属于前后端未分离的项目类型。



## 数据库json结构

```json
{
    "timestamp":"时间戳",
    "fileName":"文件名" 
}
```

## 接口json结构

```json
{
    "code": 200,
    "msg": "下载成功",
    "data": {
        "name": "全部文件",
        "allDate": [
            {
                "date": "8月15日",
                "allFileName": [
                    {
                        "title": "小狗.png"
                    }
                ]
            },
            {
                "date": "8月16日",
                "allFileName": [
                    {
                        "title": "音乐1.mp3"
                    }
                ]
            }
        ]
    }
}
```

