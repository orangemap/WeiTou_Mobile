<template>
	<div class="navList">
		<div v-for="(item,index) in newOptionList" @click="select(item)">
			<p><span :class="[item.path=='cheng'?'cheng':'',item.path=='lv'?'lv':'']"></span></p>
			<p style="font-size: 14px;">{{item.content}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NavigationBox',
		props: {
			optionList: {
				type: Array,
				default: () => []
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				newOptionList: [],
			}
		},
		watch: {
			show: {
				handler(val) {
					if(val == true) {
						let sum = -50
						let interval = setInterval(() => {
							sum += 1
							$(".navList").css({
								"left": sum + '%'
							})
							if(sum == 0) {
								clearInterval(interval)
							}
						}, 5)
					} else {
						let sum = 0
						let interval = setInterval(() => {
							sum -= 1
							$(".navList").css({
								"left": sum + '%'
							})
							if(sum == -50) {
								clearInterval(interval)
							}
						}, 5)
					}
				},
				deep: true
			},
			optionList: {
				handler(val) {
					this.newOptionList = this.optionList
				},
				deep: true
			}
		},
		mounted() {

		},
		methods: {
			select(item) {
				this.$emit("selected", item)
			},
		},
	}
</script>

<style type="text/css" scoped>
	div ::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	
	.navList {
		width: 50%;
		height: 100%;
		background: #949495;
		position: fixed;
		left: -50%;
		overflow-x: hidden;
		overflow-y: hidden;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 5% 5% 50%;
		font-size: 14px;
		color: #fff;
	}
	
	.navList div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.navList div p:first-child {
		width: 14px;
		height: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #fff;
		border-radius: 50%;
		margin-right: 5%;
	}
	
	.navList div p:first-child span {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: #fff;
		border-radius: 50%;
	}
	
	.navList div p:first-child .cheng {
		background: #FEB101;
	}
	
	.navList div p:first-child .lv {
		background: #17CB0A;
	}
</style>