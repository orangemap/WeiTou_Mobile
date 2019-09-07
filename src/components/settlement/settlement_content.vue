<template>
	<div class='set-tle'>
		<Headerbtns :title="HeaderText" class='sel-user-head' v-show='headerShow'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" ></i></div>
		</Headerbtns>
		<div class='detail-children'>
			<div class='child'>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	export default {
		components:{Headerbtns},
		data() {
			return {
				HeaderText:'出险信息',
				sheetVisible:false,//默认不弹框
				headerShow:true,
				TitleList:[
				{key:'1',text:'出险信息',active:true,url:'/settlement_user/1'},
				{key:'2',text:'出险人信息',active:false,url:'/settlement/settlement_content/settlement_policy'},
				{key:'3',text:'资料上传',active:false,url:'/settlement/settlement_user'},
				{key:'4',text:'信息确认',active:false,url:'/settlement/settlement_upload'},
				]
			}
		},
		computed: {
			...mapState(['policyState','policyCode','newPolicyType'])
		},store,
		watch:{
			policyState(old){
				if(old){
					this.TitleList.map( v=>{
						v.active = false
						if(old == v.key){
							v.active = true
							this.HeaderText = v.text
							if(old == '4'){
								this.headerShow = false
							}else{
								this.headerShow = true
							}
						}
					})
				}
			}
		},
		mounted(){
			this.TitleList.map( v=>{
				v.active = false
				if(this.policyState == v.key){
					v.active = true
					this.HeaderText = v.text
					if(v.key == '4'){
						this.headerShow = false
					}else{
						this.headerShow = true
					}
				}
			})
			console.log(this.policyCode)
			this.media.header($('.detail-children'))
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			console.log($('.sel-user-head').outerHeight(true))
		},
		methods:{	
			backUrl() {
				this.TitleList.map( v=> {
					if(v.active){
						console.log(v)
						if(v.key == '1'){
							this.headerShow = true
							this.$router.push('/settlement_user/1')
						}else if(v.key == '2'){
							this.headerShow = true
							this.$router.push('/settlement_content/settlement_policy/start/'+this.policyCode)
						}else if (v.key == '3'){
							this.headerShow = true
							this.$router.push('/settlement_content/settlement_user/'+this.policyCode)
						}else if (v.key == '4'){
							this.headerShow = false
							this.$router.push('/settlement_content/settlement_upload/'+this.newPolicyType)
						}
					}
				})
			}
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}	
</script>

<style>
.set-tle .active{
	color:#feb101;
}
.fa{
	color:#feb101;
}
.set-tle .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sel-tel-title{
	height:40px;
	border-bottom:2px solid #F1F1F1;
	position:fixed;
	width:100%!important;
	background: #fff;
	top:-5px;
	z-index: 100;
	box-sizing: border-box;
}
.sel-tel-title>p{
	width: 25%;
	height:2rem;
	line-height: 2rem;
	text-align: center;
	font-size:.9rem;
	border-right:2px dotted #E5E5E5;
	box-sizing: border-box;
	margin:.5rem 0;
}
.sel-tel-title>p:last-child{
	border:none;
}
</style>