<template>
	<div class="title">
		<p>{{title}}</p>
	</div>
</template>

<script>
	export default{
		name:"item_title",
		props:{
			title:{
				type:String,
				default:''
			}
		},
		data(){
			return{

			}
		},
		mounted(){
			
		}
	}
</script>
	
<style type="text/css" lang="scss" scoped>
.title{
	border-top: 1px solid #BBB;
	background: #F5F5F5;
	width: 100%;height: 40px;
	border-bottom: 1px solid #BBB;
	p{
		float:left;
		height: 100%;
		line-height: 40px;
		padding-left: 10px;
		color: #FFAC00;
	}
}
</style>