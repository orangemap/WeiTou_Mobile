<template>
    <div id="register">
	    <Headerbtns :title="'注  册'">
		  	<router-link to="/" replace slot="left" class="back">
		  		<i class="fa fa-angle-left"></i>
		  	</router-link>
	    </Headerbtns>
    	<div class="register-content">
    		<table></table>
      		<div class="name">
				<div class="text">姓名</div>
				<div class="name_input">
					<input type="text" v-model="input_uName" @blur='validUname()'>
				</div>
      		</div>
	      	<div class="id">
		      	<div class="number">身份证号码</div>
		      	<div class="id_input">
		      		<input type="text" v-model="user_ID" @blur="validUserID()">
		      	</div>
	      	</div>
	      	<div class="img">
	      		<img src="../../assets/img/register/rigist.jpg" alt="">
	      	</div>
		  	<div class="button">
		  		<input type="submit" @click="handleRegister()" value="注  册" class="register_button">
		  	</div> 
    	</div>
  	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import Headerbtns from '../common/Header.vue';
	export default{
		name: "register",
	  	components: {Headerbtns}, 
  		data(){
  	      	return{
	  	      	input_uName:"",
	  	      	user_ID:"",
	  	      	isTrue:true
  	      	}
  	    },
  	    methods:{
  	    	//验证用户姓名
  	    	validUname:function(){
  	    		if(this.input_uName==""){
  	    			MessageBox({
  	    				title: '提示',
  	    				message: '姓名不能为空'
  	    			});
  	    		}else if(this.input_uName.length>30){
  	    			// console.log(1);
  	    			MessageBox({
  	    				title: '提示',
  	    				message: '请输入30个以内字符'
  	    			});
  	    		}
  	    	},
  	    	//验证身份证号
  	    	validUserID:function(){
  	    		let reg=/^[1-9](\d{16}|\d{13})[0-9xX]$/;
  	    		if(this.user_ID==""){
  	    			MessageBox({
  	    				title: '提示',
  	    				message: '身份证号码不能为空'
  	    			});
  	    		}else if(!reg.test(this.user_ID)){
  	    			MessageBox({
  	    				title: '提示',
  	    				message: '身份证号格式不正确'
  	    			});
  	    			// console.log(2);
  	    		}else{
  	    			this.handleRegister();	
  	    		}
  	    	},
  	    	//注册事件
  	    	handleRegister:function(){
		    	let requ = {
		    		"proposal": {
		  				"agentName": this.input_uName,
	                    "cerdNum": this.user_ID,
	                    // "mobile": "13436844244"
	                }
		  		}
  		  		utils.http.post('MOREGISTER',requ).then(response => {
  					console.log(response.data);				

  				}).catch(error => {
  					
  				
  				})
  	    		if(this.isTrue){
  	    			MessageBox({
	  	    			title: '恭喜注册成功',
	  	    			message: '初始密码为您身份证的后六位请登录'
  	    			});
  	    		}
  	    		
  	    	}
  	    } 	
    	
  	}
</script>

<style scoped type="text/css">
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
.register-content{
	width: 348px;
	height: 540px;
	background: #FDF6AE;
	margin:84px 13px 43px 13px;
	border-radius: 7px;
}
.name{
	width: 281px;
	height: 35px;
	/* background: yellow;  */
	margin: 44px 42px 16px 24px;
	display: flex;
	line-height: 35px;
}
.id{
	width: 281px;
	height: 35px;
	margin: 0px 42px 0px 24px;
	display: flex;
	line-height: 35px;
}
.text,.number{
	width: 85px;
	text-align: right;
	margin-right: 15px;
	/* background:pink;   */
}
.name_input,.id_input{
	width: 60%;
	background: #fff; 
	padding: 0px 5px;
	border: 2px solid #C6C6C6;
	border-radius: 7px;
}
input{
	width: 100%;
	height: 80%;
	margi: auto 5px;
}
.img{
	text-align: center;
	margin: 28px 0px 24px 0px;
}
img{
	width:266px ;
	height: 277px;
	margin: 0px auto;
}
.button{
	width: 70%;
	height: 50px;
	margin: 0px auto;
	margin: 15px auto;
	background: #FEB101;
	border-radius: 10px;
}
.register_button{
	color: #fff;
	font-size: 20px;
	border:none;
	outline:none;
	background: transparent;
}
</style>