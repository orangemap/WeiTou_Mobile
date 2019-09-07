<template>
	<div>
		<div class="nav-lists" id="content_div">


			<div class="videoData">
				<p v-for="(item,index) in imageList.imgs"  >
				<img  class="smallImage" :src="item.src" ref="smallImage"  @click="choicePhoto(index)">
					<span class="remove-image" @click="delPhoto(index)" v-if="item.isdel">X</span>
				</p>
				<mt-popup position="center" class="phone_valid popup" 
					v-model="imageList.isShow" style="width:70%;border:1px solid #eee;position: fixed;background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="">从相册选择</button>
					<hr>
					<button class="photo" @click="">拍照</button>
				</mt-popup>
				<p class="add" v-show="imageList.imgs.length>imageList.minlen" @click="choicePhoto(20)">
					<img src="../../../static/img/videoUpload/add.png">
				</p>
			</div>


			<div id="main" style="width: 600px;height:600px;"></div>
			<div class="div-a">
				<div id="container1" style="height: 100%;width:100%"></div>
			</div>
			<div class="div-b">
				<div id="container2" style="height: 100%;width:100%"></div>
			</div> 
			<div class="div-a">
				<div id="container3" style="height: 100%;width:100%"></div>
			</div>
			<div class="div-b">
				<div id="container4" style="height: 100%;width:100%"></div>
			</div> 
			
 		 <li @click = "boxScroll">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>底部</p>
          </li>
          <li @click = "go('/testca')">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>CA签字</p>
          </li>
          <li @click = "go('/testcamera')">
            <p><img src="../../../static/img/home/tab2.jpg" height="47" width="47"></p>
            <p>Cordova相机</p>
          </li>
          <li @click = "go('/testfile')">
            <p><img src="../../../static/img/home/tab3.jpg" height="47" width="47"></p>
            <p>Cordova文件操作</p>
          </li>
          <li @click = "go('/testlocationocr')">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>本地人脸识别</p>
          </li>
           <li @click = "test">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>本地人脸识别</p>
          </li>
          <li style="margin-top: 30px">
            <a href="http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==" style="width: 30px;height: 30px;color: #0f0f0f">测试</a>
          </li>
          <li @click = "versionSet">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>版本传值</p>
          </li>
					<li @click = "fenxiang">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>分享测试</p>
          </li>
					<li @click = "fenxiang2">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>分享测试2</p>
          </li>
					<li @click = "duibi">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>对比</p>
          </li>
					<img style="width:50%;height:50%;" id="xss_30">
					<img style="width:50%;height:50%;" id="xss_31">
					<li @click = "jiami">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>加密</p>
          </li>
					<li @click = "jiemi">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>解密</p>
          </li>
					<li @click = "scanner">
            <p><img src="../../../static/img/home/tab1.jpg" height="47" width="47"></p>
            <p>二维码识别</p>
          </li>
					<li @click = "shibie">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>语音识别</p>
          </li>
          <li @click = "qrcode">
            <p><img src="../../../static/img/home/tab4.jpg" height="47" width="47"></p>
            <p>二维码识别</p>
          </li>		  
          <img id='imageId'style="width:100%;height:100%;" />
		  <img v-lazy='eeee' />
        </ul>
      </div>
	</div>
</template>

