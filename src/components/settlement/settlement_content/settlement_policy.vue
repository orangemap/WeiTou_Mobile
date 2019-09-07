<template>
	<div class='policy-data'>
      <div class='sel-tel-title flex header-1'>
         <p v-for='item in TitleList' :class="[item.active?'active':'']" style='font-size:.8rem'>
            {{item.text}}
         </p>
      </div>
      <div class='poliy-data-container'>
         <p class='user-top-p'>保险事故信息</p>
         <div class='policy-data-detail'>
            <div class='flex'>
               <p>事故日期</p>
               <date-picker v-model="AccidentData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
            </div>
            <div class='flex'>
               <p>事故地点</p>
               <div style='display: flex;width:78%;justify-content: flex-end;'>
                  <n22-code @ChildMsg='getChildCode' :codes='newCodes' :dft='codeActive'  ref='n22_code'></n22-code>
                  <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;width:16px;height:16px;'></i>
               </div>
            </div>
            <div class='flex'>
               <p style='min-width: 60px;'>详细地址</p>
               <textarea placeholder='请您输入出险详细地址' v-model='AccidentAddress' style='width: 80%;padding:2px 2px 2px 10px;border: none;height:30px;text-align: right;color:#333;font-size: .75rem!important' maxlength="30"></textarea>
            </div>
            <div>
               <div style='display: flex;justify-content: space-between;'>
                  <p style='min-width: 4rem;padding-top:.65rem'>所患疾病</p>
                  <div style='flex:1;display: flex;flex-wrap: wrap;'>
                     <div v-for='(item,index) in diseases' class='flex-end' style='width:100%'>
                        <label class='flex-end dise-input' style='flex:1'>
                           <picker v-model="item.code" code="code" :items="diseaseList" :values='item.code' @change='disaseChange'></picker>&nbsp;&nbsp;
                           <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
                        </label>
                        <img :src='item.url' style='width:1rem;height:1rem' @click='addDisease(index)'/>
                     </div>
                  </div>
               </div>
            </div>
            <div class='flex'>
               <p>出险原因</p>
               <label style='width:50%;margin-right:1.8rem' class='flex-end'>
                  <picker v-model="reason" code="code" :items="reasonList" :values='reason'></picker>&nbsp;&nbsp;
                  <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
               </label>
            </div>
            <div class='flex'>
               <p>治疗医院</p>
               <input type="text" placeholder='请输入就诊医院' style='text-align:right' v-model='Hospital' maxlength="30" />
            </div>
            <div class='flex'>
               <p>目前状况</p>
               <label style='width:50%;margin-right:1.8rem' class='flex-end'>
                  <picker v-model="situation" code="code" :items="situationList" :values='situation'></picker>&nbsp;&nbsp;
                  <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
               </label>
            </div>
            <div class='last-div' style='padding-bottom:10px!important'>
               <span style='position:relative;'>
                  <p>事故经过</p>
                  <p class="fa fa-microphone" aria-hidden="true" style='color:#feb101;position:absolute;bottom:0;left:36%;font-size:2rem' @click='speechRec(1)'></p>
               </span>
               <textarea placeholder="实例：因意外摔伤/疾病出险，就诊于XX医院，目前已治疗结束/正在接受治疗。" style='height:4rem;padding:5px;flex:1;margin-left:1rem;font-size:.8rem!important;border-radius: 3px;border:1px solid #A4A4A4' v-model='detailsText' maxlength="200" ></textarea>

            </div>
            <div class='last-div' style='flex-wrap: wrap;'>
               <p>出险类型</p>
               <div>
                  <p v-for='(item,index) in PolicyType' :key='index' @click='getPolicyType(item,index)' :class="[item.active?'active-btn':'']" v-show='item.show'>
                     {{item.text}}
                  </p>
               </div>
               <p v-show='policyTitle' style='margin-bottom: 5px;color:red;line-height: 20px;'>当客户保单中没有以上提供给您的保险责任类型时，例如轻症大病保险金或癌症保险金，您可以选择“其他”类型。</p>
            </div>
            <div class='flex' v-for='item in PolicyType' v-if='item.active'>
               <p style='width:50%'>{{item.text}}出险日期</p>
               <date-picker v-model="item.date" style="width:50%;display:inline-block;text-align:right;float: right;"></date-picker>
            </div>
            <div class='flex' v-if='isyShow'>
               <p>入院日期</p>
               <date-picker v-model="EnterYData"  style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
            </div>
            <div class='flex' v-if='isyShow'>
               <p>出院日期</p>
               <date-picker v-model="OutYData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
            </div>
            <p style='margin:10px 0'>
               <label class='is-ok'>
                  <input type="checkbox" v-model="isOk" />
                  <span :class="[isOk==true?'feb101':'']">我确认录入的出险信息属实，知晓并了解故意伪造证明材料属于违法行为，需承担法律责任。</span>
               </label>
            </p>
            <p><Alert ref="showalert"></Alert></p>
            <div>
               <button @click='Next'>下一步</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import {mapState,mapMutations} from 'vuex'
   import store from '@/vuex/settlement/index.js'
   import datePicker from '@/components/common/DatePicker.vue'
   import picker from '@/components/common/Picker.vue'
   import Alert from '@/components/policy/common/alert'
   import N22Code from '@/components/common/code'
   import Setcode from '@/../static/dict/settlement_code.js'
   import myaddress from '@/../static/dict/pre_code.json'
   export default {
      components:{datePicker,picker,Alert,N22Code},
      data() {
         return {
            newData:new Date(),
            TitleList:[
            {key:'1',text:'出险信息',active:true,url:'/settlement_user/1'},
            {key:'2',text:'出险人信息',active:false,url:'/settlement/settlement_content/settlement_policy'},
            {key:'3',text:'资料上传',active:false,url:'/settlement/settlement_user'},
            {key:'4',text:'信息确认',active:false,url:'/settlement/settlement_upload'},
            ],
            Policy1Type:[
            {key:'100',text:'意外医疗',active:false,date:'请选择',show:false,type:'1'},
            {key:'101',text:'意外伤残',active:false,date:'请选择',show:false,type:'1'},
            {key:'102',text:'意外身故',active:false,date:'请选择',show:false,type:'1'},
            {key:'103',text:'意外高度残疾',active:false,date:'请选择',show:false,type:'1'},
            {key:'104',text:'意外重大疾病',active:false,date:'请选择',show:false,type:'1'},
            {key:'105',text:'意外其他',active:false,date:'请选择',show:false,type:'1'},
            // {key:'106',text:'意外失业失能',active:false,date:'请选择',show:false,type:'1'},
            {key:'107',text:'意外津贴',active:false,date:'请选择',show:false,type:'1'},
            {key:'109',text:'意外豁免',active:false,date:'请选择',show:false,type:'1'},
            {key:'200',text:'疾病医疗',active:false,date:'请选择',show:false,type:'2'},
            {key:'201',text:'疾病伤残',active:false,date:'请选择',show:false,type:'2'},
            {key:'202',text:'疾病身故',active:false,date:'请选择',show:false,type:'2'},
            {key:'203',text:'疾病高度残疾',active:false,date:'请选择',show:false,type:'2'},
             {key:'204',text:'疾病重大疾病',active:false,date:'请选择',show:false,type:'2'},
            {key:'205',text:'疾病其他',active:false,date:'请选择',show:false,type:'2'},
            // {key:'206',text:'疾病失业失能',active:false,date:'请选择',show:false,type:'2'},
            {key:'207',text:'疾病津贴',active:false,date:'请选择',show:false,type:'2'},
            {key:'209',text:'疾病豁免',active:false,date:'请选择',show:false,type:'2'}
            ],
            PolicyType:[],
            reasonList:[
            {code:'2',text:'疾病'},
            {code:'1',text:'意外'}
            ],
            situationList:[
            {code:'02',text:'治疗中'},
            {code:'03',text:'治疗结束'},
            {code:'05',text:'残疾（失能）'},
            {code:'06',text:'身故'}
            ],
            claimId:'',/*后台返回id*/
            reason:'',/*出险原因*/
            situation:'',/*目前状况*/
            Hospital:'',/*出诊医院*/
            AccidentData:'请选择',/*事故日期*/
            AccidentAddress:'',/*事故地点*/
            OutData:'请选择',/*出险日期*/
            detailsText:'',/*事故经过*/
            isOk:false,/*是否阅读*/
            EnterYData:'请选择',/*入院日期*/
            OutYData:'请选择',/*出院日期*/
            isyShow:false,/*是否显示出院入院时间*/
            disease:'',/*所患疾病*/ 
            diseaseList:[],/*所患疾病Code*/
            diseases:[
            {key:0,code:'',url:'static/img/settlement/add.png'}
            ],/*选中的所患疾病list*/
            newCodes:{
               accidentprovince:'北京市',
               accidentcity:'市辖区',
               accidentcounty:'东城区'
            },
            getData:{},/*存储请求出险类型的数据*/
            accidentMode:[],/*返回的 选中的出险类型*/
            codeActive:false,
            policyTitle:false,
            hordername:''/*投保人姓名*/
         }
      },
      created(){
         this.diseaseList = Setcode
      },
      computed: {
         ...mapState(['policyState','VuxPolicyType','policyData','policyCode','policyData','customerName'])
      },store,
      mounted() {
         console.log(this.$route.params)
         console.log('66666666',this.policyData)
         this.SetPolicyState(1)
         this.getInitData()
         console.log('赔案----------------------->')
         console.log('出险人信息',this.policyData)
         console.log(this.policyCode)
         if(this.$route.params.claimId == 'new'){
            console.log()
            this.getCustomerType(this.policyData)
         }
         console.log($('.v-header').outerHeight(true))
         $('.header-1').css('top',$('.v-header').outerHeight(true)+'px')
         $('.policy-data').css('height',this.media.container(this.screenHeight,0)+'px').css('overflow','hidden')
         $('.poliy-data-container').height($('.policy-data').outerHeight(true)-40+'px').css('overflow-y','scroll').css('margin-top',$('.header-1').outerHeight(true)+'px')
         console.log(this.codeText('110000','110100','110105'))
         console.log(myaddress)
      },
      methods: {
         ...mapMutations(['SetPolicyState','SetPolictType','SetpolicyCode','SetpolicyData']),
         Aleart(message) {
            this.$refs.showalert.showMOdal(message)
         },
         codeText(code1,code2,code3) {//取
            let arr = []
            myaddress.forEach( item => {
               if( code1 == item.code){
                  arr[0] = item.name
                  item.children.forEach( tpl => {
                     if(code2 == tpl.code){
                        arr[1] = tpl.name
                     }
                     tpl.children.forEach( cpl => {
                        if(code3 == cpl.code){
                           arr[2] = cpl.name
                        }
                     })
                  })
               }
            })
            return arr;
         },
         textCode(text1,text2,text3) {//存
            let arr = []
            myaddress.forEach( item => {
               if( text1 == item.name){
                  arr[0] = item.code
                  item.children.forEach( tpl => {
                     if(text2 == tpl.name){
                        arr[1] = tpl.code
                     }
                     tpl.children.forEach( cpl => {
                        if(text3 == cpl.name){
                           arr[2] = cpl.code
                        }
                     })
                  })
               }
            })
            return arr;
         },
         addDisease(id) {/*添加所患疾病*/
            console.log(id)
            console.log(this.diseases)
            let isAdd = false
            if(id == 0){
               this.diseases.forEach( item => {
                  if(item.code === ''){
                     isAdd = true
                  }
               })
               if(isAdd === true && this.diseases.length>0){
                  this.Aleart('请您选择被保险人因何种疾病进行的治疗。')
                  return false;
               }else if(this.diseases.length<3){
                  let isNo = true
                  this.diseases.forEach( tpl => {
                     if(tpl.code === 'zd0062'){
                        isNo = false
                     }
                  })
                  if(isNo === true){
                     let newObject = {
                        code:'',
                        url:'static/img/settlement/delete.png',
                        key:this.diseases.length
                     }
                     this.diseases.push(newObject)
                  }else{
                     this.Aleart('所患疾病为以上均没有，不能添加疾病。')
                     return false;
                  }
               }else {
                  this.Aleart('所患疾病最多为三种')
               }
            }else {
               this.diseases.forEach( (item,index)=> {
                  if(index == id){
                     this.diseases.splice(index,1)
                  }
               })
            }
         },
         getPolicyType(item,key) {
            if(item.active && (item.key == '200' || item.key == '100')){
               this.EnterYData = '请选择'/*入院日期*/
               this.OutYData = '请选择'/*出院日期*/
            }
            this.PolicyType[key].active = !this.PolicyType[key].active
         },
         speechRec(index,count) {
            MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc) => {
               this.detailsText = callbackSucc.result
            }, (callbackFail) => {
               this.showMsg(callbackFail)
            });
         },
         getChildCode(msg){
            console.log(msg)
            this.newCodes.accidentprovince = msg.accidentprovince
            this.newCodes.accidentcity = msg.accidentcity
            this.newCodes.accidentcounty = msg.accidentcounty
         },
         disaseChange() {
            this.diseases.forEach( item => {
               console.log(item.code)
            })
         },
         Next(){
            console.log('地址----->>>',this.newCodes)
            console.log(this.AccidentData)
            let codeArr = this.textCode(this.newCodes.accidentprovince,this.newCodes.accidentcity,this.newCodes.accidentcounty)
            let AleartText = ''
            let diseasesText = ''
            let nullDiseases = false
            console.log(this.diseases)
            this.diseases.forEach( item => {
               if(item.code != ''){
                  diseasesText += item.code+','
               }
            })
            this.diseases.forEach( tpl => {
               if(tpl.code == ''){
                  nullDiseases = true
               }
            })
            if(diseasesText != ''){
               diseasesText = diseasesText.substr(0,diseasesText.length-1)
            }
            if(diseasesText == '' || nullDiseases == true){
               AleartText = '所患疾病不能为空。'
            }
            let is59 = false
            if(this.diseases.length>1){
               this.diseases.forEach( item => {
                  if(item.code === 'zd0062'){
                     is59 = true
                  }
               })
            }
            if(is59){
               AleartText = '所患疾病填选错误。'
            }
            console.log(AleartText)
            let res = {} // 结果
            this.diseases.forEach(item => {
               if(!res[item.code]) {
                  res[item.code] = {
                     key: item.code,
                     len: 1
                  }
               } else {
                  res[item.code].len++;
               }
            })
            res = Object.values(res);/*所患疾病是否填选重复*/
            let month = new Date().getMonth()+1
            if(month<=9){
               month = '0'+month
            }
            let day = new Date().getDate()
            if(day<=9){
               day = '0'+day
            }
            let newData = new Date().getFullYear()+'-'+month+'-'+day
            console.log(this.AccidentData)
            console.log(newData)
            console.log('事故日期是否大于今天--->>>',this.AccidentData>newData)
            console.log(this.isOk)
            let Zyuan = ''
            let Cyuan = ''
            if(this.AccidentData=='请选择'){
               AleartText = '事故日期不能为空。'
            }else if(this.AccidentData>newData){
               AleartText = '事故日期不能晚于今天。'
            }else  if(this.AccidentAddress.length<5){
               AleartText = '详细地址至少输入5个文字。'
            }else if(this.reason == ''){
               AleartText = '出险原因不能为空。'
            }else if(this.Hospital.length<4){
               AleartText = '治疗医院至少输入4个文字。'
            }else if(this.situation == ''){
               AleartText = '目前状况不能为空。'
            }else if(this.detailsText.length<10){
               AleartText = '事故经过至少输入10个文字。'
            }else if(this.isOk == false){
               AleartText = '请确认出险信息是否属实。'
            }else if(this.isyShow == true){
               if(this.EnterYData == '请选择'){
                  AleartText = '入院日期不能为空。'
               }else if(this.OutYData == '请选择'){
                  AleartText = '出院日期不能为空。'
               }
            }
            res.forEach( item => {
               if(item.len>1){
                  AleartText = '所患疾病不能重复填选'
               }
            })

            if(this.EnterYData == '请选择'){
               Zyuan = ''
            }else{
               Zyuan = this.EnterYData
            }
            if(this.OutYData == '请选择'){
               Cyuan = ''
            }else{
               Cyuan = this.OutYData
            }
            let Num = 0

            this.PolicyType.map( v=> {
               if(v.active == true){
                  if(v.date == '请选择'){
                     AleartText = v.text+'出险日期不能为空。'
                  }else if(v.date<this.AccidentData){
                     AleartText = v.text+'出险日期不能早于事故日期。'
                  }else if(v.date>utils.valid.InitDate(new Date())){
                     AleartText = v.text+'出险日期不能晚于当前日期。'
                  }
               }else{
                  Num+=1
               }
            })
            console.log(Num)
            console.log(this.PolicyType)
            if(Num == this.PolicyType.length){
               AleartText = '出险类型不能为空。'
            }
            let activeArr = []
            this.PolicyType.forEach( item => {
               if(item.active){
                  activeArr.push(item)
               }
            })
            activeArr.forEach( item => {
               if(item.key == '209' || item.key == '109'){
                  if(activeArr.length<=1){
                     if(item.key == '209'){
                        AleartText = '出险类型为疾病豁免时，不能单独选择。'
                     }else if(item.key == '109'){
                        AleartText = '出险类型为意外豁免时，不能单独选择。'
                     }
                  }
               }
               if(item.key == '100' || item.key == '200'){
                  if(item.active == false){
                     this.OutYData = ''
                     this.EnterYData = ''
                  }
               }
            })
            if(AleartText !== ''){
               this.Aleart(AleartText)
               return false;
            }else if(this.EnterYData != undefined && this.EnterYData != '请选择' && this.OutYData != undefined && this.OutYData != '请选择' &&this.EnterYData>this.OutYData){
               this.Aleart('出院日期不应晚于入院日期。')
               return false;
            }else if(this.EnterYData != undefined && this.EnterYData != '请选择' && this.OutYData != undefined && this.OutYData != '请选择' && (this.EnterYData>utils.valid.InitDate(new Date()))){
               this.Aleart('出院日期不能晚于当前日期。')
               return false;
            }else if(this.EnterYData != undefined && this.EnterYData != '请选择' && this.OutYData != undefined && this.OutYData != '请选择'&& (this.OutYData>utils.valid.InitDate(new Date()))){
               this.Aleart('住院日期不能晚于当前日期。')
               return false;
            }else if (codeArr.length!=3){
               this.Aleart('事故地址错误，请从新选择。')
               return false;
            }else{
               console.log('数据正常')
               console.log('报案号-------->>>',this.$route.params.claimId)
               console.log(this.policyData)
               this.SetPolicyState('2')
               let accidentmode = []
               console.log(this.PolicyType)
               console.log(this.reason)
               this.PolicyType.forEach( item => {
                  let newObject = {
                     acrossdate:item.date=='请选择'?'':item.date,
                     reasoncode:item.key,
                     isselected:item.active == true?'1':'0'/*0未选,1已选*/
                  }
                  accidentmode.push(newObject)
               })
               console.log('请求报文的出险类型',accidentmode)
               console.log('出险信息分步保存，出险人信息数据->',this.policyData);
               console.log(codeArr)
               let requ = {
                  data: {
                     accidentInfo: {
                        accidentaddress: this.AccidentAddress,/*事故地址*/
                        accidentcity: codeArr[1],/*市*/
                        accidentcounty: codeArr[2],/*区*/
                        accidentdate: this.AccidentData,/*事故日期*/
                        accidentdesc: this.detailsText,/*事故经过*/
                        accidentprovince: codeArr[0],/*省*/
                        accidenttype: this.reason,/*出险原因*/
                        accidentmode:accidentmode,/*出险类型*/
                        disease: diseasesText,/*所患疾病*/
                        entrydate: Zyuan?Zyuan:'',/*入院日期*/
                        exitdate: Cyuan?Cyuan:'',/*出院日期*/
                        hospital: this.Hospital,/*事故医院*/
                        situation: this.situation,/*目前状况*/
                        horderName:this.hordername?this.hordername:this.customerName/*出险人姓名*/
                     },
                     insured: {/*出险人信息*/
                        insuredidno: this.policyData.customerIDNo,/*出险人证件号码*/
                        insuredidtype: this.policyData.customerIDType,/*出险人证件类型*/
                        insuredbirthday: this.policyData.customerBirthDay,/*出险人生日*/
                        insuredsex: this.policyData.customerSex,/*出险人性别*/
                        insuredname: this.policyData.customerName,/*出险人姓名*/
                        insurednation:this.policyData.customerNative,/*出险人国籍*/
                        insuredidexpdate:this.policyData.customerIDExpDate,/*证件有效期止期*/
                        insuredprofess:this.policyData.customerOccupation,/*出险人职业*/
                        insuredidvalidate:this.policyData.customerIDStartDate?this.policyData.customerIDStartDate:'',/*证件有效期起期*/
                        insuredmobile:this.policyData.mobilecode?this.policyData.mobilecode:'',/*手机号*/
                        insuredaddress:this.policyData.insuredaddress?this.policyData.insuredaddress:'',/*联系地址*/

                     },
                     claimType:"1",/*报案0,理赔1*/
                     relation:this.policyData.relation,/*被保人与投保人关系*/
                     agentCode:utils.cache.get('personsal').agentCode,
                     claimId:this.claimId==''?'':this.claimId,
                     claimStep:"1"
                  },
                  modelName: "claimService",
                  methodName: "saveCliamInformation"
               }
               console.log('分步保存1------------>>>',requ)
               utils.http.postFast('CusbusinessService',requ,(body,header) => {
                  console.log('分步保存1------------>>>body',body)
                  console.log('分步保存1------------>>>header',header)
                  if(body.data.code == 0){
                     this.SetPolictType(this.PolicyType)
                     this.SetpolicyCode(body.data.claimId)
                     let str = this.claimId==''?body.data.claimId:this.claimId
                     this.$router.push('/settlement_content/settlement_user/'+str)
                  }else{
                     this.Aleart(body.data.msg)
                  }
               })
            }
         },
         getInitData(){
            console.log(this.$route.params)
            if(this.$route.params.claimId.length>5){//判断是否请求接口
               let requ = {}
               if(this.$route.params.type == 'end'){
                  requ = {//从已报案列表进的
                     "data": {
                        "claimNo":this.$route.params.claimId,
                        "claimType":'0',/*报案0,理赔1*/
                        "step":"1"
                     },
                     "modelName": "claimService",
                     "methodName": "getClaimInfo"
                  }
               }else if(this.$route.params.type == 'start'){
                  requ = {//从赔案出险人信息返回的
                     "data": {
                        "claimId":this.$route.params.claimId,
                        "claimType":'1',/*报案0,理赔1*/
                        "step":"1"
                     },
                     "modelName": "claimService",
                     "methodName": "getClaimInfo"
                  }
               }
               utils.http.postFast('CusbusinessService',requ,(body,header) => {
                  console.log('分步获取1------------>>>',body)
                  if(body.data.code == 0){
                     this.claimId = body.data.claim.claimId
                     let data = body.data.claim.accidentInfo
                     let insured = body.data.claim.insured
                     this.hordername = data.hordername//投保人姓名
                     this.AccidentData = data.accidentdate/*事故日期*/
                     this.AccidentAddress = data.accidentaddress/*事故地点*/
                     this.reason = data.accidenttype/*出险原因*/
                     this.detailsText = data.accidentdesc/*事故经过*/
                     this.Hospital = data.hospital/*治疗医院*/
                     if(data.situation!= '01' && data.situation != '04'){
                        this.situation = data.situation/*目前状况*/
                     }else{
                        this.situation = ''
                     }
                     this.EnterYData = data.entrydate/*入院日期*/
                     this.OutYData = data.exitdate/*出院日期*/
                     let newDisArr = []
                     let newDisArr2 = []
                     if(data.disease.indexOf(",") != -1 ){
                       newDisArr = data.disease.split(',')
                    }else{
                     newDisArr = [data.disease]
                  }
                  newDisArr.forEach( (item,index) => {
                     let newObject = {
                        key:index,
                        code:item,
                        url:index==0?'static/img/settlement/add.png':'static/img/settlement/delete.png'
                     }
                     newDisArr2.push(newObject)
                  })
                  console.log(newDisArr)
                  console.log(newDisArr2)
                  this.diseases = newDisArr2
                  let newCodeArr = this.codeText(data.accidentprovince,data.accidentcity,data.accidentcounty)
                  console.log(newCodeArr)
                  this.newCodes.accidentprovince = newCodeArr[0]/*省*/
                  this.newCodes.accidentcity = newCodeArr[1]/*市*/
                  this.newCodes.accidentcounty = newCodeArr[2]/*区*/
                  this.$refs.n22_code.TextType = true
                  this.accidentMode = data.accidentMode/*返回的 选中的出险类型*/
                  let newInsured = {
                     customerIDNo:insured.insuredidno,/*出险人证件号码*/
                     customerIDType:insured.insuredidtype,/*出险人证件类型*/
                     customerBirthDay:insured.insuredbirthday,/*出险人生日*/
                     customerSex:insured.insuredsex,/*出险人性别*/
                     customerName:insured.insuredname,/*出险人姓名*/
                     customerNative:insured.insurednation,/*出险人国籍*/
                     customerIDStartDate:insured.insuredidvalidate,/*证件有效期起期*/
                     customerIDExpDate:insured.insuredidexpdate,/*出险人有效期止期*/
                     customerOccupation:insured.insuredprofess,/*职业*/
                     mobilecode:insured.insuredmobile,/*手机号*/
                     insuredaddress:insured.insuredaddress,/*联系地址*/

                  }
                  let policyList = data.accidentMode
                  policyList.forEach( item => {
                     this.Policy1Type.forEach( tpl => {
                        if(item.reasoncode == tpl.key){
                           item.text = tpl.text
                        }
                     })
                     let newObject = {
                        key:item.reasoncode,
                        text:item.text,
                        active:item.isselected=="1"?true:false,
                        date:item.acrossdate?item.acrossdate:''
                     }
                     this.PolicyType.push(newObject)
                  })
                  console.log(this.PolicyType)
                  this.SetpolicyData(newInsured)
                     // if(body.data.claim.insured){
                     //    this.getCustomerType(body.data.claim.insured)
                     // }
                  }else{
                     this.Aleart(body.data.msg)
                  }
                  this.$set(this.newCodes)
               })
            }else{
               console.log('第一次进')
            }
         },
         getCustomerType(data){
            let msg = {}
            if(data.customerName){
               msg = data
            }else{
               msg = {   
                  customerName:data.insuredname,
                  customerSex:data.insuredsex,
                  customerBirthDay:data.insuredbirthday,
                  customerIDType:data.insuredidtype,
                  customerIDNo:data.insuredidno
               }
            }
            let requ = { 
               data: msg,
               modelName: "claimService",
               methodName: "cliamInformation"
            }

            utils.http.postFast('CusbusinessService',requ,(body,header) => {
               console.log('出险类型接口----->>>',body)
               if(body.data.code == 0){
                  if(body.data.dutyKind){
                     let arr = body.data.dutyKind.split(',')
                     if(arr){
                        this.Policy1Type.forEach( item => {
                           arr.forEach(tpl => {
                              if(item.key == tpl){
                                 this.PolicyType.push(item)
                              }
                           })
                        })
                        console.log(this.PolicyType)
                     }
                  }
               }else{
                  this.Aleart(body.data.msg)
               }
            })
         },
      },
      watch:{
         isyShow(old){
            if(old == false){
               this.EnterYData = '请选择'/*入院日期*/
               this.OutYData = '请选择'/*出院日期*/
            }
         },
         PolicyType:{
            handler(val,old){
               console.log(old)
               let isShow = false
               let TextShow = false
               old.map( v =>{
                  if(v.active == false){
                     v.date = '请选择'
                  }else if(v.active){
                     if(v.key == '100' || v.key == '107' || v.key == '200' || v.key == '207'){
                        isShow = true
                     }
                     if(v.key == '105' || v.key == '205'){
                        TextShow = true
                     }
                  }
               })
               this.policyTitle = TextShow
               this.isyShow = isShow
            },
            deep:true
         },
         reason(old){
            console.log('拿到的所有出险类型--->>>',this.PolicyType)
            console.log(old)
            if(old == '2'){
               this.PolicyType.forEach( item => {
                  if(item.key<199){
                     item.show = false
                     item.acrossdate = ''
                     item.isselected = '0'
                     item.active = false
                  }else{
                     item.show = true
                  }
               })
            }else if(old == '1'){
               this.PolicyType.forEach( item => {
                  if(item.key>199){
                     item.show = false
                     item.acrossdate = ''
                     item.isselected = '0'
                     item.active = false
                  }else{
                     item.show = true
                  }
               })
            }
         }
      }
   };
