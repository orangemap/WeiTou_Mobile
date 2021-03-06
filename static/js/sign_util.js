var apiInstance;
var fileData;
var signData = {};

//添加单签签名框,编辑框序号,签字人员姓名,签字人员证件号
function addSignatureObj(objId,name,id_num) {
	var context_id = objId;
	var signer = new Signer(name, id_num);
	var signerRule = new SignRule_KeyWord("客户确认", 2, 0, 1, 1);
	var signatureConfig = new SignatureConfig(signer, signerRule);
	if(objId == "23"){
		signatureConfig.title="请业务人员签字"
	}else if(objId == "24"){
		signatureConfig.title="请投保人签字"
	}else if(objId == "25"){
		signatureConfig.title="请被保险人(法定监护人)签字"
	}else{
		signatureConfig.title="请签字"
	}
	// 1:时间在上、2：时间在下、3：时间在右
	var timeTag = new TimeTag(1, "yyMMdd hh:mm;ss");
	//设置签名图片宽度
	signatureConfig.singleWidth = 200;
	//设置签名图片高度
	signatureConfig.singleHeight = 200;
	//设置签名笔迹颜色，默认为黑色
	signatureConfig.penColor = "#000000";
	//是否开始时间戳服务
	signatureConfig.isTSS = false;
	signatureConfig.signatureImgRatio = 3.0;
	//签名是否必须,设置为true时必须进行签名
	signatureConfig.nessesary = true;
	var res = apiInstance.addSignatureObj(context_id, signatureConfig);
	if(res) {
		console.log("addSignatureObj " + context_id + " success");
		return res;
	} else {
		console.log("addSignatureObj " + context_id + " error");
		return res;
	}
}

//添加批签签名框
function addCommentObj(objId,name,id_num ,commitment ) {
	var context_id = objId;
	var signer = new Signer(name, id_num);
	var signerRule = new SignRule_XYZ(84.0, 523.0, 400.0, 477.0, 1, "dp");
	var commentConfig = new CommentConfig(signer, signerRule);
	var timeTag = new TimeTag(1, "yyMMdd hh:mm;ss");
	//是否开始时间戳服务
	commentConfig.isTSS = false;
	//批注内容
	commentConfig.commitment = commitment;
	//生成的签名图片中单个字的高
	commentConfig.mass_word_height = 50;
	//生成的签名图片中单个字的宽
	commentConfig.mass_word_width = 50;
	//生成的签名图片中单行显示的字数
	commentConfig.mass_words_in_single_line = 20;
	//设置笔迹颜色，默认为黑色
	commentConfig.penColor = "#000000";
	//是否为必签项
	commentConfig.nessesary = false;
	var res = apiInstance.addCommentObj(context_id, commentConfig);
	if(res) {
		console.log("addCommentObj " + context_id + " success");
		return res;
	} else {
		console.log("addCommentObj " + context_id + " error");
		return res;
	}
}

//配置模板数据
function setTemplateData() {
	var formData = "<html><head><title></title><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head><body><div><div><label>keyword:</label></div><div><label>列名2：</label></div><div><label>列名3：</label></div></div></body></html>";
	//文件数据
	var businessId = "123123"; //集成信手书业务的唯一标识
	var template_serial = "4000"; //用于生成PDF的模板ID
	var res;
	res = apiInstance.setTemplate(TemplateType.HTML, formData, businessId, template_serial);

	if(res) {
		console.log("setTemplateData success");
		return res;
	} else {
		alert("setTemplateData error");
		return res;
	}
}

