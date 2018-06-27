var express = require("express");
var router = express.Router();
var db = require("../config/db");

var http = require('http')
var cheerio = require('cheerio')  //爬虫
var proxy = require('http-proxy-middleware'); //代理转发

/* GET users listing. */


router.get("/", function(req, res, next) {

    var url = 'http://www.imooc.com/learn/348'
    // var url = 'http://wx.baozhenche.com/static/html/apiHtmlDoc.html?v=1517370#tCarCampaignAddress'

    function filterChapters(html){
        var $ = cheerio.load(html)
        var chapters = $('.chapter')   // chapter html类名
        // [{
        //     chapterTitle: '',
        //     videos:[
        //         title: '',
        //         id:''
        //     ]
        // }]
        var courseData = []
        chapters.each(function(item){
            var chapter = $(this)
            var chapterTitle = chapter.find('h3').text().replace(/\n/gm, '').replace(/ /g,'')
            var videos  = chapter.find('.video').children('li')
            var chapterData = {
                chapterTitle: chapterTitle,
                videos:[]
            }

            videos.each(function(item){
                var video = $(this)
                var videoTitle = video.find('.J-media-item').text().replace(/\n/gm, '').replace(/ /g,'')
                var id  = video.attr('data-media-id').replace(/\n/gm, '').replace(/ /g,'')
                // var id  = video.attr('href').split('video/')[1]
                chapterData.videos.push({
                    title:videoTitle,
                    id:id
                })
            })
            courseData.push(chapterData)
        })
        return courseData
    }
    
    function printCourseInfo(courseData){
        var resultData = {}
        resultData.code = 200
        resultData.data = courseData
        res.status(200)
        res.send(JSON.stringify(resultData))

        courseData.forEach(function(item){
            var chapterTitle = item.chapterTitle
            // console.log(chapterTitle + '\n')
            // console.log(chapterTitle.trim() + '\n')
            console.log(chapterTitle)
        })
    }
    
    http.get(url,function(res){
        var html = '';
        res.on('data',function(data){
            html += data
        })

        res.on('end',function(){
            // console.log(html)
            var courseData = filterChapters(html)
            printCourseInfo(courseData)
        })
    }).on('error',function(){
        console.log('获取课程数据出错')
    })

  })


router.get("/car", function(req, res, next) {
    
    let httpRequest = http.get('http://car.bitauto.com/aodia8l/', (res) => {
        var result = ''
        res.on('data', (data) => {
            result += data
        })
        res.on('end', () => {
            handleData(result)
        })
    })
    httpRequest.end()

    var handleData = function(html) {
        var $ = cheerio.load(html)
        var A8List = $('.list-table').first().children().first().children().eq(1).children()
        // var A8List = $('.list-table')[0].childNodes[0].childNodes[1].childNodes

        var dataList = []
        A8List.each( function(index, el) {
            var item = $(this)
            // console.log(item.find('.txt-left').children().length)

            var carInfo = {}
            if(item.find('.txt').text()) {
                carInfo.name = item.find('.txt').text()
                carInfo.id = item.find('.txt').attr('data-channelid')
                dataList.push(carInfo)
            }
           
        })
        res.send(dataList)
    }
})

// var options = {
//     target: 'http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList',
//     changeOrigin: true,   
// }
// proxy(options)

// 代理 FC试用列表
router.get("/agent",  function(req, res, next){

    let request = http.get('http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList', (rt) => {
        var result = '';
        rt.on('data', (data) => {
            result += data
        })
        rt.on('end', () => {
            handleData(result)
            // res.send(result)
        })
    })
    request.end()

    var handleData = function(data) {
        var copeData = JSON.parse(data)
        copeData.type = 'node代理'
        let item  = {
            name: 'node代理数据修改测试'
        }
        copeData.data.result.push(item)
        res.send(copeData)
    }
    
})
 
module.exports = router;
