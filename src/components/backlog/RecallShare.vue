<template>
	<div style="font-size:12px">
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue"></NewCA>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title="'投保要约更正申请书'"></Headerbtns>
			<div class="main-contents">
				<div class="details">
					<p style="font-size:20px;color:#3E3A39;text-align: center;">撤件</p>
					<div style="margin-bottom: 5%;">
						<p style="font-size: 16px;margin-bottom: 10px;">撤件原因：</p>
						<textarea v-model="calCellCause" rows="4" placeholder="请输入变更原因" style="width:100%;padding: 5%;margin: 6% 0;box-sizing: border-box;font-size: 14px;"></textarea>
					</div>
					<div>
						<p>客户声明：</p>
						<p style="line-height: 1.5;text-align:left;text-align-last: initial;">本人已阅知、理解公司的相关提示与要求，递此申请书向公司申请办理以上事项，并同意公司以此申请办理相关事宜，申请书与投保书不一致地方，以本申请书为准，同时保证填写内容真实有效。</p>
					</div>
					<div style="text-align: center;margin: 13% 0px 15%;">
						<p style="margin-bottom: 5%;">投保人签字</p>
						<a :href="href.sign24">
							<img style="width:200px;height:100px;" id="xss_20" :src="wrting" @click="cachea">
						</a>
					</div>
					<p @click="goRecall">提 交</p>
				</div>
			</div>
			<alert ref="showalert"></alert>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import NewCA from '../common/NewCA'
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	import '../policy/css/base.css'
	export default {
		name: 'recallShare',
		components: {
			Headerbtns,
			NewCA,
			alert
		},
		data() {
			return {
				caValue: {
					isCAOpen: false,
					image: "",
					context_id: '',
					applyCode: this.$route.params.applyCode,
					orderId: this.$route.params.orderId
				},
				agentCode: "",
				applyCode: this.$route.params.applyCode,
				orderId: this.$route.params.orderId,
				appntName: '',
				appntidNo: '',
				appntIdType: '',
				calCellCause: '', //变更信息
				signImgs: {
					agent_signt: ''
				},
				href: {
					sign24: "http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ=="
				},
				wrting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACkCAYAAADxNTBqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0REQzVEMEQ5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0REQzVEMEU5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRERDNUQwQjlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRERDNUQwQzlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjkXSxkAABiXSURBVHja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',
			}
		},
		beforeMount() {
			this.getMsg();
			let recallInfo = utils.cache.get("recallInfo")
			if(recallInfo != null) {
				this.calCellCause = recallInfo
			}
		},
		computed: {
			caShow() {
				return this.caValue.isCAOpen
			}
		},
		watch: {
			caShow(val, oldval) {
				if(!val) {
					this.getMsgNew();
				}
			}
		},
		methods: {
			//添加缓存
			cachea() {
				utils.cache.set("recallInfo", this.calCellCause)
			},
			getMsgNew() {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.orderId,
						"stepNo":'1,2',
						"nothave":'2'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					let result = body.policy
					let idCards = result.custInfo.appnt.imageData
					console.log(idCards, 'idcards')
					if(idCards != undefined && idCards.length > 0) {
						for(let i = 0; i < idCards.length; i++) {
							if(idCards[i].imageName == "24CJ") {
								//投保人
								let image = document.getElementById('xss_20')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload = function() {
									let data = than.getBase64Image(image)
									than.caValue.image = data
								}
							}
						}
					}
				})
			},
			getMsg() {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.orderId,
						"stepNo":'1,2',
						"nothave":'2'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					let result = body.policy
					let idCards = result.custInfo.appnt.imageData
					console.log(idCards, 'idcards')
					if(idCards != undefined && idCards.length > 0) {
						for(let i = 0; i < idCards.length; i++) {
							if(idCards[i].imageName == "24CJ") {
								//投保人
								let image = document.getElementById('xss_20')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload = function() {
									let data = than.getBase64Image(image)
									than.caValue.image = data
								}
							}
						}
					}
					this.agentCode = result.agentInfo.agentCode
					this.appntName = result.custInfo.appnt.appntName
					this.appntidNo = result.custInfo.appnt.idNo
					this.appntIdType = result.custInfo.appnt.idType
					this.applyCode = result.applyCode
					this.href.sign24 = utils.faceH5Tools.assemble(
								this.appntName,
								this.appntidNo,
								this.orderId,
								this.applyCode,
								this.appntIdType,
								'5',
								'24')
					if(this.$route.params.result != -1) { //识别成功失败标识0成功1失败
						//成功打开签字框
						if(this.$route.params.result == 0) {
							if(this.$route.params.index != -1) { //根据回传的签字标识打开对应的签字框
								this.openCADialog()
							}
						} else { //失败进行提示
							var resultmsg = this.$route.params.resultmsg
							if(resultmsg != -1) {
								Toast({
									message: resultmsg,
									duration: 2000
								});
							}
						}
					}
				})
			},
			getPolicyImg(success, fail) {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.orderId,
						"stepNo":'1,2',
						"nothave":'2'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					success()
					let idCards = result.custInfo.appnt.imageData
					console.log(idCards, 'idcards')
					if(idCards != undefined && idCards.length > 0) {
						for(let i = 0; i < idCards.length; i++) {
							if(idCards[i].imageName == "24CJ") {
								//投保人
								let image = document.getElementById('xss_20')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								let than = this
								image.onload = function() {
									let data = than.getBase64Image(image)
									than.caValue.image = data
								}
							}
						}
					}
				})
			},
			getBase64Image: function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.naturalWidth
				canvas.height = img.naturalHeight
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL
				// return dataURL.replace("data:image/png;base64,", "");
			},
			openCADialog() {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = 24 + 'CJ'
			},
			faceTest() {
				MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {
					this.ficeDistinguish(callbackSucc)
				}, (callbackFail) => {
					this.$refs.showalert.showMOdal(callbackFail)
				});
			},
			// 进行人脸识别接口调用方法
			ficeDistinguish: function(image) {
				let requ = {
					"policy": {
						"agentCode": this.agentCode,
						"name": this.appntName,
						"cardId": this.appntidNo,
						"functionCode": "RECALL",
						"imageByte": image,
						"applyCode": this.applyCode,
						"policyCode": "",
						"idType": this.appntIdType
					}
				}
				console.log('人脸识别请求参数', JSON.stringify(requ))
				utils.http.postFast('FACEIDKSHL', requ, (body) => {
					if(body.policy.resultCode == '0') {
						console.log(body.policy.resultMsg);
						this.openCADialog();
					} else {
						this.$refs.showalert.showMOdal(body.policy.resultMsg)
					}
				})
			},
			//提交撤件
			goRecall() {
				this.getPolicyImg(() => {
					alert_n22.confirm('提示', '<p>请确认投保要约更正申请书中的<font color="red">签字信息是否完整！</font></p>', '确定', '取消', (flag) => {
						console.log(this.caValue.image)
						if(this.calCellCause == undefined || this.calCellCause == "") {
							this.$refs.showalert.showMOdal('请填写撤件原因！')
						} else if(this.caValue.image == undefined || this.caValue.image == "") {
							this.$refs.showalert.showMOdal('投保人签字不能为空！')
						} else {
							let requestParam = {
								"policy": {
									"agentCode": this.agentCode,
									"applyCode": this.applyCode,
									"applicant_signt": this.caValue.image.substring(22),
									// "isCalCell":"",//（预留）
									"appntName": this.appntName, //投保人姓名	
									"calCellCause": this.calCellCause //撤件原因
								}
							}
							console.log('撤单参数', requestParam)
							utils.http.postFast('MOPRTCANCLE', requestParam, (body) => {
								let result = body.policy
								console.log('撤单返回', result)
								if(result.resultCode == 0) {
									this.$refs.showalert.showMOdal('撤件成功,请关闭页面！')
									$('.btnn').prop('disabled', true)
									$('.btnn').css({
										'opacity': 0.5
									})
								} else if(result.resultCode != 0) {
									this.$refs.showalert.showMOdal(result.resultMessage)
								}
							})
						}
					})
				}, () => {})
			}
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	.main-contents {
		bottom: 0 !important;
		background: #F5F5F5;
		padding: 5%;
		.details {
			background: #fff;
			padding: 5%;
			border-radius: 3px;
			min-height: 93%;
			p {
				line-height: 2;
				font-size: 14px;
				color: #333;
			}
			div {
				padding: 0 5%;
			}
			div+p {
				width: 100%;
				background: #FEB101;
				color: #fff;
				line-height: 3;
				text-align: center;
				border-radius: 3px;
			}
			img {
				width: 120px;
			}
		}
	}
</style>