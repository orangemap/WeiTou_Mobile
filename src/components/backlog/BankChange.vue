<template>
	<div>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue"></NewCA>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns title="银行变更确认">
				<div @click="goPay" replace slot="left">
					<i class="fa fa-angle-left"></i>
				</div>
				<div slot="right" @click="sheetVisible = !sheetVisible">
					<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
				</div>
			</Headerbtns>
			<div class="main-contents">
				<ul>
					<li>
						<span>支付保费</span>
						<span>{{payChangeInfo.payInfo.sumPremL}}</span>
					</li>
					<li>
						<span>投保人</span>
						<span>{{payChangeInfo.custInfo.appnt.appntName}}</span>
					</li>
					<li v-if="item.isMaster == 1" v-for="item in payChangeInfo.custInfo.insurants.firstInsurant.products.product">
						<span>投保险种</span>
						<span>{{item.prodName}}</span>
					</li>
					<li @click="openBankListBox(pays)">
						<span>付款银行</span>
						<input type="text" placeholder="请选择" v-model="showBankInfo.newBankName" readonly />
					</li>
					<li>
						<span>付款卡号</span>
						<input type="text" v-model="payChangeInfo.payInfo.newBankAccNo" placeholder="请输入银行卡号" v-supportNumber />
					</li>
					<li>
						<span style="color:#FEB101;">银行预留 <br /> 手机号码</span>
						<input type="text" v-model="payChangeInfo.custInfo.appnt.mobile" v-supportNumber placeholder="请填写银行卡预留手机号码" maxlength="11" />
					</li>
					<li style="color:#5B87DF;border: none;line-height: 1.4;">受监管政策及网联系统等影响，将当日实时扣款不成功的数据在当日24时转到线下通过批扣方式进行扣款。</li>
					<li style="align-items: baseline;margin-top: 10px;border: none;">
						<span>支付方式选择</span>
						<div>
							<label style="line-height: 30px;"><input type="radio" name="pay_fs" v-model="pays" value="1" style="position:relative;top:2px;margin-right: 5px;">实时扣款转账</label>
							<br />
							<label style="line-height: 30px;"><input type="radio" name="pay_fs" v-model="pays" value="2" style="position:relative;top:2px;margin-right: 5px;">转批扣</label>
						</div>
					</li>
				</ul>
				<div style="text-align:center;margin-top:20px;padding-bottom: 34px;">
					<p>投保人签字</p>
					<img id="xss_20" :src="wrting" style="width:150px;height:140px;" @click="faceTest" />
					<p>上传银行卡影像</p>
					<div style="margin:10px auto;display: flex;justify-content: center;">
						<div v-show="isshowChoice.positive" class="div-flex">
							<img ref="bankPositive" id="bankPositive" @click="select(1)" class="qxImg img1" src="../../../static/img/backlog/yhk1.jpg" style="width:140px;height:100px;" />
							<span v-if="isdel.positive" @click="deletingImages(1)">x</span>
						</div>
						<div v-show="isshowChoice.negative" class="div-flex" style="margin-left:10px;width:140px;height:100px;">
							<img ref="bankNegative" id="bankNegative" @click="select(2)" src="../../../static/img/backlog/yhk2.jpg" alt style="width:140px;height:100px;" />
							<span v-if="isdel.negative" @click="deletingImages(2)">x</span>
						</div>
					</div>
					<mt-popup position="center" v-model="Show" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                     background: #fff;top:80%;left: 50%;height: 90px;">
						<button class="photo" @click="getNewPhotos(1)">从相册选择</button>
						<hr />
						<button class="photo" @click="capturePhoto(1)">拍照</button>
					</mt-popup>
					<mt-popup position="center" v-model="Show1" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                  background: #fff;top:80%;left: 50%;height: 90px;">
						<button class="photo" @click="getNewPhotos(2)">从相册选择</button>
						<hr />
						<button class="photo" @click="capturePhoto(2)">拍照</button>
					</mt-popup>
					<p>
						<input type="checkbox" style="border:#F4A200" v-model="check" /> 投保人已预览并确认
						<a style="color:#F4A200" @click="goPreview">《银行变更确认书内容》</a>
					</p>
				</div>
			</div>
			<FooterBar>
				<div slot="center" @click="paymentRequest">立即付款</div>
			</FooterBar>
			<div :style="{width:darkHeight+'px'}" style="height:100%;background:rgba(0,0,0,0.2);z-index:1500;position:fixed;overflow:hidden;" v-if="isShowZ"></div>
			<!--倒计时-->
			<div id="countdown" :style="{width:screenWidth+'px',height:screenHeight+'px'}" style="position:fixed;z-index: 1999;" v-if="isShowCountDown">
				<div class="countdown rang-centenr">
					<div style="width:100%;height:100%;line-height:200px;border-radius:50%;background:#fff;text-align:center;">
						<div style="font-size: 54px;color: #F4A200;">{{countdown}}</div>
					</div>
				</div>
			</div>
			<alert ref="showalert"></alert>
			<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		</div>
		<mt-popup v-model="showBankInfo.showBankInfo" position="center" class="bankLists">
			<div style="height: 100%;overflow: auto;">
				<p class="title">选择支付银行</p>
				<div>
					<div v-for="(tpl,index) in dict.bankList.bank.item" class="content" @click="selectBanks(tpl)">
						<p>
							<img :src="tpl.image" />
						</p>
						<div>
							<span>{{tpl.text}}</span>
							<span>单笔限额{{tpl.remark}}万</span>
						</div>
						<img src="../../../static/img/policy/bank/select.png" style="width: 18%;position: relative;left: 5%;bottom: 35%;" v-if="tpl.code == selectBank.code" />
					</div>
				</div>
				<p class="save" @click="selectBankSave">确定</p>
			</div>
		</mt-popup>
		<!-- 批量扣款银行列表 start -->
		<mt-popup v-model="showBankInfo.showBankBatchInfo" position="center" class="bankLists">
			<div style="height: 100%;overflow: auto;">
				<p class="title">选择支付银行</p>
				<div>
					<div v-for="(tpl,index) in dict.bankBatchList.bank.item" class="content" @click="selectBanks(tpl)">
						<p>
							<img :src="tpl.image" />
						</p>
						<div>
							<span>{{tpl.text}}</span>
							<span>{{tpl.remark}}</span>
						</div>
						<img src="../../../static/img/policy/bank/select.png" style="width: 18%;position: relative;left: 5%;bottom: 35%;" v-if="tpl.code == selectBank.code" />
					</div>
				</div>
				<p class="save" @click="selectBankSave">确定</p>
			</div>
		</mt-popup>
		<!-- 批量扣款银行列表 end -->
	</div>
