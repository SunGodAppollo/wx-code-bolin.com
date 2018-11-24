// pages/my/mycards/mycards.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		lists: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
		this.getFunc();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		console.log(2);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	//获取用户次卡信息
	getFunc: function() {
		var self = this;
		getApp().post('/appUser/MySecondaryCard',{
			userId: wx.getStorageSync('user').id
		},function(r){
			if(r.code === 0) {
				self.setData({
					lists: r.data
				})
			}
		})
	}
})