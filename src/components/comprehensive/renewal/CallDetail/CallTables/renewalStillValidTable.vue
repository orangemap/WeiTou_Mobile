<template>
    <div class='wal-still-valid'>
        <Headerbtns :title="page_title">
            <div ref='header' slot="left" class="back" @click="Goback">
                <i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;color: #FDB92C;'></i>
            </div>
        </Headerbtns>
        <div class='renewal-table-content ren-still-calid'>
            <div class='renewal-table-content-top1' ref='renewal_top1' style='position:relative;z-index: 100'>
                主险交费期满附加险仍有效清单
            </div>
            <div class='renewal-table-content-top2' ref='renewal_top2' style='position:relative;z-index: 100'>
                <p style='width:40px;'>排序：</p>
                <div class='still-valid-table-top-div'>
                    <year-picker class="picker" :values="TitleType" v-model="TitleType" :items="SelectList" code="id" text="text"></year-picker>
                    <p class='call-detail-img-bottom'></p>
                </div>
                <p class='call-detail-img-top' @click='SortData'></p>
            </div>
            <div id='content_div' class='still-valid-table'>
                <div id='content_div'>
                    <div id="right_div">
                        <div id="right_div1">
                            <div id="right_divx">
                                <table id="right_table1" ref='right_table1'>
                                    <tr class='flex'>
                                        <th class='td-1 td-left' style='z-index: 1000;line-height: 24px'>序号</th>
                                        <th class='td-2 td-left' style='z-index: 1000;line-height: 24px'>保单号</th>
                                        <th class='td-1-1'>序号</th>
                                        <th class='td-1-2'>保单号</th>
                                        <th class='td-1-3'>应收日期</th>
                                        <th class='td-1-4'>应收保费</th>
                                        <th class='td-1-5'>交费日期</th>
                                        <th class='td-1-6'>实收保费</th>
                                        <th class='td-1-7'>保单类型</th>
                                        <th class='td-1-8'>保单年度</th>
                                        <th class='td-1-9'>险种类别</th>
                                        <th class='td-1-10'>险种代码</th>
                                        <th class='td-1-11'>险种名称</th>
                                        <th class='td-1-12'>险种状态</th>
                                        <th class='td-1-13'>缴费频率</th>
                                        <th class='td-1-14'>交费途径</th>
                                        <th class='td-1-15'>生效日期</th>
                                        <th class='td-1-16'>主险缴费年期</th>
                                        <th class='td-1-17'>投保人姓名</th>
                                        <th class='td-1-18'>投保人性别</th>
                                        <th class='td-1-19'>投保人生日</th>
                                        <th class='td-1-20'>投保人电话</th>
                                        <th class='td-1-21'>投保人地址</th>
                                        <th class='td-1-22'>保费逾期未付选择权</th>
                                        <th class='td-1-23'>是否被挂起</th>
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
                                            <td class='td-2-1' style='width:55px;'>{{item.serialno}}</td>
                                            <td class='td-2-2' style='width:110px;'>{{item.contno}}</td>
                                        </tr>
                                    </table>
                                </div>
                                <table id="right_table2" ref='right_table2'>
                                    <tr v-for='item in TableList'>
                                        <td class='td-1-1'>{{item.serialno}}</td>
                                        <td class='td-1-2'>{{item.contno}}</td>
                                        <td class='td-1-3'>{{item.shouldpaydate}}</td>
                                        <td class='td-1-4'>{{item.shouldmoney}}</td>
                                        <td class='td-1-5'>{{item.tmakedate}}</td>
                                        <td class='td-1-6'>{{item.transmoney}}</td>
                                        <td class='td-1-7'>{{item.conttype}}</td>
                                        <td class='td-1-8'>{{item.payyear}}</td>
                                        <td class='td-1-9'>{{item.risktype}}</td>
                                        <td class='td-1-10'>{{item.riskcode}}</td>
                                        <td class='td-1-11'>{{item.riskname}}</td>
                                        <td class='td-1-12'>{{item.riskstate}}</td>
                                        <td class='td-1-13'>{{item.payintv}}</td>
                                        <td class='td-1-14'>{{item.payway}}</td>
                                        <td class='td-1-15'>{{item.maincvalidate}}</td>
                                        <td class='td-1-16'>{{item.mainpyayears}}</td>
                                        <td class='td-1-17'>{{item.scanagentname}}</td>
                                        <td class='td-1-18'>{{item.scanagentsex}}</td>
                                        <td class='td-1-19'>{{item.scanagentbirth}}</td>
                                        <td class='td-1-20' @click='callIphone(item.scanagentmbile)'  :class="[item.scanagentmbile.indexOf('*')>-1?'ddd':'blue']">{{item.scanagentmbile}}</td>
                                        <td class='td-1-21'>{{item.scanagentaddress}}</td>
                                        <td class='td-1-22'>{{item.overnoflag}}</td>
                                        <td class='td-1-23'>{{item.hangflag}}</td>
                                        <td class='td-1-24'>{{item.managecom}}</td>
                                        <td class='td-1-25'>{{item.salechnl}}</td>
                                        <td class='td-1-26' @click='goToAgentdetail(1,item.serialno,item.servagentcodename)'>{{item.servagentcodename}}</td>
                                        <td class='td-1-27' @click='goToAgentdetail(2,item.serialno,item.signagentcodename)'>{{item.signagentcodename}}</td>
                                    </tr>
                                </table>
                            </div>
                        </mt-loadmore>
                    </div>
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
    import yearPicker from '../../../../common/Picker.vue'
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
                SelectList:['应收日期','应收保费','交费日期','险种状态','保单年度'],
                TableList:[],
                TitleType:'',
                getDataType:'',
                ASC:false,/*正序倒序*/
                dataList:[
                {key:'1',text:'应收日期',type:'shouldpaydate',active:false},
                {key:'2',text:'应收保费',type:'shouldmoney',active:false},
                {key:'3',text:'交费日期',type:'tmakedate',active:false},
                {key:'4',text:'险种状态',type:'riskstate',active:false},
                {key:'5',text:'保单年度',type:'payyear',active:false}
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
            let TableHeight = bodyHeight - div1Hieght - div2Hieght - 160 + 10
            $('#right_div2').height(TableHeight+'px')
            if(this.isiOS){
                if(screen.height == 812 && screen.width == 375){
                    $('.renewal-table-content').css('margin-top','88px')
                }else{
                    $('.renewal-table-content').css('margin-top','68px')
                }
            }else{
                $('.renewal-table-content').css('margin-top','50px')
            }
            this.getDataType = 'shouldpaydate'
            this.ASC = 'ASC'
            this.getMsg(this.getDataType,this.ASC)
        },
        computed:{
            ...mapState(['StillValidData'])
        },store,
        methods:{
            ...mapMutations(['SetXuQiAgentData','SetTablesNum']),
            loadBottom(){
                this.allLoaded = true;// 若数据已全部获取完毕
            },
            goToAgentdetail(type,id,name){
                if(name){
                    let data = {}
                    if(type == 1){/*服务代理人*/
                        this.TableList.forEach( item => {
                            if(item.serialno == id){
                                data.type = '1'
                                data.signagentname = item.servagentcodename/*姓名*/
                                data.serbranchattrname = item.serbranchattrname/*区部名称*/
                                data.seragentcode = item.seragentcode/*服务搭理人id*/
                                data.seragentphone = item.seragentdeptphone/*电话*/
                            }
                        })
                        console.log('服务代理人数据--->>>',data)
                    }else if(type == 2){/*承保代理人*/
                        this.TableList.forEach( item => {
                            if(item.serialno == id){
                                data.type = '2'
                                data.signagentname = item.signagentcodename/*姓名*/
                                data.serbranchattrname = item.signbranchattrname/*区部名称*/
                                data.seragentcode = item.signagentcode/*承保搭理人id*/
                                data.seragentphone = item.signagentdeptphone/*电话*/
                            }
                        })
                    }
                    this.SetXuQiAgentData(data);
                    this.$router.push('renewal_agentdetails');
                }

            },
            Aleart(message) {
                this.$refs.showalert.showMOdal(message)
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
                this.SetTablesNum(4)
                this.$router.push('/comprehensiveXuqi/calldetailindex')
            },
            getMsg(branchtype,sort){
                this.leftList = []
                let data = this.StillValidData
                data.orderByClause = branchtype
                data.sort = sort
                let requ = {
                    search:data
                }
                console.log(requ)
                utils.http.postFast('ZHXQEFFECTIVELIST',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.effectiveList
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
                let data = this.StillValidData
                data.orderByClause = this.getDataType
                data.sort = this.ASC
                data.pageNum = pageNum
                let requ = {
                    search:data
                }
                console.log(requ)
                utils.http.postFast('ZHXQEFFECTIVELIST',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.effectiveList
                        this.pageTotal = body.search.pageTotal
                        this.pageNum = pageNum
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
                        console.log('数据异常')
                        this.TableList = []
                        this.Aleart(header.resultMsg)
                    }
                })
            },
            previousMsg(){
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
.wal-still-valid .mbsc-control-ev{
    text-align: left!important;
}
.still-valid-table .flex,
.renewal-table-content .flex{
    display: flex;
    align-items: center;
    justify-content: center;
}
#content_div ::-webkit-scrollbar{
    width:0px
}
table{
    border-collapse:collapse;
}
td,th{
    border-bottom:1px dotted #c1c1c1;
    box-sizing: border-box!important;
    padding:5px!important;
    text-align: center;
    vertical-align: middle;
}
#right_div{
    width: 100%;/*设备宽度*/
    float: left;
}
#right_div1{
    width: 100%;
    overflow: hidden;
    position:relative;
}
#right_divx{
    color:#000;
}
#right_div2{
    width:100%;/*设备宽度*/
    height:178px;
    overflow: auto;
}
#right_table1{
    position:relative;
    background:#FEB101;
    border-bottom:none;
}
#right_div tr{
    min-height:35px!important;
    height:35px!important;
    max-height:70px!important;
}
#right_table1 th{
    color:#fff;
    border-bottom:none;
}
.ren-still-calid #right_table2,
.ren-still-calid #right_table1,
.ren-still-calid #right_divx{
    width: 2800px;
}
#right_table2{
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
.renewal-table-content-top2>.mbsc-control-ev{
    width:72%;
    height:30px;
    margin-left:2%;
    border-radius:5px;
    background:#fff;
    border:1px solid #ddd;
    padding-left:10px;
}
.still-valid-table-top-div{
    display: flex;
    align-items: center;
    width:80%;
    position:relative;
}
.still-valid-table-top-div input{
    width:100%;
    height:30px;
    border-radius: 5px;
    border:1px solid #ccc;
    padding:0 5px;
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

#content_div img{
    width:10px;
    height:20px;
    margin-left:5px;
}
.still-valid-table td,.still-valid-table th{
    text-align: center;
    min-height:35px;
    vertical-align: middle;
}
.still-valid-table th{
    line-height: 35px;
}
.still-valid-table .td-1-1{
    width:55px;
    min-width:55px;
    max-width:55px;
}
.still-valid-table .td-1-2,
.still-valid-table .td-1-3,
.still-valid-table .td-1-4,
.still-valid-table .td-1-5,
.still-valid-table .td-1-6,
.still-valid-table .td-1-7,
.still-valid-table .td-1-8,
.still-valid-table .td-1-10,
.still-valid-table .td-1-12,
.still-valid-table .td-1-13,
.still-valid-table .td-1-14,
.still-valid-table .td-1-15,
.still-valid-table .td-1-17,
.still-valid-table .td-1-18,
.still-valid-table .td-1-23,
.still-valid-table .td-1-24{
    width:100px;
    min-width:100px;
    max-width:100px;
}
.still-valid-table .td-1-22{
    width:120px;
    min-width:120px;
    max-width: 120px;
}
.still-valid-table .td-1-9,
.still-valid-table .td-1-16,
.still-valid-table .td-1-19,
.still-valid-table .td-1-20,
.still-valid-table .td-1-25,
.still-valid-table .td-1-26,
.still-valid-table .td-1-27{
    width:120px;
    min-width:120px;
    max-width:120px;
}
.still-valid-table .td-1-11,
.still-valid-table .td-1-21{
    width:220px;
    min-width:220px;
    max-width:220px;
}
.renewal-table-content ::-webkit-scrollbar {
    width: 0;   /* 滚动条宽度为0 */
    height: 0; /* 滚动条高度为0 */
    display: none; /* 滚动条隐藏 */
}
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
.ren-still-calid .td-1,.ren-still-calid .td-2{
    position: fixed;
    background:#FEB101;
    height:35px;
    line-height: 26px;
}
.ren-still-calid .td-1{
    left:0;
    width:55px;
}
.ren-still-calid .td-2{
    left:55px;
    width:100px;
}
.ren-still-calid .left-btm-table{
    position: fixed;
    background:#fff;
    overflow: scroll;
}
.ren-still-calid .left-btm-table,.ren-still-calid .left-btm-table>tr{
    width:155px!important;
}
#right_div::-webkit-scrollbar {display: none}
.ddd{
    color:#ddd!important;
}
.blue{
    color:blue!important;
}
</style>