<script>import { MessageBox } from 'mint-ui';
export default {
	name: 'test',
	data() {
		return {
			eeee:'http://www.maiziedu.com/uploads/course/2016/09/1_0quZW7u.png',
			imageList:{
				index:'',//序号
				minlen:0,//最少配置
				isShow:false,//选择框是否显示
				imgs:[{'src':'data:image/jpeg;base64,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',
					   'isdel':true
					 }]
			},
			str1:"",
			str2:"",
			status:false,
			applicantlist_3:'',
			make:{
				product:"",
				productContent_1:[],
				productContent_2:[]
			}
		}
	},
	beforeMount() {
		let tempBnfs = []
		this.applicantlist_3 = [{
															'imageName':'3-1-Front',
															'reaPath':'3-1-Front'
														},
														{
															'imageName':'3-3-Front',
															'reaPath':'3-3-Front'
														},
														{
															'imageName':'3-2-Back',
															'reaPath':'3-2-Back'
														},
														{
															'imageName':'3-1-Back',
															'reaPath':'3-1-Back'
														},
														{
															'imageName':'3-2-Front',
															'reaPath':'3-2-Front'
														},
														{
															'imageName':'3-3-Back',
															'reaPath':'3-3-Back'
														}
													]
		if (this.applicantlist_3.length > 0) {
			let tempBnf = {}
			for (let i = 0; i < this.applicantlist_3.length; i++) {
				let item = this.applicantlist_3[i];
				let index = item.imageName.split('-')[1]
				let name = item.imageName
				let path = item.reaPath
				if(tempBnfs.length>0){
					let isHave = false
					for(var j=0;j<tempBnfs.length;j++){
						if(tempBnfs[j].index == index){
							tempBnfs[j].images.push({'name':name,'path':path})
							isHave = true
						}
					}
					if(!isHave){
						tempBnfs.push({'index':index,'images':[{'name':name,'path':path}]})
					}
				}else{
					tempBnfs.push({'index':index,'images':[{'name':name,'path':path}]})
				}
			}
			var compare = function (obj1, obj2) {
					var val1 = obj1.index;
					var val2 = obj2.index;
					if (val1 < val2) {
							return -1;
					} else if (val1 > val2) {
							return 1;
					} else {
							return 0;
					}
				}
			tempBnfs = tempBnfs.sort(compare)
			console.log(tempBnfs)
		}
	},
	mounted() {
		alert(utils.permissions.operPolicy(utils.cache.get('personsal').channel))
		console.log(this.ageFilter('2000-05-10')) 
		this.loadAsync('1');
		// locAMap(true,(lng,lat,result)=>{
		// 	window.alert(lng+'/'+lat+''+result)
		// },(error)=>{
		// 	window.alert(error)
		// })
		createBarGraph(document.getElementById('container1'),0,300,2,'期交件数',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(件)',interval:50},
			//类目轴数据
			['维持','实际'],
			//数量轴柱状图数据
			[120, 170])
		createBarGraph(document.getElementById('container2'),0,300,2,'承保标准保费',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(万元)',interval:50},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarGraph(document.getElementById('container3'),0,300,2,'回访成功率',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(%)',interval:20},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarGraph(document.getElementById('container4'),0,300,2,'13个月综合继续率',
			//v1:数量轴单位 v2:数量轴间隔
			{name:'(%)',interval:20},
			//类目轴数据
			['晋升','维持','实际'],
			//数量轴柱状图数据
			[53.2, 34.0, 89.3])
		createBarLineBlend(document.getElementById('main'),0,400,1,'',
					//v1:最小刻度 v2:最大刻度 v3:间隔 v4:轴标外边距 v5:刻度标签默认朝外
					[{min: 0,max: 20000,interval: 2000,axisLabel:{margin: 4,inside:false,}}],
					//类目轴数据
					['2018年1月','2018年2月','2018年3月','2018年4月','2018年5月','2018年6月','2018年7月','2018年8月','2018年9月','2018年10月'],
					//数量轴柱状图数据
					[4000, 3000, 1000, 5000, 12000, 8000, 4000, 6000, 7000, 3000],
					//数量轴折线1数据
					[3000, 2000, 800, 4000, 11000, 4000, 2000, 5000, 4000, 2000],
					//数量轴折线2数据
					[2300, 2800, 980, 4300, 8000, 4000, 2000, 3000, 5000, 3000],
					//数量轴折线3数据
					[3000, 3000, 1000, 4000, 4000, 8000, 4000, 6000, 7000, 3000])
		
	},
	methods: {
		shuomingshuCallback(item){
			this.make.productContent_2 = []
			for(let i in proposalPlans.proposalPlan.item){
				if(item.productCode == proposalPlans.proposalPlan.item[i].productCode){
					if(proposalPlans.proposalPlan.item[i].proposalType == "2"){
						this.make.productContent_2.push(proposalPlans.proposalPlan.item[i])
					}
				}
			}
			console.log(this.make.productContent_2)
			this.make.productContent_2.sort((a,b) => {
				const codeA = parseInt(a.code)
				const codeB = parseInt(b.code)
				return codeA -codeB
			})
			if(this.make.productContent_2.length > 0){
				console.log('存在产品说明书')
			}else{
				console.log('不存在产品说明书')
			}
		},
		ageFilter(value){
          const birthday = new Date(value)
          const now = new Date()
          let age = now.getFullYear()-birthday.getFullYear()-1
          if(now.getMonth()-birthday.getMonth()>0){
            age++
          }else if((now.getMonth()-birthday.getMonth())==0&&(now.getDate()-birthday.getDate())==0){
              age++
          }
          return age
        },
		delPhoto(index){
			
		},
		choicePhoto(index){
			this.imageList.index = index
			this.imageList.isShow = !this.imageList.isShow
		},
		qrcode(){
			MAPlugin.hybridCallAction('hybrid://MAQRCode:401/invokeQRCode?0', function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				 alert(callbackFail)
			});
		},
		scanner(){
			cordova.plugins.barcodeScanner.scan(
					function (result) {
							alert("We got a barcode\n" +
										"Result: " + result.text + "\n" +
										"Format: " + result.format + "\n" +
										"Cancelled: " + result.cancelled);
					},
					function (error) {
							alert("Scanning failed: " + error);
					},
					{
							preferFrontCamera : true, // iOS and Android
							showFlipCameraButton : true, // iOS and Android
							showTorchButton : true, // iOS and Android
							torchOn: true, // Android, launch with the torch switched on (if available)
							saveHistory: true, // Android, save scan history (default false)
							prompt : "Place a barcode inside the scan area", // Android
							resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
							formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
							orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
							disableAnimations : true, // iOS
							disableSuccessBeep: false // iOS and Android
					}
			);
		},
		boxScroll(){
			// window.scrollTo(0, document.getElementById("content_div").scrollHeight)
			if("" == 0){
				window.alert("ok")
			}else{
				window.alert("no")
			}
		},
		shibie(){
				MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', function(callbackSucc){
				    alert(JSON.stringify(callbackSucc))
				}, function(callbackFail){
					 alert(callbackFail)
				});
		},
		jiami(){
			let data = {
				"personsal":{
					"mobile":"18938852265"
				}
			}
			console.log(DES3.encrypt('', JSON.stringify(data)).replace(/\s/g, ""))
		},
		jiemi(){
			let data = "IS/937f4QoG3us1GPLtGGRFZ0JHxb0xT1sYdQtF5/uw5leCLUwAGAA=="
			console.log(DES3.decrypt('', data))
		},
		duibi(){
			console.log(this.str1)
			console.log(this.str2)
			alert(this.str1 == this.str2)
		},
		getBase64Image:function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.naturalWidth
				canvas.height = img.naturalHeight
				var ctx = canvas.getContext("2d");
				// ctx.clearRect(0,0,img.width,img.height);  
				ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL
		},
		login(index,callback){
			let requ = {
				"personsal": {
					"agentCode": '1100D12336',
					"password": hex_hmac_md5(globalConfig.transfer, "014015")
				}
			}
			utils.http.post('MOLOGIN',requ).then(response => {
				callback(index +"/"+ response)
			})
		},
		// new Promise((resolve, reject)=>{
		// 	setTimeout(()=>{
		// 		console.log('resolve data is ' + data)
		// 		resolve(1+1);
		// 	},2000)
		// 	setTimeout(()=>{
		// 		reject(new Error('异常处理'));
		// 	},1000)
		// }).then((data)=>{
		// 	console.log('返回结果' + data);
		// }).catch((error)=>{
		// 	console.log('返回结果' + error);
		// });
		loadAsync(data) {
			// Indicator.open('正在加载...');
			// Indicator.close();
			new Promise((resolve, reject)=>{
				this.login(data,(msg)=>{
					resolve(msg);
				})
			}).then((data)=>{
				console.log('返回结果' + data);
			}).catch((error)=>{
				console.log('返回结果' + error);
			});
		},
		fenxiang2:function(){

			
			let than = this
			var image = document.getElementById('xss_31')
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = "http://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/imageURL?uuid=0f167ae7a2364431b5d1a96e481c2344"
			image.onload =function() {
				than.str1 = than.getBase64Image(image)
				console.log(than.str1)
			}
			setTimeout(()=>{
				image = document.getElementById('xss_30')
				image.setAttribute('crossOrigin', 'anonymous');
				image.src = "http://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/imageURL?uuid=c054cbbf279341668ad48103cd5b9eda"
				image.onload =function() {
					than.str2 = than.getBase64Image(image)
					console.log(than.str2)
				}
			},2000)
		},
		fenxiang:function(){
			let than = this
			var image = document.getElementById('xss_30')
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = "http://img1.imgtn.bdimg.com/it/u=3687554961,1048233800&fm=27&gp=0.jpg"
			image.onload =function() {
				than.str2 = than.getBase64Image(image)
				console.log(than.str2)
			}
			setTimeout(()=>{
				document.getElementById('imageId').src=than.str2
			},3000)
			
		},
		versionSet:function(){
			var url = "itms-services://?action=download-manifest&url=https://yidongzhanyebj-1254235118.cosbj.myqcloud.com/gd/uploadFile/2018/1/31/iOSGuangda_1.1.plist"
			var urlObj = {"url": url}
			var urlStr = JSON.stringify(urlObj)
			var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
			console.log(hybrid)
			MAPlugin.hybridCallAction(hybrid, function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				alert(callbackFail)
			});
		},
		test: function() {
			var str = "<a href='http://www.baidu.com' style='width: 30px;height: 30px;color: #0f0f0f'>点击下载最新版本</a>" 
			MessageBox({
				title: '提示',
				message: str,
				confirmButtonText:'关闭',
			});
		},
		post: function() {
			$.ajax({
				url: "https://api.megvii.com/faceid/lite/get_token",
				type: "POST",
				contentType: "application/json;charset=utf-8",
				heade: 'Access-Control-Allow-Origin',
				data: JSON.stringify({
					'api_key': 'IeEEeq3LZHL9ljmJ78s9WXv378D69MmC',
					'api_secret': 'GuoJYQ3ehoJIaUCogZY9DmuaYLxIh6cV',
					'return_url': 'https:www.baidu.com',
					'notify_url': 'https:www.baidu.com',
					'biz_no': '12019219271832813',
					'comparison_type': '1',
					'idcard_mode': '0',
					'idcard_name': '张鑫',
					'idcard_number': '140724199403250073'
				}),
				dataType: "text",
				success: function(result) {
					console.log(result)
				},
				error: function(msg) {
					console.log(msg)
				}
			})

		}
	},
}</script>

<style>
.div-a{ float:left;width:49%;border:1px solid #F00} 
.div-b{ float:left;width:49%;border:1px solid #000} 

.add > img {
  width: 80%;
  height: 85%;
  margin: 10px auto;
}

.videoData {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.videoData > p{
  width: 45%;
  height: 120px;
  font-size: 12px;
  color: #ffcaa2;
  background: #ffcaa2;
  text-align: center;
  margin: 20px 0;
  position: relative;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
