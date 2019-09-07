<template>
	<div class="footer-content">
		<div >
			<div class="footer-left" v-show="is_show">
				{{total_premium}}元
			</div>
			<div class="footer-right"  v-show="is_show">
				<slot name="right"></slot>
			</div>
			<div class="footer-center" >
				<slot name="center"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Footertabs',
		props: {
			total_premium: {
				type: String,
				default: '0.00'
			},
			is_show:{
				type:Boolean,
				default: true
			}
		},
		data() {
			return {
				msg: ''
			}
		},
		mounted() {
			var _header = $(".footer-content")
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS){
				if(screen.height == 812 && screen.width == 375){
					_header.css({
						"height": "84px"//50+34
					})
				}
			}
		}
	}
</script>

<style type="text/css" scoped lang="scss">
	.footer-content{
		position: fixed;
		bottom: 0;
        font-size: 12px;
		width: 100%;height: 50px;
		margin:0 auto;
		z-index: 333;
		background:#fff;
	}
	.footer-center {
		height: 50px;
		width: 100%;
	    background: #003756;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 12px;
	}
	
	.footer-left {
		height: 50px;
		width: 33%;
		background: #003756;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
	.footer-left-jihua{
		height: 50px;
		width: 50%;
		background: #003756;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
	.footer-right {
		height: 50px;
		width: 33%;
		background: #FFAC00;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
	.footer-jihua{
      	height: 50px;
		width: 50%;
		background: #FFAC00;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		float: left;
	}
</style>