<template>
    <div class='GoTo-new-content'>
        <Headerbtns :title="page_title">
            <div slot="left" class="back" @click="goBack">
                <i class="fa fa-angle-left"></i>
            </div>
        </Headerbtns>
        <div class='New-Questionnaire-content' v-if='queType==1'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire1'>
                <img src="static/img/policy/Intelligence/radio.png" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>单选题</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire1'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p style='flex:1'>{{ResultRadioData[0].queNotice}}</p>
                </div>
                <p v-show='ResultRadioData[0].queOption' style='margin-left:40px;'>{{ResultRadioData[0].queOption}}</p>
                <div class='New-Questionnaire-content-div-label'>
                    <label v-for='item in ResultRadioData[0].questionOptionList'>
                        <input type="radio" v-model="type1code" :value="item.queCode">
                        <span style='flex:1'>{{item.queContent}}</span>
                    </label>
                </div>
            </div>
            <button class='New-Questionnaire-btn' @click='next(1)'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==2'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire2'>
                <img src="static/img/policy/Intelligence/check.png" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>多选题</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire2'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p>{{ResultCheckboxData[0].queNotice}}</p>
                </div>
                <p style='margin-left:40px;' v-show='ResultCheckboxData[0].queOption'>{{ResultCheckboxData[0].queOption}}</p>
                <div style='margin-top:10px;'>
                    <div class='New-Questionnaire-content-checkbox'>
                        <label v-for='item in ResultCheckboxData[0].questionOptionList' v-if='item.isCureOnly == "N"'>
                            <input type="checkbox" :value="item.queCode" v-model="checkboxList">
                            <span style='flex:1'>{{item.queContent}}</span>
                        </label>
                        <label v-for='item in ResultCheckboxData[0].questionOptionList' v-if='item.isCureOnly == "Y"'>
                            <input type="checkbox" :value="item.queCode" v-model="checkboxYList">
                            <span>{{item.queContent}}</span>
                        </label>
                    </div>
                </div>
            </div>
            <button class='New-Questionnaire-btn' @click='next(2)'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==3'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire3'>
                <img :src="title_url" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>{{titleType}}</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire3'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p>{{RsultInputData[0].queNotice}}</p>
                </div>
                <p style='margin-left:40px;' v-show='RsultInputData[0].queOption'>{{RsultInputData[0].queOption}}</p>
                <textarea maxlength="100" v-model='InputValue' style='margin:20px 10%;width:78%;height:150px;padding:5px' placeholder='请输入'></textarea>
            </div>
            <button class='New-Questionnaire-btn' @click='next(3)'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==4'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire1'>
                <img src="static/img/policy/Intelligence/radio.png" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>多选题</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire1'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p>{{ResultAbroad[0].queNotice}}</p>
                </div>
                <div style='width:80%;border:1px solid #000;margin:0 auto'>
                    <input type="text" placeholder='请输入国家' style='width:80%;padding:5px;' v-model='codeSeach'/>
                </div>
                <p v-show='ResultAbroad[0].queOption' style='margin-left:40px;'>{{ResultAbroad[0].queOption}}</p>
                <p style='width:90%;margin:5px auto;min-height:15px;padding:5px;'>
                    您选择的国家是：<span v-for='tpl in newCountryList' style='font-size:.8rem;'>{{tpl+'，'}}</span>
                </p>
                <div class='New-Questionnaire-content-div-label New-Questionnaire-content-4'>
                    <label v-for='item in SearchData'>
                        <input type="checkbox" :value="item.text" v-model="newCountryList">
                        <span>{{item.text}}</span>
                    </label>
                </div>
            </div>
            <button @click='next(4)' class='New-Questionnaire-btn btn_4'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==5'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire3'>
                <img :src="title_url" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>{{titleType}}</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire3'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p style='flex:1'>{{ResultTextareaData[0].queNotice}}</p>
                </div>
                <p style='margin-left:40px;'>{{ResultTextareaData[0].queOption}}</p>
                <textarea maxlength="100" v-model='TextareaValue' style='margin:20px 10%;width:78%;height:150px;padding:5px' placeholder='请输入'></textarea>
            </div>
            <button class='New-Questionnaire-btn' @click='next(5)'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==6'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire1'>
                <img src="static/img/policy/Intelligence/radio.png" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>多选题</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire1'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p>{{ResultOccupationList[0].queNotice}}</p>
                </div>
                <p style='margin-left:40px;'>{{ResultOccupationList[0].queOption}}</p>
                <div style='width:80%;border:1px solid #000;margin:10px auto'>
                    <input type="text" placeholder='请输入职业' style='width:80%;padding:5px;' v-model='OccupationSeach'/>
                </div>
                <p style='width:90%;margin:5px auto;min-height:15px;padding:5px;'>
                    您选择的职业是：<span v-for='tpl in OccupationList' style='font-size:.8rem;'>{{tpl+'，'}}</span>
                </p>
                <div class='New-Questionnaire-content-div-label New-Questionnaire-content-4'>
                    <label v-for='item in SearchOccupation' style='width:90%'>
                        <input type="checkbox" :value="item.name" v-model="OccupationList">
                        <span>{{item.name}}</span>
                    </label>
                </div>
            </div>
            <button @click='next(6)' class='New-Questionnaire-btn'>下一题</button>
        </div>
        <div class='New-Questionnaire-content' v-if='queType==7'>
            <div class='New-Questionnaire-content-title flex' ref='questionNaire3'>
                <img :src="title_url" alt="" style='width:18px;height:18px;'>
                <p style='font-weight:bold;font-size:1rem;color:#FEB101;margin-left:5px;'>{{titleType}}</p>
            </div>
            <div class='New-Questionnaire-content-div questionNaire3'>
                <div class='flex ZhenDuanOk' style='padding:10px'>
                    <p>{{TitleNum}}</p>
                    <p style='flex:1'>{{ResultTextList[0].queNotice}}</p>
                </div>
                <p style='margin-left:40px;'>{{ResultTextList[0].queOption}}</p>
                <div style='padding-top:10px;margin-left:40px;display:flex;'>
                    <input type='number' v-model='TextValue' placeholder="请输入" style='width:40px;border-bottom:1px solid #000'/>{{TextCompany}}
                </div>
            </div>
            <button class='New-Questionnaire-btn' @click='next(7)'>下一题</button>
        </div>
        <mt-popup v-model="newModel" position="bottom" style='width:80vw!important;height:210px;top:30%;border-radius: 15px;'>
            <div class='mint-msgbox-header' style='background:#002D4E;height:30px;border-top-left-radius: 10px;border-top-right-radius: 10px;'>
                <div class='mint-msgbox-title' style='color:#fff;'>提示</div>
            </div>
            <div class='mint-msgbox-content'>
                <div style='font-size:1rem;text-align:center;padding:0 10px;'>{{modelContent}}</div>
            </div>
            <div class='btn-wrapper' style='display:flex'>
                <button @click='NoModel()' style='display: block;height:40px;background:#FEB101;color:#fff;width:80px;margin:10px auto;border:none;border-radius: 8px;outline: none;'>取消</button>
                <button @click='OkModel()' style='display: block;height:40px;background:#FEB101;color:#fff;width:80px;margin:10px auto;border:none;border-radius: 8px;outline: none;'>确定</button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import Headerbtns from '../policy/common/Header.vue'
    import '../policy/css/base.css'
    import '../../../static/css/flex.css'
    import { Popup } from 'mint-ui'
    import { mapState, mapMutations } from 'vuex'
    import store from '../../vuex/policy/GoToQuestionnaire'
    export default {
        components: {
            Headerbtns
        },
        data() {
            return {
            	policy:{},
            	policyProList:[],//险种列表
                isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                page_title: '健康告知(被保险人)',
                planId: this.$route.params.planId,
                code: 'SE' + this.$route.params.code,
                titleType: '单选题',
                impartCode: 0,/**/
                newModel: false,/*默认提示框不显示*/
                modelContent: '',
                title_url: '/static/img/comprehensive/bottom.png',
                bgImg: 'url("static/img/policy/Intelligence/bg-check.png") no-repeat',
                type1code: '',
                inform: {},
                queType: 1,
                ResultRadioData: [{ queNotice: '' }],/*radio类型问题*/
                ResultCheckboxData: [{ queNotice: '' }],/*checkbox类型问题*/
                checkboxList: [],/*多选题选择的答案*/
                checkboxYList: [],/*多选题选择的互斥答案*/
                RsultInputData: [{ queNotice: '' }],/*input类型问题*/
                ResultAbroad: [{ queNotice: '' }],/*出国问卷*/
                newCountryList: [],/*选中的国家*/
                ResultTextareaData: [{ queNotice: '' }],/*textarea类型问题*/
                TextareaValue: '',/*Textarea答案*/
                ResultTextList:[],/*Text录入题*/
                TextValue:'',/*Text答案*/
                TextCompany:'',/*Text单位*/
                DataOccupationList: [],
                OccupationList: [],/*选中的职业*/
                sex: '',/*性别*/
                isend: false,/*是否填完*/
                isback: false,/*还未填写完，是否要返回*/
                isOk: Boolean,/*判断提交自核报文中是否含有相同题干*/
                content: {},/*请求下一题的数据集合*/
                questionnaireId: '',/*请求下一题的所属问卷*/
                questionCode: '',/*请求下一题的问题编码*/
                InputValue: '',/*录入项问题*/
                TitleNum: 0,/*第几题*/
                impartNo: 0,/*告知排序*/
                bodyData: {},/*请求下一题返回的所有内容*/
                desc: '',/*问卷问题*/
                inform: {
                    caseNo: '',/*唯一标识*/
                    disclosyres: [{/*提交智能核保自核所需报文*/
                        belongWho: 'I',/*被保人*/
                        impartNo: this.impartNo,/*告知排序*/
                        impartContent: '',/*告知题干描述 问题*/
                        impartCode: this.code,/*告知题干编码*/
                        impartAnswerCode: this.code,/*暂定*/
                        impartAnswerValue: 'Y',/*告知答案值*/
                        impartAnswersShow: '是',/*告知答案显示*/
                        questionAnswers: [{}]
                    }]
                },
                codeSeach:'',/*模糊查询国家*/
                OccupationSeach:''/*模糊查询职业*/
            }
        },
        mounted() {
            console.log('反射性问卷,传过来的code为----------->>>', this.$route.params.code)
            console.log('mounted->请求自核的报文是',this.inform.disclosyres)
            let id = this.$route.params.code
            if (id == 2) {
                this.impartNo = 1
            } else if (id == 3) {
                this.impartNo = 2
            } else if (id == 6) {
                this.impartNo = 3
            } else if (id == '8-a') {
                this.impartNo = 4
            } else if (id == '8-b') {
                this.impartNo = 5
            } else if (id == '8-c') {
                this.impartNo = 6
            } else if (id == '8-d') {
                this.impartNo = 7
            } else if (id == '8-e') {
                this.impartNo = 8
            } else if (id == '8-f') {
                this.impartNo = 9
            } else if (id == '8-h') {
                this.impartNo = 10
            }  else if (id == 9) {
                this.impartNo = 11
            } 
            console.log('告知排序--->>>', this.impartNo)
            console.log('题编号--->>>', this.code)
            console.log('告知编码--->>>', this.impartCode)
            this.getPolicyMsg()
            this.inform.caseNo = this.planId
            console.log(this.VuexDesc)
            this.DataOccupationList = this.VuexOccupationList
            console.log(this.VuexPolicy)//描述
            console.log(this.VuexPolicyData)//policy对象
            let BodyHeight = document.documentElement.clientHeight
            let TopHeight = $('.New-Questionnaire-content-title').height()
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            $('.New-Questionnaire-content-div').css('height',BodyHeight - TopHeight - 21 + 'px').css('padding-top', '20px')
            if(isiOS && screen.height == 812 && screen.width == 375){
            	$('.New-Questionnaire-content-div').css('height',BodyHeight - TopHeight - 21 + 'px').css('padding-top', '44px')
            }
            console.log(BodyHeight - TopHeight - 21 + 'px')
        },
        computed: {
            ...mapState(['VuexDesc', 'VuexInform', 'CountryList', 'VuexOccupationList','isQuestion','VuexInformList','VuexPolicy','VuexPolicyData']),
            SearchData(){
                let search = this.codeSeach
                if (search) {
                    return this.CountryList.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.CountryList;
            },
            SearchOccupation(){
                let search = this.OccupationSeach
                if (search) {
                    return this.DataOccupationList.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.DataOccupationList;
            }
        }, store,
        methods: {
            ...mapMutations(['SetVuexInform','SetisQuestion']),
            goBack() {
                console.log(this.isend)
                if (this.isend == 'Y') {/*所有题填选完毕*/
                    console.log('所有题都回答完毕,此时保存请求自核所需报文111')
                    console.log('Vuex存储的请求自核的请求报文----->>>', this.VuexInform)
                    console.log('答完之后的请求自核报文内容----->>>', this.inform)
                    this.$router.push('/policy/inform/' + this.planId)
                } else {
                    this.modelContent = '返回后，您之前的作答的所有题目均将无效，您需重新再次作答，是否确认返回？'
                    this.newModel = true
                    this.isback = true
                }
            },
            ShowModel() {
                this.newModel = true
            },
            NoModel() {/*model*/
                this.newModel = false
                console.log(this.isend)
                console.log('点击了取消按钮')
                if (this.isend == 'Y') {
                    this.$router.push('/policy/inform/' + this.planId)
                }
            },
            OkModel() {/*model*/
                this.newModel = false
                console.log(this.isend)
                console.log('点击了确定按钮')
                if (this.isend == 'Y') {
                    this.goBack()
                } else {
                    if (this.modelContent == '请答完题之后再点击下一步。') {

                    } else {
                        console.log('中途返回')
                        console.log('被保人，题号===>', this.$route.params.insNo, this.$route.params.code)
                        this.policy.custInfo.insurants.firstInsurant.question.resQuestion.resRemark.forEach( item => {
                            if(item.questionNo == this.$route.params.code){
                                item.swh = false
                                item.isBuild = 'N'
                            }
                        })
                        let requ = {
                            'policy':this.policy
                        }
                        utils.http.postFast('MODISTRIESAVE',requ,(body)=> {
                            this.$router.push('/policy/inform/' + this.planId)
                        })
                    }
                }
            },
            getPolicyMsg() {
            //此次接口为获取被保人客户信息准备
            let requ = {
                "policy": {
                    "substepNo": "8",
                    "orderCode": this.planId,
                    "stepNo":'0,1,2',
					"nothave":'1,2'
                }
            }
            utils.http.postFast('MOHQPOLICYMSG', requ, (body, header) => {
                console.log(body)
                this.policy = body.policy
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
				this.policy.custInfo.insurants.otherInsurant.insurant.sort(function(a, b) {
					return parseInt(a.seqNumber) - parseInt(b.seqNumber)
				})
                console.log('policy===>', this.policy)
				console.log('被保人，题号===>', this.$route.params.insNo, this.$route.params.code)
				if (body.policy.agentInfo.sex == '2') {
                    this.sex = 'F'
                } else {
                    this.sex = 'M'
                }
				if(this.$route.params.insNo == '-1') {
					this.policy.custInfo.insurants.firstInsurant.products.product.forEach(item => {
						this.policyProList.push({
							code: item.prodCode
						})
					})
				}
                let NewAge = utils.valid.getAge(this.policy.agentInfo.birthday.slice(0, 10))
                /*取出问卷问题*/
                let data = {
                    'inform': {
                        caseNo: this.planId,
                        age: NewAge,
                        sex: this.sex,
                        role: 'I',
                        flag: 'N',
                        riskTypeList: this.policyProList,/*险种type*/
                        checkBoxValue: 'Y',
                        impartCode: this.code,/*告知编码*/
                        entryList: [{ code: "" }],
                        impartAnswerValue: 'Y',/*告知答案*/
                        questionnaireId: this.code,/*所属问卷*/
                        questionCode: this.code,/*问题编码*/
                        questionAnswerValues: [{ answer: "Y" }],
                        salesChannel: body.policy.agentInfo.branchType,
                        spare: ''
                    }
                }
                this.getMessage(data)
            })
        },
        getMessage(requ) {
            console.log(JSON.stringify(requ))
            utils.http.postFast('GETNEXTQUESTION', requ, (body, header) => {
                this.content = requ
                console.log(body)
                this.bodyData = body
                console.log(header)
                console.log('是否有下一题----->>>', body.inform.flag)
                if (header.resultCode == 0) {
                    /*每次返回数据的同时情况清空答案*/
                    this.content.inform.questionAnswerValues = [{ answer: '' }]
                    if (body.inform.flag == 'N') {
                        this.TitleNum += 1
                        console.log(this.TitleNum)
                        let qType = body.inform.questionList[0].queType
                        this.questionnaireId = body.inform.questionList[0].questionnaireId/*请求下一题的所属问卷*/
                        this.questionCode = body.inform.questionList[0].queId/*请求下一题的问题编码*/
                        console.log('本题类型---------->>>', qType)
                        // console.log(this.queType) 控制显示哪种题
                        if (qType == 'radio') {
                            this.queType = 1
                            this.ResultRadioData = body.inform.questionList
                            console.log(this.ResultRadioData)
                        } else if (qType == 'checkbox') {
                            this.queType = 2
                            this.ResultCheckboxData = body.inform.questionList
                        } else if (qType == 'select') {
                            this.queType = 3
                            this.RsultInputData = body.inform.questionList
                            console.log(this.RsultInputData)
                        } else if (qType == 'select1') {/*出国人员问卷*/
                            this.queType = 4
                            this.ResultAbroad = body.inform.questionList
                        } else if (qType == "textarea") {
                            this.queType = 5
                            this.ResultTextareaData = body.inform.questionList
                        } else if (qType == "select2") {/*职业问卷*/
                            this.queType = 6
                            this.ResultOccupationList = body.inform.questionList
                        } else if (qType == 'text') {
                            this.queType = 7
                            this.ResultTextList = body.inform.questionList
                            if(this.ResultTextList[0].queOption == '选项：白酒' || this.ResultTextList[0].queOption == '选项：黄酒'){
                                this.TextCompany = '两'
                            }else if(this.ResultTextList[0].queOption == '选项：红酒'){
                                this.TextCompany = '杯'
                            }else if(this.ResultTextList[0].queOption == '选项：啤酒'){
                                this.TextCompany = '瓶/罐(听)'
                            }
                        }
                    } else {
                        alert_n22.confirm('提示', '当前题目答完，请返回告知首页。', '确定', '', (flag) => {
                            console.log('Vuex存储的请求自核的请求报文----->>>', this.VuexInform)
                            console.log('答完之后的请求自核报文内容----->>>', this.inform)
                            //增加保存智能核保问题及答案的逻辑
                            let NewArr = []
                            this.inform.disclosyres[0].answersList.forEach( item =>{
                                NewArr.push(item)
                            })
                            if (this.VuexInform.disclosyres.length > 0) {
                                console.log('如果请求自核报文有这道题的题干')
                                this.VuexInform.disclosyres.forEach(item => {
                                    /*如果该报文有此道大题题干*/
                                    if (item.impartAnswerCode == this.inform.disclosyres[0].impartAnswerCode) {
                                        console.log('更新该题干的所有对应题')
                                        /*否则更新该题干的所有对应题*/
                                        item = this.inform.disclosyres[0]
                                    } else {
                                        this.isOk = false
                                    }
                                })
                                if (this.isOk == false) {
                                    /*则直接push进该题干*/
                                    console.log('直接push进该题干')
                                    this.VuexInform.disclosyres.push(this.inform.disclosyres[0])
                                }
                                this.SetVuexInform(this.VuexInform)
                            } else {/*如果请求自核报文没有这道题的题干*/
                                this.SetVuexInform(this.inform)
                            }
                            console.log(this.VuexInform)
                            let newInform = {
                                inform:{
                                    caseNo:this.inform.caseNo,/*订单id*/
                                    impartCode:this.$route.params.code.toString(),/*题目编号 Ex:8-a*/
                                    flag:'Y',/*Y保存*/
                                    Answer:NewArr,
                                    data:JSON.stringify(this.VuexInform)/*存储中在请求自核的报文*/
                                }
                            }
                            console.log('保存中在小题+请求自核的报文------->>>',newInform)
                            utils.http.postFast('MOSAVEQUESTION',newInform,(body)=> {
                                console.log(body)
                                if(body.inform.result == '保存成功'){
                                    this.goBack()
                                    this.SetisQuestion('2000')
                                }
                            })
                        })
                    }
                    this.isend = body.inform.flag
                } else {
                    this.newModel = true
                    this.modelContent = header.resultMsg
                }
            })
},
stopModel() {
    this.newModel = true
    this.modelContent = '请答完题之后再点击下一步。'
},
endModel() {
    this.newModel = true
    this.modelContent = '当前题目答完，请返回告知首页。'
},
        next(id) {
            this.isback = false
            console.log(id)
            console.log('点击下一题，是否有下一题----->>>', this.isend)
            console.log('请求自核的报文是',this.inform.disclosyres)
            if (this.isend == 'N') {
                /*有下一题*/
                /******************radio单选******************/
                this.content.inform.flag = 'Y'
                this.content.inform.questionnaireId = this.questionnaireId
                this.content.inform.questionCode = this.questionCode
                if (id == 1) {/*单选题*/
                    if (this.type1code) {/*radio已答完*/
                        // console.log('单选结果值----->>>',this.type1code)
                        this.content.inform.questionAnswerValues[0].answer = this.type1code
                        // console.log('下一题请求数据----->>>',this.content)
                        console.log(this.inform.disclosyres)
                        //此处循环--->>>提交自核请求报文
                        this.inform.disclosyres.forEach(item => {
                            if (item.impartNo) {/*如果存在*/
                                console.log('对象内存在题干--->>>后台返回的当前题的内容', this.ResultRadioData)
                                console.log('需要继续push的请求自核的报文内容----->>>', this.inform)
                                console.log('后台返回的当前题的所有内容----->>>', this.bodyData)
                                console.log('此道题干的编码是----->>>', this.bodyData.inform.impartCode)
                                //if提交自核报文有这道大题题干，就push小对象
                                if (item.impartCode == this.bodyData.inform.impartCode) {
                                    let newObject = {
                                        questionnaireId: this.ResultRadioData[0].questionnaireId,
                                        questionCode: this.ResultRadioData[0].queId,
                                        questionAnswerCode: this.ResultRadioData[0].queId,
                                        questionAnswerValue: this.type1code
                                    }
                                    item.questionAnswers.push(newObject)
                                    /*新增请求自核报文*/
                                    let optionList = []
                                    this.bodyData.inform.questionList[0].questionOptionList.forEach(icp => {
                                        let option = {
                                            OptionCode: icp.queCode,
                                            optionContent: icp.queContent
                                        }
                                        optionList.push(option)
                                    })
                                    let AnewObject = {
                                        questionNo: this.TitleNum.toString(),
                                        questionContent: this.bodyData.inform.questionList[0].queNotice,
                                        answer: this.type1code,
                                        questionType: 'radio',
                                        optionList: optionList
                                    }
                                    item.answersList.push(AnewObject)
                                } else {
                                    //push新的大题题干
                                    let newWaiObject = {
                                        impartNo: this.impartNo.toString(),
                                        impartContent: this.VuexDesc,
                                        impartCode: this.code,
                                        impartAnswerCode: this.code
                                    }
                                    this.inform.disclosyres.push(newWaiObject)
                                }
                                console.log('第二题之后，push过后的请求自核的报文', this.inform)
                            } else {/*如果不存在题干--->>>则为该题干下的第一个答题*/
                                console.log('对象内不存在题干')
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                console.log(this.ResultRadioData)
                                this.inform.disclosyres[0].questionAnswers[0].questionnaireId = this.ResultRadioData[0].questionnaireId
                                this.inform.disclosyres[0].questionAnswers[0].questionCode = this.ResultRadioData[0].queId
                                this.inform.disclosyres[0].questionAnswers[0].questionAnswerCode = this.ResultRadioData[0].queId
                                this.inform.disclosyres[0].questionAnswers[0].questionAnswerValue = this.type1code
                                /*新增请求自核报文*/
                                let optionList = []
                                this.bodyData.inform.questionList[0].questionOptionList.forEach(icp => {
                                    let option = {
                                        OptionCode: icp.queCode,
                                        optionContent: icp.queContent
                                    }
                                    optionList.push(option)
                                })
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = this.type1code
                                this.inform.disclosyres[0].answersList[0].optionList = optionList
                                this.inform.disclosyres[0].answersList[0].questionType = 'radio'
                                console.log(this.inform)
                                console.log('后台返回的当前题的内容', this.ResultRadioData)
                            }
                            this.getMessage(this.content)//请求下一题
                        })
} else {
    /*radio未答完*/
    this.stopModel()
}
} else if (id == 2) {/*多选题(有下一题的情况)*/
    console.log(this.checkboxList)
    console.log(this.checkboxYList)
    let newArr = []
    if(this.checkboxYList.length>0 && this.checkboxList.length>0){
        alert_n22.confirm('提示', '以上皆否/不知道”选项不能与其它选项同时勾选，请重新选择。。', '确定', '', (flag) => {})
        return false;
    }
    let newArr2 = []
    if(this.checkboxList.length>0 && this.checkboxYList.length == 0){
        newArr2 = this.checkboxList
    }else if(this.checkboxList.length == 0 && this.checkboxYList.length>0){
        newArr2 = this.checkboxYList
    }
    let checkboxAnswer = ''
    console.log(newArr2)
    newArr2.forEach(item => {
        newArr.push({ answer: item })
        checkboxAnswer += (item + ',')
    })
    checkboxAnswer = checkboxAnswer.substring(0, checkboxAnswer.lastIndexOf(','))
    console.log('请求自核新增报文内容---->>>', checkboxAnswer)
    console.log(newArr)
    if (this.checkboxList.length > 0 || this.checkboxYList.length>0) {
                        //此处循环--->>>提交自核，请求报文
                        console.log(this.inform.disclosyres)
                        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                newArr.forEach(item => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: item.answer
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                })
                                /*新增请求自核报文*/
                                let optionList = []
                                this.bodyData.inform.questionList[0].questionOptionList.forEach(icp => {
                                    let option = {
                                        OptionCode: icp.queCode,
                                        optionContent: icp.queContent
                                    }
                                    optionList.push(option)
                                })
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: checkboxAnswer,
                                    questionType: 'checkbox',
                                    optionList: optionList
                                }
                                item.answersList.push(AnewObject)
                                console.log(this.inform)
                            } else {
                                /*如果不存在题干--->>>则为该题干下的第一个答题*/
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                newArr.forEach(item => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: item.answer
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                })
                                /*新增请求自核报文*/
                                let optionList = []
                                this.bodyData.inform.questionList[0].questionOptionList.forEach(icp => {
                                    let option = {
                                        OptionCode: icp.queCode,
                                        optionContent: icp.queContent
                                    }
                                    optionList.push(option)
                                })
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = checkboxAnswer
                                this.inform.disclosyres[0].answersList[0].optionList = optionList
                                this.inform.disclosyres[0].answersList[0].questionType = 'checkbox'
                            }
                        })
                        //多选答案push进请求下一题的请求报文
                        this.content.inform.questionAnswerValues = newArr
                        console.log('多选答案push进请求下一题的请求报文----->>>', this.content)
                        this.getMessage(this.content)
                    } else {
                        this.stopModel()
                    }
                } else if (id == 3) {/*录入题(有下一题的情况)type=textarea*/
                    /******************input录入******************/
                    if (this.InputValue.length > 1) {
                        /*1.此时应循环请求自核接口的请求报文*/
                        console.log('题干进入录入题时的请求自核请求报文----->>>', this.inform.disclosyres)
                        console.log('题干进入录入题时的本题大题干编号----->>>', this.bodyData.inform.impartCode)

                        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                let newObject = {
                                    questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                    questionCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerValue: this.InputValue
                                }
                                item.questionAnswers.push(newObject)
                                /*新增请求自核报文*/
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: this.InputValue,
                                    questionType: 'select',
                                    optionList: [{ OptionCode: '', optionContent: this.InputValue }]
                                }
                                item.answersList.push(AnewObject)
                                console.log(this.inform)
                            } else {
                                /*如果没有大题干,则push大题干,同时push小题干*/
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                let newArr = []
                                newArr.forEach(item => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: item.answer
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                })
                                /*新增请求自核报文*/
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = this.InputValue
                                this.inform.disclosyres[0].answersList[0].optionList = [{ OptionCode: '', optionContent: this.InputValue }]
                                this.inform.disclosyres[0].answersList[0].questionType = 'select'
                            }
                        })

                        /*2.校验完毕,请求下一题*/
                        this.content.inform.questionAnswerValues[0].answer = this.InputValue
                        this.getMessage(this.content)
                    } else {
                        this.stopModel()
                    }
                } else if (id == 4) {/*出国国家题干*/
                    let SelectText = ''/*请求自核报文新增报文*/
                    console.log('刚进入国家选择时，请求自核的请求报文是----->>>', this.inform.disclosyres)
                    console.log('需要把答题push进的地方是', this.inform.disclosyres[0].questionAnswers)
                    let Type1Arr = [], Type2Arr = [], Type3Arr = [], Type4Arr = []
                    console.log('选中的国家List---->>>', this.newCountryList)
                    console.log('所有国家列表----->>>', this.CountryList)
                    for (let i = 0; i < this.newCountryList.length; i++) {
                        this.CountryList.forEach(item => {
                            if (this.newCountryList[i] == item.text) {
                                /*请求自核报文新增报文内容*/
                                SelectText += (item.text + ',')
                                /*请求自核报文新增报文内容*/
                                if (item.type == 1) {
                                    Type1Arr.push(item)
                                } else if (item.type == 2) {
                                    Type2Arr.push(item)
                                } else if (item.type == 3) {
                                    Type3Arr.push(item)
                                } else if (item.type == 4) {
                                    Type4Arr.push(item)
                                }
                            }
                        })
                    }
                    SelectText = SelectText.substring(0, SelectText.lastIndexOf(','))
                    if (Type1Arr.length > 0 || Type2Arr.length > 0 || Type3Arr.length > 0 || Type4Arr.length > 0) {
                        /*拼接请求自核报文*/
                        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            console.log('选择国家时,请求自核报文中的item---->>>', item)
                            console.log('选择国家时，下一题返回的数据----->>>', this.bodyData.inform)
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                if (Type1Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '1'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type2Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '2'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type3Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '3'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type4Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '4'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                /*新增请求自核报文*/
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: SelectText,
                                    questionType: 'select1',
                                    optionList: [{}]
                                }
                                this.inform.disclosyres[0].answersList.push(AnewObject)
                                console.log('国家选择完之后，本地请求自核的请求报文是----->>>', this.inform)
                            } else {
                                /*如果没有大题干,则push大题干,同时push小题干*/
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                if (Type1Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '1'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type2Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '2'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type3Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '3'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                if (Type4Arr.length > 0) {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: '4'
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                }
                                /*if没有这道大题的题干，新增请求自核报文*/
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = SelectText
                                this.inform.disclosyres[0].answersList[0].questionType = 'select1'
                                this.inform.disclosyres[0].answersList[0].optionList = ''
                            }
                        })
