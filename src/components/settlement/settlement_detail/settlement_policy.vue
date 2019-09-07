<template>
	<div class='policy-data'>
		<p>保险事故信息</p>
      <div class='policy-data-detail'>
         <div class='flex'>
            <p>事故日期</p>
            <date-picker v-model="AccidentData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
         </div>
         <div class='flex'>
            <p>事故地点</p>
            <div style='display: flex;width:78%;justify-content: flex-end;'>
               <n22-code @ChildMsg='getChildCode' :codes='newCodes' :dft='codeActive' ref='n22_code'></n22-code>
               <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;width:16px;height:16px;'></i>
            </div>
         </div>
         <div class='flex'>
            <p>详细地址</p>
            <input type="text" placeholder='请您输入出险详细地址' style='text-align:right;width:75%' v-model='AccidentAddress' maxlength="30" />
         </div>
         <!-- <div class='flex'>
            <p>所患疾病</p>
            <input type="text" placeholder='请输入所患疾病' style='text-align:right' v-model='disease'maxlength="30"/>
         </div> -->
         <div class='flex'>
            <p>出险原因</p>
            <label style='width:50%;margin-right:1.8rem' class='flex-end'>
               <picker v-model="reason" code="code" :items="reasonList" :values='reason'></picker>&nbsp;&nbsp;
               <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
            </label>
         </div>
         <div class='flex'>
            <p>治疗医院</p>
            <input type="text" placeholder='请输入就诊医院' style='text-align:right;width:75%' v-model='Hospital' maxlength="30" />
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
            <textarea placeholder="实例：因意外摔伤/疾病出险，就诊于XX医院，目前已治疗结束/正在接受治疗。" style='height:4rem;padding:5px;flex:1;margin-left:1rem;font-size:.8rem;border-radius: 3px;border:1px solid #A4A4A4' v-model='detailsText' maxlength="200" ></textarea>

         </div>
         <div class='last-div'  style='flex-wrap: wrap;'>
            <p>出险类型</p>
            <div>
               <p v-for='(item,index) in PolicyType' :key='index' @click='getPolicyType(index)' :class="[item.active?'active-btn':'']" v-show='item.show'>
                  {{item.text}}
               </p>
            </div>
            <p v-show='policyTitle == true' style='margin-bottom: 5px;color:red;line-height: 20px;'>当客户保单中没有以上提供给您的保险责任类型时，例如轻症大病保险金或癌症保险金，您可以选择“其他”类型。</p>
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
</template>

