<template>
	<div>
		<div  v-show="true">
			<div class="nav-lists">
		        <ul class="nav-list">
		          <li @click="locationOcr">
		            <p>本地人脸识别</p>
		          </li>
		          <li @click="locationOcr2" style="margin-top: 30px;">
		            <p>本地证件识别0</p>
		          </li>
		           <li @click="locationOcr3" style="margin-top: 30px;">
		            <p>本地证件识别1</p>
		          </li>
		          <li @click="getApkInfo" style="margin-top: 30px;">
		            <p>获取apk版本号</p>
		          </li>
		       	  <li @click="getApkInfo2" style="margin-top: 30px;">
		            <p>传参</p>
		          </li>
		        </ul>
		        <img id='test' src="" style="display:block;width:100%"/>
		        <img :src="image" style="display:block;width:100%"/>
	      </div>
      </div>
      <IDCardScanning v-show="true" v-model="occupationValue" @click="" style="height:40%;margin-top: 300px;"></IDCardScanning>
	</div>
</template>

<script>
	import IDCardScanning from '../common/IDCardScanning.vue'
	export default{
		name:'test',
		components: {IDCardScanning},
		data () {
	    return {
	    	image:'',
	    	occupationValue:''
	    }
	  },
	  beforeMount(){
	  },
	  mounted(){
	  },
	  methods:{
	  	locationOcr:function(){
	  		MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', function(callbackSucc){
			    alert(callbackSucc)
			    document.getElementById("test").src = "data:image/png;base64," + callbackSucc;
			    this.image = "data:image/png;base64," + callbackSucc;
			}, function(callbackFail){
				alert(callbackFail)
			});
	  	},
	  	locationOcr2:function(){
	  		let platform = globalConfig.os
	  		if(platform == 'android'){
	  			MAPlugin.hybridCallAction('hybrid://MAOcrIdCard:401/invokeOcrIdCard?0', function(callbackSucc){
				    alert(JSON.stringify(callbackSucc))
				}, function(callbackFail){
					alert(callbackFail)
				});
	  		}
	  	},
	  	locationOcr3:function(){
	  		MAPlugin.hybridCallAction('hybrid://MAOcrIdCard:401/invokeOcrIdCard?1', function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				alert(callbackFail)
			});
	  	},
	  	getApkInfo:function(){
	  		MAPlugin.hybridCallAction('hybrid://MAApkInfo:401/invokeApkInfo?', function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				alert(callbackFail)
			});
	  	},
	  	getApkInfo2:function(){
	  		MAPlugin.hybridCallAction('hybrid://MAApkInfo:401/invokeApkInfo?锄禾日当午', function(callbackSucc){
			    alert(JSON.stringify(callbackSucc))
			}, function(callbackFail){
				alert(callbackFail)
			});
	  	}
	  },
	}
</script>

<style>
	li{
		margin-top: 10px;
	}
</style>