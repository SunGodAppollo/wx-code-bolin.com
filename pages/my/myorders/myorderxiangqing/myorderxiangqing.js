// pages/my/myorders/myorderxiangqing/myorderxiangqing.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    order:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);

    that.setData({
      id:options.id,
    });
    that.getxiangqing();
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
  //获取订单详情
  getxiangqing:function(){
    var that=this;
  	var id=that.data.id;
    var userid=wx.getStorageSync("user").id;
  	var url='/order/getOrderDetails';
  		var data={orderId:id,userId:userid,};
  		app.post(url,data,function(resData){
  			console.log(resData);
  			that.setData({
  				order:resData.data,
  			})

  		});
  },

	goChatFunc: function() {
		wx.navigateTo({
			url: '/pages/chat/chat',
		})
	}
})
