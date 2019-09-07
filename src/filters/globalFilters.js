import Vue from 'vue'
import utils from '../utils/index';
import format from '../utils/format';
import nationalList from '@/assets/dict/national_sunlife.json'
/**
 * 全局公共过滤器 使用:{{'0' |commonFilter('relationFilter') }}
 * value 值
 * type 类型 对应码表(codeData)中的参数
 * default1 默认值
 */

Vue.filter('commonFilter', (value, type, default1) => {
  return allMap[type][value] || default1 || '——'
});

 //时间戳过滤(过滤到时分秒)
Vue.filter('dateFilter', (value) => {
  let tempDate = new Date(value)
  let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
  let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  let tempHours = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours();
  let tempMinutes = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
  let tempSeconds = tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds();
  return tempDate.getFullYear() + '-' + tempMonth + '-' + tempDay + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;
});
Vue.filter('dateFilter3', (value) => {
    if(!value){
        return
    }
    let a = value.slice(10)
    let b = value.slice(0, 10)
    b = b.replace(/-/g, "/");
    return b +"\xa0\xa0\xa0\xa0"+ a
});

 //时间戳过滤(过滤到时分秒)
Vue.filter('dateFilter2', (value) => {
  let tempDate = new Date(value)
  let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
  let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  return tempDate.getFullYear() + '-' + tempMonth + '-' + tempDay;
});

const fillZero = value => {
  if(value.length == 1){
    value = '0' + value
  }
  return value
}

