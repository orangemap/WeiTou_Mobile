<template>
	<div class="footerBar">
		<slot name="center"></slot>
	</div>
</template>

<script>
	export default {
		name: 'FooterBar',
		props: {},
		data() {
			return {

			}
		},
		mounted() {
			var _footerBar = $(".footerBar")
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
	.footerBar {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FEB101;
		position: fixed;
		bottom: 0;
		color: #fff;
		font-size: 16px;
		text-align: center;
	}
</style>