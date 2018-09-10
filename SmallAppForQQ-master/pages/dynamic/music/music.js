var network = require('../../../utils/network.js')
Page({
  data: {
    isHiddenToast: true,
    page: 1,
    pageSize: 30,
    hasMoreData: true,
    contentlist: [],
    tab: ['我的', '好友在听', '电台'],
    savedFilePath:null,
    //当前选中导航的Inx值
    Inx: 0
  },
  // 新的绑定导航切换样式方法
  changeTab: function (event) {
    this.setData({
      Inx: event.currentTarget.dataset.index
    })
  },
  isShowToast: function () {
    this.setData({
      isHiddenToast: false
    })
  },
  toastChange: function () {
    this.setData({
      isHiddenToast: true
    })
  },

  saveFile:function(){
 
    var downUrl="http://www.joson.tk/JosonStaticFiles/%E7%AD%89%E4%BD%A0%E6%88%91%E7%AD%89%E4%BA%86%E9%82%A3%E4%B9%88%E4%B9%85.mp3";

    downUrl ='https://m.skyworthdigital.com/content/JosonJiang.mp3';

    wx.downloadFile({

      url: downUrl,
      success: function (res) {
 
         if (res.statusCode === 200) {

           wx.playVoice({
             filePath: downUrl
           });

         }
      }
  })

  },

  play: function (event) {

    var that = this
    console.log(event);

    var res = that.data.contentlist[event.currentTarget.dataset.num]
    console.log(res);
    
    var dataUrl = "http://www.joson.tk/JosonStaticFiles/%E7%AD%89%E4%BD%A0%E6%88%91%E7%AD%89%E4%BA%86%E9%82%A3%E4%B9%88%E4%B9%85.mp3"
    
    wx.playBackgroundAudio({

      dataUrl: dataUrl,//res.m4a,
      name: res.songname,
      singer: res.singername,
      coverImgUrl: res.albumpic_small,
      success:function(res){

        console.log("success");
        console.log(res);

      },
      complete: function (res) {

        console.log("complete");
        console.log(res);

      }, fail:function(res){

        console.log("fail" );
        console.log(res);

      }
    })
  },
  randomStart: function (event) {
    var that = this
    if (that.data.contentlist.length == 0) return
    var random = Math.floor(Math.random() * that.data.contentlist.length);
    var res = that.data.contentlist[random]
    wx.playBackgroundAudio({
      dataUrl: res.m4a,
      name: res.songname,
      singer: res.singername,
      coverImgUrl: res.albumpic_small,
      complete: function (res) {
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getMusicInfo('正在加载数据...')
  },
  getMusicInfo: function (message) {
    var that = this
    var data = {
      showapi_appid: '25158',
      showapi_sign: 'c0d685445898438f8c12ee8e93c2ee74',
      keyword: '海',
      page: that.data.page
    }
    network.requestLoading('https://route.showapi.com/213-1', data, message, function (res) {

      var Url ='https://route.showapi.com/213-1?showapi_appid=25158&showapi_sign=c0d685445898438f8c12ee8e93c2ee74&keyword=%E6%88%91&page=3';

      console.log(res)
      var contentlistTem = that.data.contentlist
      if (res.showapi_res_code == 0) {
        if (that.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.showapi_res_body.pagebean.contentlist
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1
          })
        }
      } else {
        wx.showToast({
          title: res.showapi_res_error,
        })
      }

    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })

    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getMusicInfo('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getMusicInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
})