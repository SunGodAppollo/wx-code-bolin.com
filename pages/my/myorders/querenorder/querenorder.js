// pages/my/myorders/querenorder/querenorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    userid:0,
    address:[],
    suc:[],
    alldata:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var info="[{'shopId': '"+options.shopid+"','infos': [{'productId': '"+options.goodsid+"','num': '1'}]}]";
    that.setData({
      info:info,
      userid:wx.getStorageSync("user").id,
    });
    that.getorder();
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
  /**获取订单信息
  */
  getorder:function(){
    var that=this;
    var url='/order/confirmOrder';
      var data={userId:that.data.userid,info:that.data.info};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          alldata:resData.data,
          address:resData.data.deaddr,
          suc:resData.data.suc,
        });
      });
  }

})
