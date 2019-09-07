<!-- 回访明细页面 -->
<template>
	<div>
		<Headerbtns title="回访明细">
			<div slot="left" class="back" @click="go('/replyResultQuery')">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class='manage-returndetail-contents' v-for="item in returnVisitData" v-if="returnVisitData.length>0">
			<div class='return'>
				<div>保单号</div>
				<div>{{item.blank0}}</div>
			</div>
			<div class='return'>
				<div>投保单号</div>
				<div>{{item.blank49}}</div>
			</div>
			<div class='return'>
				<div>承保日期</div>
				<div>{{item.blank16}}</div>
			</div>
			<div class='return'>
				<div>生效日期</div>
				<div>{{item.blank15}}</div>
			</div>
			<div class='return'>
				<div>投保人姓名</div>
				<div>{{item.blank4}}</div>
			</div>
			<div class='return'>
				<div>主险名称</div>
				<div>{{item.blank23}}</div>
			</div>
			<!--<div class='return'>
				<div >保单状态</div>
				<div >{{policyState}}</div>
			</div>-->
			<div class='return'>
				<div>最后一次回访日期</div>
				<div>{{item.begin_time}}</div>
			</div>
			<div class='return'>
				<div>犹豫期剩余天数</div>
				<div>{{item.yyq_day|yyq_day_filters}}</div>
			</div>
			<div class='return'>
				<div>回访结果</div>
				<div>{{item.hf_results|hf_results_filters}}</div>
			</div>
			<div class='return'>
				<div>不成功原因</div>
				<div>{{item.hf_results_thd|hf_results_thd_filters}}</div>
			</div>
			<div class='return'>
				<div>问题件类型</div>
				<div>{{item.problems|problems_filters}}</div>
			</div>
			<div class='return'>
				<div>回访次数</div>
				<div>{{item.count_times}}次</div>
			</div>
			<div class='return'>
				<div>回访方式</div>
				<div>{{item.hf_type|hf_type_filters}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	export default {
		components:{Headerbtns},
		data() {
			return {
			    returnVisitData:[]
	  		}
		},
		filters: {
			hf_type_filters(code) {
				if(code == 1){
					return '面唔回访'
				}else if(code == 2){
					return '电话回访'
				}
			},
			hf_results_filters(code){
				if(code == 1){
					return '成功件'
				}else if(code == 2){
					return '问题件'
				}else if(code == 3){
					return '不成功件'
				}else if(code == 0){
					return '无'
				}else{
					return '未知'
				}
			},
			hf_results_thd_filters(code){
				if(code == 'null'){
					return '无'
				}else{
					return code
				}
			},
			problems_filters(code){
				if(code == 'null'){
					return '无'
				}else{
					return code
				}
			},
			yyq_day_filters(code){
				if(code == 'null'){
					return '无'
				}else{
					return code+'天'
				}
			}
		},
		methods: {
			getReturnVisitMsg(){
				let requ = {
					"data": {
						"plicyNo": this.$route.params.policyCode,
					},
					"modelName": "returnVisitService",
					"methodName": "returnVisit"
				}
				utils.http.postFast("CusbusinessService", requ, (body) => {
					console.log(body.data)
					if(body.data.restate == 0) {
						console.log(body.data.data)
						this.returnVisitData = body.data.data
					}else if(body.data.restate == 1){
						MessageBox({
				            title: '提示',
				            message: '查询结果为空!',
				            closeOnClickModal: false
			          	}).then(() => {
			          		this.go('/replyResultQuery')
			    	  	});
					}else if(body.data.restate == 2){
						MessageBox({
				            title: '提示',
				            message: '接口调用异常,请联系管理员!',
				            closeOnClickModal: false
			          	}).then(() => {
			          		this.go('/replyResultQuery')
			    	  	});
					}
				})
			}
	    },
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
	      	this.media.header($('.details'))
	      	/*获取回访详细信息*/
	      	this.getReturnVisitMsg()
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style lang='scss' scoped type="text/css">
  /*隐藏滚动条*/
  /*.details::-webkit-scrollbar{
    position: absolute;
    top: 50px;
  }*/
  	@import 'static/css/backlog/page';
	.manage-returndetail-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		background: #fff;
		overflow-y: auto;
	}
  .return {
  	line-height: 3;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 2px dotted #ccc;
  }
  .fa{
		color: #FDB92C;
	} 
	
</style>
