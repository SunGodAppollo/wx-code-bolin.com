// pages/username/username.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			name: options.name
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

	//改变data.name
	changeNameFunc: function (event) {
		this.setData({
			name: event.detail.value
		})
	},

	//完成
	submitFunc: function() {
		var self = this;
		if(self.data.name === '') {
			wx.showToast({
				title: '用户名为空',
				icon: 'none',
				duration: 2000
			})
		}else{
			getApp().post('/appUser/updateUserInfo', {
				id: wx.getStorageSync('user').id,
				name: self.data.name
			}, function (r) {
				if (r.code === 0) {
					wx.showToast({
						title: r.message,
						icon: 'success',
						duration: 2000
					})
					setTimeout(function(){
						wx.navigateBack({
							delta: 1
						})
					},2000)
				}
			})
		}
	}
})