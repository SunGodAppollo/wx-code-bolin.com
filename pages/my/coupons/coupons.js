// pages/my/coupons/coupons.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentData:0,
		state:0,
		youhuilis:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		that.setData({
			userid:wx.getStorageSync("user").id,
		})
		that.getyouhuijuan();
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
	//获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current,
				state: e.target.dataset.current
      });
			that.getyouhuijuan();
    }
  },
	//获取优惠卷
	getyouhuijuan:function(){
		var that=this;
		var url='/appUser/MyCoupon';
			var data={pageNumber:'1',
			pageSize:'10',
			userId:that.data.userid,
			state:that.data.state,
		};
			app.post(url,data,function(resData){
				console.log(resData);
				 that.setData({
				 	youhuilis:resData.rows,
				 })

			});
	}

})
