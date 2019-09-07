<template>
	<div class='code-picker'>
		<div @click='dateShow=true' v-if='TextType === true'>{{codes.accidentprovince + codes.accidentcity + codes.accidentcounty}}</div>
		<div @click='dateShow=true'  v-if='TextType === false' style='color: #666;margin-right:5px;'>
			请选择
		</div>
		<mt-popup v-model="dateShow" position="bottom">
			<div class='pieker-title'>请选择</div>
			<mt-picker :slots="slots" value-key="name" @change="onValuesChange">
			</mt-picker>
			<div class='pieker-footer'>
				<button @click='closePicker(1)'>取消</button>
				<button @click='closePicker(2)'>确定</button>
			</div>
		</mt-popup>
	</div>
</template>
<script>
  	import myaddress from '@/../static/dict/pre_code.json'//引入省市区数据
  	export default {
  		props:{
         codes:{
            type:Object,
            default:{
               accidentprovince:'',
               accidentcity:'',
               accidentcounty:''
            }
         }
      },
      data () {
         return {
            dateShow:false,
            codeList:[],
            slots: [
            {
               flex: 1,
               values: myaddress,
               className: 'slot1',
               textAlign: 'center'
            }, {
               divider: true,
               content: '-',
               className: 'slot2'
            }, {
               flex: 1,
               values: myaddress[0].children,
               className: 'slot3',
               textAlign: 'center'
            }, {
               divider: true,
               content: '-',
               className: 'slot4'
            }, {
               flex: 1,
               values: myaddress[0].children[0].children,
               className: 'slot5',
               textAlign: 'center'
            }],
            TextType:this.$attrs.dft
         }
      },
      mounted(){
       console.log(this.TextType)
       console.log(this.codes)
    },
    watch:{
      dateShow(old){
         console.log(old)
         if(old){
            myaddress.forEach( (item,index) =>{
               if(item.name == this.codes.accidentprovince){
                  this.slots[0].defaultIndex = parseInt(index)
                  this.slots[2].values = item.children
                  console.log(this.slots[2].values)
                  this.slots[2].values.forEach( (item,index) => {
                     if(item.name == this.codes.accidentcity){
                        this.slots[2].defaultIndex = parseInt(index)
                        this.slots[4].values = item.children
                     }
                  })
                  this.slots[4].values.forEach( (item,index) => {
                     if(item.name == this.codes.accidentcounty){
                        this.slots[4].defaultIndex = parseInt(index)
                     }
                  })
               }
            })
            this.$set(this.slots)
         }
      }
   },
   methods: {
      closePicker(id) {
         this.dateShow = false
         this.$emit('ChildMsg',this.codes)
         this.TextType = true
         console.log(this.TextType)
      },
      onValuesChange (picker, values) {
         this._props.codes.accidentprovince = values[0].name
         this._props.codes.accidentcity = values[1].name
         this._props.codes.accidentcounty = values[2].name
         if (!values[0]) {
          this.$nextTick(() => {
           if (this.myAdress) {
			            // 赋默认值
			         } else {
			         	picker.setValues([myaddress[0], myaddress[0].children[0], myaddress[0].children[0].children[0]])
			         }
			      })
       } else {
          picker.setSlotValues(1, values[0].children)
          let town = []
          if (values[1]) {
           town = values[1].children
        }
        picker.setSlotValues(2, town)
     }
  }
}
}
</script>
<style>
.code-picker .picker-items,
.code-picker .mint-popup-bottom{
   width:100%;
}
.code-picker>div{
 font-size:.7rem;
}
.code-picker .picker-items>div:nth-child(1),
.code-picker .picker-items>div:nth-child(3),
.code-picker .picker-items>div:nth-child(5){
   width:30%;
}
.code-picker .picker-items>div:nth-child(1)>div,
.code-picker .picker-items>div:nth-child(1) .picker-slot-wrapper,
.code-picker .picker-items>div:nth-child(3)>div,
.code-picker .picker-items>div:nth-child(3) .picker-slot-wrapper,
.code-picker .picker-items>div:nth-child(5)>div,
.code-picker .picker-items>div:nth-child(5) .picker-slot-wrapper{
   width:100%;
}
.code-picker .picker-item{
   font-size:.9rem;
   padding:0 5px;
}
.code-picker .pieker-title{
   width:100%;
   background: #feb101;
   color: #fff;
   text-align: center;
   height:2rem;
   line-height: 2rem;
   font-size:1rem;
}
.code-picker  .pieker-footer{
   width:100%;
   display: flex;
   border-top:1px solid #ccc;
}
.code-picker  .pieker-footer>button{
   width:50%;
   box-sizing: border-box;
   height:2rem;
   border:none;
   background:#fff;
}
.code-picker  .pieker-footer>button:first-child{
   border-right: 1px solid #ccc;
}
</style>