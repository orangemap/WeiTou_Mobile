<template>
	<div style="width: 100%;height: 100%;" ref='header'>
		<div class="img">
			<img :src='imgUrl' alt="" style="width: 100%;height: 100%;"/>
			<div class="jump" @click="goTo()" style="position: absolute;right:20px;top:20px;background:#C2C2C2;font-size: 0.9rem;border-radius: 5%;padding: 1%;width: 15%;text-align: center;">
				<div style="color: #fff;">跳过({{count}})</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count:"",//倒计时
				agentCode:utils.cache.get("agentCode"),
				imgUrl:'',
				imgList:[{
					agentCode:'6100I01207',url:'static/img/ambassador/刘娇杨-6100I01207.jpg'},
					{agentCode:'3600000073',url:'static/img/ambassador/刘海燕-3600000073.jpg'},
					{agentCode:'1200A27206',url:'static/img/ambassador/史春乐-1200A27206.jpg'},
					{agentCode:'5108000208',url:'static/img/ambassador/叶小燕-5108000208.jpg'},
					{agentCode:'4502000985',url:'static/img/ambassador/孙玉华-4502000985.jpg'},
					{agentCode:'1100000069',url:'static/img/ambassador/安萍-1100000069.jpg'},
					{agentCode:'3703000295',url:'static/img/ambassador/常得娟-3703000295.jpg'},
					{agentCode:'3206000292',url:'static/img/ambassador/曹波-3206000292.jpg'},
					{agentCode:'3301000031',url:'static/img/ambassador/林琴-3301000031.jpg'},
					{agentCode:'6100000296',url:'static/img/ambassador/梁天骄-6100000296.jpg'},
					{agentCode:'2104000389',url:'static/img/ambassador/滕珈志-2104000389.jpg'},
					{agentCode:'1200A06989',url:'static/img/ambassador/王倩-1200A06989.jpg'},
					{agentCode:'3100000048',url:'static/img/ambassador/王颖慧-3100000048.jpg'},
					{agentCode:'2801001404',url:'static/img/ambassador/田宜平-2801001404.jpg'},
					{agentCode:'3704000078',url:'static/img/ambassador/田莹莹-3704000078.jpg'},
					{agentCode:'4103000113',url:'static/img/ambassador/胡芳-4103000113.jpg'},
					{agentCode:'2200000159',url:'static/img/ambassador/许道霞-2200000159.jpg'},
					{agentCode:'3202F02246',url:'static/img/ambassador/谢秀芬-3202F02246.jpg'},
					{agentCode:'1307000622',url:'static/img/ambassador/郎树英-1307000622.jpg'},
					{agentCode:'2809000425',url:'static/img/ambassador/陈杰-2809000425.jpg'
				}],
				imgLists:[{
					agentCode:'6100I01207',url:'static/img/ambassadorBig/刘娇杨-6100I01207.jpg'},
					{agentCode:'3600000073',url:'static/img/ambassadorBig/刘海燕-3600000073.jpg'},
					{agentCode:'1200A27206',url:'static/img/ambassadorBig/史春乐-1200A27206.jpg'},
					{agentCode:'5108000208',url:'static/img/ambassadorBig/叶小燕-5108000208.jpg'},
					{agentCode:'4502000985',url:'static/img/ambassadorBig/孙玉华-4502000985.jpg'},
					{agentCode:'1100000069',url:'static/img/ambassadorBig/安萍-1100000069.jpg'},
					{agentCode:'3703000295',url:'static/img/ambassadorBig/常得娟-3703000295.jpg'},
					{agentCode:'3206000292',url:'static/img/ambassadorBig/曹波-3206000292.jpg'},
					{agentCode:'3301000031',url:'static/img/ambassadorBig/林琴-3301000031.jpg'},
					{agentCode:'6100000296',url:'static/img/ambassadorBig/梁天骄-6100000296.jpg'},
					{agentCode:'2104000389',url:'static/img/ambassadorBig/滕珈志-2104000389.jpg'},
					{agentCode:'1200A06989',url:'static/img/ambassadorBig/王倩-1200A06989.jpg'},
					{agentCode:'3100000048',url:'static/img/ambassadorBig/王颖慧-3100000048.jpg'},
					{agentCode:'2801001404',url:'static/img/ambassadorBig/田宜平-2801001404.jpg'},
					{agentCode:'3704000078',url:'static/img/ambassadorBig/田莹莹-3704000078.jpg'},
					{agentCode:'4103000113',url:'static/img/ambassadorBig/胡芳-4103000113.jpg'},
					{agentCode:'2200000159',url:'static/img/ambassadorBig/许道霞-2200000159.jpg'},
					{agentCode:'3202F02246',url:'static/img/ambassadorBig/谢秀芬-3202F02246.jpg'},
					{agentCode:'1307000622',url:'static/img/ambassadorBig/郎树英-1307000622.jpg'},
					{agentCode:'2809000425',url:'static/img/ambassadorBig/陈杰-2809000425.jpg'
				}]
			}
		},
		mounted() {
			this.threeGo()
			console.log(this.screenHeight)
			$('.img').css('height',this.screenHeight)
			$('.img').css('overflow','hidden')
			let u = navigator.userAgent;
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375){
					$('.jump').css('top','50px')
				}else {
					$('.jump').css('top','35px')
				}
			}
			console.log(this.screenWidth)
			if(this.screenWidth >= 375){
				this.imgLists.forEach( item =>{
					if(this.agentCode == item.agentCode){
						this.imgUrl=item.url
					}
				})
			}else{
				this.imgList.forEach( item =>{
					if(this.agentCode == item.agentCode){
						this.imgUrl=item.url
					}
				})
			}
		},
		destroyed(){
			$('.img').css('overflow','')
		},
		methods: {
			threeGo(){
				const TIME_COUNT = 5;
				if(!this.timer){
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(()=>{
					if(this.count > 1 && this.count <= TIME_COUNT){
						this.count--;
					}else{
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
						//跳转的页面写在此处
						this.$router.push({
							name: "home",
							query: {
								t: new Date().getTime()
							}
						});
					}
				  },1000)
				}
		    },
		    goTo(){
		    	this.$router.push({
					name: "home",
					query: {
						t: new Date().getTime()
					}
				});
		    },
		}
	}
</script>

<style>
</style>