</script>

<style>
.poliy-data-container::-webkit-scrollbar {
   display:none
}
.poliy-data-container>p:nth-child(1){
 color: #feb101;
 font-size: .8rem;
 padding-left: 10px;
 background: #F8F8F8;
 height:2.2rem;
 line-height: 2.2rem;
 border-bottom: 2px solid #DDDDDD;
}
.policy-data .flex{
 display: flex;
 justify-content: space-between;
 align-items: center;
}
.policy-data .flex-end{
 display: flex;
 justify-content: flex-end;
 align-items: center;
 margin-right:0!important;
}
.dise-input>input{
   max-width: 80%;
   flex:1;
}
.policy-data .flex-wp{
   display: flex;
   justify-content: flex-end;
   flex-wrap: wrap;
   align-items: center;
}
.policy-data .active-btn{
 background: #feb101!important;
 color: #fff!important;
 border: none!important;
 line-height: 1.5rem!important;
}
.policy-data-detail{
 width:95%;
 margin: 0 auto;
}
.policy-data-detail p{
 font-size:.8rem;
}
.policy-data-detail input{
   font-size:.7rem;
}
.policy-data-detail input[type='text']{
   min-height:2rem;
}
.policy-data-detail>div{
 min-height:2.2rem;
 border-bottom:2px dotted #CECECE;
 padding: 0 10px;
}
.policy-data-detail>.last-div{
 padding:10px .2rem 0 .7rem!important;
 display: flex;
}
.policy-data-detail>.last-div>div{
 padding-left:5px;
 flex:1;
 margin-left:1rem;
 display: flex;
 flex-wrap: wrap;
}
.policy-data-detail>.last-div>div>p{
 width:45%;
 margin-right:3%;
 text-align: center;
 height:1.5rem;
 margin-bottom:.5rem;
 border:1.5px solid #D1D0D1;
 box-sizing: border-box;
 line-height: 1.3rem;
 border-radius: 5px;
 color: #D1D0D1;
 font-size:.8rem;
}
.policy-data .is-ok{
   padding: 10px;
   line-height: 1rem;
   color: #A4A4A4;
   font-size: .7rem;
}
.policy-data-detail>div:last-child{
   display: flex;
   justify-content: center;
   border:none;
}
.policy-data-detail>div:last-child>button{
   background: #feb101;
   color:#fff;
   outline: none;
   border:none;
   height:2rem;
   width:8rem;
   margin-bottom:1rem;
   border-radius: 5px;
}
.policy-data-detail>div:last-child>button:active{
   opacity: .8;
}
.policy-data .fa-calendar{
   font-size:1.2rem;
}
.feb101{
   color: #feb101!important;
}
.policy-data-detail .mint-msgbox-message{
   width: 80%!important;
}
</style>