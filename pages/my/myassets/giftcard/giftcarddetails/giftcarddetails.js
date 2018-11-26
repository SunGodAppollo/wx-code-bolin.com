// pages/my/myassets/giftcard/giftcarddetails/giftcarddetails.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nodes: '',
		id: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			id: options.id
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

	//获取数据
	getFunc: function() {
		var self = this;
		getApp().post('/appUser/getActivityInfo',{
			id: self.data.id
		},function(r) {
			if(r.code === 0) {
				// r.data.content = r.data.content.replace(/\<img/gi, '<img style="width:100% !important;height:auto" ');
				self.setData({
					nodes: r.data.content
				})
				wx.setNavigationBarTitle({
					title: r.data.describes,
				})
			}
		})
	}
})