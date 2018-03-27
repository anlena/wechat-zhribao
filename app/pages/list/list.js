// pages/list/list.js
Page({
  data:{
    list:[]
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.title,
    })
  },
  onLoad:function(options){
    var that = this;
    this.title = options.title;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/theme/' + options.id,
      header:{
        'Content-type':'application/json'
      },
      success:function(res){
        that.setData({
          list:res.data.stories
        });
        console.log(res.data);
      }
    })
  }
})