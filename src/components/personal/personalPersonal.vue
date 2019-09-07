<!--个人中心-->
<template>
	<div class="content_page">
        <Headerbtns :title = "page_title" style="left:0;">
            <div slot="left" class="back" @click="back">
                <i class="fa fa-angle-left" ></i>
            </div>
            <div slot="right" class="back" @click="sheetVisible = !sheetVisible">
                <i class="fa fa-ellipsis-v" style="display: inline-block;width: 100%;height: 100%;line-height: 55px;text-align: center;font-size: 24px"></i>
            </div>
        </Headerbtns>
        <div class="manage-main-contents">
            <!-- 代理人头像 -->
            <div class="div_portrait">
                <img id="img_portrait" v-if="agentAvator != null && agentAvator != ''" :src="agentAvator" style="width:75%;height:85%;border-radius:5% 5%;margin:17px auto;">              
            </div>
        </div>
        <!--右角菜单-->
        <mt-actionsheet cancelText="" :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<!--js-->
<script>

    import { Actionsheet } from 'mint-ui'
    import Headerbtns from '../../../src/components/policy/common/Header'

    export default{
        name:'personalInfo',
        components: {Headerbtns,Actionsheet},
        props: ['value'],
        data () {
            return {
                page_title:'头像预览',
                agentAvator:"",
                extUrl:"",//代理人agentList中的值,再次存缓存时使用
                imageName:"",//代理人agentList中的值,再次存缓存时使用
                sheetVisible:false,
                actions:[
                    {
	                    name:"从手机相册选择",
	                    method:this.getNewPhotos
	                },
	                {
	                    name:"拍照上传",
	                    method:this.capturePhoto
	                }
                ],
            }
        },
        mounted(){
            utils.common.setH('content_page')
            let agentList = utils.cache.get('personsal').agentList
            for(var i=0;i<agentList.length;i++){
                if(agentList[i].pageCode=="3"){
                    this.agentAvator=agentList[i].remoteUrl
                }else{
                	let agentSex = utils.cache.get('personsal').appntSex
                	if(agentSex == '1'){
            			this.agentAvator="../../../static/img/personal/man.png"
		            }else if(agentSex == '2'){
		            	this.agentAvator="../../../static/img/personal/women.png"
		            }else{
		            	this.agentAvator="../../../static/img/personal/man.png"
		            }
                }
            }
        },
        methods:{
            //获取本地相册
            getNewPhotos:function(){
                getNewPhoto(pictureSource.SAVEDPHOTOALBUM,(imageData)=>{
                    this.imageUpload(imageData)
                },(message)=>{
                  // alert(message)
                })
            },
            //调取相机拍照
            capturePhoto:function() {
                capturePhotoCallback((imageData)=>{
				  this.imageUpload(imageData)
                },(message)=>{
                    // alert(message)
                })
            },
            //上传头像
            imageUpload:function(image){
                let agentCode = utils.cache.get('personsal').agentCode
                if(image != ""){
                    let requ = {
                        "upload": {
                            "agentCode":agentCode,
                            "applyCode":'',
                            "orderId":'12345',
                            "policyCode":"",
                            "deviceNo":"",
                            "imageList":[{
                                "imageType":'agent',
                                "imageName":agentCode+".jpg",
                                "imageByte":image
                            }]
                        }
                    }
                    if(requ.upload.imageList[0].imageByte!=undefined 
                    	&& requ.upload.imageList[0].imageByte!=""){
                        console.log(requ,'上传头像请求参数')
                        utils.http.postFast('MOUPLOAD',requ,(body)=>{
                            if(body.resultMessage == "上传影像成功！"){
                            	//页面赋值
                            	let positive = document.getElementById('img_portrait');
			                    positive.style.display = 'inline-block'
			                    positive.src = "data:image/jpeg;base64," + image
			                    
			                    let agentList = utils.cache.get("agentList")
			                    let imagePortrait = {
			                    	extUrl:utils.cache.get("personsal").agentCode,
									imageName:utils.cache.get("personsal").agentCode+".jpg",
									pageCode:"3",
									remoteUrl:"data:image/jpeg;base64,"+image
			                    }
			                    if(agentList.length != '3'){
			                    	agentList.push(agentList)
			                    }else{
			                    	for(var i=0;i<agentList.length;i++){
						                if(agentList[i].pageCode=="3"){
						                    agentList[i] = imagePortrait
						                }
						            }
			                    }
			                    let personsal = utils.cache.get("personsal")
			                    personsal.agentList = agentList
			                    utils.cache.set("personsal",personsal)
			                    utils.cache.set("agentList",agentList)
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="css" scoped type="text/css">
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
      font-size: 35px;
    }
    .manage-main-contents{
        width: 100%;
        background: #F6F5F4;
        position: absolute;
        left: 0;
        right: 0;
        top: 48px;
        bottom: 0px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .div_portrait{
        width: 100%;
        height: 90%;
        margin: 10px auto;
        position: relative;
        display: flex;
        justify-content: space-between;
    }
</style>
