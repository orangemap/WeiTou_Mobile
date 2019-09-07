<template>
	<div class="switch">
		<p v-for="(item,index) in newOptionList" @click="select(item,index)" :class="switchStyle(item)" :key="index">{{item.text}}</p>
		<input type="text" v-if="showDesc&&type==''" @blur="handleBlur" v-model="otherNum" style="width:65px;" />
		<input type="text" v-if="showDesc&&type=='salary'" @blur="handleBlur" v-model="otherNum"  style="width:65px;" v-filter-amount-of-money/>
		<input type="text" v-if="showDesc&&type=='ratio'" @blur="handleBlur" v-model="otherNum" v-supportNumber style="width:65px;" />
		<span v-show="showDesc&&type=='salary'" style="color:#FEB101;">万元</span>
		<span v-show="showDesc&&type=='ratio'" style="color:#FEB101;">%</span>
	</div>
</template>

<script>
	export default {
		name: 'switchBox',
		props: {
			optionList: {
				type: Array,
				default: () => []
			},
			selectedValue: {},
			disabled: {
				type: Boolean,
				default: true
			},
			desc: {
				type: String,
				default: ''
			},
			index: {
				type: Number,
				default: 0
			},
			type: {
				type: String,
				default: ''
			},
			defaultValue: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				newOptionList: [],
				newSelectedValue: '',
				showDesc: false,
				otherNum: ''
			}
		},
		model: {
			prop: 'selectedValue',
			event: 'selected'
		},
		watch: {
			optionList: {
				handler(val) {
					this.newOptionList = JSON.parse(JSON.stringify(val))
				},
				deep: true
			},
			selectedValue: {
				handler(val) {
					this.newSelectedValue = val
					this.newOptionList.forEach(item => {
						if(item.code == this.newSelectedValue && (item.text == '其他' || item.text == '其它')) {
							this.showDesc = true
							this.otherNum = ''
						} else {
							this.showDesc = false
						}
					})
				},
				deep: true
			},
			desc: {
				handler(val) {
					if(val != '') {
						this.newOptionList.forEach(item => {
							if(item.code == this.newSelectedValue && (item.text == '其他' || item.text == '其它')) {
								this.showDesc = true
								this.otherNum = this.desc
							} else {
								this.showDesc = false
							}
						})
					}
				},
				deep: true
			},
		},
		mounted() {
			this.newOptionList = JSON.parse(JSON.stringify(this.optionList))
			this.newSelectedValue = this.selectedValue
			this.newOptionList.forEach(item => {
				if(item.code == this.newSelectedValue && (item.text == '其他' || item.text == '其它')) {
					this.showDesc = true
					this.otherNum = this.desc
				} else {
					this.showDesc = false
				}
			})
		},
		methods: {
			handleBlur() {
				this.$emit("desc", this.otherNum, this.index)
			},
			switchStyle(item) {
				if(this.newSelectedValue == undefined || this.newSelectedValue == '') {
					if(this.defaultValue != '') {
						this.newSelectedValue = this.defaultValue
						this.$emit("selected", this.defaultValue)
					} else {
						this.newSelectedValue = item.code
						this.$emit("selected", item.code)
					}
				}
				return item.code == this.newSelectedValue ? 'active' : ''
			},
			select(item, index) {
				if(this.disabled) {
					this.newSelectedValue = item.code
					this.$emit("selected", item.code, this.index)
					this.$emit("change", item)
					//this.$emit("selected", this.newOptionList[index].code)
					if(item.text == '其他' || item.text == '其它') {
						this.showDesc = true
					} else {
						this.showDesc = false
						this.otherNum = ''
						this.$emit("desc", this.otherNum, this.index)
					}
				}
			},
		},
	}
</script>

<style type="text/css" scoped>
	.switch {
		display: flex;
		justify-content: flex-start !important;
		flex-wrap: wrap;
	}
	
	.switch p {
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto !important;
		min-width: 60px;
		height: 34px;
		border: 1px solid #ccc;
		border-radius: 2px;
		font-size: 14px;
		color: #ccc;
		margin: 3px 5px 3px 0;
		padding: 0 3px;
	}
	
	.switch .active {
		background: #FEB101;
		color: #fff;
		border-color: transparent;
	}
	
	.switch input {
		border-bottom: 1px solid #ddd;
		line-height: 33px;
		text-align: center;
	}
	
	.sex .switch p {
		margin-right: 18px;
	}
</style>