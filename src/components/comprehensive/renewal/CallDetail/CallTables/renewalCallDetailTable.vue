<template>
    <div class='table_content'> 
        <Headerbtns :title="page_title">
            <div ref='header' slot="left" class="back" @click="Goback">
                <i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;color: #FDB92C;'></i>
            </div>
        </Headerbtns>
        <div class='renewal-table-content call-detail-table call'>
            <div class='renewal-table-content-top1' ref='renewal_top1' style='position:relative;z-index: 100'>
                催缴明细
            </div>
            <div class='renewal-table-content-top2 call-details-table' ref='renewal_top2' style='position:relative;z-index: 100'>
                <p style='width:40px;'>排序：</p>
                <div style='display: flex;width:80%'>
                    <year-picker class="picker" :values="TitleType" v-model="TitleType" :items="SelectList" code="id" text="text"></year-picker>
                    <p class='call-detail-img-bottom'></p>
                </div>
                <p class='call-detail-img-top' @click='SortData'></p>
            </div>
            <div id='content_div'>
                <div id="right_div" style='overflow: scroll;'>
                    <div id="right_div1">
                        <div id="right_divx">
                            <table id="right_table1" ref='right_table1'>
                                <tr class='flex'>
                                    <th class='td-1 td-left' style='z-index: 1000'>序号</th>
                                    <th class='td-2 td-left' style='z-index: 1000'>保单号</th>
                                    <th class='td-1-1'>序号</th>
                                    <th class='td-1-2'>保单号</th>
                                    <th class='td-1-3'>应收日期</th>
                                    <th class='td-1-4'>应收保费</th>
                                    <th class='td-1-5'>交费日期</th>
                                    <th class='td-1-6'>实收保费</th>
                                    <th class='td-1-7'>保单类型</th>
                                    <th class='td-1-8'>保单年度</th>
                                    <th class='td-1-9'>险种名称</th>
                                    <th class='td-1-10'>保单状态</th>
                                    <th class='td-1-11'>缴费频率</th>
                                    <th class='td-1-12'>交费途径</th>
                                    <th class='td-1-13'>生效日期</th>
                                    <th class='td-1-14'>主险缴费年期</th>
                                    <th class='td-1-15'>投保人姓名</th>
                                    <th class='td-1-16'>投保人性别</th>
                                    <th class='td-1-17'>投保人生日</th>
                                    <th class='td-1-18'>投保人电话</th>
                                    <th class='td-1-19'>投保人地址</th>
                                    <th class='td-1-20'>保费逾期未付选择权</th>
                                    <th class='td-1-21'>是否被挂起</th>
                                    <th class='td-1-22'>以往是否有过理赔</th>
                                    <th class='td-1-23'>目前是否有垫交保费未还清</th>
                                    <th class='td-1-24'>三级机构</th>
                                    <th class='td-1-25'>销售渠道</th>
                                    <th class='td-1-26'>服务代理人姓名</th>
                                    <th class='td-1-27'>承保代理人姓名</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  :auto-fill="false" ref="loadmore">
                        <div id="right_div2" ref='right_div2' style='display: flex;'>
                            <div style='width:175px;overflow: hidden;'>
                                <table class='left-btm-table' ref='right_table3'>
                                    <tr v-for='item in leftList'>
                                        <td class='td-2-1'>{{item.serialno}}</td>
                                        <td class='td-2-2'>{{item.contno}}</td>
                                    </tr>
                                </table>
                            </div>
                            <table id="right_table2" ref='right_table2'>
                                <tr v-for='item in TableList' v-if='TableList.length>0'>
                                    <td class='td-1-1'>{{item.serialno}}</td>
                                    <td class='td-1-2'>{{item.contno}}</td>
                                    <td class='td-1-3'>{{item.paytodate}}</td>
                                    <td class='td-1-4'>{{item.money}}</td>
                                    <td class='td-1-5'>{{item.tmakedate}}</td>
                                    <td class='td-1-6'>{{item.factmoney}}</td>
                                    <td class='td-1-7'>{{item.conttype}}</td>
                                    <td class='td-1-8'>{{item.payyear}}</td>
                                    <td class='td-1-9'>{{item.riskname}}</td>
                                    <td class='td-1-10'>{{item.contstate}}</td>
                                    <td class='td-1-11'>{{item.payintv}}</td>
                                    <td class='td-1-12'>{{item.paytype}}</td>
                                    <td class='td-1-13'>{{item.cvalidate}}</td>
                                    <td class='td-1-14'>{{item.payyears}}</td>
                                    <td class='td-1-15'>{{item.appntname}}</td>
                                    <td class='td-1-16'>{{item.appntsex}}</td>
                                    <td class='td-1-17'>{{item.appntbirthday}}</td>
                                    <td class='td-1-18' @click='callIphone(item.appntmobile)'  :class="[item.appntmobile.indexOf('*')>-1?'ddd':'blue']">{{item.appntmobile}}</td>
                                    <td class='td-1-19'>{{item.appntaddress}}</td>
                                    <td class='td-1-20'>{{item.choosflag}}</td>
                                    <td class='td-1-21'>{{item.hangflag}}</td>
                                    <td class='td-1-22'>{{item.lipeiflag}}</td>
                                    <td class='td-1-23'>{{item.dianjiaoflag}}</td>
                                    <td class='td-1-24'>{{item.managecom}}</td>
                                    <td class='td-1-25'>{{item.branchtype}}</td>
                                    <td class='td-1-26' @click='goToAgentdetail(1,item.serialno,item.seragentname)'>{{item.seragentname}}</td>
                                    <td class='td-1-27' @click='goToAgentdetail(2,item.serialno,item.signagentname)'>{{item.signagentname}}</td>
                                </tr>
                            </table>
                        </div>
                    </mt-loadmore>
                </div>
            </div>
            <div class='flex btm-btns' style='position: fixed;bottom:0;height:50px;width:100%;background: #fff'>
                <button @click='previousMsg'>上一页</button>
                <div class='flex'>
                    <p style='color:#EDB657;border:2px solid #EDB657;background:#FBDDB7;width:20px;height:20px;line-height: 20px;text-align: center;border-radius: 3px;'>{{pageNum}}</p>
                    <p style='color:#9D9D9D'>&nbsp;页</p>
                </div>
                <div class='flex' style='color:#9D9D9D;margin:0 5px;'>
                    共{{totalNumTiao}}条
                </div>
                <div class='flex'>  
                    <input type="number" style='width:20px;border:none;padding:2px 1px;text-align: center;border:1px solid #ccc;border-radius: 3px;' v-model='NumMsg'/>
                    /{{pageTotal}}页
                    <button @click='getInputMsg(NumMsg)'>跳转</button>
                </div>
                <button @click='nextGetMsg'>下一页</button>
            </div>
            <p><Alert ref="showalert"></Alert></p>
        </div>
    </div>
