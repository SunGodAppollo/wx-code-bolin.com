// pages/my/selfinfos/selfinfos.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		infos: {
			headImg: "",
			id: "",
			name: "",
			sex: "",
			birthday: ""
		}
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
		this.infosFunc();
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

	//获取用户信息
	infosFunc: function() {
		var self = this;
		getApp().post('/appUser/getUserInfo',{
			userId: wx.getStorageSync('user').id
		},function(r) {
			if(r.code === 0) {
				self.setData({
					infos: r.data
				})
			}
		});
	},

	//退出登录
	outFunc: function() {
		wx.showModal({
			title: '提示',
			content: '是否退出?',
			confirmColor: '#f5c243',
			success(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '加载中',
					})
					wx.removeStorage({
						key: 'user',
						success(res) {
							setTimeout(function () {
								wx.hideLoading()
								wx.reLaunch({
									url: '/pages/index/index'
								})
							}, 1000)
						}
					})
				}
			}
		})
	},

	//上传头像
	upImgFunc: function() {
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				wx.uploadFile({
					url: getApp().globalData.appUrl +'/appUser/upImgs',
					filePath: tempFilePaths[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data",
						'accept': 'application/json'
					},
					success(res) {
						console.log(res);
						//do something
					}
				})
			}
		})
	}
})