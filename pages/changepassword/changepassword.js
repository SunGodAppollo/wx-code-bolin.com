// pages/changepassword/changepassword.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		oldPassword: "",
		newPassword: ""
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

	//修改原密码
	onOldChange: function (event) {
		this.setData({
			oldPassword: event.detail.value
		})
	},

	//修改新密码
	onNewChange: function (event) {
		this.setData({
			newPassword: event.detail.value
		})
	},

	//确认提交
	submitFunc: function() {
		var self = this;
		getApp().post('/appUser/updatePassWord',{
			userId: wx.getStorageSync('user').id,
			oldPassWord: self.data.oldPassword,
			newPassWord: self.data.newPassword,
		},function(r){
			if(r.code === 0) {
				getApp().globalData.routerName = 'pages/my/my';
				wx.showToast({
					title: r.message + ",请重新登录",
					duration: 2000
				})
				setTimeout(function(){
					wx.clearStorage();
					wx.redirectTo({
						url: '/pages/login/login'
					})
				},2000)
			}
		})
	}
})