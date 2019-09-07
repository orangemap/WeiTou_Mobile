function locAMap(isRegeo,complete,error){
    let map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', { resizeEnable: true});
    map.plugin('AMap.Geolocation', ()=>{
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        //返回定位信息
        AMap.event.addListener(geolocation, 'complete', (data)=>{
            console.log('定位成功===>'+' 经度：' + data.position.getLng()+' 纬度：' + data.position.getLat()+' 精度：' + data.accuracy + ' 米'+'是否经过偏移：' + (data.isConverted ? '是' : '否'))
            //是否进行逆地理编码
            if(isRegeo){
                regeocoder([data.position.getLng(), data.position.getLat()],(result)=>{
                    console.log('逆地理编码结果===>' , result)
                    complete(data.position.getLng(),data.position.getLat(),result)
                })
            }else{
                complete(data.position.getLng(),data.position.getLat(),null)
            }
        });
        //返回定位出错信息
        AMap.event.addListener(geolocation, 'error',  (data)=>{
            error(data)
            console.log('定位失败===>'+data)
        });
    });
}

//逆地理编码
function regeocoder(lnglatXY,complete) {  
    let resultInfo = {}
    let geocoder = new AMap.Geocoder({radius: 1000,extensions: "all"});
    geocoder.getAddress(lnglatXY, (status, result)=>{
        if (status === 'complete' && result.info === 'OK') {
            let addressComponent = result.regeocode.addressComponent; //地址信息
            let aois = result.regeocode.aois; //返回地址描述
            let crosses = result.regeocode.crosses; //定位点附近的道路交叉口信息
            let pois = result.regeocode.pois; //定位点附近的POI信息
            let roads = result.regeocode.roads; //定位点附近的道路信息
            let address = result.regeocode.formattedAddress; //返回地址描述
            resultInfo.address = result.regeocode.formattedAddress; //返回地址描述
            resultInfo.province = addressComponent.province;//所在省
            resultInfo.city = addressComponent.city;//所在城市
            resultInfo.citycode = addressComponent.citycode;//所在城市编码
            resultInfo.district = addressComponent.district;//所在区
            resultInfo.adcode = addressComponent.adcode;//所在区域编码
            resultInfo.township = addressComponent.township;//所在乡镇
            resultInfo.street = addressComponent.street;//所在街道
            resultInfo.streetNumber = addressComponent.streetNumber;//门牌号
            resultInfo.neighborhood = addressComponent.neighborhood;//所在社区
            resultInfo.neighborhoodType = addressComponent.neighborhoodType;//社区类型
            resultInfo.building = addressComponent.building;//所在楼/大厦
            complete(resultInfo)
        }
    });       
}