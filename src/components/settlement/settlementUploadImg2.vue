<template>
	<!-- 报案影像补传 -->
	<div class='upload-img'>
		<Headerbtns :title="HeaderText" class='sel-user-head'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" style='color:#FDB92C'></i></div>
		</Headerbtns>
		<div class='upload-image-div'>
			<img src="static/img/settlement/upload.png">
			<p class='text-center'>代理人： {{name}} 先生/女士</p>
			<p class='text-center feb101'>请上传{{titleText}}</p>
			<div class="videoData">
				<div v-for="(item,index) in imgList" class='img-div'>
					<div style='position:relative;margin-bottom:10px;'>
						<img :src="item.url" style='width:100%;height:8rem'/>
						<img :src="deleteUrl" v-if='item.del' style='position: absolute;bottom:.5rem;right:.5rem;width:1.2rem;height:1.5rem' @click='delImg(item.fileId)'>
					</div>
				</div>
				<!-- <img src="static/img/settlement/upload_title.png" style='width:45%;height:8rem;margin-left:3%' v-show='imgList.length<=4' @click='showPopup'> -->
			</div>
			<p><Alert ref="showalert"></Alert></p>
			<div>
				<button @click='select_img' class='set-btn-data'>选择图片</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	import Alert from '@/components/policy/common/alert.vue'
	import { Indicator } from 'mint-ui';
	export default {
		components:{Headerbtns,Alert},
		data() {
			return {
				HeaderText:'资料补传',
				imgList:[],
				imgWidth:'',
				imgHeight:'',
				num:0,
				deleteUrl:'static/img/settlement/delete.png',
				name:utils.cache.get('personsal').agentName,
				show:false,
				addImgActive:true,
				ThisPolicyType:'',
				titleText:'',
				UpLoadList:[
				{key:'1',text:'理赔申请书',isShow:false,urlShow:false},
				{key:'2',text:'被保险人身份证明',isShow:false,urlShow:false},
				{key:'3',text:'申请人身份证明',isShow:false,urlShow:false},
				{key:'4',text:'申请人银行卡/存折',isShow:false,urlShow:false},
				{key:'5',text:'住院病历/出院小结',isShow:false,urlShow:false},
				{key:'6',text:'门诊（急）病历',isShow:false,urlShow:false},
				{key:'7',text:'诊断证明书',isShow:false,urlShow:false},
				{key:'8',text:'医疗费用收据',isShow:false,urlShow:false},
				{key:'9',text:'医疗费用明细清单/医保报销凭证',isShow:false,urlShow:false},
				{key:'10',text:'病理/影像检查报告',isShow:false,urlShow:false},
				{key:'11',text:'意外事故证明/伤残鉴定报告',isShow:false,urlShow:false},
				{key:'12',text:'家庭关系证明',isShow:false,urlShow:false},
				{key:'13',text:'死亡证明书/户籍注销证明/殡葬证明',isShow:false,urlShow:false},
				{key:'14',text:'其他资料',isShow:false,urlShow:false}
				],
				imagePathLength:0,//记录获取到的图片路径个数
				imageList:[],//记录转换完成的base64数据
				isResp:false,//控制请求开启
				imgIdList:[]
			}
		},
		computed:{
			...mapState(['VuxPolicyType','policyData','policyCode','newPolicyType','policyState','policyId','newPolicyCode','policy_1_imgList'])
		},store,
		mounted() {
			this.media.header($('.upload-image-div'))
			console.log(this.policyData)
			console.log('保单号----->>>',this.newPolicyCode)
			console.log('影像类型----->>>',this.$route.params.type)
			console.log('返回时，报案id----->>>',this.policyId)
			this.getInitData()
			this.UpLoadList.forEach( item => {
				if(item.key == this.$route.params.type){
					this.titleText = item.text
				}
			})
		},
		methods: {
			...mapMutations(['SetnewPolicyType','SetPolicyState','Setpolicy_1_imgList']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			delImg(id) {/*删除图片*/
				console.log(this.imgList)
				alert_n22.confirm('提示', '确定删除这张照片吗?', '确定', '取消', (flag) => {
					let arr = []
					this.imgList.forEach( (item,index) => {
						let object = {
							fileId:item.fileId,
							isenabled:item.fileId==id?'0':'1'
						}
						arr.push(object)
					})
					let requ = { 
						data: { 
							files:arr/*0未启用，1启用*/
						}, 
						modelName: "claimService", 
						methodName: "updateFileStatus" 
					}
					console.log(JSON.stringify('删除图片的请求报文',requ))
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						this.Aleart(JSON.stringify(body))
						if(body.data.code == 0){
							this.imgList.forEach( (item,index) => {
								if(item.fileId == id){
									this.imgList.splice(index,1)
								}
							})
							this.policy_1_imgList.forEach( (item,index) => {
								if(item == id){
									this.policy_1_imgList.splice(index,1)
								}
							})
							this.Setpolicy_1_imgList(this.policy_1_imgList)
							this.Aleart('删除成功')
						}
					})
				})
				
			},
			backUrl() {
				if(this.imgList.length>0){
					this.Setpolicy_1_imgList(this.policy_1_imgList)
					let arr = []
					this.imgList.forEach( item => {
						let newObject = {
							fileId:item.fileId,
							isenabled:'1'
						}
						arr.push(newObject)
					})

					let requ = { 
						data: { 
							files:arr/*0未启用，1启用*/
						}, 
						modelName: "claimService", 
						methodName: "updateFileStatus" 
					}
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						if(body.data.code == 0){
							this.$router.push('/settlementUploadList/'+this.policyId)
						}
					})
				}else{
					this.$router.push('/settlementUploadList/'+this.policyId)
				}
			},
			showPopup() {
				this.show = true
			},
			select_img(){
				let callbackSucc = {
					result:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg|https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg|https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=873265023,1618187578&fm=27&gp=0.jpg|https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=620919022,129761896&fm=27&gp=0.jpg|https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2720660882,4014236878&fm=27&gp=0.jpg|https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3220681365,3634029949&fm=27&gp=0.jpg|https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=530090170,1803130651&fm=27&gp=0.jpg|https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3972169330,4211815266&fm=27&gp=0.jpg|https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3660968530,985748925&fm=191&app=48&size=h300&n=0&g=4n&f=JPEG?sec=1853310920&t=5e64af964be378c6c2a3b0acc65dfe24"
				}
				let than = this
				MAPlugin.hybridCallAction('hybrid://MAImageSelect:401/invokeImgSel?0', (callbackSucc)=>{
					console.log('初始化数据')
					let imagePaths = callbackSucc.result.split('|')
					than.imagePathLength = imagePaths.length//初始化数据<记录已选路径个数>
					than.imageList = []//清空存储图片资源数组
					than.isResp = false//重置发起请求标识
					for(let i=0;i<imagePaths.length;i++){//循环图片地址
						console.log('开始转换' + i)
						utils.common.imgResize(imagePaths[i], (data)=>{//压缩为宽200的图片
						}, (data)=>{
							than.imageList.push(data.substring(23,data.length))//压缩为宽720的图片
						})
					}
				}, (callbackFail)=>{
					console.log(callbackFail,"<<<调用取消>>>")
				});
			},
			/*上传*/
			addAppImageAndUpload(img) {
				this.isResp = false
				let requ =  {
					data:{
						fileBase64:'data:image/jpeg;base64,'+img,
						claimsId:this.newPolicyCode,/*报案号this.policyCode*/
						claimsType:this.ThisPolicyType,/*出险类型*/
						fileType:this.$route.params.type,/*影像类型*/
						imageType:"jpg",
						businessType:"report" /*报案report，赔案claims*/
					},
					modelName: "claimService",
					methodName: "attachFileUpload"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('影像上传返回------------->>>',JSON.stringify(body))
					//接口响应后将标识isResp重置为true 开启下一次请求
					setTimeout(()=>{
						Indicator.close();
						this.isResp = true;
					}, 500);
					if(body.data.code == 0){
						let items = {
							key:this.num,
							fileId:body.data.fileId,
							url:'data:image/jpeg;base64,'+img,
							del:false
						}
						this.policy_1_imgList.push(body.data.fileId)
						this.imgList.push(items)
						this.imgList.forEach( item => {
							this.policy_1_imgList.forEach( tpl => {
								if(item.fileId == tpl){
									item.del = true
								}
							})
						})
					}
				})
		},
		/*分步获取*/
		getInitData(){
			let requ = {
				"data": {
					"claimId":this.newPolicyCode,
					"claimType":"0",
					"step":"3"
				},
				"modelName": "claimService",
				"methodName": "getClaimInfo"
			}
			utils.http.postFast('CusbusinessService',requ,(body,header) => {
				if(body.data.code == 0){
					body.data.claim.accidentInfo.accidentMode.forEach( item =>{
						if(item.isselected == '1'){
							this.ThisPolicyType+=item.reasoncode+','
						}
					})
					this.ThisPolicyType = this.ThisPolicyType.substring(0,this.ThisPolicyType.length-1)
					console.log('分步获取,出险类型--->>>',this.ThisPolicyType)
					this.imgList = []
					let arr = body.data.claim.imageFiles
					if(arr.length>0){
						for(let i=0;i<arr.length;i++){
							arr[i].key = i+1
							console.log(this.$route.params.type)
							if(arr[i].fileType == this.$route.params.type){
								let newObject = {
									key:arr[i].key,
									fileId:arr[i].id,
									url:arr[i].url
								}
								console.log(newObject)
								this.imgList.push(newObject)
							}
						}
						this.imgList.forEach( (item,index) => {
								this.policy_1_imgList.forEach( tpl => {
									if(item.fileId == tpl){
										item.del = true
									}
								})
							})
					}
				}
			})
		}
	},
	watch: {
		imageList(val, oldval){
				//存储base64的数组长度等于路径个数
				if(val.length == this.imagePathLength){
					//开始第一次提交
					console.log('准备提交数据')
					this.isResp = true
				}
			},
			isResp(val, oldval){
				console.log('watch->isResp->val',val,val.length)
				console.log('watch->isResp->oldval',oldval,oldval.length)
				if(val != oldval && val){
					console.log(this.imageList)
					//存储base64的数组存在内容
					if(this.imageList.length>0){
						//开始上传
						console.log('开始上传' + this.imageList.length)
						Indicator.open('还剩'+this.imageList.length+"张。");
						this.addAppImageAndUpload(this.imageList[0])
						//并数组中存在的当前内容
						this.imageList.splice(0, 1)
					}else{
						//数组清空则停止全部上传动作
						Indicator.close();
					}
				}
			}
		}
	}
