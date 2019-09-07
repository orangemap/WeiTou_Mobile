<template>
	<div class="statements">
		<img src="">
	</div>
</template>

<script>
	export default{
		name:'statements',
		data(){
			return{
				allImg:null
			}
		},
		created(){
			this.getParmas()
		},
		methods:{
			getParmas:function(){
				this.allImg = this.$route.params.allImg
				console.log(this.allImg)
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.statements{
		width: 100%;height: 100%;
		background-color: #999;
	}
</style>