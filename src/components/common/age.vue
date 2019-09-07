<template>
	<div class='data-range'>
		<div @click='dateShow=true'>
			<span :class="dataRange[0]==0 ? 'grun':'black'">{{dataRange[0]==0?'请选择':dataRange[0]}}</span>
			<span>至</span>
			<span :class="dataRange[1]==0 ? 'grun':'black'">{{dataRange[1]==0?'请选择':dataRange[1]}}</span>
		</div>
		<mt-popup v-model="dateShow" position="bottom">
			<div class='pieker-title'>请选择</div>
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			<div class='pieker-footer'>
				<button @click='closePicker()'>取消</button>
				<button @click='getDateMsg()'>确定</button>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	export default {
		name:"gd-age",
		data() {
			return {
				dateShow:false,
				slots: [
				{
					flex: 1,
					values: [],
					className: 'slot1',
					defaultIndex:0,
					textAlign: 'right'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: [],
					className: 'slot3',
					defaultIndex:0,
					textAlign: 'left'
				}
				],
				dataRange:[]
			}
		},
		watch: {
			dateShow(old){
				console.log(old)
				if(old) {
					this.dataRange = [30,30]
					this.slots.map((v,i)=>{
						this.slots[i].defaultIndex = 30
						this.$set(this.slots,i,v)
					})
				}
			}
		},
		created() {
			let values = []
			for(let i=0;i<=100;i++){
				values.push(i)
			}
			this.slots.forEach( v=> {
				v.values = values
			})
			console.log(this.slots)
		},
		mounted() {
			this.defaultData()
		},
		methods: {
			onValuesChange(picker, values) {
//				if (values[0] > values[1]) {
//					picker.setSlotValue(1, values[0]);
//				}
				this.dataRange = values
				this.dateMsg(this.dataRange[0])
				this.dateMsg(this.dataRange[1])
			},
			getDateMsg() {
				this.dateShow = false
				console.log(this.dataRange)
				this.$emit('getChildAge',this.dataRange)
			},
			closePicker() {
				this.dateShow = false
				this.dataRange[0]=''
				this.dataRange[1]=''
			},
			dateMsg(msg) {
				this.slots.forEach( item=>{
					item.values.forEach( (tpl,index) => {
						if(msg == tpl){
							item.defaultIndex = index
						}
					})
				})
			},
			defaultData(){
				
			}
		}
	}
</script>
<style>
.data-range .mint-popup-bottom{
	width:100%;
	padding:0 1rem;
}
.grun{
	color: #999;
	font-size: 14px;
}
.black{
	color: #000;
	font-size: 14px;
}
.data-range  .picker-item{
	font-size:.9rem;
}
.data-range  .pieker-title{
	width:100%;
	background: #feb101;
	color: #fff;
	text-align: center;
	height:2rem;
	line-height: 2rem;
	font-size:1rem;
}
.data-range  .pieker-footer{
	width:100%;
	display: flex;
	border-top:1px solid #ccc;
}
.data-range  .pieker-footer>button{
	width:50%;
	box-sizing: border-box;
	height:2rem;
	border:none;
	background:#fff;
}
.data-range  .pieker-footer>button:first-child{
	border-right: 1px solid #ccc;
}
</style>