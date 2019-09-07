<template>
	<div>
		<Headerbtns title="影像资料上传">
			<div slot="left" @click="back()">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
			<div class="main-contents-right">
				<div class="part">
					<!--<p>请上传{{policy.custInfo.appnt.appntName}}{{policy.custInfo.appnt.idType|getIdType}}证明材料</p>-->
					<p>投保人身份证明</p>
					<div class="content">
						<div v-for="(item,index) in imagesList.appnt.imgs" @click="showProup('appnt',index)">
							<img :src="item.reaPath" v-show="item.reaPath!=''" />
							<span v-show="!imagesList.appnt.isOCR && item.reaPath!=''" @click.stop="detaildImgs('appnt',index)">X</span>
						</div>
						<div v-show="!imagesList.appnt.isCount && imagesList.appnt.imgs[imagesList.appnt.imgs.length-1].reaPath!=''" @click="showProup('appnt',imagesList.appnt.imgs.length)"></div>
					</div>
				</div>
				<div class="part" v-show="policy.custInfo.insurants.firstInsurant.relToApp != '00'">
					<!--<p>请上传{{policy.custInfo.insurants.firstInsurant.name}}{{policy.custInfo.insurants.firstInsurant.idType|getIdType}}证明材料</p>-->
					<p><span v-show="policy.custInfo.insurants.otherInsurant.insurant.length>0">第一</span>被保人{{policy.custInfo.insurants.firstInsurant.name}}身份证明</p>
					<div class="content">
						<div v-for="(item,index) in imagesList.firstInsurant.imgs" @click="showProup('filsrInsurant',index)">
							<img :src="item.reaPath" v-show="item.reaPath!=''" />
							<span v-show="!imagesList.firstInsurant.isOCR && item.reaPath!=''" @click.stop="detaildImgs('filsrInsurant',index)">X</span>
						</div>
						<div v-show="!imagesList.firstInsurant.isCount && imagesList.firstInsurant.imgs[imagesList.firstInsurant.imgs.length-1].reaPath!=''" @click="showProup('filsrInsurant',imagesList.firstInsurant.imgs.length)"></div>
					</div>
				</div>
				<div class="part" v-show="showFirstInsurantBnf && bnf.isShow" v-for="(bnf,bnfIndex) in imagesList.firstInsurantBnf">
					<!--<p>请上传{{bnf.name}}{{bnf.idType|getIdType}}证明材料</p>-->
					<p>受益人{{bnf.name}}身份证明</p>
					<div class="content">
						<div v-for="(bnfImg,bnfImgIndex) in bnf.imgs" @click="showProup('firstInsurantBnf',bnfIndex,bnfImgIndex)">
							<img :src="bnfImg.reaPath" v-show="bnfImg.reaPath!=''" />
							<span v-show="!imagesList.firstInsurantBnf[bnfIndex].isOCR && bnfImg.reaPath!=''" @click.stop="detaildImgs('firstInsurantBnf',bnfIndex,bnfImgIndex)">X</span>
						</div>
						<div v-show="!imagesList.firstInsurantBnf[bnfIndex].isCount && imagesList.firstInsurantBnf[bnfIndex].imgs[imagesList.firstInsurantBnf[bnfIndex].imgs.length-1].reaPath!=''" @click="showProup('firstInsurantBnf',bnfIndex,imagesList.firstInsurantBnf[bnfIndex].imgs.length)"></div>
					</div>
				</div>
				<div class="part" v-show="showOtherInsurant && ins.isShow" v-for="(ins,insIndex) in imagesList.otherInsurant">
					<!--<p>请上传{{ins.name}}{{ins.idType|getIdType}}证明材料</p>-->
					<p>第{{ins.seqNumber|getInsNo}}被保人{{ins.name}}身份证明</p>
					<div class="content">
						<div v-for="(insImg,insImgIndex) in ins.imgs" @click="showProup('otherInsurant',insIndex,insImgIndex)">
							<img :src="insImg.reaPath" v-show="insImg.reaPath!=''" />
							<span v-show="!imagesList.otherInsurant[insIndex].isOCR && insImg.reaPath!=''" @click.stop="detaildImgs('otherInsurant',insIndex,insImgIndex)">X</span>
						</div>
						<div v-show="!imagesList.otherInsurant[insIndex].isCount && imagesList.otherInsurant[insIndex].imgs[imagesList.otherInsurant[insIndex].imgs.length-1].reaPath!=''" @click="showProup('otherInsurant',insIndex,imagesList.otherInsurant[insIndex].imgs.length)"></div>
					</div>
					<div v-show="ins.showOtherBnf && bnf.isShow" v-for="(bnf,bnfIndex) in ins.otherBnf" style="padding:0;">
						<!--<p>请上传{{bnf.name}}{{bnf.idType|getIdType}}证明材料</p>-->
						<p>受益人{{bnf.name}}身份证明</p>
						<div class="content">
							<div v-for="(bnfImg,bnfImgIndex) in bnf.imgs" @click="showProup('otherInsurantBnf',insIndex,bnfIndex,bnfImgIndex)">
								<img :src="bnfImg.reaPath" v-show="bnfImg.reaPath!=''" />
								<span v-show="!imagesList.otherInsurant[insIndex].otherBnf[bnfIndex].isOCR && bnfImg.reaPath!=''" @click.stop="detaildImgs('otherInsurantBnf',insIndex,bnfIndex,bnfImgIndex)">X</span>
							</div>
							<div v-show="!imagesList.otherInsurant[insIndex].otherBnf[bnfIndex].isCount && imagesList.otherInsurant[insIndex].otherBnf[bnfIndex].imgs[imagesList.otherInsurant[insIndex].otherBnf[bnfIndex].imgs.length-1].reaPath!=''" @click="showProup('otherInsurantBnf',insIndex,bnfIndex,imagesList.otherInsurant[insIndex].otherBnf[bnfIndex].imgs.length)"></div>
						</div>
					</div>
				</div>
				<div class="part">
					<p>银行卡</p>
					<div class="content">
						<div v-for="(item,index) in imagesList.bankImages" @click="showProup('bank',index)">
							<img :src="item.reaPath" v-show="item.reaPath!=''" />
							<span v-show="item.reaPath!=''" @click.stop="detaildImgs('bank',index)">X</span>
						</div>
						<div v-show="imagesList.bankImages[imagesList.bankImages.length-1].reaPath!=''" @click="showProup('bank',imagesList.bankImages.length)"></div>
					</div>
				</div>
				<div class="part">
					<p>其他证明资料（如有）</p>
					<div class="content">
						<div v-for="(item,index) in imagesList.otherImages" @click="showProup('other',index)">
							<img :src="item.reaPath" v-show="item.reaPath!=''" />
							<span v-show="item.reaPath!=''" @click.stop="detaildImgs('other',index)">X</span>
						</div>
						<div v-show="imagesList.otherImages[imagesList.otherImages.length-1].reaPath!=''" @click="showProup('other',imagesList.otherImages.length)"></div>
					</div>
				</div>
			</div>
			<mt-popup position="center" class="newPopup" v-model="choose.show">
				<button @click="getNewPhotos()">从相册选择</button>
				<hr>
				<button @click="capturePhoto()">拍照</button>
			</mt-popup>
		</div>
    	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<FooterBar>
			<div slot="center" v-preventReClick="5000" @click.prevent="checkData($event)">提交</div>
		</FooterBar>
	</div>
