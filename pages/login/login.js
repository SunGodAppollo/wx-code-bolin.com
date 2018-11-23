// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    // 改变登录状态
    changeStatusFunc: function() {
        var that = this;
        var sta = !that.data.status;
        this.setData({
            status: sta
        });
    },

    //获取验证码
    getCodeFunc: function() {
        wx.request({
            url: getApp().globalData.appUrl + '/send/phone',
            method: 'POST',
            // header: {
            // 	'content-type': 'application/x-www-form-urlencoded'
            // },
            data: {
                username: "15378227660"
            }
        })
    },

    //账号密码登录
    userLoginFunc: function() {
        getApp().post('/appUser/loginAccount', {
            userName: "1",
            password: "1"
        }, function(r) {
            console.log(r);
        });
    },

    //快速登录
    quickLoginFunc: function() {
		getApp().post('/appUser/loginFast', {
			phone: "1",
			verifyCode: "1"
		}, function (r) {
			console.log(r);
		});
    }
})
