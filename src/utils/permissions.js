import permissionsList from '../assets/data/permissions.json'
/* 全渠道 ALL */
/* 银保渠道 */
/* channel == '13' //（金融市场部渠道）*/
/* channel == '02' //（银保渠道）*/

/* 综金渠道 */
/* channel == '01' //（代理人渠道）*/
/* channel == '03' //（老综金渠道）*/
/* channel == '04' //（综金渠道）*/
/* channel == '05' //（中介渠道）*/
/* channel == '06' //（续期渠道）*/
/* channel == '11' //（团险职域渠道）*/
/* channel == '00' //（特殊配置）*/
const permissions = {
	openModel(modelName){
		let isOper = false
		let have = permissionsList.openModel.model
		if(have.indexOf(modelName)>-1){
			isOper = true
		}
		return isOper
	},
  //可操作制作建议书功能
  operProposal(channel){
    let isOper = false
    let have = permissionsList.channel.proposal
    //全渠道试用
    if('ALL' == have){
      isOper = true
    }else{
      if(have.indexOf(channel)>-1){
        isOper = true
      }
    }
    return isOper
  },
  //可操作投保功能
  operPolicy(channel){
    let isOper = false
    let have = permissionsList.channel.policy
    //全渠道试用
    if('ALL' == have){
      isOper = true
    }else{
      if(have.indexOf(channel)>-1){
        isOper = true
      }
    }
    return isOper
  },
  //不可操作投保功能
  noOperPolicy(policyCode){
    let isOper = true
    let have = permissionsList.policy.code
    //全产品试用
    if('ALL' == have){
      isOper = false
    }else{
      if(have.indexOf(policyCode)>-1){
        isOper = false
      }
    }
    return isOper
  },
  test(){
    console.log("激活成功")
    console.log(permissionsList)
  },
}
export default permissions