</template>
<script>
    import Headerbtns from '@/components/policy/common/Header'
    import {mapState,mapMutations} from 'vuex'
    import store from '@/vuex/comprehensive/comprehensive'
    import yearPicker from '@/components/common/Picker.vue'
    import Alert from '@/components/policy/common/alert'
    export default {
        components:{
            Headerbtns,yearPicker,Alert
        },
        data(){
            return {
                btmDivLeft:'',
                page_title:'催缴明细查询',
                isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                personsal:utils.cache.get('personsal'),
                SelectList:['应收日期','应收保费','交费日期','保单年度','保单类型'],
                TableList:[],
                TitleType:'',
                getDataType:'',
                ASC:false,/*正序倒序*/
                dataList:[
                {key:'1',text:'应收日期',type:'paytodate',active:false},
                {key:'2',text:'应收保费',type:'money',active:false},
                {key:'3',text:'交费日期',type:'tmakedate',active:false},
                {key:'4',text:'保单年度',type:'payyear',active:false},
                {key:'5',text:'保单类型',type:'conttype',active:false}
                ],
                NumMsg:'',
                allLoaded:true,
                pageNum:1,
                pageTotal:0,
                leftList:[],
                totalNumTiao:''
            }
        },
        mounted(){
            let _this = this
            let btm = _this.$refs.right_div2
            btm.addEventListener('scroll', _this.getLeft)
            let bodyHeight = document.documentElement.clientHeight;
            let div1Hieght = this.$refs.renewal_top1.offsetHeight
            let div2Hieght = this.$refs.renewal_top2.offsetHeight
            let TableHeight = bodyHeight - div1Hieght - div2Hieght -160+12
            $('#right_div2').height(TableHeight+'px')
            console.log(this.CallData)
            if(this.isiOS){
                if(screen.height == 812 && screen.width == 375){
                    $('.renewal-table-content').css('margin-top','88px')
                }else{
                    $('.renewal-table-content').css('margin-top','68px')
                }
            }else{
                $('.renewal-table-content').css('margin-top','50px')
            }
            this.getDataType = 'paytodate'
            this.ASC = 'ASC'
            this.getMsg(this.getDataType,this.ASC)
        },
        computed:{
            ...mapState(['CallData','XuQiAgentData'])
        },store,
        methods:{
            ...mapMutations(['SetXuQiAgentData','SetTablesNum']),
            Aleart(message) {
                this.$refs.showalert.showMOdal(message)
            },
            loadBottom(){
                this.allLoaded = true;// 若数据已全部获取完毕
            },
            getLeft(){
                let btmDiv = this.$refs.right_div2
                this.btmDivLeft = btmDiv.scrollLeft
                let topDiv = this.$refs.right_table1
                topDiv.style.left = '-'+ btmDiv.scrollLeft + 'px'
                let TopWidth = $('#right_div2').scrollTop()
                console.log(TopWidth)
                this.$refs.right_table3.style.marginTop = '-'+TopWidth+'px'
            },
            Goback(){
                this.SetTablesNum(1)
                this.$router.push('/comprehensiveXuqi/calldetailindex')
            },
            getMsg(orderByClause,sort){
                this.leftList = []
                let data = this.CallData
                data.orderByClause = orderByClause
                data.sort = sort
                let requ = {
                    search:data
                }
                utils.http.postFast('ZHXQPROMPTDETAILS',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.promptDetails
                        this.pageTotal = body.search.pageTotal
                        this.totalNumTiao = body.search.pageCount
                        if(this.TableList.length>0){
                            this.TableList.forEach(item=>{
                                let Sobject = {
                                    serialno:item.serialno,
                                    contno:item.contno
                                }
                                this.leftList.push(Sobject)
                            })
                            console.log(this.leftList)
                        }
                        console.log(this.TableList)
                    }else{
                        this.TableList = []
                        this.Aleart(header.resultMsg)
                    }
                })
            },
            handleClickGetMsg(pageNum){
                this.leftList = []
                let data = this.CallData
                data.orderByClause = this.getDataType
                data.sort = this.ASC
                data.pageNum = pageNum
                let requ = {
                    search:data
                }
                console.log(requ)
                utils.http.postFast('ZHXQPROMPTDETAILS',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.promptDetails
                        this.totalNumTiao = body.search.pageCount
                        this.pageNum = pageNum
                        if(this.TableList.length>0){
                            this.TableList.forEach(item=>{
                                let Sobject = {
                                    serialno:item.serialno,
                                    contno:item.contno
                                }
                                this.leftList.push(Sobject)
                            })
                            console.log(this.leftList)
                        }
                        console.log(this.TableList)
                    }else{
                        console.log('数据异常2')
                        this.TableList = []
                        console.log(this.TableList)
                        this.Aleart(header.resultMsg)
                    }
                })
            },
            previousMsg(){
                console.log(this.pageNum)
                if(this.pageNum>=2){
                    this.pageNum--
                    this.handleClickGetMsg(this.pageNum)
                }else{
                    this.Aleart('页码出错')
                }
            },
            getInputMsg(NumMsg){
                console.log(NumMsg%1)
                if(NumMsg%1==0 && NumMsg>0){
                    this.handleClickGetMsg(NumMsg)
                }else{
                    this.Aleart('页码出错')
                }
            },
            nextGetMsg(){
                let pageNum = parseInt(this.pageNum)
                let pageTotal = parseInt(this.pageTotal)
                if(pageNum<pageTotal){
                    this.pageNum++
                    this.handleClickGetMsg(this.pageNum)
                }else{
                    this.Aleart('没有更多数据')
                }
            },
            SortData(){
                let NewASC = false
                this.dataList.forEach( item => {
                    if(this.TitleType == item.text){
                        this.getDataType = item.type
                        item.active = !item.active
                        NewASC = item.active
                    }
                })
                if(NewASC){
                    this.ASC = 'ASC'
                }else{
                    this.ASC = 'DESC'
                }
                if(this.getDataType){
                    this.getMsg(this.getDataType,this.ASC)
                }else{
                    this.Aleart('请选择排序方式')
                }
            },
            goToAgentdetail(type,id,name){
                let data = {}
                if(name){
                    if(type == 1){/*服务代理人*/
                        this.TableList.forEach( item => {
                            if(item.serialno == id){
                                data.type = '1'
                                data.signagentname = item.seragentname/*姓名*/
                                data.serbranchattrname = item.serbranchattrname/*区部名称*/
                                data.seragentcode = item.seragentcode/*服务搭理人id*/
                                data.seragentphone = item.seragentphone/*电话*/
                            }
                        })
                        console.log('服务代理人数据--->>>',data)
                    }else if(type == 2){/*承保代理人*/
                        this.TableList.forEach( item => {
                            if(item.serialno == id){
                                data.type = '2'
                                data.signagentname = item.signagentname/*姓名*/
                                data.serbranchattrname = item.signbranchattrname/*区部名称*/
                                data.seragentcode = item.signagentcode/*承保搭理人id*/
                                data.seragentphone = item.signagentphone/*电话*/
                            }
                        })
                    }
                    this.SetXuQiAgentData(data);
                    this.$router.push('renewal_agentdetails');
                }
            },
            callIphone(id) {
                if(id){
                    if(id.indexOf("*")>-1){
                        　console.log('有*')
                    }else {
                        var url = this.personsal.IOS_URL
                        var urlObj = {
                            "url": id
                        }
                        var urlStr = JSON.stringify(urlObj)
                        var hybrid = 'hybrid://MAApkIphone:401/invokeApkIphone?' + urlStr
                        MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
                            alert(JSON.stringify(callbackSucc))
                        }, function(callbackFail) {
                            alert(callbackFail)
                        });
                    }
                }
            }
        }
    }
