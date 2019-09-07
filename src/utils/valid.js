import cardTypeList from '../assets/dict/card_type_sunlife.json'
import nationalList from '../assets/dict/national_sunlife.json'
import phoneNumberRuleList from '../assets/dict/phone_number_rule_sunlife.json'
import bankCode from '../assets/dict/bankCode.json'

const valid = {
	//座机校验
	homePhoneNum(code, num) {
		if((code != undefined && code != "") && (num == undefined || num == "")) {
			return "电话号码不能为空。\n"
		}
		if((code == undefined || code == "") && (num != undefined && num != "")) {
			return "电话号码不能为空。\n"
		}
		if(code != undefined && code != "") {
			if(code.length != 3 && code.length != 4) {
				return "区号可录入3和4位。\n"
			}
			let reg1 = new RegExp("([\\d])\\1{2}")
			if(reg1.test(code)) {
				return "区号位数录入有误，不可录入3位或相同数字。\n"
			}
			let reg2 = new RegExp("([\\d])\\1{3}")
			if(reg2.test(code)) {
				return "区号位数录入有误，不可录入4位相同数字。\n"
			}
		}
		if(num != undefined && num != "") {
			if(num.length != 7 && num.length != 8) {
				return "电话号可录入7和8位。\n"
			}
			let reg1 = new RegExp("([\\d])\\1{6}")
			if(reg1.test(num)) {
				return "电话号码录入有误，不可录入7位或相同数字。\n"
			}
			let reg2 = new RegExp("([\\d])\\1{7}")
			if(reg2.test(num)) {
				return "电话号码录入有误，不可录入8位相同数字。\n"
			}
			if(num.substring(0, 4) == "1234") {
				return "号码前四位不能是1234"
			}
		}
	},
	//年收入
	salary(salary) {
		console.log("年收入")
		console.log(salary)
		let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
		if(salary == undefined || salary == '') {
			return "年收入不能为空\n"
		} else if(!reg.test(salary)) {
			return "年收入必须为正数且小数位数不能大于两位。\n"
		}
	},
	//年收入
	customerSalary(salary) {
		console.log("年收入")
		console.log(salary)
		let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
		if(salary == undefined || salary == '') {

		} else if(!reg.test(salary)) {
			return "年收入必须为正数且小数位数不能大于两位。\n"
		}
	},
	//家庭年收入
	familySalay(salary) {
		console.log("家庭年收入")
		let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
		console.log(salary)
		if(salary == undefined || salary == "") {
			return "家庭年收入不能为空\n"
		} else if(!reg.test(salary)) {
			return "家庭年收入必须为正数且小数位数不能大于两位。\n"
		}
	},
	//保费预算
	premBudget(salary) {
		console.log("保费预算")
		let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
		if(!reg.test(salary)) {
			// return "投保人保费预算必须为正数且小数位数不能大于两位。\n"
			return "保费预算必须为正数且小数位数不能大于两位。\n"
		}
	},
	//工作单位
	grpName(grpName) {
		console.log("工作单位")
		console.log(grpName)
		if(grpName != undefined && grpName != "") {

		} else {
			return "工作单位或就读学校不能为空。\n"
		}

	},

	//职业
	occupation(occupationCode) {
		console.log("职业")
		console.log(occupationCode)
		if(occupationCode != undefined && occupationCode != "") {

		} else {
			return "职业类别未录入，请选择职业类别！\n"
		}
	},

	//手机号
	mobilePhone(mobilePhone) {
		console.log('手机号')
		console.log(mobilePhone)
		let tel = mobilePhone.replace(/(^\s*)|(\s*$)/g, "");
		let ispass = false
		if(phoneNumberRuleList != undefined && phoneNumberRuleList != "") {
			if(mobilePhone.toString().length == 11 && !isNaN(mobilePhone)) {
				for(let i = 0; i < phoneNumberRuleList.rule.item.length; i++) {
					//console.log(phoneNumberRuleList.rule.item[i].text)
					if(mobilePhone.substring(0, 3) == phoneNumberRuleList.rule.item[i].text) {
						ispass = true
						break
					}
				}
			}
		}
		if(tel == "") {
			return "手机号码不能为空。\n"
		} else if(tel.toString().length != 11) {
			return "手机号码长度有误,请核对。\n"
		} else if(isNaN(mobilePhone)) {
			return "手机号码需要输入11位纯数字,请核对。\n"
		}

		if(!ispass) {
			return "手机号码格式有误,请核对。\n"
		}
	},

	//校验银行卡号
	BankCode(code, bankNo) {
		console.log("code值:" + code)
		console.log("银行卡号" + bankNo)
		let ispass = false
		if(code != "" && bankNo != "") {
			let reg = /^\d{10,20}$/;
			bankNo = bankNo.replace(/(^\s*)|(\s*$)/g, "");
			//console.log(bankNo)
			if(!reg.test(bankNo)) {
				return '卡号输入有误,请核对。\n'
			} else {
				let isHave = false
				for(let i = 0; i < bankCode.bankCode.length; i++) {
					//console.log(bankCode.bankCode[i].code)
					if(code == bankCode.bankCode[i].code) {
						isHave = true
						for(let j = 0; j < bankCode.bankCode[i].ocrCode.length; j++) {
							//console.log(bankCode.bankCode[i].ocrCode[j])
							let length = bankCode.bankCode[i].ocrCode[j].length
							//console.log(length,'length')
							let bank = String(bankNo).substring(0, length)
							//console.log(bank)
							//console.log(bankCode.bankCode[i].ocrCode[j])
							if(bank == bankCode.bankCode[i].ocrCode[j]) {
								ispass = true
								return ''
							}
						}
					}
				}
				if(!isHave) {
					return ''
				}
			}
		}
		if(!ispass) {
			return "银行卡号有误,请核对。\n"
		}
	},
	//保全校验银行卡号
	BankCodeCard(code, bankNo) {
		console.log("code值:" + code)
		console.log("银行卡号" + bankNo)
		let ispass = false
		if(code != "" && bankNo != "") {
			let reg = /^\d{11,20}$/;
			bankNo = bankNo.replace(/(^\s*)|(\s*$)/g, "");
			//console.log(bankNo)
			if(!reg.test(bankNo)) {
				return '银行卡号有误或线上不允许使用存折账号，请核对。\n'
			} else {
				let isHave = false
				for(let i = 0; i < bankCode.bankCode.length; i++) {
					//console.log(bankCode.bankCode[i].code)
					if(code == bankCode.bankCode[i].code) {
						isHave = true
						for(let j = 0; j < bankCode.bankCode[i].ocrCode.length; j++) {
							//console.log(bankCode.bankCode[i].ocrCode[j])
							let length = bankCode.bankCode[i].ocrCode[j].length
							//console.log(length,'length')
							let bank = String(bankNo).substring(0, length)
							//console.log(bank)
							//console.log(bankCode.bankCode[i].ocrCode[j])
							if(bank == bankCode.bankCode[i].ocrCode[j]) {
								ispass = true
								return ''
							}
						}
					}
				}
				if(!isHave) {
					return ''
				}
			}
		}
		if(!ispass) {
			return "银行卡号有误或线上不允许使用存折账号，请核对。\n"
		}
	},
	//邮箱
	email(email) {
		console.log("邮箱")
		console.log(email)
		if(email != undefined && email != "") {
			let reg = /^[A-Za-z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!reg.test(email.replace(/(^\s*)|(\s*$)/g, ""))) {
				// return "您的邮箱格式有误，请核实！\n"
				return "邮箱格式有误，请核实！\n"
			}
		} else {
			return "邮箱不能为空。\n"
		}
	},

	//省 市 县 村/街道 镇/社区 详细地址
	contactAddress(province, city, county, postalAddress, street, community) {
		console.log("省 市 县 村/街道 镇/社区 详细地址")
		console.log(province)
		console.log(city)
		console.log(county)
		console.log(postalAddress)
		if(province != undefined && province != "" && city != undefined && city != "") {
			if(postalAddress != undefined && postalAddress != "" && county != undefined && county != "") {
				// let reg= /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
				// if(!reg.test(postalAddress)||
				//   !reg.test(street)||
				//   !reg.test(community)){
				//   return "详细地址输入有误。\n"
				// }
				let len1 = 0
				let len2 = 0
				if(street != undefined && street != "") {
					len1 = street.replace(/[^\x00-\xff]/g, "01").length
				}
				if(community != undefined && community != "") {
					len2 = community.replace(/[^\x00-\xff]/g, "01").length
				}
				let len3 = postalAddress.replace(/[^\x00-\xff]/g, "01").length
				if(len1 + len2 + len3 < 10) {
					return "详细地址不得少于10个字符,2个字符1个汉字。\n"
				}
				if(len1 + len2 + len3 > 150) {
					return "详细地址不得超过150个字符,2个字符1个汉字。\n"
				}
			} else {
				return "详细地址填写不完整。\n"
			}
		} else {
			return "联系地址填写不完整。\n"
		}
	},
	// 国籍nationality 性别Gender 生日Birthday 证件类型 证件号码 Certificates
	ngbc(nationality, gender, birthday, idType, idNo) {
		console.log("国籍 性别 生日 证件类型 证件号码")
		console.log(nationality)
		console.log(gender)
		console.log(birthday)
		console.log(idType)
		console.log(idNo)
		if(gender != undefined && gender != "") {
			if(birthday != undefined && birthday != "") {
				let compareDateTime = new Date(birthday).getTime() - new Date().getTime()
				if(compareDateTime > 0) {
					return "出生日期不得晚于当前日期。\n"
				}
				if(nationality != undefined && nationality != "") {
					if(idType != undefined && idType != "") {
						let cardItem = utils.valid.getCardItem(idType) ? utils.valid.getCardItem(idType) : ''
						let remark = cardItem.remark ? cardItem.remark : ''
						//证件类型与国籍校验
						if(remark != undefined && remark != "") {
							let remarks = remark.split(',')
							var national = ''
							for(var i = 0; i < remarks.length; i++) {
								national += utils.valid.getNationalItem(remarks[i].replace('!', '')).text
								if(i != remarks.length - 1) {
									national += ",";
								}
							}
							let isHaveNo = remark.indexOf("!")
							if(isHaveNo > -1) { //包含!非此国家
								let remarks = remark.split(',')
								for(var i = 0; i < remarks.length; i++) {
									if(remarks[i] == "!" + nationality) {
										return "证件类型为" + cardItem.text + ",国籍不能为" + national + "\n"
									}
								}
							} else {
								if(remark.indexOf(nationality) == -1) {
									return "证件类型为" + cardItem.text + ",国籍必须为" + national + "\n"
								}
							}
						}
						//出生证年龄判断
						let age = utils.valid.getAge(birthday)
						if(age >= 3 && idType == "20") {
							// return "客户年龄大于等于3周岁时证件类型不能选择出生证\n"
							return "年龄大于等于3周岁时证件类型不能选择出生证\n"
						}
						//证件号码校验
						if(idNo != undefined && idNo != "") {
							let length = idNo.trim().length
							let minle = cardItem.minle
							//证件号码长度校验
							if(minle != undefined && minle != "") {
								if(minle > length) {
									return "证件类型为" + cardItem.text +
										",证件号码不得小于" + minle + "位。\n"
								}
							}
							let maxle = cardItem.maxle
							if(maxle != undefined && maxle != "") {
								if(maxle < length) {
									return "证件类型为" + cardItem.text +
										",证件号码不得大于" + maxle + "位。\n"
								}
							}
							if(idType == "29") {
								let newIdNo = idNo.replace("x", "X")
								let reg = /^[A-Z0-9]{15}$/;
								if(!reg.test(newIdNo)) {
									return "证件类型为外国人永久居留身份证类，证件号码须为15位且只包含大写字母与数字。\n"
								}
							}
							if(/[a-z]/.test(idNo)) {
								return "证件号码不可包含小写字母。\n"
							}
							//身份证和户口本特殊处理,其他证件的国籍和证件号码长度在字典xml中配置
							if(idType == "11" || idType == "12") {
								let newIdNo = idNo.replace("x", "X")
								if(newIdNo.length != 18) {
									return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
								} else if(!utils.valid.checkIdCardAndBirthday(newIdNo, birthday)) {
									return "证件类型为" + cardItem.text + ",证件号码填写与生日不匹配。\n"
								} else if(!utils.valid.checkIdCardAndGender(newIdNo, gender)) {
									return "证件类型为" + cardItem.text + ",证件号码填写与性别不匹配。\n"
								}
								if(!utils.valid.checkIdCard(newIdNo)) {
									return "证件类型为" + cardItem.text + ",证件号码填写不正确。\n"
								}
							}
							if(idType == "30") {
								if(idNo.length != 18) {
									return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
								} else {
									let newNo = idNo.substring(0, 6)
									console.log('30================', idNo, newNo)
									if(newNo != '810000' && newNo != '820000' && newNo != '830000') {
										return "证件类型为" + cardItem.text + ",证件号码填写有误。\n"
									}
								}
							}
						} else {
							return "证件号码不能为空。\n"
						}
					} else {
						return "证件类型不能为空。\n"
					}
				} else {
					return "国籍不能为空。\n"
				}
			} else {
				return "出生日期不能为空。\n"
			}
		} else {
			return "性别不能为空。\n"
		}
	},
	//性别Gender 生日Birthday 证件类型 证件号码 Certificates
	ngbc3(gender, birthday, idType, idNo) {
		console.log("性别 生日 证件类型 证件号码")
		console.log(gender)
		console.log(birthday)
		console.log(idType)
		console.log(idNo)
		if(gender != undefined && gender != "") {
			if(birthday != undefined && birthday != "") {
				let compareDateTime = new Date(birthday).getTime() - new Date().getTime()
				if(compareDateTime > 0) {
					return "出生日期不得晚于当前日期。\n"
				}
				if(idType != undefined && idType != "") {
					let cardItem = utils.valid.getCardItem(idType)
					let remark = cardItem.remark
					//出生证年龄判断
					let age = utils.valid.getAge(birthday)
					if(age > 3 && idType == "20") {
						return "年龄3周岁以上，不可以使用出生证。\n"
					}
					//证件号码校验
					if(idNo != undefined && idNo != "") {
						let length = idNo.trim().length
						let minle = cardItem.minle
						if(idType == "20") {
							let newNo = idNo.substring(0, 1)
							if(length < minle || length > maxle) {
								return cardItem.text +
									"证件号码长度必须为4-20位，请确认。\n"
							}
							let reg = new RegExp("[a-zA-Z]{1}");
							if(!reg.test(newNo)) {
								return cardItem.text +
									"证件号码有误，请确认。\n"
							}
						}
						if(idType == "23") {
							if(length < minle) {
								return cardItem.text +
									"号码长度必须为3~20位，请确认。\n"
							}
						}
						//证件号码长度校验
						if(minle != undefined && minle != "") {
							if(minle > length) {
								return "证件号码有误，请确认。\n"
							}
						}
						let maxle = cardItem.maxle
						if(maxle != undefined && maxle != "") {
							if(maxle < length) {
								return cardItem.text +
									"证件号码长度不能大于" + maxle + "位。请确认。\n"
							}
						}
						//						if(idType == "29") {
						//							let newIdNo = idNo.replace("x", "X")
						//							let reg = /^[A-Z0-9]{30}$/;
						//							if(!reg.test(newIdNo)) {
						//								return "永久居留证号码长度不能大于30位，请确认。\n"
						//							}
						//						}
						//身份证和户口本特殊处理,其他证件的国籍和证件号码长度在字典xml中配置
						if(idType == "11" || idType == "12") {
							let newIdNo = idNo.replace("x", "X")
							if(newIdNo.length != 18) {
								return cardItem.text + "证件号码必须为18位，请确认。\n"
							} else if(!utils.valid.checkIdCardAndBirthday(newIdNo, birthday)) {
								return cardItem.text + "有误，请确认。\n"
							} else if(!utils.valid.checkIdCardAndGender(newIdNo, gender)) {
								return cardItem.text + "有误，请确认。\n"
							}
							if(!utils.valid.checkIdCard(newIdNo)) {
								return "证件类型为" + cardItem.text + ",证件号码填写不正确。\n"
							}
						}
						//						if(/[a-z]/.test(idNo)){
						//							return "不可包含小写字母。\n"
						//						}
						if(idType == "30") {
							if(idNo.length != 18) {
								return cardItem.text + "证件号码必须为18位，请确认。\n"
							} else if(!utils.valid.checkIdCardAndBirthday(idNo, birthday)) {
								return cardItem.text + "有误，请确认。\n"
							} else if(!utils.valid.checkIdCardAndGender(idNo, gender)) {
								return cardItem.text + "有误，请确认。\n"
							} else {
								let newNo = idNo.substring(0, 6)
								console.log('30================', idNo, newNo)
								if(newNo != '810000' && newNo != '820000' && newNo != '830000') {
									return "证件号码有误，请确认。\n"
								}
							}
						}
					}
				}
			} else {
				return "出生日期不能为空。\n"
			}
		} else {
			return "性别不能为空。\n"
		}
	},
	nationalityAndidType(nationality, idType) {
		console.log(nationality)
		console.log(idType)
		if(nationality != undefined && nationality != "") {
			if(idType != undefined && idType != "") {
				let cardItem = utils.valid.getCardItem(idType) ? utils.valid.getCardItem(idType) : ''
				let remark = cardItem.remark ? cardItem.remark : ''
				//证件类型与国籍校验
				if(remark != undefined && remark != "") {
					let remarks = remark.split(',')
					var national = ''
					for(var i = 0; i < remarks.length; i++) {
						national += utils.valid.getNationalItem(remarks[i].replace('!', '')).text
						if(i != remarks.length - 1) {
							national += ",";
						}
					}
					let isHaveNo = remark.indexOf("!")
					if(isHaveNo > -1) { //包含!非此国家
						let remarks = remark.split(',')
						for(var i = 0; i < remarks.length; i++) {
							if(remarks[i] == "!" + nationality) {
								return "证件类型为" + cardItem.text + ",国籍不能为" + national + "\n"
							}
						}
					} else {
						if(remark.indexOf(nationality) == -1) {
							return "证件类型为" + cardItem.text + ",国籍必须为" + national + "\n"
						}
					}
				}
				return ''
			}
			return ''
		}
	},
	//性别Gender 生日Birthday 证件类型 证件号码 Certificates
	ngbc2(gender, birthday, idType, idNo) {
		console.log("性别 生日 证件类型 证件号码")
		console.log(gender)
		console.log(birthday)
		console.log(idType)
		console.log(idNo)
		if(gender != undefined && gender != "") {
			if(birthday != undefined && birthday != "") {
				let compareDateTime = new Date(birthday).getTime() - new Date().getTime()
				if(compareDateTime > 0) {
					return "出生日期不得晚于当前日期。\n"
				}
				if(idType != undefined && idType != "") {
					let cardItem = utils.valid.getCardItem(idType)
					let remark = cardItem.remark
					//出生证年龄判断
					let age = utils.valid.getAge(birthday)
					if(age >= 3 && idType == "20") {
						// return "客户年龄大于等于3周岁时证件类型不能选择出生证\n"
						return "年龄大于等于3周岁时证件类型不能选择出生证\n"
					}
					//证件号码校验
					if(idNo != undefined && idNo != "") {
						let length = idNo.trim().length
						let minle = cardItem.minle
						//证件号码长度校验
						if(minle != undefined && minle != "") {
							if(minle > length) {
								return "证件类型为" + cardItem.text +
									",证件号码不得小于" + minle + "位。\n"
							}
						}
						let maxle = cardItem.maxle
						if(maxle != undefined && maxle != "") {
							if(maxle < length) {
								return "证件类型为" + cardItem.text +
									",证件号码不得大于" + maxle + "位。\n"
							}
						}
						if(idType == "29") {
							let newIdNo = idNo.replace("x", "X")
							let reg = /^[A-Z0-9]{15}$/;
							if(!reg.test(newIdNo)) {
								return "证件类型为外国人永久居留身份证类，证件号码须为15位且只包含大写字母与数字。\n"
							}
						}
						//身份证和户口本特殊处理,其他证件的国籍和证件号码长度在字典xml中配置
						if(idType == "11" || idType == "12") {
							let newIdNo = idNo.replace("x", "X")
							if(newIdNo.length != 18) {
								return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
							} else if(!utils.valid.checkIdCardAndBirthday(newIdNo, birthday)) {
								return "证件类型为" + cardItem.text + ",证件号码填写与生日不匹配。\n"
							} else if(!utils.valid.checkIdCardAndGender(newIdNo, gender)) {
								return "证件类型为" + cardItem.text + ",证件号码填写与性别不匹配。\n"
							}
							if(!utils.valid.checkIdCard(newIdNo)) {
								return "证件类型为" + cardItem.text + ",证件号码填写不正确。\n"
							}
						}
						if(/[a-z]/.test(idNo)) {
							return "不可包含小写字母。\n"
						}
						if(idType == "30") {
							if(idNo.length != 18) {
								return "证件类型为" + cardItem.text + ",证件号码填写不符合18位校验规则。\n"
							} else {
								let newNo = idNo.substring(0, 6)
								console.log('30================', idNo, newNo)
								if(newNo != '810000' && newNo != '820000' && newNo != '830000') {
									return "证件类型为" + cardItem.text + ",证件号码填写有误。\n"
								}
							}
						}
					} else {
						return "证件号码不能为空。\n"
					}
				} else {
					return "证件类型不能为空。\n"
				}
			} else {
				return "出生日期不能为空。\n"
			}
		} else {
			return "性别不能为空。\n"
		}
	},
	//证件有效期校验
	compareDateTime(date) {
		let oldDate = new Date(date).getTime();
		let newDate = new Date().getTime();
		return newDate - oldDate
	},
	// 校验姓名规则
	uname(uname) {
		console.log(uname)
		let userName = uname.replace(/\s+/g, "")
		let reg1 = /.*\d.*/;
		let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
		let reg3 = /^[\u4E00-\u9FA5]+$/;
		if(userName == undefined || userName == "") {
			// return '请您准确填写真实姓名！\n'
			return '需准确填写真实姓名！\n'
		} else {
			if(reg1.test(userName)) {
				return '您的姓名中含有特殊字符、数字或空格，请核对！'
			} else
			if(!reg2.test(userName)) {
				return '您的姓名中含有特殊字符、数字或空格，请核对！'
			}
			if(userName.length < 2) {
				return "姓名长度不得少于2个字符，请核实！\n"
			}
			if(userName.length > 120) {
				// return "请核实您的姓名是否准确，请输入小于120个字符！\n"
				return "姓名是否准确，请输入小于120个字符！\n"
			}
		}
	},
	names(uname) {
		let userName = uname.replace(/\s+/g, "")
		let reg1 = /.*\d.*/;
		let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
		let reg3 = /^[\u4E00-\u9FA5]+$/;
		if(userName == undefined || userName == "") {
			// return '请您准确填写真实姓名！\n'
			return '需准确填写真实姓名！\n'
		} else {
			if(reg1.test(userName)) {
				console.log(1)
				return '姓名中含有特殊字符、数字或空格，请核对！'
			} else
			if(!reg2.test(userName)) {
				console.log(2)
				return '姓名中含有特殊字符、数字或空格，请核对！'
			}
			if(userName.length < 2) {
				console.log(3)
				return "姓名长度不得少于2个字符，请核实！\n"
			}
			if(userName.length > 120) {
				console.log(4)
				// return "请核实您的姓名是否准确，请输入小于120个字符！\n"
				return "姓名是否准确，请输入小于120个字符！\n"
			}
		}
	},
	//校验国籍非空
	national(national) {
		let country = national;
		if(country == "") {
			return '国籍不能为空,需核实！'
		}
	},
	//校验联系地址
	//缺:联系地址输入有误校验
	//   联系地址填写不完整校验
	// contactAddress(contactAddress){
	//   let address=contactAddress;
	//   if(address.length>33){
	//     return "联系地址不得超过33个字！"
	//   }else if(address.length<10){
	//     return "联系地址不得少于10个字符！"
	//   }
	// },
	//邮箱校验
	// emailBox(emailBox){
	//   let email=emailBox;
	//   let reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	//   if(email==""){
	//     return "邮箱不能为空！"
	//   }else if(!reg.test(email)){
	//     return "邮箱输入有误！"
	//   }
	// },
	//校验固定电话号
	areaPhoneNum(areaNum, phoneNum) {
		// 区号校验
		let areaCode = areaNum;
		let reg1 = /^\d{3,4}$/;
		let reg2 = /^([0-9])\1{2}$/;
		let reg3 = /^([0-9])\1{3}$/;
		if(!reg1.test(areaCode)) {
			return '区号位数录入有误,仅可录入3位或4位数字！'
		} else if(reg2.test(areaCode)) {
			return "区号位数录入有误,不可录入3位或相同数字！"
		} else if(reg3.test(areaCode)) {
			return '区号位数录入有误,不可录入4位相同数字！'
		} else if(areaCode == "") {
			return "区号不能为空！"
		}
		// 电话号校验
		let phone = phoneNum;
		let reg4 = /^\d{7,8}$/;
		let reg5 = /^([0-9])\1{6}$/;
		let reg6 = /^([0-9])\1{7}$/;
		let reg7 = /^[1][2][3][4]/;
		if(!reg4.test(phone)) {
			return "电话号码位数录入有误,仅可录入7位或8位数字！"
		} else if(reg5.test(phone)) {
			return "电话号码录入有误,不可录入7位或相同数字！"
		} else if(reg6.test(phone)) {
			return "电话号码录入有误,不可录入8位相同数字！"
		} else if(reg7.test(phone)) {
			return "电话号码录入有误,前4位不可录入1234！"
		} else if(phone == "") {
			return "电话号码不能为空！"
		}
	},

	//证件有效起期校验
	idCardValidity2(idCard) {
		console.log("证件有效起期")
		console.log(idCard)
		let iCard = new Date(idCard).getTime();
		let newDate = new Date().getTime();
		if(idCard == undefined || idCard == "") {
			return "证件有效起期不能为空"
		} else {
			if(newDate - iCard < 0) {
				return "证件有效起期不得晚于当前日期"
			}
		}
	},

	//证件有效止期校验
	idCardValidity(idCard) {
		console.log("证件有效止期")
		console.log(idCard)
		let iCard = new Date(idCard).getTime();
		let newDate = new Date().getTime();
		if(idCard == undefined || idCard == "") {
			return "证件有效止期不能为空"
		} else {
			if(newDate - iCard > 0) {
				return "证件有效止期不得早于当前日期"
			}
		}
	},
	// 客户类型(投保人,被保人),证件号码,国籍,证件类型
	// 缺:证件与国籍校验
	//    证件类型为回乡证类，证件号码不得小于8位
	idNum(idNum) {
		let birthDate = idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12, 14);
		let birth = new Date("birthDate").getTime();
		let newDate = new Date().getTime();
		let reg = /^[1-9](\d{16}|\d{13})[0-9X]$/;
		if((birth - newDate) > 0) {
			return "出生日期不得晚于当前日期"
		} else if(!reg.test(idNum)) {
			return "证件号码填写不正确"
		} else if(idNum == "") {
			return "证件号不能为空"
		}
	},
	checkIdCardAndGender(idNo, genderCode) {
		var idCard = idNo
		if(idCard == undefined) {
			idCard = ""
		}
		if(genderCode == undefined || genderCode == "")
			return false;
		if(idCard.length == 18) {
			var c17 = idCard.substring(16, 17);
			var c = c17
			if(c % 2 == 1 && "1" == genderCode)
				return true;
			else if(c % 2 == 0 && "2" == genderCode)
				return true;
			else
				return false;
		} else if(idCard.length == 15) {
			var c15 = idCard.substring(14, 15);
			var c = c15
			if(c % 2 == 1 && "1" == genderCode)
				return true;
			else if(c % 2 == 0 && "2" == genderCode)
				return true;
			else
				return false;
		}
		return false;
	},
	checkIdCardAndBirthday(idNo, birthday) {
		let idCard = idNo
		if(idCard == undefined) {
			idCard = ""
		}
		if(birthday == undefined || birthday == "")
			return false;
		var str1 = birthday.replace(new RegExp("-", "g"), '')
		var str2;
		if(idCard.length == 18)
			str2 = idCard.substring(6, 14);
		else
			str2 = "19" + idCard.substring(6, 12);
		if(str1 != str2)
			return false;
		return true;
	},
	checkIdCard(idNo) {
		var idCard = ""
		idCard = idNo
		if(idCard == undefined) {
			idCard = ""
		}
		idCard = idCard.trim();
		if("" == idCard)
			return false;
		if(idCard.length != 15 && idCard.length != 18)
			return false;
		if(idCard.length == 15) {
			for(var i = 0; i < idCard.length; i++) {
				if(idCard.charAt(i) < '0' || idCard.charAt(i) > '9')
					return false;
			}
		} else {
			for(var i = 0; i < 18; i++) {
				if(i == 17 && (idCard.charAt(i) == 'x' || idCard.charAt(i) == 'X'))
					break;
				if(idCard.charAt(i) < '0' || idCard.charAt(i) > '9')
					return false;
			}
			var c = utils.valid.getVerifyBit(idCard);
			if(c != null) {
				var ce = idCard.substring(17, 18);
				if(c != ce)
					return false;
			}
		}
		return true;
	},
	getVerifyBit(idNo) {
		var id = ""
		id = idNo
		if(idNo == undefined) {
			idNo = ""
		}
		if(id == null || id.length != 18)
			return null;
		var result = null;
		var ai = [];
		for(var i = 0; i < 18; i++) {
			var a = id.substring(i, i + 1);
			ai[i] = 0;
			if("X" == a.toUpperCase())
				ai[i] = 10;
			else
				ai[i] = a;
		}
		var nNum = ai[0] * 7 + ai[1] * 9 + ai[2] * 10 + ai[3] * 5 + ai[4] * 8 + ai[5] * 4 + ai[6] * 2 + ai[7] * 1 +
			ai[8] * 6 + ai[9] * 3 + ai[10] * 7 + ai[11] * 9 + ai[12] * 10 + ai[13] * 5 + ai[14] * 8 + ai[15] * 4 +
			ai[16] * 2;
		nNum = nNum % 11;
		switch(nNum) {
			case 0:
				result = "1";
				break;
			case 1:
				result = "0";
				break;
			case 2:
				result = "X";
				break;
			case 3:
				result = "9";
				break;
			case 4:
				result = "8";
				break;
			case 5:
				result = "7";
				break;
			case 6:
				result = "6";
				break;
			case 7:
				result = "5";
				break;
			case 8:
				result = "4";
				break;
			case 9:
				result = "3";
				break;
			case 10:
				result = "2";
				break;
		}
		return result;
	},
	getCardItem(code) {
		if(code != undefined && code != "") {
			if(cardTypeList != undefined && cardTypeList != "") {
				for(var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
					if(cardTypeList.dict_cardtype.item[i].code == code) {
						return cardTypeList.dict_cardtype.item[i]
					}
				}
			}
		}
	},
	getNationalItem(code) {
		if(code != undefined && code != "") {
			if(nationalList != undefined && nationalList != "") {
				for(var i = 0; i < nationalList.national.item.length; i++) {
					if(nationalList.national.item[i].code == code) {
						return nationalList.national.item[i]
					}
				}
			}
		}
	},
	getAge(value, newValue) {
		var birthday = new Date(value)
		var now = ''
		if(newValue != undefined && newValue != "") {
			now = new Date(newValue)
		} else {
			now = new Date()
		}
		let age = now.getFullYear() - birthday.getFullYear() - 1
		if(now.getMonth() - birthday.getMonth() > 0) {
			age++
		} else if((now.getMonth() - birthday.getMonth()) == 0 && (now.getDate() - birthday.getDate()) >= 0) {
			age++
		}
		return age
	},
	settlementCardId(startData,endData,type,code,Birthday,name){//赔案二号令校验规则
		//起期，止期，证件类型，证件号, 生日，身份类别(出险人/代理人/被保人/受益人)
		let age = utils.valid.getAge(Birthday)
		if(startData == '' || startData == '请选择' || startData == '请选择' || startData == undefined) {
			return '请填写'+name+'证件有效期起期'
		} 
		if(endData == '' || endData == '请选择' || endData == '请选择' || endData == undefined) {
			return '请填写'+name+'证件有效期止期'
		}
		let startYear = parseInt(startData.split('-')[0])
		let endYear = parseInt(endData.split('-')[0])
		let startMouth = parseInt(startData.split('-')[1])
		let endMouth = parseInt(endData.split('-')[1])
		let startDay = parseInt(startData.split('-')[2])
		let endDay = parseInt(endData.split('-')[2])
		let year = startYear - endYear
		let mouth = startMouth - endMouth
		let day = startDay - endDay

		let myaer = new Date().getFullYear()
		let month = new Date().getMonth()
		if((month+1)<=9){
			month = '0'+(month+1)
		}else{
			month = month+1
		}
		let date = new Date().getDate()
		if(date<=9){
			date = '0'+date
		}
		// if(type == '12') { //户口本
		// 	let newdata = Birthday.split('-')
		// 	let newyaer = parseInt(newdata[0])+16 
		// 	let newBirthday = newyaer+'-'+newdata[1]+'-'+newdata[2]
		// 	if(endData != newBirthday) {
		// 		return name+'证件类型为户口本，证件有效期止期应为16周岁生日。'
		// 	}
		// }
		// if(type == '20') { //出生证
		// 	let newdata = Birthday.split('-')
		// 	let newyaer = parseInt(newdata[0])+3 
		// 	let newBirthday = newyaer+'-'+newdata[1]+'-'+newdata[2]
		// 	if(endData != newBirthday) {
		// 		return name+'证件类型为出生证，证件有效期止期应为3周岁生日。'
		// 	}
		// }
   	// if(type == '26') { //港澳通行证
   	// 	if(age < 18){
   	// 		let newdata = Birthday.split('-')
   	// 		let newyaer = parseInt(newdata[0])+5 
   	// 		let newBirthday = newyaer+'-'+newdata[1]+'-'+newdata[2]
   	// 		if(endData != newBirthday) {
   	// 			return name+'不满18周岁，证件类型为港澳通行证，证件有效期止期应为'+newBirthday
   	// 		}
   	// 	}else if(age > 18){
   	// 		let newdata = Birthday.split('-')
   	// 		let newyaer = parseInt(newdata[0])+10
   	// 		let newBirthday = newyaer+'-'+newdata[1]+'-'+newdata[2]
   	// 		if(endData != newBirthday) {
   	// 			return name+'为18周岁以上，证件类型为港澳通行证，证件有效期止期应为'+newBirthday
   	// 		}
   	// 	}
   	// }
   	return ''
   },
	InitDate(Date) {
		let month = Date.getMonth()
		if((month + 1) <= 9) {
			month = '0' + (month + 1)
		} else {
			month = month + 1
		}
		let date = Date.getDate()
		if(date <= 9) {
			date = '0' + date
		}
		return Date.getFullYear() + '-' + month + '-' + date
	},
	nationalityAndIdType(nationality, idType) {
		console.log(nationality)
		console.log(idType)
		if(nationality != undefined && nationality != "") {
			if(idType != undefined && idType != "") {
				let cardItem = utils.valid.getCardItem(idType) ? utils.valid.getCardItem(idType) : ''
				let remark = cardItem.remark ? cardItem.remark : ''
				//证件类型与国籍校验
				if(remark != undefined && remark != "") {
					let remarks = remark.split(',')
					var national = ''
					for(var i = 0; i < remarks.length; i++) {
						national += utils.valid.getNationalItem(remarks[i].replace('!', '')).text
						if(i != remarks.length - 1) {
							national += ",";
						}
					}
					let isHaveNo = remark.indexOf("!")
					if(isHaveNo > -1) { //包含!非此国家
						let remarks = remark.split(',')
						for(var i = 0; i < remarks.length; i++) {
							if(remarks[i] == "!" + nationality) {
								return "证件类型为" + cardItem.text + ",国籍不能为" + national + "\n"
							}
						}
					} else {
						if(remark.indexOf(nationality) == -1) {
							return "证件类型为" + cardItem.text + ",国籍必须为" + national + "\n"
						}
					}
				}
			}
		}
	},
	isLeapYear(intYear) {
		if(intYear % 100 == 0 && intYear % 400 == 0) {
			return true
		} else if((intYear % 4) == 0) {
			return true
		}
		return false
	},
	idExpDateValid(idStaDate, year) {
		let tempDate = new Date(idStaDate)
		let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
		let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
		let isLeapYear = this.isLeapYear(tempDate.getFullYear() + Number(year))
		if(!isLeapYear && tempMonth == "02" && tempDay == "29") {
			tempDay = tempDay - 1
		}
		let tempBir = tempDate.getFullYear() + Number(year) + '-' + tempMonth + '-' + tempDay;
		if(tempBir.indexOf('NaN') != '-1') {
			tempBir = ''
		}
		console.log('idExpDateValid->有效止期', tempBir, tempBir.indexOf('NaN'))
		return tempBir
	},
	checkDataBase(type, obj) { //1-投保人 2-被保人
		console.log('========', type, obj)
		let result = []
		let msg
		let relToApp
		let relToAppDesc
		let name = obj.appntName
		let idType = obj.idType
		let idNo = obj.idNo
		let idStaDate = obj.idStaDate
		let idExpDate = obj.idExpDate
		let sex = obj.appntSex
		let birthday = obj.appntBirthday
		let nativePlace = obj.nativePlace
		let marriage = obj.marriage
		if(type == 2) {
			relToApp = obj.relToApp
			relToAppDesc = obj.relToAppDesc
			name = obj.name
			birthday = obj.birthday
			sex = obj.sex
		} else if(type == 3) {
			relToApp = obj.relToIns
			relToAppDesc = obj.relToInsDesc
			name = obj.bfcyName
			idType = obj.bfcyIdType
			idNo = obj.bfcyIdCode
			idExpDate = obj.bfcyIdExpDate
			sex = obj.bfcySex
			birthday = obj.bfcyBirthday
			nativePlace = obj.bfcyNativePlace
		}
		if(relToApp == '' || relToAppDesc == '') {
			if(type == 1) {
				result.push('与投保人关系不能为空')
			} else {
				result.push('与被保人关系不能为空')
			}
		}
		if(name == '') {
			result.push('请输入姓名')
		} else if(name.length < 2) {
			result.push('请输入正确姓名')
		}
		if(idType == '') {
			result.push('请选择证件类型')
		} else if(type == 1 && idType == '12') {
			result.push('投保人不允许选择户口本')
		} else if(type == 1 && idType == '20') {
			result.push('投保人不允许选择出生证')
		}
		if(idNo == '') {
			result.push('请输入证件号码')
		}
		if(idStaDate == '') {
			result.push('请输入证件有效起止期')
		} else if(new Date().getTime() - new Date(idStaDate).getTime() < 0) {
			result.push('证件有效起期不得晚于当前日期')
		} else if((idType == '12' || idType == '20') && idStaDate != birthday) {
			result.push('证件有效起期应为' + birthday)
		}
		if(idExpDate == '') {
			result.push('请输入证件有效起止期')
		} else if(new Date().getTime() - new Date(idExpDate).getTime() > 0) {
			result.push('证件有效止期不得早于当前日期')
		} else if(idType == '12' && idExpDate != this.idExpDateValid(idStaDate, 16)) {
			result.push('证件有效止期应为' + this.idExpDateValid(idStaDate, 16))
		} else if(idType == '20' && idExpDate != this.idExpDateValid(idStaDate, 3)) {
			result.push('证件有效止期应为' + this.idExpDateValid(idStaDate, 3))
		}
		if(type == 1 && utils.valid.getAge(birthday) < 18) {
			result.push("投保人年龄必须大于18周岁（含）")
		}
		if(nativePlace == '') {
			result.push("请选择国籍")
		}
		if(marriage == '') {
			result.push("请选择婚姻状况")
		}
		let idTypeItem
		if(idType != '') {
			if(cardTypeList != undefined && cardTypeList != '') {
				cardTypeList.dict_cardtype.item.forEach(item => {
					if(item.code == idType) {
						idTypeItem = item
					}
				})
			}
			let isHaveNo = idTypeItem.remark.indexOf('!')
			let nativePlaceText = []
			idTypeItem.remark.split(',').forEach(item => {
				nationalList.national.item.forEach(national => {
					if(item.replace('!', '') == national.code) {
						nativePlaceText.push(national.text)
					}
				})
			})
			nativePlaceText = nativePlaceText.join(',')
			console.log('证件类型，国籍-->', idTypeItem, nativePlaceText, isHaveNo)
			if(isHaveNo > -1) {
				idTypeItem.remark.split(',').forEach(item => {
					if(item.replace('!', '') == nativePlace) {
						result.push(idTypeItem.text + '国籍不能是' + nativePlaceText)
					}
				})
			} else {
				if(idTypeItem.remark.indexOf(nativePlace) == '-1') {
					result.push(idTypeItem.text + '国籍必须是' + nativePlaceText)
				}
			}
			if(idTypeItem.minle != '' && idNo.length < idTypeItem.minle || idTypeItem.maxle != '' && idNo.length > idTypeItem.maxle) {
				result.push('证件号码长度必须在' + idTypeItem.minle + '-' + idTypeItem.maxle + '位之间')
			}
		}
		if(idType == '11' || idType == '12' || idType == '30') {
			if(idNo.length != 18) {
				result.push('证件号码长度必须为18位')
			}
			if(!utils.valid.checkIdCardAndBirthday(idNo, birthday)) {
				result.push('证件号码与生日不匹配，请确认')
			}
			if(!utils.valid.checkIdCardAndGender(idNo, sex)) {
				result.push('证件号码与性别不匹配，请确认')
			}
			if(!utils.valid.checkIdCard(idNo)) {
				result.push('请确认证件号码是否正确')
			}
			if(idType == '30' && nativePlace == 'HKG' && idNo.substring(0, 6) != '810000') {
				result.push('香港必须为810000开头')
			}
			if(idType == '30' && nativePlace == 'MAC' && idNo.substring(0, 6) != '820000') {
				result.push('澳门必须为820000开头')
			}
			if(idType == '30' && nativePlace == 'TWN' && idNo.substring(0, 6) != '830000') {
				result.push('台湾必须为830000开头')
			}
		} else if(idType == '20') {
			if(utils.valid.getAge(birthday) > 3) {
				result.push('年龄在3周岁以下')
			}
			let reg = /^[A-Za-z]$/
			if(!reg.test(idNo.substring(0, 1))) {
				result.push('证件号码有误，请确认')
			}
		}
		return result
	},
	checkDataDetails(type, obj) {
		let result = []
		let msg
		if(obj.province == '' || obj.city == '' || obj.county == '') {
			result.push('请选择投保省市区')
		}
		if(obj.street == ''&&obj.community == ''&&obj.postalAddress == '') {
			result.push('请输入镇/街道信息')
			result.push('请输入村/社区信息')
			result.push('请输入详细地址信息')
		}
//		if(obj.community == '') {
//			result.push('请输入村/社区信息')
//		}
//		if(obj.postalAddress == '') {
//			result.push('请输入详细地址信息')
//		}
//		let addrLen = Number(obj.street.length) + Number(obj.community.length) + Number(obj.postalAddress.length)
		let addrLen = utils.common.length(obj.street+obj.community+obj.postalAddress)//Number(obj.street.length) + Number(obj.community.length) + Number(obj.postalAddress.length)
		console.log('详细地址addrLen-->>', addrLen)
		if(addrLen < 10) {
			result.push('村/社区+镇/街道+详细地址长度不可小于10个字符')
		}
		if(addrLen > 50) {
			result.push('村/社区+镇/街道+详细地址长度不可大于50个字符')
		}
		if(obj.zipCode == '') {
			result.push('请输入邮政编码')
		} else if(obj.zipCode.length < 6) {
			result.push('邮编必须为6位数字')
		}
		if(type == 1) {
			if(obj.email == '') {
				result.push('请输入电子邮箱')
			} else if(obj.email.length > 30) {
				result.push('邮箱不能大于30位')
			} else {
				let reg = /^[A-Za-z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if(!reg.test(obj.email.replace(/(^\s*)|(\s*$)/g, ""))) {
					result.push('请确认邮箱是否正确')
				}
			}
		}
		if(type == 2 && utils.valid.getAge(obj.birthday) < 18 && obj.mobile == '') {

		} else if(obj.mobile == '') {
			result.push('请输入手机号码')
		} else if(obj.mobile.length != 11) {
			result.push('手机号必须为11位数字')
		} else if(obj.mobile.substring(0, 1) != 1) {
			result.push('手机号开头必须以1开头')
		}
		if(type == 1 && (obj.occupationCode == '' || obj.occupationType == '' || obj.appOccupation == '')) {
			result.push('请选择职业')
		}
		if(type == 2 && utils.valid.getAge(obj.birthday) > 6 && (obj.occupationCode == '' || obj.occupationType == '' || obj.insOccupation == '')) {
			result.push('请选择职业')
		}
		if(type == 2 && utils.valid.getAge(obj.birthday) < 7 && obj.grpName == '') {

		} else if(obj.grpName == '' && obj.occupationCode != '0101003' && obj.occupationCode != '0402008' &&
			obj.occupationCode != '0901025' && obj.occupationCode != '1201022' && obj.occupationCode != '1303026' &&
			obj.occupationCode != '1303027' && obj.occupationCode != '1303028') {
			result.push("请输入工作单位")
		}
		console.log(obj)
		console.log(type)
		if(type == 1 || type == 2 && utils.valid.getAge(obj.birthday) >= 18){
			if(obj.salaryCode == '' || obj.salary == '') {
				result.push('请输入年收入')
			} else if(type == 1 && Number(obj.salary) == 0) {
				result.push('年收入不可为0万元')
			}
		}
		return result
	},
}
export default valid