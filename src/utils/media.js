let media = {
  header:function(Container){
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let headerHeight = $('.v-header').outerHeight(true)
    console.log(headerHeight)
    Container.css('margin-top',headerHeight+'px')
  },
  container:function(bodyHeight,btm) {/*计算container高度，防止内容溢出*/
    let headerHeight = $('.v-header').outerHeight(true)
    if(btm!= 0){
      return bodyHeight - headerHeight - btm.outerHeight(true)
    }else {
      return bodyHeight - headerHeight
    }
  },
  repeat:function uniqueArray(array, key){
  var result = [array[0]];
  for(var i = 1; i < array.length; i++){
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}
}
export default media;
