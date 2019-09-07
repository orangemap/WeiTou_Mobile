//import list from '../../static/dict/list_define.json'
//
//const list_define = {
////代理人信息,产品信息,投保人信息,被保人信息,
//getDocs(agent,products,appnt,insure){
//  if (agent != undefined && agent != "") {
//    //机构id
//    let orgId = agent.orgId
//    //代理人机构
//    let areaType = undefined
//    //主险类型
//    let mainType = undefined
//    let productType = undefined
//    //过滤代理人机构确定地区
//    if(orgId != undefined && orgId != ""){//机构代码存在
//      if(orgId == "8612"){//天津分公司
//        areaType = "01"
//      }else if(orgId == "8611"){//北京分公司
//        areaType = "02"
//      }else if(orgId == "8631"){//上海分公司
//        areaType = "03"
//      }else if(orgId == "8661"){//重庆分公司
//        areaType = "04"
//      }else if(orgId == "8651"){//广东分公司
//        areaType = "05"
//      }else if(orgId == "8635"){//宁波分公司
//        areaType = "06"
//      }else if(orgId == "8622"){//大连分公司
//        areaType = "07"
//      }else if(orgId == "8648"){//深圳分公司
//        areaType = "08"
//      }else{
//        areaType = ""
//      }
//    }
//    //过滤产品数组确定主险产品类型
//    for (var i = 0; i < products.length; i++) {
//      let product = products[i]
//      if (product.isMaster == "1") {
//        mainType = product.productType
//      }
//    }
//    if(productType == "1020"){//1020>分红寿险
//					productType = "01"
//    }else if(productType == "1030"){//1030>投资连接保险
//					productType = "02"
//    }else if(productType == "1040"){//1040>万能保险
//					productType = "03"
//    }else if(productType != "1020" && productType != "1030" && productType != "1040"){//// 非新型
//    	productType = "04"
//    }
//    for (var i=0;i<list.length;i++) {
//    	
//    }
//  }
//}
//}
//export default list_define
