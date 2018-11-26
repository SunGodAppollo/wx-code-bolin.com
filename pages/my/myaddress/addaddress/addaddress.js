// pages/my/myaddress/addaddress/addaddress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userid:0,
      provincialCity:'',
      name:'',
      phone:'',
      detailedPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      userid:wx.getStorageSync("user").id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //用户名字改变
  nameFunc:function(e){
    this.setData({
        name: e.detail.value
    });
  },
  //手机号改变
  phoneFunc:function(e){
    this.setData({
        phone: e.detail.value
    });
  },
  //城市改变
  provincialCityFunc:function(e){
    this.setData({
        provincialCity: e.detail.value
    });
  },
  //详细地址改变改变
  detailedPathFunc:function(e){
    this.setData({
        detailedPath: e.detail.value
    });
  },


  //添加地址
  add:function(){
    var that=this;
    var url='/mall/addAddress';
    var data={userId:that.data.userid,
              provincialCity:that.data.provincialCity,
              name:that.data.name,
              phone:that.data.phone,
              detailedPath:that.data.detailedPath,
              };
    app.post(url,data,function(resData){
                console.log(resData);
                wx.showToast({
                     title: resData.message,
                     icon: 'succes',
                     duration: 1000,
                     mask:true
                 })
          });

  },
})