//demo总入口 value = 渠道号,由信手书提供，请咨询项目经理
function initAnySign(channel) {
	var res;
	var callback = function(context_id, context_type, val) {
		try{
			document.getElementById("other").style.display = "block";
		} catch (err) {
			console.log(err)
    	}
		if(context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING) {
			return;
		}
		if(context_type == CALLBACK_TYPE_SIGNATURE || context_type == CALLBACK_TYPE_COMMENTSIGN) {
			signData.context_id =  context_id;
			signData.context_type = context_type;
			signData.value = "data:image/png;base64," + val;
		} else if(context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN) {
			document.getElementById("preview").src = "data:image/png;base64," + val;
		} else if(context_type == CALLBACK_TYPE_ON_MEDIA_DATA) {
			var audio = document.createElement("audio");
			if(audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
				audio.src = "data:image/gif;base64," + val;
				audio.play();
			}
		}
	}
	////////////////////////////////////////////////
	//设置签名算法，默认为RSA，可以设置成SM2
	EncAlgType.EncAlg = "RSA";
	apiInstance = new AnySignApi();
	//初始化签名接口
	res = apiInstance.initAnySignApi(callback, channel);
	if(!res) {
		alert("init error");
	}
	//注册一个单位签章
	var signer = new Signer("小明", "110xxxxxx");
	/**
	 * 使用服务器规则配置签名
	 * @param tid 服务器端生成的配置规则
	 * @constructor
	 */
	var signerRule = new SignRule_Tid("888888");
	var cachet_config = new CachetConfig(signer, signerRule, false);
}

function commitConfig(){
  //将配置提交
  var res = apiInstance.commitConfig();
  if(res) {
    // alert("Init ALL 初始化成功");
    console.log("初始化成功");
    //设置模板数据
    setTemplateData()
  } else {
    alert("Init ALL 初始化失败");
  }
}

function testIsReadyToUpload() {
	alert("testIsReadyToUpload :" + apiInstance.isReadyToUpload());
}

//生成签名加密数据
function testGenData() {
	var res = document.getElementById('result');

	try {
		res.value = apiInstance.getUploadDataGram();
		alert("value" + res.value);
	} catch(err) {
		alert(err);
	}
}

//弹出签名框签名
function showPopupDialog(context_id) {
	if(!apiInstance) {
		alert("信手书接口没有初始化");
		return;
	}
	switch(apiInstance.showSignatureDialog(context_id)) {
		case RESULT_OK:
			try{
				document.getElementById("other").style.display = "none";
			} catch (err) {
				console.log(err)
	    	}
			break;
		case EC_API_NOT_INITED:
			alert("信手书接口没有初始化");
			break;
		case EC_WRONG_CONTEXT_ID:
			alert("没有配置相应context_id的签字对象");
			break;
	}
}

//弹出批注签名框
function showCommentDialog(context_id) {
	if(!apiInstance) {
		alert("信手书接口没有初始化");
		return;
		testAnySign
	}
	switch(apiInstance.showCommentDialog(context_id)) {
		case RESULT_OK:
			try{
				document.getElementById("other").style.display = "none";
			} catch (err) {
				console.log(err)
	    	}
			break;
		case EC_API_NOT_INITED:
			alert("信手书接口没有初始化");
			break;
		case EC_WRONG_CONTEXT_ID:
			alert("没有配置相应context_id的签字对象");
			break;
		case EC_COMMENT_ALREADY_SHOW:
			alert("批注签名框已弹出，请勿重复操作！");
	}

}

function restoreBusiness() {

	var callback = function(context_id, context_type, val) {
		if(context_type == CALLBACK_TYPE_START_RECORDING || context_type == CALLBACK_TYPE_STOP_RECORDING) {
			return;
		}

		if(context_type == CALLBACK_TYPE_SIGNATURE) {
			//签名回显
			document.getElementById("xss_20").src = "data:image/png;base64," + val;
		} else if(context_type == CALLBACK_TYPE_ON_PICTURE_TAKEN) {
			document.getElementById("preview").src = "data:image/png;base64," + val;
		} else if(context_type == CALLBACK_TYPE_ON_MEDIA_DATA) {
			var audio = document.createElement("audio");
			if(audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
				audio.src = "data:image/gif;base64," + val;
				audio.play();
			}
		}

		setAlertTitle();
	};

	var apiInstance = new AnySignApi();
	//初始化签名接口
	res = apiInstance.initAnySignApi(callback, "1243");

	if(!res) {
		alert("init error");
	} else {
		alert("init success");
	}

	var encData = document.getElementById('result').value;
	var desKey = "334324afa";
	var res = apiInstance.restoreBusiness(encData, desKey);

	if(res) {
		alert("恢复数据成功");
	} else {
		alert("恢复数据失败");
	}

}


















//获取签名api版本信息
function testGetVersion() {
	alert(apiInstance.getVersion());
}

//获取设备操作系统信息
function testGetOsInfo() {
	alert(apiInstance.getOSInfo());
	alert(navigator.userAgent);
	alert(window.__wxjs_is_wkwebview);
}

