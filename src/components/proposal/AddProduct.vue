<!--产品列表页面-->
<template>
	<div>
		<Headerbtns :title = "page_title">
			<router-link to="/proposal/list" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div class="manage-main-contents">
			<Product v-on:productCode = "listenProductCode"></Product>
		</div>
	</div>
</template>
<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Product from '../common/Product.vue'
	export default{
		name: 'addProduct',
  		components: {Headerbtns,Product},
		data () {
	    return {
	    	page_title:'新增产品',
	    	selected:''
	    }
	  },
	  methods:{
	  	toProductDetailsPage:function(){
	  		this.go('../product/')
	  	},
	  	listenProductCode(som){
	  		let orgId = utils.cache.get('personsal').orgId
	        let _productCode = som
			this.selected = _productCode
			utils.cache.set('productCodeDetail',this.selected)
			 utils.cache.set('productCode',this.selected)
	        // utils.cache.set("productCodeDetail",this.selected)
			if (orgId.substring(0,4) == "8661") { //重庆机构
				this.$router.push({
					name: "questionnaire_page",
					params:{
		  				planId:"new"
		  			}
				})
			}else{
				this.$router.push({
					name: "product_details_page",
					params: {
						planId: "new"
					}
				})
			}
	    }
	  }
	}
</script>

<style lang="scss" scoped type="text/css">
	select{
		background:url("../../../static/img/common/jiantou.png") no-repeat scroll right center;
		background-size: 15px 20px;
	}
	.mint-msgbox{
		background: red !important;
	}
	.product-title{
		display: inline-block;
		float:left;
		width: 102px;
		line-height: 32px;
		text-align: right;
		margin-right: 10px;
	}
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
	#manage-content .mint-header{
		font-size: 18px;
		color: #E51C23;
		background: #12294A;
		font-weight: bold;
	}
	input{
			display: inline-block;
			float: left;
			border:1px solid #BBBBBB;
			border-radius:5px;
		}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		background: #F5F5F5;
		.manage-main-content_1{
			width: 100%;
			margin: auto;
			float: left;
			border-bottom: 1px solid #A3A2A2;
			margin-bottom: 10px;
			background: #FFF;
			ul{
				width: 100%;height: 100%;
				li{
					float: left;
					width: 100%;height: 32px;
					font-weight:bold;
					span{
						font-weight:bold;
						font-size: 16px;
						color: #2E4360;
					}
				}
				.product-name{
					margin-top: 12px;
					select{
						width: 55%;height: 32px;
						border-radius:8px;
						padding-left:5px;
					}
				}
				.policyholder-names{
					width: 100%;height: 32px;
					margin-top: 12px;
					input{
						width: 53%;height: 30px;
						border-radius:8px;
						padding-left:5px;
						border:1px solid #E7A545;
					}
				}
				.manage-data{
					width: 100%;height: 32px;
					margin-top: 12px;
					.manage-data-begin{
						height: 30px;width: 27%;
						float: left;
						border:1px solid #E7A545;
						border-radius: 8px;
						line-height: 30px;
						position: relative;
						.begin{
							font-size:14px;
						}
						.fa-calendar{
							position: absolute;
							top: 5px;
							right:3px;
							color: #FEC134;
						}
					}
					.manage-data-to{
						float: left;line-height: 30px;
						padding: 0 3px;
					}
					.manage-data-end{
						float: left;
						height: 30px;width: 27%;
						border:1px solid #E7A545;
						border-radius: 8px;
						line-height: 30px;
						// padding-right: 12px;
						position: relative;
						.end{
							font-size:14px;
						}
						.fa-calendar{
							position: absolute;
							top: 5px;
							right:3px;
							color: #FEC134;
						}
					}
				}
				.manage-pdf{
					width: 100%;height: 32px;
					line-height: 22px;
					margin-top: 12px;
					margin-bottom:12px;
					overflow: hidden;
					.manage-yes,.manage-no{
						display: inline-block;
						width: 21px;height: 20px;
						line-height: 20px;
						border:1px solid #12294A;
						border-radius:50%;
						font-size: 14px;
						margin-right:20px;
						text-align: center;
						margin-top: 5px;
					}
				}
				.manage-caozuo{
					float: right;
					width: 100%;height: auto;
					text-align: right;
					background: #F5F5F5;
					margin-top:0;
					p{
						float: right;
						height: 25px;
						padding:12px;
						display: inline-block;
						span{
							margin-right: 10px;
						}
						img{
							display: inline;
						}
					}
				}
			}
		}
		.manage-main-content_2{
			width: 100%;
			float: left;
			table{
				display: inline-block;
				width: 100%;
				thead{
					width: 100%;height: 47px;
					background: #FEB101;
					display: inline-block;
					line-height: 47px;
					color: #FFF;
					font-size: 14px;
					tr{
						width:100%;height: 100%;
						display: inline-table;
					}
				}
				tbody{
					width: 100%;height: 55px;
					background: #FFF;
					display: flex;
					overflow: hidden;
					position: relative;
					tr{
						margin-top: 10px;
						color: #12294A;
					}
				}
				tfoot{
					display: block;
					width: 100%;height: 40px;
					line-height: 45px;
					border-bottom: 1px solid #A3A2A2;
					background: #F5F5F5;
					tr{
						float: right;
					}
				}
			}
		}
	}
	#manage-content{
		.policy-choose{
			width: 100%;height: 100px;
			border-bottom:1px solid #CCC;
			position: absolute;
			top: 41px;
			text-align: center;
			line-height: 90px;
			select{
				width: 70%;height: 40px;
				border-radius: 15px;
				padding-left: 10px;
				font-size:16px;
			}
		}
		.button{
			width: 85%;
			position: absolute;
			bottom: 8px;
			padding: 0 20px;
			text-align: center;
			div{
				float: left;
				width: 50%;
			}
			.mint-button{
				padding: 0 20px;
			}
			#button-sure,#button-cancel{
				background-color: #FEB101;
				color: #FFF;
			}
		}
	}
	.manage-pdf .manage-yes.active{color: #E51C23}
</style>
