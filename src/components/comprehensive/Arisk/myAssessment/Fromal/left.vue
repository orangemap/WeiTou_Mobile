<template>
	<div>
		<div class='Formleft-div-div'>
			<div class='Formleft-div-top'>
			<p class='text-center bold'>考核结果</p>
			<h2 class='text-center'>达成</h2>
		</div>
		<div class='flex Formleft-div-cnt'>
			<div>
				<p>考核期</p>
				<p>
					<b>18年03月</b>
					<span>至</span>
					<b>18年06月</b>
				</p>
			</div>
			<div>
				<p>职级起期</p>
				<p><b>2010-05-28</b></p>
			</div>
			<div>
				<p>上级是否保级</p>
				<p><b>是</b></p>
			</div>
		</div>
		</div>
	<!-- btm-list -->
		<ul class='ass-cnt-btm-list'>
			<li v-for='item in List1'>
				<div class='flex'>
					<p>{{item.name}}</p>
					<div style='width:20%' class='flex'>
						<p>{{item.pay}}</p>
						<img :src="item.url" @click='BtmListShow(item.id)'>
					</div>
				</div>
				<ul style='width:100%;background:#fff' v-show='item.show'>
					<li v-for='tpl in item.minList' class='flex'>
						<p>{{tpl.name}}</p>
						<p style='color:#000'>{{tpl.pay}}</p>
					</li>
				</ul>
			</li>
		</ul>
	</div>	
</template>
<script>
	export default {
		data() {
			return {
				List1:[/*维持考核btmList*/
				{id:1,name:'个险个人NPC',pay:'0.00',url:'./static/img/comprehensive/bottom.png',show:false,minList:[
				{id:1,name:'考核标准',pay:'0.00'},
				{id:2,name:'差距',pay:'0.00'}
				]},
				{id:2,name:'综开业绩',pay:'0.00',url:'./static/img/comprehensive/bottom.png',show:false,minList:[
				{id:1,name:'考核标准',pay:'0.00'},
				{id:2,name:'差距',pay:'0.00'}
				]},
				{id:3,name:'个人业绩合计',pay:'0.00',url:'./static/img/comprehensive/bottom.png',show:false,minList:[
				{id:1,name:'考核标准',pay:'0.00'},
				{id:2,name:'差距',pay:'0.00'}
				]},
				{id:4,name:'直辖组NPC',pay:'0.00',url:'./static/img/comprehensive/bottom.png',show:false,minList:[
				{id:1,name:'考核标准',pay:'0.00'},
				{id:2,name:'差距',pay:'0.00'}
				]}
				]
			}
		},
		methods:{
			BtmListShow(id){
        console.log(id)
        this.List1.forEach( item => {
          if(item.id == id){
            item.show = !item.show 
          }
          if(item.show) {
          	item.url = './static/img/comprehensive/top.png'
          }else {
          	item.url = './static/img/comprehensive/bottom.png'
          }
        })
      }
		}
	}
</script>

<style>
	.bold{
		font-weight: bold;
	}
	.Formleft-div-div{
		background:url('./../../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
		background-size:100% 100%;
		min-height:180px;
		padding-top:15px;
	}
	.Formleft-div-top{
		margin:0 auto;
		background:url('./../../../../../../static/img/comprehensive/Result.png') no-repeat;
		background-size:100% 100%;
		width:120px;
		height:120px;
	}
	.Formleft-div-top>p{
		font-size:.9rem;
		color:#FFF;
		margin:5px 0;
		padding-top:35px;
	}
	.Formleft-div-top>h2{
		font-size:1.8rem;
		color:#FFF;
	}


	.Formleft-div-cnt{
		width:95%;
		margin:10px auto;
	}
	.Formleft-div-cnt>div{
		box-sizing: border-box;
	}
	.Formleft-div-cnt>div:nth-child(1){
		width:44%;
	}
	.Formleft-div-cnt>div:nth-child(2),.Formleft-div-cnt>div:nth-child(3){
		width:28%;
	}
	.Formleft-div-cnt>div:nth-child(2){
		border-right: 2px dotted #FFF;
		border-left: 2px dotted #FFF;
	}
	.Formleft-div-cnt p{
		text-align: center;
		color:#FFF;
	}
	.Formleft-div-cnt b{
		color:#FFF;
	}
	.Formleft-div-cnt>div>p{
		margin-bottom:5px;
	}

	.ass-cnt-btm-list{
		margin-top:-10px;
	}
	.ass-cnt-btm-list>li>div{
    height:30px;
    padding:0 5%;
  }
  .ass-cnt-btm-list>li:nth-child(even)>div{
    background:#F1F1F1;
  }
  .ass-cnt-btm-list>li>ul>li{
    height:30px;
    width:50%;
    margin:0 auto;
  }
  .ass-cnt-btm-list img{
  	width:15px;
  	height:15px;
  }
</style>