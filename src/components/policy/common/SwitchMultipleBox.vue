<template>
	<div class="switch">
		<p v-for="(item,index) in newOptionList" @click="select(item,index)" :class="switchStyle(item)" :key="index">{{item.text}}</p>
		<input type="text" v-show="showDesc" v-model="newDesc" @blur="handleBlur" maxlength="10" />
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
			desc: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				newOptionList: [],
				newSelectedValue: '',
				showDesc: false,
				newDesc: ''
			}
		},
		model: {
			prop: 'selectedValue',
			event: 'selected'
		},
		watch: {
			selectedValue: {
				handler(val) {
					if(typeof(val) == 'string') {
						val = val.split(',')
					}
					this.newSelectedValue = val
					if(this.newSelectedValue != undefined && this.newSelectedValue != '') {
						this.newSelectedValue.forEach(selItem => {
							this.newOptionList.forEach(optItem => {
								if(selItem == optItem.code) {
									optItem.checked = true
									if(optItem.text == '其他方式' || optItem.text == '其他') {
										this.showDesc = true
									}
								}
							})
						})
					}
				},
				deep: true
			},
			optionList: {
				handler(val) {
					this.newOptionList = JSON.parse(JSON.stringify(val))
				},
				deep: true
			},
			desc: {
				handler(val) {
					this.newDesc = this.desc
				},
				deep: true
			},
		},
		mounted() {
			this.newOptionList = JSON.parse(JSON.stringify(this.optionList))
			this.newDesc = this.desc
			if(typeof(this.selectedValue) == 'string') {
				this.newSelectedValue = this.selectedValue.split(',')
			} else if(this.selectedValue instanceof Array) {
				this.newSelectedValue = this.selectedValue
			}
			if(this.newSelectedValue != undefined && this.newSelectedValue != '') {
				this.newSelectedValue.forEach(selItem => {
					this.newOptionList.forEach(optItem => {
						if(selItem == optItem.code) {
							optItem.checked = true
						}
					})
				})
			}
		},
		methods: {
			handleBlur() {
				this.$emit("desc", this.newDesc)
			},
			switchStyle(item) {
				if(this.newSelectedValue != undefined && this.newSelectedValue != '') {
					this.newSelectedValue.forEach(selItem => {
						this.newOptionList.forEach(optItem => {
							if(selItem == optItem.code) {
								optItem.checked = true
							}
						})
					})
					this.$emit("selected", this.newSelectedValue)
				}
				return item.checked ? 'active' : ''
			},
			select(item, index) {
				item.checked = !item.checked
				let arr = []
				this.newOptionList.forEach(item => {
					if(item.checked) {
						arr.push(item.code)
					}
					if(item.text == '其他方式' || item.text == '其他') {
						if(item.checked) {
							this.showDesc = true
						} else {
							this.showDesc = false
							this.newDesc = ''
							this.$emit("desc", this.newDesc)
						}
					}
				})
				this.newSelectedValue = arr
				this.$emit("selected", arr)
				this.$emit("change", item)
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
		min-width: 65px;
		height: 33px;
		border: 1px solid #ccc;
		border-radius: 3px;
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
		width: 85px;
		height: 35px;
		border-bottom: 1px solid #000;
		padding: 0 2px;
		text-align: center;
	}
</style>