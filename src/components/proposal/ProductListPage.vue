<!--产品列表页面-->
<template>
  <v-touch
    class="touch-wrapper"
    @swipeleft="right"
    @swiperight="left"
    v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }"
  >
    <div>
      <Headerbtns title="产品">
        <div slot="left" @click="left()">
          <i class="fa fa-angle-left"></i>
        </div>
      </Headerbtns>
      <div class="main-contents">
        <Product v-on:productCode="listenProductCode"></Product>
      </div>
    </div>
  </v-touch>
</template>
<script>
import Headerbtns from "../../components/policy/common/Header.vue";
import Product from "../../components/common/Product.vue";
import "../../components/policy/css/base.css";
export default {
  name: "prolist",
  components: {
    Headerbtns,
    Product
  },
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    toProductDetailsPage: function() {
      //this.go('../product/')
    },
    left() {
        this.go('/home')
    },
    right() {
      console.log("右滑了");
    },
    listenProductCode(som) {
      let orgId = utils.cache.get("personsal").orgId;
      let _productCode = som;
      this.selected = _productCode;
      utils.cache.set("productCode", this.selected);
      //utils.cache.set('productCodeDetail', this.selected)
      let agentCode = utils.cache.get("personsal").agentCode;
      if(this.selected == 'NET004'){
					let channel = utils.cache.get('channel')
					if(channel == '01' || channel == '03' || channel == '04'){
						let orgId = utils.cache.get('personsal').orgId.substring(0,4)
						if(orgId == '8612'){
							this.$router.push({
				        name: "prodetails",
				        params: {
				          planId: "new",
				          step: "1"
				        }
				      }); 
						}else{
							alert_n22.alert("提示", '此产品在本机构暂未开放', "确定")
						}
					}else{
						this.$router.push({
			        name: "prodetails",
			        params: {
			          planId: "new",
			          step: "1"
			        }
			      });
					}
				}else{
					this.$router.push({
		        name: "prodetails",
		        params: {
		          planId: "new",
		          step: "1"
		        }
		      });
				}
    }
  }
};
</script>
<style lang='scss' scoped type="text/css">
 .main-contents {
		bottom: 0 !important;
		-webkit-overflow-scrolling: auto !important;
	}
</style>