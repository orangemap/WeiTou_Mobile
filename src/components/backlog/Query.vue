<template>
	<div>
		<Headerbtns :title="'职业查询'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div style="background-color:#E5E3E4;margin-top:19%;padding:10px 15px">
			<div  style="border:1px solid #CAC9C9;border-radius:5px;background-color:#fff;height:30px;line-height:30px;padding:0 5px;">
				<input type="text" placeholder="航空">
				<i class="fa fa-search logo" aria-hidden="true" style="line-height:30px"></i>
			</div>
		</div>
		<ul>
			<li>
				<div class="mar" @click="expand = !expand">
				    <p  @click="toggleContent">航空运输业<i class="fa fa-angle-double-up logo lh" aria-hidden="true" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i>
				    </p>
				    <div v-show="!contentShow" style="height: 3px;background: #FEB101;"></div>
				    <div v-show="contentShow" class="line-bottom" @click="expand = !expand">
						<p>航空公司内勤管理人员</p>
						<p>航空站内勤管理人员</p>
						<p>航空站内勤管理人员</p>
						<p>航空站内勤管理人员</p>
						<p>航空站内勤管理人员</p>
					</div>
				</div>
			</li>
			<li>
				<div class="mar" @click="expand1 = !expand1">
					<p @click="toggleContent1">车辆、船舶制造业<i class="fa fa-angle-double-up logo lh" aria-hidden="true" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand1?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow1" style="height: 3px;background: #FEB101;"></div>
					<div v-show="contentShow1" @click="expand1 = !expand1">
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default {
		  name: 'query',
		  components: {Headerbtns},
		    props:{
		  		open:{
		  			type:Boolean,
		  			default:false
		  		}
		    },
	  	  data(){
	  	  	return {
	  	  		contentShow:true,
	  	  		contentShow1:true,
	  	  		expand: this.open,
	  	  		expand1: this.open
	  	  	}
	  	  },
	  	  methods:{
	  	  	  	toggleContent:function(){
	  	  			this.contentShow = !this.contentShow;
	  	  		},
	  	  	  	toggleContent1:function(){
	  	  			this.contentShow1 = !this.contentShow1;
	  	  		},
	  	  }
	  }
</script>

<style lang="scss" scoped type="text/css">
	.back{
		display: block;
		height: 100%;width: 100%;
		position: relative;
		img{
			position: absolute;
			top: 50%;left: 50%;
			margin-top: -10px;
			margin-left: -20px;
				}
	}
	.fa{
		color: #FDB92C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	.logo{
		float:right;
		color:#FDAA00;
	}
	.lh{line-height:20px;}
	/*列表*/
	ul>li>div>p:nth-child(1){
		
		color:#FDAA00;
		background-color:#F8F8F8;
		border:1px solid #C8C8C8;
		padding:10px;
	}
	.line-bottom p{
		padding:10px;
		border-bottom:1px dashed #000;
	}
	.line-bottom p:last-child{
		border-bottom:0;
	}
</style>
