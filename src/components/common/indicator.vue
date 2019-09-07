<template>
	<div v-if="isShow">
     <div class="mint-indicator"><div class="mint-indicator-wrapper" style="padding: 20px;"><span class="mint-indicator-spin"><div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;"></div></span> <span class="mint-indicator-text" style="">上传中...</span></div> <div class="mint-indicator-mask"></div></div>
    </div>
</template>

<script>
	export default{
		name:"indicator",
		data(){
			return{
               isShow:false
			}
		},
		methods:{
            show(){
                this.isShow = true
            },
            hideModal(){
                this.isShow = false
            }
        }
	}
</script>
	
<style type="text/css" lang="scss" scoped>
.mint-indicator-wrapper{
   z-index: 500;
}
</style>