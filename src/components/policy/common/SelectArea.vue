<template>
  <div>
    <Headerbtns title="选择所在区">
      <div slot="left" class="back" @click="cancel">
        <i class="fa fa-angle-left"></i>
      </div>
    </Headerbtns>
    <div class="main-contents">
      <div class="select-title" v-show="showProvince">{{val.provinceDesc}}</div>
      <div class="select-title" v-show="showCity">{{val.cityDesc}}</div>
      <div class="select-county" v-show="showCity">
        <mt-field label="所在区/县" placeholder="**区" v-model="val.county"></mt-field>
      </div>
      <ul v-show="!showCity" style="margin-top:10px">
        <li
          v-for="(item,index) in itemlist"
          :key="index"
          class="list-item"
          @click="selectCity(item)"
        >{{item.text}}</li>
      </ul>
      <div class="select-title select-province" v-show="!showProvince">
        <div>
          <p @click="selectProvince()">{{val.provinceDesc}}</p>
        </div>
      </div>
      <div
        class="select-province_list"
        v-if="province == null"
        v-for="(item,index) in province_list"
        :key="index"
        @click="selectCity(item)"
      >{{item.text}}</div>
      <div class="btn-wrapper" v-show="val.cityDesc != null" @click="selectClick()">确定</div>
      <Alert ref="btn"></Alert>
    </div>
  </div>
</template>

<script>
import Headerbtns from "./Header.vue";
import picker from "../../common/Picker.vue";
import Alert from "./alert.vue";
import provinceList from "../../../../static/dict/province_sunlife.json";
import cityList from "../../../../static/dict/city_sunlife.json";
import orgProvince from "../../../../static/dict/org_province_sunlife.json";
import "../css/base.css";
export default {
  name: "selectArea",
  components: {
    Headerbtns,
    picker,
    Alert
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dict: {
        provinceList: provinceList.province.item,
        cityList: cityList.city.item,
        orgProvince: orgProvince.province.item
      },
      val: {
        provinceCode: "",
        provinceDesc: "",
        cityCode: "",
        cityDesc: "",
        county: ""
      },
      showProvince: false, //省 true 显示 false 选择
      showCity: false, //市
      itemlist: [], //市列表
      province_list: null
    };
  },
  created() {
    let orgCode = utils.cache.get("personsal").orgId.slice(0, 4);
    this.val.provinceDesc = this.getOrgProvinceText(orgCode);
    this.val.provinceCode = this.getOrgProvinceCode(orgCode);
    this.val.county = "";
    console.log("初始", orgCode, this.val);
  },
  methods: {
    selectProvince() {
      if (this.val.provinceDesc != null) {
        this.showProvince = true;
      }
      for (let i in this.dict.cityList) {
        let newProvinceCode = this.val.provinceCode.substring(0, 2);
        if (this.dict.cityList[i].code.substring(0, 2) == newProvinceCode) {
          this.itemlist.push(this.dict.cityList[i]);
        }
      }
      //console.log('选择省',this.val)
    },
    selectCity(item) {
      this.val.cityCode = item.code;
      this.val.cityDesc = item.text;
      this.showCity = true;
      //console.log('选择市',this.val)
    },
    selectClick() {
      if (this.val.county == null || this.val.county == "") {
        this.$refs.btn.showMOdal("请选择所在地区的县或区");
        return;
      }
      if (this.val.county.length > 20) {
        this.$refs.btn.showMOdal(
          "输入的所在地区的县或区的内容长度不得超过20个字"
        );
        return;
      }
      this.value.areaItem = JSON.parse(JSON.stringify(this.val));
      console.log("确定value", this.value);
      this.$emit("selectadress", this.value);
      this.init();
    },
    cancel() {
      this.init();
      this.$emit("cancel", this.value);
    },
    init() {
      this.showProvince = false;
      this.showCity = false;
      this.itemlist = [];
      this.val.cityCode = "";
      this.val.cityDesc = "";
      this.val.county = "";
    },
    getOrgProvinceText(code) {
      let arr = null;
      for (let i in this.dict.orgProvince) {
        if (code == this.dict.orgProvince[i].orgCode) {
          arr = this.dict.orgProvince[i].proname;
        }
      }
      if (arr == null) {
        this.province_list = this.dict.provinceLists;
        this.showProvince = false;
      } else {
        return arr;
      }
    },
    getOrgProvinceCode(code) {
      for (let i in this.dict.orgProvince) {
        if (code == this.dict.orgProvince[i].orgCode) {
          return this.dict.orgProvince[i].proCode;
        }
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.main-contents {
  bottom: 0 !important;
}

.select-title {
  height: 55px;
  line-height: 55px;
  margin-top: 10px;
  text-align: center;
  background: #ddd;
  color: #000;
  font-size: 12px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.select-province {
  border-color: #e5e5e5;
  background: #fff;
}

select {
  border: none;
  color: #000;
}

.list-item {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
  color: #4b4b4b;
}

.mint-cell {
  height: 60px;
}

.btn-wrapper {
  position: relative;
  left: 35%;
  top: 20px;
  bottom: 0;
  width: 120px;
  height: 40px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  color: #ffffff;
  background: #ffac00;
}

.content {
  width: 100%;
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  background: #f5f5f5;
}

.select-province_list {
  text-align: center;
  line-height: 57px;
  height: 57px;
  border-top: 1px solid #e5e5e5;
}
</style>