<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="details">
			<div>
				<div>
					<div class="insurentInformation" v-if="policyData.insurent.length!=0">
						<ul>
							<li class="flex">
								<div>
									被保人信息
								</div>
								<!--<div>
									<img src="../../../static/img/preservation/36.png" alt="" style="width: 17px;height: 17px;" @click="goToInsurent(items.id)" />
								</div>-->
							</li>
						</ul>
					</div>
					<div class="info" v-for="items in policyData.insurent">
						<ul>
							<li class="flex">
								<div>
									{{items.insuName}}
								</div>
								<div>
									{{items.insuSex == "0"?"男":"女"}}
								</div>
								<div>
									证件有效期：
									<span :class="[items.aa==true?'gray':' ']">{{items.insuIDExpDate}}</span>
								</div>
								<div>
									<img src="../../../static/img/preservation/36.png" alt="" style="width: 15px;height: 15px;" @click="goToInsurent(items.id,items.insuIDType)" />
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div v-show="isShow">
					<div class="insurentInformation">
						<ul>
							<li class="flex">
								<div>
									投保人信息
								</div>
								<!--<div>
									<img src="../../../static/img/preservation/36.png" alt="" style="width: 17px;height: 17px;" @click="goToHolder()" />
								</div>-->
							</li>
						</ul>
					</div>
					<div class="info">
						<ul>
							<li class="flex">
								<div>
									{{policyData.holder.appntName}}
								</div>
								<div>
									{{policyData.holder.appntSex == "0"?"男":"女"}}
								</div>
								<div>
									证件有效期：
									<span :class="[holder?'yellow':'gray']">{{policyData.holder.appntIDExpDate}}</span>
								</div>
								<div>
									<img src="../../../static/img/preservation/36.png" alt="" style="width: 15px;height: 15px;" @click="goToHolder()" />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div>
				<div class="insurentInformation" v-if="policyData.bnfList.length!=0">
					<ul>
						<li class="flex">
							<div>
								受益人信息
							</div>
							<!--<div>
								<img src="../../../static/img/preservation/36.png" alt="" style="width: 17px;height: 17px;" @click="goToBnf(item.id)" />
							</div>-->
						</li>
					</ul>
				</div>
				<div class="info" v-for="item in policyData.bnfList">
					<ul>
						<li class="flex">
							<div>
								{{item.bnfName}}
							</div>
							<div>
								{{item.bnfSex == "0"?"男":"女"}}
							</div>
							<div>
								证件有效期：
								<span :class="[item.aa==true?'gray':' ']">{{item.iDExpDate}}</span>
							</div>
							<div>
								<img src="../../../static/img/preservation/36.png" alt="" style="width: 15px;height: 15px;" @click="goToBnf(item.id,item.bnfIDType)" />
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import Alert from '@/components/policy/common/alert'
	export default {
		name: 'preservationPolicyOverChange',
		components: {
			Headerbtns,Alert
		},
		data() {
			return {
				page_title: '证件有效期变更',
				id: '',
				holderDate: '',
				insurentDate: '',
				holderName: '',
				holderSex: '',
				insurentName: '',
				insurentSex: '',
				holder: true,
				insurentDate: '',
				holderDate: '',
				currentdate: '',
				isShow:true,
			}
		},
		computed: {
			...mapState(['policyData', 'perData']),
		},
		store,
		mounted() {
			this.SetpolicyCode({
				code: '',
				email: '',
				front: '',
				backed: '',
				cerCard: '',
				endDate: '',
				startDate: '',
				frontImg: '',
				backImg: '',
			})
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			console.log(this.policyData)
			this.holderDate = new Date(Date.parse(this.policyData.holder.appntIDExpDate.replace(/-/g, '/')))
			this.currentdate = new Date()
			if(this.holderDate < this.currentdate) {
				this.holder = false
			}
			for(let i=0;i<this.policyData.insurent.length;i++){
				if(this.policyData.insurent[i].insuName==this.policyData.holder.appntName){
					this.isShow=false
					console.log(this.isShow)
				}
			}
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			...mapMutations(['SetpolicyData', 'SetpolicyCode']),
			showModals(message) {
		        this.$refs.showalert.showMOdal(message)
		      },
			left() {
				this.detailBack()
			},
			detailBack() {
				this.SetpolicyData(this.policyData)
				this.go('/preservation/preservationPolicyDetail')
			},
			goToInsurent(id,type) {
				this.id = id
				this.SetpolicyData(this.policyData)
				if(type!='11'){
					this.showModals("证件类型非身份证，请到官微或拨打客服热线95348进行信息变更。")
				}else{
					this.go('/preservation/preservationPolicyInsurentChange?id=' + this.id)
				}
			},
			goToBnf(id,type) {
				this.id = id
				this.SetpolicyData(this.policyData)
				if(type!='11'){
					this.showModals("证件类型非身份证，请到官微或拨打客服热线95348进行信息变更。")
				}else{
					this.go('/preservation/preservationPolicybnfChange?id=' + this.id)
				}
			},
			goToHolder() {
				this.SetpolicyData(this.policyData)
				this.go('/preservation/preservationPolicyHolderChange')
			}
		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.fa {
		color: #FDB92C;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	
	.details {
		font-size: 0.8rem;
	}
	
	.details .insurentInformation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #F8F8F8;
		text-align: left;
		color: #FEB101;
		padding: 0.2rem 0;
		font-size: 0.85rem;
		ul {
			margin: auto;
			width: 95%;
		}
	}
	
	.details .info {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #fff;
		border-top: 1px solid #A9A9A9;
		border-bottom: 1px solid #A9A9A9;
		ul {
			margin: auto;
			width: 95%;
		}
	}
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	
	.details .yellow {
		color: #000
	}
	
	.details .gray {
		color: red !important;
		font-weight: bold;
	}
	.details::-webkit-scrollbar {
	display:none
}
</style>