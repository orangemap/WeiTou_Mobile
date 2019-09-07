<!--理赔服务指南页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="goBack">
				<i class="fa fa-angle-left" ></i>
			</div>
		</Headerbtns>
	    <div class='sel-help'>
	      <img :src="homeImg" alt="" style='height:14rem;width:100%'>
	      <div v-for="(item,index) in ServiceGuides" class='sel-help-list flex' @click="toNext(index)">
	        <div style='width:10rem;display: flex;align-items: center;'>
	          <img :src="item.img"/>
	          <p>&nbsp;&nbsp;{{item.serviceGuide}}</p>
	        </div>
	        <img :src="homeRtImg">
	      </div>
	    </div>
	</div>
</template>

<!--js-->
<script>
  import Headerbtns from '@/components/policy/common/Header'
  import '../policy/css/base.css'
	export default{
		name:'service_guide',
  	components: {Headerbtns},
		data () {
			return {
		        page_title: '理赔服务指南',
		        homeImg: 'static/img/claims/serviceGuideIcon.png',
		        homeRtImg: 'static/img/settlement/home_right.png',
		        ServiceGuides:[
		          {
		            img: 'static/img/claims/rangeIcon.png',
		            serviceGuide: '理赔申请适用范围'
		          },
		          {
		            img: 'static/img/claims/materialIcon.png',
		            serviceGuide: '理赔申请应备材料'
		          },
		          {
		            img: 'static/img/claims/pathIcon.png',
		            serviceGuide: '理赔资料获取途径'
		          },
		        ]
			}
	    },
	    mounted() {
				let htmlDOM = document.getElementsByTagName('html')[0]
				htmlDOM.style.fontSize = this.screenWidth/20+'px'
				this.media.header($('.sel-help'))
			},
	    methods:{
	      goBack() {
	        this.$router.push('/settlement');
	      },
	      /* 页面跳转 */
	      toNext(index) {
	        if(index == 0) {
	          this.$router.push("/claims/questions");
	        } else if(index == 1) {
	          this.$router.push("/claims/materials");
	        }else if(index == 2) {
	          this.$router.push("/claims/path");
	        }
	      }
	    },
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style lang="scss" scoped type="text/css">
  /* 隐藏滚动条 */
  .manage-main-contents::-webkit-scrollbar,
  .content::-webkit-scrollbar{
    display: none
  }
	.back{
    display: block;
    height: 100%;width: 100%;
    position: relative;
    img{
      position: absolute;
      top: 50%;left: 50%;
      margin-top: -10px;
      margin-left: -20px;
    }
  }
	.fa{
		color: #FDB92C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
  .sel-help .flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.sel-help-list{
		padding:5px 1rem;
	}
	.sel-help-list{
		height:2rem;
		border-bottom:2px dotted #ccc;
	}
	.sel-help-list>div>img:first-child{
		width:2rem;
		height:2rem;
	}
	.sel-help-list>div>p{
		font-size:.9rem;
	}
	.sel-help-list>img{
		width:1rem;
		height:1rem;
	}
</style>
