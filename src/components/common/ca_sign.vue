<template>
  <div class="ca_sign">
    <table></table>
    <div class="ca_content">
      <!--  单击签名  -->
      <!-- <div class="sign" onclick="javascript:showPopupDialog(20)">单字签名框</div> -->
      <!-- <br>
      <br> -->
      <!-- <div class="signs"  onclick="javascript:showCommentDialog(30)">批注签名框</div> -->
     <!--  <br>
      <br> -->
      <!--  弹出签名框  -->
  		<!-- <div id="dialog" style=" display:none;" >
  			<div id="anysign_title" style="color:#333333;" width="100%" height="10%">请投保人签名</div>
  			<div id="container" onmousedown="return false;">
  				<canvas id="anysignCanvas" width="2"></canvas>             
  			</div>

  			<div id="single_scrollbar" style="text-align: center;  vertical-align:middle; " width="100%">
  				<span id="single_scroll_text"> *滑动操作：</span>
  				<input id="single_scrollbar_up" type="button" class="button orange" value="左移" />
  				<input id="single_scrollbar_down" type="button" class="button orange" value="右移" />
  			</div>
  			<div id="btnContainerOuter" width="100%">
  				<div id="btnContainerInner" style="text-align: center;   font-size:5pt;" width="100%">
  					<input id="btnOK" type="button" class="button orange" value="确 定" onclick="sign_confirm();" />
  					<input id="btnClear" type="button" class="button orange" value="清 屏" onclick="javascript:clear_canvas();">
  					<input id="btnCancel" type="button" class="button orange" value="取 消" onclick="cancelSign();">
  				</div>
  			</div>
  		</div> -->
  		
      <!-- 弹出批注框 -->
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


  	<!-- 	<div id="other">
  		<img id="xss_20" src="data:image/gif;base64,R0lGODlhhwBIAJECAL6+vtHR0f///wAAACH5BAEAAAIALAAAAACHAEgAAAL/jI+py+0Po5y02ouz3rz7Dx7CSJbmiabqyrbuC6NLTNf2jddKzvf+r9oBh8TiS2hMKo3IpfOJa0KnVJa0is0Krtruk+sNMxPi8hJsTufQ6jaN7Y634PK6jGzPu+j6PL9f9wcYJzjYVmiYhphYtngCAMkDUDOJEklzCeRokolTCdNZEuoyyrPJaRnz+dL5uSrwahnbcyr6WJoyuwLJywvb28sCPKw7hyc5THmbOxLryqqCu3ecU3xLTBz9TLIqza3rbYzgYw1t3jw5Wo4bLi7S81qeSor6+yhszylvRQ2KDYyJnixYqr6J2sdvnLJdC+dp40YqnkFa/c4xu/YvY7FQ7O1yIZymMCBDkST1fUQ3xNG6kfVsacv4KxizjjFU4nvYcqI+f8I00jSh0ucuZ/d2FnXZwle0GzaH4kQKkSXBgz3zXdRR8Ym6o0tRepXlytrJEovAQTV6dqrTZlFZiWWaVWorqstysk0aday3sSQQSdSplm7afUTTonX4Jq7HnK1mZcsG1ifAlzBtCNra9QZfzZvdGWCUqBZoLKJHUyltGgrq1E5Ws1bi+vWYkLIJKa4tJjZuTbd3d9HtmyLt4I16E68C/Djc4cp/G2/+5Tn0M9KnJ0lu/Uj17ERmcEceIrz48eTLmz+PPr368gUAADs="onclick="javascript:showPopupDialog(20)" />
  		<br>

  		<br>
  		<img id="xss_21" src="data:image/gif;base64,R0lGODlhhwBIAJECAL6+vtHR0f///wAAACH5BAEAAAIALAAAAACHAEgAAAL/jI+py+0Po5y02ouz3rz7Dx7CSJbmiabqyrbuC6NLTNf2jddKzvf+r9oBh8TiS2hMKo3IpfOJa0KnVJa0is0Krtruk+sNMxPi8hJsTufQ6jaN7Y634PK6jGzPu+j6PL9f9wcYJzjYVmiYhphYtngCAMkDUDOJEklzCeRokolTCdNZEuoyyrPJaRnz+dL5uSrwahnbcyr6WJoyuwLJywvb28sCPKw7hyc5THmbOxLryqqCu3ecU3xLTBz9TLIqza3rbYzgYw1t3jw5Wo4bLi7S81qeSor6+yhszylvRQ2KDYyJnixYqr6J2sdvnLJdC+dp40YqnkFa/c4xu/YvY7FQ7O1yIZymMCBDkST1fUQ3xNG6kfVsacv4KxizjjFU4nvYcqI+f8I00jSh0ucuZ/d2FnXZwle0GzaH4kQKkSXBgz3zXdRR8Ym6o0tRepXlytrJEovAQTV6dqrTZlFZiWWaVWorqstysk0aday3sSQQSdSplm7afUTTonX4Jq7HnK1mZcsG1ifAlzBtCNra9QZfzZvdGWCUqBZoLKJHUyltGgrq1E5Ws1bi+vWYkLIJKa4tJjZuTbd3d9HtmyLt4I16E68C/Djc4cp/G2/+5Tn0M9KnJ0lu/Uj17ERmcEceIrz48eTLmz+PPr368gUAADs=" onclick="javascript:showCommentDialog(30)" />
  		<br> -->

  		<!-- <textarea id="result" rows="10"></textarea> -->
  		
  		</div>
    </div>
  </div>
</template>

<script>
  import swiper from '../common/Swiper.vue'
  import Footertabs from '../common/Footer.vue'
  export default {
    name: 'home',
    components:{swiper,Footertabs},
    methods:{
      showSign:function(){
        var data = getSignData()
        alert(data.context_id)
        document.getElementById('xss_20').src = data.value
        document.getElementById('xss_21').src = data.value
      }
    }
  }
</script>

<style lang="css" scoped type="text/css">
  
  .ca_sign{
    width: 100% ;
    height: 100%;
    position:fixed;
    /* background: pink; */
  }
  .ca_content{
    width: 80%;
    height: 70%;
    /* background: silver; */
    margin:15% auto;
  }
  #comment_title{
    margin-top: -35px;
    line-height: 20px;
    padding-bottom: 10px;
  }    
  #signImage{
    border:1px solid rgb(229, 229, 229);
    margin-bottom: 10px;
    overflow-y:auto;
    height: 60px!important;
  }
  #tmpcanvascss{
    width: 100%;
  }
  #signTitle{
    width: 80%!important;
    overflow: hidden;
    text-align: center;
    line-height: 280px!important;
    top: 25%;
  }
  #comment_canvas{
    width: 80%!important;
    background-size: 100%!important;
    top: 25%;
  }
  .comment_btncontainer{
    position: absolute;
    bottom: 3%;right: 1%;
  }
  .comment_btncontainer #comment_ok{
    font-size: 26pt;
    padding:0 5px;
    border-radius: 10px;
    border:none!important;
  }
  .comment_btncontainer #comment_back{
    font-size: 26pt;
    padding:0 5px;
    border-radius: 10px;
    border:none!important;
  }
  .comment_btncontainer #comment_cancel{
    font-size: 26pt;
    padding:0 5px;
    border-radius: 10px;
    border:none!important;
  }
  .sign,.signs{
    width:150px;
    height: 10%;
    background: yellow;
    line-height: 50px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 2px 2px 3px red;
    margin:1% auto;
  }
</style>
