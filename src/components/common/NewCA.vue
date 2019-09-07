<template>
	<div id='content_newca'>
		<p>{{showText}}</p>
		<canvas id='canvas'>您当前浏览器不支持canvas，建议更换浏览器！</canvas>
		<div>
			<button @click='Output()' :disabled="close">确定</button>
			<button @click='ClearCanvas'>清空</button>
			<button @click='Canvas_goBack'>返回</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'newCA',
		props: ['value'],
		data() {
			return {
				ImgSrc: '',
				showText:'请您横向签字',
				close:false,
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
			}
		},
		watch: {
			'value.context_id': {
				handler(val, oldval) {
					this.setSignTitle(val)
				},
				deep: true
			},
		},
		mounted() {
			/*签字*/
			let canvas = document.getElementById('canvas')
			let ctx = canvas.getContext('2d');
			let _x = 0, _y = 0, x = 0, y = 0;
			canvas.width = this.screenWidth-142;
			canvas.height = this.screenHeight-122;
			this.setContentSize()
			canvas.addEventListener('touchstart', function(e) { // 开始绘制
				e.preventDefault();
				_x = e.touches[0].pageX,
					_y = e.touches[0].pageY;
				ctx.beginPath(); // 路径开始
				ctx.lineWidth = 5
				ctx.moveTo(_x-70, _y-35);
				this.addEventListener('touchmove', function(e) { // 路径移动
					x = e.touches[0].pageX,
						y = e.touches[0].pageY;
					ctx.lineTo(x-70, y-35);
					ctx.stroke();
				});
			});
			/*
			$(window).resize(()=>{
				this.setContentSize()
			});
			*/
		},
		methods: {
			setContentSize(){
				console.log('当前屏幕宽 : ',$(window).width())
				console.log('当前屏幕高 : ',$(window).height())
			    this.screenWidth = $(window).width()
			    this.screenHeight = $(window).height()
			    
			    //计算操作按钮right值
			    let content_button_width_half = $(window).width()/2
			    let content_button_height_half = 35/2
			   	let content_button_right = "-" + (content_button_width_half-content_button_height_half-15) +"px"
			   	
			   	console.log("按钮高度 : ",35)
			   	console.log("按钮 right : ", content_button_right)
			    
			    $("#content_newca div").css('right', content_button_right)
			    $("#content_newca div").css('top', '45%')
			    $("#content_newca div").css('text-align', 'center')
			    
			    //计算操作标题left值
			    let content_p_width_half = $(window).width()/2
			    let content_p_height_half = 30/2
			   	let content_p_left = "-" + (content_p_width_half-content_p_height_half-15) +"px"
			   	
			   	console.log("标题高度 : ",30)
			   	console.log("标题 left : ", content_p_left)
			   	
			    $("#content_newca p").css('left', content_p_left)
			    $("#content_newca p").css('font-size', '30px')
			    $("#content_newca p").css('top', '45%')
			    $("#content_newca p").css('width', '100%')
			    
			    //设置canvas宽高
			    let canvas = document.getElementById('canvas')
			    canvas.width = this.screenWidth-142;
				canvas.height = this.screenHeight-122;
				
				$("#content_newca canvas").css('margin-top', "35px")
				$("#content_newca canvas").css('margin-right', "0px")
				$("#content_newca canvas").css('margin-bottom', "0px")
				$("#content_newca canvas").css('margin-left', "60px")
			},
			setSignTitle(context_id){
				if(context_id == '30'){
					this.showText = ''
				}else if(context_id == '31'){
					this.showText = ''
				}else if(context_id == '24HZ'){
					this.showText = '请投保人签署姓名'
				}else if(context_id == '24' || context_id == '241' || context_id == '24BG' || context_id == '24CJ'){
					this.showText = '请投保人签字'
				}else if(context_id == '25' || context_id == '251'){
					this.showText = '请被保人签字'
				}else if(context_id == '23'){
					this.showText = '请代理人签字'
				} else if(context_id.indexOf(25)>-1) {
					this.showText = '请被保人签字'
				}else{
					this.showText = '请您横向签字'
				}
			},
			rotate(data) {
				let edg = 90
				let canvas = document.createElement("canvas");
		        let ctx = canvas.getContext("2d");
		        let imgW; //图片宽度
		        let imgH; //图片高度
		        let size; //canvas初始大小
		        if (edg % 90 != 0) {
		            console.error("旋转角度必须是90的倍数!");
		            throw '旋转角度必须是90的倍数!';
		        }
		        (edg < 0) && (edg = (edg % 360) + 360)
		        const quadrant = (edg / 90) % 4; //旋转象限
		        const cutCoor = {
		            sx: 0,
		            sy: 0,
		            ex: 0,
		            ey: 0
		        }; //裁剪坐标
		        let image = new Image();
		        let result = utils.common.getiPhoneVersion()
				if(result&&result.indexOf('10.1')>-1){
				}else{
					image.crossOrigin = "anonymous"
				}
		        image.src = data;
		        let than = this
		        image.onload = function() {
		            imgW = image.width;
		            imgH = image.height;
		            size = imgW > imgH ? imgW : imgH;
		            canvas.width = size * 2;
		            canvas.height = size * 2;
		            switch (quadrant) {
		                case 0:
		                    cutCoor.sx = size;
		                    cutCoor.sy = size;
		                    cutCoor.ex = size + imgW;
		                    cutCoor.ey = size + imgH;
		                    break;
		                case 1:
		                    cutCoor.sx = size - imgH;
		                    cutCoor.sy = size;
		                    cutCoor.ex = size;
		                    cutCoor.ey = size + imgW;
		                    break;
		                case 2:
		                    cutCoor.sx = size - imgW;
		                    cutCoor.sy = size - imgH;
		                    cutCoor.ex = size;
		                    cutCoor.ey = size;
		                    break;
		                case 3:
		                    cutCoor.sx = size;
		                    cutCoor.sy = size - imgW;
		                    cutCoor.ex = size + imgH;
		                    cutCoor.ey = size + imgW;
		                    break;
		            }
		            ctx.translate(size, size);
		            ctx.rotate(edg * Math.PI / 180);
		            ctx.drawImage(image, 0, 0);
		            let imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
		            for(let i = 0; i < imgData.data.length; i += 4) {
			            // 当该像素是透明的，则设置成白色
			            if(imgData.data[i + 3] == 0) {
			                imgData.data[i] = 255;
			                imgData.data[i + 1] = 255;
			                imgData.data[i + 2] = 255;
			                imgData.data[i + 3] = 255; 
			            }
			        }
		            if (quadrant % 2 == 0) {
		                canvas.width = imgW;
		                canvas.height = imgH;
		            } else {
		                canvas.width = imgH;
		                canvas.height = imgW;
		            }
		            ctx.putImageData(imgData, 0, 0);
					//系统获取一个空canvas对象
					let blank = document.createElement('canvas');
				    blank.width = canvas.width;
				    blank.height = canvas.height;
				    let blankctx = blank.getContext("2d");
				    let blankimgData = blankctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
		            for(let i = 0; i < blankimgData.data.length; i += 4) {
			            // 当该像素是透明的，则设置成白色
			            if(blankimgData.data[i + 3] == 0) {
			                blankimgData.data[i] = 255;
			                blankimgData.data[i + 1] = 255;
			                blankimgData.data[i + 2] = 255;
			                blankimgData.data[i + 3] = 255; 
			            }
			        }
				    blankctx.putImageData(blankimgData, 0, 0);
				    
				    let blankSrc = blank.toDataURL('image/png')
					than.ImgSrc = canvas.toDataURL('image/png')
					
				    //console.log('=blankSrc=>', blankSrc)
				    //console.log('=ImgSrc=>', than.ImgSrc)
				    
				    if(blankSrc == than.ImgSrc){
						than.value.isCAOpen = !than.value.isCAOpen
					}else{
						if(than.value.context_id != 999 + 'HZ'){
							than.imageUpload(than.value.context_id,than.ImgSrc)
						}else{
							than.value.isCAOpen = !than.value.isCAOpen
							than.$emit('ChildMsg',than.ImgSrc)
						}
					}
		      };
			},
			Output() {
				let num=0
				this.close=true
				let interval=setInterval(()=>{
					console.log(111111)
					num++
					if(num>=3){
						this.close=false
						clearInterval(interval)
					}
				},1000)
				let canvas = document.getElementById('canvas')
				let ctx = canvas.getContext('2d')
				let oImg = new Image();
				ctx.drawImage(oImg, 0, 0);
				let imgSrc = canvas.toDataURL('image/png')
				//console.log('=imgSrc=>', imgSrc)
				this.rotate(imgSrc)
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			},
			ClearCanvas() {
				let canvas = document.getElementById('canvas')
				let ctx = canvas.getContext('2d')
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			},
			Canvas_goBack() {
				let canvas = document.getElementById('canvas')
				let ctx = canvas.getContext('2d')
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				this.value.isCAOpen = !this.value.isCAOpen
			},
			imageUpload: function(context_id, image) {
				if(image != undefined && image != "") {
					let requ = {
						"upload": {
							"agentCode": this.value.agentCode || '',
							"applyCode": this.value.applyCode,
							"orderId": this.value.orderId,
							"policyCode": "",
							"deviceNo": "",
							"imageList": [{
								"imageType": context_id,
								"imageName": "签字照片",
								"imageByte": image.substring(22, image.length)
							}],
							"reitoapp": this.value.reitoapp || ''
						}
					}
					if(requ.upload.imageList[0].imageByte != undefined && requ.upload.imageList[0].imageByte != "") {
						utils.http.postFast('MOUPLOAD', requ, (body) => {
							if(body.resultCode == "0") {
								console.log(body.resultMessage)
								let canvas = document.getElementById('canvas')
								let ctx = canvas.getContext('2d')
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								this.value.isCAOpen = !this.value.isCAOpen
							}else{
								alert_n22.alert("提示", body.resultMessage, "确定")
								this.value.isCAOpen = !this.value.isCAOpen
							}
						})
					}
				}
			}
		}
	}
</script>
<style scoped type="text/css">
	#content_newca{
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		bottom:0;
		background: #fff;
		z-index: 10000;
	}
	#content_newca>p{
		/*height:70px;
		line-height:70px;*/
		text-align:center;
		font-size:20pt;
		transform: rotate(270deg);
		position:absolute;
		top:45%;
		left:-13%;
	}
	#canvas {
		border: 2px solid #666666;
		margin:35px 50px 35px 70px;
	}
	#content_newca>div {
		transform: rotate(270deg);
		width:100%;
		position:absolute;
		top:44%;
		right:-43%;
	}
	#content_newca>div>button {
		background: #EB9D41;
		height: 35px;
		line-height: 35px;
		width: 100px;
		color: #fff;
		border-radius: 5px;
		outline: none;
		border: none;
	}
</style>