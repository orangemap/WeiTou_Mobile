<template>
   <div class='AssessmentYujing'>
      <Headerbtns :title="page_title">
         <div ref='header' slot="left" @click="Goback">
            <i class="fa fa-angle-left "></i>
         </div>
      </Headerbtns>
      <div class='my-index-container Assess-yujing' ref='container'>
         <div class='flex ass-yj-top'>
            <p @click="topType('1')" :class='[topColor==1?"bg-active":" "]'>维持考核</p>
            <p @click="topType('2')" :class='[topColor==2?"bg-active":" "]'>晋升考核</p>
            <p @click="topType('3')" :class='[topColor==3?"bg-active":" "]'>团队考核</p>
         </div>
         <div v-show='topColor==1'>
            <div>
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
                  <p class="fontIcon" @click='getMessage'>
                     <i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
                  </p>
               </div>
            </div>
            <div v-show='AssResult' class='ass-cnt-top Yujing-ass-cnt-top-new'>
               <!-- 考核结果 -->
               <div class='ass-cnt-top-div'>
                  <p class='text-center bold'><b>考核结果</b></p>
                  <h2 class='text-center' style='font-size:1.3rem;padding-top:10px;'>{{assessflag}}</h2>
               </div>
               <!-- 考核期-职级起期-上期是否保级 -->
               <div class='flex ass-cnt-btm-div'  v-show='AssResult'>
                  <div>
                     <p>考核期</p>
                     <p>
                        <b>{{QiTimeSlot}}</b>
                        <b style='color:#fff'>至</b>
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
            <div class='flex ass-cnt-btm-btns'>
               <button @click='btmType(1)' :class='[btmColor==1?"btn-active":" "]' style='margin:0!important;'>个人预警</button>
               <button @click='btmType(2)' :class='[btmColor==2?"btn-active":" "]' style='margin:0!important;'>考核分析</button>
            </div>
            <!-- 维持考核-个人预警List-->
            <ul class='ass-cnt-btm-list' v-show='btmColor==1'>
               <li>
                  <div class='flex'>
                     <p>个险个人NPC</p>
                     <div style='width:25%' class='flex'>
                        <p :class="[Gractive?'aaa':'green']">{{warning.perNPC.perNPC}}</p>
                        <p @click='BtmListShow(1)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow1'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:50%;margin:0 auto' v-show='Li1Show'>
                     <li class='flex'>
                        <p>考核标准</p>
                        <p>{{warning.perNPC.perStand}}</p>
                     </li>
                     <li class='flex'>
                        <p>差距</p>
                        <p v-show='warning.perNPC.perStand' :class="[warning.perNPC.perNPCCj=='0'?'aaa':'red']">{{warning.perNPC.perNPCCj}}</p>
                     </li>
                  </ul>
               </li>
               <li>
                  <div class='flex'>
                     <p>综开业绩</p>
                     <div style='width:25%' class='flex'>
                        <p :class="[Zkactive?'aaa':'green']">{{warning.zongAchit.grptoagentNPC}}</p>
                        <p @click='BtmListShow(2)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow2'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li2Show'>
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
                        <p @click='BtmListShow(3)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow3'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li3Show'>
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
                        <p @click='BtmListShow(4)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow4'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li4Show'>
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
                        <p @click='BtmListShow(5)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow5'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li5Show'>
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
                        <p @click='BtmListShow(6)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow6'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li6Show'>
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
                        <p @click='BtmListShow(7)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow7'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li7Show'>
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
                        <p @click='BtmListShow(8)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow8'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li8Show'>
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
                        <p @click='BtmListShow(9)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow9'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li9Show'>
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
                        <p @click='BtmListShow(10)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow10'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li10Show'>
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
                        <p @click='BtmListShow(11)'>
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow11'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto'  v-show='Li11Show'>
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
            <!-- 维持考核-考核分析List-->
            <div v-show='btmColor==2'>
               <div class='flex div-jg' style='height:35px;padding-left:10%;'>
                  <p style='width:25%;color:#fff'>机构</p>
                  <p style='width:25%;color:#fff'>维考人数</p>
                  <p style='width:25%;color:#fff'>达标人数</p>
                  <p style='width:25%;color:#fff'>达标率</p>
               </div>
               <ul class='ass-cnt-btm-list ass-cnt-btm-list2'>
                  <li>
                     <div class='flex'>
                        <p>本机构</p>
                        <p>{{analysis.orgJoinPerpon}}</p>
                        <p>{{analysis.orgPassPerpon}}</p>
                        <p>{{analysis.orgPassRate+'%'}}</p>
                     </div>
                  </li>
                  <li>
                     <div class='flex'>
                        <p>中支公司</p>
                        <p>{{analysis.mbJoinPerpon}}</p>
                        <p>{{analysis.mbPassPerpon}}</p>
                        <p>{{analysis.mbPassRate+'%'}}</p>
                     </div>
                  </li>
                  <li>
                     <div class='flex'>
                        <p>分公司</p>
                        <p>{{analysis.branchJoinPerpon}}</p>
                        <p>{{analysis.branchPassPerpon}}</p>
                        <p>{{analysis.branchPassRate+'%'}}</p>
                     </div>
                  </li>
                  <li>
                     <div class='flex'>
                        <p>全国</p>
                        <p>{{analysis.countryJoinPerpon}}</p>
                        <p>{{analysis.countryPassPerpon}}</p>
                        <p>{{analysis.countryPassRate+'%'}}</p>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <div v-show='topColor==2'>
            <div>
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
                     <i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true" @click='getMessage'></i>
                  </p>
               </div>
            </div>
            <div v-show='AssResult' class='ass-cnt-top'>
               <!-- 考核结果 -->
               <div class='ass-cnt-top-div'>
                  <p class='text-center bold'><b>考核结果</b></p>
                  <h2 class='text-center'  style='font-size:1.3rem;padding-top:10px;'>{{assessflag}}</h2>
               </div>
               <!-- 考核期-职级起期-上期是否保级 -->
               <div class='flex ass-cnt-btm-div'  v-show='AssResult'>
                  <div>
                     <p>考核期</p>
                     <p>
                        <b>{{QiTimeSlot}}</b>
                        <b style='color:#fff'>至</b>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow12'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:50%;margin:0 auto' v-show='Li12Show'>
                     <li class='flex'>
                        <p>考核标准</p>
                        <p>{{warning.perNPC.perStand}}</p>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow13'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li13Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow14'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li14Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow15'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li15Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow16'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li16Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow17'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li17Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow18'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li18Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow19'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li19Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow20'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li20Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow21'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto' v-show='Li21Show'>
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
                           <img src="./../../../../../static/img/comprehensive/bottom.png" alt="" ref='ImgShow22'>
                        </p>
                     </div>
                  </div>
                  <ul style='width:80%;margin:0 auto'  v-show='Li22Show'>
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
         </div>
         <div v-show='topColor==3'>
            <div>
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
                     <i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true" @click='getMessage'></i>
                  </p>
               </div>
            </div>
            <p style='width:50%;margin:20px auto;color:#0D8FD4;border-bottom:1px solid #0D8FD4;padding-bottom:5px;font-size:.9rem;' class='text-center' v-show='topColor==3'>
               <span @click='Download()'>团队人员考核详情下载》</span>
            </p>
            <ul class='end-ul-list'>
               <li class='list3-li'>
                  <p>姓名</p>
                  <p>编码</p>
                  <p>职级</p>
                  <p>维持考核</p>
                  <p>晋升考核</p>
               </li>
               <li v-for='item in DetailList' class='list3-li'>
                  <p>{{item.agentName}}</p>
                  <p>{{item.agentCode}}</p>
                  <p>{{item.agentgrade}}</p>
                  <p>{{item.wcResult}}</p>
                  <p>{{item.jsResult}}</p>
               </li>
            </ul>
         </div>
      </div>
      <Alert ref="showalert"></Alert>
   </div>
