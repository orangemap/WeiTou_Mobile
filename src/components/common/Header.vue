<template>
	<div class="v-header">
		<ul>
			<li class="header-btn" >
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
			var _managemaincontents = $(".manage-main-contents")
			var _showmanagcontents = $(".show-content")
			var _enjoycontent = $(".enjoy-content")
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid) {
				_header.css({
					"padding-top": "0px"
				})
			} else if(isiOS) {
				_header.css({
					"padding-top": "20px",
					"height": "68px"
				})
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
					_managemaincontents.css({
						"position": "absolute",
						"top": "92px",
						"bottom": "84px"
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
			line-height: 46px;
			display: flex;
			justify-content: space-between;
			text-align: center;
			li {
				line-height: 46px;
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
	.fa-angle-left{
		position: relative;
		left:15px;
	}
</style>