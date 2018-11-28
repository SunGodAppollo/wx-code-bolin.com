// pages/my/myaddress/editaddress/editaddress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    address:'',
    provincialCity:'',
    name:'',
    phone:'',
    detailedPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    that.setData({
      id:options.id,
    });
    that.getaddressinfo();
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



  //获得地址信息
  getaddressinfo:function(){
    var that=this;
    var url='/mall/getAddress';
    var data={id:that.data.id,
                userId:wx.getStorageSync("user").id,
              };
    app.post(url,data,function(resData){
                console.log(resData);
                that.setData({
                  address:resData.data,
                  provincialCity:resData.data.provincialCity,
                  name:resData.data.name,
                  phone:resData.data.phone,
                  detailedPath:resData.data.detailedPath,
                });
          });
  },
  //修改地址
  toeditaddress:function(){
    var that=this;
    var url='/mall/editAddress';
    var data={userId:wx.getStorageSync("user").id,
              id:that.data.id,
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
                 });
                 wx.navigateBack({
                    delta: '1'
                  });
          });
  }

})
