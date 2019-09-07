<!-- 下载中心页面 -->
<template>
	<div>
		 <div v-if="isWeiXin()">
            <img :src=imgs.down_in_wechar width="100%" />
        </div>
        <div v-if="!isWeiXin()" class="scroll-content has-header">
            <img :src=imgs.download_bg alt="" style="z-index: 1;width: 100%;height: 100%;display:block;">
            <div class="content">
                <div class="buttons">
                	<div v-show="version!=undefined && version.andriod.andriod_URL!=''">
                        <button class="button button-android" @click.capture="download('android')">
                            <div class="col col-icon">
                                <i class="fa fa-android"></i>
                            </div>
                            <div class="col col-text"><span>Android下载</span></div>
                    	</button>
                    </div>
                    
                    <div v-show="version!=undefined && version.IOS.IOS_URL!=''">
                        <button class="button button-ios" @click="download('ios')">
                            <div class="col col-icon">
                                <i class="fa fa-apple"></i>
                            </div>
                            <div class="col col-text"><span>iPhone下载</span></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
	</div>
	
</template>

<!--js-->
<script>
import { MessageBox } from 'mint-ui'

export default{
	name:'info',
	components: {},
	props: ['value'],
	data () {
	    return {
	        imgs:{
				android:'static/img/down/android.png',
				android_1:'static/img/down/android_1.png',
				ios:'static/img/down/ios.png',
				ios_1:'static/img/down/ios_1.png',
				download_bg:'static/img/down/download_bg.png',
				down_in_wechar:'static/img/common/icon_down_in_wechar.png',
	    	},
	    	version:{
	    		IOS:{
	    			IOS_URL:'',
	    		},
	    		andriod:{
	    			andriod_URL:'',
	    		}
	    	},
  		}
	},
 	beforeMount(){

  	},
  	mounted(){
  		if(!this.isWeiXin()){
  			utils.httpGetVersion.get().then(response => {
				console.log(response)
				if(response.success){
					console.log(response.message)
					this.version = response.data
				}else{
					console.log(response.message)
					console.log(response.data)
				}
			})
  		}
  	},
  	methods:{
  		isWeiXin() {
	    	let ua = window.navigator.userAgent.toLowerCase();
	    	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	        	return true;
	    	} else {
	        	return false;
	    	}
		},
		download(platform) {
			console.log(platform)
		    if (platform === 'ios') {
		     	location.href = this.version.IOS.IOS_URL
		        return;
			 } else if (platform === 'android') {
		        location.href = this.version.andriod.andriod_URL
		        return;
		    }
		}
	}
}
</script>

<style lang="scss" scoped type="text/css">
* {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
        
.bar-header {
    display: none;
}

.has-header {
    top: 0px;
}

.txt {
    position: absolute;
    width: 100%;
    top: 0px;
    padding: 15px 0;
    text-align: center;
    background: transparent;
    color: #77adb1;
    font-size: 0.4rem;
    z-index: 3;
}

.txt i {
    font-size: 0.5rem;
}

.scroll-content {
    overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
    bottom: 0;
    margin-bottom: -1px;
}

.bar-header {
    top: 0;
    color: white;
    border: none;
    background: rgb(251, 128, 64);
}

.bar-header .title {
    font-family: '黑体';
    margin: 0;
    height: 43px;
    text-align: center;
    font-size: 17px;
    line-height: 44px;
}

body {
    background: rgb(244, 244, 244);
    margin: 0;
    height: 100%;
    overflow: hidden;
}

div.registered {
    margin: 10px 16px;
    color: rgb(251, 128, 64);
    font-weight: 600;
    text-align: center;
}

.button {
    margin-bottom: 20px;
    padding: 0 12px;
    border: #fff 1px;
    border-radius: 6px;
    min-height: 60px;
    color: #FFB227;
    background: #fff;
    width: 100%;
    outline: none;
}

.button.disabled,
.button:active,
.button[disabled] {
    color: #FFB227;
}

.col-icon {
    font-size: 1rem;
    width: 20%;
    float: left;
}

.col-text {
    font-size: 0.5rem;
    width: 80%;
    float: left;
}

.col {
    height: 1.2rem;
    line-height: 1.2rem;
    white-space: nowrap;
    display: inline-block;
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
}

.buttons {
    width: 70%;
    position: fixed;
    text-align: center;
    z-index: 10;
    bottom: 12%;
    left: 15%;
}

span{
	font-size: 1.4rem;
}

.fa-android:before {
    content: "\f17b";
    font-size: 3.0rem;
    text-align: center;
    line-height: 15px;
    margin-left: 10px;
}

.fa-apple:before {
    content: "\f179";
    font-size: 3.0rem;
    text-align: center;
    line-height: 15px;
    margin-left: 10px;
}
.fa-plane:before {
    content: "\f072";
	font-size: 1.5rem;
	color: rgb(255, 178, 39);
}
</style>
