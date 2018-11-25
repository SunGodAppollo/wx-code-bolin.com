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
            birthday: "",
			date: ""
        },
        //修改名称弹窗控件
        nameShow: false,
        username: "",
        //修改性别弹窗控件
        sexShow: false,
        man: {
            name: "男",
            value: "man",
            checked: false
        },
        woman: {
            name: "女",
            value: "woman",
            checked: false
        },
        //修改生日弹窗控件
        dateshow: false,
        userDate: "1970-1-1",
        maxDate: new Date(),
        minDate: new Date(1940, 0, 1)
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
        this.infosFunc();
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

    //获取用户信息
    infosFunc: function() {
        var self = this;
        getApp().post('/appUser/getUserInfo', {
            userId: wx.getStorageSync('user').id
        }, function(r) {
            if (r.code === 0) {
				r.data.date = r.data.birthday;
				r.data.birthday = self.fmtDate(r.data.birthday);
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
                            setTimeout(function() {
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
                            self.changeHeadFunc(r.data);
                        }
                    }
                })
            }
        })
    },
    //更改头像
    changeHeadFunc: function(data) {
        var self = this;
        getApp().post('/appUser/updateUserInfo', {
            id: wx.getStorageSync('user').id,
            headImg: data
        }, function(r) {
            if (r.code === 0) {
                self.setData({
                    "infos.headImg": data
                })
                wx.showToast({
                    title: r.message,
                    icon: 'success',
                    duration: 2000
                })
            } else {
                self.setData({
                    "infos.headImg": data
                })
            }
        });
    },
    //关闭输入控件,并修改名称
    onNameClose(event) {
        var self = this;
        if (event.detail === 'confirm') {
            if (self.data.infos.name === self.data.username) {
                wx.showToast({
                    title: '用户名未更改',
                    icon: 'none',
                    duration: 2000
                })
            } else if (self.data.username === '') {
                wx.showToast({
                    title: '用户名为空',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                getApp().post('/appUser/updateUserInfo', {
                    id: wx.getStorageSync('user').id,
                    name: self.data.username
                }, function(r) {
                    if (r.code === 0) {
                        self.setData({
                            "infos.name": self.data.username
                        })
                        wx.showToast({
                            title: r.message,
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        }
    },

    //打开名称控件
    changeNameFunc: function() {
        var self = this;
        self.setData({
            username: self.data.infos.name,
            nameShow: true
        })
    },

	//跳转到修改名称页面
	goNameFunc: function() {
		var self = this;
		wx.navigateTo({
			url: '/pages/username/username?name='+self.data.infos.name
		})
	},

    //修改名称input
    onNameChange: function(event) {
        this.setData({
            username: event.detail
        })
    },

    //打开性别控件
    changeSexFunc: function() {
        var self = this;
        if (self.data.infos.sex === "man") {
            self.setData({
                "man.checked": true,
                sexShow: true
            })
        } else if (self.data.infos.sex === "woman") {
            self.setData({
                "woman.checked": true,
                sexShow: true
            })
        }
    },

    //当性别选择时
    radioChange: function(e) {
        var self = this;
        if (e.detail.value === "man") {
            self.setData({
                "man.checked": true,
                "woman.checked": false
            })
        } else {
            self.setData({
                "woman.checked": true,
                "man.checked": false
            })
        }
    },

    //关闭性别控件,并修改性别信息
	onSexClose: function (event) {
        var self = this;
        if (event.detail === 'confirm') {
            var sexStatus = null;
            if (self.data.man.checked) {
                sexStatus = "man";
            }
            if (self.data.woman.checked) {
                sexStatus = "woman";
            }
            if (sexStatus) {
                getApp().post('/appUser/updateUserInfo', {
                    id: wx.getStorageSync('user').id,
                    sex: sexStatus
                }, function(r) {
                    if (r.code === 0) {
                        self.setData({
                            "infos.sex": sexStatus
                        })
                        wx.showToast({
                            title: r.message,
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        }
    },

    //打开生日控件
    changeBirthFunc: function() {
        this.setData({
            dateshow: true
        })
    },

    // 关闭生日控件
    onDateClose: function() {
        this.setData({
            dateshow: false
        });
    },

    //改变时间
    onDateChange: function(event) {
		var arr = event.detail.data.pickerValue;
		var dateNum = String(arr[0] + 1940) + "-" + String(arr[1] + 1) + "-" + String(arr[2] + 1);
		this.setData({
			userDate: dateNum
		})
    },

    //时间点击确认
    onDateConfirm: function() {
		var self = this;
		getApp().post('/appUser/updateUserInfo', {
			id: wx.getStorageSync('user').id,
			birthday: self.data.userDate
		}, function (r) {
			if (r.code === 0) {
				self.setData({
					"infos.birthday": self.data.userDate,
					dateshow: false
				})
				wx.showToast({
					title: r.message,
					icon: 'success',
					duration: 2000
				})
			}
		})
    },

	//时间戳转换
	fmtDate(obj){
		var date = new Date(obj);
		var y = 1900 + date.getYear();
		var m = "0" + (date.getMonth() + 1);
		var d = "0" + date.getDate();
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
	},

	//跳转到修改密码页面
	goChangePassword: function() {
		wx.navigateTo({
			url: '/pages/changepassword/changepassword'
		})
	}
})