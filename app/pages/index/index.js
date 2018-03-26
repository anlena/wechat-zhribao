//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  loadMore:function(e){
    if(this.data.list.length === 0) return;
    var date = this.getNextDate();
    var that = this;
    this.setData({
      loadding:true
    })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(Number(utils.formatDate(date)) + 1)),
      header:{
        'Content-type':'application/json'
      },
      success:function(res){
        that.setData({
          loadding:false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate:function(){
    var now = new Date();
    now.setDate(now.getDate() - this.index++);
    return now;
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({   // 设置返回值
          banner: res.data.top_stories,  //banner图片数据
          list: [{ header: '今日热闻' }].concat(res.data.stories)  //热闻数据list
        })
      }
    })
    this.index = 1;
  }
})