</script>
<style>
.upload-img .upload-image-div{
	padding-top:2rem;
	text-align: center;
}
.upload-img .upload-image-div>img{
	width:50%;
	height:6rem;
	margin:0 auto 1rem auto;
}
.upload-img .upload-image-div .text-center{
	text-align: center;
}
.upload-img .feb101{
	color: #feb101;
}
.upload-img .upload-image-div p{
	font-size: 1rem;
	margin-bottom:1rem;
}
.upload-img .upload-image-div>.img-div{
	display: flex;
	flex-wrap: wrap;
}
.upload-img .upload-image-div>.img-div>div{
	width: 100%;
	min-height: 6rem;
}
.upload-img .upload-image-div>.img-div img,
.upload-img .upload-image-div>.img-div input{
	width:40%;
	margin-left:2.5%;
	height:6rem;
	position: absolute;
	left: 0;
	top:0;
}
.upload-img .upload-image-div>.img-div img{
	z-index: 1;
}
.upload-img .upload-image-div>.img-div input{
	opacity: 0;
	z-index: 100;
}
.upload-img .videoData{
	display: flex;
	flex-wrap: wrap;
}
.upload-img .videoData>.img-div{
	width: 45%;
	margin-left:3%;
}
.upload-img .photo {
	display: block;
	width: 100%;
	line-height: 45px;
	border: 0;
	background: #fff;
}
.upload-img .set-btn-data{
	border:none;
	background: #feb101;
	color: #fff;
	width:8rem;
	border-radius: 5px;
	height:2.2rem;
}
</style>