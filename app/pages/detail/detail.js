var WxParse = require('../../wxParse/wxParse.js');

Page({
  data:{
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '详情页面',
    })
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success:function (res) {
        console.log(res);
        var article = res.data.body;
        WxParse.wxParse('article', 'html', article, that, 0);
        that.setData({
          art: res.data,
          css:res.data.css
        })
      }
    })
  }
})