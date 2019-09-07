<template>
  <div class='let-Message left-Message-2'>
    <div class="pickerContent my-index-picker">
      <p class="fontIcon">
        <i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
      </p>
      <div class="dateShow">
        <p>
          <year-picker :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
          </year-picker>年
        </p>
        <p>
          <year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
          </year-picker>月
        </p>
      </div>
      <p class="fontIcon">
        <i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true" @click='getDataMessage'></i>
      </p>
    </div>
    <div class='Formleft-div-div'>
      <div class='Formleft-div-top'>
        <p class='text-center bold'>考核结果</p>
        <h2 class='text-center bold' style='font-size:1.3rem!important;padding-top:10px;'>{{assessflag}}</h2>
      </div>
      <div class='flex Formleft-div-cnt'>
        <div>
          <p>考核期</p>
          <p>
            <b>{{QiTimeSlot}}</b>
            <span>至</span>
            <b>{{ZhiTimeSlot}}</b>
          </p>
        </div>
        <div>
          <p>职级起期</p>
          <p><b>{{startdate}}</b></p>
        </div>
        <div>
          <p>上期是否保级</p>
          <p><b>{{keepflag}}</b></p>
        </div>
      </div>
    </div>
    <!-- btm-list -->
    <ul class='ass-cnt-btm-list'>
      <li>
        <div class='flex'>
          <p>个险个人NPC</p>
          <div style='width:25%' class='flex'>
            <p :class="[Gractive2?'aaa':'green']">{{warning.perNPC.perNPC}}</p>
            <p @click='BtmListShow(12)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow12'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li12Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>
              {{warning.perNPC.perStand}}
            </p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.perNPC.perStand' :class="[warning.perNPC.perNPCCj=='0'?'aaa':'red']">
              {{warning.perNPC.perNPCCj}}
            </p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>综开业绩</p>
          <div style='width:25%' class='flex'>
            <p :class="[Zkactive2?'aaa':'green']">{{warning.zongAchit.grptoagentNPC}}</p>
            <p @click='BtmListShow(13)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow13'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li13Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.zongAchit.grpStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.zongAchit.grpStand' :class="[warning.zongAchit.grptoagentNPCCj=='0'?'aaa':'red']">{{warning.zongAchit.grptoagentNPCCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>个人业绩合计</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.myselfAchit.perNPCSumCj=='0'?'aaa':'green']">{{warning.myselfAchit.perNPCSum}}</p>
            <p @click='BtmListShow(14)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow14'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li14Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.myselfAchit.perNPCStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.myselfAchit.perNPCStand' :class="[warning.myselfAchit.perNPCSumCj=='0'?'aaa':'red']">{{warning.myselfAchit.perNPCSumCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>直辖组NPC</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.zuNPC.grpNPCCj=='0'?'aaa':'green']">{{warning.zuNPC.grpNPC}}</p>
            <p @click='BtmListShow(15)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow15'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li15Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.zuNPC.grpNPCStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.zuNPC.grpNPCStand' :class="[warning.zuNPC.grpNPCCj=='0'?'aaa':'red']">{{warning.zuNPC.grpNPCCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>直辖组有效人力</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.peopleOfGroup.grppowerCj=='0'?'aaa':'green']">{{warning.peopleOfGroup.grppower}}</p>
            <p @click='BtmListShow(16)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow16'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li16Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.peopleOfGroup.grppowerStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.peopleOfGroup.grppowerStand' :class="[warning.peopleOfGroup.grppowerCj=='0'?'aaa':'red']">{{warning.peopleOfGroup.grppowerCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>一代组育成</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.group.firstgrpCj=='0'?'aaa':'green']">{{warning.group.firstgrp}}</p>
            <p @click='BtmListShow(17)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow17'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li17Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.group.firstgrpStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.group.firstgrpStand' :class="[warning.group.firstgrpCj=='0'?'aaa':'red']">{{warning.group.firstgrpCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>直辖区NPC</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.areaNPC.deptNPCCj=='0'?'aaa':'green']">{{warning.areaNPC.deptNPC}}</p>
            <p @click='BtmListShow(18)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow18'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li18Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.areaNPC.deptNPCStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.areaNPC.deptNPCStand' :class="[warning.areaNPC.deptNPCCj=='0'?'aaa':'red']">{{warning.areaNPC.deptNPCCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>直辖区有效人力</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.peopleOfArea.deptpowerCj=='0'?'aaa':'green']">{{warning.peopleOfArea.deptpower}}</p>
            <p @click='BtmListShow(19)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow19'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li19Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.peopleOfArea.deptpowerStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.peopleOfArea.deptpowerStand' :class="[warning.peopleOfArea.deptpowerCj=='0'?'aaa':'red']">{{warning.peopleOfArea.deptpowerCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>一代区育成</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.area.firstdeptCj=='0'?'aaa':'green']">{{warning.area.firstdept}}</p>
            <p @click='BtmListShow(20)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow20'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li20Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.area.firstdeptStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.area.firstdeptStand' :class="[warning.area.firstdeptCj=='0'?'aaa':'red']">{{warning.area.firstdeptCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>继续率（百分比）</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.continuationRate.preconrateCj=='0'?'aaa':'green']">{{warning.continuationRate.preconrate}}</p>
            <p @click='BtmListShow(21)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow21'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto' v-show='Li21Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.continuationRate.preconrateStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.continuationRate.preconrateStand' :class="[warning.continuationRate.preconrateCj=='0'?'aaa':'red']">{{warning.continuationRate.preconrateCj}}</p>
          </li>
        </ul>
      </li>
      <li>
        <div class='flex'>
          <p>品质扣分</p>
          <div style='width:25%' class='flex'>
            <p :class="[warning.score.qualityScoreCj=='0'?'aaa':'green']">{{warning.score.qualityScore}}</p>
            <p @click='BtmListShow(22)'>
              <img src="./../../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow22'>
            </p>
          </div>
        </div>
        <ul style='width:55%!important;margin:0 auto'  v-show='Li22Show'>
          <li class='flex'>
            <p>考核标准</p>
            <p>{{warning.score.qualityScoreStand}}</p>
          </li>
          <li class='flex'>
            <p>差距</p>
            <p v-show='warning.score.qualityScoreStand' :class="[warning.score.qualityScoreCj=='0'?'aaa':'red']">{{warning.score.qualityScoreCj}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <Alert ref="showalert"></Alert>
  </div>  
</template>
<script>
  import yearPicker from '@/components/common/Picker.vue'
  import Alert from '@/components/policy/common/alert.vue'
  import { mapState,mapMutations } from 'vuex'
  import store from '@/vuex/comprehensive/comprehensive'
  export default {
    components: {yearPicker,Alert},
    data() {
      return {
        channel:'',
        agentCode:utils.cache.get('personsal').agentCode,
        yearList:[],/*年列表*/
        yearDate:"",/*查询年*/
        monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
        monthDate:"",/*查询月*/
        assessflag:'',/*考核结果*/
        startdate:'',/*职级起期*/
        keepflag:'',/*上期是否保级*/
        QiTimeSlot:'',/*考核期起*/
        ZhiTimeSlot:'',/*考核期止*/
        warning:{/*维持考核-个人预警*/
          perNPC:{/*个险个人NPC*/
            perNPC:'',/*指标达成*/
            perStand:'',/*考核标准*/
            perNPCCj:'',/*差距*/
          },
          zongAchit:{/*综开业绩*/
            grptoagentNPC:'',/*指标达成*/
            grpStand:'',/*考核标准*/
            grptoagentNPCCj:'',/*差距*/
          },
          myselfAchit:{/*个人业绩合计*/
            perNPCSum:'',/*指标达成*/
            perNPCStand:'',/*考核标准*/
            perNPCSumCj:'',/*差距*/
          },
          zuNPC:{/*直辖组NPC*/
            grpNPC:'',/*指标达成*/
            grpNPCStand:'',/*考核标准*/
            grpNPCCj:'',/*差距*/
          },
          peopleOfGroup:{/*直辖组有效人力*/
            grppower:'',/*指标达成*/
            grppowerStand:'',/*考核标准*/
            grppowerCj:'',/*差距*/
          },
          group:{/*一代组育成*/
            firstgrp:'',/*指标达成*/
            firstgrpStand:'',/*考核标准*/
            firstgrpCj:'',/*差距*/
          },
          areaNPC:{/*直辖区NPC*/
            deptNPC:'',/*指标达成*/
            deptNPCStand:'',/*考核标准*/
            deptNPCCj:'',/*差距*/
          },
          peopleOfArea:{/*直辖区有效人力*/
            deptpower:'',/*指标达成*/
            deptpowerStand:'',/*考核标准*/
            deptpowerCj:'',/*差距*/
          },
          area:{/*一代区育成*/
            firstdept:'',/*指标达成*/
            firstdeptStand:'',/*考核标准*/
            firstdeptCj:'',/*差距*/
          },
          continuationRate:{/*继续率（百分比）*/
            preconrate:'',/*指标达成*/
            preconrateStand:'',/*考核标准*/
            preconrateCj:'',/*差距*/
          },
          score:{/*品质扣分*/
            qualityScore:'',/*指标达成*/
            qualityScoreStand:'',/*考核标准*/
            qualityScoreCj:'',/*差距*/
          }
        },
        Li12Show:false,
        Li13Show:false,
        Li14Show:false,
        Li15Show:false,
        Li16Show:false,
        Li17Show:false,
        Li18Show:false,
        Li19Show:false,
        Li20Show:false,
        Li21Show:false,
        Li22Show:false,
        NewListShow:false,
        Gractive2:false,
        Zkactive2:false
      }
    },
    mounted(){
      this.channel = utils.cache.get('channel')
      this.yearDate=new Date().getFullYear() /*获取年数组*/
      let yearList1=[],yearList2=[]
      for(var i=this.yearDate-100; i<this.yearDate;i++){
        yearList1.push(i)
      }
      for(var i=this.yearDate; i<(this.yearDate)+100; i++){
        yearList2.push(i)
      }
      this.yearList=yearList1.concat(yearList2)
      /*console.log( "年数组",this.yearList)*/
      /*获取月*/
      if(this.MonthDate1){
        this.monthDate = this.MonthDate1
      }else{
        let month = (new Date().getMonth())+1
        if(month<=9){
          this.monthDate = '0'+month
        }else{
          this.monthDate = month+''
        } 
      }
      if(this.YearDate1){
        this.yearDate = this.YearDate1
      }else{
        this.yearDate=new Date().getFullYear() /*获取年数组*/
      }
      console.log(this.yearDate)
      console.log(this.monthDate)
      //this.getMessage('1100000006','2018','04','2')
      let year = this.yearDate.toString()
      this.getMessage(this.agentCode,year,this.monthDate,'2','1')
    },
    computed: {
      ...mapState(['YearDate1','MonthDate1'])
    },store,
    methods:{
      ...mapMutations(['SetYearDate','SetMonthDate']),
      showModals(message) {
        this.$refs.showalert.showMOdal(message)
      },
      BtmListShow(id){
        let Img;
        this.NewListShow = !this.NewListShow
        if(id == 12){
          this.Li12Show = this.NewListShow
          Img = this.$refs.ImgShow12 
        }
        if(id == 13){
          this.Li13Show = this.NewListShow
          Img = this.$refs.ImgShow13 
        }
        if(id == 14){
          this.Li14Show = this.NewListShow
          Img = this.$refs.ImgShow14 
        }
        if(id == 15){
          this.Li15Show = this.NewListShow
          Img = this.$refs.ImgShow15 
        }
        if(id == 16){
          this.Li16Show = this.NewListShow
          Img = this.$refs.ImgShow16 
        }
        if(id == 17){
          this.Li17Show = this.NewListShow
          Img = this.$refs.ImgShow17 
        }
        if(id == 18){
          this.Li18Show = this.NewListShow
          Img = this.$refs.ImgShow18 
        }
        if(id == 19){
          this.Li19Show = this.NewListShow
          Img = this.$refs.ImgShow19 
        }
        if(id == 20){
          this.Li20Show = this.NewListShow
          Img = this.$refs.ImgShow20 
        }
        if(id == 21){
          this.Li21Show = this.NewListShow
          Img = this.$refs.ImgShow21 
        }
        if(id == 22){
          this.Li22Show = this.NewListShow
          Img = this.$refs.ImgShow22 
        }
        if(this.NewListShow){
          Img.src = './static/img/comprehensive/top.png'
        }else{
          Img.src = './static/img/comprehensive/bottom.png'
        }
      },
      getMessage(agentCode,year,month,index,flag){
        let requ = {
          search:{
            "agentCode": agentCode, /*this.agentCode*/
            "channel": this.channel,
            "year":year,
            "month":month,
            "model":index,
            "flag":flag
          }
        }
        console.log('请求报文------->>>',requ)
        utils.http.postFast('ZHFORMALDETAILGX',requ,(body,header) => {
          console.log(header)
          let data = body.search
          this.yearDate = data.year
          this.monthDate = data.month
          if(header.resultCode == 0){
            console.log('数据正常')
            this.assessflag = data.promAssessment.assessflag/*考核结果*/
            console.log(this.assessflag)
            this.startdate = data.promAssessment.startdate.slice(0,10)/*职级起期*/
            if(data.promAssessment.keepflag == ''){/*上期是否保级*/
              this.keepflag = ' '
            }else{
              this.keepflag = data.promAssessment.keepflag
            }
            this.QiTimeSlot = data.promAssessment.timeSlot.split('|')[0]/*考核期起*/
            this.ZhiTimeSlot = data.promAssessment.timeSlot.split('|')[1]/*考核期至*/
            if(index == 2){
              /******************************个人预警******************************/
              /**********个险个人NPC**********/
              console.log('指标达成',data.promAssessment.warning.perNPC)
              this.warning.perNPC.perNPC = data.promAssessment.warning.perNPC.perNPC/*指标达成*/
              this.warning.perNPC.perStand = data.promAssessment.warning.perNPC.perStand/*考核标准*/
              /*差距*/
              if(data.promAssessment.warning.perNPC.perNPCCj == '0.00'){
                this.warning.perNPC.perNPCCj = '0'
              }else{
                this.warning.perNPC.perNPCCj = data.promAssessment.warning.perNPC.perNPCCj
              }
              if(data.promAssessment.warning.perNPC.perNPCCj == ''){
                this.Gractive2 = true
              }else{
                this.Gractive2 = false
              }
              console.log('个险个人NPC----->>>',this.warning.perNPC)
              /**********综开业绩**********/
              this.warning.zongAchit.grptoagentNPC = data.promAssessment.warning.zongAchit.grptoagentNPC/*指标达成*/
              this.warning.zongAchit.grpStand = data.promAssessment.warning.zongAchit.grpStand/*考核标准*/
              /*差距*/
              if(data.promAssessment.warning.zongAchit.grptoagentNPCCj == '0.00'){
                this.warning.zongAchit.grptoagentNPCCj = '0'
              }else{
                this.warning.zongAchit.grptoagentNPCCj = data.promAssessment.warning.zongAchit.grptoagentNPCCj
              }
              if(data.promAssessment.warning.zongAchit.grptoagentNPCCj == ''){
                this.Zkactive2 = true
              }else{
                this.Zkactive2 = false
              }
              console.log('综开业绩----->>>',this.warning.zongAchit)
              /**********个人业绩合计**********/
              this.warning.myselfAchit.perNPCSum = data.promAssessment.warning.myselfAchit.perNPCSum/*指标达成*/
              this.warning.myselfAchit.perNPCStand = data.promAssessment.warning.myselfAchit.perNPCStand/*考核标准*/
              if(data.promAssessment.warning.myselfAchit.perNPCSumCj == '0.00'){/*差距*/
                this.warning.myselfAchit.perNPCSumCj = '0'
              }else{
                this.warning.myselfAchit.perNPCSumCj = data.promAssessment.warning.myselfAchit.perNPCSumCj
              }
              console.log('个人业绩合计----->>>',this.warning.myselfAchit)
              /**********直辖组NPC**********/
              this.warning.zuNPC.grpNPC = data.promAssessment.warning.zuNPC.grpNPC/*指标达成*/
              this.warning.zuNPC.grpNPCStand = data.promAssessment.warning.zuNPC.grpNPCStand/*考核标准*/
              this.warning.zuNPC.grpNPCCj = data.promAssessment.warning.zuNPC.grpNPCCj/*差距*/
              if(data.promAssessment.warning.zuNPC.grpNPCCj == '0.00'){
                this.warning.zuNPC.grpNPCCj = '0'
              }
              console.log('直辖组NPC----->>>',this.warning.zuNPC)
              /**********直辖组有效人力**********/
              this.warning.peopleOfGroup.grppower = data.promAssessment.warning.peopleOfGroup.grppower/*指标达成*/
              this.warning.peopleOfGroup.grppowerStand = data.promAssessment.warning.peopleOfGroup.grppowerStand/*考核标准*/
              if(data.promAssessment.warning.peopleOfGroup.grppowerCj == '0.00'){/*差距*/
                this.warning.peopleOfGroup.grppowerCj = '0'
              }else{
                this.warning.peopleOfGroup.grppowerCj = data.promAssessment.warning.peopleOfGroup.grppowerCj
              }

              console.log('直辖组有效人力----->>>',this.warning.peopleOfGroup)
              /**********一代组育成**********/
              this.warning.group.firstgrp = data.promAssessment.warning.group.firstgrp/*指标达成*/
              this.warning.group.firstgrpStand = data.promAssessment.warning.group.firstgrpStand/*考核标准*/
              this.warning.group.firstgrpCj = data.promAssessment.warning.group.firstgrpCj/*差距*/
              if(data.promAssessment.warning.group.firstgrpCj == '0.00'){
                this.warning.group.firstgrpCj = '0'
              }
              console.log('一代组育成----->>>',this.warning.group)
              /**********直辖区NPC**********/
              this.warning.areaNPC.deptNPC = data.promAssessment.warning.areaNPC.deptNPC/*指标达成*/
              this.warning.areaNPC.deptNPCStand = data.promAssessment.warning.areaNPC.deptNPCStand/*考核标准*/
              if(data.promAssessment.warning.areaNPC.deptNPCCj == '0.00'){/*差距*/
                this.warning.areaNPC.deptNPCCj = '0'
              }else{
                this.warning.areaNPC.deptNPCCj = data.promAssessment.warning.areaNPC.deptNPCCj
              }

              console.log(data.promAssessment.warning.areaNPC.deptNPCCj)
              console.log('直辖区NPC----->>>',this.warning.areaNPC)
              /**********直辖区有效人力**********/
              this.warning.peopleOfArea.deptpower = data.promAssessment.warning.peopleOfArea.deptpower/*指标达成*/
              this.warning.peopleOfArea.deptpowerStand = data.promAssessment.warning.peopleOfArea.deptpowerStand/*考核标准*/
              if(data.promAssessment.warning.peopleOfArea.deptpowerCj == '0.00'){/*差距*/
                this.warning.peopleOfArea.deptpowerCj = '0'
              }else{
                this.warning.peopleOfArea.deptpowerCj = data.promAssessment.warning.peopleOfArea.deptpowerCj
              }

              console.log('直辖区有效人力----->>>',this.warning.peopleOfArea)
              /**********一代区育成**********/
              this.warning.area.firstdept = data.promAssessment.warning.area.firstdept/*指标达成*/
              this.warning.area.firstdeptStand = data.promAssessment.warning.area.firstdeptStand/*考核标准*/
              if(data.promAssessment.warning.area.firstdeptCj == '0.00'){
                this.warning.area.firstdeptCj = '0'
              }else{
                this.warning.area.firstdeptCj = data.promAssessment.warning.area.firstdeptCj
              }
              /*差距*/
              console.log('一代区育成----->>>',this.warning.area)
              /**********继续率（百分比）**********/
              this.warning.continuationRate.preconrate = data.promAssessment.warning.continuationRate.preconrate/*指标达成*/
              this.warning.continuationRate.preconrateStand = data.promAssessment.warning.continuationRate.preconrateStand/*考核标准*/
              if(data.promAssessment.warning.continuationRate.preconrateCj == '0.00'){/*差距*/
                this.warning.continuationRate.preconrateCj = '0'
              }else{
                this.warning.continuationRate.preconrateCj = data.promAssessment.warning.continuationRate.preconrateCj
              }

              console.log('继续率（百分比）----->>>',this.warning.continuationRate)
              /**********品质扣分**********/
              this.warning.score.qualityScore = data.promAssessment.warning.score.qualityScore/*指标达成*/
              this.warning.score.qualityScoreStand = data.promAssessment.warning.score.qualityScoreStand/*考核标准*/
              if(data.promAssessment.warning.score.qualityScoreCj == '0.00'){/*差距*/
                this.warning.score.qualityScoreCj = '0'
              }else{
                this.warning.score.qualityScoreCj = data.promAssessment.warning.score.qualityScoreCj
              }
              console.log('品质扣分----->>>',this.warning.score)
            }
          }else{
            console.log('数据异常')
            this.showModals(header.resultMsg)
          }
        })
},
getDataMessage(){
  let year = this.yearDate.toString()
  this.getMessage(this.agentCode,year,this.monthDate,'2','2')
}
},
watch:{
  // yearDate(tpl){
  //   this.SetYearDate(tpl.toString())
  // },
  // monthDate(tpl){
  //   this.SetMonthDate(tpl)
  // }
}
}
</script>

<style>
.bold{
  font-weight: bold;
}
.Formleft-div-div{
  background:url('./../../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
  background-size:100% 100%;
  min-height:180px;
  padding-top:15px;
}
.Formleft-div-top{
  margin:0 auto;
  background:url('./../../../../../../static/img/comprehensive/Result.png') no-repeat;
  background-size:100% 100%;
  width:120px;
  height:120px;
}
.Formleft-div-top>p{
  font-size:.9rem;
  color:#FFF;
  margin:5px 0;
  padding-top:35px;
}
.Formleft-div-top>h2{
  font-size:1.8rem;
  color:#FFF;
}


.Formleft-div-cnt{
  width:98%;
  margin:10px auto;
}
.Formleft-div-cnt>div{
  box-sizing: border-box;
}
.Formleft-div-cnt>div:nth-child(1){
  width:44%;
}
.Formleft-div-cnt>div:nth-child(2),.Formleft-div-cnt>div:nth-child(3){
  width:28%;
}
.Formleft-div-cnt>div:nth-child(2){
  border-right: 2px dotted #FFF;
  border-left: 2px dotted #FFF;
}
.ass-cnt-btm-list>li>div>div{
  width:40%!important;
}
.Formleft-div-cnt p{
  text-align: center;
  color:#FFF;
}
.Formleft-div-cnt b{
  color:#FFF;
}
.Formleft-div-cnt>div>p{
  margin-bottom:5px;
}

.ass-cnt-btm-list{
  margin-top:-10px;
}
.ass-cnt-btm-list>li>div{
  height:30px;
  padding:0 5%;
}
.ass-cnt-btm-list>li:nth-child(even)>div{
  background:#F1F1F1;
}
.ass-cnt-btm-list>li>ul>li{
  height:30px;
  margin:0 auto;
}
.ass-cnt-btm-list img{
  width:20px;
}
.red{
  color:red!important;
}
.green{
  color:green!important;
}
.aaa{
  color:#000!important;
}
.let-Message p{
  min-width:24px;
}
.let-Message img{
  margin-left:10px;
}
.left-Message-2>ul>li>ul{
  width:80%!important;
  margin:0 auto!important;
}
</style>