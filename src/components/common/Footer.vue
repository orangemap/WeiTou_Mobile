<template>
	<div>
		<div class="footer-line-left"></div>
		<ul class="footer-lists">
			<!-- <li>
				<p><img src="../../assets/img/home/footer1.jpg" height="31" width="31"></p>
				<p>首页</p>
			</li>
			<li>
				<p><img src="../../assets/img/home/footer2.jpg" height="31" width="31"></p>
				<p>建设中</p>
			</li>
			<li>
				<p><img src="../../assets/img/home/footer3.jpg" height="41" width="41"></p>
				<p>网点查询</p>
			</li>
			<li>
				<p><img src="../../assets/img/home/footer2.jpg" height="31" width="31"></p>
				<p>建设中</p>
			</li>
			<li>
				<p><img src="../../assets/img/home/footer5.jpg" height="31" width="31"></p>
				<p>个人中心</p>
			</li> -->
		</ul>
		<div class="footer-line-right"></div>
	</div>
</template>

<script>
	export default{
		name:'Footertabs',
		data(){
			return {
				msg:'首页'
			}
		},
		methods:{
			
		}
	}
</script>

<style type="text/css" scoped lang="scss">
	.footer-lists{
		width:100%;height: 66px;
		line-height: 15px;
		position: fixed;bottom: 0;left: 0;
		overflow: hidden;
		background: #FFF;
		li{
			float: left;
			width:20%;
			text-align: center;
			p{
				color: #FF9800;font-weight: bold;}
		}
		li:nth-child(1){padding-top: 10px}
		li:nth-child(2){padding-top: 10px}
		li:nth-child(3){line-height: 15px}
		li:nth-child(4){padding-top: 10px}
		li:nth-child(5){padding-top: 10px}
	}
	.footer-line-left{
		height: 2px;width:44%;
		background: #E4DAE8;
		position: fixed;bottom: 60px;left: 0;z-index: 2;
	}
	.footer-line-right{
		height: 2px;width:44%;
		background: #E4DAE8;
		position: fixed;bottom: 60px;right: 0;z-index: 2;
	}
</style>