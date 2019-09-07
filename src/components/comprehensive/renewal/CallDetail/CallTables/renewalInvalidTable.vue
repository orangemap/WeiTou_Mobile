<template>
    <div style='overflow: hidden;' class='wal-navlid-content'>
        <Headerbtns :title="page_title">
            <div ref='header' slot="left" class="back" @click="Goback">
                <i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;color: #FDB92C;'></i>
            </div>
        </Headerbtns>
        <div class='renewal-table-content renewal-lnvalid-table'>
            <div class='renewal-table-content-top1' ref='renewal_top1' style='position:relative;z-index: 100'>
                失效可复效及垫交保单明细清单
            </div>
            <div class='renewal-table-content-top2' ref='renewal_top2' style='position:relative;z-index: 100'>
                <p style='width:40px;'>排序：</p>
                <div class='still-valid-table-top-div'>
                    <year-picker class="picker" :values="TitleType" v-model="TitleType" :items="SelectList" code="id" text="text"></year-picker>
                    <p class='call-detail-img-bottom'></p>
                </div>
                <p class='call-detail-img-top' @click='SortData'></p>
            </div>
            <div id='content_div'>
                <div id='content_div'>
                    <div id="right_div" style='overflow-x: scroll;'>
                        <div id="right_div1">
                            <div id="right_divx">
                                <table id="right_table1" ref='right_table1'>
                                    <tr>
                                        <th class='td-1 td-left' style='z-index: 1000'>序号</th>
                                        <th class='td-2 td-left' style='z-index: 1000'>保单号</th>
                                        <th class='td-1-1'>序号</th>
                                        <th class='td-1-2'>保单号</th>
                                        <th class='td-1-3'>应收保费</th>
                                        <th class='td-1-4'>失效/垫缴</th>
                                        <th class='td-1-5'>失效日/自垫日</th>
                                        <th class='td-1-6'>交至日期</th>
                                        <th class='td-1-7'>保单状态</th>
                                        <th class='td-1-8'>保单类型</th>
                                        <th class='td-1-9'>缴费频率</th>
                                        <th class='td-1-10'>交费途径</th>
                                        <th class='td-1-11'>生效日期</th>
                                        <th class='td-1-12'>险种类别</th>
                                        <th class='td-1-13'>险种代码</th>
                                        <th class='td-1-14'>险种名称</th>
                                        <th class='td-1-15'>投保人姓名</th>
                                        <th class='td-1-16'>投保人性别</th>
                                        <th class='td-1-17'>投保人生日</th>
                                        <th class='td-1-18'>投保人电话</th>
                                        <th class='td-1-19'>投保人地址</th>
                                        <th class='td-1-20'>三级机构</th>
                                        <th class='td-1-21'>销售渠道</th>
                                        <th class='td-1-22'>服务代理人姓名</th>
                                        <th class='td-1-23'>承保代理人姓名</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  :auto-fill="false" ref="loadmore">
                            <div id="right_div2" ref='right_div2' style='display: flex;'>
                                <div style='width:155px;overflow: hidden;'>
                                    <table class='left-btm-table' ref='right_table3'>
                                        <tr v-for='item in leftList'>
                                            <td class='td-2-1'>{{item.serialno}}</td>
                                            <td class='td-2-2'>{{item.contno}}</td>
                                        </tr>
                                    </table>
                                </div>
                                <table id="right_table2" ref='right_table2'>
                                    <tr v-for='item in TableList'>
                                        <td class='td-1-1'>{{item.serialno}}</td>
                                        <td class='td-1-2'>{{item.contno}}</td>
                                        <td class='td-1-3'>{{item.money}}</td>
                                        <td class='td-1-4'>{{item.termflag}}</td>
                                        <td class='td-1-5'>{{item.availabledate}}</td>
                                        <td class='td-1-6'>{{item.payenddate}}</td>
                                        <td class='td-1-7'>{{item.contstate}}</td>
                                        <td class='td-1-8'>{{item.conttype}}</td>
                                        <td class='td-1-9'>{{item.payintv}}</td>
                                        <td class='td-1-10'>{{item.paytype}}</td>
                                        <td class='td-1-11'>{{item.cvalidate}}</td>
                                        <td class='td-1-12'>{{item.risktype}}</td>
                                        <td class='td-1-13'>{{item.riskcode}}</td>
                                        <td class='td-1-14'>{{item.riskname}}</td>
                                        <td class='td-1-15'>{{item.appntname}}</td>
                                        <td class='td-1-16'>{{item.appntsex}}</td>
                                        <td class='td-1-17'>{{item.appntbirthday}}</td>
                                        <td class='td-1-18' @click='callIphone(item.appntmobile)' :class="[item.appntmobile.indexOf('*')>-1?'ddd':'blue']">{{item.appntmobile}}</td>
                                        <td class='td-1-19'>{{item.appntaddress}}</td>
                                        <td class='td-1-20'>{{item.managecom}}</td>
                                        <td class='td-1-21'>{{item.branchtype}}</td>
                                        <td class='td-1-22' @click='goToAgentdetail(1,item.serialno,item.seragentname)'>{{item.seragentname}}</td>
                                        <td class='td-1-23' @click='goToAgentdetail(2,item.serialno,item.signagentname)'>{{item.signagentname}}</td>
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
                SelectList:['应收保费','保单状态','失效/自垫','失效日/自垫日'],
                TableList:[],
                TitleType:'',
                getDataType:'',
                ASC:false,/*正序倒序*/
                dataList:[
                {key:'1',text:'应收保费',type:'money',active:false},
                {key:'2',text:'保单状态',type:'contstate',active:false},
                {key:'3',text:'失效/自垫',type:'termFlag',active:false},
                {key:'4',text:'失效日/自垫日',type:'availabledate',active:false},
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
            let TableHeight = bodyHeight - div1Hieght - div2Hieght -160 + 12
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
            this.getDataType = 'availabledate'
            this.ASC = 'ASC'
            this.getMsg(this.getDataType,this.ASC)
        },
        computed:{
            ...mapState(['LnvalidData'])
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
                this.SetTablesNum(5)
                this.$router.push('/comprehensiveXuqi/calldetailindex')
            },
            getMsg(branchtype,sort){
                this.leftList = []
                let data = this.LnvalidData
                data.orderByClause = branchtype
                data.sort = sort
                let requ = {
                    search:data
                }
                utils.http.postFast('ZHXQLOSEPOLICYLIST',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.losePolicyList
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
                        console.log('数据异常')
                        this.TableList = []
                        this.Aleart(header.resultMsg)
                    }
                })
            },
            handleClickGetMsg(pageNum){
                this.leftList = []
                let data = this.LnvalidData
                data.orderByClause = this.getDataType
                data.sort = this.ASC
                data.pageNum = pageNum
                let requ = {
                    search:data
                }
                console.log(requ)
                utils.http.postFast('ZHXQLOSEPOLICYLIST',requ,(body,header) => {
                    console.log(body)
                    console.log(header)
                    if(header.resultCode == '0'){
                        this.TableList = body.search.losePolicyList
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
.wal-navlid-content .mbsc-control-ev{
    text-align: left;
}
.renewal-table-content .flex{
    display: flex;
    align-items: center;
    justify-content: center;
}
.still-valid-table .flex{
    display: flex;
    align-items: center;
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
.renewal-lnvalid-table #right_table2,
.renewal-lnvalid-table #right_table1,
.renewal-lnvalid-table #right_divx{
    width: 2355px;
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
.renewal-lnvalid-table td,.renewal-lnvalid-table th{
    text-align: center;
    min-height:35px;
    height:35px;
}
.renewal-lnvalid-table .td-1-1{
    width:55px;
    min-width:55px;
    max-width:55px;
}
.renewal-lnvalid-table .td-1-3,
.renewal-lnvalid-table .td-1-4,
.renewal-lnvalid-table .td-1-7,
.renewal-lnvalid-table .td-1-8,
.renewal-lnvalid-table .td-1-9,
.renewal-lnvalid-table .td-1-10,
.renewal-lnvalid-table .td-1-12,
.renewal-lnvalid-table .td-1-13,
.renewal-lnvalid-table .td-1-15,
.renewal-lnvalid-table .td-1-16,
.renewal-lnvalid-table .td-1-20{
    width:80px;
    min-width:80px;
    max-width:80px;
}
.renewal-lnvalid-table .td-1-2{
    width:100px;
    min-width:100px;
    max-width:100px;
}
.renewal-lnvalid-table .td-1-5,
.renewal-lnvalid-table .td-1-6,
.renewal-lnvalid-table .td-1-11,
.renewal-lnvalid-table .td-1-17,
.renewal-lnvalid-table .td-1-18,
.renewal-lnvalid-table .td-1-21,
.renewal-lnvalid-table .td-1-23{
    width:100px;
    min-width:100px;
    max-width:100px;
}
.renewal-lnvalid-table .td-1-22{
    width: 180px;
    min-width:180px;
    max-width:180px;
}
.renewal-lnvalid-table .td-1-14,
.renewal-lnvalid-table .td-1-19{
    width:220px;
    min-width:220px;
    max-width:220px;
}
.renewal-lnvalid-table .td-1-23{
    word-break:break-all
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
.renewal-lnvalid-table .td-1,.renewal-lnvalid-table .td-2{
    position: fixed;
    background:#FEB101;
    height:35px;
    line-height: 26px;
}
.renewal-lnvalid-table .td-1{
    left:0;
    width:55px;
}
.renewal-lnvalid-table .td-2{
    left:55px;
    width:100px;
}
.renewal-lnvalid-table .left-btm-table{
    position: fixed;
    background:#fff;
    overflow: scroll;
}
.renewal-lnvalid-table .left-btm-table,.renewal-lnvalid-table .left-btm-table>tr{
    width:155px!important;
}
#right_div::-webkit-scrollbar {display: none}
.ddd{
    color:#333!important;
}
.blue{
    color:blue!important;
}
</style>