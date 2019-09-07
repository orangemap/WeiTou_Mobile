<template>
	<div>
		<!--签字-->
		<center>
			<div id="dialog" style=" display:none;">
				<!-- 显示签名区域-->
				<div id="anysign_title" style="color:#333333;" width="100%" height="10%">
					<p v-model="anysign.anysignTitle"></p>
				</div>
				<div id="container" onmousedown="return false;">
					<canvas id="anysignCanvas" width="2">
                    </canvas>
				</div>
				<div id="single_scrollbar" style="text-align:center;vertical-align:middle;"
					width="100%">
					<span id="single_scroll_text">*滑动操作</span>
					<input id="single_scrollbar_up" type="button" 
						class="button orange" value="左移" />
					<input id="single_scrollbar_down" type="button" 
						class="button orange" value="右移" />
				</div>
				<div id="btnContainerOuter" width="100%">
					<div id="btnContainerInner" style="text-align: center; font-size:5pt;" 
						width="100%">
						<input id="btnOK" type="button" class="button orange" value="确 定" 
							@click="my_sign_confirm" />
						<input id="btnClear" type="button" class="button orange" value="清 屏" 
							onclick="javascript:clear_canvas();">
						<input id="btnCancel" type="button" class="button orange" value="取 消" @click="my_cancelSign">
					</div>
				</div>
			</div>
		</center>
		<div id="other">
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'

	export default{
		name:'ca_dialog',
  		components: {},
  		props: ['value'],
		data () {
	    return {
	    	sign_data:'',
	    	page_title:'金生富贵',
	    	anysign:{
	    		anysignTitle:"请投保人签字",
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
	  		sign_confirm();
	  		this.value.isCAOpen = !this.value.isCAOpen
	  	},
	  	my_cancelSign:function(){
	  		cancelSign();
	  		this.value.isCAOpen = !this.value.isCAOpen
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
	font-size: 30pt;
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
	font-size: 20pt;
	color: #fef4e9;
	border: solid 1px #da7c0c;
	background: #f78d1d;
	background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
}
</style>
