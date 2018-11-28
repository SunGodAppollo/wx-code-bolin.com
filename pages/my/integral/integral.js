// pages/my/integral/integral.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		code:'0',
		log:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getmycode();
		this.getjifenlog();
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
	//获得用户当前积分
	getmycode:function(){
		var that=this;
		var url='/appUser/getCapitalInfo';
			var data={
			userId:wx.getStorageSync("user").id
		};
			app.post(url,data,function(resData){
				console.log(resData);
				 that.setData({
					code:resData.data.integral,
				 })

			});
	},


	//获取积分日志
	getjifenlog:function(){
		var that=this;
		var url='/appUser/getIntegralDetail';
			var data={
			userId:wx.getStorageSync("user").id
		};
			app.post(url,data,function(resData){
				console.log(resData);
				 that.setData({
				 	log:resData.rows,
				 })

			});
	}
})
