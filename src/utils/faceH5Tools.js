const pagenum_electronics = '1';
const pagenum_bankchange = '2';
const pagenum_receipt = '3';
const pagenum_problem = '4';
const pagenum_recall = '5';

const faceH5Tools = {
	/*
		用于组装腾讯独立H5人脸识别地址
		姓名/证件号码/订单号/投保单号/证件类型/pageNum/peopleNum)
	*/
   	assemble(name, idNum, orderId, applyCode, idType, pageNum, peopleNum){
		let host = window.globalConfig.rootUrl.split('/')[2]
		let protocol = window.globalConfig.rootUrl.split(':')[0]
		let sign = name+'/'+ idNum +'/'+ orderId +'/'+ applyCode +'/'+ idType +'/'+ pageNum +'/'+ peopleNum
		console.log('sign',sign)
		let sign64 = window.Base64.encode(sign).replace(/\//g, '*')
		console.log('sign64', protocol + "://" + host + "/com.ifp.ipartner/Tencent/" + sign64)
		return protocol + "://" + host + "/com.ifp.ipartner/Tencent/" + sign64
    },
   	assembleProblem(name, idNum, orderId, applyCode, idType, pageNum, peopleNum, type){
		let host = window.globalConfig.rootUrl.split('/')[2]
		let protocol = window.globalConfig.rootUrl.split(':')[0]
		let sign = name+'/'+ idNum +'/'+ orderId +'/'+ applyCode +'/'+ idType +'/'+ pageNum +'/'+ peopleNum +'/'+ type
		console.log('sign',sign)
		let sign64 = window.Base64.encode(sign).replace(/\//g, '*')
		console.log('sign64', protocol + "://" + host + "/com.ifp.ipartner/Tencent/" + sign64)
		return protocol + "://" + host + "/com.ifp.ipartner/Tencent/" + sign64
    }
}
export default faceH5Tools
