var util = require('../../../utils/util.js');
var app = getApp();
var config = require('../../../config.js');
const skinBehavior = require('../../../utils/skinBehavior.js');
Page({
	behaviors: [skinBehavior],
	data: {
		URL: 1,
		page_no: 1,
		page_num: 10,
		listMore: false,
		list:[],
		buyState:true
	},
	onLoad: function(options) {
		var that = this
		// 公用设置参数
		app.commonInit(options, this, function(tokenInfo) {
			that.setData({
				type: options.type,
			})
			// that.getList()
		}); //end 公用设置参数
	},
	back(e) {
		wx[e.detail]({
			url: '/pageSleep/pageSleep/choice/choice'
		})
	},
	goConfirm() {
		wx.navigateTo({
			url: '/pageShop/pageShop/orderConfirm/orderConfirm?num=1&goods_id=2951&goods_attr_id='
		})
	},
	onShow: function() {

	},
	onShareAppMessage: function() {
		var data = app.shareInit('pageShop', 'moreGoods/moreGoods');
		data.share_true_url = data.share_true_url.replace('pages', 'pageShop');
		console.log('分享数据：');
		console.log(data.share_true_url + '&type=' + this.data.type);
		return {
			title: config.config().title||'',
			// imageUrl:'http://i.2fei2.com/5dc2a4e019549.png?imageView/1/w/500/h/400/interlace/1/q/100',
			path: data.share_true_url + '&type=' + this.data.type,
			success: function(res) {
				//添加分享记录
				util.ajax({
					url: util.config('baseApiUrl') + 'Api/User/addShareLog',
					data: data,
					success: function(res) {
						console.log('成功分享记录');
						console.log(res);
					}
				})
			}
		}
	}, //end 分享接口
})
