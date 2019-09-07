<template>
	<div id="swiper-home">
		<mt-swipe :auto="4000" id="swiper-content">
			<mt-swipe-item v-for="(item,index) in bannerImgs" :key="index">
		  	<!-- <p :style="backgroundDiv_1"></p> -->
		  	<!-- <p :style="url(' + require('item') + ')"></p> -->
		  	<img :src="item" alt="" >
		  	<!-- <p>{{item}}</p> -->
		  </mt-swipe-item>
		  <!-- <mt-swipe-item>
		  	<p :style="backgroundDiv_2"></p>
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<p :style="backgroundDiv_3"></p>
		  </mt-swipe-item> -->
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		name:'swiper',
		data(){
	      return{
	      	// item:'',
	      	bannerImgs:''
	        // backgroundDiv_1:{
         //  		backgroundImage: 'url(' + require('../../assets/LBT028.jpg') + ')'
        	// },
        	// backgroundDiv_2:{
         //  		backgroundImage:'url(' + require('../../assets/LBT028.jpg') + ')'
        	// },
        	// backgroundDiv_3:{
         //  		backgroundImage:'url(' + require('../../assets/LBT028.jpg') + ')'
        	// }
	      }
	    },
	    methods:{
	    	Carousel(arr){
	    		this.bannerImgs = arr
	    		console.log(arr,'bannerImgs')
	    		// for(var elem of this.bannerImgs){
	    		// 	console.log(elem,'elem')
	    		// 	// this.item = elem
	    		// }
	    	}
	    }
	}
</script>

<style type="text/css" lang="scss" scoped>
	#swiper-home #swiper-content img{
		display: block;
		width: 100%;
	}
	#swiper-home #swiper-content .mint-swipe-indicators{
		position: absolute;
		left: 80% !important;
	}
	#swiper-home img{
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
	}
</style>