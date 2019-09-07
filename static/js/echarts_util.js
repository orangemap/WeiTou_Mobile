
//v1:div 
//v2:图表宽度,不确定请传0 
//v3:图表高度,不确定请传0 
//v4:系数默认1 
//v5:图表标题 
//v6:数量轴(单位,间隔) 
//v7:类目轴 
//v8:数据
function createBarGraph(docu,width,height,ratio,title,numAxis,category,data){
    let option = {
            // 标题组件 v1:标题 v2:内边距
            title:{text:title,padding: [10,0,0,10]},
            //提示框组件
            tooltip: {trigger: 'axis'},
            // 图例组件
            legend: {selectedMode:false},
            color: ['#FFCC33'],
            // 绘图网格 v1:是否显示 v2:网格颜色 v3:边框宽度
            grid: {show: true,borderColor:'#9A78BB',borderWidth: 1,left: 50,right: 50},
            // 数值轴。
            xAxis: numAxis,
            // 类目轴(category)
            yAxis: {type: 'category', data: category},
            // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [{type: 'bar',barWidth:10,data:data}]
        }
    createChart(docu,width,height,ratio,option)
}



//v1:div 
//v2:图表宽度,不确定请传0 
//v3:图表高度,不确定请传0 
//v4:系数默认1 
//v5:图表标题 
//v6:数量轴(单位,间隔)
//v7:类目轴  
//v8:数据
function createBarLineBlend(docu,width,height,ratio,title,numAxis,category,data1,data2,data3,data4){
    let option = {
            // 标题组件 v1:标题 v2:内边距
            title:{text:title,padding: [10,0,0,10]},
            //提示框组件
            tooltip: {trigger: 'axis' },
            //绘图网格
            grid: {show: true,borderColor:'#000000',borderWidth: 0,left: 50,right: 50,bottom:100,top:50},
            //title图例组件
            legend: {
            	itemGap:10,
            	itemWidth: 0,
            	orient:'horizontal',/*横向布局*/
         			data:[],// '全国人均收入','分公司人均收入','本机构人均收入'
            	textStyle: {
		            fontSize: 0,
		            color: '#F1F1F1'
        			},
        			selected:{

        			}
            },
            //类目轴 //v1:标明类目轴 v2:全部显示 v3:旋转30度 v4:类目
            xAxis: [
            	{
            		type: 'category',
            		axisLabel:{
            			interval:0,
            			rotate:0,
            			margin:10
            		},
            		data: category,axisTick:{
				       		show: false
				    		}
            	}
            ],
            yAxis: numAxis,
            series: [
                //柱状图 v1:数据名(与legend中相对应) v2:类型(柱状图) v3:柱宽 v4:数据 v5:样式 
                {name:'数据',type:'bar',barWidth:5,data:data1,
                    /*设置柱状图颜色*/
                    itemStyle: {
                        normal: {
                            color:['#FFCC33'],
                        }
                    }
                },
                //设置折线1
                {name:'全国人均收入',type:'line',symbol:'none',symbolSize: 5,data:data2,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#91888D'
                        }
                    }
                },
                //设置折线2
                {name:'分公司人均收入',type:'line',symbol:'none',symbolSize: 5,data:data3,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#0000FD'
                        }
                    }
                },
                //设置折线3
                {name:'本机构人均收入',type:'line', symbol:'none',symbolSize: 5,data:data4,
                    itemStyle : {  /*设置折线颜色*/
                        normal : {
                            color:'#C6CED9'
                        }
                    }
                }
		    ]
        };
    createChart(docu,width,height,ratio,option)
}

//创建并绘制Chart
function createChart(docu,width,height,ratio,option){
    let resizeMainContainer = ""
    let tempWidth = ""
    let tempHeight = ""
    if(width == 0){
        tempWidth = window.innerWidth/ratio;
    }else{
        tempWidth = width;
    }
    if(height == 0){
        tempHeight = window.innerHeight*0.8;
    }else{
        tempHeight = height
    }
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    resizeMainContainer = function () {
        docu.style.width = tempWidth + 'px';
        docu.style.height = tempHeight + 'px';
    };
    //设置div容器高宽
    resizeMainContainer();
    // 初始化图表
    let myChart = echarts.init(docu);
    $(window).on('resize',function(){//
            //屏幕大小自适应，重置容器高宽
            resizeMainContainer();
            myChart.resize();
    });
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}