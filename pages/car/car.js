// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lists: [],
        pageNumber: 1,
        pageSize: 10,
        allIsChecked: false,
        allPrice: 0,
		pageFinesh: true
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
		this.setData({
			pageNumber: 1,
			allIsChecked: false,
			allPrice: 0,
			pageFinesh: true
		})
        this.getListFunc();
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

    //全部选中
    checkboxAllChange: function(e) {
        var self = this;
        var arr = self.data.lists;
        var allPrice = 0;
        var check = e.detail.value;
        if (check.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].isCheck = true;
                for (let n = 0; n < arr[i].product.length; n++) {
                    arr[i].product[n].isChecked = true;
                    allPrice += (arr[i].product[n].price * arr[i].product[n].number);
                }
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                arr[i].isCheck = false;
                for (let n = 0; n < arr[i].product.length; n++) {
                    arr[i].product[n].isChecked = false;
                }
            }
        }
        self.setData({
            lists: arr,
            allPrice: allPrice
        })
    },

    //商店选中
    checkboxShopChange: function(e) {
        var self = this;
        var index = e.target.dataset.index;
        var arr = self.data.lists;
        if (e.target.dataset.is === "1") {
            for (let i = 0; i < arr[index].product.length; i++) {
                arr[index].product[i].isChecked = true;
            }
            arr[index].isCheck = true;
        } else {
            for (let i = 0; i < arr[index].product.length; i++) {
                arr[index].product[i].isChecked = false;
            }
            arr[index].isCheck = false;
        }
        self.setData({
			lists: arr
        })
		this.computAllMoneyFunc();
        this.lookShopFunc();
    },

	//商品选中
	checkboxChange: function(e) {
		var self = this;
		var index = e.target.dataset.index;
		var num = e.target.dataset.num;
		var is = e.target.dataset.is;
		var arr = self.data.lists;
		arr[index].product[num].isChecked = (is === "1")?true:false;
		self.setData({
			lists: arr
		})
		this.computAllMoneyFunc();
		this.lookListFunc(index);
	},

    //检查商店是否全部选中
    lookShopFunc: function() {
        var self = this;
        var arr = self.data.lists;
        var num = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isCheck) {
                num++;
            }
        }
        var add = arr.length - num;
		if (add === 0) {
            self.setData({
				allIsChecked: true
            })
        } else {
            self.setData({
                allIsChecked: false
            })
        }
    },

	//检查商品是否全选中
	lookListFunc: function(index) {
		var self = this;
		var arr = self.data.lists;
		var num = 0;
		for(let i=0;i<arr[index].product.length;i++) {
			if (arr[index].product[i].isChecked) {
				num++;
			}
		}
		var add = arr[index].product.length - num;
		if (add === 0) {
			arr[index].isCheck = true;
			self.setData({
				lists: arr
			})
		}else{
			arr[index].isCheck = false;
			self.setData({
				lists: arr
			})
		}
		self.lookShopFunc();
	},

	//计算合计金额
	computAllMoneyFunc: function() {
		var self = this;
		var arr = self.data.lists;
		var allPrice = 0;
		for(let i=0;i<arr.length;i++) {
			for (let n = 0; n < arr[i].product.length;n++) {
				if (arr[i].product[n].isChecked) {
					allPrice += (arr[i].product[n].price * arr[i].product[n].number);
				}
			}
		}
		self.setData({
			allPrice: allPrice
		})
	},

    //获取数据
    getListFunc() {
        var self = this;
        var pageNumber = self.data.pageNumber;
        var pageSize = self.data.pageSize;
        getApp().post("/mall/getShoppingCartList", {
            userId: wx.getStorageSync("user").id,
            pageNumber: pageNumber,
            pageSize: pageSize
        }, function(r) {
            for (let i = 0; i < r.rows.length; i++) {
                r.rows[i].isCheck = false;
				r.rows[i].shopNum = i;
				r.rows[i].shopShow = true;
                for (let n = 0; n < r.rows[i].product.length; n++) {
                    r.rows[i].product[n].isChecked = false;
					r.rows[i].product[n].listNum = n;
					r.rows[i].product[n].listShow = true;
					r.rows[i].product[n].maxShopNum = 9999;
                }
            }
			if (pageSize> r.rows.length) {
				self.setData({
					pageFinesh: false
				})
			}else{
				pageNumber = pageNumber+1;
			}
            self.setData({
                lists: r.rows,
				pageNumber: pageNumber
            })
        });
    },

    //刷新界面层
    updateFunc: function() {
        var self = this;
    },

    //删除数据弹窗
    deleteFunc: function(e) {
		var cartId = e.target.dataset.id;
		var self = this;
		var arr = self.data.lists;
		var index = e.target.dataset.index;
		var num = e.target.dataset.num;
        wx.showModal({
            title: '提示',
            content: '是否删除?',
            confirmColor: '#f5c243',
            success(res) {
                if (res.confirm) {
					getApp().post('/mall/delShoppingCart',{
						userId: wx.getStorageSync('user').id,
						cartIds: String(cartId)
					},function(r) {
						if(r.code === 0) {
							// self.getListFunc();
							arr[index].product[num].listShow = false;
							arr[index].product[num].isChecked = false;
							var is = false;
							for(let i=0;i<arr[index].product.length;i++) {
								if (arr[index].product[i].listShow) {
									is = true;
								}
							}
							if (!is) {
								arr[index].shopShow = false;
							}
							wx.showToast({
								title: "删除成功",
								icon: 'success',
								duration: 2000
							})
							self.setData({
								lists: arr
							})
							self.computAllMoneyFunc();
						}
					})
                }
            }
        })
    },

    //改变数量
    onButtonChange: function(e) {
		var number = e.detail;
		var cartId = e.target.dataset.id;
		var self = this;
		var arr = self.data.lists;
		var index = e.target.dataset.index;
		var num = e.target.dataset.num;
		getApp().post('/mall/upCartNum',{
			userId: wx.getStorageSync('user').id,
			cartId: cartId,
			number: number
		},function(r) {
			if(r.code === 0) {
				self.computAllMoneyFunc();
				arr[index].product[num].number = number;
				self.setData({
					lists: arr
				})
			}else{
				arr[index].product[num].number = number - 1;
				arr[index].product[num].maxShopNum = number - 1;
				self.setData({
					lists: arr
				})
			}
		})
    },

	//拉去下一页数据
	bindscrolltoupperFunc: function() {
		var self = this;
		if (self.data.pageFinesh) {
			var arr = self.data.lists;
			var pageNumber = self.data.pageNumber;
			var pageSize = self.data.pageSize;
			var pageFinesh = self.data.pageFinesh;
			getApp().post("/mall/getShoppingCartList", {
				userId: wx.getStorageSync("user").id,
				pageNumber: pageNumber,
				pageSize: pageSize
			}, function (r) {
				for (let i = 0; i < r.rows.length; i++) {
					r.rows[i].isCheck = false;
					r.rows[i].shopNum = i;
					r.rows[i].shopShow = true;
					for (let n = 0; n < r.rows[i].product.length; n++) {
						r.rows[i].product[n].isChecked = false;
						r.rows[i].product[n].listNum = n;
						r.rows[i].product[n].listShow = true;
						r.rows[i].product[n].maxShopNum = 9999;
					}
					arr.push(r.rows[i]);
				}
				if (pageSize > r.rows.length) {
					pageFinesh = false;
				}
				self.setData({
					lists: arr,
					pageNumber: (pageNumber + 1),
					pageFinesh: pageFinesh
				})
			});
		}
	},

	//结算
	submitFunc: function() {
		var self = this;
		if (self.data.allPrice == 0) {
			wx.showToast({
				title: "您还没有选择商品",
				icon: 'none',
				duration: 2000
			})
			return;
		}
		var carIds = "";
		var info = [];
		var arr = self.data.lists;
		for (let i = 0; i < arr.length;i++) {
			var have = true;
			for (let n = 0; n < arr[i].product.length;n++) {
				var long = arr[i].product[n];
				if (long.isChecked) {
					carIds += ","+long.cartId;
					carIds = carIds.substring(1);
					if (have) {
						info.push({ 'shopId': arr[i].shopId, 'infos': [{ 'productId': long.productId, 'num': String(long.number)}]});
						have = false;
					}else{
						info[i].infos.push({ 'productId': long.productId, 'num': String(long.number) });
					}
				}
			}
		}
		getApp().globalData.carIds = carIds;
		getApp().globalData.info = JSON.stringify(info);
		//需要修改
		getApp().post('/order/confirmOrder', {
			userId: wx.getStorageSync('user').id,
			carIds: carIds,
			info: JSON.stringify(info)
		},function(r) {
			if(r.code === 0) {
				getApp().globalData.resData = r;
				wx.navigateTo({
					url: '/pages/my/myorders/querenorder/querenorder?caris=true',
				})
			}
		})
		//需要修改
		// wx.navigateTo({
		// 	url: '/pages/my/myorders/querenorder/querenorder?caris=true',
		// })
	},

	//跳转到商品详情页面
	goDetailsFunc: function(e) {
		wx.navigateTo({
			url: '/pages/xiangqing/xiangqing?goodsid=' + e.target.dataset.id
		})
	}
})