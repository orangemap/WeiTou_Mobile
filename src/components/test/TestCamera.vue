<template>
	<div>
		<button onclick="capturePhoto();">Capture Photo</button> <br><br>
		<button @click="capturePhoto">Capture Photo 2</button> <br><br>
		<button @click="capturePhoto2">Capture Photo 3</button> <br><br>
		<button onclick="capturePhotoEdit();">Capture Editable Photo</button> <br><br>
		<button onclick="getPhoto(pictureSource.PHOTOLIBRARY);">From Photo Library</button><br><br>
		<button onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);">From Photo Album</button><br><br>
		<img style="display:none;" id="smallImage" src="" />
		<img style="display:none;" id="largeImage" src="" />
		<button style="font-size:23px;" onclick="createAndWriteFile();">创建并写入文件</button><br><br>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	
	export default{
		name:'policy_list',
  		components: {Headerbtns,Footerbtns},
		data () {
	    return {
	    	page_title:'金生富贵',
	    }
	  },
	  beforeMount(){
	  	let nowTime = new Date()
	  	console.log(nowTime.getFullYear())
	  	var month = nowTime.getMonth()+1
	  	console.log(month)
	  	console.log(nowTime.getDate())
	  	this.date1 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	this.date2 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	console.log(this.date1 + ',' + this.date2)
	  },
	  mounted(){
	  	window.localStorage.removeItem('addManage')
	  	window.localStorage.removeItem('editList')
	  },
	  methods:{
	  	capturePhoto:function() {
	  		capturePhotoCallback((imageData)=>{
	  			alert(imageData)
	  			var smallImage = document.getElementById('smallImage');
				smallImage.style.display = 'block';
				smallImage.src = "data:image/jpeg;base64," + imageData;
	  		},(message)=>{
	  			alert(message)
	  		})
	  	},
	  	capturePhoto2:function() {
	  		capturePhotoURICallback((url)=>{
	  			loadImage(url,(result)=>{
	  				alert(result)
	  			})
	  		},(message)=>{
	  			alert(message)
	  		})
	  	}
	  },
	}
</script>

<style>
</style>