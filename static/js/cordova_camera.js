var pictureSource;
var destinationType;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

//调用相机拍照
function capturePhotoCallback(success,fail) {
	navigator.camera.getPicture(function (data){
		compressBase64(data,function (imageData){
			success(imageData)
		})
	}, function camerFail(message){
		fail(message)
	}, {
		quality: 100,
//		allowEdit: true,
		destinationType: destinationType.FILE_URI,
		targetWidth:1240,
        targetHeight:720
	});
}

//调用相机拍照
function capturePhotoCallback2(success,fail) {
	navigator.camera.getPicture(function (data){
		compressBase64(data,function (imageData){
			success(imageData)
		})
	}, function camerFail(message){
		fail(message)
	}, {
		quality: 100,
//		allowEdit: true,
		destinationType: destinationType.FILE_URI,
		targetWidth:1240,
        targetHeight:720
	});
}

//通过相册选择图片
function getNewPhoto(source,success,fail) {
	navigator.camera.getPicture(function cameraSuccess(imageData){
		compressBase64(imageData,function (imageData1){
			success(imageData1)
		})
	},function camerFail(message){
		fail(message)
	},
	{
		quality: 100,
		destinationType: destinationType.FILE_URI,
		sourceType: source,
//		allowEdit: true,
		targetWidth:1240,
        targetHeight:720
	});
} 

//调用相机拍照
function capturePhotoURICallback(success,fail) {
	navigator.camera.getPicture(function cameraSuccess(url){
		success(url)
	}, function camerFail(message){
		fail(message)
	}, {
		quality: 20,
		allowEdit: true,
		destinationType: destinationType.FILE_URI
	});
}

//调用相机拍照
function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 50,
		destinationType: destinationType.DATA_URL
	});
}



//调用相机拍照并剪切
function capturePhotoEdit() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 20,
		allowEdit: true,
		destinationType: destinationType.DATA_URL
	});
}

//获取照片(pictureSource.PHOTOLIBRARY 图片库)(pictureSource.SAVEDPHOTOALBUM 图片专辑)
function getPhoto(source) {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 20,
		destinationType: destinationType.FILE_URI,
		sourceType: source
	});
}

function getPhoto1(source) {
	navigator.camera.getPicture(onPhotoURISuccess1, onFail, {
		quality: 20,
		destinationType: destinationType.FILE_URI,
		sourceType: source
	});
} 
//成功获取图片data数据
function onPhotoDataSuccess(imageData) {
	console.log(imageData);
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
}

//成功获取图片uri
function onPhotoURISuccess(imageURI) {
	console.log(imageURI);
	var largeImage = document.getElementById('bankPositive');
	largeImage.style.display = 'inline-block';
	largeImage.src = imageURI;
}

function onPhotoURISuccess1(imageURI) {
	console.log(imageURI);
	var largeImage = document.getElementById('bankNegative');
	largeImage.style.display = 'inline-block';
	largeImage.src = imageURI;
}
//未选择或获取图片资源失败时进行回调
function onFail(message) {
	//alert('Failed because: ' + message);
}

/*eg:
<button onclick="capturePhoto();">Capture Photo</button> <br>
<button onclick="capturePhotoEdit();">Capture Editable Photo</button> <br>
<button onclick="getPhoto(pictureSource.PHOTOLIBRARY);">From Photo Library</button><br>
<button onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);">From Photo Album</button><br>
<img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
<img style="display:none;" id="largeImage" src="" />*/

function compressBase64(base64,callback){
	utils.common.imgResize(base64, function(data){
		//压缩为宽200的图片
		//callback(data)
	}, function(data){
		//压缩为宽720的图片
		callback(data.substring(23,data.length))
	})
}

