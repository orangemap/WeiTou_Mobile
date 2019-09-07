<template>
	<div class='sel-detail-user'>
		<div v-show='!cardScanningValue.isopen&&!occupationValue.isopen'>
			<div class='sel-tel-title flex user-header'>
				<p v-for='item in TitleList' :class="[item.active?'active':'']" style='font-size:.8rem'>
					{{item.text}}
				</p>
			</div>
			<div class='set-user-container sel-title-div'>
				<div class='sel-user-top flex sel-user-top-a'>
					<p class='feb101 user-top-p' style='font-size: .8rem'>出险人信息</p>
					<img src="static/img/comprehensive/bottom.png" alt="" v-show='userShow' @click='userShow = false'>
					<img src="static/img/comprehensive/top.png" alt="" v-show='!userShow' @click='userShow = true'>
				</div>
				<!-- 出险人信息 -->
				<div class='sel-cx-user' v-show='userShow'>
					<div class='flex'>
						<p>姓名</p>
						<p class='rem07'>{{User.name}}</p>
					</div>
					<div class='flex'>
						<p>证件类型</p>
						<div style='flex:1;margin-right:1.8rem' class='flex-end'>
							<label class='flex-end'>
								<p class='rem07'>{{User.certifica | cardBaoQuanFilter}}</p> <!--cardBaoQuanFilter-->
							</label>
						</div>
					</div>
					<div class='flex'>
						<p>证件号码</p>
						<p class='rem07'>{{User.code}}</p>
					</div>
					<div class='flex'>
						<p>证件有效期起期</p>
						<date-picker v-model="User.startdata"  style="display:inline-block;text-align:right;float: right;font-size: .7rem"></date-picker>
					</div>
					<div class='flex'>
						<p>证件有效期止期</p>
						<p>
							<input type="checkbox" v-model='User.isLongTerm'>
							<span style='font-size: .7rem'>是否长期</span>
						</p>
						<date-picker v-model="User.enddata"  style="display:inline-block;text-align:right;float: right;font-size: .7rem" v-show='!User.isLongTerm'></date-picker>
					</div>
					<div class='flex' style='position: relative;'>
						<p>性别</p>
						<p class='rem07'>{{User.sex==true?'女':'男'}}</p>
					</div>
					<div class='flex'>
						<p>年龄</p>
						<p class='rem07'>{{User.age}}</p>
					</div>
					<div class='flex'>
						<p>手机号码</p>
						<input type="text" placeholder='请输入手机号码' v-model='User.mobilecode' maxlength="11" class='rem07'>
					</div>
					<div class='flex'>
						<p>国籍</p>
						<div style='flex:1;margin-right:1.8rem;' class='flex-end rem07'>
							{{User.nation | nativeText}}
						</div>
					</div>
					<div class='flex'>
						<p>职业</p>
						<input class='rem07' type="text" placeholder="请输入职业" name="" v-model='User.Occupation'/>
					</div>
					<div class='flex'>
						<p>联系地址</p>
						<div class='flex-end' style='width:80%;'>
							<textarea placeholder='请输入联系地址' v-model='User.address' style='width: 80%;padding:2px 2px 2px 10px;border: none;height:30px;text-align: right;color:#000!important;font-size:.75rem!important'></textarea>
							<p class="fa fa-microphone" aria-hidden="true" style='color:#feb101;font-size:1.2rem;margin:5px auto' @click='speechRec(1,0)'></p>
						</div>
					</div>
				</div>
				<!-- 待办人信息 -->
				<div class='sel-user-top flex'>
					<p class='feb101' style='font-size: .8rem'>代办人信息</p>
					<img src="static/img/comprehensive/bottom.png" alt="" v-show='ReportedShow' @click='ReportedShow = false'>
					<img src="static/img/comprehensive/top.png" alt="" v-show='!ReportedShow' @click='ReportedShow = true'>
				</div>
				<div class='sel-cx-user' v-show='ReportedShow'>
					<div class='flex'>
						<p>姓名</p>
						<p class='rem07'>{{Reported.rptorname}}</p>
					</div>
					<div class='flex' style='position:relative;'>
						<p>性别</p>
						<p class='rem07'>{{Reported.rptorsex?'女':'男'}}</p>
					</div>
					<div class='flex'>
						<p>手机号</p>
						<p class='rem07'>{{Reported.rptormobile}}</p>
					</div>
					<div class='flex'>
						<p>证件类型</p>
						<p class='rem07'>{{Reported.rptoridtype | Notype}}</p>
					</div>
					<div class='flex'>
						<p>证件号码</p>
						<p class='rem07'>{{Reported.rptoridno}}</p>
					</div>
				</div>
				<!-- 申请人信息 -->
				<div class='sel-cx-user' v-for='item in ContactsList'>
					<div class='sel-user-top flex'>
						<p class='feb101' style='display: flex;align-items: center;'>
							申请人信息&nbsp;
							<img :src="doubtImg" alt="" style='width:1.2rem;height:1.2rem' @click='titleWn(1)'/>
						</p>
						<p>
							&nbsp;
							<img :src="item.activeUrl" alt="" @click='Showactive(item.key)'/>
						</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>申请人身份</p>
						<label style='width:65%' class='flex-end' v-if='isthis == false'>
							<picker v-model="item.bntidentity" code="code" :items="relationTypes" :values='item.bntidentity' title='请输入关系'></picker>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
						<p v-else class='rem07'>被保险人</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p style='display: flex;align-items: center;width:50%'>
							<span>与投保人关系&nbsp;</span>
							<img :src="doubtImg" alt="" style='width:1.2rem;height:1.2rem' @click='titleWn(2)'/>
						</p>
						<label style='width:50%;margin-left:-5px!important' class='flex-end'>
							<picker v-model="item.relationtoholder" code="code" :items="ralationList2" :values='item.relationtoholder' title='请输入关系'></picker>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
					</div>
					<!-- <div class='module-div'>
						<div>
							<p>请输入关系</p>
							<p>
								<input type="text" v-model='gxText'>
							</p>
							<button @click='changeGxText(item)'>确定</button>
						</div>
					</div> -->
					<div class='flex' v-show='item.show'>
						<p style='min-width:100px;'>与出险人关系</p>
						<label style='width:65%' class='flex-end' @click='Setgx(item.key)' v-if='isthis == false'>
							<picker v-model="item.relation" code="code" :items="ralationList" :values='item.relation | ralationFilter' title='请输入关系' @cancel='cancelChange' @change='clearText(item)'></picker>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
						<p v-else  class='rem07'>{{item.relation | ralationFilter}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>姓名</p>
						<div v-if='doneOCR=="0"'> 
							<input type="text" placeholder=" 请输入姓名" v-model='item.linkname' v-if='isthis == false' class='rem07'/>
							<p v-else class='rem07'>{{item.linkname}}</p>
						</div>
						<p v-else class='rem07'>{{item.linkname}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>证件类型</p>
						<div v-if='doneOCR=="0"'>
							<p v-if='isthis== true' class='rem07'>{{item.codeType | Notype}}</p>
							<div v-else  class='flex-end'>
								<label style='width:72%' class='flex-end'>
									<picker v-model="item.codeType" code="code" :items="CertificatesList" :values='item.codeType'></picker>&nbsp;&nbsp;
									<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
								</label>
								<i class="fa fa-camera-retro" style='font-size:1.2rem' @click="cardScanning(item)" :class="[item.codeType==11?'ocr-active':'ocr-none']"></i>
							</div>
						</div>
						<div v-else style='display: flex;justify-content: space-between;align-items: center;width: 65px;'>
							<p class='rem07'>{{item.codeType | Notype}}</p>
							<i v-show='item.codeType==11' class="fa fa-camera-retro" style='font-size:1.2rem' @click="cardScanning(item)" :class="[item.codeType==11?'ocr-active':'ocr-none']"></i>
						</div>
					</div>
					<div class='flex' v-show='item.show'>
						<p>证件号码</p>
						<div v-if='doneOCR=="0"'>
							<input type="text" placeholder=" 请输入证件号码" v-model='item.code' :disabled='isthis== true' maxlength="20" class='rem07' />
						</div>
						<p v-else class='rem07'>{{item.code}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>证件有效期起期</p>
						<date-picker v-if='doneOCR=="0"' v-model="item.bnfidvalidstartdate"  style="display:inline-block;text-align:right;float: right;"></date-picker>
						<p v-else class='rem07'>{{item.bnfidvalidstartdate}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>证件有效期止期</p>
						<div v-if='doneOCR=="0"' class='flex' style="width:60%">
							<p>
								<input type="checkbox" v-model='item.isLongTerm'>
								<span style='font-size: .7rem'>是否长期</span>
							</p>
							<date-picker v-model="item.data"  style="display:inline-block;text-align:right;float: right;" v-show='!item.isLongTerm'></date-picker>
						</div>
						<p v-else class='rem07'>{{item.data}}</p>
					</div>
					<div class='flex' style='position: relative;' v-show='item.show'>
						<p>性别</p>
						<div v-if='doneOCR=="0"'>
							<p v-if='isthis==true' class='rem07'>{{item.linksex==false?"男":"女"}}</p>
							<mt-switch v-else v-model="item.linksex" style="position: absolute;right: -5px;top: 0px;">
								<label style="position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FBFBFB;font-weight:bold;">{{item.linksex||item.linksex==true?'女':'男'}}
								</label>
								<label style="position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #FBFBFB;">{{!item.linksex||item.linksex==false?'男':'女'}}
								</label>
							</mt-switch>
						</div>
						<p v-else class='rem07'>{{item.linksex==false?"男":"女"}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>出生日期</p>
						<date-picker v-if='doneOCR=="0"' v-model="item.Birthday"  style="display:inline-block;text-align:right;float: right;" ></date-picker>
						<p v-else class='rem07'>{{item.Birthday}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>手机号码</p>
						<input type="text" placeholder=" 请输入手机号" v-model='item.linktel' maxlength="11" :disabled='isthis==true' class='rem07'/>
					</div>
					<div class='flex' v-show='item.show'>
						<p>国籍</p>
						<p v-if='isthis==true' class='rem07'>{{item.native | nativeText}}</p>
						<label class='flex-end' v-else>
							<picker v-model="item.native" code="code" :items="nationalList" :values='User.nation' @change='nationChange(item)'></picker>&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back rem07" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
					</div>
					<div class='flex' v-show='item.show' style="position: relative;">
						<p>仅为中国税收居民</p>
						<mt-switch v-model="item.isChina" style="position: absolute;right: -5px;top: 0px;">
							<label style="position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FBFBFB;font-weight:bold;z-index: 1000">{{item.isChina==true?'是':''}}
							</label>
							<label style="position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #FBFBFB;z-index: 1000">{{item.isChina==false?'否':''}}
							</label>
						</mt-switch>
					</div>
					<div class='flex' v-show='item.show'>
						<p style='width:40px;'>职业</p>
						<input v-if='isthis==false' style='font-size: .7rem' type="text" name="" v-model='item.Occupation' placeholder="请输入职业" />
						<p v-else style='font-size: .7rem'>{{item.Occupation?item.Occupation:'请输入职业'}}</p>
					</div>
					<div class='flex' v-show='item.show'>
						<p>联系地址</p>
						<div class='flex-end' style='width:80%' v-if='isthis==false' >
							<textarea placeholder='请输入联系地址' v-model='item.detailAddress' style='width: 80%;padding:2px 2px 2px 10px;border: none;height:30px;text-align: right;color:#000!important;font-size:.75rem!important;background: #fff!important'></textarea>
							&nbsp;
							<p v-if='isthis==false' class="fa fa-microphone" aria-hidden="true" style='color:#feb101;font-size:1.2rem' @click='speechRec(2,item.key)'></p>
						</div>
						<p class='rem07' v-else>{{item.detailAddress}}</p>
					</div>
					<div class='sel-user-top' style='min-height:3.8rem;border-top:2px solid #ddd;margin-top:-2px;'  v-show='item.show'>
						<p class='feb101' style='font-weight: bold;font-size:.9rem;margin:.3rem 0 ;'>申请人账户信息：</p>
						<p style='color:#82572C;font-weight: bold;'>请提供申请人的有效银行卡（银联、非信用卡）或存折账户信息，我们将通过转账方式支付赔款。</p>
					</div>
					<div class='sel-cx-user' style='border:none'  v-show='item.show'>
						<div class='flex' v-if='isthis==false'>
							<p>户名</p>
							<input type="text" name="" v-model='item.linkname' placeholder="请输入银行户名" class='rem07'/>
						</div>
						<div class='flex' v-else>
							<p>户名</p>
							<p>{{item.linkname}}</p>
						</div>
						<div class='flex' >
							<p>开户银行</p>
							<picker v-model="item.bankType" code="code" :items="bankCodeList" :values='item.bankType'></picker>
						</div>
						<div class='flex' >
							<p>银行卡号</p>
							<input type="text" maxlength="20" style='text-align: right' placeholder='请输入银行卡号' v-model='item.bankCode'>
						</div>
					</div>
				</div>
				<mt-popup position="center" class="phone_valid popup"v-model="ImgShow" style="width:70%;border:1px solid #eee;position: fixed;background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos()">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto()">拍照</button>
				</mt-popup>
				<p><Alert ref="showalert"></Alert></p>
				<div class='sel-div-last'>
					<button @click='Next'>下一步</button>
				</div>
			</div>
		</div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div class='search-model'>
			<Search v-show="occupationValue.isopen" v-model="occupationValue" :audioActive='audioTrue'></Search>
		</div>	
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement'
	import datePicker from '@/components/common/DatePicker.vue'
	import picker from '@/components/common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	import nationalList from '@/assets/dict/national_sunlife.json'
	import Search from '@/components/common/OccupationSearch.vue'
	export default {
		components:{datePicker,picker,Alert,IDCardScanning,Search},
		data() {
			return {
				TitleList:[
				{key:'1',text:'出险信息',active:false,url:'/settlement_user/1'},
				{key:'2',text:'出险人信息',active:true,url:'/settlement/settlement_content/settlement_policy'},
				{key:'3',text:'资料上传',active:false,url:'/settlement/settlement_user'},
				{key:'4',text:'信息确认',active:false,url:'/settlement/settlement_upload'},
				],
				ok:true,
				UserCertificatesList:[
				{code:'11',text:'身份证'},
				{code:'12',text:'户口本'},
				{code:'17',text:'中国护照'},
				{code:'24',text:'外国护照'},
				{code:'23',text:'台胞证'},
				{code:'26',text:'港澳通行证'},
				{code:'20',text:'出生证'},
				{code:'29',text:'外国人永久居留身份证'}
				],
				CertificatesList:[
				{code:'11',text:'身份证'},
				// {code:'12',text:'户口本'},
				{code:'17',text:'中国护照'},
				{code:'24',text:'外国护照'},
				{code:'23',text:'台胞证'},
				{code:'26',text:'港澳通行证'},
				// {code:'20',text:'出生证'},
				{code:'29',text:'外国人永久居留身份证'}
				],
				relationTypes: [
				{code:'01',text:'被保险人'},
				{code:'02',text:'法定继承人'},
				{code:'03',text:'指定受益人'},
				{code:'04',text:'监护人'},
				{code:'05',text:'其他'}
				],
				ralationList:[
				{code:'00',text:'本人'},
				{code:'33',text:'配偶'},
				{code:'37',text:'父子'},
				{code:'38',text:'父女'},
				{code:'39',text:'母子'},
				{code:'40',text:'母女'},
				{code:'30',text:'其他'}
				],
				ralationList2:[
				{code:'00',text:'本人'},
				{code:'33',text:'配偶'},
				{code:'37',text:'父子'},
				{code:'38',text:'父女'},
				{code:'39',text:'母子'},
				{code:'40',text:'母女'},
				{code:'30',text:'其他'}
				],
				/*出险人数据*/
				User:{
					name:'',/*出险人姓名*/
					certifica:'',/*出险人证件类型*/
					code:'',/*出险人证件号码*/
					Birthday:'',/*出险人生日*/
					startdata:'请选择',/*出险人证件有效期起期*/
					enddata:'请选择',/*出险人证件有效期止期*/
					sex:false,/*出险人性别*/
					age:'',/*出险人年龄*/
					mobilecode:'',/*出险人手机号*/
					isLongTerm:false,/*出险人证件是否长期有效*/
					address:'',/*出险人联系地址*/
					Occupation:''/*出险人职业*/
				},
				/*申请人数据*/
				contKey:0,/*选择的是第几个申请人的数据*/
				contactsIsAdd:false,/*如果出险类型有“死亡”则显示新增按钮*/
				ContactsList:[
				{
					key:1,
					url:'static/img/settlement/add.png',
					activeUrl:'static/img/comprehensive/bottom.png',
					relation:'',/*关系*/
					linkname:'',/*姓名*/
					linksex:false,/*性别*/
					linktel:'',/*手机号*/
					show:true,
					relationtoholder:'',/*与投保人关系*/
					bntidentity:'',/*申请人身份*/
					othermsg:'',/*关系text*/
					inputPicker:false,/*关系框是否弹出*/
					codeType:'',/*证件类型*/
					code:'',/*证件号码*/
					isLongTerm:false,/*证件是否长期*/
					bnfidvalidstartdate:'',/*申请人证件有效期起期*/
					data:'',/*申请人证件有效期起期止期*/
					Birthday:'',/*生日*/
					native:'CHN',/*国籍*/
					isChina:false,/*是否为中国税收居民*/
					Occupation:'',/*职业*/
					detailAddress:'',/*联系地址*/
					bankCode:'',/*卡号*/
					bankType:'',/*所选银行*/
					bankImg:'static/img/settlement/upload_title.png'/*影像默认图*/
				}
				],
				/*待办人数据*/
				Reported:{
					rptorname:utils.cache.get('personsal').agentName,/*姓名*/
					rptorsex:utils.cache.get('personsal').appntSex=='1'?true:false,/*性别*/
					rptormobile:utils.cache.get('personsal').mobile,/*手机号*/
					rptormangcom:utils.cache.get('personsal').orgId.slice(0,4),/*所属机构*/
					rptoridtype:utils.cache.get('personsal').cerdType,/*证件类型*/
					rptoridno:utils.cache.get('personsal').cerdNum,/*证件号*/
				},
				userShow:true,
				ReportedShow:true,
				cardScanningValue:{/*OCR*/
					isopen:false,
					cusltem:{}
				},
				cardNum:0,/*OCR识别的哪个申请人*/
				occupationValue: {/*职业*/
					isopen: false,
					type: '',
					occItem: ''
				},
				inputPicker:false,/*关系框*/
				gxText:'',
				policyTypes:'',/*分步获取出险类型,下一页面需要*/
				nationalList:nationalList.national.item,/*国籍*/
				bankCodeList:[],/*银行List*/
				disaBd:true,/*禁用input*/
				ImgShow:false,/*点击弹出照相框*/
				isover:false,/*出险类型为身故，申请人不能选择本人
				*出险人为成年人，申请出险类型没有身故类型，申请人则为出险人本人，关系必须为本人*/
				isthis:false,/*判断出险人和申请人是否为同一人*/
				audioTrue:true,/*调用职业组件 让职业组件支持语音识别*/
				doneOCR:'0',//ORC识别：1识别完，0未识别
				doubtImg:'static/img/settlement/doubt.png',
				hordername:'',/*投保人姓名*/
				guohuimianimg:'',
				renxiangmianimg:'',
				ContactsImgList:[],//影像
				openImgList:[],//ocr启用报文
				closeImgList:[]//ocr弃用报文
			}
		},
		computed:{
			...mapState(['VuxPolicyType','policyCode','policyData'])
		},store,
		mounted() {
			this.SetPolicyState('2')
			console.log(this.VuxPolicyType)
			this.SetpolicyCode(this.$route.params.claimId)
			this.getInitData()
			this.getInitBankCode()
			console.log(utils.cache.get('personsal'))
			// utils.valid.getAge('2016-03-03') 出险人年龄
			console.log(utils.cache.get('personsal').cerdNum)
			console.log($('.v-header').outerHeight(true))
			$('.user-header').css('top',$('.v-header').outerHeight(true)+'px')
			$('.sel-detail-user').css('height',this.media.container(this.screenHeight,0)+'px').css('overflow','hidden')
			$('.set-user-container').height($('.sel-detail-user').outerHeight(true)-40+'px').css('overflow-y','scroll').css('margin-top',$('.user-header').outerHeight(true)+'px')
		},
		methods:{
			...mapMutations(['SetPolicyState','SetpolicyCode','SetpolicyData']),
			cancelChange() {
				console.log('1')
			},
			titleWn(id) {
				let text = ''
				if(id == 1){
					text=`
					<p style='text-align:left;font-size:.8rem'>以下人群具有为被保险人申请的资格：</p>
					<p style='text-align:left;font-size:.8rem'>监护人(被保险人为未成年人时)</p>
					<p style='text-align:left;font-size:.8rem'>身故受益人</p>
					<p style='text-align:left;font-size:.8rem'>法定继承人(保单未指定身故受益人)</p>`
				}else{
					text = '投保人为'+this.hordername
				}
				this.Aleart(text)
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			cardScanning(item) {/*ocr识别*/
				this.cardNum = item.key
				if(item.codeType == '11'){
					this.cardScanningValue.isopen = true
				}
			},
			clearText(item) {
				//item.linkname = ''/*姓名*/
				//item.linksex = false/*性别*/
				item.linktel = ''/*手机号*/
				item.othermsg = ''/*关系text*/
				//item.codeType = ''/*证件类型*/
				//item.code = ''/*证件号码*/
				item.isLongTerm = false/*证件是否长期*/
				//item.bnfidvalidstartdate = ''/*申请人证件有效期起期*/
				//item.data = ''/*申请人证件有效期起期止期*/
				//item.Birthday = ''/*生日*/
				item.isChina = false/*是否为中国税收居民*/
				item.Occupation = ''/*职业*/
				item.detailAddress = ''/*联系地址*/
				item.bankCode = ''/*卡号*/
				item.bankType = ''/*所选银行*/
			},
			insurantChooseJob(item) {
				if(item!=666){
					this.contKey = item.key
				}else{
					this.contKey = 666
				}
				this.occupationValue.isopen = !this.occupationValue.isopen
				if(this.occupationValue.isopen == true){
					console.log('职业组件显示了')
					console.log($('.v-header').outerHeight(true)-5+'px!important;')
					$('#manage-main-contents').css('top',$('.v-header').outerHeight(true)+'px!important;')
				}
			},
			// changeGxText(item) {
			// 	console.log(this.ContactsList)
			// 	if(this.gxText!=''){
			// 		item.inputPicker = false
			// 		this.ContactsList.forEach( (tpl,index) => {
			// 			if(tpl.key == item.key){
			// 				tpl.othermsg = this.gxText
			// 				tpl.inputPicker = false
			// 				tpl.relation = '31'
			// 			}
			// 			this.$set(this.ContactsList,index,tpl)
			// 		})
			// 		this.gxText = ''
			// 		console.log(this.ContactsList)
			// 	}else{
			// 		this.Aleart('请输入关系')
			// 	}
			// },
			Showactive(id) {/*显示隐藏联系人*/
				this.ContactsList.forEach( (item,index) => {
					if(item.key == id){
						item.show = !item.show
						if(item.show == true){
							item.activeUrl = 'static/img/comprehensive/bottom.png' 
						}else{
							item.activeUrl = 'static/img/comprehensive/top.png' 
						}
						console.log(item)
					}
					this.$set(this.ContactsList,index,item)
				})
			},
			nationChange(item) {
				console.log(item)
				if(item.native === 'CHN'){
					item.isChina = true
				}else {
					item.isChina = false
				}
			},
			SetContacts(id){/*Add Deleta申请人*/
				console.log(id)
				if(id == 1){
					let newNum = this.ContactsList.length+1
					let newObject = {
						key:newNum,
						url:'static/img/settlement/delete.png',
						activeUrl:'static/img/comprehensive/bottom.png',
						relation:'',/*关系*/
						linkname:'',/*姓名*/
						linksex:false,/*性别*/
						linktel:'',/*手机号*/
						show:true,
						othermsg:'',/*关系text*/
						inputPicker:false,/*关系框是否弹出*/
						codeType:'',/*证件类型*/
						code:'',/*证件号码*/
						isLongTerm:false,/*证件是否长期*/
						data:'',/*证件有效期*/
						Birthday:'',/*生日*/
						native:'',/*国籍*/
						isChina:false,/*是否为中国税收居民*/
						Occupation:'',/*职业*/
						detailAddress:'',/*联系地址*/
						bankCode:'',/*卡号*/
						bankType:'',/*所选银行*/
						bankImg:'static/img/settlement/upload_title.png',/*影像默认图*/
					}
					if(this.ContactsList.length<3){
						this.ContactsList.push(newObject)
					}
				}else if(id != 1){
					this.ContactsList.forEach( (item,index) =>{
						if(item.key == id){
							this.ContactsList.splice(index,1)
						}
					})
				}
			},
			ImgOpen(fileId) {
				let arr = [{fileId:fileId,isenabled:'1'}]
				let requ = { 
					data: { 
						files:arr/*0未启用，1启用*/
					}, 
					modelName: "claimService", 
					methodName: "updateFileStatus" 
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
						//启用影像
						console.log('影像启用返回body---->>>',body)
						console.log('影像启用返回header---->>>',header)
					})
			},
			ImgOpen2(arr) {
				let requ = { 
					data: { 
						files:arr/*0未启用，1启用*/
					}, 
					modelName: "claimService", 
					methodName: "updateFileStatus" 
				}
				console.log('影像修改启用请求----->>',requ)
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
						//启用影像
						console.log('影像修改启用返回body---->>>',body)
						console.log('影像修改启用返回header---->>>',header)
					})
			},
			ImgClose(arr1) {
				let requ = { 
					data: { 
						files:arr1/*0未启用，1启用*/
					}, 
					modelName: "claimService", 
					methodName: "updateFileStatus" 
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
						//弃用影像
						console.log('影像弃用返回body---->>>',body)
						console.log('影像弃用返回header---->>>',header)
						this.uploadOCR(this.guohuimianimg);
						this.uploadOCR(this.renxiangmianimg);
					})
			},
			speechRec(index,count) {/*语音识别录入*/
				MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc) => {
					if(index == 1){
						this.User.address = callbackSucc.result
					}else if(index == 2){
						this.ContactsList.forEach( (item,index) =>{
							if(item.key == count){
								item.detailAddress = callbackSucc.result
							}
							this.$set(this.ContactsList,index,item)
						})
					}
				}, (callbackFail) => {
					this.showMsg(callbackFail)
				});
			},
			Imgchange(key,type) {
				this.contKey = key
				if(type == '1'){
					this.ImgShow = true
				}else if(type == '2'){
					alert_n22.confirm('提示', '确定要删除吗?', '确定', '取消', (flag) => {
						this.ContactsList.forEach( (item,index) => {
							if(item.key == key){
								item.bankImg = 'static/img/settlement/upload_title.png'
							}
							this.$set(this.ContactsList,key,item)
						})
					})
				}
			},
			getInitBankCode() {
				let requ = {
					"data": {
						orgCode:utils.cache.get('personsal').orgId.substring(0,4),
						type:"F"
					},
					modelName:"claimInformationService",
					methodName:"getBankList"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(header)
					console.log('银行码表接口返回----->>>',body)
					let arr = []
					body.data.bankList.forEach(item => {
						let newObject = {
							code:item.code,
							text:item.name
						}
						arr.push(newObject)
					})
					this.bankCodeList = arr
				})
			},	
			getInitData() {
				let requ = {
					"data": {
						claimId:this.$route.params.claimId,
						claimType:"1",
						step:"2"
					},
					modelName: "claimService",
					methodName: "getClaimInfo"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('分步获取----->>>',body)
					console.log(header)
					let insured = body.data.claim.insured
					if(body.data.code == 0){
						this.User.name = insured.insuredname/*出险人姓名*/
						this.User.certifica = insured.insuredidtype/*出险人证件类型*/
						this.User.code = insured.insuredidno/*出险人证件号码*/
						this.User.sex = insured.insuredsex == '1'?true:false/*出险人性别*/
						this.User.startdata = insured.insuredidvalidate/*出险人证件有效期起期*/
						this.User.enddata = insured.insuredidexpdate/*出险人证件有效期止期*/
						this.User.isLongTerm = insured.insuredislong=="1"?true:false/*出险人证件是否长期有效*/
						this.User.Birthday = insured.insuredbirthday/*出险人生日*/
						if(insured.insuredidtype == '12'){//户口本
							this.User.startdata = insured.insuredbirthday
							let newdata = insured.insuredbirthday.split('-')
							let newyaer = parseInt(newdata[0])+16 
							this.User.enddata =newyaer+'-'+newdata[1]+'-'+newdata[2]
						}else if(insured.insuredidtype == '20'){//出生证
							this.User.startdata = insured.insuredbirthday
							let newdata = insured.insuredbirthday.split('-')
							let newyaer = parseInt(newdata[0])+3 
							this.User.enddata =newyaer+'-'+newdata[1]+'-'+newdata[2]
						}
						this.User.nation = insured.insurednation/*国籍*/
						this.User.age = utils.valid.getAge(insured.insuredbirthday).toString()/*年龄*/
						this.User.Occupation = insured.insuredprofess/*职业*/
						this.User.mobilecode = insured.insuredmobile/*手机号*/
						this.User.address = insured.insuredaddress/*地址*/
						this.hordername = body.data.claim.accidentInfo.hordername
						console.log('出险人信息----->>>',this.User)
						console.log('返回的申请人信息----->>>',body.data.claim.applicants)
						if(body.data.claim.applicants){/*申请人信息*/
							this.ContactsList = []
							this.doneOCR = body.data.claim.applicants[0].doneocr
							body.data.claim.applicants.forEach((tpl,index) => {
								let newObject = {
									key:tpl.orders,
									show:true,
									url:tpl.orders==1?'static/img/settlement/add.png':'static/img/settlement/delete.png',
									activeUrl:'static/img/comprehensive/bottom.png',
									inputPicker:false,
									linkname:tpl.bnfname,
									linksex:tpl.bnfissex == '1'?true:false,/*性别*/
									linktel:tpl.bnfmobile,/*手机号*/
									othermsg:tpl.othermsg,
									relation:tpl.relationtoinsured,/*关系*/
									bankCode:tpl.bankcode,/*银行卡号*/
									bankType:tpl.bankaccno,/*开户银行*/
									Occupation:tpl.bntprofess,/*职业*/
									detailAddress:tpl.bntaddress,/*联系地址*/
									native:tpl.bnfnation,/*国籍*/
									codeType:tpl.bnfidtype,/*证件类型*/
									code:tpl.bnfidno,/*证件号*/
									Birthday:tpl.bnfbirthday,/*生日*/
									data:tpl.bnfidvalidenddate,/*证件有效期止期*/
									bnfidvalidstartdate:tpl.bnfidvalidstartdate,/*证件有效期起期*/
									isLongTerm:tpl.bnfislong==1?true:false,/*是否长期*/
									isChina:tpl.isfax == '0'?false:true,/*是否中国税民*/
									bntidentity:tpl.bntidentity,/*申请人身份*/
									relationtoholder:tpl.relationtoholder/*与出险人关系*/
								}
								this.ContactsList.push(newObject)
							})
							this.ContactsImgList = body.data.claim.imageFiles
						}
						console.log('分步获取--->>>申请人',this.ContactsList)
						this.ContactsList.sort(function(a,b){
							return a.key - b.key
						})
						console.log('分步获取--->>>出险类型',body.data.claim.accidentInfo.accidentMode)
						let arr = body.data.claim.accidentInfo.accidentMode
						console.log(arr)
						arr.forEach( item =>{
							if(item.isselected == '1'){
								this.policyTypes+=item.reasoncode+','
								let newArr = [102,202]
								newArr.forEach( tpl=> {
									if(item.reasoncode == tpl){
										this.isover = true
										console.log('如果有死亡的出险类型，则可以添加申请人')
									}
								})
							}
						})
						if(this.isover == true || this.User.age){//身故删除被保险人
							this.relationTypes.forEach( (item,index) => {
								if(item.code === '01') {
									this.relationTypes.splice(index,1)
								}
							})
						}
						this.policyTypes = this.policyTypes.substr(0, this.policyTypes.length-1)
						let newPolicyTypeList = this.policyTypes.split(',')
						console.log(newPolicyTypeList)
						let isok = true/*出险人与申请人是否为同一人*/
						if(newPolicyTypeList.length>0){
							// newPolicyTypeList.forEach( item =>{
							// 	/*出险类型为身故->申请人与出险人不能为同一人*/
							// 	if(item == '102' || item == '202'){
							// 		isok = false
							// 	}
							// })
							//小于18岁，不能为本人----->>>申请人为录入状态 isthis=false
							//大于18岁&&有身故----->>>申请人为录入状态 isthis=false
							//大于18岁&&非身故----->>>不可录入 isthis=true
							if(this.User.age<18){/*出险人为未成年人->申请人与出险人不能为同一人*/
								isok = false
							}else{ /*出险人为成年人&&出险类型没有身故类型，申请人则为出险人本人*/
								newPolicyTypeList.forEach( item =>{
									if(item == '102' || item == '202'){
										console.log('出险类型非身故&&出险人大于18岁')
										isok = false
										//身故的时候 不能为本人
										this.contactsIsAdd = true
									}
								})
							}
							this.isthis = isok
							console.log('this.isthis--->>>',this.isthis)
							
							console.log('是否有身故类型',this.contactsIsAdd)
							if(this.contactsIsAdd == true || this.User.age<18){
								this.ralationList.splice(0,1)
								this.ContactsList.map( (item,index)=> {
									item.relation = '33'
									this.$set(this.ContactsList,item,index)
								})
							}
						}
					}
				})
},
repeat(i,j){
	/*校验多申请人资料不能相同*/
	if(this.ContactsList[i].linkname == this.ContactsList[j].linkname && this.ContactsList[i].linksex == this.ContactsList[j].linksex && this.ContactsList[i].codeType == this.ContactsList[j].codeType && this.ContactsList[i].code == this.ContactsList[j].code && this.ContactsList[i].Birthday == this.ContactsList[j].Birthday ){
		return '申请人资料重复，请确认！'
	}else if(this.ContactsList[i].linktel == this.ContactsList[j].linktel){
		return '申请人手机号码重复，请确认！'
	}else if(this.ContactsList[i].bankCode == this.ContactsList[j].bankCode){
		return '申请人银行账户重复，请确认！'
	}else{
		return ''
	}
},
InitDate(Date){
	let month = Date.getMonth()
	if((month+1)<=9){
		month = '0'+(month+1)
	}else{
		month = month+1
	}
	let date = Date.getDate()
	if(date<=9){
		date = '0'+date
	}
	return Date.getFullYear()+'-'+month+'-'+date
},
Next() {
	console.log('出险人----->>>',this.User)
	console.log('代办人----->>>',this.Reported)
	console.log('申请人----->>>',this.ContactsList)
	console.log('出险类型是否为身故',this.isover)
	let AlertText = ''
	if(this.User.certifica == '11'){/*校验出险人数据*/
		if(this.User.startdata == '' || this.User.startdata == '请选择' || this.User.startdata == undefined){
			AlertText = '出险人证件有效期起期不能为空。'
		}else if(this.User.startdata > this.InitDate(new Date())){
			AlertText = '出险人证件有效期起期不能晚于当前日期。'
		}
	}else if(this.User.certifica == '20'){//出生证
		let newdata = this.User.Birthday.split('-')
		let newyaer = parseInt(newdata[0])+3 
		if(this.User.enddata != newyaer+'-'+newdata[1]+'-'+newdata[2]){
			AlertText = '出险人证件有效期止期应为'+newyaer+'-'+newdata[1]+'-'+newdata[2]
		}
		if(this.User.startdata != this.User.Birthday){
			AlertText = '出险人证件有效期起期应为'+this.User.Birthday
		}
	}else if(this.User.certifica == '12'){//户口本
		let newdata = this.User.Birthday.split('-')
		let newyaer = parseInt(newdata[0])+16
		if(this.User.enddata != newyaer+'-'+newdata[1]+'-'+newdata[2]){
			AlertText = '出险人证件有效期止期应为'+newyaer+'-'+newdata[1]+'-'+newdata[2]
		}
		if(this.User.startdata != this.User.Birthday){
			AlertText = '出险人证件有效期起期应为'+this.User.Birthday
		}
	}
	if(this.User.enddata == '' || this.User.enddata == '请选择'){
		AlertText = '出险人证件有效期止期不能为空。'
	}
	let endDataYear = new Date().getFullYear();
	let endDataMonth = new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1
	let endDataDay = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()
	let endData = endDataYear+'-'+endDataMonth+'-'+endDataDay
	if(!this.User.isLongTerm && new Date(this.User.enddata).getTime() < new Date(endData).getTime()){
		AlertText = '出险人证件有效期止期不能早于当前日期。'
	}
	/*电话号码*/
	let userCodearr = ['00000000','11111111','22222222','33333333','44444444','55555555','66666666','77777777','88888888','99999999']
	for(let i=1;i<4;i++){
		for(let j=0;j<userCodearr.length;j++){
			if(this.User.mobilecode){
				if(this.User.mobilecode.substr(i,8) == userCodearr[j]){
					console.log('连续八位数字校验')
					AlertText = '出险人手机号码不可以连续8位以上相同。'
				}
			}

		}
	}
	if(this.User.mobilecode && this.User.mobilecode.length!= 11){
		AlertText = '出险人手机号码长度有误，请核对。'
	}
	if(this.User.mobilecode == '' || !this.User.mobilecode){
		AlertText = '出险人电话不能为空。'
	}
	if(this.User.mobilecode){
		let UserbodyNum = this.User.mobilecode.substr(0,2)
		if(UserbodyNum != '13' && UserbodyNum != '14' && UserbodyNum != '15' && UserbodyNum != '17' && UserbodyNum != '18' || !/^[0-9]{11}$/.test(this.User.mobilecode)){
			AlertText = '出险人手机号码格式有误，请核对。'
		}
	}
	if(this.User.Occupation == '' || this.User.Occupation == undefined){
		AlertText = '出险人职业不能为空。'
	}
	if(!this.User.address || this.User.address && this.User.address.length<5){
		AlertText = '出险人联系地址不能少于五个字。'
	}
	if(this.User.Occupation == ''){
		AlertText = '出险人职业不能为空。'
	}
	let msg = utils.valid.settlementCardId(this.User.startdata,this.User.isLongTerm?'2200-12-31':this.User.enddata,this.User.certifica,this.User.code,this.User.Birthday,'出险人')
	if(msg != ''){
		AlertText = msg
	}
	if(AlertText !=''){
		this.Aleart(AlertText)
	}else if(this.ContactsList.length>0){/*校验申请人数据*/
		console.log('校验申请人',this.ContactsList)
		console.log(this.ContactsList[0].Birthday.split('-'))
		let num = 0
		let relationNum = 0
		this.ContactsList.forEach( item =>{
			if(item.relation == ''){
				AlertText = '申请人关系不能为空。'
			}
			if(item.linkname == ''){
				AlertText = '申请人姓名不能为空。'
			}
			if(item.linktel == ''){
				AlertText = '申请人电话不能为空。'
			}
			if(item.linktel == this.Reported.rptormobile){
				AlertText = '申请人与代办人手机号码不能为一致。'
			}
			let msg = utils.valid.ngbc(item.native, item.linksex==true?'2':'1', item.Birthday, item.codeType, item.code)
			if(msg != undefined && msg != ''){
				console.log(item)
				console.log(msg)
				AlertText =  "申请人"+msg
			}
			if(item.relation != '' && item.linkname != '' && item.linktel != ''){
				console.log('申请人数据填完，校验开始')
				/*校验与出险人关系*/
				if(item.relationtoholder == ''){
					AlertText = '与出险人关系不能为空。'
				}
				/*校验姓名*/
				let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				if(reg.test(item.linkname)){
					item.linkname = item.linkname.replace(/\s+/g, "")
				}
				let msg1 = utils.valid.names(item.linkname)
				if(msg1 != undefined && msg1 != ''){
					AlertText = "申请人"+msg1
				}
				console.log(item.linkname.length)
				if(item.linkname.length>=20){
					AlertText = '申请人名字不能超过20个字符。'
				}
				/*校验证件类型*/
				if(item.codeType == ''){
					AlertText = '申请人证件类型不能为空。'
				}
				/*校验证件号码*/
				if(item.code == ''){
					AlertText = '申请人证件号码不能为空。'
				}
				if(item.isLongTerm == true){
					item.data = '2200-12-31'
				}
				/*校验证件有效期不为长期的有效期校验*/
				let endDataYear = new Date().getFullYear();
				let endDataMonth = new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1
				let endDataDay = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()
				let endData = endDataYear+'-'+endDataMonth+'-'+endDataDay
				if(item.isLongTerm == false && item.data == ''){
					AlertText = '申请人证件有效期止期不能为空。'
				}else if(new Date(item.data).getTime() < new Date(endData).getTime()) {
					AlertText = '申请人证件有效期止期不能早于当前日期。'
				}
				if(item.bnfidvalidstartdate == '') {
					AlertText = '申请人证件有效期起期不能为空。'
				}else if(item.bnfidvalidstartdate > this.InitDate(new Date())){
					AlertText = '申请人证件有效期起期不能晚于当前日期。'
				}
				console.log(AlertText)
				if(item.age == ''){/*校验年龄*/
					AlertText = '申请人年龄不能为空。'
				}
				if(item.native == ''){/*校验国籍*/
					AlertText = '申请人国籍不能为空。'
				}
				if(item.Occupation == ''){/*校验职业*/
					AlertText = '申请人职业不能为空。'
				}
				if(item.detailAddress == ''){/*校验联系地址*/
					AlertText = '申请人联系地址不能为空。'
				}
				/*校验电话号码*/
				let arr = ['00000000','11111111','22222222','33333333','44444444','55555555','66666666','77777777','88888888','99999999']
				for(let i=1;i<4;i++){
					for(let j=0;j<arr.length;j++){
						if(item.linktel.substr(i,8) == arr[j]){
							console.log('连续八位数字校验')
							AlertText = '申请人手机号码不可以连续8位以上相同。'
						}
					}
				}
				if(item.linktel.length!= 11){
					AlertText = '申请人手机号码长度有误，请核对。'
				}
				let bodyNum = item.linktel.substr(0,2)
				if(bodyNum != '13' && bodyNum != '14' && bodyNum != '15' && bodyNum != '17' && bodyNum != '18' || !/^[0-9]{11}$/.test(item.linktel)){
					AlertText = '申请人手机号码格式有误，请核对。'
				}
				if(item.Birthday == ''){/*申请人证件类型为出生证，证件有效期应为3周岁日期*申请人证件类型为户口本，证件有效期应为16周岁日期*/
					AlertText = '申请人出生日期不能为空。'
				}
				//let wrning = utils.valid.settlementCardId(item.bnfidvalidstartdate,item.data,item.codeType,item.code,item.Birthday,'申请人')//起期，止期，证件类型，证件号, 生日，身份类别(出险人/代理人/被保人/受益人)
				// console.log(wrning)
				if(item.bntidentity == '' && this.isthis == true){
					item.bntidentity = '01'
				}
				// if(wrning != undefined && wrning!= ''){
				// 	AlertText = wrning
				// }
//				let msg = utils.valid.BankCode(item.bankType,item.bankCode)/*开户银行 银行卡号*/
//				if(msg != undefined && msg!= ''){
//					AlertText = msg
//				}
				if(item.bankType == ''){
					AlertText = '申请人开户银行不能为空。'
				}
				if(item.bankCode == ''){
					AlertText = '申请人银行卡号不能为空。'
				}else if(!/^[0-9]{10,20}$/.test(item.bankCode)){
					AlertText = '申请人银行卡号有误，请确认。'
				}else if(!item.bntidentity && this.isthis == false){
					AlertText = '申请人身份有误，请确认。'
				}
				console.log(AlertText)
				if(AlertText != ''){
					this.Aleart(AlertText)
				}
			}
		})
if(AlertText != ''){
	this.Aleart(AlertText)
}
}
if(this.User.mobilecode == this.Reported.rptormobile){/*校验代办人信息*/
	AlertText = '出险人与代办人手机号码不能为一致。'
}
console.log(this.contactsIsAdd)
console.log(this.ContactsList)
if(this.contactsIsAdd == true || this.User.age<17){/*出险类型为身故或出险人为未成年人，申请人不能选择本人*/
	this.ContactsList.forEach( item =>{
		if(item.relation == '00'){
			AlertText = '您选择的理赔类型有误，请确认申请人资格！'
		}
	})
}
if(this.contactsIsAdd == false && this.User.age>17){/*出险人为成年人，出险类型没有身故类型，申请人则为出险人本人 相同字段默认相同，不可修改*/
	this.ContactsList.forEach( item =>{
		if(item.relation != '00'){
			console.log(item)
			AlertText = '您选择的理赔类型有误，请确认申请人资格！'
		}
	})
}
if(!this.User.isLongTerm && this.User.startdata!='' && this.User.startdata!='请选择' &&this.User.enddata<this.User.startdata){/*校验出险人证件有效期止期不能早于起期*/
	AlertText = '出险人证件有效期止期不能早于起期！'
}
				if(this.ContactsList[0].relation != '00' && this.ContactsList[0].codeType == '11'){//申请人不是本人&&证件为身份证
					if(this.doneOCR == '0'){//没经过OCR识别
						AlertText = '申请人证件类型为身份证，需经过OCR证件识别'
					}
				}
				console.log(AlertText)
				if(this.User.code.length == 15 && this.User.certifica == '11'){
					AlertText = '请您先协助客户进行证件号码变更。'
				}
				if(this.User.certifica == '' || this.User.certifica == '28'){
					AlertText = '请您先协助客户进行证件类型或证件号码变更'
				}
				if(AlertText != ''){
					this.Aleart(AlertText)
				}else{
					console.log('分步保存--->>>出险人',this.User)
					console.log('分步保存--->>>代办人',this.Reported)
					let applicants = []
					this.ContactsList.forEach( (item,index) => {
						let newBoject = {
							orders:'1',
							bnfname:item.linkname,/*姓名*/
							bnfidtype:item.codeType,/*证件类型*/
							bnfidno:item.code,/*证件号*/
							bntidentity:this.isthis == true ? '01' :item.bntidentity,/*申请人身份*/
							bnfidvalidstartdate:item.bnfidvalidstartdate?item.bnfidvalidstartdate:'',/*申请人有效期起期*/
							bnfidvalidenddate:item.isLongTerm=='1'?'2200-12-31':item.data,/*证件有效期止期*/
							bnfislong:item.isLongTerm?'1':'0',/*是否长期*/
							bnfissex:item.linksex?'1':'0',/*性别*/
							bnfbirthday:item.Birthday,/*生日*/
							relationtoinsured:item.relation,/*与出险人关系*/
							relationtoholder:item.relationtoholder,/*与投保人关系*/
							bnfmobile:item.linktel,/*手机号*/
							bnfnation:item.native,/*国籍*/
							isfax:item.isChina?'1':'0',/*是否中国税收税民*/
							bntprofess:item.Occupation,/*职业*/
							bntaddress:item.detailAddress,/*联系地址*/
							accname:item.linkname,/*户名*/
							bankaccNo:item.bankType,/*开户银行*/
							bankcode:item.bankCode,/*银行卡号*/
							doneOCR:this.doneOCR
						}
						applicants.push(newBoject)
					})
					this.bankCodeList.forEach( tpl =>{
						if(applicants[0].bankaccNo == tpl.code){
							applicants[0].bankAccName = tpl.text//银行中文名
						}
					})
					console.log('分步保存--->>>申请人',applicants)
					let requ = {
						data: {
							insured: {/*出险人信息*/
								insuredaddress: this.User.address,/*出险人联系地址*/
								insuredbirthday: this.User.Birthday,/*出险人生日*/
								insuredidno: this.User.code,/*出险人证件号码*/
								insuredidtype: this.User.certifica,/*出险人证件类型*/
								insuredidvalidate:this.User.startdata=='请选择'||this.User.startdata==undefined?'':this.User.startdata,/*出险人证件有效期起期*/
								insuredidexpdate: this.User.isLongTerm?'2200-12-31':this.User.enddata,/*出险人证件有效期止期*/
								insuredislong: this.User.isLongTerm?"1":"0",/*出险人证件是否长期*/
								insuredname: this.User.name,/*出险人姓名*/
								insurednation: this.User.nation,/*出险人国籍*/
								insuredmobile: this.User.mobilecode,/*出险人手机号*/
								insuredprofess: this.User.Occupation,/*出险人职业*/
								insuredsex: this.User.sex == true?'1':'0',/*出险人性别*/
								insuredrelation:"",
								rptorbirthday: "",
								rptoremail: "",
								rptoridno: utils.cache.get('personsal').cerdNum,/*代办人证件号*/
								rptoridtype: utils.cache.get('personsal').cerdType,/*代办人证件类型*/
								rptormangcom: this.Reported.rptormangcom,/*代办人所属机构*/
								rptormobile: this.Reported.rptormobile,/*代办人手机号*/
								rptorname: this.Reported.rptorname,/*代办姓名*/
								rptorsex: this.Reported.rptorsex?'1':'0',/*代办人性别 0男 1女*/
								rptornational:'',/*代办人国籍*/
								rptorstartdate:'',/*代办人证件有效期起期*/
								rptorenddate:'',/*代办人证件有效期止期*/
							},
							linkMans: "",/*联系人空*/
							applicants:applicants,/*申请人*/
							claimType:"1",/*报案0,理赔1*/
							agentCode:utils.cache.get('personsal').agentCode,
							claimId:this.$route.params.claimId,
							claimStep:"2"
						},
						modelName: "claimService",
						methodName: "saveCliamInformation"
					}
					console.log('分步保存----->>>',requ)
					let user = {
						customerName:this.User.name,/*出险人姓名*/
						customerSex:this.User.sex,/*出险人性别*/
						customerBirthDay:this.User.data,/*出险人生日*/
						customerIDType:this.User.certifica,/*出险人证件类型*/
						customerIDNo:this.User.code,/*出险人证件号*/
						customerNative:this.User.nation,/*出险人国籍*/
					}
					//获取imgList,可以拿到是否有ocr识别
					let isOCR = false
					let arr = []//弃用所需
					if(this.ContactsImgList && this.ContactsImgList.length>0){
						this.ContactsImgList.forEach( item => {
							if(item.fileType == '3'){
								isOCR = true
								let ImgObject = {
									fileId:item.id,
									isenabled:'0'
								}
								arr.push(ImgObject)
							}
						})
					}
					if(isOCR == true && this.guohuimianimg!= '' && this.renxiangmianimg!= ''){//有ocr影像信息，弃用分步获取的ocr
						this.ImgClose(arr)
					}else if(isOCR == false && this.guohuimianimg!= '' && this.renxiangmianimg!= ''){
						this.uploadOCR(this.guohuimianimg);
						this.uploadOCR(this.renxiangmianimg);
					}
					
					this.SetpolicyData(user)/*保存出险人信息,影像上传页面需要展示出险人信息*/
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						console.log(body)
						console.log(header)
						if(body.data.code == 0){
							this.SetPolicyState('3')
							this.SetpolicyCode(this.$route.params.claimId)
							this.$router.push('/settlement_content/settlement_upload/'+this.policyTypes)
						}else{
							this.Aleart(data.body.msg)
						}
					})
				}
			},
			uploadOCR(imgUrl) {
				let imgNum = 0
				let requ =  {
					data:{
						fileBase64:imgUrl,/*图片*/
						claimsId:this.$route.params.claimId,/*报案号this.policyCode*/
						claimsType:this.policyTypes,/*出险类型*/
						fileType:'3',/*影像类型*/
						imageType:"jpg",
						businessType:"claims" /*报案report，赔案claims*/
					},
					modelName: "claimService",
					methodName: "attachFileUpload"
				}
				console.log('上传ocr请求报文----->>>',requ)
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('上传ocr返回body----->>>',body)
					this.ImgOpen(body.data.fileId)
					console.log('上传ocr返回header----->>>',header)
				})
			}
		},
		watch:{
			ContactsList:{
				handler(val,old){
					console.log(old)
					old.map( (item,i)=> {
						if(this.isthis == true && item.relation == '00'){/*监听申请人关系 */
							item.linkname = this.User.name/*姓名*/
							item.linksex = this.User.sex/*性别*/
							item.linktel = this.User.mobilecode/*手机号*/
							item.codeType = this.User.certifica/*证件类型*/
							item.code = this.User.code/*证件号码*/
							item.isLongTerm = this.User.isLongTerm/*证件是否长期*/
							item.data = this.User.enddata/*证件有效期止期*/
							item.Birthday = this.User.Birthday/*生日*/
							item.native = this.User.nation/*国籍*/
							item.Occupation = this.User.Occupation/*职业*/
							item.detailAddress = this.User.address/*联系地址*/
							item.bnfidvalidstartdate = this.User.startdata /*证件有效期起期*/
						}
						console.log(item.native)
						if(item.native == 'CHN'){
							item.isChina = true
						}else{
							item.isChina = false
						}
								// else if(item.relation == '30'){
								// 	item.inputPicker = true
								// }
								/*证件类型为出生证 有效期止期应为3周岁*/
								// if(item.codeType == '20' && item.Birthday!='请选择' && item.Birthday!=''){
								// 	let newdata = item.Birthday.split('-')
								// 	let newyaer = parseInt(newdata[0])+3 
								// 	item.data =newyaer+'-'+newdata[1]+'-'+newdata[2]
								// 	item.bnfidvalidstartdate = item.Birthday
								// }else
								// 证件类型为户口本 有效期止期应为16周岁
								// if(item.codeType == '12' && item.Birthday!='请选择' && item.Birthday!=''){
								// 	let newdata = item.Birthday.split('-')
								// 	let newyaer = parseInt(newdata[0])+16 
								// 	item.data =newyaer+'-'+newdata[1]+'-'+newdata[2]
								// 	item.bnfidvalidstartdate = item.Birthday
								// }
							})
				},
				deep:true
			},
			User:{
				handler(old){
					/*相同项 姓名、性别、证件类型、证件号、证件有效期止期、手机号、国籍、职业、联系地址*/
					console.log(this.isthis)
					if(this.isthis== true){
						console.log('把出险人信息赋值给申请人，且相同项不能修改')
						this.ContactsList.forEach( item =>{
							item.relation = '00'/*关系*/
							item.linkname = this.User.name/*姓名*/
							item.linksex = this.User.sex/*性别*/
							item.linktel = this.User.mobilecode/*手机号*/
							item.codeType = this.User.certifica/*证件类型*/
							item.code = this.User.code/*证件号码*/
							item.isLongTerm = this.User.isLongTerm/*证件是否长期*/
							item.data = this.User.enddata/*证件有效期*/
							item.Birthday = this.User.Birthday/*生日*/
							item.native = this.User.nation/*国籍*/
							item.Occupation = this.User.Occupation/*职业*/
							item.detailAddress = this.User.address/*联系地址*/
						})
					}
					/*出险人证件有效期为长期时，把长期值赋值给申请人*/
					this.ContactsList.forEach( (item,index) =>{
						if(item.relation == '00'){
							item.isLongTerm = old.isLongTerm
						}
						if(item.relation == '00' && item.isLongTerm == true){
							item.data = '2200-12-31'
						}
						this.$set(this.ContactsList,index,item)
					})
				},
				deep:true
			},
			cardScanningValue:{/*证件识别组件*/
				handler(old,val){
					if(this.cardScanningValue.isopen == false){
						if(this.cardScanningValue.cusItem.name){
							this.doneOCR = '1' //1识别完，0未识别
						}
						this.ContactsList.forEach( (item,index) => {
							if(item.key == this.cardNum){
								item.codeType = '11'/*证件类型*/
								item.Birthday = this.cardScanningValue.cusItem.birthday/*生日*/
								item.linkname = this.cardScanningValue.cusItem.name/*申请人姓名*/
								item.linksex = this.cardScanningValue.cusItem.gender=='1'?false:true/*出险人性别*/
								item.data = this.cardScanningValue.cusItem.valid_date/*申请人证件有效期止期*/
								item.bnfidvalidstartdate = this.cardScanningValue.cusItem.idStaDate/*申请人证件有效期起期*/
								item.code = this.cardScanningValue.cusItem.id_card_number/*出险人证件号码*/
								this.guohuimianimg = this.cardScanningValue.cusItem.guohuimianimg
								this.renxiangmianimg = this.cardScanningValue.cusItem.renxiangmianimg
							}
							alert_n22.confirm('提示', '是否带入联系地址', '确定', '取消', (flag) => {
								item.detailAddress = this.cardScanningValue.cusItem.address/*联系地址*/
								this.$set(this.ContactsList,index,item)
							})
							this.$set(this.ContactsList,index,item)
						})
					}
				},
				deep:true
			},
			'occupationValue.isopen': {/*职业组件*/
				handler(val) {
					console.log(this.contKey)
					console.log(this.occupationValue.isopen)
					if(this.occupationValue.isopen == false){
						if(this.contKey != 666){
							this.ContactsList.forEach( (item,index) => {
								if(item.key == this.contKey){
									console.log(this.occupationValue.occItem.code)
									item.Occupation = this.occupationValue.occItem.descr
									this.$set(this.ContactsList,index,item)
								}
							})
						}else{
							this.User.Occupation = this.occupationValue.occItem.descr
						}
					}
				},
				deep:true
			}
		}
	}
