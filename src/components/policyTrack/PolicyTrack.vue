<!-- 保单追踪 -->
<template>
	<div class='sel-user'>
		<Headerbtns title="状态追踪" class='sel-user-head'>
			<div slot="left" class="back" @click="go('/policySearch')">
 				<i class="fa fa-angle-left" style='font-size:1.8rem;'></i>
			</div>
		</Headerbtns>
		<div class='details'>
			<div class='text-content' v-show="testList.length>0">
				<div class='time-line'>
					<div v-for='item in testList' class='time-line-div'>
						<p>{{item.text.substring(0,10)}}<br>{{item.text.substring(10)}}</p>
						<p ref='circular'></p>
						<p>{{item.time}}</p>
					</div>
					<div class='img-dotted' ref='dotted'></div>
				</div>
				<div style='margin-top:20px;'>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	export default {
		components:{Headerbtns},
		data() {
			return {
			    testList:[
					{"text":"","time":""}
				]
	  		}
		},
		filters: {},
		methods: {
			
	    },
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
	      	this.media.header($('.details'))
	      	this.$refs.dotted.style.left = this.$refs.circular[0].offsetLeft - 12 + 'px'
	      	let requestParam = {
                "order": {
                    "agentCode": utils.cache.get("personsal").agentCode,
                    "applyCodeList": [
                        { "applyCode": this.$route.params.policyCode}
                    ]
                }
            }
			utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
				let projectHead = response.data.header
				if(projectHead.responseCode != 0){
					alert_n22.confirm('提示', '保单进度查询异常!', '确定','', (flag) => {
						this.go("/policySearch")
					})
				}else{
					let result = response.data.response.order
					this.testList = []
					if(result[0].order.length == 1 && result[0].order[0].stateName == ""){
						alert_n22.confirm('提示', '当前保单尚未产生状态!', '确定','', (flag) => {
							this.go("/policySearch")
						})
					}
					for(let i = 0 ;i<result[0].order.length;i++){
						let obj = {
							"text":result[0].order[i].stateDoneDate,
							"time":result[0].order[i].stateName
						}
						this.testList.push(obj)
					}
				}
			})
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style scoped lang="scss" type="text/css">
  /*隐藏滚动条*/
  .details::-webkit-scrollbar{
    display: none;
  }
  .return {
    width: 90%;
    margin-left: 5%;
    overflow: hidden;
  }
  .left {
    width: 50%;
    line-height: 2rem;
    float: left;
    box-sizing: border-box;
    padding-left: 3%;
    border-bottom: 2px dotted #ccc;
    text-align: start;
  }
  .right {
    width: 50%;
    line-height: 2rem;
    float: left;
    box-sizing: border-box;
    padding-right: 3%;
    border-bottom: 2px dotted #ccc;
    text-align: end;
  }
.text-center{
	text-align: center;
}
.time h2{
	color:#FF6600;
	margin: 20px auto 30px auto;
}
.time-line{
	position: relative;
	width:300px;
	margin:0 auto;
	top: 10px;
}
.time-line-div{
	position:relative;
	min-height:85px;
}
.time-line-div>p:nth-child(1){
    position: absolute;
    width: 100px;
    top: 10px;
    border-radius: 10px;
}
.time-line-div>p:nth-child(2){
	position:absolute;
	left: 100px;
	width:15px;
	height:15px;
	top:10px;
	background:#FFAC00;
	border-radius: 50%;
	z-index: 10
}
.time-line-div>p:nth-child(3){
	position:absolute;
	left: 130px;
	padding: 10px;
	background: #F5F4F3;
	color:#2F3030;
	border-radius: 10px;
}
.img-dotted{
	position:absolute;
	width:20px;
	height:100%;
	top:0;
	z-index: 1;
	background:url('../../../static/img/common/dotted.png');
}
.fa{
		color: #FDB92C;
	} 
</style>
