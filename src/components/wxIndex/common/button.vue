<script>
export default {
  name: "wx-button",
  props: {
      isRemoveBind:{
          type:Boolean,
          default:false
      }
  },
  render(h) {
    return h("div",{
      'class': {
        btn: true
      },
      domProps: {
        innerHTML:this.isRemoveBind == true?"解除绑定":"登录"
      },
      on: {
        click: this.handleBind
      },
     
    });
  },
  methods: {
    handleBind() {
        if(this.isRemoveBind){
            this.$emit("removeBindEvent")
        }else{
             this.$emit("login")
        }
    }
  }
};
</script> 
<style type="text/css" lang="scss" scoped>
</style>
