var express = require("express");
var router = express.Router();
var db = require("../config/db");

var http = require('http')
var cheerio = require('cheerio')  //爬虫

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
            var chapterTitle = chapter.find('strong').text()
            var videos  = chapter.find('.video').children('li')
    
            var chapterData = {
                chapterTitle: chapterTitle,
                videos:[]
            }
    
            videos.each(function(item){
                var video = $(this).find('.J-media-item')
                var videoTitle = video.text()
                var id  = video.attr('href').split('video/')[1]
    
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
        courseData.forEach(function(item){
            var chapterTitle = item.chapterTitle
            // console.log(chapterTitle + '\n')
            console.log(chapterTitle.trim() + '\n')
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
 
module.exports = router;
