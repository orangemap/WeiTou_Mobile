
//文本内容  
var tasksStr = 'hello';  
  
/* 
* 从数据库查询数据,写入到指定目录下文件中 
* */  
function exportDataFromDb() {  
    selectDataFromConcernsDeviceInfos('admin', function (result) {  
        if (result.length != 0) {  
            for (var i = 0; i < result.length; i++) {  
                tasksStr = tasksStr + JSON.stringify(result[i]);  
            }  
            console.log(tasksStr);  
            createAndWriteFile();  
        } else {  
            console.log('no data');  
        }  
    });  
}  
  
/* 
 * 打开或创建文件夹,创建文件并写入内容 
 * Android:sdcard/xbrother/assets目录 
 * IOS:cdvfile://localhost/persistent/xbrother/assets目录 
 * 文件目录存在则打开,不存在则创建 
 * */  
function createAndWriteFile() {  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {  
        console.log('打开的文件系统: ' + fs.name);  
        fs.root.getDirectory('xbrother', {create: true}, function (dirEntry) {  
            dirEntry.getDirectory('assets', {create: true}, function (subDirEntry) {  
                subDirEntry.getFile("task.json", {create: true, exclusive: false}, function (fileEntry) {  
                    fileEntry.name == 'task.json';  
                    fileEntry.fullPath == 'xbrother/assets/task.json';  
                    //文件内容  
                    var dataObj = new Blob([tasksStr], {type: 'text/plain'});  
                    //写入文件  
                    writeFile(fileEntry, dataObj);  
                }, onErrorCreateFile);  
            }, onErrorGetDir);  
        }, onErrorGetDir);  
    }, onErrorLoadFs);  
}  
  
/* 
* 依次打开指定目录文件夹,读取文件内容 
 * Android:sdcard/xbrother/assets/task.json 
 * IOS:cdvfile://localhost/persistent/xbrother/assets/task.json 
* 目录和文件存在则打开,不存在则退出 
* */  
function getAndReadFile() {  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {  
        console.log('打开的文件系统: ' + fs.name);  
        fs.root.getDirectory('xbrother', {create: false}, function (dirEntry) {  
            dirEntry.getDirectory('assets', {create: false}, function (subDirEntry) {  
                subDirEntry.getFile("task.json", {create: false, exclusive: false}, function (fileEntry) {  
                    alert("是否是个文件？" + fileEntry.isFile.toString())
                    console.log("是否是个文件？" + fileEntry.isFile.toString());
                    fileEntry.name == 'task.json';  
                    fileEntry.fullPath == 'xbrother/assets/task.json';  
                    readFile(fileEntry);  
                }, onErrorCreateFile);  
            }, onErrorGetDir);  
        }, onErrorGetDir);  
    }, onErrorLoadFs);  
}  
  
//将内容数据写入到文件中  
function writeFile(fileEntry, dataObj) {  
    //创建一个写入对象  
    fileEntry.createWriter(function (fileWriter) {  
  
        //文件写入成功  
        fileWriter.onwriteend = function () {  
        	alert("Successful file write...")
            console.log("Successful file write...");  
        };  
  
        //文件写入失败  
        fileWriter.onerror = function (e) {  
        	alert("Failed file write: " + e.toString())
            console.log("Failed file write: " + e.toString());  
        };  
  
        //写入文件  
        fileWriter.write(dataObj);  
    });  
}  
  
//读取文件  
function readFile(fileEntry) {  
    fileEntry.file(function (file) {  
        var reader = new FileReader();  
        reader.onloadend = function () {  
//          $$('#file_content_info').html(this.result);  
            alert("file read success:" + this.result)
            console.log("file read success:" + this.result);  
        };  
        reader.readAsText(file);  
    }, onErrorReadFile);  
}  
  
//FileSystem加载失败回调  
function onErrorLoadFs(error) {  
	alert("文件系统加载失败！")
    console.log("文件系统加载失败！")  
}  
  
//文件夹创建失败回调  
function onErrorGetDir(error) {  
	alert("文件夹创建失败！")
    console.log("文件夹创建失败！")  
}  
  
//文件创建失败回调  
function onErrorCreateFile(error) {  
	alert("文件创建失败！") 
    console.log("文件创建失败！")  
}  
  
//读取文件失败响应  
function onErrorReadFile() {  
	alert("文件读取失败!")
    console.log("文件读取失败!");  
}  