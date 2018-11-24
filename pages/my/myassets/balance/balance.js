// pages/my/myassets/balance/balance.js
import { returnFloat } from '../../../../utils/common.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bindStatus: -1,
		money: 0,
		saleArr: []
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
		this.saleFunc();
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
	
	bindchangeFunc: function(e) {
		this.setData({
			bindStatus: Number(e.detail.value)
		});
	},

	//获取用户余额
	getFunc() {
		var self = this;
		getApp().post('/appUser/getCapitalInfo', {
			userId: wx.getStorageSync('user').id
		}, function (r) {
			if (r.code === 0) {
				self.setData({
					money: returnFloat(r.data.totalAmount)
				})
			}
		})
	},

	//获取充多少送多少
	saleFunc: function() {
		var self = this;
		getApp().post('/appUser/getConfigure', {

		},function(r) {
			if(r.code === 0) {
				self.setData({
					saleArr: r.data
				})
			}
		})
	},

	//点击确认按钮进行充值
	submitFunc: function() {
		var self = this;
		var status = self.data.bindStatus;
		if (status<0) {
			wx.showToast({
				title: "请选择充值金额",
				icon: 'none',
				duration: 2000
			})
		}else{
			var id = self.data.saleArr[status].id;
			console.log(id);
		}
	}
})