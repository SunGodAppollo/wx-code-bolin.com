//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log("code的值: "+res.code);
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
	post: function (url, data, func) {
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: getApp().globalData.appUrl + url,
			data: data,
			method: "POST",
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (r) {
				wx.hideLoading();
				if (Number(r.data.code) === -1) {
					wx.showToast({
						title: r.data.message,
						icon: 'none',
						duration: 1500
					})
				}
				return func(r.data);
			},
			fail: function () {
				wx.hideLoading();
			}
		});
	},
	isLogin: function () {
		wx.getStorage({
			key: "user",
			success(r) {
				var now = Number(new Date());
				if ((now - r.data.timeStamp) > (1000 * 60 * 60 * 24)) {
					wx.clearStorage();
				}
			},
			fail(r) {
				let pages = getCurrentPages();
				let currPage = null;
				if (pages.length) {
					currPage = pages[pages.length - 1];
				}
				getApp().globalData.routerName = currPage.__route__;
				wx.redirectTo({
					url: '/pages/login/login'
				})
			}
		});
	},
	globalData: {
		userInfo: null,
		appUrl: "http://39.104.238.35:3333",
		routerName: ""
	}
})