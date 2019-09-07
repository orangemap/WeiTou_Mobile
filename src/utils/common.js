import utils from "./index";
import informList_ZJ from'../../static/dict/policy_inform_zj.json'
import informList_YB from'../../static/dict/policy_inform_yb.json'
import { Indicator } from 'mint-ui'
import lrz from "lrz"
import relation_customer_manage from'../../static/dict/relation_customer_manage.json'
const common = {
	getUUID:()=>{
		var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; 
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
	},
	//v1:待压缩文件 v2:callback 宽200压缩 v3:callback2 宽720压缩
	imgResize:(file, callback, callback2)=>{
		console.log('开始压缩影像...')
		Indicator.open('影像压缩中...')
		try{
			lrz(file, {
        width: 200
			}).then(function (results) {
        // 处理成功会执行
        Indicator.close()
        callback(results.base64)
      }).catch(function (err){
        // 处理失败会执行
        console.log(e);
        Indicator.close()
      })
      lrz(file, {
        width: 960
			}).then(function (results) {
        // 处理成功会执行
        Indicator.close()
        callback2(results.base64)
      }).catch(function (err){
        // 处理失败会执行
        console.log(e);
        Indicator.close()
      })
		}catch(e){
      console.log(e);
			Indicator.close()
		}
	},
	//将base64转换为文件
	dataURLtoFile:(data, filename)=>{
		let bstr = window.atob(data)
		let n = bstr.length
		let u8arr = new Uint8Array(n)
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:data});
	},
  setH:(className)=>{
    let height = document.documentElement.clientHeight+'px';
    console.log('------>'+height);
    $('.'+className).css('height',height).css('overflow','hidden');
    window.onresize = function() {
      let height = document.documentElement.clientHeight+'px';
      $('.'+className).css('height',height).css('overflow','hidden');
    }
  },
  //说明书数组拆分
  arrGrouping:(arr)=>{
    let map = {},dest = [];
    for(let i = 0; i < arr.length; i++){
      let ai = arr[i];
        if(!map[ai.productCode]){
            dest.push({
                productCode:ai.productCode,
                data: [ai]
            });
            map[ai.productCode] = ai;
        }else{
            for(let j = 0; j < dest.length; j++){
                let dj = dest[j];
                if(dj.productCode == ai.productCode){
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }
    console.log('===================数组拆分结果===================');
    console.log(dest);
    return dest
  },
  getHaveInstructionsCode:(productDefList,policyResult)=>{
    let codes = []
    //过滤需要显示产品说明书的产品
    for(let i=0;i<productDefList.length;i++){
      if(productDefList[i].productDefine.specialBooks.indexOf('2')>-1){
        codes.push(productDefList[i].productCode)
        console.log('显示说明书产品 code '+productDefList[i].productCode)
      }
      if(productDefList[i].extraList!=undefined && productDefList[i].extraList.length>0){
        for(let j=0;j<productDefList[i].extraList.length;j++){
          let config_code = productDefList[i].extraList[j].productCode
          if(policyResult.productInfo.products.product!=undefined &&policyResult.productInfo.products.product.length>0){
            for(let k=0;k<policyResult.productInfo.products.product.length;k++){
              let product_code = policyResult.productInfo.products.product[k].prodCode
              if(config_code == product_code){
                if(productDefList[i].extraList[j].productDefine.specialBooks.indexOf('2')>-1){
                  codes.push(productDefList[i].extraList[j].productCode)
                  console.log('显示说明书产品 附加险 code '+productDefList[i].extraList[j].productCode)
                }
              }
            }
          }
        }
      }
    }
    return codes
  },
	getArrIndex:(array,str)=>{
		let index = ''
		for(var i=0;i<array.length;i++){
  			let item = array[i]
  			if (item == str) {
  				index = i
  				break
  			}
  		}
		return index
	},
  //获取登陆代理人缓存信息key值
  getAgentKey:()=>{
    return 'personsal'
  },
  //获取当前代理人所销售保险产品列表的缓存信息key值
  getProductsKey: () => {
    return 'tag_products'
  },
  getAge:(birthdays)=> {
    const birthday = new Date(birthdays)
    const now = new Date()
    let age = now.getFullYear()-birthday.getFullYear()-1
    if(now.getMonth()-birthday.getMonth()>0){
      age++
    }else if(now.getMonth()==birthday.getMonth()>0 && now.getDate()-birthday.getDate()>=0){
      age++
    }
    return age;
  },
  filtersInformList:(edition,insured)=>{
    let informList = []
    let tempInformList = []
//  if (edition == '1') {//银保
//      informList = informList_YB
//  }else if (edition == '2') {//综金
        informList = informList_ZJ
//  }
    for (var i = 0; i < informList.length; i++) {
      let visible = informList[i].visible
      if (visible != undefined) {
        console.log(visible)
        let visibleArr = visible.split('|')
        var expression = visibleArr[1]
        if (visibleArr[0] == 'GENDERCODE') {
          if (expression == 'eq') {
            if (insured.gender == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
        if (visibleArr[0] == 'AGE') {
          let age = utils.valid.getAge(insured.birthday)
          if (expression == 'eq') {
            if (age == visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'gt') {//gt大于
            if (age > visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'lt') {//lt小于
            if (age < visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'ge') {//ge大于等于
            if (age >= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          } else if (expression == 'le') {//le小于等于
            if (age <= visibleArr[2]) {
              tempInformList.push(informList[i])
            }
          }
        }
      } else {
        tempInformList.push(informList[i])
      }
    }
    return tempInformList;
  },
  filtersInformList2:(insured,informList_ZJ_1)=>{
    let tempInformList = []
    for(let item of informList_ZJ_1){
    	if(item.visible == undefined){
    		tempInformList.push(item)
    	}else{
    		let visibleArr = item.visible.split('|')
    		if(visibleArr[0] == 'GENDERCODE'){
    			if(visibleArr[1] == 'eq' && visibleArr[2] == insured.gender){
    				tempInformList.push(item)
    			}
    		}
    		if(visibleArr[0] == 'AGE'){
    			let age = utils.valid.getAge(insured.birthday)
    			if(visibleArr[1] == 'eq' && visibleArr[2] == age){
    				tempInformList.push(item)
    			}else if(visibleArr[1] == 'gt' && visibleArr[2] < age){
    				tempInformList.push(item)
    			}else if(visibleArr[1] == 'lt' && visibleArr[2] > age){
    				tempInformList.push(item)
    			}else if(visibleArr[1] == 'ge' && visibleArr[2] <= age){
    				tempInformList.push(item)
    			}else if(visibleArr[1] == 'le' && visibleArr[2] >= age){
    				tempInformList.push(item)
    			}
    		}
    	}
    }
    return tempInformList
  },
  customerManageRelationCheck:(relationCode, gender)=>{
  	let rule = ""
  	if(relationCode == undefined || relationCode == ""){
  		rule = "请选择家庭成员关系。"
  	}
  	if(gender == undefined || gender == ""){
  		rule = "请选择家庭成员性别。"
  	}
  	let relations = relation_customer_manage.relation.item
  	for(let i=0;i<relations.length;i++){
  		console.log(relations[i])
  		//性别和规则均配置进行校验
  		if(relations[i].gender != "" && relations[i].rule != ""){
  			//关系与传入参数一致,性别与传入参数不同将配置中的rule返回
  			if(relationCode == relations[i].code && gender != relations[i].gender){
				rule  = relations[i].rule
				break;
  			}
  		}
  	}
    return rule
  },
  //将客户查询出的客户管理中的客户信息转换成保费使用中使用呢
  customerConvertInTrial:(customer1,customer2)=>{
  	//console.log(customer1,customer2)
  	//客户id
//	customer1.id = customer2.infoId
	customer1.infoId = customer2.infoId
	customer1.memberType = customer2.memberType
	//客户姓名
	customer1.name = customer2.appntName
	//客户生日xxx年xx月xx日
	if(customer2.appntBirthday==''){
		customer1.birthday = "1980-01-01"
	}else{
		customer1.birthday = customer2.appntBirthday
	}
	//客户性别1男2女
	customer1.sex = customer2.appntSex
	//客户性别标示
	customer1.sexFlag = customer2.appntSex == 1 ? true : false
	if(customer2.occupationCode!=undefined&&customer2.occupationCode!=''&&
		customer2.occupationType!=undefined&&customer2.occupationType!=''&&
		customer2.appOccupation!=undefined&&customer2.appOccupation!=''){
		//职业名称
		customer1.desc = customer2.appOccupation
		//职业等级
		customer1.level = customer2.occupationType
		//职业code
		customer1.profession = customer2.occupationCode
	}
	//证件类型
	customer1.idType = customer2.idType
	//证件号码
	customer1.idNo = customer2.idNo
	//证件有效止期
	customer1.idExpDate = customer2.idExpDate
	//其他信息主要用于在保存入投保中
	customer1.more = {}
  	customer1.more.nativePlace = customer2.nativePlace
  	customer1.more.province = customer2.province
	customer1.more.city = customer2.city
	customer1.more.idType = customer2.idType
	customer1.more.idNo = customer2.idNo
	customer1.more.idStaDate = customer2.idStaDate
	customer1.more.idExpDate = customer2.idExpDate
	customer1.more.marriage = customer2.marriage
	customer1.more.mobile = customer2.mobile
	customer1.more.community = customer2.community
	customer1.more.county = customer2.county
	customer1.more.email = customer2.email
	customer1.more.grpName = customer2.grpName
	customer1.more.postalAddress = customer2.postalAddress
	if(customer2.salary!=''){
		customer1.more.salary = customer2.salary
		if(customer2.salary == '10'){
			customer1.more.salaryCode = '1'
		}else if(customer2.salary == '20'){
			customer1.more.salaryCode = '2'
		}else if(customer2.salary == '30'){
			customer1.more.salaryCode = '3'
		}else if(customer2.salary == '40'){
			customer1.more.salaryCode = '4'
		}else if(customer2.salary == '50'){
			customer1.more.salaryCode = '5'
		}else{
			customer1.more.salaryCode = '6'
		}
	}
	customer1.more.street = customer2.street
	customer1.more.zipCode = customer2.zipCode
	customer1.payInfo = customer2.payInfo
  },
  //将客户查询出的客户管理中的客户信息转换到保单对应的客户中
  customerConvertInPolicy:(customerType,customer1,customer2)=>{
  	customer1.memberType = customer2.memberType
  	customer1.infoId = customer2.infoId
  	if(customerType == 'APP'){
  		//客户姓名
	  	customer1.appntName = customer2.appntName
		//证件类型
		customer1.idType = customer2.idType
		//证件号码
		customer1.idNo = customer2.idNo
		//有效起期
		customer1.idStaDate = customer2.idStaDate
		//有效止期
		customer1.idExpDate = customer2.idExpDate
		//性别
		customer1.appntSex = customer2.appntSex
		//生日
		customer1.appntBirthday = customer2.appntBirthday
		//国籍
		customer1.nativePlace = customer2.nativePlace //国籍
		//婚姻
		customer1.marriage = customer2.marriage
		//省
		customer1.province = customer2.province 
		//市
		customer1.city = customer2.city 
		//区县
		customer1.county = customer2.county 
		//街道
		customer1.street = customer2.street 
		//社区
		customer1.community = customer2.community 
		//详细地址
		customer1.postalAddress = customer2.postalAddress 
		//邮编
		customer1.zipCode = customer2.zipCode 
		//邮箱
		customer1.email = customer2.email
		//手机号
		customer1.mobile = customer2.mobile
		if(customer2.appOccupation!='' && customer2.occupationCode!='' && customer2.occupationType!=''){
			//职业描述
			customer1.appOccupation = customer2.appOccupation 
			//职业code
			customer1.occupationCode = customer2.occupationCode 
			//职业等级
			customer1.occupationType = customer2.occupationType 
		}
		//工作单位
		customer1.grpName = customer2.grpName 
		//年收入
		if(customer2.salary!=''){
			customer1.salary = customer2.salary
			if(customer2.salary == '10'){
				customer1.salaryCode = '1'
			}else if(customer2.salary == '20'){
				customer1.salaryCode = '2'
			}else if(customer2.salary == '30'){
				customer1.salaryCode = '3'
			}else if(customer2.salary == '40'){
				customer1.salaryCode = '4'
			}else if(customer2.salary == '50'){
				customer1.salaryCode = '5'
			}else{
				customer1.salaryCode = '6'
			}
		}
  	}else 
  	if(customerType == 'INS'){
  		customer1.name = customer2.appntName
		customer1.idType = customer2.idType
		customer1.idNo = customer2.idNo
		customer1.idStaDate = customer2.idStaDate
		customer1.idExpDate = customer2.idExpDate
		customer1.sex = customer2.appntSex
		customer1.birthday = customer2.appntBirthday
		customer1.nativePlace = customer2.nativePlace
		customer1.marriage = customer2.marriage
		customer1.province = customer2.province
		customer1.city = customer2.city
		customer1.county = customer2.county
		customer1.street = customer2.street
		customer1.community = customer2.community
		customer1.postalAddress = customer2.postalAddress
		customer1.zipCode = customer2.zipCode
		customer1.mobile = customer2.mobile
		if(customer2.appOccupation!='' && customer2.occupationCode!='' && customer2.occupationType!=''){
			customer1.insOccupation = customer2.appOccupation
			customer1.occupationCode = customer2.occupationCode
			customer1.occupationType = customer2.occupationType
		}
		customer1.grpName = customer2.grpName
		if(customer2.salary!=''){
			customer1.salary = customer2.salary
			if(customer2.salary == '10'){
				customer1.salaryCode = '1'
			}else if(customer2.salary == '20'){
				customer1.salaryCode = '2'
			}else if(customer2.salary == '30'){
				customer1.salaryCode = '3'
			}else if(customer2.salary == '40'){
				customer1.salaryCode = '4'
			}else if(customer2.salary == '50'){
				customer1.salaryCode = '5'
			}else{
				customer1.salaryCode = '6'
			}
		}
  	}else 
  	if(customerType == 'BENEFIC'){
  		customer1.bfcyName = customer2.appntName
		customer1.bfcyIdType = customer2.idType
		customer1.bfcyIdCode = customer2.idNo
		customer1.idStaDate = customer2.idStaDate
		customer1.bfcyIdExpDate = customer2.idExpDate
		customer1.bfcySex = customer2.appntSex
		customer1.bfcyBirthday = customer2.appntBirthday
		customer1.bfcyNativePlace = customer2.nativePlace
		customer1.province = customer2.province
		customer1.city = customer2.city
		customer1.county = customer2.county
		customer1.street = customer2.street
		customer1.community = customer2.community
		customer1.postalAddress = customer2.postalAddress
		customer1.phone = customer2.mobile
		if(customer2.appOccupation!='' && customer2.occupationCode!='' && customer2.occupationType!=''){
			customer1.occupation = customer2.appOccupation
			customer1.occupationCode = customer2.occupationCode
			customer1.occupationType = customer2.occupationType
		}
  	}
  },
  //将客户查询出的客户管理中的客户信息中的支付内容转换到保单投保人的支付信息中
  payInfoConvertInPolicy:(payInfo1,payInfo2)=>{
  	if(payInfo2!=undefined){
  		payInfo1.bankAccName = payInfo2.bankAccName
	  	payInfo1.bankAccNo = payInfo2.bankAccNo
	  	payInfo1.bankCode = payInfo2.bankCode
  	}
  },
  payInfoConvertInPlan:(payInfo1,payInfo2)=>{
  	if(payInfo2!=undefined){
  		payInfo1.bankAccName = payInfo2.bankAccName
	  	payInfo1.bankAccNo = payInfo2.bankAccNo
	  	payInfo1.bankCode = payInfo2.bankCode
  	}
  },
  //将试算对象
  customerConvertInPlanToPolicy(customerType,customer1,customer2){
  	//console.log(customerType)
  	//console.log(customer1)
  	//console.log(customer2)
  	customer1.infoId = customer2.infoId
  	customer1.memberType = customer2.memberType
  	if(customerType == 'APP'){
  		customer1.appntName= customer2.name
		customer1.appntBirthday= customer2.birthday
		customer1.appntSex= customer2.sex
		customer1.appOccupation= customer2.desc
		customer1.occupationType= customer2.level
		customer1.occupationCode= customer2.profession
		customer1.idType= customer2.idType
		customer1.idNo= customer2.idNo
		customer1.idExpDate= customer2.idExpDate
		customer1.id= customer2.id
		customer1.idStaDate= customer2.idStaDate
		if(customer2.more!=undefined){
			customer1.idStaDate = customer2.more.idStaDate
			customer1.nativePlace = customer2.more.nativePlace
			customer1.marriage = customer2.more.marriage
			customer1.province = customer2.more.province
			customer1.city = customer2.more.city
			customer1.county = customer2.more.county
			customer1.street = customer2.more.street
			customer1.community = customer2.more.community
			customer1.postalAddress = customer2.more.postalAddress
			customer1.zipCode = customer2.more.zipCode
			customer1.email = customer2.more.email
			customer1.mobile = customer2.more.mobile
			customer1.grpName = customer2.more.grpName
			if(customer2.more.salary!=''){
				customer1.salary = customer2.more.salary
				if(customer2.salary!=''){
					customer1.salary = customer2.more.salary
					if(customer2.more.salary == '10'){
						customer1.salaryCode = '1'
					}else if(customer2.more.salary == '20'){
						customer1.salaryCode = '2'
					}else if(customer2.more.salary == '30'){
						customer1.salaryCode = '3'
					}else if(customer2.more.salary == '40'){
						customer1.salaryCode = '4'
					}else if(customer2.more.salary == '50'){
						customer1.salaryCode = '5'
					}else{
						customer1.salaryCode = '6'
					}
				}
			}
  		}
		//核心查询
		if(customer2.cus != undefined) {
			customer1.province = customer2.cus.province
			customer1.city = customer2.cus.city
			customer1.county = customer2.cus.county
			customer1.street = customer2.cus.street
			customer1.community = customer2.cus.community
			customer1.postalAddress = customer2.cus.postalAddress
			customer1.marriage = customer2.cus.marriage
			customer1.zipCode = customer2.cus.zipCode
			customer1.email = customer2.cus.email
			customer1.mobile = customer2.cus.mobile
			customer1.grpName = customer2.cus.grpName
			if(customer2.cus.salary != '') {
				customer1.salary = customer2.cus.salary
				if(customer2.cus.salary == '10') {
					customer1.salaryCode = '1'
				} else if(customer2.cus.salary == '20') {
					customer1.salaryCode = '2'
				} else if(customer2.cus.salary == '30') {
					customer1.salaryCode = '3'
				} else if(customer2.cus.salary == '40') {
					customer1.salaryCode = '4'
				} else if(customer2.cus.salary == '50') {
					customer1.salaryCode = '5'
				} else {
					customer1.salaryCode = '6'
				}
			}
		}
  	}else if(customerType == 'INS'){
  		customer1.name = customer2.name
		customer1.birthday = customer2.birthday
		customer1.sex = customer2.sex
		customer1.insOccupation = customer2.desc
		customer1.occupationType = customer2.level
		customer1.occupationCode = customer2.profession
		customer1.idType = customer2.idType
		customer1.idNo = customer2.idNo
		customer1.idExpDate = customer2.idExpDate
		customer1.id = customer2.id
		customer1.relToApp = customer2.relationNew
		customer1.relToAppDesc = customer2.relToAppDesc
		customer1.seqNumber = customer2.seqNumber
		customer1.idStaDate= customer2.idStaDate
		if(customer2.more!=undefined){
			customer1.idStaDate = customer2.more.idStaDate
			customer1.nativePlace = customer2.more.nativePlace
			customer1.marriage = customer2.more.marriage
			customer1.province = customer2.more.province
			customer1.city = customer2.more.city
			customer1.county = customer2.more.county
			customer1.street = customer2.more.street
			customer1.community = customer2.more.community
			customer1.postalAddress = customer2.more.postalAddress
			customer1.zipCode = customer2.more.zipCode
			customer1.mobile = customer2.more.mobile
			customer1.grpName = customer2.more.grpName
			if(customer2.more.salary!=''){
				customer1.salary = customer2.more.salary
				if(customer2.more.salary!=''){
					customer1.salary = customer2.more.salary
					if(customer2.more.salary == '10'){
						customer1.salaryCode = '1'
					}else if(customer2.more.salary == '20'){
						customer1.salaryCode = '2'
					}else if(customer2.more.salary == '30'){
						customer1.salaryCode = '3'
					}else if(customer2.more.salary == '40'){
						customer1.salaryCode = '4'
					}else if(customer2.more.salary == '50'){
						customer1.salaryCode = '5'
					}else{
						customer1.salaryCode = '6'
				
					}	
				}
			}
  		}
		//核心查询
		if(customer2.cus != undefined) {
			customer1.province = customer2.cus.province
			customer1.city = customer2.cus.city
			customer1.county = customer2.cus.county
			customer1.street = customer2.cus.street
			customer1.community = customer2.cus.community
			customer1.postalAddress = customer2.cus.postalAddress
			customer1.marriage = customer2.cus.marriage
			customer1.zipCode = customer2.cus.zipCode
			customer1.mobile = customer2.cus.mobile
			customer1.grpName = customer2.cus.grpName
			if(customer2.cus.salary != '') {
				customer1.salary = customer2.cus.salary
				if(customer2.cus.salary == '10') {
					customer1.salaryCode = '1'
				} else if(customer2.cus.salary == '20') {
					customer1.salaryCode = '2'
				} else if(customer2.cus.salary == '30') {
					customer1.salaryCode = '3'
				} else if(customer2.cus.salary == '40') {
					customer1.salaryCode = '4'
				} else if(customer2.cus.salary == '50') {
					customer1.salaryCode = '5'
				} else {
					customer1.salaryCode = '6'
			}
		}
  	}
  }
  },
  getiPhoneVersion:()=>{
  	let userAgent = navigator.userAgent.toLowerCase(); 
	let result = userAgent.match(/cpu iphone os (.*?) like mac os/);
	if(result){
		return result[1].replace(/_/g,".")
	}else{
		return null
	}
 },
 	cardScanningValueChange(type, obj, obj2) {
		if(type == 1) { //试算
			obj.id = obj2.cusItem.id
			obj.name = obj2.cusItem.name
			obj.birthday = obj2.cusItem.birthday
			obj.sex = obj2.cusItem.gender
			obj.idType = "11"
			obj.idNo = obj2.cusItem.id_card_number
			obj.idExpDate = obj2.cusItem.valid_date
			obj.idStaDate = obj2.cusItem.idStaDate
		} else if(type == 2) { //投保人
			obj.id = obj2.cusItem.id
			obj.appntName = obj2.cusItem.name
			obj.appntBirthday = obj2.cusItem.birthday
			obj.appntSex = obj2.cusItem.gender
			obj.idType = "11"
			obj.idNo = obj2.cusItem.id_card_number
			obj.idExpDate = obj2.cusItem.valid_date
			obj.idStaDate = obj2.cusItem.idStaDate
		} else if(type == 3) { //被保人
			obj.id = obj2.cusItem.id
			obj.name = obj2.cusItem.name
			obj.birthday = obj2.cusItem.birthday
			obj.sex = obj2.cusItem.gender
			obj.idType = "11"
			obj.idNo = obj2.cusItem.id_card_number
			obj.idExpDate = obj2.cusItem.valid_date
			obj.idStaDate = obj2.cusItem.idStaDate
		} else if(type == 4) { //受益人
			obj.id = obj2.cusItem.id
			obj.bfcyName = obj2.cusItem.name
			obj.bfcyBirthday = obj2.cusItem.birthday
			obj.bfcySex = obj2.cusItem.gender
			obj.bfcyIdType = "11"
			obj.bfcyIdCode = obj2.cusItem.id_card_number
			obj.bfcyIdExpDate = obj2.cusItem.valid_date
			obj.idStaDate = obj2.cusItem.idStaDate
		}
	},
	occupationValueChange(type, obj, obj2) {
		if(type == 1) {
			obj.desc = obj2.occItem.descr
			obj.level = obj2.occItem.level
			obj.profession = obj2.occItem.code
		} else if(type == 2) {
			obj.appOccupation = obj2.occItem.descr
			obj.occupationType = obj2.occItem.level
			obj.occupationCode = obj2.occItem.code
		} else if(type == 3) {
			obj.insOccupation = obj2.occItem.descr
			obj.occupationType = obj2.occItem.level
			obj.occupationCode = obj2.occItem.code
		} else if(type == 4) {
			obj.occupation = obj2.occItem.descr
			obj.occupationType = obj2.occItem.level
			obj.occupationCode = obj2.occItem.code
		}
	},
	length(str){
	  	let realLength = 0, len = str.length, charCode = -1;
	  	for (let i = 0; i < len; i++) {
		    charCode = str.charCodeAt(i);
		    if (charCode >= 0 && charCode <= 128){
		    	 realLength += 1;
		    }else{
		    	realLength += 2;
		    }
	  	}
	  	return realLength;
	},
}
export default common
