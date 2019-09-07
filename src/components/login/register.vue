<template>
    <div id="register">
	    <Headerbtns :title="'注  册'">
		  	<router-link to="/" replace slot="left" class="back">
		  		<i class="fa fa-angle-left"></i>
		  	</router-link>
	    </Headerbtns>
    	<div class="register-content">
	    	<table></table>
    		<div class="registerContent">
	    		<table></table>
	      		<div class="name">
					<div class="text">姓名</div>
					<div class="name_input">
						<input type="text" v-model="input_uName">
					</div>
	      		</div>
		      	<div class="id">
			      	<div class="number">证件号码</div>
			      	<div class="id_input">
			      		<input type="text" v-model="user_ID">
			      	</div>
		      	</div>
		      	<div class="img">
		      		<img src="../../../static/img/register/rigist.jpg" alt="">
		      	</div>
			  	<div class="button">
			  		<input @click="handleRegister()" type="submit" value="注  册" class="register_button">
			  	</div> 
    		</div>
    	</div>
    	<!-- 确认提示框 -->
    	<mt-popup v-model="registerBox" style="width: 80%;height: 216px;border-radius: 20px;" position="center">
    	    <div class="registerHeader">
    	        温馨提示    
    	    </div>
    	    <div class="regContent">
    	        恭喜注册成功！初始密码为您证件号码的后六位！请登录！
    	    </div>
    	    <div class="registerFooter">
    	        <a id="confirmBtn" @click="registerEvent()">确定</a>
    	    </div>
    	</mt-popup>
    	<alert ref="alert"></alert>
  	</div>
</template>

