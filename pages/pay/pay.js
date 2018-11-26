// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        radioValue: 0,
		payid: "",
		payNum: "",
		payAmount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		this.setData({
			payid: options.payid,
			payNum: options.payNum,
			payAmount: options.payAmount
		})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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

    //当radio改变
    radioChange: function(e) {
        var self = this;
        self.setData({
            radioValue: e.detail.value
        })
    },

    //点击支付按钮
    submitFunc: function() {
        var self = this;
		var status = self.data.radioValue;
		if (status === 0) {
            wx.showToast({
                title: "请选择支付方式",
                icon: 'none',
                duration: 2000
            })
		} else if (status == 3) {
            wx.showToast({
                title: "暂未开通微信支付功能",
                icon: 'none',
                duration: 2000
            })
        } else {
            getApp().post('/order/walletPay', {
				payid: self.data.payid, //暂未获取
				userId: wx.getStorageSync('user').id,
				type: status
            }, function(r) {
                if (r.code === 0) {
                    wx.redirectTo({
						url: '/pages/paystatus/paystatus?money=' + self.data.payAmount + '&num=' + self.data.payNum,
					})
                }
            })
        }
    }
})