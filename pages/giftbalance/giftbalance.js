// pages/giftbalance/giftbalance.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		password: "",
		money: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			password: options.password
		})
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
		this.getFunc();
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

	//获取该礼品卡余额
	getFunc: function() {
		var self = this;
		getApp().post('/appUser/queryBalance',{
			number: self.data.password
		},function(r) {
			if(r.code === 0) {
				self.setData({
					money: r.data.denomination
				})
			}
		})
	}
})