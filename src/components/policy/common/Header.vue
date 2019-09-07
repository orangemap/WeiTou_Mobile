<template>
	  <div class="v-header">
				<ul>
						<li class="header-btn">
								<slot name="left"></slot>
						</li>
						<li class="header-title">
								{{title}}
								<slot name="title"></slot>
						</li>
						<li class="header-btn">
								<slot name="right"></slot>
						</li>
				</ul>
				<div></div>
	  </div>
</template>

<script>
	export default {
		name: "v-header",
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		mounted() {
			var _header = $('.v-header')
			var _maincontents = $(".main-contents") //流程/不需要底边时页面设置 bottom:0 !important
			var _ejectcontents = $(".eject-contents") //弹框
			var _mintactionsheet = $(".mint-actionsheet") //弹框-底边
			var _fixedImg = $(".fixedImg")
			var u = navigator.userAgent
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			//待删
			var _managemaincontents = $(".manage-main-contents")
			var _showmanagcontents = $(".show-content")
			var _enjoycontent = $(".enjoy-content")
			if(isiOS) {
				_header.css({
					"padding-top": "20px",
					"height": "68px"
				})
				_maincontents.css({
					"top": "68px"
				})
				_ejectcontents.css({
					"top": "68px"
				})
				//待删
				_managemaincontents.css({
					"position": "absolute",
					"top": "68px"
				})
				_showmanagcontents.css({
					"position": "absolute",
					"top": "68px"
				})
				_enjoycontent.css({
					"position": "absolute",
					"top": "68px"
				})
				if(screen.height == 812 && screen.width == 375) {
					_header.css({
						"padding-top": "44px",
						"height": "92px"
					})
					_maincontents.css({
						"top": "92px",
						"bottom": "84px"
					})
					_ejectcontents.css({
						"top": "92px"
					})
					_mintactionsheet.css({
						"bottom": "34px"
					})
					_fixedImg.css({
						"bottom": "109px"
					})
					//待删
					_managemaincontents.css({
						"position": "absolute",
						"top": "92px"
					})
					_showmanagcontents.css({
						"position": "absolute",
						"top": "92px"
					})
					_enjoycontent.css({
						"position": "absolute",
						"top": "92px"
					})
				}
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.v-header {
		width: 100%;
		height: 48px;
		line-height: 48px;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 333;
		box-sizing: border-box;
		ul {
			height: 46px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			/*padding: 0 5px;*/
			li {
				height: 46px;
				line-height: 46px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			li:nth-child(2) {
				font-weight: 600;
				font-size: 20px;
				color: #333;
			}
		}
		ul+div {
			height: 2px;
			background: #efefef;
		}
	}
	
	.header-btn {
		min-width: 34px;
	}
	.fa-angle-left{
		position: relative;
		top:3px;
	}
	.fa-ellipsis-v{
		position: relative;
		top:2px;
	}
</style>