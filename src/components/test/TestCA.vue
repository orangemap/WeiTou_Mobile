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
				<input id="comment_ok" type="button" class="btn_orange" value="确 定">
				<input id="comment_back" type="button" class="btn_orange" value="后退">
				<input id="comment_cancel" type="button" class="btn_orange" value="取 消">
			</div>
		</div>

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
							onclick="sign_confirm();" />
						<input id="btnClear" type="button" class="button orange" value="清 屏" 
							onclick="javascript:clear_canvas();">
						<input id="btnCancel" type="button" class="button orange" value="取 消" 		onclick="cancelSign();">
					</div>
				</div>
			</div>
		</center>

			<div id="other" v-show="!caValue.isCACommentOpen">
				<br>
				<br>
				<input type="button" name="单字签名" value="showMsg" style="width: 180px" @click="showMsg">
				<br>
				<br>
				<input type="button" name="单字签名" value="单字签名" style="width: 180px" onclick="showPopupDialog(20)">
				<br>
				<br>
				<input type="button" name="单字签名" value="单字签名" style="width: 180px" onclick="showPopupDialog(25)">
				<br>
				<br>
				<!--onclick="showCommentDialog(30)"-->
				<input type="button" name="批注签名" value="批注签名" style="width: 180px" onclick="showCommentDialog(30)">
				<br>
				<br>
				<input type="button" name="获取数据" value="获取数据" style="width: 180px" @click="showSign()">
				<br>
				<br>
				<img id="xss_20" src="data:image/gif;base64,R0lGODlhhwBIAJECAL6+vtHR0f///wAAACH5BAEAAAIALAAAAACHAEgAAAL/jI+py+0Po5y02ouz3rz7Dx7CSJbmiabqyrbuC6NLTNf2jddKzvf+r9oBh8TiS2hMKo3IpfOJa0KnVJa0is0Krtruk+sNMxPi8hJsTufQ6jaN7Y634PK6jGzPu+j6PL9f9wcYJzjYVmiYhphYtngCAMkDUDOJEklzCeRokolTCdNZEuoyyrPJaRnz+dL5uSrwahnbcyr6WJoyuwLJywvb28sCPKw7hyc5THmbOxLryqqCu3ecU3xLTBz9TLIqza3rbYzgYw1t3jw5Wo4bLi7S81qeSor6+yhszylvRQ2KDYyJnixYqr6J2sdvnLJdC+dp40YqnkFa/c4xu/YvY7FQ7O1yIZymMCBDkST1fUQ3xNG6kfVsacv4KxizjjFU4nvYcqI+f8I00jSh0ucuZ/d2FnXZwle0GzaH4kQKkSXBgz3zXdRR8Ym6o0tRepXlytrJEovAQTV6dqrTZlFZiWWaVWorqstysk0aday3sSQQSdSplm7afUTTonX4Jq7HnK1mZcsG1ifAlzBtCNra9QZfzZvdGWCUqBZoLKJHUyltGgrq1E5Ws1bi+vWYkLIJKa4tJjZuTbd3d9HtmyLt4I16E68C/Djc4cp/G2/+5Tn0M9KnJ0lu/Uj17ERmcEceIrz48eTLmz+PPr368gUAADs="/>
				<br>
				<br>
				<img id="xss_21" src="data:image/gif;base64,R0lGODlhhwBIAJECAL6+vtHR0f///wAAACH5BAEAAAIALAAAAACHAEgAAAL/jI+py+0Po5y02ouz3rz7Dx7CSJbmiabqyrbuC6NLTNf2jddKzvf+r9oBh8TiS2hMKo3IpfOJa0KnVJa0is0Krtruk+sNMxPi8hJsTufQ6jaN7Y634PK6jGzPu+j6PL9f9wcYJzjYVmiYhphYtngCAMkDUDOJEklzCeRokolTCdNZEuoyyrPJaRnz+dL5uSrwahnbcyr6WJoyuwLJywvb28sCPKw7hyc5THmbOxLryqqCu3ecU3xLTBz9TLIqza3rbYzgYw1t3jw5Wo4bLi7S81qeSor6+yhszylvRQ2KDYyJnixYqr6J2sdvnLJdC+dp40YqnkFa/c4xu/YvY7FQ7O1yIZymMCBDkST1fUQ3xNG6kfVsacv4KxizjjFU4nvYcqI+f8I00jSh0ucuZ/d2FnXZwle0GzaH4kQKkSXBgz3zXdRR8Ym6o0tRepXlytrJEovAQTV6dqrTZlFZiWWaVWorqstysk0aday3sSQQSdSplm7afUTTonX4Jq7HnK1mZcsG1ifAlzBtCNra9QZfzZvdGWCUqBZoLKJHUyltGgrq1E5Ws1bi+vWYkLIJKa4tJjZuTbd3d9HtmyLt4I16E68C/Djc4cp/G2/+5Tn0M9KnJ0lu/Uj17ERmcEceIrz48eTLmz+PPr368gUAADs="/>
				<br>
			</div>
			
			<!--<CommentDialog v-show="caValue.isCACommentOpen" v-model="caValue"></CommentDialog>-->
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	
	import CommentDialog from '../common/CommentDialog.vue'

	export default{
		name:'policy_list',
  		components: {Headerbtns,Footerbtns,CommentDialog},
		data () {
	    return {
	    	
	    	caValue:{
	  			isCACommentOpen:false,
	  			image:""
	  		},
	    	
	    	sign_data:'',
	    	page_title:'金生富贵',
	    	anysign:{
	    		anysignTitle:"请投保人签字",
	    	},
	    }
	  },
	  beforeMount(){
	  	let nowTime = new Date()
	  	console.log(nowTime.getFullYear())
	  	var month = nowTime.getMonth()+1
	  	console.log(month)
	  	console.log(nowTime.getDate())
	  	this.date1 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	this.date2 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	console.log(this.date1 + ',' + this.date2)
	  },
	  mounted(){

	  },
	  methods:{
	  	comment:function(){
	  		this.caValue.isCACommentOpen = !this.caValue.isCACommentOpen
	  		this.caValue.iamge = ""
	  		showCommentDialog(30)
	  	},
	  	showSign:function(){
	  		var data = getSignData()
	  		console.log(data.date)
	  		console.log(data.sign.context_id)
	  		console.log(data.sign.context_type)
	  		console.log(data.sign.value)
	  		document.getElementById('xss_20').src = data.sign.value
//	  		document.getElementById('xss_21').src = data.value
	  	},
	  	showMsg:function(){
	  		for(var i=0;i<1000;i++){
	  			console.log(i)
	        	MessageBox({
		            title: '提示',
		            message: "ce shi yi xia"
	            });
	  		}
	  	},
	  },
	  beforeCreate: function () {
	        console.log('beforeCreate 创建前状态===============》');
	    },
	    created: function () {
	        console.log('created 创建完毕状态===============》');
	    },
	    beforeMount: function () {
	        console.log('beforeMount 挂载前状态===============》');
	    },
	    mounted: function () {
	        console.log('mounted 挂载结束状态===============》');
	      //初始化CA签字
	      initAnySign('999999')
	      var res;
	      //添加签字对象
	      res = addSignatureObj(20,'张张','1407241994');
			if(!res) {
				alert("addSignatureObj error");
			}
			res = addSignatureObj(25,'张鑫','1407241994');
			if(!res) {
				alert("addSignatureObj error");
			}
			res = addCommentObj(30,'李四','1207241994');
			if(!res) {
				alert("addCommentObj error");
			}
			//提交配置
			commitConfig()
	    },
	    beforeUpdate: function () {
	        console.log('beforeUpdate 更新前状态===============》');
	    },
	    updated: function () {
	        console.log('updated 更新完成状态===============》');
	    },
	    beforeDestroy: function () {
	        console.log('beforeDestroy 销毁前状态===============》');
	    },
	    destroyed: function () {
	        console.log('destroyed 销毁完成状态===============》');
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
