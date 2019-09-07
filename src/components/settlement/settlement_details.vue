<template>
	<div class='set-tle'>
		<Headerbtns :title="HeaderText" class='sel-user-head'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" style='color:#FDB92C'></i></div>
		</Headerbtns>
		<div class='detail-children'>
			<div class='sel-tel-title flex'>
				<p v-for='item in TitleList' :class="[item.active?'active':'']" style='font-size: .8rem'>
					{{item.text}}
				</p>
			</div>
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
				TitleList:[
				{key:'1',text:'出险信息',active:true,url:'/settlement_user/0'},
				{key:'2',text:'出险人信息',active:false,url:'/settlement/settlement_details/settlement_policy'},
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
				}
			})
			console.log(this.policyCode)
			this.media.header($('.detail-children'))
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			console.log($('.detail-children').css('margin-top'))
			let num = parseInt($('.detail-children').css('margin-top'))
			console.log(num)
			$('.sel-tel-title').css('top',num-5+'px')
			$('.child').css('margin-top',num+$('.sel-tel-title').outerHeight(true)-5+'px')
		},
		methods:{	
			backUrl() {
				this.TitleList.map( v=> {
					if(v.active){
						console.log(v)
						if(v.key == '1'){
							this.$router.push('/settlement_user/0')
						}else if(v.key == '2'){
							this.$router.push('/settlement_details/settlement_policy/'+this.policyCode)
						}else if (v.key == '3'){
							this.$router.push('/settlement_details/settlement_user/'+this.policyCode)
						}else if (v.key == '4'){
							this.$router.push('/settlement_details/settlement_upload/'+this.newPolicyType)
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
.set-tle .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.set-tle .sel-tel-title{
	margin-top:5px;
	border-bottom:2px solid #F1F1F1;
	position:fixed;
	width:100%;
	background: #fff;
	top:-5px;
	z-index: 100;
}
.set-tle .sel-tel-title>p{
	width: 25%;
	height:2rem;
	line-height: 2rem;
	text-align: center;
	font-size:.9rem;
	border-right:2px dotted #E5E5E5;
	box-sizing: border-box;
	margin:.5rem 0;
}
.set-tle .sel-tel-title>p:last-child{
	border:none;
}
</style>