</template>

<script>
	import { MessageBox } from "mint-ui";
	import { Toast } from "mint-ui";
	import { Actionsheet } from "mint-ui";
	import alert from "../policy/common/alert.vue";
	import Headerbtns from "../policy/common/Header.vue";
	import FooterBar from '../policy/common/FooterBar.vue'
	import picker from "../common/Picker.vue";
	import NewCA from "../common/NewCA";
	import camera from "../../../static/js/cordova_camera.js";
	import bankList from "../../../static/dict/bank_sunlife.json";
	import bankBatchList from '../../../static/dict/bank_batch_deduction_sunlife.json'
	import "../policy/css/base.css";
	export default {
		name: "bankChange",
		components: {
			Headerbtns,
			FooterBar,
			picker,
			NewCA,
			alert
		},
		data() {
			return {
				showBankInfo: {
					showBankInfo: false,
					showBankBatchInfo: false,
					newBankCode: "",
					newBankName: "",
				},
				selectBank: {},
				appnt: {
					appntName: "",
					idType: "",
					idNo: ""
				},
				darkHeight: "",
				payCount: 0,
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
				pays: "1", //支付方式
				isShowZ: false, //控制遮罩层是否显示
				isShowCountDown: false, //控制倒计时是否显示
				countdown: 15,
				isdel: {
					positive: false,
					negative: false
				},
				isshowChoice: {
					positive: false,
					negative: false
				},

				wrting: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCACFAJEDAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAQQHAwII/8QASBAAAQMBAwQLDAgGAwEAAAAAAQACAwQFBhESITFBExQVFiIyUVRhktEjJDNCUlNxcpGhseEHNVViY4GCwTRzk6Ky8BclQ9L/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAwYC/8QALxEBAAEDAwMCBAYCAwAAAAAAAAECAxEEEjEFEyFBYSIyUXEUQpGxwdGB4SNy8P/aAAwDAQACEQMRAD8A/VKAgICAgICAgICAgICAgIIy07SMPcovCeM7kVdrNZs+GnlJsWc+ZQ7qmcnKdIek4qom9VzmU3ZBZN6nmt2Coz07zkxv1j0+lbNF1ed+2v5Z4kv6H4cxyta6RUiAgICAgICAgICAgICAg8qqobBC6Q6tA6VqvXYopy9UU7pwq8kjpHl7jiXaVzVVU1TmeVrEYR1q1WRHsLeNJxvV+ah6m5iMfVIsUZnKJbjlDDTqUCExecqp6V2Oa1DilNq0QhAQEBAQEBAQEBAQEBBy6+t/6qG3tq0GRJSUnAmY7RJJ42cZxk6AqjW1752+kOm6d0yJtbqvmqSdmWvBX2a20GxvhjOOLH6eDmOBGkY61U1/Dyj3bE0V7eUXNK+aV0jtLv8AcFU1VbpymU04jCVu1ZW3a4PeO4QcJ/SdQVj0rSd25mflpRNbf2U+8r5gORdkoGUBAQEBAQEBAQEBAQEFdvxePcOxXyRuwrJ+50vQ7W79IWjUXdlPun9O0neuYn5Y5cXsqzprVtKOka44ynGWTSQwZ3OVHVOHY3rsW6Mr5bldR2ZQbE0bHRUUYxYPu8Vv+61VX6prq2QpdPRNc5nmXPrGvvar69sNRBtplTJhHHHmkZlnM1mpwHSpFegifl5Wl3TUxTnjD9A2NZzKChZEOOeFKfvHsXS6LSxZtxT6+v3cZqL3cqy3lLaBAQEBAQEBAQEBAQEGHODQXOODRnJQcJvveN1t21JK13ecGMdK3VkjS79Rzql1F3fV7O36dpOzbx+aeU/dOzW2VZDrQmb35WAFoOpniN/PjFVuou4hC1l3u3NsfLCkX+tt89SLMjfiyI7JVHypdQPq4+1atFa/PPMrDSWsRlZPoVugKqsfeGrZjDSksomnQZdb/wBI0dKvtFZzO6Vb1rV7Y7cczy7WrNy4gIMEgDEnAINZ9pUzcwJd6EHnutD5LkDdaHyXIG60PkuQN1ofJcgbrQ+S5BndWHyXINI3powSNifmzakGN9dF5qT3IG+ui81J7kFW+kC+7BZW51GHRz1gwkdrEWvR5WhQ9Zd2xj1lddG0m+vfPFP7qJdWxRalqNbI3GkgwkqByjHgs/UfcqeurDodZf7dHjmeFmvheBtBSS1AwOxdzpmanSn9gqqY7tzb6QrtJYz/AJcpsuhqbWtaCkD8Z6uThyuz6c73n0Zyrm3RmYphbXrtNqiap4h+n7Bs+zrNsimoLPINLTsDGkZ8eVxw1k5yr6inbGHCXrs3KpqnmUgvTUIPiaZkUZe7QEELUVMk7sXHg6m6gghqu8dmwOLGuM7xp2PR1tCMtXfbTc3f7Qgb7abm7/aEDfbTc3f7Qgb7abm7/aEDfbTc3f7QgyL202I73f7Qgrz720+W7vd/GOscqMPnfbT83f1ggG91KBiad+A6QsVVYjMvduia6opjmVStCtlrayWql40hzDkaOKB6AqG5XuqzLvNPYi1RFEejcsW9kdgR1EcsbnsrMMCzDKaW5sc+GbAqPeomqPHLVqtL3cT9FdvLeB9sVbHNaY6SAYQxHTieM49JXjT2O3Hu3WbWyPdP/R/uZQiStrCW1VRwIJCOCyLX6Mo6+RXmis4jd6y5zrer3VdqOKefv/p0mir56Z7ZqeTMc+Y4tcP3U5RLjZtoxV0GyNzPGaRnIUG4gibSny5tj8VnxQU+8dqSvm3Pp8cMwlydLnHQwIy97PuxTxsD63ukp/8AIHBjejNpQb+4tk81Z7+1A3FsnmrPf2oG4tk81Z7+1A3FsnmrPf2oG4tk81Z7+1BkWLZOI71Z7+1BX32LZOyO71Zxjy8vpRh87i2TzVnv7UFXvWbPhnZRUkTWPZwp3N5TxW/uq7W3fy/q6Xoek8d2ftH8ygCQBidA0lVzoUDVVBnnc/VoYOhBvXZsV1sWvFSnHYG90qnDVG3T1tAW6xa31Y9EPX6rsWpq9eI+7plZdmz5Y+9W7WkHEAxLPQQVeOFyjLHr6izq40NTmiLshzT4jtTh0FBerFrXUtew49zk4Eg6Dr/IoLqggZTlVDulyMqdYY2xbpkfnIMkn54/NBbUBBhAQEBBkaQgr7/CO9Y/FGGnaloR2fQyVT9Lc0bfKedAWu7c2U5SNJppvXIoj/P2c4kkfJI+SQ5UjyXPdyk6VRTOXeU0xTGI4hG2tU5LBA3S/O/0fNYekUSAMTqRl1m5dhbk2QDK3Ctq8Jag6x5DP0j3q50trZT7y4rqmr713x8tPiP5lPqSrVXvbG1tVDKOM9hx/Sc3xQWWmeXQQyeM5jHH0kAoLntiTlQajvDn1v3RlULtfW7/AFZPig2r+Wxadk2Dtmz80rpWxyT4ZWxsIPCw6TmxRhzbf9er7Ud7GdiBv+vT9qO9jOxA3/Xp+1HexnYgb/r0/ajvYzsQN/16ftR3sZ2IMtv9enKH/aO9jOxBRJvpNvoJ5Ruy/M92qPl9CCau7eW27cgnNp1rqsQPbsWOTwS4HHigKu188Ok6BT4rn7JOWRsUbpHcVqrnRK/JI6SR0juM44lGUfadrGzxG6GQMqsoPiJwOTknHKwObSpektbqs+kKjq+r7VvbHzV/t6s/8n30J+un4+iPsVu490j6J70W9btJaG6jtsR0zo9r1uSG4l+OVGcMA7DAHFBMXw8JTeo/4hBYKT+Ep/5TP8QguCDxd4c+t+6Mqhdr63f6snxQWshpBDgHNOYtIxBHSEHjtKg5pB/Sj7EDaVBzSD+lH2IwGjs9rS51NTho0uMUYHwQlqRVV2ppthidQvm1RtEJPwXrbLVTqLcziKoz923tGg5pB/Sj7F5bmRRUGI70g/pR9iCuvs6zNkf3jTcY/wDhFy+qjCo3xhp4q2BkMMcI2LEiJjWA8LXkgKr1/wA0fZ1HQY/46v8At/ClWrU5UmwtPBZnd63yUFfPGgs6utCoFNRQmaY+KNA6XHQB6V6oomqcQ1Xr9FqndXOIdbse7tnWfZsFI6ngnkYMZZnxMeXPOdxxcCcMdCvLVvZThw+r1M3rk1z/AOhubnWZzGm/oRf/ACtiM9mRxRsDImNjYNDGNDWj8m4BBXL3+EpvUf8AEILBSfwlP/KZ/iEFwQeLvDn1v3RlULtfW7/Vk+KC1oCDWtO0qSzaGStq3ZMMQ/NxOhrRrJWaaczhpv3qbdO6riHOnzXjvpXGKLuNBEeJiRDGPv63vP8AuCmfDbj3c3NV7W14jxTH6R/cvC9V1aSwqalIqzNUzk4syQ3gtHGGvSs2rm5412hpsRHnMy6PYUtRLYtDJUEmd8DC8nSThpKh18um0szNqmZ5w3xpC8t6vvGMjh94/FGHG783yk3wVb4HCSlpztaBh0OLOM4H1sV7r0NN2PPir6pGk6pc08+PNP0bVz7o1d4KSO0pi6js6QnJc4d1kwOcsGjJx8Yqrnp1VNWJmML+vr9uaM0RO739P7dNsyyrPsylFNQwiKIcY6XOPK92lxU6i3FMYhz1/UV3at1c5ltr20iAgrV8PCU3qP8AiEFgpP4Sn/lM/wAQguCDxd4c+t+6Mqhdr63f6snxQWtBlBza+9e+1bxxWPFI1kFM4Rl7jgwSuGMj3E5uAMymWacU5cz1O73b3bjiP39f0Sct87vWFQNs+xWbcMIw2TO2Iv1vc/S8k8i8dmqqcykz1GzYo2Wvix+n+0HS0NTa0z7w3klMNltIynuBBlwPBhgZpydWZbZnb8NPKBRaquz3r84o/f2hcbGvvYtpVZpGB1K7DuGzZLGv1ZLc+Y8gUauzMLrTdTtXKtvy/TKwOeyNpfI4Rxtzue85IHpJWpYzOOVTitKhtHbUdBUh8jcoZYxzZWIa4Y6R0r1NE08tFnU27udk5w5TZX0U29V261tuRtgsimOMj2yNeajDPgzJJID9ZOgdKlTfiI8ckW5y7AxjI2NjjaGRsAaxjcwa0ZgAOQBQ29lAQEBBWr4eEpvUf8QgsFJ/CU/8pn+IQXBB4vGE7vW/dGVQu+djttzHZnHZG/n/AKEEpem2aux7L23S022ZNkawg45LAfGdk59WC2W6N0oeu1NVm3upjPlT23i+kK1c1HBJGw64IMgdeTFSO3bp5Uv4zWXfliY+0fzKruiyq+WO0ZHwybI4VTy3ZHh+PCxbiMTit/p4VePjmK/HnysFDaVybKaJIqOotOrGcSVOS1gPQ3OB7CtM01z7LC1e0trima6vd4Wnad5L1YOionyUlMeBFTMc5jSc2d3jFeqaaaGu9evarin4Y+iOrrAtqz9hfV0MjRJwmcEvzg6HZGOB6F6iuJR7mku28bqZTrbDvpeV7ZbQe6Gmdnbs/AYPVhGf2+1at9FHCd+G1Wp81+I9/wCkxZFg0lkh4icZJn8GWZ2sA6ANQUe5cmpd6PQ0WI8eZnmUitaYICAgICCsXueDPAwaWxuJ/M5vggsdK0imgadIjYD1QguOxu5EGLRhLKgu8V+cIKZb9FPR1wtCDMx7g7KHiSdPQUZS1n3goqlg2V4p5/GY7M0n7pQSBqoDpmYf1jtQyjbQsa7loybLWQwSzaDJlZLjhylpGK9U3JjhGvaS1cnNUZl4QXYulA7KZS05P33Zf+RK9Tdq+rXT0+xT+WEu2ala0MZJG1jeK1rmgD8gtaZHh9CpgGiZg/WO1Gcm2afKzzM6w7UFefUU2yO7tHxj4zeVGHztim89H1moG2Kbz0fWagbYpvPR9ZqBtim89H1moG2Kbz0fWb2oNSstuzqVpxkEsmqOM4n26AggKCCpti0zUTeCa4OlOoAcVgQXqyqR1VXxRgcHHKf6oQXfJbyIPOpp2zx5J0+KelBB1FNhlQzsBa4YOac4IRlA1V1KaQl1NKYcfEcMpvajDT3n1HOIuq5A3n1Hn4uq5A3n1Hn4uq5A3n1Hn4uq5A3n1Hn4uq5BkXPqMR3xF1XIK8+59Rlu74i4x8V3KgxvPqOcRdVyBvPqOcRdVyBvPqOcRdVyBvPqOcRdVyBvPqOcRdVyDYprpRtONTUZY8iMZI9pQWCioQAylpIsB4rG/E9qC52PZTaGDhcKd/hHfsEEigIPiSKORuS8YhBpyWXF4ri33oPPcv8AE93zQNy/xPd80Dcv8T3fNA3L/E93zQNy/wAT3fNA3L/E93zQRzrsAuJ2zpJPE+aDG9cc5/s+aBvXHOf7Pmgb1xzn+z5oG9cc5/s+aBvXHOf7Pmg9YbqwY90mc4cgGHagmKSgpaRuTAwNx0u1n0lBsICD/9k=",

				imageTo: true,
				/*控制第一张照片上传的显示与否*/
				imagesTo: true,
				/*控制第二张照片上传的显示与否*/
				Close1: true,
				/*控制第一个删除图片的按钮显示与否*/
				Close2: true,
				/*控制第二个删除图片的按钮显示与否*/
				Show: false,
				Show1: false,
				caValue: {
					isCAOpen: false,
					image: "",
					context_id: "",
					agentCode: this.$route.params.agentCode,
					applyCode: this.$route.params.applyCode,
					orderId: this.$route.params.orderId
				},
				bankImage: {
					positive: "",
					negative: ""
				},
				check: false,
				dict: {
					bankList: bankList,
					bankBatchList: bankBatchList
				},
				payChangeInfo: {
					applyCode: "",
					payInfo: {
						sumPremL: "", //支付保费
						products: "",
						bankAccName: "",
						products: {
							product: []
						},
						newBankAccNo: "", //新卡号
						newBankCode: "" //银行字典code
					},
					custInfo: {
						appnt: {
							appntName: "",
							idNo: "",
							idType: "",
							appntSex: "",
							mobile: ""
						},
						insurants: {
							firstInsurant: {
								products: {
									product: []
								}
							}
						}
					}
				},
				btn: true,
				shareLink: "",
				agentCode: this.$route.params.agentCode,
				orderId: this.$route.params.orderId,
				applyCode: this.$route.params.applyCode,
				sheetVisible: false,
				actions: [{
						name: "刷新页面",
						method: this.load
					},
					{
						name: "提取签字",
						method: this.load
					},
					{
						name: "分享链接",
						method: this.share
					}
				]
			};
		},
		beforeMount() {
			this.getMsg()
			let host = window.globalConfig.rootUrl.split("/")[2];
			let protocol = window.globalConfig.rootUrl.split(":")[0];
			this.shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/bankChangeShare/" + this.$route.params.orderId + "/" + this.$route.params.applyCode + "/-1/-1/-1";
		},
		computed: {
			caShow() {
				return this.caValue.isCAOpen;
			}
		},
		watch: {
			caShow(val, oldval) {
				if(!val) {
					this.getMsg();
				}
			}
		},
		mounted() {
			if(this.screenWidth > this.screenHeight) {
				this.darkHeight = this.screenWidth;
			} else {
				this.darkHeight = this.screenHeight;
			}
			this.orient();
			window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.orient, false);

			let orgId = utils.cache.get("personsal").orgId;
			if(orgId.substring(0, 4) != "8611") {
				for(let i in this.dict.bankList.bank.item) {
					if(this.dict.bankList.bank.item[i].code == "321") {
						this.dict.bankList.bank.item.splice(i, 1);
					}
				}
				for(let i in this.dict.bankBatchList.bank.item) {
					if(this.dict.bankBatchList.bank.item[i].code == "321") {
						this.dict.bankBatchList.bank.item.splice(i, 1);
					}
				}
			}
			if(orgId.substring(0, 4) != "8661") {
				for(let i in this.dict.bankList.bank.item) {
					if(this.dict.bankList.bank.item[i].code == "314") {
						this.dict.bankList.bank.item.splice(i, 1);
					}
				}
				for(let i in this.dict.bankBatchList.bank.item) {
					if(this.dict.bankBatchList.bank.item[i].code == "314") {
						this.dict.bankBatchList.bank.item.splice(i, 1);
					}
				}
			}
			if(this.bankImage !== "" && this.bankImage.positive !== "") {
				let positive = this.$refs.bankPositive;
				positive.style.display = "inline-block";
				positive.src = "data:image/jpeg;base64," + this.bankImage.positive;
			}
			if(this.bankImage !== "" && this.bankImage.negative !== "") {
				let negative = this.$refs.bankNegative;
				negative.style.display = "inline-block";
				negative.src = "data:image/jpeg;base64," + this.bankImage.negative;
			}
			if(this.bankImage.positive != '') {
				this.isshowChoice.positive = true
				this.isshowChoice.negative = true
				this.isdel.positive = true
			}
			if(this.bankImage.negative != '') {
				this.isshowChoice.negative = true
				this.isdel.negative = true
			}
			if(this.bankImage.positive == '' && this.bankImage.negative == '') {
				this.isshowChoice.positive = true
			}
		},
		methods: {
			openBankListBox(type) {
				if(type == 1) {
					this.showBankInfo.showBankInfo = true
				} else if(type == 2) {
					this.showBankInfo.showBankBatchInfo = true
				}
			},
			selectBanks(item) {
				this.selectBank = item;
			},
			selectBankSave() {
				if(this.selectBank.code == undefined) {
					alert_n22.alert("提示", "请选择银行", "确定");
				} else {
					this.showBankInfo.newBankCode = this.selectBank.code;
					this.showBankInfo.newBankName = this.selectBank.text;
					this.showBankInfo.showBankInfo = false;
					this.showBankInfo.showBankBatchInfo = false;
					this.selectBank = {};
				}
			},
			orient() {
				if(window.orientation == 90 || window.orientation == -90) {
					//ipad、iphone竖屏；Andriod横屏
					this.screenWidth = window.screen.width;
					this.screenHeight = window.screen.height;
					//alert_n22.alert("横屏", this.screenWidth+' & '+this.screenHeight, "确定")
					$(".countdown").css({
						margin: "15% auto"
					});
				} else if(window.orientation == 0 || window.orientation == 180) {
					//ipad、iphone横屏；Andriod竖屏
					this.screenWidth = window.screen.width;
					this.screenHeight = window.screen.height;
					//alert_n22.alert("竖屏", this.screenWidth+' & '+this.screenHeight, "确定")
					$(".countdown").css({
						margin: "35% auto"
					});
				}
			},
			//请求支付
			/*
			银联--支付				     MOPAYACCEPTYL
			银联--异步获取支付结果	 MOPAYSTATUEACCEPT
			转批扣			           MOBATCHNBPAY
			*/
			paymentRequest() {
				if(this.check) {
					if(this.showBankInfo.newBankCode == '') {
						this.$refs.showalert.showMOdal("请选择银行类型!");
					} else if(this.payChangeInfo.payInfo.newBankAccNo == '') {
						this.$refs.showalert.showMOdal("银行卡号不能为空!");
					} else {
						let msg = utils.valid.BankCode(this.showBankInfo.newBankCode, this.payChangeInfo.payInfo.newBankAccNo);
						if(msg != undefined && msg != "") {
							this.$refs.showalert.showMOdal(msg);
						}
						if(msg == "" || msg == null) {
							if(this.caValue.image === null || this.caValue.image == "") {
								this.$refs.showalert.showMOdal("投保人签字不能为空!");
							} else if(this.bankImage.positive == null && this.bankImage.negative == null) {
								this.$refs.showalert.showMOdal("银行卡照片至少上传一张!");
							} else if(
								this.bankImage.positive == "" &&
								this.bankImage.negative == ""
							) {
								this.$refs.showalert.showMOdal("银行卡照片至少上传一张！");
							} else {
								this.getPolicyImg(
									() => {
										alert_n22.confirm(
											"提示",
											'<p>请确认银行变更确认书中的<font color="red">签字信息是否完整！</font></p>',
											"确定",
											"取消",
											flag => {
												if(this.pays == "1") {
													console.log("实时扣款转账");
													if(
														this.showBankInfo.newBankCode == "314" ||
														this.showBankInfo.newBankCode == "321"
													) {
														this.$refs.showalert.showMOdal(
															"该银行暂不支持实时支付！"
														);
														return;
													} else {
														this.isShowZ = true;
														this.payCount++;
														if(this.payCount == 1) {
															let requ = {
																policy: {
																	ID: this.payChangeInfo.custInfo.appnt.idNo, //投保人证件号
																	activityid: "Y",
																	agentCode: this.agentCode, //代理人工号
																	applyCode: this.payChangeInfo.applyCode, //投保单号
																	bankCode: this.showBankInfo.newBankCode, //投保人所选银行code
																	bankNo: this.payChangeInfo.payInfo.newBankAccNo, //投保人银行卡号
																	tel: this.payChangeInfo.custInfo.appnt.mobile, //代理人手机号
																	applicant_signt: this.caValue.image.substring(22),
																	bankImageFront: this.bankImage.positive,
																	bankImageBack: this.bankImage.negative
																}
															};
															console.log("支付请求接口", requ);
															utils.http.postFast(
																"MOPAYACCEPTYL",
																requ,
																body => {
																	this.payCount = 0;
																	let result = body.policy;
																	if(result.resultCode == 0) {
																		//alert_n22.confirm('温馨提示', result.resultMessage + "<br>15s后将为您查询状态,请稍等", '确定', '取消', (flag) => {
																		this.isShowZ = true;
																		let timer = setInterval(() => {
																			this.isShowCountDown = true;
																			console.log(this.countdown);
																			this.countdown--;
																			if(this.countdown == 0) {
																				clearInterval(timer);
																				this.isShowCountDown = false;
																				this.countdown = 15;
																				this.serialNo = result.serialNo;
																				let requ = {
																					policy: {
																						agentCode: this.agentCode, //代理人工号
																						applyCode: this.payChangeInfo
																							.applyCode, //投保单号
																						serialNo: this.serialNo
																					}
																				};
																				utils.http.postFast(
																					"MOPAYSTATUEACCEPT",
																					requ,
																					body => {
																						this.$router.push({
																							name: "insureResult",
																							params: {
																								orderId: this.$route.params
																									.orderId,
																								result: body.policy
																							}
																						});
																					}
																				);
																			}
																		}, 1500);
																		//})
																		//this.isShowZ = false
																	} else {
																		this.$router.push({
																			name: "insureResult",
																			params: {
																				orderId: this.$route.params.orderId,
																				result: body.policy
																			}
																		});
																		//alert_n22.alert('温馨提示', result.resultMessage);
																		this.isShowZ = false;
																	}
																},
																true
															);
														}
													}
												} else {
													console.log("转批扣");
													this.payCount++;
													if(this.payCount == 1) {
														let requ = {
															policy: {
																accountName: this.payChangeInfo.custInfo.appnt.appntName, //投保人姓名
																accountNo: this.payChangeInfo.payInfo.newBankAccNo, //投保人银行卡号
																applyCode: this.payChangeInfo.applyCode, //投保单号
																bankCode: this.showBankInfo.newBankCode, //投保人所选银行code
																applicant_signt: this.caValue.image.substring(22),
																bankImageFront: this.bankImage.positive,
																bankImageBack: this.bankImage.negative,
																activityid: "Y"
															}
														};
														console.log("支付请求接口", requ);
														utils.http.postFast("MOBATCHNBPAY", requ, body => {
															this.payCount = 0;
															this.$router.push({
																name: "insureResult",
																params: {
																	orderId: this.$route.params.orderId,
																	result: body.policy
																}
															});
														});
													}
												}
											}
										);
									},
									() => {}
								);
							}
						}
					}
				} else return false;
			},
			load() {
				window.location.reload();
			},
			toast: function(msg) {
				Toast({
					message: msg,
					duration: 1500
				});
			},
			share: function() {
				let requ = {
					data: {
						orderId: this.orderId,
						policy: {
							newBankCode: this.showBankInfo.newBankCode,
							newBankName: this.showBankInfo.newBankName,
							newBankAccNo: this.payChangeInfo.payInfo.newBankAccNo,
							newMobile: this.payChangeInfo.custInfo.appnt.mobile,
							payMode: this.pays,
							imgList: {
								positive: this.bankImage.positive,
								negative: this.bankImage.negative,
							}
						}
					},
					modelName: "moPolicyBusinessService",
					methodName: "savePolicyInfo"
				};
				utils.http.post("BusinessService", requ).then(response => {
					if(response.data.header.responseCode == "0") {
						console.log("==>分享链接", this.shareLink);
						utils.cache.removeItem("bankinfo");
						utils.cache.removeItem("bankImg");
						utils.cache.removeItem("bankcaimage");
						Wechat.share({
								message: {
									title: "银行变更确认",
									description: "银行变更确认",
									thumb: "www/static/img/common/0.png",
									mediaTagName: "链接",
									media: {
										type: Wechat.Type.WEBPAGE,
										webpageUrl: this.shareLink
									}
								},
								scene: Wechat.Scene.SESSION // share to Timeline
							},
							function() {
								utils.ui.modal.afterOpen();
								MessageBox({
									title: "提示",
									message: "分享成功"
								}).then(() => {
									utils.ui.modal.beforeClose();
								});
							},
							function(reason) {
								utils.ui.modal.afterOpen();
								MessageBox({
									title: "提示",
									message: reason
								}).then(() => {
									utils.ui.modal.beforeClose();
								});
							}
						);
					} else {
						alert_n22.alert('提示', response.data.header.errorMessage, '确定')
					}
				});
			},
			//返回到支付
			goPay() {
				this.$router.push({
					name: "pay",
					params: {
						orderId: this.orderId,
						applyCode: this.applyCode
					}
				});
			},
			faceTest() {
				let requ = {
					data: {
						orderId: this.orderId,
						policy: {
							newBankCode: this.showBankInfo.newBankCode,
							newBankName: this.showBankInfo.newBankName,
							newBankAccNo: this.payChangeInfo.payInfo.newBankAccNo,
							newMobile: this.payChangeInfo.custInfo.appnt.mobile,
							payMode: this.pays,
							imgList: {
								positive: this.bankImage.positive,
								negative: this.bankImage.negative,
							}
						}
					},
					modelName: "moPolicyBusinessService",
					methodName: "savePolicyInfo"
				};
				utils.http.post("BusinessService", requ).then(response => {
					if(response.data.header.responseCode == "0") {
						//this.openCADialog()
						MAPlugin.hybridCallAction(
							"hybrid://MAFaceIdentify:401/invokeFaceIdentify?",
							callbackSucc => {
								this.ficeDistinguish(callbackSucc);
							},
							callbackFail => {
								this.$refs.showalert.showMOdal(callbackFail);
							}
						);
					} else {
						alert_n22.alert('提示', response.data.header.errorMessage, '确定')
					}
				});
			},
			hqPolicyInfo() {
				let requ = {
					data: {
						orderId: this.orderId
					},
					modelName: "moPolicyBusinessService",
					methodName: "hqPolicyInfo"
				};
				utils.http.post("BusinessService", requ).then(response => {
					if(response.data.header.responseCode == "0") {
						if(response.data.response.data.code == 0) {
							this.showBankInfo.newBankCode = response.data.response.data.policy.newBankCode
							this.showBankInfo.newBankName = response.data.response.data.policy.newBankName
							this.payChangeInfo.payInfo.newBankAccNo = response.data.response.data.policy.newBankAccNo
							if(response.data.response.data.policy.newMobile != '') {
								this.payChangeInfo.custInfo.appnt.mobile = response.data.response.data.policy.newMobile
							}
							if(response.data.response.data.policy.payMode != '') {
								this.pays = response.data.response.data.policy.payMode
							}
							this.bankImage.positive = response.data.response.data.policy.imgList.positive
							this.bankImage.negative = response.data.response.data.policy.imgList.negative

							if(this.bankImage !== "" && this.bankImage.positive !== "") {
								let positive = this.$refs.bankPositive;
								positive.style.display = "inline-block";
								positive.src = "data:image/jpeg;base64," + this.bankImage.positive;
							}
							if(this.bankImage !== "" && this.bankImage.negative !== "") {
								let negative = this.$refs.bankNegative;
								negative.style.display = "inline-block";
								negative.src = "data:image/jpeg;base64," + this.bankImage.negative;
							}

							if(this.bankImage.positive != '') {
								this.isshowChoice.positive = true
								this.isshowChoice.negative = true
								this.isdel.positive = true
							}
							if(this.bankImage.negative != '') {
								this.isshowChoice.negative = true
								this.isdel.negative = true
							}
							if(this.bankImage.positive == '' && this.bankImage.negative == '') {
								this.isshowChoice.positive = true
							}
						}
					} else {
						alert_n22.alert('提示', response.data.header.errorMessage, '确定')
					}
				});
			},
			//进行人脸识别接口调用方法
			ficeDistinguish: function(image) {
				if(
					this.appnt.appntName == undefined ||
					this.appnt.appntName == "" ||
					this.appnt.idNo == undefined ||
					this.appnt.idNo == "" ||
					this.appnt.idType == undefined ||
					this.appnt.idType == ""
				) {
					console.log(
						"此处应为预览页面返回无调用获取保单接口需缓存获取对应保单中的投保人用作人脸识别数据"
					);
					let appnt = utils.cache.get(
						"BANK_CHANGE_" + this.$route.params.applyCode
					);
					this.appnt.appntName = appnt.appntName;
					this.appnt.idType = appnt.idType;
					this.appnt.idNo = appnt.idNo;
					utils.cache.removeItem("BANK_CHANGE_" + this.$route.params.applyCode);
				}
				let requ = {
					policy: {
						agentCode: this.agentCode,
						name: this.appnt.appntName,
						cardId: this.appnt.idNo,
						idType: this.appnt.idType,
						functionCode: "BANKCHANGE",
						imageByte: image,
						applyCode: this.applyCode,
						policyCode: this.policyCode
					}
				};
				console.log(JSON.stringify(requ));
				utils.http.postFast("FACEIDKSHL", requ, body => {
					if(body.policy.resultCode == "0") {
						console.log(body.policy.resultMsg);
						this.openCADialog();
					} else {
						this.$refs.showalert.showMOdal(body.policy.resultMsg);
					}
				});
			},
			openCADialog() {
				this.caValue.isCAOpen = !this.caValue.isCAOpen;
				this.caValue.image = "";
				this.caValue.context_id = 24 + "BG";
			},
			// 获取银行变更页面信息
			getMsg() {
				let getPayInfo = {
					policy: {
						substepNo: "",
						orderCode: this.orderId,
						stepNo: '1,2,8',
						nothave:'2,3'
					}
				};
				utils.http.postFast("MOHQPOLICYMSG", getPayInfo, body => {
					this.payChangeInfo = body.policy;
					//提取保单信息中的投保人用作人脸识别使用
					this.appnt.appntName = this.payChangeInfo.custInfo.appnt.appntName;
					this.appnt.idType = this.payChangeInfo.custInfo.appnt.idType;
					this.appnt.idNo = this.payChangeInfo.custInfo.appnt.idNo;
					let idCards = this.payChangeInfo.custInfo.appnt.imageData;
					if(idCards != undefined && idCards.length > 0) {
						for(var i = 0; i < idCards.length; i++) {
							if(idCards[i].imageName == "24BG") {
								//投保人
								var image = document.getElementById("xss_20");
								image.setAttribute("crossOrigin", "anonymous");
								image.src = "";
								image.src = idCards[i].reaPath;
								let than = this;
								image.onload = function() {
									var data = than.getBase64Image(image);
									than.caValue.image = data;
								};
							}
						}
					}
					this.hqPolicyInfo();
				});
			},
			// 获取银行变更页面信息
			getPolicyImg(success, fail) {
				let getPayInfo = {
					policy: {
						substepNo: "",
						orderCode: this.orderId,
						stepNo: '1,2,8',
						nothave:'2,3'
					}
				};
				console.log("获取银行变更页面请求参数", getPayInfo);
				utils.http.postFast("MOHQPOLICYMSG", getPayInfo, body => {
					success();
					let idCards = this.payChangeInfo.custInfo.appnt.imageData;
					if(idCards != undefined && idCards.length > 0) {
						for(var i = 0; i < idCards.length; i++) {
							if(idCards[i].imageName == "24BG") {
								//投保人
								var image = document.getElementById("xss_20");
								image.setAttribute("crossOrigin", "anonymous");
								image.src = "";
								image.src = idCards[i].reaPath;
								let than = this;
								image.onload = function() {
									var data = than.getBase64Image(image);
									than.caValue.image = data;
								};
							}
						}
					}
					this.hqPolicyInfo();
				});
			},
			// 跳转银行变更预览页面
			goPreview() {
				let requ = {
					data: {
						orderId: this.orderId,
						policy: {
							newBankCode: this.showBankInfo.newBankCode,
							newBankName: this.showBankInfo.newBankName,
							newBankAccNo: this.payChangeInfo.payInfo.newBankAccNo,
							newMobile: this.payChangeInfo.custInfo.appnt.mobile,
							payMode: this.pays,
							imgList: {
								positive: this.bankImage.positive,
								negative: this.bankImage.negative,
							}
						}
					},
					modelName: "moPolicyBusinessService",
					methodName: "savePolicyInfo"
				};
				utils.http.post("BusinessService", requ).then(response => {
					if(response.data.header.responseCode == "0") {
						utils.cache.set("bankinfo", this.payChangeInfo);
						utils.cache.set("bankImg", this.bankImage);
						utils.cache.set("bankcaimage", this.caValue.image);
						//缓存保单中的投保人信息,预览返回后人脸识别需获取使用,因返回后未调用获取保单接口顾拿不到投保人信息
						utils.cache.set(
							"BANK_CHANGE_" + this.$route.params.applyCode,
							JSON.stringify(this.payChangeInfo.custInfo.appnt)
						);
						this.btn = false;
						this.$router.push({
							name: "preview",
							params: {
								payChangeInfo: JSON.stringify(this.payChangeInfo),
								orderId: this.$route.params.orderId,
								applyCode: this.$route.params.applyCode,
								agentCode: this.$route.params.agentCode,
								bankName: this.showBankInfo.newBankName
							}
						});
					} else {
						alert_n22.alert('提示', response.data.header.errorMessage, '确定')
					}
				});
			},
			getBase64Image: function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL;
				// return dataURL.replace("data:image/png;base64,", "");
			},
			select(params) {
				if(params == 1) {
					this.Show = true;
					this.Show1 = false;
				} else {
					this.Show1 = true;
					this.Show = false;
				}
			},
			//调取本地相册
			getNewPhotos(index) {
				if(index == 1) {
					this.Show = false;
				} else if(index == 2) {
					this.Show1 = false;
				}
				getNewPhoto(
					pictureSource.SAVEDPHOTOALBUM,
					imageData => {
						if(index == "1") {
							this.setPositiveData(imageData);
							this.showPhotoArea();
						} else if(index == "2") {
							this.setNegativeData(imageData);
							this.showPhotoArea();
						}
					},
					message => {
						// alert(message)
					}
				);
			},
			//调用相机获取图片
			capturePhoto: function(tag) {
				this.Show = false;
				this.Show1 = false;
				capturePhotoCallback(
					imageData => {
						if(tag == "1") {
							this.setPositiveData(imageData);
							this.showPhotoArea();
						} else if(tag == "2") {
							this.setNegativeData(imageData);
							this.showPhotoArea();
						}
					},
					message => {
						// alert(message)
					}
				);
			},
			setPositiveData(imageData) {
				let positive = this.$refs.bankPositive;
				positive.style.display = "inline-block";
				positive.src = "data:image/jpeg;base64," + imageData;
				this.bankImage.positive = imageData;
			},
			setNegativeData(imageData) {
				let negative = this.$refs.bankNegative;
				negative.style.display = "inline-block";
				negative.src = "data:image/jpeg;base64," + imageData;
				this.bankImage.negative = imageData;
			},
			showPhotoArea() {
				this.isshowChoice.positive = true;
				this.isdel.positive = true;
				this.isshowChoice.negative = true;
				this.isdel.negative = true;
			},
			deletingImages(index) {
				if(index == 1) {
					if(window.confirm("确定要删除此照片吗?")) {
						this.isdel.positive = false;
						this.bankImage.positive = "";
						$("#bankPositive").attr("src", "./static/img/backlog/yhk1.jpg");
					}
				} else if(index == 2) {
					if(window.confirm("确定要删除此照片吗?")) {
						this.isdel.negative = false;
						this.bankImage.negative = "";
						$("#bankNegative").attr("src", "./static/img/backlog/yhk2.jpg");
					}
				}
			}
		}
	};
