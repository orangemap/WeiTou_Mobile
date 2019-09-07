<template>
	<div>
		<!--批注-->
		<div id="comment_dialog" style=" display:none;">
			<div id="leftView">
				<p id="comment_title"></p>
				<div id="signImage" class="signImagecss"></div>
			</div>
			<div id="tmpcanvascss" class="tmpcanvascss">
				<div id="signTitle"></div>
				<canvas id="comment_canvas"></canvas>
			</div>
			<div id="comment_btnContainerInner" class="comment_btncontainer">
				<input id="comment_ok" type="button" class="btn_orange" value="确 定"
					 @click="my_sign_confirm">
				<input id="comment_back" type="button" class="btn_orange" value="后退">
				<input id="comment_cancel" type="button" class="btn_orange" value="取 消" @click="my_cancelSign">
			</div>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'


	export default{
		name:'ca_comment_dialog',
  		components: {},
  		props: ['value'],
		data () {
	    return {
	    	sign_data:'',
	    	page_title:'???',
	    	anysign:{
	    		anysignTitle:"批注签字",
	    	},
	    }
	  },
	  beforeMount(){
	  	
	  },
	  mounted(){
	  	
	  },
	  methods:{
	  	my_sign_confirm:function(){
	  		var this_value = getSignData()
	  		console.log('==========================')
	  		console.log(this_value)
	  		this.value.image = ""
	  		this.value.image = this_value.sign
	  		this.value.date = ""
	  		this.value.date = this_value.date
	  		this.value.isCACommentOpen = !this.value.isCACommentOpen
	  	},
	  	my_cancelSign:function(){
	  		this.value.isCACommentOpen = !this.value.isCACommentOpen
	  	}
	  },
	  mounted:function(){

	  }
	}
</script>

<style>
.comment_titlecss {
	font-size: 20px;
	clear: both
}

.comment_btncontainer {
	text-align: center;
	/*font-size: 30pt;*/
	width: 100%;
	height: 10%;
	clear: both
}

.signImagecss {
	overflow: scroll;
	border: 1px solid rgb(229, 229, 229)
}

.tmpcanvascss {}

.btn_orange {
	font-size: 20px;
	color: #fef4e9;
	border: solid 1px #da7c0c;
	background: #f78d1d;
	background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
}
</style>
