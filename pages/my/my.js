// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
		infos: {
			backgroundPicUrl: "",
			cardCore: "",
			logoUrl: "",
			oneCode: "",
			qrCode: "",
			title: ""
		}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        getApp().isLogin();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
		this.getInfosFunc();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    //获取会员卡数据
    getInfosFunc() {
		var self = this;
		getApp().post("/appUser/getCardInfo", {
            userId: wx.getStorageSync("user").id
        }, function(r) {
            if(r.code === 0) {
				self.setData({
					infos: r.data
				})
			}
        });
    },

	//跳转到付款码页面
	goPayCodeFunc: function() {
		wx.navigateTo({
			url: '/pages/paymentcode/paymentcode',
		})
	}
})