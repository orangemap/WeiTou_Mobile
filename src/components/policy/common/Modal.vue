<template>
	<div v-show="show">
		<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2039;">
			<div class="mint-msgbox">
				<div class="mint-msgbox-header">
					<div class="mint-msgbox-title">{{title}}</div>
				</div>
				<div class="mint-msgbox-content">
					<div class="mint-msgbox-message">
						{{content}}</div>
					<div class="mint-msgbox-input" style="display: none;">
						<input placeholder="" type="text">
						<div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
					</div>
				</div>
				<div class="mint-msgbox-btns">
					<button class="mint-msgbox-btn mint-msgbox-confirm" @click="handleClick">是</button>
					<button class="mint-msgbox-btn mint-msgbox-cancel" @click="cancelClick">否</button>
				</div>
			</div>
		</div>
		<div class="v-modal" style="z-index: 2000;"></div>
	</div>
</template>
<script>
	export default {
		name: "Modal",
		props: {
			title: {
				type: String,
				default: '提示'
			},
			content: {
				type: String,
				default: '确认执行此操作吗'
			}
		},
		data() {
			return {
				show: false,
			}
		},
		methods: {
			showMOdal() {
				this.show = true
			},
			handleClick() {
				this.show = false
				this.$emit('detonate')
			},
			cancelClick() {
				this.show = false
				this.$emit('cancel')
			}
		}
	}
</script>
<style type="text/css" scoped>
.mint-msgbox-btn{
	font-size: 14px;
}
</style>