/*拼接请求下一题报文*/
if (Type1Arr.length > 0) {
    this.content.inform.questionAnswerValues.push({ answer: '1' })
}
if (Type2Arr.length > 0) {
    this.content.inform.questionAnswerValues.push({ answer: '2' })
}
if (Type3Arr.length > 0) {
    this.content.inform.questionAnswerValues.push({ answer: '3' })
}
if (Type4Arr.length > 0) {
    this.content.inform.questionAnswerValues.push({ answer: '4' })
}
this.content.inform.questionAnswerValues.forEach((item, index) => {
    if (item.answer == '') {
        this.content.inform.questionAnswerValues.splice(index, 1)
    }
})
console.log('选择完出国国家之后的请求下一题的请求报文----->>>', this.content)
this.getMessage(this.content)
} else {/*没有回答完毕*/
    this.stopModel()
}
} else if (id == 5) {/*录入题(有下一题的情况)*/
    /******************input录入******************/
    if (this.TextareaValue.length > 1) {
        /*1.此时应循环请求自核接口的请求报文*/
        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                let newObject = {
                                    questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                    questionCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerValue: this.TextareaValue
                                }
                                console.log(newObject)
                                item.questionAnswers.push(newObject)
                                /*新增请求自核报文*/
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: this.TextareaValue,
                                    questionType: 'textarea',
                                    optionList: [{ OptionCode: '', optionContent: this.TextareaValue }]
                                }
                                item.answersList.push(AnewObject)
                                console.log('Textarea类型题push到请求自核报文的答题答案', newObject)
                                console.log('请求自核所需报文', this.inform)
                            } else {
                                /*如果没有大题干,则push大题干,同时push小题干*/
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                let newArr = []
                                console.log(this.bodyData)
                                newArr.forEach(item => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: item.answer
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                })
                                /*新增请求自核报文*/
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = this.TextareaValue
                                this.inform.disclosyres[0].answersList[0].optionList = [{ OptionCode: '', optionContent: this.TextareaValue }]
                                this.inform.disclosyres[0].answersList[0].questionType = 'textarea'
                            }
                        })
        /*2.校验完毕,请求下一题*/
        this.content.inform.questionAnswerValues[0].answer = this.TextareaValue
        console.log('Textarea题答完之后，有下一题的情况下，请求下一题的报文内容---->>>', this.content)
        this.getMessage(this.content)
    } else {
        this.stopModel()
    }
} else if (id == 6) {/*出国职业选择问卷*/
    console.log('如果有下一题的时候，进入了select2，出国职业选择问卷')
    console.log(this.OccupationList.length)
    if (this.OccupationList.length > 0) {
        let newArr = []
        let SelectText = ''/*请求自核新增报文*/
        this.OccupationList.forEach(item => {
            this.VuexOccupationList.forEach(tpl => {
                if (item == tpl.name) {
                    console.log(tpl)
                    newArr.push(tpl.value)
                    SelectText += (tpl.name + ',')
                }
            })
        })
        /*拼接请求自核的请求报文*/
        SelectText = SelectText.substring(0, SelectText.lastIndexOf(','))
        console.log(newArr)
        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                newArr.forEach(tpl => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: tpl
                                    }
                                    /*拼接请求自核报文*/
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                    /*拼接请求下一题的请求报文*/
                                    this.content.inform.questionAnswerValues.push({ answer: tpl })
                                })
                                /*新增请求自核报文*/
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: SelectText,
                                    questionType: 'select2',
                                    optionList: ''
                                }
                                this.inform.disclosyres[0].answersList.push(AnewObject)
                            } else {
                                /*else 提交自核请求报文中没有这道大题的题干*/
                                /*新增请求自核报文*/
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = SelectText
                                this.inform.disclosyres[0].answersList[0].questionType = 'select2'
                                this.inform.disclosyres[0].answersList[0].optionList = ''
                            }
                        })
        console.log('出国问卷职业选择完之后，请求自核的请求报文数据为----->>>', this.inform)
        console.log('出国问卷职业选择完之后，请求下一题的请求报文数据为----->>>', this.content)
        console.log(this.content.inform.questionAnswerValues)
        this.content.inform.questionAnswerValues.map((v,i)=> {
            if(v.answer == ''){
                console.log(v)
                this.content.inform.questionAnswerValues.splice(i,1)
            }
        })
        console.log(this.content)
        this.getMessage(this.content)
    } else {/*if没有回答完毕*/
        this.stopModel()
    }
} else if (id == 7) {/*饮酒/血压*/
    if(this.TextValue){
        this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                let newObject = {
                                    questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                    questionCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                    questionAnswerValue: this.TextValue
                                }
                                item.questionAnswers.push(newObject)
                                /*新增请求自核报文*/
                                let AnewObject = {
                                    questionNo: this.TitleNum.toString(),
                                    questionContent: this.bodyData.inform.questionList[0].queNotice,
                                    answer: this.TextValue,
                                    questionType: 'select',
                                    optionList: [{ OptionCode: '', optionContent: this.TextValue }]
                                }
                                item.answersList.push(AnewObject)
                                console.log(this.inform)
                            } else {
                                /*如果没有大题干,则push大题干,同时push小题干*/
                                this.inform.disclosyres[0].impartNo = this.impartNo.toString()/*告知排序*/
                                this.inform.disclosyres[0].impartContent = this.VuexDesc/*告知题干描述*/
                                this.inform.disclosyres[0].impartCode = this.code/*排序*/
                                this.inform.disclosyres[0].impartAnswerCode = this.code/*排序*/
                                let newArr = []
                                newArr.forEach(item => {
                                    let newObject = {
                                        questionnaireId: this.bodyData.inform.questionList[0].questionnaireId,
                                        questionCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerCode: this.bodyData.inform.questionList[0].queId,
                                        questionAnswerValue: item.answer
                                    }
                                    this.inform.disclosyres[0].questionAnswers.push(newObject)
                                })
                                /*新增请求自核报文*/
                                this.inform.disclosyres[0].answersList = [{ questionNo: '' }]
                                this.inform.disclosyres[0].answersList[0].questionNo = this.TitleNum.toString()
                                this.inform.disclosyres[0].answersList[0].questionContent = this.bodyData.inform.questionList[0].queNotice
                                this.inform.disclosyres[0].answersList[0].answer = this.TextValue
                                this.inform.disclosyres[0].answersList[0].optionList = [{ OptionCode: '', optionContent: this.TextValue }]
                                this.inform.disclosyres[0].answersList[0].questionType = 'text'
                            }
                        })

        /*2.校验完毕,请求下一题*/
        this.content.inform.questionAnswerValues[0].answer = this.TextValue
        this.getMessage(this.content)
    } else {
        this.stopModel()
    }
}
} else {/*没有下一题*/
    /******************radio单选******************/
    if (id == 1) {
        console.log('单选题')
        if (this.type1code) {/*radio已答完*/
            console.log('单选结果值----->>>', this.type1code)
            this.content.inform.questionAnswerValues[0].answer = this.type1code
            this.content.inform.flag = 'Y'
            this.content.inform.questionnaireId = this.questionnaireId
            this.content.inform.questionCode = this.questionCode
            console.log('单选题答完，没有下一题的情况下，请求下一题请求数据----->>>', this.content)
            this.getMessage(this.content)
        } else {/*radio未答完*/
            this.stopModel()
        }
    } else if (id == 2) {
        console.log('多选题')
        console.log(this.checkboxList)
    } else if (id == 3) {
        console.log('录入题')
        /******************input录入******************/
        if (this.InputValue.length > 1) {
            /*1.此时应循环请求自核接口的请求报文*/
            console.log('题干进入录入题时的请求自核请求报文----->>>', this.inform.disclosyres)
            console.log('题干进入录入题时的本题大题干编号----->>>', this.bodyData.inform.impartCode)
            this.inform.disclosyres.forEach(item => {
                            //if提交自核报文有这道大题题干，就push小对象
                            if (item.impartCode == this.bodyData.inform.impartCode) {
                                let newObject = {
                                    questionnaireId: this.ResultRadioData[0].questionnaireId,
                                    questionCode: this.ResultRadioData[0].queId,
                                    questionAnswerCode: this.ResultRadioData[0].queId,
                                    questionAnswerValue: this.InputValue
                                }
                                item.questionAnswers.push(newObject)
                                console.log(this.inform)
                            } else {
                                /*如果没有大题干,则push大题干,同时push小题干*/
                            }
                        })
            this.content.inform.questionAnswerValues.answer = this.InputValue
            this.getMessage(this.content)
        } else {
            /*提示请您把问题回答完整Model*/
            this.stopModel()
        }
    } else if (id == 4) {
        /*出国国家题干*/
    } else if (id == 5) {
        /*出国职业选择题干*/
        if (this.TextareaValue.length > 1) {
            this.content.inform.questionAnswerValues[0].answer = this.TextareaValue
            this.getMessage(this.content)
            console.log('Textarea题答完之后，没下一题的情况下，请求下一题的报文内容---->>>', this.content)
        } else {
            /*提示请您把问题回答完整Model*/
            this.stopModel()
        }
    }
}
console.log('把答题存储进报文')
this.type1code = ''
this.InputValue = ''
this.TextareaValue = ''
this.TextValue = ''
this.checkboxList = []
this.newCountryList = []
this.OccupationList = []
this.codeSeach = ''
this.OccupationSeach = ''
}
}
}
</script>
<style>
.questionNaire1 {
    background: url("../../../static/img/policy/Intelligence/bg-radio.png") no-repeat;
}

