// pages/my/myorders/myorders.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentData:0,
		state:0,
		userid:0,
		state:'0',//订单状态

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;

		that.setData({
			userid:wx.getStorageSync("user").id,
		});
		that.getorederlist();
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
			state:e.target.dataset.current
		});
		that.orderxiangqing();
	}
},
//顶部状态
topstaus:function(){
	var that=this;
	var userid=wx.getStorageSync("user").id;
	var state=that.data.state;
	var url='/order/getList';
		var data={userId:userid,state:state};
		app.post(url,data,function(resData){
			console.log(resData.rows);
			that.setData({
				orderlis:resData.rows
			})

		});
},


//订单详情
orderxiangqing:function(){
	wx.redirectTo({
		 url: '/pages/my/myorders/myorderxiangqing/myorderxiangqing'
 });
},

//获取订单列表
getorederlist:function(){
	var that=this;
	var userid=that.data.userid;
	var state=that.data.state;
	var url='/order/getList';
		var data={pageNumber:'1',pageSize:'10',userId:userid,state:state};
		app.post(url,data,function(resData){
			console.log(1);
			console.log(resData);
			that.setData({
				orderlis:resData.rows
			})

		});
}

})
