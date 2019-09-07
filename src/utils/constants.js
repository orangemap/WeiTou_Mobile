const constants = {
  //获取投保人key值
  getAppntKey:()=>{
    return 'appnt'
  },
  //获取被保人key值
  getInsurantsKey:()=>{
    return 'insurants'
  },
  //获取告知项key值
  getPayInfoKey:()=>{
    return 'payinfo'
  },
  //获取告知项key值
  getQuestionsKey:()=>{
    return 'questions'
  },
	//获取业务人员报告书key值
   getSalesmanReportKey:()=>{
	   return 'salesmanReport'
   },
  //获取登陆代理人缓存信息key值
  getAgentKey:()=>{
    return 'personsal'
  },
  //获取当前代理人所销售保险产品列表的缓存信息key值
  getProductsKey: () => {
    return 'tag_products'
  },

}
export default constants