<script>
	import alert from '../policy/common/alert.vue'
	import Headerbtns from '../common/Header.vue';
	export default{
		name: "register",
	  	components: {Headerbtns,alert}, 
  		data(){
  	      	return{
	  	      	input_uName:"",
	  	      	user_ID:"",
	  	      	registerBox:false,
  	      	}
  	    },
  	    methods:{
  	    	//当注册成功后弹出弹框后点击确定事件
  	    	registerEvent(){
  	    		this.registerBox != this.registerBox
  	    		this.$router.push("/logins/login");
  	    	},
  	    	//验证用户姓名
  	    	validUname:function(){
  	    		var validName=true;
  	    		if(this.input_uName==""){
  	    			this.$refs.alert.showMOdal('姓名不可为空,请确认！')
  	    			validName=false;
  	    		}else if(this.input_uName.length>30){
  	    			// console.log(1);
  	    			this.$refs.alert.showMOdal('请输入30个以内字符')
  	    			validName=false;
  	    		}else{
  	    			validName=true;
  	    		}
  	    		return validName
  	    	},
  	    	//验证身份证号
  	    	validUserID:function(){
  	    		let userID=true;
  	    		//let reg=/^[1-9](\d{16}|\d{13})[0-9X]$/;
						let regEn = /[`~!@#$%^&*()_+<>?:"{},. \/;'[\]]/im
						let regCn = /[·！#￥（——）：；“”‘、，|《。》？、 【】[\]]/im;
  	    		this.user_ID = this.user_ID.replace(/(^\s*)|(\s*$)/g, "")
  	    		if(this.user_ID==""){
  	    			this.$refs.alert.showMOdal('证件号码不可为空,请确认！')
  	    			userID=false;
  	    		}else if(regEn.test(this.user_ID) || regCn.test(this.user_ID)){
  	    			this.$refs.alert.showMOdal('证件号码不能包含特殊字符')
  	    			userID=false;
  	    		}else{	
  	    			userID=true;
  	    		}
  	    		return userID
  	    	},
  	    	//进行人脸识别接口调用方法
  	    	ficeDistinguish:function(image){
  	    		let requ = {
	  				"policy": {
	  					"agentCode":"",
	  					"name":this.input_uName,
	  					"cardId":this.user_ID,
	  					"functionCode":"LOGIN",
	  					"imageByte":image,
	       				"applyCode":"",
	       				"policyCode":"",
	       				"idType":"11",
	                }
		  		}
            	console.log(JSON.stringify(requ))
	            utils.http.postFast('FACEIDKSHL',requ,(body)=>{
	            	if(body.policy.resultCode == '0'){
	            		// 识别成功后可以进行后续注册操作
	            		console.log(body.policy.resultMsg);
	            		this.register()
	            	}else{
			    		this.$refs.alert.showMOdal(body.policy.resultMsg)
	            	}
	            })
  	    	},
  	    	//请求注册接口
  	    	register:function(){
		    	let requ = {
	  				"personsal": {
	                    "agentName": this.input_uName,
	                    "cerdNum": this.user_ID,
	                    "mobile": utils.cache.get('login_phone'),
	                    "type": "2"
	                }
		  		}
  		  		utils.http.post('MOREGISTER',requ).then(response => {
  					console.log(response);
  					let personsal = response.data.response.personsal
			    	if(response.data.header.responseCode=="0"){
			    		this.registerBox=true		
			    	}else if(response.data.header.responseCode!="0"){
			    		let stringIndex=response.data.header.errorMessage.indexOf("at com")
			    		let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
			    		console.log(errorMessage);
			    		this.$refs.alert.showMOdal(errorMessage)
			    	}		
  				}).catch(error => {
  					
  				})
  	    	},
  	    	//请求渠道
  	    	requestChannel:function(){
    			//请求渠道
		    	let requ = {
	  				"personsal": {
	                    "agentName": this.input_uName,
	                    "cerdNum": this.user_ID,
	                    "mobile": utils.cache.get('login_phone'),
	                    "type": "1"
	                }
		  		}
		  		utils.http.post('MOREGISTER',requ).then(response => {
		  			console.log(response);
		  			let personsal = response.data.response.personsal
		  			console.log("返回",personsal);
		  			if(response.data.header.responseCode=="0"){
			  			if (personsal.channel == '05') {
			  				//此渠道不进行人脸识别,直接调用注册接口
			  				this.register()
			  			}else{ 
					        // this.register();
			  				//调用移动设备进行人脸识别
			    			console.log("调用人脸识别")
				  			MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?',(callbackSucc)=>{
			            		this.ficeDistinguish(callbackSucc)
					        }, (callbackFail)=>{
					        	 alert(callbackFail);
					        });
			  			}
		  			}else if(response.data.header.responseCode!="0"){
		  				let stringIndex=response.data.header.errorMessage.indexOf("at com")
		  				let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
		  				// console.log(errorMessage);
		  				this.$refs.alert.showMOdal( errorMessage)
		  			}
		  			
		  		})
  	    	},
  	    	//点击注册事件
  	    	handleRegister:function(){
  	    		let isRegister=true;
  	    		if(isRegister==true){
  	    			isRegister=this.validUname();
  	    		}
  	    		if(isRegister==true){
  	    			isRegister=this.validUserID();
  	    		}
  	    		if(isRegister==true){
  	    			this.requestChannel()
  	    		}

  	    	},
  	    	//提示框
  	    	showMsg:function(msg){
  	    	    if(msg!=undefined && msg!=""){
  	    	         this.$refs.alert.showMOdal(msg)
  	    	    }
  	    	},
  	    } 	
    	
  	}
</script>

<style scoped type="text/scss" lang="scss">
	.back{
		display: block;
		height: 100%;width: 100%;
		position: relative;
		img{
			position: absolute;
			top: 50%;left: 50%;
			margin-top: -10px;
			margin-left: -20px;
		}
	}
	.fa{
		color: #FDB92C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	#register{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.register-content{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.registerContent{
		width: 90%;height: 82%;
		background: #FDF6AE;
		border-radius: 10px;
		margin: auto;
		margin-top:25%;
	}
	.name{
		width: 95%;
		height: 8%;
		display: flex;
		margin:5% auto;
		align-items: center;
		line-height: 30px;
		/* background: blue; */
	}
	.id{
		width: 95%;
		height: 8%;
		display: flex;
		align-items: center;
		line-height: 30px;
		margin:auto;
		/* background: blue; */
	}
	.text,.number{
		width:45%;
		text-align: right;
		margin-right: 15px;
		/* background:pink;   */
	}
	.name_input,.id_input{
		width: 82%;
		background: #fff; 
		border: 2px solid #C6C6C6;
		border-radius: 7px;
	}
	input{
		width: 95%;
		height: 80%;
		margin: auto 5px;
	}
	.img{
		width: 80%;
		height:50%;
		margin:7% auto;
	}
	img{
		width:100% ;
		height: 100%;
	}
	.register-content .button{
		width: 70%;
		height: 30px;
		background: #FEB101;
		border-radius: 10px;
		line-height: 30px;
	}
	.register_button{
		color: #fff;
		font-size: 20px;
		border:none;
		outline:none;
		background: transparent;
	}
	.registerHeader{
	    width: 100%;height: 50px;
	    text-align: center;
	    /*font:18px/50px"";*/
			font-size:18px;
			line-height:50px;
	    color:#FFF;
	    background-color: #0C3073;
	    font-weight: bold;
	    border-bottom: 3px solid #FEB101;
	    border-radius: 20px 20px 0 0;
	}
	.regContent{
	   width: 100%;
	   text-align: center;
	   margin: 20px auto;
	   line-height: 30px;
	}
	.registerFooter{
	    width: 100%;height: 60px;
	    border-top: 1px dashed #BBB;
	    display: flex;
	    justify-content: space-around;
	}
	.registerFooter a{
	    display: inline-block;
	    width: 80px;height: 41px;
	    text-align: center;
	    line-height: 41px;
	    font-size: 18px;
	    margin-top: 10px;
	    background-color: #FEB101;
	    color: #FFF;
	    border-radius: 10px;
	}
</style>