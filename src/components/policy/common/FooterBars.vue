<template>
	<div class="footerBars">
		<p>¥<span>{{premium}}</span></p>
		<p>
			<slot name="right"></slot>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'FooterBars',
		props: {
			premium: {
				type: String,
				default: '0.00'
			},
		},
		data() {
			return {

			}
		},
		mounted() {
			var _footerBar = $(".footerBars")
			var u = navigator.userAgent
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			if(isiOS && screen.height == 812 && screen.width == 375) {
				_footerBar.css({
					"bottom": "34px"
				})
			}
		}
	}
</script>

<style type="text/css" scoped lang="scss">
	.footerBars {
		width: 100%;
		height: 70px;
		line-height: 70px;
		border-top:1px solid #EFEFEF;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
	}
	
	.footerBars>p {
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		color: #5B87DF;
	}
	
	.footerBars>p span {
		font-size: 20px;
		font-weight:500;
	}
	
	.footerBars>p:last-child {
		background: #FDB92C;
		color: #FFFDFD;
		width: 110px;
		height: 44px;
		line-height:44px;
		border-radius:3px;
		text-align: center;
	}
</style>