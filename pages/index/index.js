//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    activityimg:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //设置页面信息
    this.setPageContent();
    this.setActivityImg();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //设置页面内容
  setPageContent:function(){
    var that=this;
    var url='/appUser/getActivityList';
    console.log(url);
    var data={pageNumber:'1',pageSize:'10'};
      app.post(url,data,function(resData){
        that.setData({
          rows:resData.rows
        })
        console.log(resData);
      });
  },
  //设置活动图
  setActivityImg:function(){
    var that=this;
    var url='/appUser/getAdvertisement';
    var data={};
      app.post(url,data,function(resData){
        that.setData({
          activityimg:resData.data[0].imgPath
        })
        console.log(resData);
      });
  },

  //显示详情页面
  show:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/myassets/giftcard/giftcarddetails/giftcarddetails?id='+id
    })

  }
})
