<template>
  <div class="proposal-list">
  	<mt-header :title="infoId!=undefined&&infoId!=''?'我的建议书':'建议书列表'">
      <mt-button @click="pre" slot="left">
        <i class="fa fa-angle-left"></i>
      </mt-button>
    </mt-header>
    <div class="toolbar" >
			<div @click="search">
				<img src="../../../static/img/manage/search.png" height="18" width="19">
				<span>查询</span>
			</div>
			<div @click="reset">
				<img src="../../../static/img/manage/resert.png" height="18" width="20">
				<span>重置</span>
			</div>
    </div>
    <div class="manage-main-contents">
      <div class="manage-main-content_1">
        <form>
        <ul>
          <li class="product-name">
            <span v-if="infoId==undefined||infoId==''" class="product-title">产品名称</span>
            <span v-if="infoId!=undefined&&infoId!=''" class="product-title">主险名称</span>
            <div style="display:inline-block;width: 53%;height: 30px;border-radius: 8px;padding-left:5px;border: 1px solid #E7A545;line-height:30px;overflow-x: hidden;">
              <picker v-model="form.productCode" :items="productAyyay" code="productCode"  text="productName"></picker>
            </div>
          </li>
          <li v-if="infoId==undefined||infoId==''" class="policyholder-names">
            <span class="product-title">投保人姓名</span>
            <input type="text" v-model="form.holderName"/>
          </li>
          <li v-if="infoId==undefined||infoId==''" class="policyholder-names">
            <span class="product-title">被保人姓名</span>
            <input type="text" v-model="form.insureName"/>
          </li>
          <li class="manage-data">
            <span class="product-title">制作日期</span>
            <date-picker v-model="form.startDay" style="text-align:center"/>
            <p class="manage-data-to">至</p>
            <date-picker v-model="form.endDay" style="text-align:center"/>
          </li>
          <li v-if="infoId==undefined||infoId==''" class="manage-pdf">
            <span class="product-title">是否生成PDF</span>
            <mt-switch v-model="form.switch" style="position: relative;">
              <label style="font-size: 14px;color: #FFF;font-weight:bold;position: absolute;left:5px;bottom: 4px;">{{form.isbuild == "Y"?'是':''}}</label>
              <label style="font-size: 14px;color: #FFF;font-weight:bold;position: absolute;left:35px;bottom: 4px;">
              {{form.isbuild == "N"?'否':''}}</label>
            </mt-switch>
          </li>
        </ul>
        </form>
      </div>
      <div class="manage-main-content_2">
        <table>
          <thead>
            <tr>
              <th style="width: 40%;text-align: left;padding-left:20px;font-size: 16px;">产品名称</th>
              <th style="width: 15%;font-size: 16px;">投保人</th>
              <th style="width: 15%;font-size: 16px;">被保人</th>
              <th style="width: 25%;font-size: 16px;">制作日期</th>
            </tr>
          </thead>
        </table>
        <table v-for="(item,index) in proposalList">
          <tbody>
            <tr style="width: 43%;text-align: left;padding-left:5px;">
              <td v-if="product.ismain == '1'" v-for="(product,index) in item.productList">{{product.productName}}</td>
            </tr>
            <tr style="width: 15%">
              <td>{{item.holderName}}</td>
            </tr>
            <tr style="width: 15%">
              <td>{{item.insureName}} 等{{item.insureCount}}人</td>
            </tr>
            <tr style="width: 25%"><td>{{item.makeTime}}</td></tr>
          </tbody>
          <tfoot>
            <tr @click="msgDelete(item,index)">
              <i class="fa fa-trash-o" style="color: #C3141B;font-size:25px;margin-right: 20px;"></i>
            </tr>
            <tr @click="toConfig(item)">
              <i class="fa fa fa-pencil" style="color: #FEB101;font-size:25px;margin-right: 20px;"></i>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- 删除弹出框 -->
    <mt-popup v-model="toggle.popupDelete" position="center" style="width: 80%;height: 200px;background: #FFF;border-radius:20px;">
      <div class="delete-header">温馨提示</div>
      <div class="policy-choose">
        <span style="color:#999">确定删除建议书吗？</span>
      </div>
      <div class="button-delete">
        <div @click="toggle.popupDelete = !toggle.popupDelete">
          <mt-button id="button-cancel">取消</mt-button>
        </div>
        <div @click="msgDeleteSure">
          <mt-button id="button-sure">确认</mt-button>
        </div>
      </div>
    </mt-popup>
    <alert ref="showalert"></alert> 
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import alert from '../policy/common/alert.vue'
import Headerbtns from '../common/Header.vue'
import Product from '../common/Product.vue'
import datePicker from '../common/DatePicker.vue'
import picker from '../common/Picker.vue'
//import productItem from '../../assets/data/policy_name.json'
const fillZero = value => {
  if((''+ value).length == 1){
    value = '0' + value
  }
  return value
}
export default {
  name: 'proposalList',
  components:{Product,datePicker,picker,Headerbtns,alert},
  data() {
    let date = new Date()
    let month = date.getMonth()+1
    return {
      form:{
      	productCode:'',
        startDay:date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
        endDay:date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
        switch: false,
        isbuild:'N',
        zyzh: utils.cache.get('personsal').agentCode,
        netWorkCode: '1200000487'
      },
      proposalList:[],
      productArray:[],
      selected:'',
      deleteItem:'',
      itemIndex:'',
      toggle:{
        popupAccordion:false,
        popupDelete:false
      },
      productDef:{
        productList_1:[],
        productList_2:[],
        productList_3:[],
        productList_4:[],
      },
      productAyyay:[],
      where:'',
			infoId:'',
    }
  },
  created(){
     this.productList()
  },
  methods:{
    pre(){
    	if(this.where==1){
    		this.go('/customer/detail?infoId='+this.infoId)
    	}else{
    		this.$router.push({
    				name:"personalInfo"
    		})
    	}
    },
		productList(){
			let requ = {
				"personsal": {
    			"agentCode": utils.cache.get('personsal').agentCode,
    			"channel": utils.cache.get('personsal').channel
  			}
      }
	  	utils.http.post('MOPRODUCTLIST',requ).then(response => {
  			console.log("产品列表返回",response)
				let productAyyay = []
				this.productDef.productList_1 = response.data.response.personsal.productList1
				this.productDef.productList_2 = response.data.response.personsal.productList2
	      this.productDef.productList_3 = response.data.response.personsal.productList3
				this.productDef.productList_4 = response.data.response.personsal.productList4
	  		this.productAyyay = this.productAyyay.concat(this.productDef.productList_1,this.productDef.productList_2,this.productDef.productList_3,this.productDef.productList_4)
    	})
		},
    filterProductList(productList){
      if(productList && productList.length > 0){
        this.productOpt = [{proCode:'',proText:'请选择险种'}]
        for(let i in productList){
          this.productOpt.push({
            proCode:productList[i].productCode,
            proText:productList[i].alias
          })
        }
      }
    },
    listenProductCode(som){
      let _productCode = som
      this.selected = _productCode
      console.log(this.selected)
      this.toggle.popupAccordion = false
      this.goAddManage()
    },
    goAddManage(){
      if(this.selected == null || this.selected == ''){
        utils.ui.modal.afterOpen()
        this.$refs.showalert.showMOdal('您当前没有险种，请选择！')
      }else{
        utils.cache.removeItem('planId')
        utils.cache.removeItem('proposalConfig')
        utils.cache.removeItem('holderSexFlag')
        utils.cache.removeItem('insurantSexFlag')
        utils.cache.removeItem('zhuxianPremium')
        utils.cache.removeItem('zhuxianMoney')
        utils.cache.removeItem('totalPremium')
        utils.cache.removeItem('job')
        // utils.cache.removeItem('agentInfo')
        utils.cache.set('productCodeDetail',this.selected)
        utils.cache.set('productCode',this.selected)
        let orgId = utils.cache.get('personsal').orgId
        console.log( orgId)
						if (orgId.substring(0, 4) == "8661") { //宁波机构
							this.$router.push({
								name: 'questionnaire_page',
								params: {
									planId: "new"
								}
							})
						} else { //非指定机构进入客户详情页面
							this.$router.push({
								name: 'product_details_page',
								params: {
									planId: "new"
								}
							})
					 }
      }
    },
    setDate:function(type){
      this.$calendar.show({
        year:[1925,2080],
        date:this.form[type],
        onOk:(date)=>{
          const array = date.split('-')
          date = array[0]+'-'+fillZero(array[1])+'-'+fillZero(array[2])
          this.form[type] = date
          let bj_date1 = this.form[type]
          console.log(new Date(bj_date1).getTime())
          this.bj_date1 = new Date(bj_date1).getTime()
        },
        onCancel:()=>{
          console.log('关闭')
        }
      })
    },
    reset(){
      const fillZero = value => {
        if((''+ value).length == 1){
          value = '0' + value
        }
        return value
      }
      this.toggle.popupAccordion = false
      let date = new Date()
      let month = date.getMonth()+1
      this.form = {
        productSelected:'',
        productCode:'',
        netWorkCode:'1200000487',
        switch: false,
        isbuild:'N',
        zyzh:utils.cache.get('personsal').agentCode,
        startDay:date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
        endDay:date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
      }
    },
    search(){
      this.toggle.popupAccordion = false
      this.dateSub = new Date(this.form.startDay).getTime() - new Date(this.form.endDay).getTime()
      console.log(this.dateSub)
      if(this.dateSub > 0){
        utils.ui.modal.afterOpen()
        this.$refs.showalert.showMOdal('开始时间不能大于结束时间，请重新选择！')
      }else if(this.dateSub <= 0){
        let requ = {
          "proposal": JSON.parse(JSON.stringify(this.form))
        }
        requ.proposal.startDay = requ.proposal.startDay + 'T00:00:00.000Z'
        requ.proposal.endDay = requ.proposal.endDay + 'T00:00:00.000Z'
        requ.proposal.infoId = this.infoId
        console.log(JSON.stringify(requ))
        utils.http.post('PROPOSALLIST',requ).then(response => {
          this.proposalList = response.data.response.proposal
          console.log(this.proposalList)
          if(this.proposalList.length <= 0){
            utils.ui.modal.afterOpen()
            this.$refs.showalert.showMOdal('暂无数据')
          }
        })
      }
    },
    msgDelete:function(item,index){
      this.deleteItem = item
      this.itemIndex = index
      this.toggle.popupDelete = true
    },
    msgDeleteSure:function(){
        this.toggle.popupDelete = false
        let requ = {
        "proposal": {
              "zyzh": utils.cache.get('personsal').agentCode,
              "netWorkCode": "",
              "pdfid": this.deleteItem.pdfid
          }
        }
      utils.http.post('PROPOSALDELETE',requ).then(response => {
          let project = response.data.response
          let projectHead = response.data.header
          this.proposalList.splice(this.itemIndex,1)
          let newArr = this.proposalList
          if(projectHead.responseCode == 1){
            utils.ui.modal.afterOpen()
            this.$refs.showalert.showMOdal(projectHead.errorMessage)
          }else if(projectHead.responseCode != 1){
            utils.ui.modal.afterOpen()
            this.$refs.showalert.showMOdal("建议书删除成功！")
          }
        })
      },
    toConfig(item){
    	this.initProposal(item.pdfid)
    },
    initProposal(planId){
        let requ = {
          "proposalPlan": {
            "planId": planId,
            "agentCode": utils.cache.get('personsal').agentCode
          }
        }
        utils.http.post('PROPOSALEDIT',requ).then(response=>{
          console.log('获取建议书',response.data.response.proposalPlan)
          if(response.data.header.responseCode == '0'){
          	/*
          	if(response.data.response.proposalPlan != undefined){
          		if(response.data.response.proposalPlan.insurantProductList != undefined && 
          				response.data.response.proposalPlan.insurantProductList.length>0){
          			if(response.data.response.proposalPlan.insurantProductList[0].productList!=undefined&&
          					response.data.response.proposalPlan.insurantProductList[0].productList.length>0){
          				let product = response.data.response.proposalPlan.insurantProductList[0].productList[0]
          				if(product!=undefined && product.premiumDes!=undefined && product.premiumDes != ""){
          					product.premium = product.premiumDes
          				}else if(product!=undefined && product.premium!=undefined && product.premium != ""){
          					product.premiumDes = product.premium
          				}
          			}
          		}
          	}*/
	      		utils.cache.set('proposalPlan',response.data.response.proposalPlan)
	      		utils.cache.set('orderCode',planId)
	          this.$router.push({
							name: 'prodetails',
							params: {
								planId: planId,
								step:'1'
							}
						})
          }else{
          	this.$refs.showalert.showMOdal(response.data.header.errorMessage)
          }
        })
      }
  },
  watch:{
    'form.switch':function(value){
      this.form.isbuild = value?'Y':'N'
    },
    'toggle.popupDelete':function(value){
      console.log(value)
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    },
    'toggle.popupAccordion':function(value){
      if(value == true){
        utils.ui.modal.afterOpen()
      }else{
        utils.ui.modal.beforeClose()
      }
    }
  },
  mounted(){
  	// add spoon 添加配置文件缓存获取
    this.products = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.policyName.relation.item
    let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
				if(queryParams.where) {
					this.where = queryParams.where;
				}
			}
			//infoId存在标明页面由客户管理详情页跳转来,及优先查询一次列表
			if(this.infoId!=undefined&&this.infoId!=''){
				this.search()
			}
  }
}
</script>
<style type="text/css" scoped>
.navbar{
  background:#FFF!important;
}
.delete-header{
  width: 100%;height: 48px;
  background: #0D3074;
  border-bottom: 3px solid #FEB101;
  color: #FFF;
  border-radius: 20px 20px 0 0;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  font-weight: bold;
}
.toolbar{
	width:100%;
	height:50px;
	line-height:50px;
	display:flex;
	justify-content: flex-end;
	background:#F5F5F5;
}
.toolbar > div{
	width:80px;
}
.toolbar > div > img{
	position:relative;
	top:2px;
}
.toolbar > div > span{
	font-weight:bold;
	font-size:16px;
	color:#2E4360;
}