</template>
<script>
	import Vue from "vue";
	import { Indicator } from 'mint-ui';
	import { MessageBox } from "mint-ui";
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import cardTypeList from "../../assets/dict/card_type_sunlife.json";
	import index from "vue";
	import '../policy/css/base.css'
	export default {
		name: "videoUpload",
		components: {
			Headerbtns,
			FooterBar,
			NavigationBox,
			MessageBox
		},
		data() {
			return {
				showNavList: false,
				navigationList: [],
				policy: {
					custInfo: {
						appnt: {},
						insurants: {
							firstInsurant: {},
							otherInsurant: {
								insCount: '',
								insurant: []
							}
						}
					}
				},
				showFirstInsurantBnf: false,
				showOtherInsurant: false,
				imagesList: {
					appnt: {
						isCount: true, //是否固定张数
						isOCR: false, //OCR识别过，不可修改
						imgs: [{
							fileId: '',
							fileSort: 0,
							reaPath: ''
						}]
					},
					firstInsurant: {
						isCount: true,
						isOCR: false,
						imgs: [{
							fileId: '',
							fileSort: 0,
							reaPath: ''
						}]
					},
					firstInsurantBnf: [],
					otherInsurant: [],
					bankImages: [{
						fileId: '',
						fileSort: 0,
						reaPath: ''
					}],
					otherImages: [{
						fileId: '',
						fileSort: 0,
						reaPath: ''
					}],
				},
				choose: {
					show: false,
					type: '',
					index1: '',
					index2: '',
					index3: '',
				},
				indicator: false, //影像加载框状态
				uploadDataCount: 0, //点击提交图片次数
				isCheckData: false, //点击提交,进行核保请求
			}
		},
		mounted() {
			this.getProduct()
		},
		watch: {
			showNavList(val, oldval) {
				if(val == true) {
					let sum = 0
					let interval = setInterval(() => {
						sum += 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 50) {
							clearInterval(interval)
						}
					}, 5)
				} else {
					let sum = 50
					let interval = setInterval(() => {
						sum -= 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 0) {
							clearInterval(interval)
						}
					}, 5)
				}
			}
		},
		filters: {
			getIdType(code) {
				for(let item of cardTypeList.dict_cardtype.item) {
					if(code == item.code) {
						return item.text
					}
				}
			},
			getInsNo(code) {
				if(code == '-1') {
					return '一'
				} else if(code == '0') {
					return '二'
				} else if(code == '1') {
					return '三'
				} else if(code == '2') {
					return '四'
				} else if(code == '3') {
					return '五'
				} else if(code == '4') {
					return '六'
				}
			}
		},
		methods: {
			selectedNav(item) {
				//console.log('点击导航栏==>>', item)
				if(item.step < 9) {
					if(item.step == 1 || item.step == 3) {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId,
								step: '1'
							}
						})
					} else if(item.step == 4) {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId,
								insNo: item.seqNumber,
								step: '1'
							}
						})
					} else {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId
							}
						})
					}
				}
			},
			getInsText(code) {
				if(code == '-1') {
					return '第一被保人:'
				} else if(code == '0') {
					return '第二被保人:'
				} else if(code == '1') {
					return '第三被保人:'
				} else if(code == '2') {
					return '第四被保人:'
				} else if(code == '3') {
					return '第五被保人:'
				} else if(code == '4') {
					return '第六被保人:'
				}
			},
			showProup(type, index1, index2, index3) {
				console.log('选中照片', type, index1, index2, index3, this.imagesList)
				if(this.indicator == true) {
					return
				}
				if(type == 'appnt') {
					if(this.imagesList.appnt.isOCR) {
						return
					}
					if(index1 == this.imagesList.appnt.imgs.length) {
						this.imagesList.appnt.imgs.push({
							fileId: '',
							fileSort: this.imagesList.appnt.imgs.length,
							reaPath: ''
						})
					}
				} else if(type == 'filsrInsurant') {
					if(this.imagesList.firstInsurant.isOCR) {
						return
					}
					if(index1 == this.imagesList.firstInsurant.imgs.length) {
						this.imagesList.firstInsurant.imgs.push({
							fileId: '',
							fileSort: this.imagesList.firstInsurant.imgs.length,
							reaPath: ''
						})
					}
				} else if(type == 'firstInsurantBnf') {
					if(this.imagesList.firstInsurantBnf[index1].isOCR) {
						return
					}
					if(index2 == this.imagesList.firstInsurantBnf[index1].imgs.length) {
						this.imagesList.firstInsurantBnf[index1].imgs.push({
							fileId: '',
							fileSort: this.imagesList.firstInsurantBnf[index1].imgs.length,
							reaPath: ''
						})
					}
				} else if(type == 'otherInsurant') {
					if(this.imagesList.otherInsurant[index1].isOCR) {
						return
					}
					if(index2 == this.imagesList.otherInsurant[index1].imgs.length) {
						this.imagesList.otherInsurant[index1].imgs.push({
							fileId: '',
							fileSort: this.imagesList.otherInsurant[index1].imgs.length,
							reaPath: ''
						})
					}
				} else if(type == 'otherInsurantBnf') {
					if(this.imagesList.otherInsurant[index1].otherBnf[index2].isOCR) {
						return
					}
					if(index3 == this.imagesList.otherInsurant[index1].otherBnf[index2].imgs.length) {
						this.imagesList.otherInsurant[index1].otherBnf[index2].imgs.push({
							fileId: '',
							fileSort: this.imagesList.otherInsurant[index1].otherBnf[index2].imgs.length,
							reaPath: ''
						})
					}
				} else if(type == 'bank') {
					if(index1 == this.imagesList.bankImages.length) {
						this.imagesList.bankImages.push({
							fileId: '',
							fileSort: this.imagesList.bankImages.length,
							reaPath: ''
						})
					}
				} else if(type == 'other') {
					if(index1 == this.imagesList.otherImages.length) {
						this.imagesList.otherImages.push({
							fileId: '',
							fileSort: this.imagesList.otherImages.length,
							reaPath: ''
						})
					}
				}
				this.choose.show = true
				this.choose.type = type
				this.choose.index1 = index1
				this.choose.index2 = index2
				this.choose.index3 = index3
				console.log('choose', this.choose)
			},
			//本地相册上传
			getNewPhotos() {
				this.choose.show = false
				Indicator.open('正在加载影像...')
				this.indicator = true
				try {
					getNewPhoto(
						pictureSource.SAVEDPHOTOALBUM,
						imageData => {
							Indicator.close()
							this.indicator = false
							if(this.choose.type == 'appnt') {
								let imageList = [{
									imageType: '1010',
									imageName: '投保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'filsrInsurant') {
								let imageList = [{
									imageType: '1020',
									imageName: '被保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.firstInsurant.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'firstInsurantBnf') {
								let imageList = [{
									imageType: '1030',
									imageName: '受益人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[this.choose.index1].id,
									insurtId: this.policy.custInfo.insurants.firstInsurant.id,
									fileSort: this.choose.index2
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'otherInsurant') {
								let imageList = [{
									imageType: '1020',
									imageName: '被保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].id,
									fileSort: this.choose.index2
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'otherInsurantBnf') {
								let imageList = [{
									imageType: '1030',
									imageName: '受益人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].bnfInfo.beneficiaries.beneficiary[this.choose.index2].id,
									insurtId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].id,
									fileSort: this.choose.index3
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'bank') {
								let imageList = [{
									imageType: '1050',
									imageName: '银行卡证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'other') {
								let imageList = [{
									imageType: '1060',
									imageName: '其他证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							}
						},
						message => {
							Indicator.close()
							this.indicator = false
						}
					)
				} catch(err) {
					Indicator.close()
					this.indicator = false
				}
			},
			//拍照上传
			capturePhoto() {
				this.choose.show = false
				Indicator.open('正在加载影像...')
				this.indicator = true
				try {
					capturePhotoCallback2(
						imageData => {
							Indicator.close()
							this.indicator = false
							if(this.choose.type == 'appnt') {
								let imageList = [{
									imageType: '1010',
									imageName: '投保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'filsrInsurant') {
								let imageList = [{
									imageType: '1020',
									imageName: '被保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.firstInsurant.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'firstInsurantBnf') {
								let imageList = [{
									imageType: '1030',
									imageName: '受益人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[this.choose.index1].id,
									insurtId: this.policy.custInfo.insurants.firstInsurant.id,
									fileSort: this.choose.index2
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'otherInsurant') {
								let imageList = [{
									imageType: '1020',
									imageName: '被保人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].id,
									fileSort: this.choose.index2
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'otherInsurantBnf') {
								let imageList = [{
									imageType: '1030',
									imageName: '受益人证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].bnfInfo.beneficiaries.beneficiary[this.choose.index2].id,
									insurtId: this.policy.custInfo.insurants.otherInsurant.insurant[this.choose.index1].id,
									fileSort: this.choose.index3
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'bank') {
								let imageList = [{
									imageType: '1050',
									imageName: '银行卡证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							} else if(this.choose.type == 'other') {
								let imageList = [{
									imageType: '1060',
									imageName: '其他证件照',
									imageByte: imageData,
									personId: this.policy.custInfo.appnt.id,
									fileSort: this.choose.index1
								}]
								this.getUpload(imageList)
							}
						},
						message => {
							Indicator.close()
							this.indicator = false
						}
					)
				} catch(err) {
					Indicator.close()
					this.indicator = false
				}
			},
			getUpload(imageList, success, fail) {
				let requ = {
					upload: {
						agentCode: utils.cache.get("agentCode"),
						applyCode: this.policy.applyCode,
						deviceNo: 'INSURE',
						imageList: imageList,
						orderId: this.$route.params.planId,
						policyCode: null
					}
				}
				this.uploadDataCount++
					if(this.uploadDataCount == 1) {
						utils.http.post("MOUPLOAD", requ).then(response => {
							console.log('上传影像====>', response)
							if(response.data.header.responseCode == '0') {
								this.uploadDataCount = 0
								if(response.data.response.resultCode == '0') {
									if(imageList[0].imageType == '1010') {
										this.imagesList.appnt.imgs[this.choose.index1].reaPath = "data:image/png;base64," + imageList[0].imageByte
										this.imagesList.appnt.imgs[this.choose.index1].fileId = response.data.response.fileId
									} else if(imageList[0].imageType == '1020') {
										if(imageList[0].personId == this.policy.custInfo.insurants.firstInsurant.id) {
											this.imagesList.firstInsurant.imgs[this.choose.index1].reaPath = "data:image/png;base64," + imageList[0].imageByte
											this.imagesList.firstInsurant.imgs[this.choose.index1].fileId = response.data.response.fileId
										} else {
											this.imagesList.otherInsurant[this.choose.index1].imgs[this.choose.index2].reaPath = "data:image/png;base64," + imageList[0].imageByte
											this.imagesList.otherInsurant[this.choose.index1].imgs[this.choose.index2].fileId = response.data.response.fileId
										}
									} else if(imageList[0].imageType == '1030') {
										if(imageList[0].insurtId == this.policy.custInfo.insurants.firstInsurant.id) {
											this.imagesList.firstInsurantBnf[this.choose.index1].imgs[this.choose.index2].reaPath = "data:image/png;base64," + imageList[0].imageByte
											this.imagesList.firstInsurantBnf[this.choose.index1].imgs[this.choose.index2].fileId = response.data.response.fileId
										} else {
											this.imagesList.otherInsurant[this.choose.index1].otherBnf[this.choose.index2].imgs[this.choose.index3].reaPath = "data:image/png;base64," + imageList[0].imageByte
											this.imagesList.otherInsurant[this.choose.index1].otherBnf[this.choose.index2].imgs[this.choose.index3].fileId = response.data.response.fileId
										}
									} else if(imageList[0].imageType == '1050') {
										this.imagesList.bankImages[this.choose.index1].reaPath = "data:image/png;base64," + imageList[0].imageByte
										this.imagesList.bankImages[this.choose.index1].fileId = response.data.response.fileId
									} else if(imageList[0].imageType == '1060') {
										this.imagesList.otherImages[this.choose.index1].reaPath = "data:image/png;base64," + imageList[0].imageByte
										this.imagesList.otherImages[this.choose.index1].fileId = response.data.response.fileId
									}
									if(success != undefined) {
										success(200)
									}
								} else {
									if(fail != undefined) {
										fail(401)
									}
								}
							} else {
								this.uploadDataCount = 0
								if(fail != undefined) {
									fail(400)
								}
								alert_n22.alert("提示", "提交失败,请重新提交!", "确定")
							}
						}).catch(error => {
							this.uploadDataCount = 0
							if(fail != undefined) {
								fail(error)
							}
						})
					}
			},
			detaildImgs(type, index1, index2, index3) {
				this.choose.show = false
				console.log('即将删除影像====>', this.imagesList)
				if(type == 'appnt') {
					if(this.imagesList.appnt.isOCR) {
						return
					} else {
						this.choose.show = false
						alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
							let requ = {
								imageFile: {
									agentCode: utils.cache.get("personsal").agentCode,
									orderId: this.$route.params.planId,
									applyCode: this.policy.applyCode,
									fileId: this.imagesList.appnt.imgs[index1].fileId,
									deviceNo: 'INSURE',
									policyCode: ''
								}
							}
							utils.http.postFast('MOIMGDELETE', requ, (body) => {
								if(body.resultCode == '0') {
									this.imagesList.appnt.imgs[index1].reaPath = ''
								} else {
									alert_n22.alert("提示", body.resultMessage, "确定")
								}
							})
						})
					}
				} else if(type == 'filsrInsurant') {
					if(this.imagesList.firstInsurant.isOCR) {
						return
					} else {
						alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
							let requ = {
								imageFile: {
									agentCode: utils.cache.get("personsal").agentCode,
									orderId: this.$route.params.planId,
									applyCode: this.policy.applyCode,
									fileId: this.imagesList.firstInsurant.imgs[index1].fileId,
									deviceNo: 'INSURE',
									policyCode: ''
								}
							}
							utils.http.postFast('MOIMGDELETE', requ, (body) => {
								if(body.resultCode == '0') {
									this.imagesList.firstInsurant.imgs[index1].reaPath = ''
								} else {
									alert_n22.alert("提示", body.resultMessage, "确定")
								}
							})
						})
					}
				} else if(type == 'firstInsurantBnf') {
					if(this.imagesList.firstInsurantBnf[index1].isOCR) {
						return
					} else {
						alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
							let requ = {
								imageFile: {
									agentCode: utils.cache.get("personsal").agentCode,
									orderId: this.$route.params.planId,
									applyCode: this.policy.applyCode,
									fileId: this.imagesList.firstInsurantBnf[index1].imgs[index2].fileId,
									deviceNo: 'INSURE',
									policyCode: ''
								}
							}
							utils.http.postFast('MOIMGDELETE', requ, (body) => {
								if(body.resultCode == '0') {
									this.imagesList.firstInsurantBnf[index1].imgs[index2].reaPath = ''
								} else {
									alert_n22.alert("提示", body.resultMessage, "确定")
								}
							})
						})
					}
				} else if(type == 'otherInsurant') {
					if(this.imagesList.otherInsurant[index1].isOCR) {
						return
					} else {
						alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
							let requ = {
								imageFile: {
									agentCode: utils.cache.get("personsal").agentCode,
									orderId: this.$route.params.planId,
									applyCode: this.policy.applyCode,
									fileId: this.imagesList.otherInsurant[index1].imgs[index2].fileId,
									deviceNo: 'INSURE',
									policyCode: ''
								}
							}
							utils.http.postFast('MOIMGDELETE', requ, (body) => {
								if(body.resultCode == '0') {
									this.imagesList.otherInsurant[index1].imgs[index2].reaPath = ''
								} else {
									alert_n22.alert("提示", body.resultMessage, "确定")
								}
							})
						})
					}
				} else if(type == 'otherInsurantBnf') {
					if(this.imagesList.otherInsurant[index1].otherBnf[index2].isOCR) {
						return
					} else {
						alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
							let requ = {
								imageFile: {
									agentCode: utils.cache.get("personsal").agentCode,
									orderId: this.$route.params.planId,
									applyCode: this.policy.applyCode,
									fileId: this.imagesList.otherInsurant[index1].otherBnf[index2].imgs[index3].fileId,
									deviceNo: 'INSURE',
									policyCode: ''
								}
							}
							utils.http.postFast('MOIMGDELETE', requ, (body) => {
								if(body.resultCode == '0') {
									this.imagesList.otherInsurant[index1].otherBnf[index2].imgs[index3].reaPath = ''
								} else {
									alert_n22.alert("提示", body.resultMessage, "确定")
								}
							})
						})
					}
				} else if(type == 'bank') {
					alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
						let requ = {
							imageFile: {
								agentCode: utils.cache.get("personsal").agentCode,
								orderId: this.$route.params.planId,
								applyCode: this.policy.applyCode,
								fileId: this.imagesList.bankImages[index1].fileId,
								deviceNo: 'INSURE',
								policyCode: ''
							}
						}
						utils.http.postFast('MOIMGDELETE', requ, (body) => {
							if(body.resultCode == '0') {
								this.imagesList.bankImages[index1].reaPath = ''
							} else {
								alert_n22.alert("提示", body.resultMessage, "确定")
							}
						})
					})
				} else if(type == 'other') {
					alert_n22.confirm('提示', '您确定要删除此照片吗?', '确定', '取消', (flag) => {
						let requ = {
							imageFile: {
								agentCode: utils.cache.get("personsal").agentCode,
								orderId: this.$route.params.planId,
								applyCode: this.policy.applyCode,
								fileId: this.imagesList.otherImages[index1].fileId,
								deviceNo: 'INSURE',
								policyCode: ''
							}
						}
						utils.http.postFast('MOIMGDELETE', requ, (body) => {
							if(body.resultCode == '0') {
								this.imagesList.otherImages[index1].reaPath = ''
							} else {
								alert_n22.alert("提示", body.resultMessage, "确定")
							}
						})
					})
				}
			},
			getProduct() {
				let requ = {
					"policy": {
						"substepNo": '',
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2',
						"nothave":'2'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy = JSON.parse(JSON.stringify(body.policy))
					this.navigationList = this.policy.navigationList
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '9') {
							item.path = 'cheng'
						}
						if(item.step == '9') {
							item.path = 'lv'
						}
					})
					for(let i = 0; i < this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length; i++) {
						if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[i].belongWith == '') {
							this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(i--, 1)
						}
					}
					for(let i = 0; i < this.policy.custInfo.insurants.otherInsurant.insurant.length; i++) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant[i].name == '') {
							this.policy.custInfo.insurants.otherInsurant.insurant.splice(i--, 1)
						} else {
							for(let j = 0; j < this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.length; j++) {
								if(this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].belongWith == '') {
									this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.splice(j--, 1)
								}
							}
						}
					}
					console.log('policy===>', this.policy)
					//投保人
					if(this.policy.custInfo.appnt.idType == '11' || this.policy.custInfo.appnt.idType == '17' || this.policy.custInfo.appnt.idType == '30') {
						this.imagesList.appnt.isCount = true
						this.imagesList.appnt.imgs = []
						this.policy.custInfo.appnt.imageData.forEach((appntImg, index) => {
							//if(appntImg.imageName.slice(0, 1) == 1 && (appntImg.imageName.indexOf("Front") != -1 || appntImg.imageName.indexOf("Back") != -1)) {
							if(appntImg.imageName == 'Front' || appntImg.imageName == 'Back') {
								this.imagesList.appnt.imgs.push(appntImg)
								this.imagesList.appnt.isOCR = true
							}
						})
						if(this.imagesList.appnt.imgs.length == 0) {
							this.imagesList.appnt.imgs.push({
								fileId: '',
								fileSort: 0,
								reaPath: ''
							}, {
								fileId: '',
								fileSort: 1,
								reaPath: ''
							})
						}
					} else {
						this.imagesList.appnt.isCount = false
					}
					//主被保人
					if(this.policy.custInfo.insurants.firstInsurant.relToApp != '00') {
						if(this.policy.custInfo.insurants.firstInsurant.idType == '11' || this.policy.custInfo.insurants.firstInsurant.idType == '17' || this.policy.custInfo.insurants.firstInsurant.idType == '30') {
							this.imagesList.firstInsurant.isCount = true
							this.imagesList.firstInsurant.imgs = []
							this.policy.custInfo.insurants.firstInsurant.imageData.forEach((firstInsImg, index) => {
								//if(firstInsImg.imageName.slice(0, 1) == 2 && (firstInsImg.imageName.indexOf("Front") != -1 || firstInsImg.imageName.indexOf("Back") != -1)) {
								if(firstInsImg.imageName == 'Front' || firstInsImg.imageName == 'Back') {
									this.imagesList.firstInsurant.imgs.push(firstInsImg)
									this.imagesList.firstInsurant.isOCR = true
								}
							})
							if(this.imagesList.firstInsurant.imgs.length == 0) {
								this.imagesList.firstInsurant.imgs.push({
									fileId: '',
									fileSort: 0,
									reaPath: ''
								}, {
									fileId: '',
									fileSort: 1,
									reaPath: ''
								})
							}
						} else {
							this.imagesList.firstInsurant.isCount = false
						}
					}
					//主被保人受益人
					if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.bnfType == '1') {
						this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.forEach((firstInsBnf, bnfIndex) => {
							this.imagesList.firstInsurantBnf.push({
								seqNumber: firstInsBnf.seqNumber,
								name: firstInsBnf.bfcyName,
								idType: firstInsBnf.bfcyIdType,
								isShow: false,
								isCount: true,
								isOCR: false,
								imgs: [{
									fileId: '',
									fileSort: 0,
									reaPath: ''
								}]
							})
							if(firstInsBnf.bnfInsurant != '0' && firstInsBnf.bnfHMInsurant != '0') {
								this.showFirstInsurantBnf = true
								this.imagesList.firstInsurantBnf[bnfIndex].isShow = true
								if(firstInsBnf.bfcyIdType == '11' || firstInsBnf.bfcyIdType == '17' || firstInsBnf.bfcyIdType == '30') {
									this.imagesList.firstInsurantBnf[bnfIndex].isCount = true
									this.imagesList.firstInsurantBnf[bnfIndex].imgs = []
									if(firstInsBnf.imageData.length > 0) {
										firstInsBnf.imageData.forEach(firstInsBnfImg => {
											if(firstInsBnfImg.imageName == 'Front' || firstInsBnfImg.imageName == 'Back') {
												this.imagesList.firstInsurantBnf[bnfIndex].imgs.push(firstInsBnfImg)
												this.imagesList.firstInsurantBnf[bnfIndex].isOCR = true
											}
										})
									}
									if(this.imagesList.firstInsurantBnf[bnfIndex].imgs.length == 0) {
										this.imagesList.firstInsurantBnf[bnfIndex].imgs.push({
											fileId: '',
											fileSort: 0,
											reaPath: ''
										}, {
											fileId: '',
											fileSort: 1,
											reaPath: ''
										})
									}
								} else {
									this.imagesList.firstInsurantBnf[bnfIndex].isCount = false
								}
							}
						})
					}
					//其他被保人
					if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.policy.custInfo.insurants.otherInsurant.insurant.forEach((otherIns, InsIndex) => {
							this.imagesList.otherInsurant.push({
								name: otherIns.name,
								seqNumber: otherIns.seqNumber,
								idType: otherIns.idType,
								isShow: false,
								isCount: true,
								isOCR: false,
								imgs: [{
									fileId: '',
									fileSort: 0,
									reaPath: ''
								}],
								showOtherBnf: false,
								otherBnf: []
							})
							if(otherIns.relToApp != '00') {
								this.showOtherInsurant = true
								this.imagesList.otherInsurant[InsIndex].isShow = true
								if(otherIns.idType == '11' || otherIns.idType == '17' || otherIns.idType == '30') {
									this.imagesList.otherInsurant[InsIndex].isCount = true
									this.imagesList.otherInsurant[InsIndex].imgs = []
									otherIns.imageData.forEach(otherInsImg => {
										//if(otherInsImg.imageName.slice(0, 1) == 2 && (otherInsImg.imageName.indexOf("Front") != -1 || otherInsImg.imageName.indexOf("Back") != -1)) {
										if(otherInsImg.imageName == 'Front' || otherInsImg.imageName == 'Back') {
											this.imagesList.otherInsurant[InsIndex].imgs.push(otherInsImg)
											this.imagesList.otherInsurant[InsIndex].isOCR = true
										}
									})
									if(this.imagesList.otherInsurant[InsIndex].imgs.length == 0) {
										this.imagesList.otherInsurant[InsIndex].imgs.push({
											fileId: '',
											fileSort: 0,
											reaPath: ''
										}, {
											fileId: '',
											fileSort: 1,
											reaPath: ''
										})
									}
								} else {
									this.imagesList.otherInsurant[InsIndex].isCount = false
								}
								//其他被保人受益人
								if(otherIns.bnfInfo.bnfType == '1') {
									otherIns.bnfInfo.beneficiaries.beneficiary.forEach((otherInsBnf, bnfIndex) => {
										this.imagesList.otherInsurant[InsIndex].otherBnf.push({
											name: otherInsBnf.bfcyName,
											idType: otherInsBnf.bfcyIdType,
											isShow: false,
											isCount: true,
											isOCR: false,
											imgs: [{
												fileId: '',
												fileSort: 0,
												reaPath: ''
											}]
										})
										if(otherInsBnf.bnfInsurant != '0' && otherInsBnf.bnfHMInsurant != '0') {
											this.imagesList.otherInsurant[InsIndex].showOtherBnf = true
											this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].isShow = true
											if(otherInsBnf.bfcyIdType == '11' || otherInsBnf.bfcyIdType == '17' || otherInsBnf.bfcyIdType == '30') {
												this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].isCount = true
												this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].imgs = []
												if(otherInsBnf.imageData.length > 0) {
													otherInsBnf.imageData.forEach(otherInsBnfImg => {
														if(otherInsBnfImg.imageName == 'Front' || otherInsBnfImg.imageName == 'Back') {
															this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].imgs.push(otherInsBnfImg)
															this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].isOCR = true
														}
													})
												}
												if(this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].imgs.length == 0) {
													this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].imgs.push({
														fileId: '',
														fileSort: 0,
														reaPath: ''
													}, {
														fileId: '',
														fileSort: 1,
														reaPath: ''
													})
												}
											} else {
												this.imagesList.otherInsurant[InsIndex].otherBnf[bnfIndex].isCount = false
											}
										}
									})
								}
							}
						})
					}
					console.log('初始化===>', this.imagesList)
				})
			},
			back() {
				if(this.isCheckData) {
					return
				}
				this.$router.push({
					name: "electronics_policy_page",
					params: {
						planId: this.$route.params.planId
					}
				})
			},
			underwriting() {
				this.isCheckData = true
				let requ = {
					policy: {
						agentCode: utils.cache.get("personsal").agentCode,
						activityid: "0",
						orderCode: this.$route.params.planId,
						applyCode: this.policy.applyCode,
						dzType: this.$route.params.document.dzType,
						dzInfo: this.$route.params.document.dzInfo,
						docTypeInfo: this.$route.params.document.docTypeInfo,
						yesOrNo: utils.cache.get("yesOrNo")
					}
				}
				utils.http.post("MOUNDERWRITE", requ).then(response => {
					console.log('请求核保接口结果===>', response.data.response.policy)
					this.isCheckData = false
					if(response.data.header.responseCode == '0') {
						let policy = response.data.response.policy
						if(policy.resultCode == '0') {
							this.$router.push({
								name: "pay",
								params: {
									orderId: this.$route.params.planId
								}
							})
						} else if(policy.resultCode == '1' && policy.status == '0') {
							this.$router.push({
								name: "humanNucleus",
								query: {
									message:policy.resultMessage
								}
							})
						} else if(policy.resultCode == '100') {
							MessageBox.alert("该问题件已成功提交,请到待办事项查看处理!").then(
								() => {
									this.$router.push("/home")
								}
							)
						} else if(policy.resultCode == '200') {
							//add zhangxin 20181219 产品开放时间移至核保,上线时间同步后台
							//200为产品不在开放时间,直接提示用户
							MessageBox.alert(policy.resultMessage).then(
								() => {
									this.$router.push("/home")
								}
							)
						} else {
							let msg = '投保单号:' + policy.applyCode + "\n" + "保单状态:" + policy.status + "\n" + "错误原因:" + policy.resultMessage
							MessageBox.alert(msg).then(
								() => {
									this.$router.push("/home")
								}
							)
						}
					} else {
						alert_n22.alert("提示", response.data.header.errorMessage, "确定")
					}
				}).catch(error => {
					this.isCheckData = false
					console.log(error)
				})
			},
			checkData(event) {
				if(this.isCheckData) {
					return
				} else {
					console.log('校验开始===>', this.imagesList)
					let isPass = this.checkAppntData()
					console.log('投保人校验结果===>', isPass)
					if(isPass) {
						if(this.policy.custInfo.insurants.firstInsurant.relToApp != '00') {
							isPass = this.checkFirstInsurant()
						}
					}
					console.log('主被保人及受益人校验结果===>', isPass)
					if(isPass) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
							isPass = this.checkOtherInsurant()
						}
					}
					console.log('其他被保人校验结果===>', isPass)
					if(isPass) {
						isPass = this.checkBankData()
					}
					if(isPass) {
						console.log('核保接口===>')
						if(event.target.disabled) {
							alert_n22.alert('提示', '请您5秒后再进行提交', '确定')
							return
						}
						this.underwriting()
					}
				}
			},
			checkAppntData() {
				let isPass = true
				if(this.imagesList.appnt.isOCR == false) {
					let count = 0
					for(let item of this.imagesList.appnt.imgs) {
						if(item.reaPath != '') {
							count++
						}
					}
					if(this.policy.custInfo.appnt.idType == '11' || this.policy.custInfo.appnt.idType == '17' || this.policy.custInfo.appnt.idType == '30') {
						if(count < 2) {
							alert_n22.alert("提示", '投保人:' + this.policy.custInfo.appnt.appntName + ',影像至少需要上传两张', "确定")
							isPass = false
							return
						}
					} else if(count < 1) {
						alert_n22.alert("提示", '投保人:' + this.policy.custInfo.appnt.appntName + ',影像至少需要上传一张', "确定")
						isPass = false
						return
					}
				}
				return isPass
			},
			checkFirstInsurant() {
				let isPass = true
				if(this.imagesList.firstInsurant.isOCR == false) {
					let count = 0
					for(let item of this.imagesList.firstInsurant.imgs) {
						if(item.reaPath != '') {
							count++
						}
					}
					if(this.policy.custInfo.insurants.firstInsurant.idType == '11' || this.policy.custInfo.insurants.firstInsurant.idType == '17' || this.policy.custInfo.insurants.firstInsurant.idType == '30') {
						if(count < 2) {
							if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
								alert_n22.alert("提示", '第一被保人:' + this.policy.custInfo.insurants.firstInsurant.name + ',影像至少需要上传两张', "确定")
								isPass = false
								return
							} else {
								alert_n22.alert("提示", '被保人:' + this.policy.custInfo.insurants.firstInsurant.name + ',影像至少需要上传两张', "确定")
								isPass = false
								return
							}
						}
					} else if(count < 1) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
							alert_n22.alert("提示", '第一被保人:' + this.policy.custInfo.insurants.firstInsurant.name + ',影像至少需要上传一张', "确定")
							isPass = false
							return
						} else {
							alert_n22.alert("提示", '被保人:' + this.policy.custInfo.insurants.firstInsurant.name + ',影像至少需要上传一张', "确定")
							isPass = false
							return
						}
					}
				}
				if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.bnfType == '1') {
					this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.forEach((bnf, bnfIndex) => {
						if(bnf.bnfInsurant != '0' && bnf.bnfHMInsurant != '0' && this.imagesList.firstInsurantBnf[bnfIndex].isOCR == false) {
							let count = 0
							for(let item of this.imagesList.firstInsurantBnf[bnfIndex].imgs) {
								if(item.reaPath != '') {
									count++
								}
							}
							if(bnf.bfcyIdType == '11' || bnf.bfcyIdType == '17' || bnf.bfcyIdType == '30') {
								if(count < 2) {
									alert_n22.alert("提示", '受益人:' + bnf.bfcyName + ',影像至少需要上传两张 ', "确定")
									isPass = false
									return
								}
							} else if(count < 1) {
								alert_n22.alert("提示", '受益人:' + bnf.bfcyName + ',影像至少需要上传一张 ', "确定")
								isPass = false
								return
							}
						}
					})
				}
				return isPass
			},
			checkOtherInsurant() {
				console.log('校验其他被保人===>')
				let isPass = true
				this.policy.custInfo.insurants.otherInsurant.insurant.forEach((otherIns, index) => {
					if(otherIns.relToApp != '00') {
						if(this.imagesList.otherInsurant[index].isOCR == false) {
							let count = 0
							for(let item of this.imagesList.otherInsurant[index].imgs) {
								if(item.reaPath != '') {
									count++
								}
							}
							if(otherIns.idType == '11' || otherIns.idType == '17' || otherIns.idType == '30') {
								if(count < 2) {
									alert_n22.alert("提示", this.getInsText(otherIns.seqNumber) + otherIns.name + ',影像至少需要上传两张', "确定")
									isPass = false
									return
								}
							} else if(count < 1) {
								alert_n22.alert("提示", this.getInsText(otherIns.seqNumber) + otherIns.name + ',影像至少需要上传一张', "确定")
								isPass = false
								return
							}
						}
						if(otherIns.bnfInfo.bnfType == '1') {
							otherIns.bnfInfo.beneficiaries.beneficiary.forEach((othBnf, bnfIndex) => {
								if(othBnf.bnfInsurant != '0' && othBnf.bnfHMInsurant != '0' && this.imagesList.otherInsurant[index].otherBnf[bnfIndex].isOCR == false) {
									let count = 0
									for(let item of this.imagesList.otherInsurant[index].otherBnf[bnfIndex].imgs) {
										if(item.reaPath != '') {
											count++
										}
									}
									if(othBnf.bfcyIdType == '11' || othBnf.bfcyIdType == '17' || othBnf.bfcyIdType == '30') {
										if(count < 2) {
											alert_n22.alert("提示", '受益人:' + othBnf.bfcyName + ',影像至少需要上传两张', "确定")
											isPass = false
											return
										}
									} else if(count < 1) {
										alert_n22.alert("提示", '受益人:' + othBnf.bfcyName + ',影像至少需要上传一张', "确定")
										isPass = false
										return
									}
								}
							})
						}
					}
				})
				return isPass
			},
			checkBankData() {
				let isPass = false
				for(let item of this.imagesList.bankImages) {
					if(item.reaPath != '') {
						isPass = true
					}
				}
				if(!isPass) {
					alert_n22.alert("提示", '银行卡至少需要上传一张', "确定")
					return
				}
				return isPass
			},
		}
	}
</script>
<style scoped lang="scss" type="text/css">
	.main-contents {
		bottom: 50px;
		background: #F5F5F5;
		.part {
			background: #fff;
			padding: 0 15px;
			margin-bottom: 2%;
			p {
				font-size: 14px;
				color: #666;
				line-height: 3;
			}
			.content {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				div {
					width: 30%;
					height: 80px;
					background: url('./../../../static/img/login/video.png') no-repeat scroll right center;
					background-size: 100% 100%;
					position: relative;
					margin-bottom: 10px;
					margin-right: 3%;
					img {
						width: 100%;
						height: 100%;
					}
					span {
						position: absolute;
						right: 0;
						top: 0;
						width: 20px;
						height: 20px;
						border-radius: 50%;
						line-height: 20px;
						text-align: center;
						background: burlywood;
						color: #fff;
					}
				}
			}
		}
		.newPopup {
			width: 70%;
			position: fixed;
			top: 80%;
			left: 50%;
			z-index: 2000;
			border: 1px solid #eee;
			button {
				width: 100%;
				line-height: 45px;
				border: 0;
				background: #fff;
			}
		}
	}
</style>