//时间过滤戳(过滤到年月日)
Vue.filter('dateFilterYear',(value) => {
  const dateArray = value.split('-')
  value = dateArray[0] + '-' + fillZero(dateArray[1]) + '-' + fillZero(dateArray[2])
  return value
})
//待办保单详情状态过滤
Vue.filter('ttState',(params)=>{
  let state = '';
  if(params == 'IP'){
    state = '保险费追加'
  }else if(params == 'PC'){
    state = '保单交费'
  }else if(params == 'CM'){
    state = '证件有效期变更'
  }else if(params == 'LR'){
    state = '保单补发'
  }else if(params == 'WT'){
    state = '犹豫期退保'
  }else if(params == 'CT'){
    state = '退保'
  }else if(params == 'AR'){
    state = '账户价值提取'
  }
  return state;
});
//待办保单详情状态过滤
Vue.filter('policyState',(params)=>{
  // 1-拒保，2-延期，4-次标体承保，9-标准承保，a-撤保和5-核保未通过
  let state = '';
  if(params == 1){
    state = '拒保'
  }else if(params == 2){
    state = '延期'
  }else if(params == 4){
    state = '次标体承保'
  }else if(params == 5){
    state = '核保未通过'
  }else if(params == 9){
    state = '标准承保'
  }else if(params == 'a'){
    state = '撤保'
  }
  return state;
});
//红利领取方式过滤
Vue.filter('modeStaue',(params)=>{
  // 1-拒保，2-延期，4-次标体承保，9-标准承保，a-撤保和5-核保未通过
  let state = '';
  if(params == 1){
    state = '领取现金'
  }else if(params == 2){
    state = '抵缴保费'
  }else if(params == 3){
    state = '增额交清'
  }else if(params == 4){
    state = '累积生息'
  }else if(params == 5){
    state = '万能投资'
  }
  return state;
});
//生存金领取方式过滤
Vue.filter('liveStaue',(params)=>{
  // 1-拒保，2-延期，4-次标体承保，9-标准承保，a-撤保和5-核保未通过
  let state = '';
  if(params == 1){
    state = '上柜领取'
  }else if(params == 2){
    state = '银行转帐'
  }
  return state;
});
Vue.filter('member', (params) => {
    let state = '';
    if (params == 0) {
        state = '准'
    } else if (params == 1) {
        state = ''
    }
    return state;
});
//保全状态
Vue.filter('serverState',(params)=>{
  let state = '';
  if(params == '0'){
    state = '保全确认'
  }else if(params == '1'){
    state = '有扫描受理'
  }else if(params == '2'){
        state = '无扫描受理'
  }else if(params == '3'){
    state = '挽单'
  }else if(params == '4'){
    state = '保全录入'
  }else if(params == '5'){
    state = '保全项录入完毕'
  }else if(params == '6'){
    state = '保全录入完毕'
  }else if(params == '7'){
    state = '保全信息修改'
  }else if(params == '8'){
    state = '保全核保'
  }else if(params == '9'){
    state = '保全审批'
  }else if(params == 'a'){
    state = '免填单申请书回销'
  }else if(params == 'b'){
    state = '待保全确认'
  }else if(params == 'c'){
    state = '强制终止'
  }else if(params == 'd'){
    state = '核保终止'
  }else if(params == 'e'){
    state = '保全逾期终止'
  }else if(params == 'h'){
    state = '保全合规挂起'
  }else if(params == 't'){
    state = '保全回退 '
  }
  return state;
});
//申请途径
Vue.filter('rootState',(params)=>{
  let state = '';
  if(params == '1'){
    state = '柜面'
  }else if(params == '2'){
    state = '电话'
  }else if(params == '3'){
    state = '网络'
  }else if(params == '4'){
    state = '微信'
  }else if(params == '5'){
    state = '银保通-柜面'
  }else if(params == '6'){
    state = '其他'
  }else if(params == '7'){
    state = '银保通-网银'
  }else if(params == '8'){
    state = '银保通-自助终端'
  }else if(params == '9'){
    state = '银保通-掌银'
  }else if(params == '10'){
    state = '新官网'
  }else if(params == '11'){
    state = 'IVR'
  }else if(params == '12'){
    state = 'CC-IVR'
  }else if(params == '13'){
    state = '移动展业APP'
  }
  return state;
});
//收付费状态
Vue.filter('moneyStaue',(params)=>{
  let text = '';
  if(params == 0){
    text = '尚未报盘'
  }else if(params == 1){
    text = '转账中'
  }else if(params == 2){
    text = '转账成功'
  }else if(params == 3){
    text = '转账失败'
  }
  return text;
});
//寄送方式
Vue.filter('letterStaue',(params)=>{
  let text = '';
  if(params == 5){
    text = '微信信函'
  }else if(params == 4){
    text = '电子邮件'
  }else if(params == 1){
    text = '代理人下载发送'
  }
  return text;
});
//代扣状态
Vue.filter('daikouStaue',(params)=>{
  let text = '';
  if(params == 0){
    text = '尚未报盘'
  }else if(params == 1){
    text = '转账中'
  }else if(params == 2){
    text = '转账成功'
  }
  return text;
});
//保险状态
Vue.filter('polStaue',(params)=>{
  let text = '';
  if(params == 0){
    text = '未承保'
  }else if(params == 1){
    text = '有效'
  }else if(params == 4){
    text = '终止'
  }else if(params == 2){
    text = '失效'
  }else if(params == 9){
    text = '续保未生效'
  }
  return text;
});
//交费频率
Vue.filter('intv',(params)=>{
  let text = '';
  if(params == -1){
    text = '不定期交'
  }else if(params == 0){
    text = '一次交清'
  }else if(params == 1){
    text = '月交'
  }else if(params == 3){
    text = '季交'
  }else if(params == 6){
    text = '半年交'
  }else if(params == 12){
    text = '年交'
  }
  return text;
});
//保全交费频率
Vue.filter('Baoquanintv',(params)=>{
  let text = '';
  if(params == 1){
    text = '月交'
  }else if(params == 0){
    text = '趸交'
  }else if(params == 12){
    text = '年交'
  }
  return text;
});
//待办保单详情状态过滤
Vue.filter('policyStaue',(params)=>{
  let text = '';
  if(params == 0){
    text = '受理'
  }else if(params == 1){
    text = '有效'
  }else if(params == 2){
    text = '失效'
  }else if(params == 4){
    text = '终止'
  }
  return text;
})
// 证件类型过滤
Vue.filter('Notype',(value) =>{
  let Notype;
  if(value == 11){
    Notype = '身份证'
  }else if(value == 12){
    Notype = '户口本'
  }else if(value == 17){
    Notype = '中国护照'
  }else if(value == 24){
    Notype = '外国护照'
  }else if(value == 23){
    Notype = '台胞证'
  }else if(value == 26){
    Notype = '港澳通行证'
  }else if(value == 20){
    Notype = '出生证'
  }else if(value == 29){
    Notype = '外国人永久居留身份证'
  }else if(value == 30){
    Notype = '港澳台居住证'
  }
  return Notype
})
//保单状态过滤器
Vue.filter('statusFilter',(value,value2)=>{
  let status;
  if(value == 0){
    status = '人核'
  }else if(value == 1){
    status = '核保成功'
  }else if(value == 2){
    status = '支付成功'
  }else if(value == 3){
  	if(value2 == 0){
  		status = '承保成功'
  	}else{
  		status = '已回执'
  	}
  }else if(value == 4){
    status = '拒保'
  }else if(value == 5){
    status = '延期'
  }else if(value == 6){
    status = '已撤件'
  }
//else if(value == 7){
//  status = '拒保'
//}
  else if(value == -1){
    status = '问题件'
  }else if(value == 84){
    status = '核保失败'
  }else if(value == 80){
    status = '投保初始化状态'
  }else if(value == 81){
    status = '投保校验失败'
  }else if(value == 82){
    status = '投保校验成功'
  }else if(value == 83){
    status = '试算失败'
  }else if(value == 90){
    status = '未复核'
  }else if(value == 91){
    status = '复核完成'
  }else if(value == 92){
    status = '待回复'
  }else if(value == 93){
    status = '已回复'
  }
  return status;
})
// 根据编号过滤银行
Vue.filter('bankFilter',(value)=>{
  let bankNo;
  if(value == 102){
    bankNo = "中国工商银行"
  }else if(value == 103){
    bankNo = "中国农业银行"
  }else if(value == 104){
    bankNo = "中国银行"
  }else if(value == 105){
    bankNo = "中国建设银行"
  }else if(value == 301){
    bankNo = "交通银行"
  }else if(value == 403){
    bankNo = "中国邮政储蓄银行"
  }else if(value == 330){
    bankNo = "平安银行股份有限公司"
  }else if(value == 309){
    bankNo = "兴业银行"
  }else if(value == 335){
    bankNo = "中信银行"
  }else if(value == 334){
    bankNo = "中国光大银行"
  }else if(value == 310){
    bankNo = "上海浦东发展银行"
  }else if(value == 321){
    bankNo = "北京银行"
  }else if(value == 314){
    bankNo = "重庆农村商业银行"
  }else if(value == 305){
    bankNo = "中国民生银行"
  }else if(value == 308){
    bankNo = "招商银行"
  }else if(value == 336){
    bankNo = "华夏银行"
  }
  return bankNo;
})