<script>
   import {mapState,mapMutations} from 'vuex'
   import store from '@/vuex/settlement/index.js'
   import datePicker from '@/components/common/DatePicker.vue'
   import picker from '@/components/common/Picker.vue'
   import Alert from '@/components/policy/common/alert'
   import N22Code from '@/components/common/code'
   import myaddress from '@/../static/dict/pre_code.json'
   export default {
      components:{datePicker,picker,Alert,N22Code},
      data() {
         return {
            newData:new Date(),
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
            {code:'01',text:'门诊治疗中'},
            {code:'02',text:'住院治疗中'},
            {code:'03',text:'静休恢复中'},
            {code:'04',text:'痊愈'},
            {code:'05',text:'残疾'},
            {code:'06',text:'死亡'}
            ],
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
            newCodes:{
               accidentprovince:'',
               accidentcity:'',
               accidentcounty:''
            },
            getData:{},/*存储请求出险类型的数据*/
            accidentMode:[],/*返回的 选中的出险类型*/
            codeActive:false,
            policyTitle:false,
            hordername:''
         }
      },
      created(){
         console.log(2)
         //this.getInitData() //是否影响省市区三级联动
      },
      computed: {
         ...mapState(['policyState','VuxPolicyType','policyData','policyCode','policyData','customerName'])
      },store,
      mounted() {
         console.log(this.policyTitle)
         this.SetPolicyState(1)
         this.getInitData()
         console.log('出险人信息',this.policyData)
         console.log(this.policyCode)
         if(this.policyCode == 'new'){
            this.getCustomerType(this.policyData)
         }
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
            console.log('省：',text1,',市：',text2,',区县：',text3)
            myaddress.forEach( item => {
               if( text1 == item.name){
                  console.log(item)
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
         getPolicyType(key) {
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
            console.log(msg,'1')
            this.newCodes.accidentprovince = msg.accidentprovince
            this.newCodes.accidentcity = msg.accidentcity
            this.newCodes.accidentcounty = msg.accidentcounty
            console.log(this.newCodes)
         },
         Next(){
            console.log('地址----->>>',this.newCodes)
            let month = new Date().getMonth()+1
            if(month<=9){
               month = '0'+month
            }
            let day = new Date().getDate()
            if(day<=9){
               day = '0'+day
            }
            let newData = new Date().getFullYear()+'-'+month+'-'+day
            console.log('事故日期是否大于今天--->>>',this.AccidentData>newData)
            let AleartText = ''
            console.log(this.isOk)
            let Zyuan = ''
            let Cyuan = ''
            if(this.AccidentData=='请选择'){
               AleartText = '事故日期不能为空。'
            }
            if(this.AccidentData>newData){
               AleartText = '事故日期不能晚于今天。'
            }else if(this.AccidentAddress.length<5){
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
               if(this.EnterYData == '请选择' || this.EnterYData == '' || this.EnterYData == undefined){
                  AleartText = '入院日期不能为空。'
               }else if(this.OutYData == '请选择' || this.OutYData == '' || this.OutYData == undefined){
                  AleartText = '出院日期不能为空。'
               }
            }
            // console.log(this.AccidentData)
            // console.log(newData)
            // return false;
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
            })
            if(this.newCodes.accidentcity == undefined || this.newCodes.accidentcounty == undefined || this.newCodes.accidentprovince == undefined){
               AleartText = '请选择事故地点。'
            }
            let codeArr = this.textCode(this.newCodes.accidentprovince,this.newCodes.accidentcity,this.newCodes.accidentcounty)
            if(AleartText !== ''){
               this.Aleart(AleartText)
               return false;
            }else if(this.EnterYData>this.OutYData){
               this.Aleart('出院日期不应晚于入院日期。')
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
                        disease: this.disease,/*所患疾病*/
                        entrydate: Zyuan,/*入院日期*/
                        exitdate: Cyuan,/*出院日期*/
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
                        insuredidexpdate:this.policyData.customerIDExpDate,/*证件有效期*/
                        insuredprofess:this.policyData.customerOccupation/*出险人职业*/
                     },
                     relation:this.policyData.relation,/*被保人与投保人关系*/
                     claimType:"0",/*报案0,理赔1*/
                     agentCode:utils.cache.get('personsal').agentCode,
                     claimId:this.$route.params.claimId=='new'?'':this.$route.params.claimId,
                     claimStep:"1"
                  },
                  modelName: "claimService",
                  methodName: "saveCliamInformation"
               }
               console.log('分步保存1------------>>>',requ)
               console.log(JSON.stringify(requ))
               utils.http.postFast('CusbusinessService',requ,(body,header) => {
                  console.log(body)
                  console.log(header)
                  if(body.data.code == 0){
                     this.SetPolictType(this.PolicyType)
                     this.SetpolicyCode(body.data.claimId)
                     let str = this.$route.params.claimId=='new'?body.data.claimId:this.$route.params.claimId
                     this.$router.push('/settlement_details/settlement_user/'+str)
                  }else{
                     this.Aleart(body.data.msg)
                  }
               })
            }
         },
         getInitData(){
            if(this.$route.params.claimId != 'new'){
               let requ = {
                  "data": {
                     "claimId":this.$route.params.claimId,
                     "claimType":"0",
                     "step":"1"
                  },
                  "modelName": "claimService",
                  "methodName": "getClaimInfo"
               }
               utils.http.postFast('CusbusinessService',requ,(body,header) => {
                  console.log('分步获取1------------>>>',body)
                  if(body.data.code == 0){
                     let data = body.data.claim.accidentInfo
                     let insured = body.data.claim.insured
                     this.hordername = data.hordername?data.hordername:''
                     this.AccidentData = data.accidentdate/*事故日期*/
                     this.AccidentAddress = data.accidentaddress/*事故地点*/
                     this.reason = data.accidenttype/*出险原因*/
                     this.detailsText = data.accidentdesc/*事故经过*/
                     this.Hospital = data.hospital/*治疗医院*/
                     this.situation = data.situation/*目前状况*/
                     this.EnterYData = data.entrydate/*入院日期*/
                     this.OutYData = data.exitdate/*出院日期*/
                     this.disease = data.disease/*所患疾病*/
                     let newCodeArr = this.codeText(data.accidentprovince,data.accidentcity,data.accidentcounty)
                     this.newCodes.accidentprovince = newCodeArr[0]/*省*/
                     this.newCodes.accidentcity = newCodeArr[1]/*市*/
                     this.newCodes.accidentcounty = newCodeArr[2]/*区*/
                     this.codeActive = true
                     this.$refs.n22_code.TextType = true
                     this.accidentMode = data.accidentMode/*返回的 选中的出险类型*/
                     let newInsured = {
                        customerIDNo:insured.insuredidno,/*出险人证件号码*/
                        customerIDType:insured.insuredidtype,/*出险人证件类型*/
                        customerBirthDay:insured.insuredbirthday,/*出险人生日*/
                        customerSex:insured.insuredsex,/*出险人性别*/
                        customerName:insured.insuredname,/*出险人姓名*/
                        customerNative:insured.insurednation,/*出险人国籍*/
                        customerIDExpDate:insured.insuredidexpdate/*出险人有效期止期*/
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
.policy-data>p:first-child{
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