</script>
<style>
.table_content .mbsc-control-ev{
    text-align: left!important;
    background:#fff;
}
.call-detail-table .flex{
    display: flex;
    align-items: center;
    justify-content: center;
}
#content_div ::-webkit-scrollbar{
    width:0px
}
.call-details-table input{
    width:100%;
    height:30px;
    border-radius: 5px;
    border:1px solid #ccc;
    padding:0 5px;
}
.call-details-table>div{
    align-items: center;
    position:relative;
}
table{
    border-collapse:collapse;
}
.call-detail-table td,.call-detail-table th{
    border-bottom:1px dotted #c1c1c1;
    box-sizing: border-box!important;
    padding:5px!important;
    text-align: center;
    vertical-align: middle;
}
.call-detail-table #right_div{
    width: 100%;/*设备宽度*/
    float: left;
}
.call-detail-table #right_div1{
    width: 100%;
    overflow: hidden;
    position:relative;
}
.call-detail-table #right_divx{
    width: 2800px;
    color:#000;
}
.call-detail-table #right_div2{
    width:100%;/*设备宽度*/
    height:178px;
    overflow: scroll;
}
.call-detail-table #right_table1{
    width: 2800px;
    position:relative;
    background:#FEB101;
    border-bottom:none;
}
#right_div tr{
    height:35px!important;
}
#right_table1 th{
    color:#fff;
    border-bottom:none;
}
.call-detail-table #right_table2{
    width: 100%;
    overflow: scroll;
}

