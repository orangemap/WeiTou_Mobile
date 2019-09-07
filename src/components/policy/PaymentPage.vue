<!--支付页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<router-link to="/policy/electronics" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div class="manage-main-contents"><h1 @click="">支付页面</h1></div>
		<Footerbtns :is_show=false
			total_premium="10000.00">
			<div slot="center" @click="">
				立即支付
			</div>
		</Footerbtns>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	export default{
		name:'policy_list',
  		components: {Headerbtns,Footerbtns},
		data () {
	    return {
	    	page_title:'金生富贵',
	      	optionsValue:''
	    }
	  },
	  methods:{

	  }
	}
</script>

<style lang="scss" scoped type="text/css">

</style>