Vue.filter('ageFilter',(value) => {
  var today = new Date();
  var birthDate = new Date(value);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
})

Vue.filter('ralationFilter',(value) => {
  let relation_desc;
  if(value == '00'){
    relation_desc = "本人"
  }else if(value == '30'){
    relation_desc = "其他"
  }else if(value == '31'){
    relation_desc = "其他"
  }else if(value == '33'){
    relation_desc = "配偶"
  }else if(value == '37'){
    relation_desc = "父子"
  }else if(value == '38'){
    relation_desc = "父女"
  }else if(value == '39'){
    relation_desc = "母子"
  }else if(value == '40'){
    relation_desc = "母女"
  }
  return relation_desc;
})
Vue.filter('ralationCustomerFilter', (value) => {
    let relation_desc;
    if (value == '本人') {
        relation_desc = "本人"
    } else if (value == '01') {
        relation_desc = "父亲"
    } else if (value == '02') {
        relation_desc = "母亲"
    } else if (value == '03') {
        relation_desc = "丈夫"
    } else if (value == '04') {
        relation_desc = "妻子"
    } else if (value == '05') {
        relation_desc = "儿子"
    } else if (value == '06') {
        relation_desc = "女儿"
    } else if (value == '07') {
        relation_desc = "祖父"
    } else if (value == '08') {
        relation_desc = "祖母"
    } else if (value == '09') {
        relation_desc = "外祖父"
    } else if (value == '10') {
        relation_desc = "外祖母"
    } else if (value == '11') {
        relation_desc = "儿媳"
    } else if (value == '12') {
        relation_desc = "女婿"
    } else if (value == '13') {
        relation_desc = "弟弟"
    } else if (value == '14') {
        relation_desc = "哥哥"
    } else if (value == '15') {
        relation_desc = "姐姐"
    } else if (value == '16') {
        relation_desc = "妹妹"
    } else if (value == '17') {
        relation_desc = "孙子"
    } else if (value == '18') {
        relation_desc = "孙女"
    } else if (value == '19') {
        relation_desc = "孙媳"
    } else if (value == '20') {
        relation_desc = "孙女婿"
    } else if (value == '21') {
        relation_desc = "外孙"
    } else if (value == '22') {
        relation_desc = "外孙女"
    } else if (value == '23') {
        relation_desc = "外孙媳"
    } else if (value == '24') {
        relation_desc = "外孙女婿"
    } else if (value == '25') {
        relation_desc = "继父"
    } else if (value == '26') {
        relation_desc = "继母"
    } else if (value == '27') {
        relation_desc = "岳父"
    } else if (value == '28') {
        relation_desc = "岳母"
    } else if (value == '29') {
        relation_desc = "公公"
    } else if (value == '30') {
        relation_desc = "婆婆"
    }
    return relation_desc;
})