</style>
<style lang="scss" type="text/css" scoped>

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
        top: 50%;
        left: 50%;
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
      border-radius:5px;
    }
  .manage-main-contents{
    width: 100%;
    height: 100%;
    // left: 0;top: 48px;
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
          width: 100%;
          height: 32px;
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
          div{
            input{
              width: 100%;height: 30px;
              border-radius:8px;
              border:none;
            }
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
          width: 100%;
          height: 32px;
          margin-top: 12px;
          display: flex;
          .manage-data-begin{
            height: 30px;
            flex: 0 0 103px;
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
            line-height: 30px;
            padding: 0 3px;
            font-size: 14px;
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
    .policy-choose{
      width: 100%;height: 80px;
      border-bottom:1px dashed #BBB;
      position: absolute;
      top: 61px;
      text-align: center;
      line-height: 80px;
      select{
        width: 70%;height: 40px;
        border-radius: 15px;
        padding-left: 10px;
        font-size:16px;
      }
    }
    .button-delete{
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
  .manage-pdf .manage-yes.active{color: #E51C23}
</style>
<style type="text/css" lang="scss">
.proposal-list .mint-cell-title{
  text-align:right;

}
.proposal-list .mint-cell-text{
  font-weight: bold;
  font-size: 16px;
  color: #2E4360;
}
.scroller-component{
  overflow-y:auto!important;
}
#v-header{
		position: fixed;top: 0;left: 0;
		z-index: 3000;
		width: 100%;
    line-height: 48px;
		background-color: #FFF;
		font-size: 16px;
		font-weight: bold;
		border-bottom: 1px solid #FEB101;
		ul{
			height: 48px;
      line-height: 65px;
			overflow: hidden;
			display: flex;
			.header-btn{
				width: 40px;
        height: 100%;
			
				overflow: hidden;
			}
			.header-title{
				flex:1;
				line-height: 48px;
				font-weight:bold;
				font-size: 18px;
				color: #FDB92C !important;
				text-align: center;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
  .border-bottom-left {
		height: 3px;
		width: 35%;
		background: #003756;
		position: fixed;
		left: 0;
	}
	
	.border-bottom-right {
		height: 3px;
		width: 65%;
		background: #FFAC00;
		position: fixed;
		right: 0;
	}
</style>