</template>

<script>
   import Headerbtns from '@/components/policy/common/Header.vue'
   import Alert from '@/components/policy/common/alert.vue'
   import yearPicker from '../../../common/Picker.vue'
   import { mapState,mapMutations } from 'vuex'
   import store from '../../../../vuex/comprehensive/comprehensive'
   import "../../../policy/css/base.css";
   export default{
      components: {Headerbtns,yearPicker,Alert},
      data() {
         return{
            agentCode:utils.cache.get('personsal').agentCode,
            personsal:utils.cache.get('personsal'),
            isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            page_title:'考核预警',
            yearList:[],/*年列表*/
            yearDate:"",/*查询年*/
            year:'',
            monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
            monthDate:"",/*查询月*/
            topColor:'1',/*三大考核active*/
            btmColor:1,/*个人预警,考核分析active*/
            topActive:1,/*显示隐藏个人预警，考核分析按钮*/
            AssResult:true,/*显示隐藏考核结果区域*/
            channel:'',
            DetailList:[],
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
            analysis:{/*考核分析*/
               orgJoinPerpon:'',/*本机构 维考人数（维持考核人数）*/
               orgPassPerpon:'',/*本机构 达标人数*/
               orgPassRate:'',/*本机构  达标率*/
               mbJoinPerpon:'',/*中支公司 维考人数（维持考核人数）*/
               mbPassPerpon:'',/*中支公司 达标人数*/
               mbPassRate:'',/*中支公司  达标率*/
               branchJoinPerpon:'',/*分公司 维考人数（维持考核人数）*/
               branchPassPerpon:'',/*分公司 达标人数*/
               branchPassRate:'',/*分公司  达标率*/
               countryJoinPerpon:'',/*全国 维考人数（维持考核人数）*/
               countryPassPerpon:'',/*全国 达标人数*/
               countryPassRate:'',/*全国  达标率*/
            },
            Li1Show:false,
            Li2Show:false,
            Li3Show:false,
            Li4Show:false,
            Li5Show:false,
            Li6Show:false,
            Li7Show:false,
            Li8Show:false,
            Li9Show:false,
            Li10Show:false,
            Li11Show:false,
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
            Gractive:false,/*个人个险NPC实际值的颜色状态*/
            Zkactive:false,/*综开业绩实际值的颜色状态*/
            Gractive2:false,/*个人个险NPC实际值的颜色状态2*/
            Zkactive2:false/*综开业绩NPC实际值的颜色状态2*/
         }
      },
      mounted(){
         console.log(this.$route.params.type)
         if(this.$route.params.type == 3){
            this.topColor = 3
         }
         this.channel = utils.cache.get('channel')
         this.$refs.container.style.marginTop = '48px'
         this.yearDate=new Date().getFullYear()
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
            this.monthDate=(new Date().getMonth())+1
            if(this.monthDate<=9){
               this.monthDate = '0'+this.monthDate
            }else{
               this.monthDate = this.monthDate.toString()
            }
         console.log('Vuex年---->>>',this.YuJingYear)
         if(this.YuJingYear){
            this.year = this.YuJingYear.toString()
            this.yearDate = this.YuJingYear
         }else{
            this.year = this.yearDate.toString()
            this.yearDate = this.yearDate.toString()
         }
         console.log('本地年---->>>',this.year)
         this.getData(this.agentCode,this.year,this.monthDate,this.topColor,'1')
         console.log(this.isiOS)
         if(this.isiOS){
            this.$refs.container.style.marginTop = '83px'
         }else{
            console.log(this.$refs.container)
            this.$refs.container.style.marginTop = '63px'
         }
         let _header = $(".manage-main-contents")
         let u = navigator.userAgent;
         let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
         let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
         if(isiOS) {
            if(screen.height == 812 && screen.width == 375){
               console.log('iphone X')
               _header.css({
                  "top": "92px",
                  "bottom": "34px"
               })
               $('.Assess-yujing').css('margin-top','107px')
            }else{
                $('.Assess-yujing').css('margin-top','87px')
            }
         }
      },
      computed:{
         ...mapState(['YuJingYear','YuJingMounth'])
      },store,
      methods:{
         ...mapMutations(['SetYuJingYear','SetYuJingMounth']),
         showModals(message) {
            this.$refs.showalert.showMOdal(message)
         },
         Goback(){
            this.$router.push('/comprehensiveGexian/comprehensiveInfo')
         },
         topType(id){/*点击切换，动态控制个人预警,考核分析按钮,考核结果区域的显示与否*/
            this.topColor = id
            console.log(this.topColor)
            /*获取月*/
            if(this.YuJingMounth){
               this.monthDate = this.YuJingMounth
            }else{
               this.monthDate=(new Date().getMonth())+1
               if(this.monthDate<=9){
                  this.monthDate = '0'+this.monthDate
               }else{
                  this.monthDate = this.monthDate.toString()
               }
            }
            if(this.YuJingYear){
               this.year = this.YuJingYear.toString()
               this.yearDate = this.YuJingYear
            }else{
               this.year = this.yearDate.toString()
               this.yearDate = this.yearDate.toString()
            }
            console.log('本地月---->>>',this.monthDate)
            console.log('Vuex月---->>>',this.YuJingMounth)
            console.log('Vuex年---->>>',this.YuJingYear)
            console.log('本地年---->>>',this.year)
            if(id == 1){
               this.topActive = true
               this.AssResult = true
               this.getData(this.agentCode,this.yearDate,this.monthDate,id,'1')
               this.Li1Show = false
               this.Li2Show = false
               this.Li3Show = false
               this.Li4Show = false
               this.Li5Show = false
               this.Li6Show = false
               this.Li7Show = false
               this.Li8Show = false
               this.Li9Show = false
               this.Li10Show = false
               this.Li11Show = false
               this.$refs.ImgShow1.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow2.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow3.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow4.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow5.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow6.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow7.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow8.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow9.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow10.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow11.src = './static/img/comprehensive/bottom.png'
            }else if(id == 2){
               this.topActive = false
               this.AssResult = true
               this.getData(this.agentCode,this.yearDate,this.monthDate,id,'1')
               this.Li12Show = false
               this.Li13Show = false
               this.Li14Show = false
               this.Li15Show = false
               this.Li16Show = false
               this.Li17Show = false
               this.Li18Show = false
               this.Li19Show = false
               this.Li20Show = false
               this.Li21Show = false
               this.Li22Show = false
               this.$refs.ImgShow12.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow13.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow14.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow15.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow16.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow17.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow18.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow19.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow20.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow21.src = './static/img/comprehensive/bottom.png'
               this.$refs.ImgShow22.src = './static/img/comprehensive/bottom.png'
            }else if(id == 3){
               this.topActive = false
               this.AssResult = false
               this.getData(this.agentCode,this.yearDate,this.monthDate,id,'1')
            }
         },
         btmType(id){
            this.btmColor = id
         },
         BtmListShow(id){
            let Img;
            this.NewListShow = !this.NewListShow
            if(id == 1){
               this.Li1Show = this.NewListShow
               Img = this.$refs.ImgShow1
            }
            if(id == 2){
               this.Li2Show = this.NewListShow
               Img = this.$refs.ImgShow2 
            }
            if(id == 3){
               this.Li3Show = this.NewListShow
               Img = this.$refs.ImgShow3
            }
            if(id == 4){
               this.Li4Show = this.NewListShow
               Img = this.$refs.ImgShow4 
            }
            if(id == 5){
               this.Li5Show = this.NewListShow
               Img = this.$refs.ImgShow5 
            }
            if(id == 6){
               this.Li6Show = this.NewListShow
               Img = this.$refs.ImgShow6 
            }
            if(id == 7){
               this.Li7Show = this.NewListShow
               Img = this.$refs.ImgShow7 
            }
            if(id == 8){
               this.Li8Show = this.NewListShow
               Img = this.$refs.ImgShow8 
            }
            if(id == 9){
               this.Li9Show = this.NewListShow
               Img = this.$refs.ImgShow9 
            }
            if(id == 10){
               this.Li10Show = this.NewListShow
               Img = this.$refs.ImgShow10 
            }
            if(id == 11){
               this.Li11Show = this.NewListShow
               Img = this.$refs.ImgShow11 
            }
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
         getMessage(){/*维持,晋升点击日期搜索*/
            this.getData(this.agentCode,this.yearDate,this.monthDate,this.topColor,'2')
         },
         getData(agentCode,year,month,index,flag){
            let requ = {
               search:{
                  "agentCode": agentCode, /*this.agentCode*/
                  "channel": this.channel,
                  "year":year,
                  "month":month,
                  "model":index+'',
                  "flag":flag
               }
            }
            utils.http.postFast('ZHWARNDETAILGX',requ,(body,header) => {
               console.log(body)
               console.log(header)
               let data = body.search
               this.yearDate = data.year
               this.monthDate = data.month
               if(header.resultCode == 0){
                  /*年月赋值*/
                  console.log(data.year)
                  console.log(data.month)
                  /*团队考核List*/
                  console.log(data.teamAssessment.messageList)
                  this.DetailList = data.teamAssessment.messageList
                  this.assessflag = data.keepAssessment.assessflag/*考核结果*/
                  this.startdate = data.keepAssessment.startdate.slice(0,10)/*职级起期*/
                  if(data.keepAssessment.keepflag == ''){/*上期是否保级*/
                     this.keepflag = ' '
                  }else{
                     this.keepflag = data.keepAssessment.keepflag
                  }
                  this.QiTimeSlot = data.keepAssessment.timeSlot.split('|')[0]/*考核期起*/
                  this.ZhiTimeSlot = data.keepAssessment.timeSlot.split('|')[1]/*考核期至*/
                  if(index == 1){
                     console.log(data.keepAssessment.warning.perNPC)
                     /******************************个人预警******************************/
                     /**********个险个人NPC**********/
                     this.warning.perNPC.perNPC = data.keepAssessment.warning.perNPC.perNPC/*指标达成*/
                     this.warning.perNPC.perStand = data.keepAssessment.warning.perNPC.perStand/*考核标准*/
                     this.warning.perNPC.perNPCCj = data.keepAssessment.warning.perNPC.perNPCCj/*差距*/
                     if(data.keepAssessment.warning.perNPC.perNPCCj == '0.00'){
                        this.warning.perNPC.perNPCCj = '0'
                     }
                     if(data.keepAssessment.warning.perNPC.perNPCCj == ''){
                        this.Gractive = true
                     }else{
                        this.Gractive = false
                     }
                     console.log('个险个人NPC----->>>',this.warning.perNPC)
                     /**********综开业绩**********/
                     this.warning.zongAchit.grptoagentNPC = data.keepAssessment.warning.zongAchit.grptoagentNPC/*指标达成*/
                     this.warning.zongAchit.grpStand = data.keepAssessment.warning.zongAchit.grpStand/*考核标准*/
                     this.warning.zongAchit.grptoagentNPCCj = data.keepAssessment.warning.zongAchit.grptoagentNPCCj/*差距*/
                     if(data.keepAssessment.warning.zongAchit.grptoagentNPCCj == '0.00'){
                        this.warning.zongAchit.grptoagentNPCCj = '0'
                     }
                     if(data.keepAssessment.warning.zongAchit.grptoagentNPCCj == ''){
                        this.Zkactive = true
                     }else{
                        this.Zkactive = false
                     }
                     console.log('综开业绩----->>>',this.warning.zongAchit)
                     /**********个人业绩合计**********/
                     this.warning.myselfAchit.perNPCSum = data.keepAssessment.warning.myselfAchit.perNPCSum/*指标达成*/
                     this.warning.myselfAchit.perNPCStand = data.keepAssessment.warning.myselfAchit.perNPCStand/*考核标准*/
                     if(data.keepAssessment.warning.myselfAchit.perNPCSumCj == '0.00'){/*差距*/
                        this.warning.myselfAchit.perNPCSumCj = '0'
                     }else{
                        this.warning.myselfAchit.perNPCSumCj = data.keepAssessment.warning.myselfAchit.perNPCSumCj
                     }
                     console.log('个人业绩合计----->>>',this.warning.myselfAchit)
                     console.log(data.keepAssessment.warning.myselfAchit)
                     /**********直辖组NPC**********/
                     this.warning.zuNPC.grpNPC = data.keepAssessment.warning.zuNPC.grpNPC/*指标达成*/
                     this.warning.zuNPC.grpNPCStand = data.keepAssessment.warning.zuNPC.grpNPCStand/*考核标准*/
                     this.warning.zuNPC.grpNPCCj = data.keepAssessment.warning.zuNPC.grpNPCCj/*差距*/
                     if(data.keepAssessment.warning.zuNPC.grpNPCCj == '0.00'){
                        this.warning.zuNPC.grpNPCCj = '0'
                     }
                     console.log('直辖组NPC----->>>',this.warning.zuNPC)
                     /**********直辖组有效人力**********/
                     this.warning.peopleOfGroup.grppower = data.keepAssessment.warning.peopleOfGroup.grppower/*指标达成*/
                     this.warning.peopleOfGroup.grppowerStand = data.keepAssessment.warning.peopleOfGroup.grppowerStand/*考核标准*/
                     if(data.keepAssessment.warning.peopleOfGroup.grppowerCj == '0.00'){/*差距*/
                        this.warning.peopleOfGroup.grppowerCj = '0'
                     }else{
                        this.warning.peopleOfGroup.grppowerCj = data.keepAssessment.warning.peopleOfGroup.grppowerCj
                     }

                     console.log('直辖组有效人力----->>>',this.warning.peopleOfGroup)
                     /**********一代组育成**********/
                     this.warning.group.firstgrp = data.keepAssessment.warning.group.firstgrp/*指标达成*/
                     this.warning.group.firstgrpStand = data.keepAssessment.warning.group.firstgrpStand/*考核标准*/
                     this.warning.group.firstgrpCj = data.keepAssessment.warning.group.firstgrpCj/*差距*/
                     if(data.keepAssessment.warning.group.firstgrpCj == '' || data.keepAssessment.warning.group.firstgrpCj == '0.00'){
                        this.warning.group.firstgrpCj = '0'
                     }
                     console.log('一代组育成----->>>',this.warning.group)
                     /**********直辖区NPC**********/
                     this.warning.areaNPC.deptNPC = data.keepAssessment.warning.areaNPC.deptNPC/*指标达成*/
                     this.warning.areaNPC.deptNPCStand = data.keepAssessment.warning.areaNPC.deptNPCStand/*考核标准*/
                     if(data.keepAssessment.warning.areaNPC.deptNPCCj == '0.00'){/*差距*/
                        this.warning.areaNPC.deptNPCCj = '0'
                     }else{
                        this.warning.areaNPC.deptNPCCj = data.keepAssessment.warning.areaNPC.deptNPCCj
                     }

                     console.log(data.keepAssessment.warning.areaNPC.deptNPCCj)
                     console.log('直辖区NPC----->>>',this.warning.areaNPC)
                     /**********直辖区有效人力**********/
                     this.warning.peopleOfArea.deptpower = data.keepAssessment.warning.peopleOfArea.deptpower/*指标达成*/
                     this.warning.peopleOfArea.deptpowerStand = data.keepAssessment.warning.peopleOfArea.deptpowerStand/*考核标准*/
                     if(data.keepAssessment.warning.peopleOfArea.deptpowerCj == '0.00'){/*差距*/
                        this.warning.peopleOfArea.deptpowerCj = '0'
                     }else{
                        this.warning.peopleOfArea.deptpowerCj = data.keepAssessment.warning.peopleOfArea.deptpowerCj
                     }

                     console.log('直辖区有效人力----->>>',this.warning.peopleOfArea)
                     /**********一代区育成**********/
                     this.warning.area.firstdept = data.keepAssessment.warning.area.firstdept/*指标达成*/
                     this.warning.area.firstdeptStand = data.keepAssessment.warning.area.firstdeptStand/*考核标准*/
                     if(data.keepAssessment.warning.area.firstdeptCj == '0.00'){
                        this.warning.area.firstdeptCj = '0'
                     }else{
                        this.warning.area.firstdeptCj = data.keepAssessment.warning.area.firstdeptCj
                     }
                     /*差距*/
                     console.log('一代区育成----->>>',this.warning.area)
                     /**********继续率（百分比）**********/
                     this.warning.continuationRate.preconrate = data.keepAssessment.warning.continuationRate.preconrate/*指标达成*/
                     this.warning.continuationRate.preconrateStand = data.keepAssessment.warning.continuationRate.preconrateStand/*考核标准*/
                     if(data.keepAssessment.warning.continuationRate.preconrateCj == '0.00'){/*差距*/
                        this.warning.continuationRate.preconrateCj = '0'
                     }else{
                        this.warning.continuationRate.preconrateCj = data.keepAssessment.warning.continuationRate.preconrateCj
                     }
                     console.log('继续率（百分比）----->>>',this.warning.continuationRate)
                     console.log(data.keepAssessment.warning.continuationRate)
                     /**********品质扣分**********/
                     this.warning.score.qualityScore = data.keepAssessment.warning.score.qualityScore/*指标达成*/
                     this.warning.score.qualityScoreStand = data.keepAssessment.warning.score.qualityScoreStand/*考核标准*/
                     if(data.keepAssessment.warning.score.qualityScoreCj == '0.00'){/*差距*/
                        this.warning.score.qualityScoreCj = '0'
                     }else{
                        this.warning.score.qualityScoreCj = data.keepAssessment.warning.score.qualityScoreCj
                     }

                     console.log('品质扣分----->>>',this.warning.score)
                     /******************************考核分析******************************/
                     this.analysis.orgJoinPerpon = data.keepAssessment.analysis.orgJoinPerpon/*本机构 维考人数（维持考核人数）*/
                     this.analysis.orgPassPerpon = data.keepAssessment.analysis.orgPassPerpon/*本机构 达标人数*/
                     this.analysis.orgPassRate = data.keepAssessment.analysis.orgPassRate/*本机构  达标率*/
                     this.analysis.mbJoinPerpon = data.keepAssessment.analysis.mbJoinPerpon/*中支公司 维考人数（维持考核人数）*/
                     this.analysis.mbPassPerpon = data.keepAssessment.analysis.mbPassPerpon/*中支公司 达标人数*/
                     this.analysis.mbPassRate = data.keepAssessment.analysis.mbPassRate/*中支公司  达标率*/
                     this.analysis.branchJoinPerpon = data.keepAssessment.analysis.branchJoinPerpon/*分公司 维考人数（维持考核人数）*/
                     this.analysis.branchPassPerpon = data.keepAssessment.analysis.branchPassPerpon/*分公司 达标人数*/
                     this.analysis.branchPassRate = data.keepAssessment.analysis.branchPassRate/*分公司  达标率*/
                     this.analysis.countryJoinPerpon = data.keepAssessment.analysis.countryJoinPerpon/*全国 维考人数（维持考核人数）*/
                     this.analysis.countryPassPerpon = data.keepAssessment.analysis.countryPassPerpon/*全国 达标人数*/
                     this.analysis.countryPassRate = data.keepAssessment.analysis.countryPassRate/*全国  达标率*/
                     console.log('考核分析----->>>',this.analysis)
                  }else if(index == 2){
                     this.assessflag = data.promAssessment.assessflag/*考核结果*/
                     this.startdate = data.promAssessment.startdate.slice(0,10)/*职级起期*/
                     if(data.promAssessment.keepflag == ''){/*上期是否保级*/
                        this.keepflag = ' '
                     }else{
                        this.keepflag = data.promAssessment.keepflag
                     }
                     this.QiTimeSlot = data.promAssessment.timeSlot.split('|')[0]/*考核期起*/
                     this.ZhiTimeSlot = data.promAssessment.timeSlot.split('|')[1]/*考核期至*/
                     /******************************晋升考核******************************/
                     /**********个险个人NPC**********/
                     this.warning.perNPC.perNPC = data.promAssessment
                     .warning.perNPC.perNPC/*指标达成*/
                     this.warning.perNPC.perStand = data.promAssessment
                     .warning.perNPC.perStand/*考核标准*/
                     if(data.promAssessment.warning.perNPC.perNPCCj == '0.00'){/*差距*/
                        this.warning.perNPC.perNPCCj = '0'
                     }else{
                        this.warning.perNPC.perNPCCj = data.promAssessment
                        .warning.perNPC.perNPCCj
                     }
                     if(data.promAssessment.warning.perNPC.perNPCCj == ''){
                        this.Gractive2 = true
                     }else{
                        this.Gractive2 = false
                     }
                     /**********综开业绩**********/
                     this.warning.zongAchit.grptoagentNPC = data.promAssessment.warning.zongAchit.grptoagentNPC/*指标达成*/
                     this.warning.zongAchit.grpStand = data.promAssessment.warning.zongAchit.grpStand/*考核标准*/
                     if(data.promAssessment.warning.zongAchit.grptoagentNPCCj == '0.00'){/*差距*/
                        this.warning.zongAchit.grptoagentNPCCj = '0'
                     }else{
                        this.warning.zongAchit.grptoagentNPCCj = data.promAssessment.warning.zongAchit.grptoagentNPCCj
                     }
                     if(data.promAssessment.warning.zongAchit.grptoagentNPCCj == ''){
                        this.Zkactive2 = true
                     }else{
                        this.Zkactive2 = false
                     }
                     /**********个人业绩合计**********/
                     this.warning.myselfAchit.perNPCSum = data.promAssessment
                     .warning.myselfAchit.perNPCSum/*指标达成*/
                     this.warning.myselfAchit.perNPCStand = data.promAssessment
                     .warning.myselfAchit.perNPCStand/*考核标准*/
                     if(data.promAssessment.warning.myselfAchit.perNPCSumCj == '0.00'){/*差距*/
                        this.warning.myselfAchit.perNPCSumCj = '0'
                     }else{
                        this.warning.myselfAchit.perNPCSumCj = data.promAssessment
                        .warning.myselfAchit.perNPCSumCj
                     }

                     /**********直辖组NPC**********/
                     this.warning.zuNPC.grpNPC = data.promAssessment.warning.zuNPC.grpNPC/*指标达成*/
                     this.warning.zuNPC.grpNPCStand = data.promAssessment.warning.zuNPC.grpNPCStand/*考核标准*/
                     if(data.promAssessment.warning.zuNPC.grpNPCCj == '0.00'){/*差距*/
                        this.warning.zuNPC.grpNPCCj = '0'
                     }else{
                        this.warning.zuNPC.grpNPCCj = data.promAssessment.warning.zuNPC.grpNPCCj
                     }

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
                     this.warning.group.firstgrp = data.promAssessment
                     .warning.group.firstgrp/*指标达成*/
                     this.warning.group.firstgrpStand = data.promAssessment.warning.group.firstgrpStand/*考核标准*/
                     if(data.promAssessment.warning.group.firstgrpCj == '0.00'){/*差距*/
                        this.warning.group.firstgrpCj = '0'
                     }else{
                        this.warning.group.firstgrpCj = data.promAssessment.warning.group.firstgrpCj
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
                     if(data.promAssessment.warning.area.firstdeptCj == '0.00'){/*差距*/
                        this.warning.area.firstdeptCj = '0'
                     }else{
                        this.warning.area.firstdeptCj = data.promAssessment.warning.area.firstdeptCj
                     }

                     console.log('一代区育成----->>>',this.warning.area)
                     /**********继续率（百分比）**********/
                     this.warning.continuationRate.preconrate = data.promAssessment.warning.continuationRate.preconrate/*指标达成*/
                     this.warning.continuationRate.preconrateStand = data.promAssessment.warning.continuationRate.preconrateStand/*考核标准*/
                     console.log(data.promAssessment.warning.continuationRate.preconrateCj)
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
                  /*数据全部展示为空*/
                  /*维持考核-个人预警*/
                  /*个险个人NPC*/
                  this.warning.perNPC.perNPC = ''/*指标达成*/
                  this.warning.perNPC.perStand = ''/*考核标准*/
                  this.warning.perNPC.perNPCCj = ''/*差距*/
                  /*综开业绩*/
                  this.warning.zongAchit.grptoagentNPC = ''/*指标达成*/
                  this.warning.zongAchit.grpStand = ''/*考核标准*/
                  this.warning.zongAchit.grptoagentNPCCj = ''/*差距*/
                  /*个人业绩合计*/
                  this.warning.myselfAchit.perNPCSum = ''/*指标达成*/
                  this.warning.myselfAchit.perNPCStand = ''/*考核标准*/
                  this.warning.myselfAchit.perNPCSumCj = ''/*差距*/
                  /*直辖组NPC*/
                  this.warning.zuNPC.grpNPC = '',/*指标达成*/
                  this.warning.zuNPC.grpNPCStand = ''/*考核标准*/
                  this.warning.zuNPC.grpNPCCj = ''/*差距*/
                  /*直辖组有效人力*/
                  this.warning.peopleOfGroup.grppower = ''/*指标达成*/
                  this.warning.peopleOfGroup.grppowerStand = ''/*考核标准*/
                  this.warning.peopleOfGroup.grppowerCj = ''/*差距*/
                  /*一代组育成*/
                  this.warning.group.firstgrp = ''/*指标达成*/
                  this.warning.group.firstgrpStand = ''/*考核标准*/
                  this.warning.group.firstgrpCj = ''/*差距*/
                  /*直辖区NPC*/
                  this.warning.areaNPC.deptNPC = ''/*指标达成*/
                  this.warning.areaNPC.deptNPCStand = ''/*考核标准*/
                  this.warning.areaNPC.deptNPCCj = ''/*差距*/
                  /*直辖区有效人力*/
                  this.warning.peopleOfArea.deptpower = ''/*指标达成*/
                  this.warning.peopleOfArea.deptpowerStand = ''/*考核标准*/
                  this.warning.peopleOfArea.deptpowerCj = ''/*差距*/
                  /*一代区育成*/
                  this.warning.area.firstdept = ''/*指标达成*/
                  this.warning.area.firstdeptStand = ''/*考核标准*/
                  this.warning.area.firstdeptCj = ''/*差距*/
                  /*继续率（百分比）*/
                  this.warning.continuationRate.preconrate = ''/*指标达成*/
                  this.warning.continuationRate.preconrateStand = ''/*考核标准*/
                  this.warning.continuationRate.preconrateCj = ''/*差距*/
                  /*品质扣分*/
                  this.warning.score.qualityScore = ''/*指标达成*/
                  this.warning.score.qualityScoreStand = ''/*考核标准*/
                  this.warning.score.qualityScoreCj = ''/*差距*/
                  this.assessflag = ''/*考核结果*/
                  this.startdate = ''/*职级起期*/
                  this.keepflag = ''/*上期是否保级*/
                  this.QiTimeSlot = ''/*考核期起*/
                  this.ZhiTimeSlot = ''/*考核期止*/
                  this.showModals(header.resultMsg)
               }
            })
         },
         Download(){/*团队人员考核详情下载*/
            this.$router.push('/comprehensiveGexian/AssessmentYujingLoad/'+this.year+'/'+this.monthDate);
         }
   },
   watch:{
      // monthDate(tpl){
      //    this.SetYuJingMounth(tpl)
      //    console.log(tpl)
      // },
      // yearDate(tpl){
      //    console.log(tpl)
      //    this.SetYuJingYear(tpl.toString())
      // }
   }
}
</script>

<style>
.flex {
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.text-center {
 text-align: center;
}
.bold{
 font-weight: bold;
}
.AssessmentYujin{
 position:relative;
}
.AssessmentYujing .font_35 {
 color:#FDB92C;
 font-size: 30px;
}

.AssessmentYujing .pickerContent {
 margin: 20px 0;
}
/*时间框state*/
.AssessmentYujing .datePicker {
 border-radius: 100px;
 background: #fff;
}

.AssessmentYujing .fontIcon {
 width: 10%;
}
.AssessmentYujing .pickerContent>.dateShow>p:nth-child(1){
 width:60px!important;
}
.AssessmentYujing .pickerContent>.dateShow>p:nth-child(2){
 width:50px!important;
}
.AssessmentYujing .pickerContent>.dateShow>p:nth-child(2) .mbsc-control{
 width:30px!important;
}
.AssessmentYujing .dateShow {
 width: 105px!important;
 color: #06306B;
 font-size: 13px;
 display: flex;
 justify-content: space-between;
}
.AssessmentYujing .pickerContent {
 width: 60%;
 display: flex;
 margin: auto;
 justify-content: space-between;
 background: #fff;
 padding: 0 20px;
 align-items: center;
 height: 30px;
 border-radius: 15px;
}

.AssessmentYujing .mbsc-control-ev {
 width: 40px !important;
 text-align: center;
 background:#FFF!important;
}
.AssessmentYujing .Assess-yujing .my-index-picker{
 width: 70%!important;
 margin-left:9%!important;
 background:#fff!important;
 position:static;
 margin-bottom:10px!important;
}
/*时间框end*/
.AssessmentYujing>div:nth-child(2)>div:nth-child(2),
.AssessmentYujing>div:nth-child(2)>div:nth-child(3),
.AssessmentYujing>div:nth-child(2)>div:nth-child(4){
 padding-top:10px;
 padding-bottom:10px;
 background:#f1f1f1;
}
.AssessmentYujing>div:nth-child(2)>div:nth-child(2){
   padding-bottom:0;
}
.AssessmentYujing .ass-yj-top{
 width:100%;
 margin:-5px auto 0 auto;
}
.AssessmentYujing .ass-yj-top>p{
 width:33.333%;
 border-bottom:4px solid #E5E5E5;
 padding-bottom:8px;
 text-align: center;
 color:#959595;
 font-size:.9rem;
 font-weight: bold;
}
.AssessmentYujing .bg-active{
 color:#FEB101!important;
 border-bottom: 4px solid #FEB101!important;
}
.AssessmentYujing .ass-cnt-top{
 min-height:180px;
 padding:10px 0 1px 0;
 margin:0 auto;
 background:url('./../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
 background-size:100% 100%;
}
.AssessmentYujing .ass-cnt-top-div{
 background:url('./../../../../../static/img/comprehensive/Result.png') no-repeat;
 background-size:100% 100%;
 width:120px;
 height:120px;
 margin:0 auto;
}
.AssessmentYujing .ass-cnt-top-div>p{
 color:#FFF;
 font-size:.9rem;
 font-weight: bold;
 margin:10px 0 5px 0;
 padding-top:30px;
}
.AssessmentYujing .ass-cnt-top-div>h2{
 font-size:1.8rem;
 color:#FFF;
}

.AssessmentYujing .ass-cnt-btm-div{
 width:98%;
 margin:20px auto;
}
.AssessmentYujing .ass-cnt-btm-div p{
 text-align: center;
 margin-bottom:5px;
 color:#fff;
}
.AssessmentYujing .ass-cnt-btm-div b{
 color:#FFF;
}
.AssessmentYujing .ass-cnt-btm-div>div{
 box-sizing: border-box;
}
.AssessmentYujing .ass-cnt-btm-div>div:nth-child(1){
 width:44%;
}
.AssessmentYujing .ass-cnt-btm-div>div:nth-child(2),.AssessmentYujing .ass-cnt-btm-div>div:nth-child(3){
 width:28%;
}
.AssessmentYujing .ass-cnt-btm-div>div:nth-child(2){
 border-right: 2px dotted #fff;
 border-left: 2px dotted #fff;
}
.AssessmentYujing .ass-cnt-btm-btns{
 width:100%;
 border-bottom:2px solid #CCC;
 background:#fff;
 margin:0!important;
 padding-top:8px;
 padding-bottom:8px;
}
.AssessmentYujing .ass-cnt-btm-btns>button{
 outline: none;
 background:#FFF;
 border:none;
 width:50%;
 height:25px;
 line-height: 25px;
 display: inline-block;
 margin-bottom:5px;
 box-sizing: border-box;
 font-weight: bold;
 font-size:.95rem;
 color:#959595;
}
.AssessmentYujing .ass-cnt-btm-btns>button:nth-child(1){
 border-right: 2px dotted #CCC;
}
.btn-active{
 color:#FEB101!important;
}
.AssessmentYujing .ass-cnt-btm-list{
 margin-bottom:10px;
 margin-top:0;
}
.AssessmentYujing .ass-cnt-btm-list>li>div{
 height:30px;
 padding:0 5%;
}
.AssessmentYujing .ass-cnt-btm-list>li:nth-child(even)>div{
 background:#F1F1F1;
}
.AssessmentYujing .ass-cnt-btm-list>li>ul{
 width:55%!important;
 margin:0 auto!important;
}
.AssessmentYujing .ass-cnt-btm-list>li>ul>li{
 width:100%;
 height:30px;

}
.AssessmentYujing .ass-cnt-btm-list>li>ul>li>p:last-child{
   text-align: right;
}
.AssessmentYujing .ass-cnt-btm-list>li>div>div>p:nth-child(1){
   flex:1;
   text-align: right;
   padding-right:10px;
}
.AssessmentYujing .ass-cnt-btm-list>li>div>div{
   width:40%!important;
}
.AssessmentYujing .ass-cnt-btm-list img{
 width:15px;
}

.AssessmentYujing .list3-li{
 display: flex;
}
.AssessmentYujing .list3-li>p{
 width:18%;
 height:35px;
 text-align: center;
 line-height: 35px;
}
.AssessmentYujing .list3-li>p:nth-child(2){
 width:28%;
}
.AssessmentYujing ul>.list3-li:nth-child(1)>p{
 color:#f1f1f1;
}
.AssessmentYujing ul>.list3-li:nth-of-type(odd) {
 background: #f1f1f1;
}
.AssessmentYujing ul>.list3-li:nth-child(1){
 background:url('./../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
}
.AssessmentYujing .Assess-yujing{
 background:#FFF!important;
}
.ass-cnt-btm-list>li,.ass-cnt-btm-list{
 background:#fff;
}
.ass-cnt-btm-list>li:nth-of-type(even) {
 background: #f1f1f1;
}
.ass-cnt-btm-list2{
   margin-bottom:0!important;
   padding-bottom:30px;
}
.ass-cnt-btm-list2 li>div{
 padding:0!important;
 margin-left:10%;
}
.ass-cnt-btm-list2 li>div>p{
 width:25%;
}
.div-jg{
 background:url('./../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
 background-size:100% 100%;
}
.btns{
 display: flex;
 justify-content: center;
}
.end-ul-list:nth-of-type(odd){
 background:#FFF!important;
}
.AssessmentYujing>div:nth-child(2)>div:nth-child(4){
 padding-bottom:0;
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
.AssessmentYujing p{
 min-width:24px;
}
.Yujing-ass-cnt-top-new p,
.Yujing-ass-cnt-top-new b,
.Yujing-ass-cnt-top-new h2,
.ass-cnt-top p,
.ass-cnt-top b,
.ass-cnt-top h2{
   font-weight: bold;
}
.ass-cnt-btm-div p,
.ass-cnt-btm-div b{
   font-size:.8rem;
}
</style>
