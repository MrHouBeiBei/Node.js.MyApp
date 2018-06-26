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
        res.send(JSON.stringify(courseData))
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
    // var options = {
    //     target: 'http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList',
    //     changeOrigin: true,   
    // }
    // var apiProxy = proxy('/api/H5ProbationProductFlow/QueryProductList', {target: 'http://api-test.fcleyuan.com'});
    // proxy(options)
    // res.send(proxy(options))
    res.send('66')
})

// var options = {
//     target: 'http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList',
//     changeOrigin: true,   
// }
router.get("/agent",  function(req, res, next){
    http.get('http://api-test.fcleyuan.com/api/H5ProbationProductFlow/QueryProductList', (rt) => {
        var result;
        rt.on('data', (data) => {
            result = data
        })
        rt.on('end', () => {
            // console.log(result)
            res.json(result)
        })
        
    })
    
})
 
module.exports = router;