Vue.filter('marriageFilter',(value) => {
  let marriage_desc;
  if(value == '10'){
    marriage_desc = "未婚"
  }else if(value == '20'){
    marriage_desc = "已婚"
  }else if(value == '30'){
    marriage_desc = "丧偶"
  }else if(value == '40'){
    marriage_desc = "离婚"
  }
  return marriage_desc;
})

Vue.filter('outPolicy',(value) => {
  let relation_desc;
  if(value == '100'){
    relation_desc = "意外医疗"
  }else if(value == '101'){
    relation_desc = "意外伤残"
  }else if(value == '102'){
    relation_desc = "意外死亡"
  }else if(value == '103'){
    relation_desc = "意外高残"
  }else if(value == '104'){
    relation_desc = "意外大病"
  }else if(value == '105'){
    relation_desc = "意外特种疾病"
  }else if(value == '106'){
    relation_desc = "意外失业失能"
  }else if(value == '107'){
    relation_desc = "意外津贴"
  }else if(value == '109'){
    relation_desc = "意外豁免"
  }else if(value == '200'){
    relation_desc = "疾病医疗"
  }else if(value == '201'){
    relation_desc = "疾病伤残"
  }else if(value == '202'){
    relation_desc = "疾病身故"
  }else if(value == '203'){
    relation_desc = "疾病高残"
  }else if(value == '204'){
    relation_desc = "疾病大病"
  }else if(value == '205'){
    relation_desc = "疾病特种疾病"
  }else if(value == '206'){
    relation_desc = "疾病失业失能"
  }else if(value == '207'){
    relation_desc = "疾病津贴"
  }else if(value == '209'){
    relation_desc = "疾病豁免"
  }
  return relation_desc;
})

/*证件类型*/
Vue.filter('certifica',(value)=>{
  let certificaText;
  if(value == '11'){
    certificaText = '身份证'
  }else if(value == '12'){
    certificaText = '户口本'
  }else if(value == '17'){
    certificaText = '中国护照'
  }else if(value == '24'){
    certificaText = '外国护照'
  }else if(value == '23'){
    certificaText = '台胞证'
  }else if(value == '26'){
    certificaText = '港澳通行证'
  }else if(value == '20'){
    certificaText = '出生证'
  }else if(value == '28'){
    certificaText = '其他'
  }else if(value == '29'){
    certificaText = '出生证'
  }
  return certificaText;
})
/*国籍*/
Vue.filter('nativeText',(value)=>{
  let text = ''
  nationalList.national.item.forEach( item => {
    if(value == item.code){
      text = item.text
    }
  })
  return text;
})

