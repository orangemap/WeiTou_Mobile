<template>
	<div>
		<div class='my-comm-details'>
			<ul
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10"
			infinite-scroll-immediate-check="true">
			<li v-for="item in messages">
				<div class="my-details" v-if="item.other9 == '0'" @click="toDetail(0,item)">
					<p>{{item.noticeTheme}} : </p>
					<p>{{item.noticeContent}}</p>
					<div>
						<p>{{item.releaseDate}}</p>
						<p>未读&nbsp;&gt;&gt;</p>
					</div>
				</div>
				<div class="my-details" v-if="item.other9 == '1'" @click="toDetail(1,item)">
					<p>{{item.noticeTheme}} : </p>
					<p>{{item.noticeContent}}</p>
					<div>
						<p>{{item.releaseDate}}</p>
						<p>已读&nbsp;&gt;&gt;</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<script type='text/babel'>
	import { InfiniteScroll } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		components: {InfiniteScroll},
		data() {
			return {
				channel:'',/*渠道*/
				agentCode:'',/*代理人工号*/
				messages:[],
				loading:true,
				page:0
			}
		},
		mounted(){
			this.channel = utils.cache.get('channel')
			console.log('渠道',this.channel)
			this.agentCode = utils.cache.get('personsal').agentCode
			console.log('代理人工号',this.agentCode)
			this.loadMore()
		},
		methods:{
		//跳转到消息详情页面
		toDetail(tag,item){
			this.$router.push({
				name:'personalMessageDetail',
				params:{
					isMust:tag,
					msg:item,
					index:2
				}
			})
		},
		loadMore() {
			this.loading = true;
			this.getMsg(this.page,(items)=>{
				if(items.length > 0){
					this.loading = false;
					this.page++
					for(let i=0;i<items.length;i++){
						this.messages.push(items[i])
					}
				}else{
					this.loading = true;
					Toast({
						message: '消息已经全部加载好了',
						duration: 1000
					});
				}
			},(error)=>{
				this.loading = false;
			})
		},
		//获取
		getMsg(page,success,fail) {
			let requ = {
				policy: {
					agentCode: utils.cache.get("personsal").agentCode,
					orgCode: utils.cache.get("personsal").orgId,
					noticeType:'2', //1-服务资讯、,2-渠道资讯、3-系统资讯
					size:'10',
					jgPashType:'2',
					start:page*10
				}
			};
			utils.http
			.post("JGPASHLIST", requ)
			.then(response => {
				let msgs = response.data.response;
				if(success!=undefined && msgs != undefined){
					success(msgs.jgpashList)
				}
			})
			.catch(error => {
				if(fail != undefined) {
					fail(error)
				}
			});
		}
	}
}
</script>

<style scoped type="text/css">
	.my-comm-details{
		margin:5px 10px;
	}
	.my-details{
		padding:10px;
		border-bottom:1px dashed #ddd;
	}
	.my-details p{
		margin:3px 0;
		letter-spacing:2px;
		line-height:1.5;
	}
	.my-details>p:first-child{
		width: 40%;
		white-space: nowrap;
    	overflow: hidden;
	}
	.my-details>p+p{
		text-indent:2em;
		display: -webkit-box;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.my-details>div{
		padding:0 10px;
		display:flex;
		justify-content:space-between;
	}
	.my-details>div>p+p{
		color:#FEB101;
		text-align:right;
	}
</style>