</script>

<style lang='scss' scoped type="text/css">
	.main-contents {
		bottom: 50px;
		ul {
			width: 100%;
			box-sizing: border-box;
			li {
				width: 100%;
				height: 55px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 15px;
				border-bottom: 1px solid #ddd;
				box-sizing: border-box;
				font-size: 14px;
				input {
					text-align: left;
				}
			}
			li>span:first-child {
				width: 40%;
				font-size: 16px;
				color: #333;
			}
			li>span+span {
				font-size: 14px;
				color: #3E3A39;
			}
		}
		ul+div {
			font-size: 14px;
			padding: 10% 0 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			p {
				line-height: 2;
			}
		}
	}
	
	.photo {
		display: block;
		width: 100%;
		line-height: 45px;
		border: 0;
		background: #fff;
	}
	/*影像件新修改样式*/
	
	.div-flex {
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	
	.div-flex>div {
		width: 135px;
		height: 100px;
		position: relative;
		margin-right: 2%;
		margin-bottom: 3px;
	}
	
	.div-flex>span {
		position: absolute;
		top: 2%;
		right: 2%;
		display: block;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		text-align: center;
		line-height: 20px;
		background: #ccc;
		color: #000;
		font-size: 1rem;
		z-index: 1000;
	}
	
	.popup {
		width: 70%;
		height: 180px;
		border-radius: 10px;
		padding: 10px;
	}
	
	.iptSty {
		border: 1px solid #bbbbbb;
		width: 105px;
	}
	
	.common {
		border-radius: 8px;
		line-height: 40px;
		height: 40px;
	}
	
	.btnStyle {
		display: inline-block;
	}
	
	.bankLists {
		background: #F3F3F7;
		width: 90%;
		height: 95%;
		text-align: center;
		overflow: hidden;
		.title {
			font-size: 18px;
			font-weight: bold;
			line-height: 40px;
		}
		.title+div {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.content {
				border: 1px solid #f3f3f7;
				border-radius: 5%;
				background: #fff;
				width: 46%;
				height: 54px;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 1% 2% 2%;
				p {
					width: 35%;
					padding: 0 2%;
					img {
						width: 30px;
						margin: 0 2%;
					}
				}
				div {
					width: 65%;
					display: flex;
					flex-direction: column;
					margin-left: 1%;
					overflow: hidden;
					span {
						font-size: 12px;
						color: #000;
						line-height: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: left;
					}
					span+span {
						font-size: 10px;
						color: #e60020;
					}
				}
			}
		}
		.save {
			width: 98%;
			background: #fdb92c;
			border-radius: 3px;
			color: #fff;
			font-size: 14px;
			line-height: 40px;
			margin: 2% 1% 5%;
		}
	}
	.rang-centenr {
	  width: 200px;
	  height: 200px;
	  border: 5px solid #F4A200;
	  border-radius: 50%;
	  background: #f4a200;
	  margin: 35% auto;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
</style>