</script>

<style scoped>
.sel-detail-user::-webkit-scrollbar,
.set-user-container::-webkit-scrollbar,
.sel-detail-user>div:nth-child(1)::-webkit-scrollbar {
	display:none
}
.set-user-container .rem07{
	font-size:.7rem!important;
}
.sel-detail-user>div:nth-child(1){
	position: fixed;
	overflow: hidden;
	width: 100%;
}
.sel-detail-user .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sel-detail-user .flex-end{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-right: 0!important;
}
.sel-detail-user .fa-calendar{
	font-size:1.2rem;
}
.sel-detail-user input[type='text']{
	text-align: right!important;
	min-height:1.8rem;
}
.sel-detail-user input{
	font-size:.7rem!important;
}
.sel-user-top{
	width:100%!important;
	padding:0 .7rem;
	height:2.2rem;
	background:#F8F8F8;
	box-sizing: border-box;
	border-bottom:2px solid #DDDDDD!important;
	/*border-top:2px solid #DDDDDD!important;*/
}
.feb101{
	color:#feb101;
}
.sel-user-top>img,
.sel-user-top>p>img{
	height:1rem;
	width:1rem;
}
.sel-cx-user{
	margin:0 auto;
}
.sel-cx-user>.flex{
	width: 85%;
	margin:0 auto;
}
.sel-cx-user>div{
	border-bottom:2px dotted #CECECE;
	min-height: 2.2rem;
	padding:0 10px;
}
.sel-detail-user .sel-div-last{
	margin-top:1rem;
	display: flex;
	justify-content: center;
	border:none;
}
.sel-detail-user .sel-div-last>button{
	background: #feb101;
	color:#fff;
	outline: none;
	border:none;
	height:2rem;
	width:8rem;
	margin-bottom:1rem;
	border-radius: 5px;
}
.sel-cx-user p{
	font-size: .8rem;
}
.sel-detail-user>div>div:last-child>button:active{
	opacity: .8;
}
.mint-msgbox-content{
	display: flex;
}
.mint-msgbox .mint-msgbox-message{
	width:100px;
}
.mint-msgbox-input{
	flex:1;
}
.mint-msgbox-input input{
	max-width:150px;
}
.mint-msgbox-message{
	width:80%!important;
}
.ocr-active {
	color: #FFAB00!important;
}
.ocr-none {
	color: #ccc!important;
}
.module-div{
	position:fixed;
	background:rgba(0,0,0,0.3);
	width:20rem;
	height:100%;
	top:0;
	left:0;
	z-index:1000
}
.module-div>div{
	background:#fff;
	width:80%;
	height:8rem;
	top:11rem;
	position:absolute;
	left:10%;
	border-radius: 10px;
}
.module-div>div>p:nth-child(1){
	background: #042C74;
	color:#fff;
	height:2.2rem;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	text-align:center;
	line-height: 2.2rem;
	font-size:.8rem;
}
.module-div>div>p:nth-child(2){
	display: flex;
	width:80%;
	margin:.5rem auto;
	align-items: center;
}
.module-div>div>p:nth-child(2)>span{
	width:40%;
}
.module-div>div>p:nth-child(2)>input{
	width:100%;
	border:1px solid #ccc;
	border-radius: 5px;
	height:1.2rem;
	text-align:left!important;
	padding-left:5px;
}
.module-div>div>button{
	display: block;
	background: #042C74;
	color:#fff;
	width:4rem;
	height:2rem;
	border:none;
	border-radius: 5px;
	margin: 1rem auto;
}
.sel-detail-user input[type='text']:disabled,
.sel-detail-user textarea:disabled{
	background: #fff!important;
	color: rgba(0,0,0,1)!important;
	opacity: 1!important;
}
.photo {
	display: block;
	width: 100%;
	line-height: 45px;
	border: 0;
	background: #fff;
}
.upload-img .set-btn-data{
	border:none;
	background: #feb101;
	color: #fff;
	width:8rem;
	border-radius: 5px;
	height:2.2rem;
}
</style>