//jane
function testAddEvidence() {
	//                MTExMTEx 为原文"111111" base64编码后数据
	//                alert(apiInstance.addEvidence("20","MTExMTEx","AMR","2","0"));

	//                字符串为图片base64编码之后的数据
	var result = "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bz18e+72h1txo/lqcPrbn1p6by538dKnvvXCwPd9tXbsE9lPfO1bd3/8g9nce6/81Ld/8va7lS/cE6iMfh34xFdgypCUGFnULcTijUcf+4pSX3nM+8Ll2vdf+/5nrn38qqPPeN5LD17/wic/c/9rvj71rUPHrvruS57nPXmn/uLdy61QL1+/9dSxP3j/9Velff+S6+8s/sGxv35r45bs/b9+6PXrf/CK99LRG/oPs7kAAAnWSURBVN9+6lGllPb9177/xVs2Gt96+jGlN64pf/vD+Vwul8+/u/36c77W+pL9txb/6KnnfF9r3X9u+eitd3y46muttNJKx4125v5PX/P4Vd99xvNe+sH1z9/+6e+f0b6vlXrsqbduvPdvPe+xz7/9xc9/5ydSed3T71Ze+9Ttv/WX6zGvQ9QN2KS/pQBcSEqMRsf76eEzTz/4xJ133rI3rbWu3XjnLU88+PQZrS4qvPzoo8unz7yV/rnfefHojcVgL63feuHxB2685dq01lrXrrrxkgcef+EtM+Add9y4N611+vJbP3+jUlpFN2qtlPrKo23bFy7XWmv9/qtuKTzywmmt9Vunn3j08zKP0kr6xU4RPhGt1FV33Hh5Wmtd23u5evHtt8/qrmu3Hn3xv/5cOuZ1cLx6ACYSSYmR+dG0Vkpr3/d9f23tGXXvTT9bFL/wDfXM2pr/vs888Ecffv3ondf/bPHyW774wKk3g738/uMPfsMz/f7FF570vvHg4/2NAat79khZvnCJ0jqm8awBA9734TvnHnzqlP/mC48+cueH91+4sQCtXVOETsTXWqUvvPDssz6r+4bo7hGS/pYCcOGJHowm/gJo41fotVKFwn71mS/+/deu+pmzOhb2f/J393/yd98evPin//7f/OrR9/3lne+3ew2efuyJz/3o7/+j6TV47Fcvfuzp3/rw9XOFwn71N4N1reeUUoPB60pVtY5s1NaAIdX9hwq//PQLl3h/87mPfm2j8t3y2ClCJ9J+feN1sPoX7e4bYl6HyFfV/bIDSBDXlBhZ5Dttvn/hRZeo9ltvaq39xSsPXfPH9z74d+ta+/3nv3Hg0i893l9/4kuX/tsHX39L+xfuqVarhUI6fXavM49998lD11x24U/H3HPldYce+u5jZ3xdveb26+77ve++0Pf99dM/uPc+pbX2F6++/br7fu/o8+ta908/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";
	alert(apiInstance.addEvidence(20, result, DataFormat.IMAGE_JPEG, BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK, 0));
}

function testSaveBusiness() {

	var encKey = "334324afa";
	var encData = apiInstance.saveBusiness(encKey);

	var res = document.getElementById('result');
	res.value = encData;
}

function addObjTest(){
	var res;
	//注册单字签字对象20
	res = addSignatureObj(20,'张鑫','1407241994');
	if(!res) {
		alert("addSignatureObj error");
	}
	res = addCommentObj(30,'李四','1207241994');
	if(!res) {
		alert("addCommentObj error");
	}
	//注册一个单位签章
	var signer = new Signer("小明", "110xxxxxx");
	/**
	 * 使用服务器规则配置签名
	 * @param tid 服务器端生成的配置规则
	 * @constructor
	 */
	var signerRule = new SignRule_Tid("888888");
	var cachet_config = new CachetConfig(signer, signerRule, false);
}

function getSignData(){
	console.log("签名信息=====>")
	var data = {
		date:new Date(),
		sign:signData
	}
	console.log(data)
	return data;
}

function destroy(){
	console.log('请空签字信息')
	signData = {};
}
