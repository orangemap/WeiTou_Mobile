<template>
	<div class='not'>
		<div class="content">
			<Headerbtns :title="page_title">
				<div slot="left" class="back" @click="left">
					<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
				</div>
				<!--<div slot="right" class="server" @click="add()">
					导入
				</div>-->
			</Headerbtns>
			<div class="details" style="border-top: 1px solid #F0F0F0;">
				<div v-if="os == 'android'" class="info">
					<div v-for="(item,index) in contacts" style="line-height: 1.3rem;padding: 2% 0;width: 100%;border-bottom: 1px solid #EFEFEF;">
						<div v-for="itm in item.phoneNumbers" style="width: 92%;margin: auto;">
							<div v-if="itm.type == 'mobile'" class="flex flexs">
								<div style="width: 10%;position:relative">
									<input style="margin-top: 7px;" id="input" type="checkbox":checked="item.checked" @change='checkChang(item)'/> 
								</div>
								<div style="width: 40px;height: 40px;border-radius: 40px;background: #F7F3EA;font-size: 1rem;line-height: 40px;text-align: center;">
									<div style="font-size: 18px;color: #A69F8D;">{{item.firstName}}</div>
								</div>
								<div style="margin-left: 5%;">
									<div style="font-size: 14px;">{{item.displayName}}</div>
									<div style="font-size: 12px;color: #666;">{{itm.value}}</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<div v-if="os == 'ios'" class="info">
					<div v-for="(item,index) in contacts" :key="index" v-show="item.phoneNumbers!=undefined&&item.phoneNumbers!=null&&item.phoneNumbers.length>0" style="line-height: 1.3rem;padding: 2% 0;width: 100%;border-bottom: 1px solid #EFEFEF;">
						<div v-for="itm in item.phoneNumbers" style="width: 92%;margin: auto;">
							<div v-if="itm.type == 'mobile'" class="flex flexs">
								<div style="width: 10%;position:relative">
									<input style="margin-top: 7px;" id="input" type="checkbox":checked="item.checked" @change='checkChang(item)'/> 
								</div>
								<div style="width: 40px;height: 40px;border-radius: 40px;background: #F7F3EA;font-size: 1rem;line-height: 40px;text-align: center;">
									<div style="font-size: 18px;color: #A69F8D;">{{item.firstName}}</div>
								</div>
								<div style="margin-left: 5%;">
									<div style="font-size: 14px;">{{item.name.formatted}}</div>
									<div style="font-size: 12px;color: #666;">{{itm.value}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flexs footer" style="justify-content: space-between">
				<div style="margin-left: 4%;font-size:14px;font-weight:400;">已选择：<span style="color:#51A2F5;">{{checkNum.length}}</span>人</div>
				<div style="background:rgba(253,185,44,1);width:168px;line-height:41px;height:41px;text-align: center;border-radius: 3px;color: #fff;margin-right:12px;" @click="save()">确定({{checkNum.length}}/{{contacts.length}})</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import Alert from '@/components/policy/common/alert'
	export default {
		name: 'customerManage',
		components: {
			Headerbtns,Alert
		},
		data() {
			return {
				os: window.globalConfig.os,
				page_title: '通讯录导入',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				contacts:[],
				checkNum:[],
//				contacts:[
//				{'checked':false,id:'1','phoneNumbers':[{'type':'mobile',value:'13123546633'},{'type':'home',value:'13123546634'}],'displayName':'吃的'},
//				{'checked':false,id:'2','phoneNumbers':[{'type':'mobile',value:'13123546635'},{'type':'home',value:'13123546636'}],'displayName':'方法'},
//				{'checked':false,id:'13','displayName':'地方不对','phoneNumbers':[{'type':'mobile',value:'13123546633'}]},
//				{'checked':false,id:'4','displayName':'不放过吧','phoneNumbers':[{'type':'mobile',value:'13123546637'}]},
//				{'checked':false,id:'5','displayName':'是个发吧v发','phoneNumbers':[{'type':'mobile',value:'13123546638'}]},
//				{'checked':false,id:'6','displayName':'冠福股份','phoneNumbers':[{'type':'mobile',value:'13123546639'}]},
//				{'checked':false,id:'15','displayName':'的饭店饭店','phoneNumbers':[{'type':'mobile',value:'13123546632'}]},
//				{'checked':false,id:'16','displayName':'二位多无','phoneNumbers':[{'type':'mobile',value:'13123546631'}]},
//				{'checked':false,id:'25','displayName':'研讨会于拖后腿','phoneNumbers':[{'type':'mobile',value:'13123546644'}]},
//				{'checked':false,id:'36','displayName':'南海姑娘和','phoneNumbers':[{'type':'mobile',value:'13123546645'}]},
//				{'checked':false,id:'35','displayName':'跟慧娟你们回家','phoneNumbers':[{'type':'mobile',value:'13123546644'}]},
//				{'checked':false,id:'26','displayName':'返回给你回家','phoneNumbers':[{'type':'mobile',value:'13123546649'}]},
//				{'checked':false,id:'45','displayName':'让他给突然','phoneNumbers':[{'type':'mobile',value:'13123546648'}]},
//				{'checked':false,id:'76','displayName':'和工号你能','phoneNumbers':[{'type':'mobile',value:'13123546644'}]},
//				{'checked':false,id:'75','displayName':'他跟人给他','phoneNumbers':[{'type':'mobile',value:'13123546643'}]},
//				{'checked':false,id:'86','displayName':'发给他如果','phoneNumbers':[{'type':'mobile',value:'13123546642'}]},
//				],
			}
		},
		
		mounted() {
			if(window.globalConfig.os == 'ios'){
				console.log('ios')
			}else if(window.globalConfig.os == 'android'){
				console.log('android')
			}
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			this.media.header($('.detail'))
			$('.details').css('height', this.media.container(this.screenHeight, $('.footer'))).css('overflow','scroll')
			let listHeight = this.screenHeight-$('.new-header-title').outerHeight(true)-$('.footer').outerHeight(true)
			$('.info').css('height',listHeight+'px')
			utils.native.contactsFind((contacts)=>{
//				let contacts = [{"id":208,"rawId":null,"displayName":null,"name":{"givenName":"电话姓名","honorificSuffix":"","formatted":"顾袁哥电话姓名","middleName":"","familyName":"顾袁哥","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18600648664"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"电话名字","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"顾"},{"id":165,"rawId":null,"displayName":null,"name":{"givenName":"德友","honorificSuffix":"","formatted":"陈德友","middleName":"","familyName":"陈","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15726619211"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"陈"},{"id":18,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"小弟","middleName":"","familyName":"小弟","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18663142155"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"小"},{"id":226,"rawId":null,"displayName":null,"name":{"givenName":"建文","honorificSuffix":"","formatted":"王建文","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13552531074"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"王"},{"id":183,"rawId":null,"displayName":null,"name":{"givenName":"亚连","honorificSuffix":"","formatted":"齐亚连","middleName":"","familyName":"齐","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13552829731"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"永亮地产","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"齐"},{"id":201,"rawId":null,"displayName":null,"name":{"givenName":"娜","honorificSuffix":"","formatted":"王娜","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15153142236"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"王"},{"id":54,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"老胡","middleName":"","familyName":"老胡","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18354491992"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"老"},{"id":158,"rawId":null,"displayName":null,"name":{"givenName":"金明","honorificSuffix":"","formatted":"张金明","middleName":"","familyName":"张","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15602062963"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"张"},{"id":11,"rawId":null,"displayName":null,"name":{"givenName":"昊","honorificSuffix":"","formatted":"谭昊","middleName":"","familyName":"谭","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18661423982"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"谭"},{"id":219,"rawId":null,"displayName":null,"name":{"givenName":"畏","honorificSuffix":"","formatted":"吴畏","middleName":"","familyName":"吴","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"16619781718"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"吴"},{"id":72,"rawId":null,"displayName":null,"name":{"givenName":"海涛","honorificSuffix":"","formatted":"王海涛","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13691308812"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"王"},{"id":176,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"颜总","middleName":"","familyName":"颜总","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13916142840"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"颜"},{"id":29,"rawId":null,"displayName":null,"name":{"givenName":"明寿","honorificSuffix":"","formatted":"所明寿","middleName":"","familyName":"所","honorificPrefix":""},"nickname":"","phoneNumbers":[],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"所"},{"id":194,"rawId":null,"displayName":null,"name":{"givenName":"梦唯","honorificSuffix":"","formatted":"黄梦唯","middleName":"","familyName":"黄","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13311371912"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"旷世Face ID","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"黄"},{"id":151,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"曹","middleName":"","familyName":"曹","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13910334593"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"曹"},{"id":4,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"蔡镇宇","middleName":"","familyName":"蔡镇宇","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13627108199"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"蔡"},{"id":212,"rawId":null,"displayName":null,"name":{"givenName":"培泱","honorificSuffix":"","formatted":"田培泱","middleName":"","familyName":"田","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13821016056"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"田"},{"id":65,"rawId":null,"displayName":null,"name":{"givenName":"肖先生","honorificSuffix":"","formatted":"肖先生","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13869041706"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"养老院","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"肖"},{"id":169,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"物业","middleName":"","familyName":"物业","honorificPrefix":""},"nickname":"","phoneNumbers":[],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"物"},{"id":22,"rawId":null,"displayName":null,"name":{"givenName":"宝贝丹","honorificSuffix":"","formatted":"宝贝丹","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17718581803"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"宝"},{"id":230,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"晏怡","middleName":"","familyName":"晏怡","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13163238256"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"晏"},{"id":40,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"大姐","middleName":"","familyName":"大姐","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18660364596"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"大"},{"id":205,"rawId":null,"displayName":null,"name":{"givenName":"吉","honorificSuffix":"","formatted":"李吉","middleName":"","familyName":"李","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13630581301"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"李"},{"id":58,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"钉钉官方短信","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"钉钉官方短信","department":"","type":null}],"birthday":null,"note":"","photos":[{"value":"/var/mobile/Containers/Data/Application/808A2A4E-9C28-4793-90DF-F44139999856/tmp/contact_photo_58","type":"url","pref":"false"}],"categories":null,"urls":null,"checked":false,"firstName":"钉"},{"id":162,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"肖鹏","middleName":"","familyName":"肖鹏","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13875923347"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"肖"},{"id":15,"rawId":null,"displayName":null,"name":{"givenName":"老妈","honorificSuffix":"","formatted":"老妈","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13406701051"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"老"},{"id":223,"rawId":null,"displayName":null,"name":{"givenName":"祥鼐","honorificSuffix":"","formatted":"张祥鼐","middleName":"","familyName":"张","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15210676943"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"张"},{"id":180,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"何玉媛","middleName":"","familyName":"何玉媛","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15906301608"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"何"},{"id":33,"rawId":null,"displayName":null,"name":{"givenName":"振国","honorificSuffix":"","formatted":"陈振国","middleName":"","familyName":"陈","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17093191937"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"陈"},{"id":198,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"智行火车票","middleName":"","familyName":"智行火车票","honorificPrefix":""},"nickname":"","phoneNumbers":[],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"智"},{"id":51,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"团长","middleName":"","familyName":"团长","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15963693367"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"团"},{"id":155,"rawId":null,"displayName":null,"name":{"givenName":"军","honorificSuffix":"","formatted":"贾军","middleName":"","familyName":"贾","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18811438398"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"贾"},{"id":8,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"曹潞钢","middleName":"","familyName":"曹潞钢","honorificPrefix":""},"nickname":"","phoneNumbers":[],"emails":null,"addresses":[{"pref":"false","locality":"","region":"山西","id":0,"postalCode":"","country":"中国","type":"home","streetAddress":""}],"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"Java开发同事","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"曹"},{"id":216,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"李建辉","middleName":"","familyName":"李建辉","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18201011538"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"李"},{"id":69,"rawId":null,"displayName":null,"name":{"givenName":"大平","honorificSuffix":"","formatted":"王大平","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18369190791"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"王"},{"id":173,"rawId":null,"displayName":null,"name":{"givenName":"迪","honorificSuffix":"","formatted":"于迪","middleName":"","familyName":"于","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15010966217"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"于"},{"id":26,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"唐斌","middleName":"","familyName":"唐斌","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13053550015"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"唐"},{"id":191,"rawId":null,"displayName":null,"name":{"givenName":"纪鹏","honorificSuffix":"","formatted":"闫纪鹏","middleName":"","familyName":"闫","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17611618395"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"闫"},{"id":44,"rawId":null,"displayName":null,"name":{"givenName":"文康","honorificSuffix":"","formatted":"倪文康","middleName":"","familyName":"倪","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13524916104"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"倪"},{"id":148,"rawId":null,"displayName":null,"name":{"givenName":"小平2号","honorificSuffix":"","formatted":"小平2号 王","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15901303520"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"小"},{"id":1,"rawId":null,"displayName":null,"name":{"givenName":"胖哥","honorificSuffix":"","formatted":"胖哥","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18210120866"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"胖"},{"id":209,"rawId":null,"displayName":null,"name":{"givenName":"慧敏","honorificSuffix":"","formatted":"丁慧敏","middleName":"","familyName":"丁","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17868648036"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"丁"},{"id":62,"rawId":null,"displayName":null,"name":{"givenName":"士强","honorificSuffix":"","formatted":"张士强","middleName":"","familyName":"张","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17660391248"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"张"},{"id":166,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"李想","middleName":"","familyName":"李想","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18563101137"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"李"},{"id":19,"rawId":null,"displayName":null,"name":{"givenName":"大姑","honorificSuffix":"","formatted":"大姑","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"15026983612"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"大"},{"id":227,"rawId":null,"displayName":null,"name":{"givenName":"洪星","honorificSuffix":"","formatted":"景洪星","middleName":"","familyName":"景","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18311339967"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"景"},{"id":184,"rawId":null,"displayName":null,"name":{"givenName":"娟娟","honorificSuffix":"","formatted":"姚娟娟","middleName":"","familyName":"姚","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"13911919020"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"西红世房东","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"姚"},{"id":37,"rawId":null,"displayName":null,"name":{"givenName":"光泽","honorificSuffix":"","formatted":"周光泽","middleName":"","familyName":"周","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"18934510086"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"周"},{"id":202,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"焦凯","middleName":"","familyName":"焦凯","honorificPrefix":""},"nickname":"","phoneNumbers":[{"id":0,"pref":false,"type":"mobile","value":"17600977278"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"焦"},{"id":55,"rawId":null,"displayName":null,"name":{"givenName":"传威","honorificSuffix":"","formatted":"曲传威","middleName":"","familyName":"曲","honorificPrefix":""},"nickname":"","phoneNumbers":null,"emails":[{"value":"quchuanwei4@163.com","pref":false,"id":0,"type":"home"}],"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null,"checked":false,"firstName":"曲"},{"id":159,"rawId":null,"displayName":null,"name":{"givenName":"小义","honorificSuffix":"","formatted":"巫小义","middleName":"","familyName":"巫","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18911103086","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"振利科技有限公司","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":12,"rawId":null,"displayName":null,"name":{"givenName":"存龙","honorificSuffix":"","formatted":"霍存龙","middleName":"","familyName":"霍","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"15762795975","pref":false,"id":0,"type":"home"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":220,"rawId":null,"displayName":null,"name":{"givenName":"明洋","honorificSuffix":"","formatted":"王明洋","middleName":"","familyName":"王","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18801442576","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":73,"rawId":null,"displayName":null,"name":{"givenName":"鑫","honorificSuffix":"","formatted":"张鑫","middleName":"","familyName":"张","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"15321776071","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":177,"rawId":null,"displayName":null,"name":{"givenName":"宪凯","honorificSuffix":"","formatted":"董宪凯","middleName":"","familyName":"董","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"15210326716","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":30,"rawId":null,"displayName":null,"name":{"givenName":"老爸","honorificSuffix":"","formatted":"老爸","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"13061187923","pref":false,"id":0,"type":"mobile"},{"value":"18606300423","pref":false,"id":1,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":195,"rawId":null,"displayName":null,"name":{"givenName":"虹","honorificSuffix":"","formatted":"兰虹","middleName":"","familyName":"兰","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"13311288409","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":48,"rawId":null,"displayName":null,"name":{"givenName":"宝贝","honorificSuffix":"","formatted":"宝贝","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"15101054528","pref":false,"id":0,"type":"home"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":152,"rawId":null,"displayName":null,"name":{"givenName":"哥","honorificSuffix":"","formatted":"李哥","middleName":"","familyName":"李","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"15120039067","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":5,"rawId":null,"displayName":null,"name":{"givenName":"姐","honorificSuffix":"","formatted":"鲁敏姐","middleName":"","familyName":"鲁敏","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"13721924479","pref":false,"id":0,"type":"home"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":213,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"芳姐","middleName":"","familyName":"芳姐","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18660362819","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":66,"rawId":null,"displayName":null,"name":{"givenName":"阳子","honorificSuffix":"","formatted":"阳子","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"130-8268-9973","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":170,"rawId":null,"displayName":null,"name":{"givenName":"卫萤","honorificSuffix":"","formatted":"林卫萤","middleName":"","familyName":"林","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"134-8254-1370","pref":false,"id":0,"type":"home"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":23,"rawId":null,"displayName":null,"name":{"givenName":"尚明感测","honorificSuffix":"","formatted":"杨尚明感测","middleName":"","familyName":"杨","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"139-5453-4899","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":231,"rawId":null,"displayName":null,"name":{"givenName":"","honorificSuffix":"","formatted":"首科 顺丰","middleName":"","familyName":"首科 顺丰","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18001344759","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":188,"rawId":null,"displayName":null,"name":{"givenName":"立宗","honorificSuffix":"","formatted":"庞立宗","middleName":"","familyName":"庞","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18566222591","pref":false,"id":0,"type":""}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null},{"id":41,"rawId":null,"displayName":null,"name":{"givenName":"佳欣","honorificSuffix":"","formatted":"佳欣","middleName":"","familyName":"","honorificPrefix":""},"nickname":"","phoneNumbers":[{"value":"18963193590","pref":false,"id":0,"type":"iphone"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":"","name":"","department":"","type":null}],"birthday":null,"note":"","photos":null,"categories":null,"urls":null}]
			    this.contacts = contacts
			    for(let j=0;j<this.contacts.length;j++){
			    	let item = this.contacts[j]
			    	item.checked = false
					if(this.os == 'android'){
						item.firstName=item.displayName.substring(0,1)
					}else if(this.os == 'ios'){
						item.firstName=item.name.formatted.substring(0,1)
						let phoneNumbers = item.phoneNumbers
						let haveMobile = false
						if(phoneNumbers!=undefined&&phoneNumbers!=null){
							for(let i=0;i<phoneNumbers.length;i++){
								let phone = phoneNumbers[i]
								if(phone.value!=undefined&&phone.value!=''){
									let pnum = phone.value.replace(/\s/g, "").replace(/\-/g, "")
									if(pnum.length == 11 && pnum.substring(0,1) == 1){
										console.log(pnum)
										let itemphone = {
											"id": 0,
											"pref": false,
											"type": "mobile",
											"value": pnum
										}
										item.phoneNumbers = []
										item.phoneNumbers.push(itemphone)
										haveMobile = true
									}
								}
							}
							if(!haveMobile){
								item.phoneNumbers = []
							}
						}
					}
			    }
			    console.log(this.contacts)
			    console.log(JSON.stringify(contacts))
			},(err)=>{
				console.log(err)
			})
		},
		watch:{
			contacts: {
		        handler(old,val) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
		        	this.checkNum=[]
		   			console.log(old,val)
		   			old.map(v => {
		   				if(v.checked){
		   					this.checkNum.push(v)
		   				}
		   			})
		        },
        		deep: true    //深度监听
    		}
		},
		methods: {
			checkChang(row){
				this.contacts.map((v,i) => {
					if(row.id == v.id){
						v.checked = !v.checked
					}
					this.$set(this.contacts,i,v)
				})
			},
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/customer/customerManage')
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			add(){
				
			},
			save(){
				let memberLnfoList=[]
				for(let i=0;i<this.contacts.length;i++){
					if(this.contacts[i].checked){
						for(let j=0;j<this.contacts[i].phoneNumbers.length;j++){
							if(this.contacts[i].phoneNumbers[j].type=='mobile'){
								if(this.os == 'android'){
									memberLnfoList.push({'name':this.contacts[i].displayName,'mobilePhone':this.contacts[i].phoneNumbers[j].value})
								}else if(this.os == 'ios'){
									memberLnfoList.push({'name':this.contacts[i].name.formatted,'mobilePhone':this.contacts[i].phoneNumbers[j].value})
								}
							}
						}
					}
				}
				let requ = {
						"data":{
							 "agentCode": utils.cache.get('personsal').agentCode,
        					  "memberLnfoList":memberLnfoList,
        					  "requestOrder": 5
						},
						"methodName": "customerManagement",
    					"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
							this.go('/customer/customerManage')
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
		.details::-webkit-scrollbar,
		.not::-webkit-scrollbar {
			display:none
		}
	.details{
		div,
		span,
		p {
			font-size: 16px;
		}
		.flexs {
		display: flex;
		align-items: center;
		}
		.flex{
			flex: 1;
			justify-content: flex-start;
			padding-right: 3%;
		}
		.footer{
			position:fixed;
			bottom:0;
			width:100%;
			outline: none;
			background: url(/static/img/customerManage/aa.png) no-repeat 0 0;
			border: none;
			left:0;
			font-size:.9rem;
			box-shadow:0px 13px 11px 1px rgba(197,142,29,0.1);
		}
		.not{
			overflow:hidden;
		}
		input[type="checkbox"]{
		    -webkit-appearance: none;
		    vertical-align:middle;
		    margin-top:0;
		    background:#fff!important;
		    border:#999 solid 1px;
		    border-radius: 3px;
		    min-height: 19px;
		    min-width: 19px;
		}
		input[type="checkbox"]:checked {
		    background: #FDB92C!important;
		    border:#FDB92C solid 1px;
		}
		input[type=checkbox]:checked::after{
		    content: '';
		    top: 12px;
		    left: 3px;
		    position: absolute;
		    background: transparent;
		    border: #fff solid 2px;
		    border-top: none;
		    border-right: none;
		    height: 6px;
		    width: 10px;
		    -moz-transform: rotate(-45deg);
		    -ms-transform: rotate(-45deg);
		    -webkit-transform: rotate(-45deg); 
		    transform: rotate(-45deg);
		}
	}
	.server{
	position: absolute;
	width: 60px;
    right: -3px;
    line-height: 0rem;
    font-size: 0.85rem;
    color: #FEB101;
    font-weight: bold;
}
	.flexs {
		display: flex;
		align-items: center;
	}
	.flex{
		flex: 1;
		justify-content: flex-start;
		padding-right: 3%;
	}
	.footer{
		position:fixed;
		bottom:0;
		width:100%;
		outline: none;
		background: url(/static/img/customerManage/aa.png) no-repeat 0 0;
		border: none;
		left:0;
		font-size:.9rem;
		height:60px;
	}
</style>