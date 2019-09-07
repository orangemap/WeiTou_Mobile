<template>
	<div>
		<Headerbtns :title="page_title" style="position:fixed;top:0;">
			<div ref='header' slot="left" class="back" @click="Goback">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class='main-contents' ref='container'>
			<div class='my-index-links flex'>
				<router-link to='/personal/personalMessage/personalMessageKH'>服务资讯</router-link>
				<router-link to='/personal/personalMessage/personalMessageGR'>渠道资讯</router-link>
				<router-link to='/personal/personalMessage/personalMessageSys'>系统资讯</router-link>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script type='babel'>
	import Headerbtns from '../policy/common/Header'
	import '../policy/css/base.css'
	export default{
		components: {Headerbtns},
		data() {
			return{
				page_title:'消息中心',
			}
		},
		mounted(){
			this.$refs.container.style.marginTop = '48px'
		},
		methods:{
			Goback(){
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped type="text/css">
	.main-contents{
		bottom:30px !important;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text-center {
		text-align: center;
	}

	.font_35 {
		padding: 6px 8px;
		font-size: 30px;
		color:#FDB92C;
	}

	.fontIcon {
		width: 10%;
	}
	
	.my-index-picker {
		width: 65%!important;
	}

	.mbsc-control-ev {
		width: 40px !important;
		text-align: center;
	}

	.my-index-links {
		width: 65%;
		height: 40px;
		margin: 10px auto;
	}

	.my-index-links>a {
		width: 40%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		background: #C7C6CB;
		display: inline-block;
		margin: 0 8px;
		border-radius: 15px;
		outline: none;
	}

	.my-index-links>a.router-link-active {
		background: #FEB101;
	}
</style>
