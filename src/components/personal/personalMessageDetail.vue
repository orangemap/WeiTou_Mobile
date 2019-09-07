<template>
	<div>
		<Headerbtns :title="page_title">
		</Headerbtns>
		<div class='my-index-container'>
				<p>{{message.noticeTheme}}</p>
				<p v-if="message.noticeType==9" v-html="message.noticeContent"></p>
				<p v-if="message.noticeType!=9">{{message.noticeContent}}</p>
				<a v-if="message.uploadPath!=''" :href="message.uploadPath" style="color: #D15FEE;">附件: 下载</a>
		</div>
		<div class='my-index-container-detail'>
			<mt-radio v-model="opt_radio_value_1_2" :options="opt_radio_1_2">
			</mt-radio>
			<mt-radio v-model="opt_radio_value_3" :options="opt_radio_3">
			</mt-radio>
		</div>
		<Footerbtns :is_show=false :disabled="true" total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="readMsg" :disabled="false">
				阅读完成
			</button>
		</Footerbtns>
	</div>
</template>

<script type='text/babel'>
import Headerbtns from '../policy/common/Header'
import Footerbtns from '../policy/common/Footer.vue'
import { Indicator } from 'mint-ui';
import { Checklist } from 'mint-ui';
import { Radio } from 'mint-ui';
export default{
	name: 'personalMessageDetail',
	components: {Headerbtns, Footerbtns, Checklist, Radio},
	data() {
		return {
			page_title:'消息详情',
			channel:'',/*渠道*/
			agentCode:'',/*代理人工号*/
			message:'',
			opt_radio_value_1_2:'',
			opt_radio_value_3:'',
			other5:'', // 强制阅读勾选项
			opt_radio_1_2:[],
			opt_radio_3:[],
			index:''
		}
	},
	watch:{
		opt_radio_value_1_2(v1,v2){
			console.log(v1)
			this.isRead(true)
		},
		opt_radio_value_3(v1,v2){
			console.log(v1)
			this.isRead(true)
		}
	},
	mounted(){
		var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g //全局搜索http、https地址
//  	mysfgg = "这是我的segmentfault网址 https://segmentfault.com/u/idhz";
//		mysfgg  = mysfgg.replace(reg, "<a href='$1$2' target='_blank'>$1$2</a>"); //替换成a标签
//		alert(mysfgg);
		this.channel = utils.cache.get('channel')
  		console.log('渠道',this.channel)
  		this.agentCode = utils.cache.get('personsal').agentCode
  		console.log('代理人工号',this.agentCode)
  		this.message = this.$route.params.msg
  		if(this.message.noticeType==9){
  			let msgs = this.message.noticeContent.replace(reg, "<a style='color: blue;' href='$1$2' target='_blank'>$1$2</a>")
  			this.message.noticeContent = msgs
  		}
  		console.log(this.$route.params.msg)
  		console.log(this.$route.params.isMust)//0-未读 1-已读
  		this.index = this.$route.params.index
  		
  		if(this.$route.params.isMust==0){
  			if(this.message.other4 == '1'){
	  			console.log('需要强制阅读')
	  			this.isRead(false)
	  			if(this.message.other5!=undefined&&this.message.other5!=""){
					if(this.message.other5 == '1'){
						this.opt_radio_1_2.push({
							value:'1',
							label:'我已认真阅读并知悉全部内容。'
						})
					}else if(this.message.other5 == '2'){
						this.opt_radio_1_2.push({
							value:'2',
							label:'我已认真阅读并同意全部内容。'
						})
					}else if(this.message.other5 == '3'){
						this.opt_radio_3.push({
							value: '3',
							label: '我已认真阅读全部内容，并承诺以上情况均为否。'
						})
						this.opt_radio_3.push({
							value: '4',
							label: '我已认真阅读全部内容，以上至少一种情况为是。'
						})
					}
	  			}
	  			if(this.message.other6!=""){
	  				if(this.message.other6 == '1'){
	  					this.opt_radio_value_1_2 = '1'
	  				}else if(this.message.other6 == '2'){
	  					this.opt_radio_value_1_2 = '2'
	  				}else if(this.message.other6 == '3'){
	  					this.opt_radio_value_3 = '3'
	  				}else if(this.message.other6 == '4'){
	  					this.opt_radio_value_3 = '4'
	  				}
	  			}
	  		}else{
	  			console.log('不需要强制阅读')
	  			this.isRead(true)
	  			this.opt_checklist = []
	  			this.opt_radio = []
	  			this.other5 = ""
		  	}
  		}else if(this.$route.params.isMust==1){
  			if(this.message.other4 == '1'){
	  			console.log('需要强制阅读')
	  			this.isRead(false)
	  			if(this.message.other5!=undefined&&this.message.other5!=""){
					if(this.message.other5 == '1'){
						this.opt_radio_1_2.push({
							value:'1',
							label:'我已认真阅读并知悉全部内容。',
							disabled:true
						})
					}else if(this.message.other5 == '2'){
						this.opt_radio_1_2.push({
							value:'2',
							label:'我已认真阅读并同意全部内容。',
							disabled:true
						})
					}else if(this.message.other5 == '3'){
						this.opt_radio_3.push({
							value: '3',
							label: '我已认真阅读全部内容，并承诺以上情况均为否。',
							disabled:true
						})
						this.opt_radio_3.push({
							value: '4',
							label: '我已认真阅读全部内容，以上至少一种情况为是。',
							disabled:true
						})
					}
	  			}
	  			if(this.message.other6!=""){
	  				if(this.message.other6 == '1'){
	  					this.opt_radio_value_1_2 = '1'
	  				}else if(this.message.other6 == '2'){
	  					this.opt_radio_value_1_2 = '2'
	  				}else if(this.message.other6 == '3'){
	  					this.opt_radio_value_3 = '3'
	  				}else if(this.message.other6 == '4'){
	  					this.opt_radio_value_3 = '4'
	  				}
	  			}
	  		}else{
	  			console.log('不需要强制阅读')
	  			this.isRead(true)
	  			this.opt_checklist = []
	  			this.opt_radio = []
	  			this.other5 = ""
		  	}
  		}
	},
	methods:{
		isRead(val) {
			if(val){
	  			$(".btnFoote").attr({'disabled':false})
	  			$(".btnFoote").css({'opacity':1})
	  		}else{
	  			$(".btnFoote").css({'opacity':0.5})
	  			$(".btnFoote").attr({'disabled':true})
	  		}
		},
		Goback(){
			let index = this.index
			if(index == 1){
				this.$router.push('/personal/personalMessage/personalMessageKH')
			}else if(index == 2){
				this.$router.push('/personal/personalMessage/personalMessageGR')
			}else if(index == 3){
				this.$router.push('/personal/personalMessage/personalMessageSys')
			}else{
				this.$router.push('/personal/personalMessage/personalMessageKH')
			}
		},
		//消息阅读接口
		readMsg(){
			console.log(this.value,'选项1,2')
			console.log(this.value1,'选项3')
			if(this.opt_radio_value_1_2!=''){
				this.other5 = this.opt_radio_value_1_2
			}else if(this.opt_radio_value_3!=''){
				this.other5 = this.opt_radio_value_3
			}
			let requ = [
				{
					'jgpashId': this.message.jgpashId,//--列表返回的主键ID
                    'noticePersonnel': utils.cache.get("personsal").agentCode,//--代理人工号
                    'other5': this.other5 //--强制阅读选项,是强制阅读类型的必传,非强制阅读传空字符串
				}
			]
			console.log(requ)
			utils.http
				.post("JGPASHREAD", requ)
				.then(response => {
					if(response.data.header.responseCode == '0'){
						this.Goback()
					}else{
						alert_n22.alert('温馨提示',response.data.header.errorMessage,'确定')
					}
				})
				.catch(error => {
					alert_n22.alert('温馨提示',error,'确定')
				});
			}
		}
	}
</script>

<style scoped type="text/css">
	.text-center {
		text-align: center;
	}
	.font_35 {
		padding: 6px 8px;
		font-size: 30px;
		color: #FDB92C;
	}
	.my-index-container {
		margin:70px 10px 10px;
		padding:20px 5px 5px;
	}
	.my-index-container p{
		margin:3px 2px;
		letter-spacing:2px;
		line-height:1.5;
	}
	.my-index-container>p+p{
		text-indent:2em;
		height:200px;
	    overflow: auto;
		margin-bottom:25px;
	}
	.btnFoote{
		border:0;
		color:#fff;
		width:100%;
		height: 50px;
		background:#FEB101;
		height:50px
	}
	.footer-center{
		background: transparent!important;
	}
	
	.mint-checkbox-input,.mint-radio-input{
		width:14px;
		height:14px;
		position:relative;
		left:25px;
		top:7px;
		z-index: 111;
		display: inline-block;
		opacity: 0;
	}
	.mint-checkbox-input:checked + .mint-checkbox-core,
	.mint-radio-input:checked + .mint-radio-core{
		background:#FEB101;
		border-color:#FEB101;
	}
</style>