.renewal-table-content{
    margin-top:50px;
}
.renewal-table-content-top1{
    background:#fff;
    text-align: center;
    height:45px;
    line-height: 45px;
    color:#FEB101;
    font-size:1rem;
}
.renewal-table-content-top2{
    height:50px;
    align-items: center;
    background:#eee;
    display: flex;
    padding:0 5%;
    border-top:1px solid #c1c1c1;
    border-bottom:1px solid #c1c1c1;
}
.renewal-table-content .call-detail-img-bottom{
  background:url('../../../../../../static/img/comprehensive/Xuqi/bottom.png') no-repeat;
  background-size:100% 100%;
  width:15px;
  height:10px;
  position:absolute;
  right:5%;
}
.renewal-table-content .call-detail-img-top{
  background:url('../../../../../../static/img/comprehensive/Xuqi/result.png') no-repeat;
  background-size:100% 100%;
  width:20px;
  height:20px;
  margin-left:10px;
}
.call-detail-table .td-1-1{
    width:55px;
    min-width:55px;
    max-width:55px;
}
.call-detail-table .td-1-3,
.call-detail-table .td-1-17,
.call-detail-table .td-1-18{
    width:110px;
    min-width:110px;
    max-width:110px;
}
.call-detail-table .td-1-4{
    width:95px;
    min-width:95px;
    max-width:95px;
}
.call-detail-table .td-1-5,
.call-detail-table .td-1-6,
.call-detail-table .td-1-7,
.call-detail-table .td-1-10,
.call-detail-table .td-1-11,
.call-detail-table .td-1-12,
.call-detail-table .td-1-14,
.call-detail-table .td-1-15,
.call-detail-table .td-1-16,
.call-detail-table .td-1-21,
.call-detail-table .td-1-25{
    width:85px;
    min-width:85px;
    max-width:85px;
}
.call-detail-table .td-1-2,
.call-detail-table .td-1-8,
.call-detail-table .td-1-13,
.call-detail-table .td-1-22,
.call-detail-table .td-1-23,
.call-detail-table .td-1-24,
.call-detail-table .td-1-26,
.call-detail-table .td-1-27{
    width:120px!important;
    min-width:120px!important;
    max-width:120px!important;
}
.call-detail-table .td-1-20{
    width:130px;
    min-width:130px;
    max-width:130px;
}
.call-detail-table .td-1-9{
    width:220px;
    min-width:220px;
    max-width:220px;
}
.call-detail-table .td-1-19{
    width:220px;
    min-width:220px;
    max-width:220px;
}
#content_div img{
    width:10px;
    height:20px;
    margin-left:5px;
}
.mint-loadmore{
    /*overflow: scroll;*/
}
#right_div1::-webkit-scrollbar,
#right_div2::-webkit-scrollbar
{ width: 0 !important;display: none; }
.btm-btns button{
    background:#FEB101;
    color:#fff;
    border:none;
    outline: none;
    border-radius: 3px;
    padding:2px;
    margin:0 5px;
}
button:active{
    opacity: 0.8;
}
.call-detail-table .td-1,.call-detail-table .td-2{
    position: fixed;
    background:#FEB101;
    height:35px;
    line-height: 26px;
}
.call .td-1{
    left:0;
    width:55px;
}
.call .td-2{
    left:55px;
    width:120px;
}
.call .left-btm-table{
    position: fixed;
    background:#fff;
    overflow: scroll;
}
.call .left-btm-table,.call .left-btm-table>tr{
    width:175px!important;
}
#right_div::-webkit-scrollbar {display: none}
.ddd{
    color:#333!important;
}
.blue{
    color:blue!important;
}
</style>