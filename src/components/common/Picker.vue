<template>
	<div ref="picker" class="picker">
		{{inputvalues}}
		<i class="fa fa-calendar"></i>
	</div>
</template>

<script>
	import '../../../static/lib/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css'
	import '../../../static/lib/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
	export default {
		name: 'picker',
		props: ['value', 'items', 'code', 'text', 'defaultText',"values", "otherDesc"],
		data() {
			return {
				instance: null,
				inputValue: '',
				inputText: '',
                inputvalues: "",
                defaultValues:""
			}
		},
		methods: {
			getInput() {
				this.inputvalues = this.values
			},
			getInputDesc() {
				this.inputvalues = this.otherDesc
			},
			initPicker() {
				const _this = this
				const element = this.$refs.picker
				var selectData = this.value ? [] : [{
					text: '',
					value: ''
				}]
				for(let i in this.items) {
					let option = this.items[i];
					if(typeof option == 'object') {
						selectData.push({
							text: option[this.text || 'text'],
							value: option[this.code || 'value']
						});
					} else {
						selectData.push({
							text: option,
							value: option
						});
					}
				}
				let cancelValue = ''
				var options = {
					theme: 'android-holo-light',
                    lang: 'zh',
                    defaultValue: this.value,
					data: selectData,
					placeholder: _this.defaultText || '请选择',
					circular: (_this.circular == true || _this.circular == 'true') ? true : false,
					headerText: _this.headerText || '请选择',
					buttons: [{
						text: '取消',
						handler: 'cancel',
						icon: 'close'
					}, {
						text: '确定',
						handler: 'set',
						icon: 'checkmark'
					}],
					onInit(event, inst) {
						_this.instance = inst;
						if(_this.value) {
							inst.setVal(_this.value)
						}
					},
					//					onBeforeShow(event,inst){
					//						setTimeout( ()=> {
					//							$('.mbsc-sc-itm-sel').css('color','#ddd');
					//						},333)
					//					},
					onSet(value, inst) {
						_this.inputValue = inst.getVal()
						cancelValue = _this.inputValue
						_this.$emit('beforechange', _this.inputValue)
						_this.$emit('input', _this.inputValue)
						setTimeout(() => {
							_this.$emit('change', _this.inputValue)
						}, 100)
					},
					onCancel(event, inst) {
						//inst.setVal(cancelValue)
					}
				};

				return $(element).mobiscroll().select(options)
			}
		},
		watch: {
			// inputValue(value){
			// 	this.$emit('input',value)
			// },
			otherDesc(val) {
				console.log(val)
			},
			values() {
				this.getInput()
				this.initPicker()
				if(this.values !== undefined) {        
					// $('.item_title_relation .mbsc-control-ev').css("background", "#f0f0f0")
					$('.select-title .mbsc-control-ev').css("background", "#ddd")
					this.$emit("selected")    
				}
			},
			value(val) {
				this.instance.setVal(val)
				if(val === '') {
					this.instance.clear()
				}
			},
			items(val) {
				this.initPicker()
			}
		},
		mounted() {
            this.initPicker()
			$('.select-title .mbsc-control-ev').css("background", "#ddd")
		}
	}
</script>
<style type="text/css">
	.mbsc-control-ev{
		background: transparent;
	}
</style>