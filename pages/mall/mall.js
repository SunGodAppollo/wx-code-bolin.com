// pages/mall/mall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:0,
    id:'',
    goodslis:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setFenlei();
    //this.setGoodsByFid('7fd38325192a48d594e4c1b2e72d668a');

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
      currentData: e.detail.current,
    });

  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current,
        id:e.target.dataset.fid
      });
      //更新
      this.setGoodsByFid(that.data.id);
    }
  },
  //显示详情
  showinfo:function(e){
    //获取商品的id

    var goodsid=e.currentTarget.dataset.gid;
    wx.navigateTo({
         url: '/pages/xiangqing/xiangqing?goodsid='+goodsid
     });
  },
  //设置分类
  setFenlei:function(){
    var that=this;
    var url='/mall/getAddressList';
    var data={};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          fenlei:resData.data,
          id:resData.data[0].id
        })
        console.log(resData.data[0].id);

        that.setGoodsByFid(resData.data[0].id);

      });
  },
  //设置分类id的商品
  setGoodsByFid:function(fid){
    var that=this;
    var url='/mall/getProduct';
      var data={pageNumber:'1',pageSize:'10',industryId:fid};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          goodslis:resData.rows,
        })

      });
  },


})
