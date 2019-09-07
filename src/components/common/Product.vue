<template>
  <div class="navbar">
    <ul class="navbar_top">
      <li @click="choose(1)" :class="[show_1 ? 'active':'']">寿险</li>
      <li @click="choose(2)" :class="[show_2 ? 'active':'']">健康险</li>
      <li @click="choose(3)" :class="[show_3 ? 'active':'']">意外险</li>
      <li @click="choose(4)" :class="[show_4 ? 'active':'']">年金保险</li>
    </ul>
    <ul class="navbar_content" v-show="show_1">
      <li v-if="productDef.productList_1.length == '0'">
        <p class="prod">当前类别没有险种</p>
      </li>
      <li
        v-if="productDef.productList_1.length != '0'"
        v-for="item in productDef.productList_1"
        @click="chooseProduct(item)"
      >
        <p>
          <img
            :src="covers[item.productCode]['950_300']"
            :onerror="defaultImg"
            v-if="covers[item.productCode]!=undefined "
          />
          <img :src="defaultImg" :onerror="defaultImg" v-if="covers[item.productCode]==undefined " />
        </p>
        <div>
          <p>{{item.productName}}</p>
          <span>{{item.introduction}}</span>
          <p v-if="isShow">
            <span>¥</span>
            <span>{{item.minMsg}}</span>
            <span>起</span>
          </p>
        </div>
      </li>
    </ul>
    <ul class="navbar_content" v-show="show_2">
      <li v-if="productDef.productList_2.length == '0'">
        <p class="prod">当前类别没有险种</p>
      </li>
      <li
        v-if="productDef.productList_2.length != '0'"
        v-for="item in productDef.productList_2"
        @click="chooseProduct(item)"
      >
        <p>
          <img
            :src="covers[item.productCode]['950_300']"
            :onerror="defaultImg"
            v-if="covers[item.productCode]!=undefined "
          />
          <img :src="defaultImg" :onerror="defaultImg" v-if="covers[item.productCode]==undefined " />
        </p>
        <div>
          <p>{{item.productName}}</p>
          <span>{{item.introduction}}</span>
          <p v-if="isShow">
            <span>¥</span>
            <span>{{item.minMsg}}</span>
            <span>起</span>
          </p>
        </div>
      </li>
    </ul>
    <ul class="navbar_content" v-show="show_3">
      <li v-if="productDef.productList_3.length == '0'">
        <p class="prod">当前类别没有险种</p>
      </li>
      <li
        v-if="productDef.productList_3.length != '0'"
        v-for="item in productDef.productList_3"
        @click="chooseProduct(item)"
      >
        <p>
          <img
            :src="covers[item.productCode]['950_300']"
            :onerror="defaultImg"
            v-if="covers[item.productCode]!=undefined "
          />
          <img :src="defaultImg" :onerror="defaultImg" v-if="covers[item.productCode]==undefined " />
        </p>
        <div>
          <p>{{item.productName}}</p>
          <span>{{item.introduction}}</span>
          <p v-if="isShow">
            <span>¥</span>
            <span>{{item.minMsg}}</span>
            <span>起</span>
          </p>
        </div>
      </li>
    </ul>
    <ul class="navbar_content" v-show="show_4">
      <li v-if="productDef.productList_4.length == '0'">
        <p class="prod">当前类别没有险种</p>
      </li>
      <li
        v-if="productDef.productList_4.length != '0'"
        v-for="item in productDef.productList_4"
        @click="chooseProduct(item)"
      >
        <p>
          <img
            :src="covers[item.productCode]['950_300']"
            :onerror="defaultImg"
            v-if="covers[item.productCode]!=undefined "
          />
          <img :src="defaultImg" :onerror="defaultImg" v-if="covers[item.productCode]==undefined " />
        </p>
        <div>
          <p>{{item.productName}}</p>
          <span>{{item.introduction}}</span>
          <p v-if="isShow">
            <span>¥</span>
            <span>{{item.minMsg}}</span>
            <span>起</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "product",
  data() {
    return {
      show_1: true,
      show_2: false,
      show_3: false,
      show_4: false,
      isShow: true,
      selected: "1",
      productDef: {
        productList_1: "",
        productList_2: "",
        productList_3: "",
        productList_4: ""
      },
      defaultImg:
        'this.src="data:image/jpeg;base64,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"',
      covers: utils.cache.get("CONFIG_newPtoduct_policyName_product")
        .proposalPlan.cover.covers
    };
  },
  methods: {
    choose(index) {
      this.selected = index;
      this.show_1 = false;
      this.show_2 = false;
      this.show_3 = false;
      this.show_4 = false;
      if (index == "1") {
        this.show_1 = true;
      } else if (index == "2") {
        this.show_2 = true;
      } else if (index == "3") {
        this.show_3 = true;
      } else if (index == "4") {
        this.show_4 = true;
      }
    },
    chooseProduct(item) {
      this.$emit("productCode", item.productCode);
    },
    productList() {
      let requ = {
        personsal: {
          agentCode: utils.cache.get("personsal").agentCode,
          channel: utils.cache.get("personsal").channel
        }
      };
      utils.http.postFast(
        "MOPRODUCTLIST",
        requ,
        body => {
          let personsal = body.personsal;
          //禁止河南机构销售百万安康2019主险
          for (let i = 0; i < personsal.productList2.length; i++) {
            if (personsal.productList2[i].productCode == "HMT049") {
              let orgId = utils.cache.get("personsal").orgId;
              if (orgId.substring(0, 4) == "8637") {
                personsal.productList2.splice(i, 1);
              }
            }
          }
          let productAyyay = [];
          this.productDef.productList_1 = personsal.productList1;
          this.productDef.productList_2 = personsal.productList2;
          this.productDef.productList_3 = personsal.productList3;
          this.productDef.productList_4 = personsal.productList4;
          productAyyay = productAyyay.concat(
            this.productDef.productList_1,
            this.productDef.productList_2,
            this.productDef.productList_3,
            this.productDef.productList_4
          );
          console.log(productAyyay);
          this.$emit("productList", productAyyay);
        },
        true
      );
    }
  },
  mounted() {
    let agentCode = utils.cache.get("personsal").agentCode;
    if (agentCode == "Citi1" || agentCode == "Cmbc1" || agentCode == "Ceb1") {
      this.isShow = false;
    }
    this.productList();
    var _header = $(".mint-navbar");
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      _header.css({ top: "48px" });
    } else if (isiOS) {
      _header.css({ top: "68px" });
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
	.navbar {
		.navbar_top{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #efefef;
			line-height: 48px;
			box-sizing: border-box;
			padding-left: 15px;
			li{
				font-size: 16px;
				color: #333;
				margin-right: 5%;
				border-bottom: 2px solid transparent;
			}
			li.active{
				color:#FDB92C;
				font-weight:600;
				border-bottom-color:#FDB92C;

			}
		}
		.navbar_content{
			width:100%;
			box-sizing:border-box;
			li{
				width:100%;
                height: 100px;
				padding: 0 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      border-bottom: 1px solid #efefef;
      img {
        display: block;
        width: 125px;
        height: 70px;
					border-radius: 10px;
      }
      div {
        height: 75px;
        padding: 0 0 0 3%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        p {
          font-size: 14px;
          color: #333;
        }
        p + span {
          font-size: 10px;
          color: #999;
        }
        span + p span {
          color: #fdb92c;
          font-size: 12px;
						font-weight: bold;
					}
					span+p span:nth-child(2){
						font-size: 20px;
                                                font-weight:400;
					}
					span+p span:last-child{
						color:#999;
					}
				}
				.prod{
					width: 100%;
				    height: 100%;
				    font-size: 16px;
				    color: #333;
				    line-height: 70px;
				    text-align: center;
				}
			}
			li>p{
				width:125px;
				height:70px;
			}
		}
	}
</style>