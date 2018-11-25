// pages/refund/refund.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgArr: [],
		orderProuctId: "",
		reason: "",
		explainContent: "",
		imgs: ""
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

	//上传图片
	upImgFunc: function () {
		var self = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				wx.uploadFile({
					url: getApp().globalData.appUrl + '/appUser/upImgs',
					filePath: tempFilePaths[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data",
						'accept': 'application/json'
					},
					success(res) {
						var r = JSON.parse(res.data);
						if (r.code === 0) {
							self.showImgFunc(r.data);
						}
					}
				})
			}
		})
	},

	//将图片展示出来
	showImgFunc: function(imgData) {
		var self = this;
		var arr = self.data.imgArr;
		arr.push({ img: imgData});
		self.setData({
			imgArr: arr
		})
		self.changeImgsFunc();
	},

	//关闭某个图片
	closeImgFunc: function(e) {
		var self = this;
		var num = e.target.dataset.index;
		var arr = self.data.imgArr;
		arr.splice(num,1);
		self.setData({
			imgArr: arr
		})
		self.changeImgsFunc();
	},

	//改变退款原因
	reasonFunc: function (event) {
		this.setData({
			reason: event.detail.value
		})
	},

	//改变详细说明
	explainContentFunc: function (event) {
		this.setData({
			explainContent: event.detail.value
		})
	},

	//整合imgs
	changeImgsFunc: function() {
		var self = this;
		var arr = self.data.imgArr;
		var imgStr = "";
		//整合图片
		for (let i = 0; i < arr.length; i++) {
			imgStr += ((i > 0) ? "," : "") + String(arr[i].img);
		}
		self.setData({
			imgs: imgStr
		})
	},

	//点击提交
	submitFunc: function () {
		var self = this;
		if (self.data.reason === '') {
			wx.showToast({
				title: '退款原因不能为空',
				icon: 'none',
				duration: 2000
			})
		} else if (self.data.explainContent === '') {
			wx.showToast({
				title: '详细说明不能为空',
				icon: 'none',
				duration: 2000
			})
		} else {
			getApp().post('/order/refundOrderInfo',{
				userId: wx.getStorageSync('user').id,
				orderProuctId: self.data.orderProuctId,
				reason: self.data.reason,
				explainContent: self.data.explainContent,
				imgs: self.data.imgs
			},function(r) {
				if(r.code === 0) {

				}
			})
		}
	}
})