Vue.filter('ralationBaoQuanFilter',(value) => {
  let relation_desc;
  if(value == '00'){
    relation_desc = "本人"
  }else if(value == '01'){
    relation_desc = "丈夫"
  }else if(value == '02'){
    relation_desc = "妻子"
  }else if(value == '03'){
    relation_desc = "父亲"
  }else if(value == '04'){
    relation_desc = "母亲"
  }else if(value == '05'){
    relation_desc = "儿子"
  }else if(value == '06'){
    relation_desc = "女儿"
  }else if(value == '07'){
    relation_desc = "祖父"
  }else if(value == '08'){
    relation_desc = "祖母"
  }else if(value == '09'){
    relation_desc = "孙子"
  }else if(value == '10'){
    relation_desc = "孙女"
  }else if(value == '11'){
    relation_desc = "外祖父"
  }else if(value == '12'){
    relation_desc = "外祖母"
  }else if(value == '13'){
    relation_desc = "外孙"
  }else if(value == '14'){
    relation_desc = "外孙女"
  }else if(value == '15'){
    relation_desc = "哥哥"
  }else if(value == '16'){
    relation_desc = "姐姐"
  }else if(value == '17'){
    relation_desc = "弟弟"
  }else if(value == '18'){
    relation_desc = "妹妹"
  }else if(value == '19'){
    relation_desc = "公公"
  }else if(value == '20'){
    relation_desc = "婆婆"
  }else if(value == '21'){
    relation_desc = "岳父"
  }else if(value == '22'){
    relation_desc = "岳母"
  }else if(value == '23'){
    relation_desc = "儿媳"
  }else if(value == '24'){
    relation_desc = "女婿"
  }else if(value == '25'){
    relation_desc = "其他亲属"
  }else if(value == '26'){
    relation_desc = "同事"
  }else if(value == '27'){
    relation_desc = "朋友"
  }else if(value == '28'){
    relation_desc = "雇主"
  }else if(value == '29'){
    relation_desc = "雇员"
  }else if(value == '30'){
    relation_desc = "其他"
  }else if(value == '31'){
    relation_desc = "父母"
  }else if(value == '32'){
    relation_desc = "子女"
  }else if(value == '33'){
    relation_desc = "配偶"
  }else if(value == '34'){
    relation_desc = "叔叔"
  }else if(value == '35'){
    relation_desc = "姨姨"
  }else if(value == '36'){
    relation_desc = "姑姑"
  }else if(value == '37'){
    relation_desc = "父子"
  }else if(value == '38'){
    relation_desc = "父女"
  }else if(value == '39'){
    relation_desc = "母子"
  }else if(value == '40'){
    relation_desc = "母女"
  }
  return relation_desc;
})
Vue.filter('cardBaoQuanFilter',(value) => {
  let cardText = '';
  if(value == '11'){
    cardText = '居民身份证'
  }else if(value == '12'){
    cardText = '居民户口薄'
  }else if(value == '13'){
    cardText = '驾驶证'
  }else if(value == '14'){
    cardText = '军官证'
  }else if(value == '15'){
    cardText = '士兵证'
  }else if(value == '16'){
    cardText = '军官离退休正'
  }else if(value == '17'){
    cardText = '中国护照'
  }else if(value == '18'){
    cardText = '学生证'
  }else if(value == '19'){
    cardText = '工作证'
  }else if(value == '20'){
    cardText = '出生证'
  }else if(value == '21'){
    cardText = '无证件'
  }else if(value == '22'){
    cardText = '警官证'
  }else if(value == '23'){
    cardText = '台湾居民来往大陆通行证'
  }else if(value == '24'){
    cardText = '外国护照'
  }else if(value == '25'){
    cardText = '旅行证'
  }else if(value == '26'){
    cardText = '港澳居民来往内地通行证'
  }else if(value == '27'){
    cardText = '居留证件'
  }else if(value == '28'){
    cardText = '其他'
  }else if(value == '29'){
    cardText = '外国人永久居留身份证'
  }else if(value == '30'){
    cardText = '港澳台居住证'
  }
  return cardText;
})
/*小数转百分数*/
Vue.filter('ToPercent',(value)=>{
  let text = Number(value*100);
  text+="%";
  return text;
})
/*val 待过滤数据;first 数据首保留长度;second 数据尾保留长度*/
Vue.filter('dataCover',(val,first,second)=>{
  let text = val
  let start = ""
  let middle = ""
  let end = ""
  if(val!=undefined){
  	if(first!=undefined&&first>=0&&first<text.length){
  		start = text.substring(0,first)
  	}
  	if(second!=undefined&&second>=0&&second<text.length){
  		end = text.substring(text.length-second,text.length)
  	}
  	for(let i=0;i<text.length-first-second;i++){
  		middle =  middle + '*'
  	}
  	return start + middle + end;
  }
  return ''
})
Vue.filter('workPropertyType', (value) => {
    let workType;
    if (value === 0) {
        workType = '企业'
    } else if (value ==1) {
        workType = '事业单位'
    } else if (value == 2) {
        workType = '公务员'
    } else if (value == 3) {
        workType = '其他'
    }else if (value!=""){
        workType = value
    } 
    return workType
})