.questionNaire2 {
    background: url("../../../static/img/policy/Intelligence/bg-check.png") no-repeat;
}

.questionNaire3 {
    background: url("../../../static/img/policy/Intelligence/bg-input.png") no-repeat;
}

.New-Questionnaire-content {
    overflow: hidden!important;
}

.New-Questionnaire-content-title {
    height: 48px;
    border-bottom: 1px solid #CBCBCB;
    background: #F8F8F8;
    padding-left: 10px;
}

.New-Questionnaire-content-div {
    background-size: 100% 100%!important;
    width: 100%;
}

.New-Questionnaire-content-div input {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.New-Questionnaire-content-div-label>label {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 30px;
    padding-top: 10px;
}

.ZhenDuanOk {
    display: flex;
    justify-content: left;
}

.ZhenDuanOk>p:nth-child(1) {
    background: #FEB101;
    width: 25px;
    height: 25px;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 25px;
    margin-right: 5px;
}


/*.New-Questionnaire-content-4-button{
   background:#FFF;
   color:#fff;
   font-size:.8rem;
   position:fixed;
   width:100%;
   border:none;
   height:50px;
   bottom:0;
   line-height: 50px;
   border-radius: 8px;
   }*/

   .New-Questionnaire-btn {
    background: #FEB101;
    color: #fff;
    width: 40%;
    margin-left: 30%;
    position: fixed;
    bottom: 60px;
    border-radius: 8px;
    border: none;
    height: 35px;
}


/*.New-Questionnaire-content-4-button>button{
   width:40%;
   margin:0 30%;
   background:#feb101;
   color:#fff;
   border:none;
   height:35px;
   border-radius: 8px;
   }*/

   input:checked {
    background-color: #fe6d32;
    border: 1px solid #fe6d32;
}

.New-Questionnaire-content-checkbox {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
}

.New-Questionnaire-content-checkbox label {
    width: 30%;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
}

.New-Questionnaire-content-checkbox input {
    width: 15px!important;
    height: 15px!important;
}

.New-Questionnaire-content-4 {
    display: flex;
    flex-wrap: wrap;
    width: 98%;
    margin: 0 auto;
    margin-bottom: 130px;
    min-height: 180px;
    height:48%;
    overflow-y: scroll;
    box-sizing: border-box;
}

.New-Questionnaire-content-4>label {
    width: 30%;
    padding: 0;
    padding-left: 10px;
    flex-wrap: wrap;
    height: auto;
    margin-bottom: 5px;
}

.New-Questionnaire-content-4>label>input {
    width: 15px!important;
}

.New-Questionnaire-content-4>label>span {
    flex: 1;
}
</style>