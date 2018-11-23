// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: true,
        username: "",
        password: "",
        tel: "",
        code: "",
		codeTime: 0
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
            status: sta,
			username: "",
			password: "",
			tel: "",
			code: ""
        });
    },

    //获取验证码
    getCodeFunc: function() {
		var self = this;
		if(self.data.tel.length !== 11) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none',
				duration: 2000
			})
			return;
		}
        getApp().post('/send/phone', {
			userName: self.data.tel
        }, function (r) {
        	if(r.code === 0) {
        		wx.showToast({
        			title: r.message,
        			icon: 'success',
        			duration: 2000,
        			success: function() {
						var time = 60;
						var timer = setInterval(function () {
							time--;
							self.setData({
								codeTime: time
							});
							if (time <= 0) {
								clearInterval(timer);
							}
						}, 1000);
        			}
        		})
        	}
        });
    },

    //账号密码登录
    userLoginFunc: function() {
		var self = this;
        getApp().post('/appUser/loginAccount', {
			userName: this.data.username,
			password: this.data.password
        }, function(r) {
            if(r.code === 0) {
				self.successFunc(r);
			}
        });
    },

    //快速登录
    quickLoginFunc: function() {
        getApp().post('/appUser/loginFast', {
            phone: this.data.tel,
			verifyCode: this.data.code
        }, function(r) {
			if (r.code === 0) {
				self.successFunc(r);
			}
        });
    },

    //改变账号
    usernameFunc: function(e) {
        this.setData({
            username: e.detail.value
        });
    },

    //改变密码
    passwordFunc: function(e) {
        this.setData({
            password: e.detail.value
        });
    },

    //改变手机号
    telFunc: function(e) {
        this.setData({
            tel: e.detail.value
        });
    },

    //改变验证码
    codeFunc: function(e) {
        this.setData({
            code: e.detail.value
        });
    },

	//请求成功后
	successFunc: function(r) {
		var self = this;
		r.data.timeStamp = Number(new Date());
		wx.setStorage({
			key: "user",
			data: r.data
		})
		wx.showToast({
			title: r.message,
			icon: 'success',
			duration: 2000,
			success: function() {
				setTimeout(function() {
					wx.switchTab({
						url: "/"+getApp().globalData.routerName
					})
				},2000);
			}
		})
	}
})