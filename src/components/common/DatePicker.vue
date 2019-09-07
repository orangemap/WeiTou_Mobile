<template>
  <p ref="picker" class="manage-data-begin">
    <label class="begin" v-if="value==''" style="color:#ccc;">{{defaultInput}}</label>
     <label class="begin" v-if="value=='请输入日期'" :style="{color:defaultColor}">{{value}}</label>
    <label class="begin" v-else style="color:#333;">{{value}}</label>
    <i class="datepick_i"></i>
  </p>
</template>

<script>
import "../../../static/lib/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css";
import "../../../static/lib/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js";
export default {
  name: "datePicker",
  props: {
    value: {
      type: String,
      default: ""
    },
    defaultColor: {
      type: String,
      default: "#ccc"
    },
    defaultTimeYear: {
      type: String,
      default: null
    },
     defaultInput: {
      type: String,
      default: '请选择'
    },
    defaultTime: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      instance: null,
      inputValue: "",
      datetime: ""
    };
  },
  methods: {
    initPicker() {
      let _this = this;
      let instance = this.instance;
      let picker = this.$refs.picker;
      var options = {
        theme: "android-holo-light",
        lang: "zh",
        display: "bottom",
        buttons: [
          {
            text: "取消",
            handler: "cancel",
            icon: "close"
          },
          {
            text: "确定",
            handler: "set",
            icon: "checkmark"
          }
        ],
        defaultValue: this.datetime,
        endYear: new Date().getFullYear() + 100,
        dateFormat: "yy-mm-dd",
        onInit: function(event, inst) {
          instance = inst;
        },
        onSet(value, inst) {
          _this.inputValue = value.valueText;
          _this.$emit("input", _this.inputValue);
          _this.$emit("change", _this.inputValue);
        },
        onClear: function() {
          _this.value = "";
        }
      };
      instance = $(picker).mobiscroll();
      instance.date(options);
    },
    getdefaultValue() {
      if(this.defaultTime!=null && this.defaultTime!=''){
      	this.datetime = new Date(this.defaultTime);
      } else if (this.defaultTimeYear == "30") {
        let startY = new Date().getFullYear() - this.defaultTimeYear;
        this.datetime = new Date(startY, 5, 15);
      } else {
        let now = new Date(this.defaultTimeYear);
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        this.datetime = new Date(year, month, day);
      }
    }
  },
  watch:{
  	defaultTime: {
				handler(val) {
					if(val!=''){
						this.datetime = new Date(val)
						this.initPicker()
					}
				},
				deep: true
			},
  },
  mounted() {
    this.getdefaultValue();
    this.initPicker();
  }
};
</script>
<style type="text/css" scoped>
.begin {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.fa-calendar {
  /*position: absolute;
    top: 5px;
    right: 3px;*/
  color: #fec134;
}
.datepick_i {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
}
</style>
