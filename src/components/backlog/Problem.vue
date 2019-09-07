<template>
	<div>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue"></NewCA>
		<Headerbtns :title="'问题件回复'" v-show="!caValue.isCAOpen">
			<div @click="go('/backlog')" replace slot="left">
	           <i class="fa fa-angle-left" ></i>
			</div>
			<div slot="right" @click="sheetVisible = !sheetVisible" v-clipboard:success="onCopy" v-clipboard:error="onError" v-clipboard:copy="shareLink">
	          <i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" ></i>
			</div>
		</Headerbtns>
		<div class="main-contents" v-show="!caValue.isCAOpen">
			<div v-show="show1">
				<div class="mainCaption">投保审核通知书（非打印合同类）</div>
				<div class="fuCaption">
					<p>审核事项</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：
						<br> {{questcontent1}}
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项 做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。 具体回复内容如下：
						<textarea v-model="content1"></textarea>
						<input type="checkbox" v-model="shenNC" />本人由于以下原因，要求撤销此次投保申请
						<br/>
						<input type="radio" v-model="chenNY" value="1" />经济原因
						<input type="radio" v-model="chenNY" value="2" />险种不理想
						<input type="radio" v-model="chenNY" value="3" />服务不理想
						<input type="radio" v-model="chenNY" value="4" />其他
						<span>提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人 、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。
						<br> 2.如某一事项与原投保书有不一致之处，一律以本通知书为准。
						</span>
					</div>
				</div>
			</div>

			<div v-show="show2">
				<div class="mainCaption">投保审核通知书（打印合同类）</div>
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据您所提交的投保申请，经详细审核后，需要您对以下问题进行确认并在客户说明栏中回复：
						<br> {{questcontent2}}
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						本人已收悉贵公司的《投保审核通知书》，对其内容已全部了解，对审核事项 做以下回复说明，将其作为投保事项的补充说明并确保提交资料真实有效。 具体回复内容如下：
						<textarea v-model="content2"></textarea>
						<input type="checkbox" v-model="shenYC">本人由于以下原因，要求撤销此次投保申请
						<br>
						<input type="radio" v-model="chenYY" value="1">经济原因
						<input type="radio" v-model="chenYY" value="2">险种不理想
						<input type="radio" v-model="chenYY" value="3">服务不理想
						<input type="radio" v-model="chenYY" value="4">其他
						<span>提示：1.本通知书是投保人、被保险人或法定监护人做相应变更、补充说明或确认之用，需经投保人 、被保险人或法定监护人本人签字认可后方能生效，并作为投保书的组成部分。
							<br> 2.如某一事项与原投保书有不一致之处，一律以本通知书为准。
						</span>
					</div>
				</div>
			</div>

			<div v-show="show3">
				<div class="mainCaption">业务员通知书（非打印合同类）</div>
				<div class="fuCaption">
					<p>审核事项</p>
					<p>
						尊敬的 {{agent.agentName}} {{agent.agentSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：
						<br> {{questcontent3}}
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。 &nbsp;具体回复内容如下：
						<textarea v-model="content3"></textarea>
						<span>提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。
							<br> 2.如某一事项与原投保书有不一致之处，一律以本通知书为准。
							<br> 3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。
						</span>
					</div>
				</div>
			</div>

			<div v-show="show4">
				<div class="mainCaption">业务员通知书（打印合同类）</div>
				<div class="fuCaption">
					<p>审核事项</p>
					<p>
						尊敬的 {{agent.agentName}} {{agent.agentSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据您所提交的投保申请及业务人员报告书，经详细审核后，需要您对以下问题进行确认并在业务人员说明栏中进行补充更正：
						<br> {{questcontent4}}
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						本人已收悉公司的《业务员通知书》，对其内容已全部了解，现对审核事项做以下回复说明并保证回复说明真实有效。 &nbsp;具体回复内容如下：
						<textarea v-model="content4"></textarea>
						<span>提示：1.本通知书是业务员做相应变更、补充说明或确认之用，需经业务员签字认可后方能生效。
							<br> 2.如某一事项与原投保书有不一致之处，一律以本通知书为准。
							<br> 3.本通知书应自首次打印之日起三日内返回公司,未按时返回的将影响该投保书的新契约处理进度。
						</span>
					</div>
				</div>
			</div>

			<div v-show="show5">
				<!--<div class="mainCaption">新契约除责通知书（非打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请做出如下特别约定：
						<b style="font-weight:bold;">{{chuzeList1.noticeremark}}</b>
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="chuzeList1.selected1" @click="selected('c',1,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="chuzeList1.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="chuzeList1.selected2" @click="selected('c',1,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="chuzeList1.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，但希望保留主险，烦请将您希望取消的附加险列明。</p>
						<!--<input type="checkbox" v-model="chuzeList1.selected3" @click="selected('c',1,3)">本人希望保留主险，取消-->
						<input type="checkbox" v-model="chuzeList1.selected3">本人希望保留主险，取消
						<!--已选列表 -->
						<div v-for="item in chuzeList1.extraList.selected" v-if="chuzeList1.extraList.selected.length!=0">
							<p>{{item.riskname}}</p>
							<img src="../../../static/img/backlog/delete.png" alt="" @click="deleteExtra('c',1,item)" />
						</div>
						<!--未选列表 -->
						<div>
							<p v-show="!chuzeList1.selected3" style="text-align:center;color:#666;">请选择</p>
							<p v-show="chuzeList1.selected3">
								<picker @change="chooseExtra('c',1)" v-model="chuzeList1.extraList.extra" :values="chuzeList1.extraList.extra" :items="chuzeList1.extraList.tobeSelected" code="riskCode" text="riskname" default-text="请选择"></picker>
							</p>
							<img src="../../../static/img/backlog/add.png" alt="" @click="addExtra" />
						</div>
						&nbsp;&nbsp; 保险
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>
			<div v-show="show6">
				<!--<div class="mainCaption">新契约除责通知书（打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请做出如下特别约定：
						<b style="font-weight:bold;">{{chuzeList2.noticeremark}}</b>
					</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="chuzeList2.selected1" @click="selected('c',2,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="chuzeList2.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="chuzeList2.selected2" @click="selected('c',2,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="chuzeList2.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，但希望保留主险，烦请将您希望取消的附加险列明。</p>
						<!--<input type="checkbox" v-model="chuzeList2.selected3" @click="selected('c',2,3)">本人希望保留主险，取消-->
						<input type="checkbox" v-model="chuzeList2.selected3">本人希望保留主险，取消
						<!--已选列表 -->
						<div v-for="item in chuzeList2.extraList.selected" v-if="chuzeList2.extraList.selected.length!=0">
							<p>{{item.riskname}}</p>
							<img src="../../../static/img/backlog/delete.png" alt="" @click="deleteExtra('c',2,item)" />
						</div>
						<!--未选列表 -->
						<div>
							<p v-show="!chuzeList2.selected3" style="text-align:center;color:#666;">请选择</p>
							<p v-show="chuzeList2.selected3">
								<picker @change="chooseExtra('c',2)" v-model="chuzeList2.extraList.extra" :values="chuzeList2.extraList.extra" :items="chuzeList2.extraList.tobeSelected" code="riskCode" text="riskname" default-text="请选择"></picker>
							</p>
							<img src="../../../static/img/backlog/add.png" alt="" @click="addExtra" />
						</div>
						&nbsp;&nbsp; 保险
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>
			<div v-show="show7">
				<!--<div class="mainCaption">新契约加费通知书（非打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请做出如下承保决定：
					</p>
					<table>
						<thead>
							<tr>
								<th>投保险种</th>
								<th>被保险人</th>
								<th>保险金额</th>
								<th>标准保费</th>
								<th>加费金额</th>
								<th>合计保费</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in jiafeiList1.showInfo">
								<td>{{item.riskname}}</td>
								<td>{{item.name}}</td>
								<td>{{item.amnt}}</td>
								<td>{{item.standprem}}</td>
								<td>{{item.addprem}}</td>
								<td>{{item.prem}}</td>
							</tr>
							<tr>
								<td colspan="6">调整后的保险计划保险费合计{{jiafeiList1.allsumpre}}元。</td>
							</tr>
						</tbody>
					</table>
					<p style="font-weight:bold;">{{jiafeiList1.noticeremark}}</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="jiafeiList1.selected1" @click="selected('j',1,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="jiafeiList1.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="jiafeiList1.selected2" @click="selected('j',1,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="jiafeiList1.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，但希望保留主险，烦请将您希望取消的附加险列明。</p>
						<!--<input type="checkbox" v-model="jiafeiList1.selected3" @click="selected('j',1,3)">本人希望保留主险，取消-->
						<input type="checkbox" v-model="jiafeiList1.selected3">本人希望保留主险，取消
						<!--已选列表 -->
						<div v-for="item in jiafeiList1.extraList.selected" v-if="jiafeiList1.extraList.selected.length!=0">
							<p>{{item.riskname}}</p>
							<img src="../../../static/img/backlog/delete.png" alt="" @click="deleteExtra('j',1,item)" />
						</div>
						<!--未选列表 -->
						<div>
							<p v-show="!jiafeiList1.selected3" style="text-align:center;color:#666;">请选择</p>
							<p v-show="jiafeiList1.selected3">
								<picker @change="chooseExtra('j',1)" v-model="jiafeiList1.extraList.extra" :values="jiafeiList1.extraList.extra" :items="jiafeiList1.extraList.tobeSelected" code="riskCode" text="riskname" default-text="请选择"></picker>
							</p>
							<img src="../../../static/img/backlog/add.png" alt="" @click="addExtra" />
						</div>
						&nbsp;&nbsp; 保险
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>
			<div v-show="show8">
				<!--<div class="mainCaption">新契约加费通知书（打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请做出如下承保决定：
					</p>
					<table>
						<thead>
							<tr>
								<th>投保险种</th>
								<th>被保险人</th>
								<th>保险金额</th>
								<th>标准保费</th>
								<th>加费金额</th>
								<th>合计保费</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in jiafeiList2.showInfo">
								<td>{{item.riskname}}</td>
								<td>{{item.name}}</td>
								<td>{{item.amnt}}</td>
								<td>{{item.standprem}}</td>
								<td>{{item.addprem}}</td>
								<td>{{item.prem}}</td>
							</tr>
							<tr>
								<td colspan="6">调整后的保险计划保险费合计{{jiafeiList2.allsumpre}}元。</td>
							</tr>
						</tbody>
					</table>
					<p style="font-weight:bold;">{{jiafeiList2.noticeremark}}</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="jiafeiList2.selected1" @click="selected('j',2,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="jiafeiList2.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="jiafeiList2.selected2" @click="selected('j',2,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="jiafeiList2.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，但希望保留主险，烦请将您希望取消的附加险列明。</p>
						<!--<input type="checkbox" v-model="jiafeiList2.selected3" @click="selected('j',2,3)">本人希望保留主险，取消-->
						<input type="checkbox" v-model="jiafeiList2.selected3">本人希望保留主险，取消
						<!--已选列表 -->
						<div v-for="item in jiafeiList2.extraList.selected" v-if="jiafeiList2.extraList.selected.length!=0">
							<p>{{item.riskname}}</p>
							<img src="../../../static/img/backlog/delete.png" alt="" @click="deleteExtra('j',2,item)" />
						</div>
						<!--未选列表 -->
						<div>
							<p v-show="!jiafeiList2.selected3" style="text-align:center;color:#666;">请选择</p>
							<p v-show="jiafeiList2.selected3">
								<picker @change="chooseExtra('j',2)" v-model="jiafeiList2.extraList.extra" :values="jiafeiList2.extraList.extra" :items="jiafeiList2.extraList.tobeSelected" code="riskCode" text="riskname" default-text="请选择"></picker>
							</p>
							<img src="../../../static/img/backlog/add.png" alt="" @click="addExtra" />
						</div>
						&nbsp;&nbsp; 保险
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>
			<div v-show="show9">
				<!--<div class="mainCaption">新契约附加险拒保通知书（非打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请暂不能承保下列附加险：
					</p>
					<table>
						<thead>
							<tr>
								<th>投保险种</th>
								<th>被保险人</th>
								<th>保险金额</th>
								<th>标准保费</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in jubaoList1.showInfo">
								<td>{{item.riskname}}</td>
								<td>{{item.name}}</td>
								<td>{{item.amnt}}</td>
								<td>{{item.standprem}}</td>
							</tr>
							<tr>
								<td colspan="6">调整后的保险计划保险费合计{{jubaoList1.allsumpre}}元。</td>
							</tr>
						</tbody>
					</table>
					<p style="font-weight:bold;">{{jubaoList1.noticeremark}}</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="jubaoList1.selected1" @click="selected('ju',1,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="jubaoList1.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="jubaoList1.selected2" @click="selected('ju',1,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="jubaoList1.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>
			<div v-show="show10">
				<!--<div class="mainCaption">新契约附加险拒保通知书（打印合同类）</div>-->
				<div class="fuCaption">
					<p>审核申请</p>
					<p>
						尊敬的 {{policy.holderIssueSend.appntName}} {{policy.holderIssueSend.appntSex == 2 ? '女士':'先生'}} :
						<br> 本公司根据有关资料（{{material}}），经详细审核后，对投保单号为 {{applyCode}} 的投保申请暂不能承保下列附加险：
					</p>
					<table>
						<thead>
							<tr>
								<th>投保险种</th>
								<th>被保险人</th>
								<th>保险金额</th>
								<th>标准保费</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in jubaoList2.showInfo">
								<td>{{item.riskname}}</td>
								<td>{{item.name}}</td>
								<td>{{item.amnt}}</td>
								<td>{{item.standprem}}</td>
							</tr>
							<tr>
								<td colspan="6">调整后的保险计划保险费合计{{jubaoList2.allsumpre}}元。</td>
							</tr>
						</tbody>
					</table>
					<p style="font-weight:bold;">{{jubaoList2.noticeremark}}</p>
				</div>
				<div class="fuCaption">
					<p>回复内容</p>
					<div>
						<p>若您对我公司的承保决定无异议，烦请用"✔️"选择此项决定，并将合计保费金额存入投保书中所提供的投保人的存折/卡中。</p>
						<!--<input type="checkbox" v-model="jubaoList2.selected1" @click="selected('ju',2,1)">本人同意贵公司的承保决定-->
						<input type="checkbox" v-model="jubaoList2.selected1">本人同意贵公司的承保决定
					</div>
					<div>
						<p>若您不同意以上我公司的承保决定，烦请用"✔️"选择此项决定。</p>
						<!--<input type="checkbox" v-model="jubaoList2.selected2" @click="selected('ju',2,2)">本人不同意贵公司的承保决定-->
						<input type="checkbox" v-model="jubaoList2.selected2">本人不同意贵公司的承保决定
						<br/>&nbsp;&nbsp; 要求撤销全部投保申请
					</div>
					<div>
						<p>本通知书是保险合同的组成部分，请您亲笔确认所填写内容并签字，将此通知书交业务人员，并于{{createTime.year}}年{{createTime.month}}月{{createTime.date}}日前返回本公司。如逾期未能收到您的回复，本通知书所对应的投保申请将做撤销处理。感谢合作，您对本公司的信任，我们深感荣幸。</p>
						<p>本公司声明：以上结果仅限于为本公司是否承保提供依据，而并非确切诊断。</p>
					</div>
				</div>
			</div>

			<div class="f-flex" style="padding:5%">
				<div v-show="show1" class="display" style='width:100%'>
					<p style='text-align: left;margin:5px 0;'>投保审核(非打印)</p>
					<!--照片div-->
					<div class='div-flex'>
						<!--照片for-->
						<div v-show="imgList_1.length>0" :key='index' v-for="(item,index) in imgList_1 ">
							<img :src="item.src" style="width:100%;height:100px;" />
							<span @click='DeleteImg(index,1)'>x</span>
						</div>
						<!--上传照片普通img-->
						<img id="accessory2" v-if='imgList_1.length==0' :src="imageUrl" style="width:140px;height:100px;" @click="select(1)">
						<!--上传照片+号img-->
						<div style='background:#FFCAA2;padding:10px;width:140px;height:100px;' v-if='imgList_1.length>0' @click="select(1)">
							<img id="accessory2" :src="imagesUrl" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<div v-show="show2" class="display" style='width:100%'>
					<p style='text-align: left;margin:5px 0;'>投保审核(打印类)</p>
					<!--照片div-->
					<div class='div-flex'>
						<!--照片for-->
						<div v-show="imgList_2.length>0" :key='index' v-for="(item,index) in imgList_2 ">
							<img :src="item.src" style="width:100%;height:100px;" />
							<span @click='DeleteImg(index,2)'>x</span>
						</div>
						<!--上传照片普通img-->
						<img id="accessory2" v-if='imgList_2.length==0' :src="imageUrl" style="width:140px;height:100px;" @click="select(2)">
						<!--上传照片+号img-->
						<div style='background:#FFCAA2;padding:10px;width:140px;height:100px;' v-if='imgList_2.length>0' @click="select(2)">
							<img id="accessory2" :src="imagesUrl" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<div v-show="show3" class="display" style='width:100%'>
					<p style='text-align: left;margin:5px 0;'>业务员(非打印)</p>
					<!--照片div-->
					<div class='div-flex'>
						<!--照片for-->
						<div v-show="imgList_3.length>0" :key='index' v-for="(item,index) in imgList_3 ">
							<img :src="item.src" style="width:100%;height:100px;" />
							<span @click='DeleteImg(index,3)'>x</span>
						</div>
						<!--上传照片普通img-->
						<img id="accessory4" v-if='imgList_3.length==0' :src="imageUrl" style="width:140px;height:100px;" @click="select(3)">
						<!--上传照片+号img-->
						<div style='background:#FFCAA2;padding:10px;width:140px;height:100px;' v-if='imgList_3.length>0' @click="select(3)">
							<img id="accessory4" :src="imagesUrl" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<div v-show="show4" class="display" style='width:100%'>
					<p style='text-align: left;margin:5px 0;'>业务员(打印类)</p>
					<div class='div-flex'>
						<div v-show="imgList_4.length>0" :key='index' v-for="(item,index) in imgList_4 ">
							<img :src="item.src" style="width:100%;height:100px;" />
							<span @click='DeleteImg(index,4)'>x</span>
						</div>
						<img id="accessory4" v-if='imgList_4.length==0' :src="imageUrl" style="width:140px;height:100px;" @click="select(4)">
						<div style='background:#FFCAA2;padding:10px;width:140px;height:100px;' v-if='imgList_4.length>0' @click="select(4)">
							<img id="accessory4" :src="imagesUrl" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<mt-popup position="center" v-model="Show1" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(1)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(1)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show2" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(2)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(2)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show3" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(3)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(3)">拍照</button>
				</mt-popup>
				<mt-popup position="center" v-model="Show4" class="phone_valid popup" style="width:70%;border:1px solid #eee;position: fixed;
                 background: #fff;top:80%;left: 50%;">
					<button class="photo" @click="getNewPhotos(4)">从相册选择</button>
					<hr>
					<button class="photo" @click="capturePhoto(4)">拍照</button>
				</mt-popup>
			</div>

			<div class="part">
				<div v-show="appntSignShow">
					<p>投保人-{{policy.holderIssueSend.appntName}}签字</p>
					<img style="width:110px;" v-show="policy.holderIssueSend.reaPath==undefined || policy.holderIssueSend.reaPath==''" :src="wrting" @click="saveProblemContent(1,241)">
					<img style="width:110px;" v-show="policy.holderIssueSend.reaPath!=undefined && policy.holderIssueSend.reaPath!=''" :src="policy.holderIssueSend.reaPath" @click="saveProblemContent(1,241)">
				</div>
				<div v-show="appntSignShow" v-for="item in policy.insuredIssueSend">
					<p v-show="item.reitoapp!='00'">被保人-{{item.name}}签字</p>
					<img style="width:110px;" v-show="item.reitoapp!='00' && item.reaPath==''" :src="wrting" @click="saveProblemContent(1,251,item)">
					<img style="width:110px;" v-show="item.reitoapp!='00' && item.reaPath!=''" :src="item.reaPath" @click="saveProblemContent(1,251,item)">
				</div>
				<div v-show="agentSignShow">
					<p>代理人签字</p>
					<img style="width:110px;" v-show="signImg.agentSign==''" :src="wrting" @click="saveProblemContent(1,231)">
					<img style="width:110px;" v-show="signImg.agentSign!=''" :src="signImg.agentSign" @click="saveProblemContent(1,231)">
				</div>
			</div>
			<button v-show="subType!=''" class="btnn" @click="submitProblem">提交</button>
		</div>
		<alert ref="showalert"></alert>
		<div v-show="showShare.isShow" class="shares" @click="hideShare">
			<div class="content">
				<h3>选择分享签名</h3>
				<div class="flex">
					<p :class="[showShare.type == '24'?'active':'']" @click.stop="shareApp('24')">投保人</p>
					<p :class="[showShare.index === index?'active':'']" v-for="(item,index) in policy.insuredIssueSend" @click.stop="shareApp(item.insSeq,index)" v-show="item.reitoapp!='00'">被保人{{item.name}}</p>
				</div>
				<p class="foot" :class="showShare.isShare?'footAct':''" @click.stop="shareApp('save')">确 定</p>
			</div>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import alert from '../policy/common/alert.vue'
	import NewCA from '../common/NewCA'
	import Headerbtns from '../policy/common/Header.vue'
	import picker from '../common/Picker.vue'
	import camera from '../../../static/js/cordova_camera.js'
	import '../policy/css/base.css'
	export default {
		name: 'problem',
		components: {
			Headerbtns,
			NewCA,
			alert,
			picker
		},
		data() {
			return {
				showShare: {
					isShow: false,
					type: '',
					index: '',
					isShare: false,
				},
				policy: {
					holderIssueSend: {}
				},
				InsureSignt: [],
				createTime: {
					year: '',
					month: '',
					date: ''
				},
				relToApp: '',
				relToAppDesc: '',
				shenNC: false, //投保审核非打印 是否撤销
				chenNY: '', //投保审核非打印 撤销原因
				shenYC: false, //投保审核打印 是否撤销
				chenYY: '', //投保审核打印 撤销原因
				material: '', //体检结果
				chuzeList1: { //除责非打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					selected3: false, //单选选项
					extraList: {
						extra: '', //当前选中附加险
						selected: [],
						tobeSelected: []
					},
					noticeremark: ''
				},
				chuzeList2: { //除责打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					selected3: false, //单选选项
					extraList: {
						extra: '', //当前选中附加险
						selected: [],
						tobeSelected: []
					},
					noticeremark: ''
				},
				jiafeiList1: { //加费非打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					selected3: false, //单选选项
					extraList: {
						extra: '', //当前选中附加险
						selected: [],
						tobeSelected: []
					},
					showInfo: [],
					allsumpre: '',
					allsumpreNum: '',
					noticeremark: ''
				},
				jiafeiList2: { //加费打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					selected3: false, //单选选项
					extraList: {
						extra: '', //当前选中附加险
						selected: [],
						tobeSelected: []
					},
					showInfo: [],
					allsumpre: '',
					allsumpreNum: '',
					noticeremark: ''
				},
				jubaoList1: { //拒保非打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					showInfo: [],
					allsumpre: '',
					noticeremark: ''
				},
				jubaoList2: { //拒保打印
					selected1: false, //单选选项
					selected2: false, //单选选项
					showInfo: [],
					allsumpre: '',
					noticeremark: ''
				},
				Show1: false,
				Show2: false,
				Show3: false,
				Show4: false,
				Show5: false,
				Show6: false,
				Show7: false,
				Show8: false,
				Show9: false,
				Show10: false,
				appntSignShow: false,
				agentSignShow: false,
				caValue: {
					isCAOpen: false,
					image: "",
					context_id: '',
					applyCode: this.$route.params.applyCode,
					orderId: this.$route.params.orderId,
					reitoapp: ''
				},
				signImg: {
					appntSign: '', //投保人
					insSign: '', //被保人
					agentSign: '', //代理人
				},
				imageUrl: require("./../../../static/img/login/video.png"),
				imagesUrl: require("../../../static/img/videoUpload/add.png"),
				imgList_1: [],
				imgList_2: [],
				imgList_3: [],
				imgList_4: [],
				accessory: {
					accessory1: '',
					accessory2: '',
					accessory3: '',
					accessory4: ''
				},
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				show7: false,
				show8: false,
				show9: false,
				show10: false,
				shareLink: '',
				applyCode: this.$route.params.applyCode,
				appnt: {
					appntName: '',
					appntSex: '',
					idNo: '',
					idType: ''
				},
				insurant: {
					name: '',
					idNo: '',
					idType: '',
					birthday: ''
				},
				agent: {
					agentCode: '',
					agentName: '',
					idNo: '',
					agentSex: '',
					managename: ''
				},
				content1: '', //回复内容
				content2: '',
				content3: '',
				content4: '',
				content5: '',
				content6: '',
				content7: '',
				content8: '',
				content9: '',
				content10: '',
				subType: '', //打印非打印
				requestParam: '',
				problem: {
					TB_3010101_N: '',
					TB_3010101_Y: '',
					TB_3010201_N: '',
					TB_3010201_Y: ''
				},
				prtSeq1: '',
				prtSeq2: '',
				prtSeq3: '',
				prtSeq4: '',
				prtSeq5: '',
				prtSeq6: '',
				prtSeq7: '',
				prtSeq8: '',
				prtSeq9: '',
				prtSeq10: '',
				questcontent1: '',
				questcontent2: '',
				questcontent3: '',
				questcontent4: '',
				questcontent5: '',
				questcontent6: '',
				questcontent7: '',
				questcontent8: '',
				questcontent9: '',
				questcontent10: '',
				birthday: '',
				nowYear: '',
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
						method: this.saveProblemContent            
					}
				],
				wrting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACkCAYAAADxNTBqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0REQzVEMEQ5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0REQzVEMEU5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRERDNUQwQjlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRERDNUQwQzlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjkXSxkAABiXSURBVHja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',
			}
		},
		mounted() {
			this.getMsg();
		},
		computed: {
			caShow() {
				return this.caValue.isCAOpen
			}
		},
		watch: {
			caShow(val, oldval) {
				if(!val) {
					this.getMsgNew();
				}
			},
			'showShare': {
				handler(val, oldval) {
					if(!val.isShow) {
						this.showShare.type = ''
						this.showShare.index = ''
						this.showShare.isShare = false
					}
				},
				deep: true
			},
			//除责1
			'chuzeList1.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList1.selected2 = false
						this.chuzeList1.selected3 = false
					}
					for(let i in this.chuzeList1.extraList.selected) {
						this.chuzeList1.extraList.tobeSelected.push(this.chuzeList1.extraList.selected[i])
						this.chuzeList1.extraList.selected.splice(i, 1)
					}
					this.extraSort("c", 1)
				},
				deep: true
			},
			'chuzeList1.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList1.selected1 = false
						this.chuzeList1.selected3 = false
					}
					for(let i in this.chuzeList1.extraList.selected) {
						this.chuzeList1.extraList.tobeSelected.push(this.chuzeList1.extraList.selected[i])
						this.chuzeList1.extraList.selected.splice(i, 1)
					}
					this.extraSort("c", 1)
				},
				deep: true
			},
			'chuzeList1.selected3': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList1.selected1 = false
						this.chuzeList1.selected2 = false
					} else {
						for(let i in this.chuzeList1.extraList.selected) {
							this.chuzeList1.extraList.tobeSelected.push(this.chuzeList1.extraList.selected[i])
							this.chuzeList1.extraList.selected.splice(i, 1)
						}
						this.extraSort("c", 1)
					}
				},
				deep: true
			},
			//除责2
			'chuzeList2.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList2.selected2 = false
						this.chuzeList2.selected3 = false
					}
					for(let i in this.chuzeList2.extraList.selected) {
						this.chuzeList2.extraList.tobeSelected.push(this.chuzeList2.extraList.selected[i])
						this.chuzeList2.extraList.selected.splice(i, 1)
					}
					this.extraSort("c", 2)
				},
				deep: true
			},
			'chuzeList2.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList2.selected1 = false
						this.chuzeList2.selected3 = false
					}
					for(let i in this.chuzeList2.extraList.selected) {
						this.chuzeList2.extraList.tobeSelected.push(this.chuzeList2.extraList.selected[i])
						this.chuzeList2.extraList.selected.splice(i, 1)
					}
					this.extraSort("c", 2)
				},
				deep: true
			},
			'chuzeList2.selected3': {
				handler(val, oldval) {
					if(val == true) {
						this.chuzeList2.selected1 = false
						this.chuzeList2.selected2 = false
					} else {
						for(let i in this.chuzeList2.extraList.selected) {
							this.chuzeList2.extraList.tobeSelected.push(this.chuzeList2.extraList.selected[i])
							this.chuzeList2.extraList.selected.splice(i, 1)
						}
						this.extraSort("c", 2)
					}
				},
				deep: true
			},
			//加费1
			'jiafeiList1.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList1.selected2 = false
						this.jiafeiList1.selected3 = false
					}
					for(let i in this.jiafeiList1.extraList.selected) {
						this.jiafeiList1.extraList.tobeSelected.push(this.jiafeiList1.extraList.selected[i])
						this.jiafeiList1.extraList.selected.splice(i, 1)
					}
					this.extraSort("j", 1)
				},
				deep: true
			},
			'jiafeiList1.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList1.selected1 = false
						this.jiafeiList1.selected3 = false
					}
					for(let i in this.jiafeiList1.extraList.selected) {
						this.jiafeiList1.extraList.tobeSelected.push(this.jiafeiList1.extraList.selected[i])
						this.jiafeiList1.extraList.selected.splice(i, 1)
					}
					this.extraSort("j", 1)
				},
				deep: true
			},
			'jiafeiList1.selected3': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList1.selected1 = false
						this.jiafeiList1.selected2 = false
					} else {
						for(let i in this.jiafeiList1.extraList.selected) {
							this.jiafeiList1.extraList.tobeSelected.push(this.jiafeiList1.extraList.selected[i])
							this.jiafeiList1.extraList.selected.splice(i, 1)
						}
						this.extraSort("j", 1)
					}
				},
				deep: true
			},
			//加费2
			'jiafeiList2.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList2.selected2 = false
						this.jiafeiList2.selected3 = false
					}
					for(let i in this.jiafeiList2.extraList.selected) {
						this.jiafeiList2.extraList.tobeSelected.push(this.jiafeiList2.extraList.selected[i])
						this.jiafeiList2.extraList.selected.splice(i, 1)
					}
					this.extraSort("j", 2)
				},
				deep: true
			},
			'jiafeiList2.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList2.selected1 = false
						this.jiafeiList2.selected3 = false
					}
					for(let i in this.jiafeiList2.extraList.selected) {
						this.jiafeiList2.extraList.tobeSelected.push(this.jiafeiList2.extraList.selected[i])
						this.jiafeiList2.extraList.selected.splice(i, 1)
					}
					this.extraSort("j", 2)
				},
				deep: true
			},
			'jiafeiList2.selected3': {
				handler(val, oldval) {
					if(val == true) {
						this.jiafeiList2.selected1 = false
						this.jiafeiList2.selected2 = false
					} else {
						for(let i in this.jiafeiList2.extraList.selected) {
							this.jiafeiList2.extraList.tobeSelected.push(this.jiafeiList2.extraList.selected[i])
							this.jiafeiList2.extraList.selected.splice(i, 1)
						}
						this.extraSort("j", 2)
					}
				},
				deep: true
			},
			//拒保1
			'jubaoList1.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.jubaoList1.selected2 = false
					}
				},
				deep: true
			},
			'jubaoList1.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.jubaoList1.selected1 = false
					}
				},
				deep: true
			},
			//拒保2
			'jubaoList2.selected1': {
				handler(val, oldval) {
					if(val == true) {
						this.jubaoList2.selected2 = false
					}
				},
				deep: true
			},
			'jubaoList2.selected2': {
				handler(val, oldval) {
					if(val == true) {
						this.jubaoList2.selected1 = false
					}
				},
				deep: true
			},
			'jiafeiList1.extraList.selected': {
				handler(val, oldval) {
					let allsumpre = Number(this.jiafeiList1.allsumpreNum)
					let selected = this.jiafeiList1.extraList.selected
					let showInfo = this.jiafeiList1.showInfo
					if(selected.length>0){
						for(let i in selected){
							for(let j=0;j<showInfo.length;j++){
								allsumpre = allsumpre.toFixed(2) - Number(selected[i].premium)
								if(selected[i].riskCode==showInfo[j].riskcode){
									allsumpre+=Number(showInfo[j].addprem)
								}
							}
						}
					}
					console.log(allsumpre)
					this.jiafeiList1.allsumpre = allsumpre.toFixed(2)
				},
				deep: true
			},
			'jiafeiList2.extraList.selected': {
				handler(val, oldval) {
					let allsumpre = Number(this.jiafeiList2.allsumpreNum)
					let selected = this.jiafeiList2.extraList.selected
					let showInfo = this.jiafeiList2.showInfo
					if(selected.length > 0) {
						for(let i in selected) {
							for(let j = 0; j < showInfo.length; j++) {
								allsumpre = allsumpre.toFixed(2) - Number(selected[i].premium)
								if(selected[i].riskCode == showInfo[j].riskcode) {
									allsumpre += Number(showInfo[j].addprem)
								}
							}
						}
					}
					console.log(allsumpre)
					this.jiafeiList2.allsumpre = allsumpre.toFixed(2)
				},
				deep: true
			}
		},
		methods: {
			/*
			selected(str,index,val){
				if(str=='c'&&index=="1"){//除责非打印 
					if(val==1){
						this.chuzeList1.selected1 = !this.chuzeList1.selected1
						this.chuzeList1.selected2 = false
						this.chuzeList1.selected3 = false
					}else if(val==2){
						this.chuzeList1.selected1 = false
						this.chuzeList1.selected2 = !this.chuzeList1.selected2
						this.chuzeList1.selected3 = false
					}else if(val==3){
						this.chuzeList1.selected1 = false
						this.chuzeList1.selected2 = false
						this.chuzeList1.selected3 = !this.chuzeList1.selected3
					}
					console.log("除责非打印:",this.chuzeList1.selected1,this.chuzeList1.selected2,this.chuzeList1.selected3)
				}else if(str=='c'&&index=="2"){//除责打印
					if(val==1){
						this.chuzeList2.selected1 = !this.chuzeList2.selected1
						this.chuzeList2.selected2 = false
						this.chuzeList2.selected3 = false
					}else if(val==2){
						this.chuzeList2.selected1 = false
						this.chuzeList2.selected2 = !this.chuzeList2.selected2
						this.chuzeList2.selected3 = false
					}else if(val==3){
						this.chuzeList2.selected1 = false
						this.chuzeList2.selected2 = false
						this.chuzeList2.selected3 = !this.chuzeList2.selected3
					}
					console.log("除责打印:",this.chuzeList2.selected1,this.chuzeList2.selected2,this.chuzeList2.selected3)
				}else if(str=='j'&&index=="1"){//加费非打印
					if(val==1){
						this.jiafeiList1.selected1 = !this.jiafeiList1.selected1
						this.jiafeiList1.selected2 = false
						this.jiafeiList1.selected3 = false
					}else if(val==2){
						this.jiafeiList1.selected1 = false
						this.jiafeiList1.selected2 = !this.jiafeiList1.selected2
						this.jiafeiList1.selected3 = false
					}else if(val==3){
						this.jiafeiList1.selected1 = false
						this.jiafeiList1.selected2 = false
						this.jiafeiList1.selected3 = !this.jiafeiList1.selected3
					}
					console.log("加费非打印:",this.jiafeiList1.selected1,this.jiafeiList1.selected2,this.jiafeiList1.selected3)
				}else if(str=='j'&&index=="2"){//加费打印
					if(val==1){
						this.jiafeiList2.selected1 = !this.jiafeiList2.selected1
						this.jiafeiList2.selected2 = false
						this.jiafeiList2.selected3 = false
					}else if(val==2){
						this.jiafeiList2.selected1 = false
						this.jiafeiList2.selected2 = !this.jiafeiList2.selected2
						this.jiafeiList2.selected3 = false
					}else if(val==3){
						this.jiafeiList2.selected1 = false
						this.jiafeiList2.selected2 = false
						this.jiafeiList2.selected3 = !this.jiafeiList2.selected3
					}
					console.log("加费打印:",this.jiafeiList2.selected1,this.jiafeiList2.selected2,this.jiafeiList2.selected3)
				}else if(str=='ju'&&index=="1"){
					if(val==1){
						this.jubaoList1.selected1 = !this.jubaoList1.selected1
						this.jubaoList1.selected2 = false
					}else if(val==2){
						this.jubaoList1.selected1 = false
						this.jubaoList1.selected2 = !this.jubaoList1.selected2
					}
					console.log("拒保非打印:",this.jubaoList1.selected1,this.jubaoList1.selected2)
				}else if(str=='ju'&&index=="2"){
					if(val==1){
						this.jubaoList2.selected1 = !this.jubaoList2.selected1
						this.jubaoList2.selected2 = false
					}else if(val==2){
						this.jubaoList2.selected1 = false
						this.jubaoList2.selected2 = !this.jubaoList2.selected2
					}
					console.log("拒保打印:",this.jubaoList2.selected1,this.jubaoList2.selected2)
				}
			},*/
			chooseExtra(str, index) {
				if(str == 'c' && index == "1") {
					console.log("除责非打印类")
					for(let i in this.chuzeList1.extraList.tobeSelected) {
						if(this.chuzeList1.extraList.tobeSelected[i].riskCode == this.chuzeList1.extraList.extra) {
							let isHave = false
							for(let j in this.chuzeList1.extraList.selected) {
								if(this.chuzeList1.extraList.selected[j].riskCode == this.chuzeList1.extraList.extra) {
									isHave = true
								}
							}
							if(!isHave) {
								this.chuzeList1.extraList.selected.push(this.chuzeList1.extraList.tobeSelected[i])
								this.chuzeList1.extraList.extra = ""
								this.chuzeList1.extraList.tobeSelected.splice(i, 1)
							}
						}
					}
				} else if(str == 'c' && index == "2") {
					console.log("除责打印类")
					for(let i in this.chuzeList2.extraList.tobeSelected) {
						if(this.chuzeList2.extraList.tobeSelected[i].riskCode == this.chuzeList2.extraList.extra) {
							let isHave = false
							for(let j in this.chuzeList2.extraList.selected) {
								if(this.chuzeList2.extraList.selected[j].riskCode == this.chuzeList2.extraList.extra) {
									isHave = true
								}
							}
							if(!isHave) {
								this.chuzeList2.extraList.selected.push(this.chuzeList2.extraList.tobeSelected[i])
								this.chuzeList2.extraList.extra = ""
								this.chuzeList2.extraList.tobeSelected.splice(i, 1)
							}
						}
					}
				} else if(str == 'j' && index == "1") {
					console.log("加费非打印类")
					for(let i in this.jiafeiList1.extraList.tobeSelected) {
						if(this.jiafeiList1.extraList.tobeSelected[i].riskCode == this.jiafeiList1.extraList.extra) {
							let isHave = false
							for(let j in this.jiafeiList1.extraList.selected) {
								if(this.jiafeiList1.extraList.selected[j].riskCode == this.jiafeiList1.extraList.extra) {
									isHave = true
								}
							}
							if(!isHave) {
								this.jiafeiList1.extraList.selected.push(this.jiafeiList1.extraList.tobeSelected[i])
								this.jiafeiList1.extraList.extra = ""
								this.jiafeiList1.extraList.tobeSelected.splice(i, 1)
							}
						}
					}
				} else if(str == 'j' && index == "2") {
					console.log("加费打印类")
					for(let i in this.jiafeiList2.extraList.tobeSelected) {
						if(this.jiafeiList2.extraList.tobeSelected[i].riskCode == this.jiafeiList2.extraList.extra) {
							let isHave = false
							for(let j in this.jiafeiList2.extraList.selected) {
								if(this.jiafeiList2.extraList.selected[j].riskCode == this.jiafeiList2.extraList.extra) {
									isHave = true
								}
							}
							if(!isHave) {
								this.jiafeiList2.extraList.selected.push(this.jiafeiList2.extraList.tobeSelected[i])
								this.jiafeiList2.extraList.extra = ""
								this.jiafeiList2.extraList.tobeSelected.splice(i, 1)
							}
						}
					}
				}
			},
			addExtra() {
				console.log("add")
			},
			deleteExtra(str, index, item) {
				if(str == 'c' && index == "1") {
					console.log("除责非打印类")
					let isHave = false
					for(let i in this.chuzeList1.extraList.tobeSelected) {
						if(this.chuzeList1.extraList.tobeSelected[i].riskCode == item.riskCode) {
							isHave = true
						}
					}
					if(!isHave) {
						this.chuzeList1.extraList.tobeSelected.push(item)
					}
					for(let i in this.chuzeList1.extraList.selected) {
						if(this.chuzeList1.extraList.selected[i].riskCode == item.riskCode) {
							this.chuzeList1.extraList.selected.splice(i, 1)
						}
					}
					this.extraSort("c", 1)
				} else if(str == 'c' && index == "2") {
					console.log("除责打印类")
					let isHave = false
					for(let i in this.chuzeList2.extraList.tobeSelected) {
						if(this.chuzeList2.extraList.tobeSelected[i].riskCode == item.riskCode) {
							isHave = true
						}
					}
					if(!isHave) {
						this.chuzeList2.extraList.tobeSelected.push(item)
					}
					for(let i in this.chuzeList2.extraList.selected) {
						if(this.chuzeList2.extraList.selected[i].riskCode == item.riskCode) {
							this.chuzeList2.extraList.selected.splice(i, 1)
						}
					}
					this.extraSort("c", 2)
				} else if(str == 'j' && index == "1") {
					console.log("加费非打印类")
					let isHave = false
					for(let i in this.jiafeiList1.extraList.tobeSelected) {
						if(this.jiafeiList1.extraList.tobeSelected[i].riskCode == item.riskCode) {
							isHave = true
						}
					}
					if(!isHave) {
						this.jiafeiList1.extraList.tobeSelected.push(item)
					}
					for(let i in this.jiafeiList1.extraList.selected) {
						if(this.jiafeiList1.extraList.selected[i].riskCode == item.riskCode) {
							this.jiafeiList1.extraList.selected.splice(i, 1)
						}
					}
					this.extraSort("j", 1)
				} else if(str == 'j' && index == "2") {
					console.log("加费打印类")
					let isHave = false
					for(let i in this.jiafeiList2.extraList.tobeSelected) {
						if(this.jiafeiList2.extraList.tobeSelected[i].riskCode == item.riskCode) {
							isHave = true
						}
					}
					if(!isHave) {
						this.jiafeiList2.extraList.tobeSelected.push(item)
					}
					for(let i in this.jiafeiList2.extraList.selected) {
						if(this.jiafeiList2.extraList.selected[i].riskCode == item.riskCode) {
							this.jiafeiList2.extraList.selected.splice(i, 1)
						}
					}
					this.extraSort("j", 2)
				}
			},
			extraSort(str, index) {
				let compare = function(obj1, obj2) {
					let val1 = obj1.riskCode;
					let val2 = obj2.riskCode;
					if(val1 < val2) {
						return -1;
					} else if(val1 > val2) {
						return 1;
					} else {
						return 0;
					}
				}
				if(str == 'c' && index == "1") {
					console.log("除责非打印类")
					this.chuzeList1.extraList.tobeSelected.sort(compare)
				} else if(str == 'c' && index == "2") {
					console.log("除责打印类")
					this.chuzeList2.extraList.tobeSelected.sort(compare)
				} else if(str == 'j' && index == "1") {
					console.log("加费非打印类")
					this.jiafeiList1.extraList.tobeSelected.sort(compare)
				} else if(str == 'j' && index == "2") {
					console.log("加费打印类")
					this.jiafeiList2.extraList.tobeSelected.sort(compare)
				}
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
			hideShare() {
				this.showShare.isShow = false
			},
			share: function() {
				utils.cache.removeItem("content1")
				utils.cache.removeItem("content2")
				utils.cache.removeItem("content3")
				utils.cache.removeItem("content4")
				if(this.policy.insuredIssueSend.length == 0 || this.policy.insuredIssueSend.length == 1 && this.policy.insuredIssueSend[0].reitoapp == '00') {
					let host = window.globalConfig.rootUrl.split('/')[2]
					let protocol = window.globalConfig.rootUrl.split(':')[0]
					this.shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/problemShare/" + this.$route.params.orderId + "/" + this.applyCode + "/-1/-1/-1/24"
					console.log('投保人本人===>', this.shareLink)
					this.pushShare()
				} else {
					this.showShare.isShow = true
				}
			},
			shareApp(type, index) {
				if(type == 'save') {
					this.showShare.isShow = false
					let host = window.globalConfig.rootUrl.split('/')[2]
					let protocol = window.globalConfig.rootUrl.split(':')[0]
					let shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/problemShare/" + this.$route.params.orderId + "/" + this.applyCode + "/-1/-1/-1"
					if(this.showShare.type == '24') {
						this.shareLink = shareLink + '/24'
						this.pushShare()
					} else if(this.showShare.type != '') {
						this.shareLink = shareLink + '/' + this.showShare.type
						this.pushShare()
					}
					console.log("分享地址 ===>" + this.shareLink)
					this.showShare.type = ''
					this.showShare.index = ''
					this.showShare.isShare = false
				} else {
					this.showShare.type = type
					this.showShare.index = index
					this.showShare.isShare = true
					this.showShare.isShow = true
				}
			},
			pushShare() {
				Wechat.share({
					message: {
						title: "问题件回复",
						description: "问题件回复",
						thumb: "www/static/img/common/0.png",
						mediaTagName: '链接',
						media: {
							type: Wechat.Type.WEBPAGE,
							webpageUrl: this.shareLink
						}
					},
					scene: Wechat.Scene.SESSION // share to Timeline
				}, function() {
					utils.ui.modal.afterOpen()
					MessageBox({
						title: '提示',
						message: '分享成功'
					}).then(() => {
						utils.ui.modal.beforeClose()
					})
				}, function(reason) {
					utils.ui.modal.afterOpen()
					MessageBox({
						title: '提示',
						message: reason
					}).then(() => {
						utils.ui.modal.beforeClose()
					})
				});
			},
			onCopy: function(e) {
				//     this.toast('分享链接已拷贝!');
				 },
			        onError: function(e) {            
				this.toast('分享链接拷贝失败');        
			},
			backLog() {
				this.$router.push("/backlog")
			},
			//获取subType判断显示
			getMsg() {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.orderId,
						"stepNo": '1,4,6'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					this.policy = body.policy
					this.subType = this.policy.problemInfo
					if(this.subType == "") {
						alert_n22.confirm("提示", "状态有误，请返回待办查看", "确定", "取消", this.backLog)
					} else {
						//代理人
						this.agent.agentCode = body.policy.agentInfo.agentCode
						this.agent.agentName = body.policy.agentInfo.name
						this.agent.agentSex = body.policy.agentInfo.sex
						this.agent.idNo = body.policy.agentInfo.idNo
						this.agent.managename = body.policy.agentInfo.manageName
						this.policy.insuredIssueSend.forEach(item => {
							this.InsureSignt.push({
								insSeq: item.insSeq,
								insuredName: item.name,
							})
							if(item.reitoapp == '00') {
								this.caValue.reitoapp = item.insSeq
							}
						})
						console.log('InsureSignt===>', this.InsureSignt)
						for(let i = 0; i < this.subType.length; i++) {
							if(this.subType[i].subType == '3010101_N') {
								this.show1 = true
								this.appntSignShow = true
								this.questcontent1 = this.subType[i].questcontent
								this.prtSeq1 = this.subType[i].prtSeq
								this.getProblemContent('00', this.policy)
								this.imgList_1 = this.subType[i].imageList
								this.imgList_1.forEach(tpl=>{
									tpl.src = tpl.reaPath
									let image = document.createElement('img')
									image.setAttribute("crossOrigin", "anonymous")
									image.src = ""
									image.src = tpl.reaPath
									let than = this;
									image.onload = function() {
										let data = than.getBase64Image(image);
										tpl.src = data
									};
								})
							}
							if(this.subType[i].subType == '3010101_Y') {
								this.show2 = true
								this.appntSignShow = true
								this.questcontent2 = this.subType[i].questcontent
								this.prtSeq2 = this.subType[i].prtSeq
								this.getProblemContent('00', this.policy)
								this.imgList_2 = this.subType[i].imageList
								this.imgList_2.forEach(tpl=>{
									tpl.src = tpl.reaPath
									let image = document.createElement('img')
									image.setAttribute("crossOrigin", "anonymous")
									image.src = ""
									image.src = tpl.reaPath
									let than = this;
									image.onload = function() {
										let data = than.getBase64Image(image);
										tpl.src = data
									};
								})
							}
							if(this.subType[i].subType == '3010201_N') {
								this.show3 = true
								this.agentSignShow = true
								this.questcontent3 = this.subType[i].questcontent
								this.prtSeq3 = this.subType[i].prtSeq
								this.getProblemContent('00', this.policy)
								this.imgList_3 = this.subType[i].imageList
								this.imgList_3.forEach(tpl=>{
									tpl.src = tpl.reaPath
									let image = document.createElement('img')
									image.setAttribute("crossOrigin", "anonymous")
									image.src = ""
									image.src = tpl.reaPath
									let than = this;
									image.onload = function() {
										let data = than.getBase64Image(image);
										tpl.src = data
									};
								})
							}
							if(this.subType[i].subType == '3010201_Y') {
								this.show4 = true
								this.agentSignShow = true
								this.questcontent4 = this.subType[i].questcontent
								this.prtSeq4 = this.subType[i].prtSeq
								this.getProblemContent('00', this.policy)
								this.imgList_4 = this.subType[i].imageList
								this.imgList_4.forEach(tpl=>{
									tpl.src = tpl.reaPath
									let image = document.createElement('img')
									image.setAttribute("crossOrigin", "anonymous")
									image.src = ""
									image.src = tpl.reaPath
									let than = this;
									image.onload = function() {
										let data = than.getBase64Image(image);
										tpl.src = data
									};
								})
							}
							//3030101-核保通知书（01-加费通知书、02-特别约定通知书、03-附加险拒保通知书）特别约定==除责
							if(this.subType[i].subType == '3030101_Y') {
								//打印 2
								console.log('===============1111111111')
								for(let j = 0; j < this.subType[i].problemOther.length; j++) {
									//show6 新契约除责(打印)
									//show8 新契约加费(打印)
									//show10 新契约附加险拒保(打印)
									if(this.subType[i].problemOther[j].noticetype == '01') {
										this.show8 = true
										this.appntSignShow = true
										//this.questcontent8 = this.subType[i].questcontent
										this.prtSeq8 = this.subType[i].prtSeq
										this.jiafeiList2.extraList.tobeSelected = this.subType[i].extRiskList
										this.jiafeiList2.extraList.tobeSelected.forEach(item => {
											item.riskname = item.riskname + '-' + item.insuredName
										})
										this.jiafeiList2.showInfo = this.subType[i].problemOther[j].problemProduct
										this.jiafeiList2.allsumpre = this.subType[i].problemOther[j].allsumpre
										this.jiafeiList2.allsumpreNum = this.subType[i].problemOther[j].allsumpre
										this.jiafeiList2.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('01', this.policy)
									}
									if(this.subType[i].problemOther[j].noticetype == '02') {
										this.show6 = true
										this.appntSignShow = true
										//this.questcontent6 = this.subType[i].problemOther[j].speccont
										this.prtSeq6 = this.subType[i].prtSeq
										this.chuzeList2.extraList.tobeSelected = this.subType[i].extRiskList
										this.chuzeList2.extraList.tobeSelected.forEach(item => {
											item.riskname = item.riskname + '-' + item.insuredName
										})
										this.chuzeList2.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('02', this.policy)
									}
									if(this.subType[i].problemOther[j].noticetype == '03') {
										this.show10 = true
										this.appntSignShow = true
										//this.questcontent10 = this.subType[i].questcontent
										this.prtSeq10 = this.subType[i].prtSeq
										this.jubaoList2.showInfo = this.subType[i].problemOther[j].problemProduct
										this.jubaoList2.allsumpre = this.subType[i].problemOther[j].allsumpre
										this.jubaoList2.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('03', this.policy)
									}
								}
							}
							if(this.subType[i].subType == '3030101_N') {
								//非打印 1
								for(let j = 0; j < this.subType[i].problemOther.length; j++) {
									if(this.subType[i].problemOther[j].noticetype == '01') {
										this.show7 = true
										this.appntSignShow = true
										//this.questcontent7 = this.subType[i].questcontent
										this.prtSeq7 = this.subType[i].prtSeq
										this.jiafeiList1.extraList.tobeSelected = this.subType[i].extRiskList
										this.jiafeiList1.extraList.tobeSelected.forEach(item => {
											item.riskname = item.riskname + '-' + item.insuredName
										})
										this.jiafeiList1.showInfo = this.subType[i].problemOther[j].problemProduct
										this.jiafeiList1.allsumpre = this.subType[i].problemOther[j].allsumpre
										this.jiafeiList1.allsumpreNum = this.subType[i].problemOther[j].allsumpre
										this.jiafeiList1.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('01', this.policy)
									}
									if(this.subType[i].problemOther[j].noticetype == '02') {
										this.show5 = true
										this.appntSignShow = true
										//this.questcontent5 = this.subType[i].problemOther[j].speccont
										this.prtSeq5 = this.subType[i].prtSeq
										this.chuzeList1.extraList.tobeSelected = this.subType[i].extRiskList
										this.chuzeList1.extraList.tobeSelected.forEach(item => {
											item.riskname = item.riskname + '-' + item.insuredName
										})
										this.chuzeList1.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('02', this.policy)
									}
									if(this.subType[i].problemOther[j].noticetype == '03') {
										this.show9 = true
										this.appntSignShow = true
										//this.questcontent9 = this.subType[i].questcontent
										this.prtSeq9 = this.subType[i].prtSeq
										this.jubaoList1.showInfo = this.subType[i].problemOther[j].problemProduct
										this.jubaoList1.allsumpre = this.subType[i].problemOther[j].allsumpre
										this.jubaoList1.noticeremark = this.subType[i].problemOther[j].noticeremark
										this.material = this.subType[i].problemOther[j].material

										let createTime = this.subType[i].problemOther[j].createTime
										this.createTime.year = createTime.split('-')[0]
										this.createTime.month = createTime.split('-')[1]
										this.createTime.date = createTime.split('-')[2]
										this.getProblemContent('03', this.policy)
									}
								}
							}

						}
						if(body.policy.agentInfo.imageData.length > 0) {
							body.policy.agentInfo.imageData.forEach(item => {
								if(item.imageName == '231') {
									this.signImg.agentSign = item.reaPath
								}
							})
						}
						if(this.appntSignShow == false) {
							this.actions = [{
								name: "刷新页面",
								method: this.load
							}]
						}
					}
				})
			},
			//获取签字信息
			getMsgNew() {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.orderId,
						"stepNo": '1,4,6'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					console.log(body)
					this.policy.holderIssueSend = body.policy.holderIssueSend
					this.policy.insuredIssueSend = body.policy.insuredIssueSend
					if(body.policy.agentInfo.imageData.length > 0) {
						body.policy.agentInfo.imageData.forEach(item => {
							if(item.imageName == '231') {
								this.signImg.agentSign = item.reaPath
							}
						})
					}
				})
			},
			getPolicyImg(success, fail) {
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.orderId,
						"stepNo": '1,4,6'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					success()
					this.policy.holderIssueSend = body.policy.holderIssueSend
					this.policy.insuredIssueSend = body.policy.insuredIssueSend
					let InsureSignt = []
					this.policy.insuredIssueSend.forEach(item => {
						InsureSignt.push({
							insSeq: item.insSeq,
							insuredName: item.name,
						})
					})
					this.InsureSignt = InsureSignt
					if(body.policy.agentInfo.imageData.length > 0) {
						body.policy.agentInfo.imageData.forEach(item => {
							if(item.imageName == '231') {
								this.signImg.agentSign = item.reaPath
							}
						})
					}
				})
			},
			openCADialog(signNum) {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = signNum
			},
			faceTest(signNum, item) {
				let cust = undefined
				if(signNum == 241) {
					//投保人
					cust = {
						name: this.policy.holderIssueSend.appntName,
						idNo: this.policy.holderIssueSend.idNo,
						idType: this.policy.holderIssueSend.idType
					}
					MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {
						this.ficeDistinguish(signNum, callbackSucc, cust)
					}, (callbackFail) => {
						this.$refs.showalert.showMOdal(callbackFail)
					});
				} else if(signNum == 251) {
					//被保人-服务端返回生日格式birthday: "1963-12-1700:00:00"取年月日获取年龄
					let age = utils.valid.getAge(item.birthday.substring(0,10))
					if(age >= 18) {
						cust = {
							name: item.name,
							idNo: item.idno,
							idType: item.idType
						}
					} else {
						//投保人
						cust = {
							name: this.policy.holderIssueSend.appntName,
							idNo: this.policy.holderIssueSend.idNo,
							idType: this.policy.holderIssueSend.idType
						}
					}
					signNum = signNum + '-' + item.insSeq
					MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {
						this.ficeDistinguish(signNum, callbackSucc, cust)
					}, (callbackFail) => {
						this.$refs.showalert.showMOdal(callbackFail)
					});
				} else if(signNum == 231) {
					//代理人
					cust = {
						name: this.agent.agentName,
						idNo: this.agent.idNo,
						idType: 11
					}
					this.openCADialog(signNum);
				}
			},
			// 进行人脸识别接口调用方法
			ficeDistinguish: function(signNum, callbackSucc, cust) {
				let requ = {
					"policy": {
						"agentCode": "",
						"name": cust.name,
						"cardId": cust.idNo,
						"functionCode": "RECALL",
						"imageByte": callbackSucc,
						"applyCode": this.applyCode,
						"policyCode": "",
						"idType": cust.idType
					}
				}
				console.log('人脸识别请求参数', JSON.stringify(requ))
				utils.http.postFast('FACEIDKSHL', requ, (body) => {
					if(body.policy.resultCode == '0') {
						console.log(body.policy.resultMsg);
						this.openCADialog(signNum);
					} else {
						this.$refs.showalert.showMOdal(body.policy.resultMsg)
					}
				})
			},
			//选项显示
			select(tag) {
				if(tag == 1) {
					this.Show1 = true
				} else if(tag == 2) {
					this.Show2 = true
				} else if(tag == 3) {
					this.Show3 = true
				} else if(tag == 4) {
					this.Show4 = true
				} else if(tag == 5) {
					this.Show5 = true
				}
			},
			//调用相机拍照
			capturePhoto(tag) {
				if(tag == 1) {
					this.Show1 = false
				} else if(tag == 2) {
					this.Show2 = false
				} else if(tag == 3) {
					this.Show3 = false
				} else if(tag == 4) {
					this.Show4 = false
				}
				capturePhotoCallback((imageData) => {
					if(tag == "1") {
						let item = {}
						item.src = "data:image/png;base64," + imageData
						this.imgList_1.push(item)
					} else if(tag == "2") {
						let item = {}
						item.src = "data:image/png;base64," + imageData
						this.imgList_2.push(item)
					} else if(tag == "3") {
						let item = {}
						item.src = "data:image/png;base64," + imageData
						this.imgList_3.push(item)
					} else if(tag == "4") {
						let item = {}
						item.src = "data:image/png;base64," + imageData
						this.imgList_4.push(item)
					}
				}, (message) => {})
			},
			getBase64Image: function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.naturalWidth
				canvas.height = img.naturalHeight
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL
				// return dataURL.replace("data:image/png;base64,", "");
			},
			//调本地相册
			getNewPhotos(tag) {
				if(tag == 1) {
					this.Show1 = false
				} else if(tag == 2) {
					this.Show2 = false
				} else if(tag == 3) {
					this.Show3 = false
				} else if(tag == 4) {
					this.Show4 = false
				} 

				getNewPhoto(pictureSource.SAVEDPHOTOALBUM, (imageData) => {
					if(tag == "1") {
						let item = {}
						item.src = "data:image/jpeg;base64," + imageData
						this.imgList_1.push(item)
					} else if(tag == "2") {
						let item = {}
						item.src = "data:image/jpeg;base64," + imageData
						this.imgList_2.push(item)
					} else if(tag == "3") {
						let item = {}
						item.src = "data:image/jpeg;base64," + imageData
						this.imgList_3.push(item)
					} else if(tag == "4") {
						let item = {}
						item.src = "data:image/jpeg;base64," + imageData
						this.imgList_4.push(item)
					}
				}, (message) => {
					// alert(message)
				})
			},
			//从保单中获取问题件已填写的内容
			getProblemContent(noticetype, policy) {
				//3010101_N
				if(policy.TB_3010101 != undefined && policy.TB_3010101.dztype == '3010101_N') {
					console.log('当前问题件编号为: 3010101_N')
					console.log(policy.TB_3010101)
					let TB_3010101_N = policy.TB_3010101
					this.policy.holderIssueSend.appntName = TB_3010101_N.applicantName
					this.applyCode = TB_3010101_N.applyCode
					this.InsureSignt = TB_3010101_N.InsureSignt
					this.questcontent1 = TB_3010101_N.questContent
					this.chenNY = TB_3010101_N.reasonNum
					//此处服务端存在返回空字符串情况，需补充判断
					if(this.chenNY != undefined&&this.chenNY != '') {
						this.shenNC = true
					}
					this.content1 = TB_3010101_N.replyContent
				}
				//3010101_Y
				if(policy.TB_3010101 != undefined && policy.TB_3010101.dztype == '3010101_Y') {
					console.log('当前问题件编号为: 3010101_Y')
					console.log(policy.TB_3010101)
					let TB_3010101_Y = policy.TB_3010101
					this.policy.holderIssueSend.appntName = TB_3010101_Y.applicantName
					this.applyCode = TB_3010101_Y.applyCode
					this.InsureSignt = TB_3010101_Y.InsureSignt
					this.questcontent2 = TB_3010101_Y.questContent
					this.chenYY = TB_3010101_Y.reasonNum
					//此处服务端存在返回空字符串情况，需补充判断
					if(this.chenYY != undefined&&this.chenYY != '') {
						this.shenYC = true
					}
					this.content2 = TB_3010101_Y.replyContent
				}
				//3010201_N
				if(policy.TB_3010201 != undefined && policy.TB_3010201.dztype == '3010201_N') {
					console.log('当前问题件编号为: 3010201_N')
					console.log(policy.TB_3010201)
					let TB_3010201_N = policy.TB_3010201
					this.policy.holderIssueSend.appntName = TB_3010201_N.applicantName
					this.applyCode = TB_3010201_N.applyCode
					this.InsureSignt = TB_3010201_N.InsureSignt
					this.questcontent3 = TB_3010201_N.questContent
					this.content3 = TB_3010201_N.replyContent
				}
				//3010201_Y
				if(policy.TB_3010201 != undefined && policy.TB_3010201.dztype == '3010201_Y') {
					console.log('当前问题件编号为: 3010201_Y')
					console.log(policy.TB_3010201)
					let TB_3010201_Y = policy.TB_3010201
					this.policy.holderIssueSend.appntName = TB_3010201_Y.applicantName
					this.applyCode = TB_3010201_Y.applyCode
					this.InsureSignt = TB_3010201_Y.InsureSignt
					this.questcontent4 = TB_3010201_Y.questContent
					this.content4 = TB_3010201_Y.replyContent
				}
				//3030101_N
				if(policy.TB_3030101 != undefined && policy.TB_3030101.dztype == "3030101_N") {
					let TB_3030101_N = policy.TB_3030101
					console.log(policy.TB_3030101)
					if(noticetype == '01') {
						console.log('当前问题件编号为: 3030101_N 01, 加费')
						this.policy.holderIssueSend.appntName = TB_3030101_N.applicantName
						this.applyCode = TB_3030101_N.applyCode
						this.InsureSignt = TB_3030101_N.InsureSignt
						this.questcontent7 = TB_3030101_N.questContent
						this.content7 = TB_3030101_N.replyContent
						this.jiafeiList1.extraList.selected = TB_3030101_N.extRiskList
						this.jiafeiList1.allsumpre = TB_3030101_N.allsumpre
						if(TB_3030101_N.select != undefined && TB_3030101_N.select == '01') {
							this.jiafeiList1.selected1 = true
						} else if(TB_3030101_N.select != undefined && TB_3030101_N.select == '02') {
							this.jiafeiList1.selected2 = true
						} else if(TB_3030101_N.select != undefined && TB_3030101_N.select == '03') {
							this.jiafeiList1.selected3 = true
						}
					}
					if(noticetype == '02') {
						console.log('当前问题件编号为: 3030101_N 02, 除责')
						this.policy.holderIssueSend.appntName = TB_3030101_N.applicantName
						this.applyCode = TB_3030101_N.applyCode
						this.InsureSignt = TB_3030101_N.InsureSignt
						this.questcontent5 = TB_3030101_N.questContent
						this.chuzeList1.extraList.selected = TB_3030101_N.extRiskList
						if(TB_3030101_N.select != undefined && TB_3030101_N.select == '01') {
							this.chuzeList1.selected1 = true
						} else if(TB_3030101_N.select != undefined && TB_3030101_N.select == '02') {
							this.chuzeList1.selected2 = true
						} else if(TB_3030101_N.select != undefined && TB_3030101_N.select == '03') {
							this.chuzeList1.selected3 = true
						}
					}
					if(noticetype == '03') {
						console.log('当前问题件编号为: 3030101_N 03, 拒保')
						this.policy.holderIssueSend.appntName = TB_3030101_N.applicantName
						this.applyCode = TB_3030101_N.applyCode
						this.InsureSignt = TB_3030101_N.InsureSignt
						this.questcontent9 = TB_3030101_N.questContent
						this.content9 = TB_3030101_N.replyContent
						this.jubaoList1.allsumpre = TB_3030101_N.allsumpre
						if(TB_3030101_N.select != undefined && TB_3030101_N.select == '01') {
							this.jubaoList1.selected1 = true
						} else if(TB_3030101_N.select != undefined && TB_3030101_N.select == '02') {
							this.jubaoList1.selected2 = true
						}
					}
				}
				//3030101_Y
				if(policy.TB_3030101 != undefined && policy.TB_3030101.dztype == "3030101_Y") {
					let TB_3030101_Y = policy.TB_3030101
					if(noticetype == '01') {
						console.log('当前问题件编号为: 3030101_Y 01, 加费')
						this.policy.holderIssueSend.appntName = TB_3030101_Y.applicantName
						this.applyCode = TB_3030101_Y.applyCode
						this.InsureSignt = TB_3030101_Y.InsureSignt
						this.questcontent7 = TB_3030101_Y.questContent
						this.content7 = TB_3030101_Y.replyContent
						this.jiafeiList2.extraList.selected = TB_3030101_Y.extRiskList
						this.jiafeiList2.allsumpre = TB_3030101_Y.allsumpre
						if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '01') {
							this.jiafeiList2.selected1 = true
						} else if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '02') {
							this.jiafeiList2.selected2 = true
						} else if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '03') {
							this.jiafeiList2.selected3 = true
						}
					}
					if(noticetype == '02') {
						console.log('当前问题件编号为: 3030101_Y 02, 除责')
						this.policy.holderIssueSend.appntName = TB_3030101_Y.applicantName
						this.applyCode = TB_3030101_Y.applyCode
						this.InsureSignt = TB_3030101_Y.InsureSignt
						this.questcontent6 = TB_3030101_Y.questContent
						this.chuzeList2.extraList.selected = TB_3030101_Y.extRiskList
						if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '01') {
							this.chuzeList2.selected1 = true
						} else if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '02') {
							this.chuzeList2.selected2 = true
						} else if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '03') {
							this.chuzeList2.selected3 = true
						}
					}
					if(noticetype == '03') {
						console.log('当前问题件编号为: 3030101_Y 03, 拒保')
						this.policy.holderIssueSend.appntName = TB_3030101_Y.applicantName
						this.applyCode = TB_3030101_Y.applyCode
						this.InsureSignt = TB_3030101_Y.InsureSignt
						this.questcontent9 = TB_3030101_Y.questContent
						this.content9 = TB_3030101_Y.replyContent
						this.jubaoList2.allsumpre = TB_3030101_Y.allsumpre
						if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '01') {
							this.jubaoList2.selected1 = true
						} else if(TB_3030101_Y.select != undefined && TB_3030101_Y.select == '02') {
							this.jubaoList2.selected2 = true
						}
					}
				}
			},
			//问题件分享前对当前已填写内容进行保存
			saveProblemContent(tag,signNum, item) {
				console.log('this.show1', this.show1)
				console.log('this.show2', this.show2)
				console.log('this.show3', this.show3)
				console.log('this.show4', this.show4)
				console.log('this.show5', this.show5)
				console.log('this.show6', this.show6)
				console.log('this.show7', this.show7)
				console.log('this.show8', this.show8)
				console.log('this.show9', this.show9)
				console.log('this.show10', this.show10)

				let ispass = true
				this.TB_3010101_N = {
					"agentCode": this.agent.agentCode,
					"agentName": this.agent.agentName,
					"applicantName": this.policy.holderIssueSend.appntName,
					"applyCode": this.applyCode,
					"InsureSignt": this.InsureSignt,
					"noticeCode": this.prtSeq1,
					"orgName": "第三营销服务部",
					"printDate": "",
					"questContent": this.questcontent1,
					"reasonNum": '',
					"replyContent": this.content1
				}
				this.TB_3010101_Y = {
					"agentCode": this.agent.agentCode,
					"agentName": this.agent.agentName,
					"applicantName": this.policy.holderIssueSend.appntName,
					"applyCode": this.applyCode,
					"InsureSignt": this.InsureSignt,
					"noticeCode": this.prtSeq2,
					"orgName": "第三营销服务部",
					"printDate": "",
					"questContent": this.questcontent2,
					"reasonNum": '',
					"replyContent": this.content2
				}
				this.TB_3010201_N = {
					"agentCode": this.agent.agentCode,
					"agentName": this.agent.agentName,
					"applicantName": this.policy.holderIssueSend.appntName,
					"applyCode": this.applyCode,
					"InsureSignt": this.InsureSignt,
					"noticeCode": this.prtSeq3,
					"orgName": "第三营销服务部",
					"printDate": "",
					"questContent": this.questcontent3,
					"reasonNum": '',
					"replyContent": this.content3
				}
				this.TB_3010201_Y = {
					"agentCode": this.agent.agentCode,
					"agentName": this.agent.agentName,
					"applicantName": this.policy.holderIssueSend.appntName,
					"applyCode": this.applyCode,
					"InsureSignt": this.InsureSignt,
					"noticeCode": this.prtSeq4,
					"orgName": "第三营销服务部",
					"printDate": "",
					"questContent": this.questcontent4,
					"reasonNum": '',
					"replyContent": this.content4
				}
				/**/
				let noticetype
				let type
				if(this.show8 == true) {
					noticetype = '01' //加费
					type = 'Y'
				} else if(this.show6 == true) {
					noticetype = '02' //除责
					type = 'Y'
				} else if(this.show10 == true) {
					noticetype = '03' //拒保
					type = 'Y'
				} else if(this.show7 == true) {
					noticetype = '01' //加费
					type = 'N'
				} else if(this.show5 == true) {
					noticetype = '02' //除责
					type = 'N'
				} else if(this.show9 == true) {
					noticetype = '03' //拒保
					type = 'N'
				}
				if(type == 'Y') {
					if(noticetype == '01') {
						//加费
						this.TB_3030101_Y = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq8,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent8,
							"reasonNum": '',
							"replyContent": this.content8,
							"noticetype": '01',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					} else if(noticetype == '02') {
						//除责
						this.TB_3030101_Y = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq6,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent6,
							"reasonNum": '',
							"replyContent": this.content6,
							"noticetype": '02',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					} else if(noticetype == '03') {
						//拒保
						this.TB_3030101_Y = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq10,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent10,
							"reasonNum": '',
							"replyContent": this.content10,
							"noticetype": '03',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					}
				} else if(type == 'N') {
					if(noticetype == '01') {
						//加费
						this.TB_3030101_N = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq7,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent7,
							"reasonNum": '',
							"replyContent": this.content7,
							"noticetype": '01',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					} else if(noticetype == '02') {
						//除责
						this.TB_3030101_N = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq5,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent5,
							"reasonNum": '',
							"replyContent": this.content5,
							"noticetype": '02',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					} else if(noticetype == '03') {
						//拒保
						this.TB_3030101_N = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq9,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent9,
							"reasonNum": '',
							"replyContent": this.content9,
							"noticetype": '03',
							"select": '',
							"extRiskList": '',
							"allsumpre": ''
						}
					}
				}
				/**/
				this.requestParam = {
					"policy": {
						"applyCode": this.applyCode,
						"dzType": "",
						"extPages": []
					}
				}
				if(this.show1 == true && ispass) {
					this.TB_3010101_N.reasonNum = this.chenNY
					this.requestParam.policy.TB_3010101_N = this.TB_3010101_N
					this.requestParam.policy.dzType += '3010101_N,'
					if(this.imgList_1 != "") {
						for(let i of this.imgList_1) {
							let src = i.src.split(',')
							this.requestParam.policy.extPages.push({
								"imageName": "3010101_N",
								"imageByte": src[1]
							})
						}
					}

				}
				if(this.show2 == true && ispass) {
					this.TB_3010101_Y.reasonNum = this.chenYY
					this.requestParam.policy.TB_3010101_Y = this.TB_3010101_Y
					this.requestParam.policy.dzType += '3010101_Y,'
					if(this.imgList_2 != "") {
						for(let i of this.imgList_2) {
							let src = i.src.split(',')
							this.requestParam.policy.extPages.push({
								"imageName": "3010101_Y",
								"imageByte": src[1]
							})
						}
					}
				}
				if(this.show3 == true && ispass) {
					this.requestParam.policy.TB_3010201_N = this.TB_3010201_N
					this.requestParam.policy.dzType += '3010201_N,'
					if(this.imgList_3 != "") {
						for(let i of this.imgList_3) {
							let src = i.src.split(',')
							this.requestParam.policy.extPages.push({
								"imageName": "3010201_N",
								"imageByte": src[1]
							})
						}
					}
				}
				if(this.show4 == true && ispass) {
					this.requestParam.policy.TB_3010201_Y = this.TB_3010201_Y
					this.requestParam.policy.dzType += '3010201_Y,'
					if(this.imgList_4 != "") {
						for(let i of this.imgList_4) {
							let src = i.src.split(',')
							this.requestParam.policy.extPages.push({
								"imageName": "3010201_Y",
								"imageByte": src[1]
							})
						}
					}
				}
				if(this.show5 == true && ispass) {
					let select
					let problemProduct = this.chuzeList1.extraList.selected
					if(this.chuzeList1.selected1 == true) {
						select = '01'
					} else if(this.chuzeList1.selected2 == true) {
						select = '02'
					} else if(this.chuzeList1.selected3 == true) {
						select = '03'
					}
					this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
					this.requestParam.policy.TB_3030101_N.select = select
					this.requestParam.policy.TB_3030101_N.extRiskList = problemProduct
					this.requestParam.policy.dzType += '3030101_N,'

				}
				if(this.show6 == true && ispass) {
					let select
					let problemProduct = this.chuzeList2.extraList.selected
					if(this.chuzeList2.selected1 == true) {
						select = '01'
					} else if(this.chuzeList2.selected2 == true) {
						select = '02'
					} else if(this.chuzeList2.selected3 == true) {
						select = '03'
					}
					this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
					this.requestParam.policy.TB_3030101_Y.select = select
					this.requestParam.policy.TB_3030101_Y.extRiskList = problemProduct
					this.requestParam.policy.dzType += '3030101_Y,'

				}
				if(this.show7 == true && ispass) {
					let select
					let problemProduct = this.jiafeiList1.extraList.selected
					if(this.jiafeiList1.selected1 == true) {
						select = '01'
					} else if(this.jiafeiList1.selected2 == true) {
						select = '02'
					} else if(this.jiafeiList1.selected3 == true) {
						select = '03'
					}
					this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
					this.requestParam.policy.TB_3030101_N.select = select
					this.requestParam.policy.TB_3030101_N.extRiskList = problemProduct
					this.requestParam.policy.TB_3030101_N.allsumpre = this.jiafeiList1.allsumpre
					this.requestParam.policy.dzType += '3030101_N,'

				}
				if(this.show8 == true && ispass) {
					let select
					let problemProduct = this.jiafeiList2.extraList.selected
					if(this.jiafeiList2.selected1 == true) {
						select = '01'
					} else if(this.jiafeiList2.selected2 == true) {
						select = '02'
					} else if(this.jiafeiList2.selected3 == true) {
						select = '03'
					}
					this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
					this.requestParam.policy.TB_3030101_Y.select = select
					this.requestParam.policy.TB_3030101_Y.extRiskList = problemProduct
					this.requestParam.policy.TB_3030101_Y.allsumpre = this.jiafeiList2.allsumpre
					this.requestParam.policy.dzType += '3030101_Y,'

				}
				if(this.show9 == true && ispass) {
					let select
					if(this.jubaoList1.selected1 == true) {
						select = '01'
					} else if(this.jubaoList1.selected2 == true) {
						select = '02'
					}
					this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
					this.requestParam.policy.TB_3030101_N.select = select
					this.requestParam.policy.TB_3030101_N.allsumpre = this.jubaoList1.allsumpre
					this.requestParam.policy.dzType += '3030101_N,'

				}
				if(this.show10 == true && ispass) {
					let select
					if(this.jubaoList2.selected1 == true) {
						select = '01'
					} else if(this.jubaoList2.selected2 == true) {
						select = '02'
					}
					this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
					this.requestParam.policy.TB_3030101_Y.select = select
					this.requestParam.policy.TB_3030101_Y.allsumpre = this.jubaoList2.allsumpre
					this.requestParam.policy.dzType += '3030101_Y,'
				}
				if(ispass) {
					this.requestParam.policy.dzType = this.requestParam.policy.dzType.substring(0, this.requestParam.policy.dzType.length - 1)
					this.requestParam.policy.type = 'SAVE'
					let requ = this.requestParam
					utils.http.postFast('MOPROBLEMREPLY', requ, (body) => {
						console.log(body, '保存成功进入分享流程')
						if(tag == 1){
							this.faceTest(signNum, item)
						}else{
							this.share()
						}
					})
				}
			},
			//提交问题件
			submitProblem() {
				this.getPolicyImg(() => {
					alert_n22.confirm('提示', '<p>请确认问题件回复中的<font color="red">签字信息是否完整！</font></p>', '确定', '取消', (flag) => {
						//console.log(this.signImg.agentSign.substring(22), '=============')
						let ispass = true
						console.log(this.show1 + "/" + this.show2 + "/" + this.show3 + "/" + this.show4)
						this.TB_3010101_N = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq1,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent1,
							"reasonNum": '',
							"replyContent": this.content1
						}
						this.TB_3010101_Y = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq2,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent2,
							"reasonNum": '',
							"replyContent": this.content2
						}
						this.TB_3010201_N = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq3,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent3,
							"reasonNum": '',
							"replyContent": this.content3
						}
						this.TB_3010201_Y = {
							"agentCode": this.agent.agentCode,
							"agentName": this.agent.agentName,
							"applicantName": this.policy.holderIssueSend.appntName,
							"applyCode": this.applyCode,
							"InsureSignt": this.InsureSignt,
							"noticeCode": this.prtSeq4,
							"orgName": "第三营销服务部",
							"printDate": "",
							"questContent": this.questcontent4,
							"reasonNum": '',
							"replyContent": this.content4
						}
						/**/
						let noticetype
						let type
						if(this.show8 == true) {
							noticetype = '01' //加费
							type = 'Y'
						} else if(this.show6 == true) {
							noticetype = '02' //除责
							type = 'Y'
						} else if(this.show10 == true) {
							noticetype = '03' //拒保
							type = 'Y'
						} else if(this.show7 == true) {
							noticetype = '01' //加费
							type = 'N'
						} else if(this.show5 == true) {
							noticetype = '02' //除责
							type = 'N'
						} else if(this.show9 == true) {
							noticetype = '03' //拒保
							type = 'N'
						}
						if(type == 'Y') {
							if(noticetype == '01') {
								//加费
								this.TB_3030101_Y = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq8,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent8,
									"reasonNum": '',
									"replyContent": this.content8,
									"noticetype": '01',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							} else if(noticetype == '02') {
								//除责
								this.TB_3030101_Y = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq6,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent6,
									"reasonNum": '',
									"replyContent": this.content6,
									"noticetype": '02',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							} else if(noticetype == '03') {
								//拒保
								this.TB_3030101_Y = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq10,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent10,
									"reasonNum": '',
									"replyContent": this.content10,
									"noticetype": '03',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							}
						} else if(type == 'N') {
							if(noticetype == '01') {
								//加费
								this.TB_3030101_N = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq7,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent7,
									"reasonNum": '',
									"replyContent": this.content7,
									"noticetype": '01',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							} else if(noticetype == '02') {
								//除责
								this.TB_3030101_N = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq5,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent5,
									"reasonNum": '',
									"replyContent": this.content5,
									"noticetype": '02',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							} else if(noticetype == '03') {
								//拒保
								this.TB_3030101_N = {
									"agentCode": this.agent.agentCode,
									"agentName": this.agent.agentName,
									"applicantName": this.policy.holderIssueSend.appntName,
									"applyCode": this.applyCode,
									"InsureSignt": this.InsureSignt,
									"noticeCode": this.prtSeq9,
									"orgName": "第三营销服务部",
									"printDate": "",
									"questContent": this.questcontent9,
									"reasonNum": '',
									"replyContent": this.content9,
									"noticetype": '03',
									"select": '',
									"extRiskList": '',
									"allsumpre": ''
								}
							}
						}
						/**/
						this.requestParam = {
							"policy": {
								//                "TB_3010101_N": this.TB_3010101_N,
								// "TB_3010101_Y": this.TB_3010101_Y,
								// "TB_3010201_N":this.TB_3010201_N,
								// "TB_3010201_Y":this.TB_3010201_Y,
								"applyCode": this.applyCode,
								"dzType": "",
								"extPages": []
							}
						}
						if(this.show1 == true && ispass) {
							ispass = this.business1()
							console.log(this.shenNC, this.chenNY)
							if(this.shenNC == true && this.chenNY == '') {
								this.$refs.showalert.showMOdal('请选择撤销原因！')
								return false
							}
							if(this.shenNC == false && this.chenNY != '') {
								this.$refs.showalert.showMOdal('请勾选撤销申请！')
								return false
							}
							this.TB_3010101_N.reasonNum = this.chenNY
							this.requestParam.policy.TB_3010101_N = this.TB_3010101_N
							this.requestParam.policy.dzType += '3010101_N,'
							if(this.imgList_1 != "") {
								for(let i of this.imgList_1) {
									let src = i.src.split(',')
									this.requestParam.policy.extPages.push({
										"imageName": "3010101_N",
										"imageByte": src[1]
									})
								}
							}

						}
						if(this.show2 == true && ispass) {
							ispass = this.business2()
							console.log(this.shenYC, this.chenYY)
							if(this.shenYC == true && this.chenYY == '') {
								this.$refs.showalert.showMOdal('请选择撤销原因！')
								return false
							}
							if(this.shenYC == false && this.chenYY != '') {
								this.$refs.showalert.showMOdal('请勾选撤销申请！')
								return false
							}
							this.TB_3010101_Y.reasonNum = this.chenYY
							this.requestParam.policy.TB_3010101_Y = this.TB_3010101_Y
							this.requestParam.policy.dzType += '3010101_Y,'
							if(this.imgList_2 != "") {
								for(let i of this.imgList_2) {
									let src = i.src.split(',')
									this.requestParam.policy.extPages.push({
										"imageName": "3010101_Y",
										"imageByte": src[1]
									})
								}
							}
						}
						if(this.show3 == true && ispass) {
							ispass = this.agent1();
							this.requestParam.policy.TB_3010201_N = this.TB_3010201_N
							this.requestParam.policy.dzType += '3010201_N,'
							if(this.imgList_3 != "") {
								for(let i of this.imgList_3) {
									let src = i.src.split(',')
									this.requestParam.policy.extPages.push({
										"imageName": "3010201_N",
										"imageByte": src[1]
									})
								}
							}
						}
						if(this.show4 == true && ispass) {
							ispass = this.agent2();
							this.requestParam.policy.TB_3010201_Y = this.TB_3010201_Y
							this.requestParam.policy.dzType += '3010201_Y,'
							if(this.imgList_4 != "") {
								for(let i of this.imgList_4) {
									let src = i.src.split(',')
									this.requestParam.policy.extPages.push({
										"imageName": "3010201_Y",
										"imageByte": src[1]
									})
								}
							}
						}
						if(this.show5 == true && ispass) {
							ispass = this.vaild();
							let select
							let problemProduct = this.chuzeList1.extraList.selected
							if(this.chuzeList1.selected1 == true) {
								select = '01'
							} else if(this.chuzeList1.selected2 == true) {
								select = '02'
							} else if(this.chuzeList1.selected3 == true) {
								select = '03'
							}
							if(select != '01' && select != '02' && select != '03') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							if(select == '03' && problemProduct.length == 0) {
								this.$refs.showalert.showMOdal('选择第三项时必选附加险！')
								return false
							}
							this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
							this.requestParam.policy.TB_3030101_N.select = select
							this.requestParam.policy.TB_3030101_N.extRiskList = problemProduct
							this.requestParam.policy.dzType += '3030101_N,'

						}
						if(this.show6 == true && ispass) {
							ispass = this.vaild();
							let select
							let problemProduct = this.chuzeList2.extraList.selected
							if(this.chuzeList2.selected1 == true) {
								select = '01'
							} else if(this.chuzeList2.selected2 == true) {
								select = '02'
							} else if(this.chuzeList2.selected3 == true) {
								select = '03'
							}
							if(select != '01' && select != '02' && select != '03') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							if(select == '03' && problemProduct.length == 0) {
								this.$refs.showalert.showMOdal('选择第三项时必选附加险！')
								return false
							}
							this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
							this.requestParam.policy.TB_3030101_Y.select = select
							this.requestParam.policy.TB_3030101_Y.extRiskList = problemProduct
							this.requestParam.policy.dzType += '3030101_Y,'

						}
						if(this.show7 == true && ispass) {
							ispass = this.vaild();
							let select
							let problemProduct = this.jiafeiList1.extraList.selected
							if(this.jiafeiList1.selected1 == true) {
								select = '01'
							} else if(this.jiafeiList1.selected2 == true) {
								select = '02'
							} else if(this.jiafeiList1.selected3 == true) {
								select = '03'
							}
							if(select != '01' && select != '02' && select != '03') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							if(select == '03' && problemProduct.length == 0) {
								this.$refs.showalert.showMOdal('选择第三项时必选附加险！')
								return false
							}
							this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
							this.requestParam.policy.TB_3030101_N.select = select
							this.requestParam.policy.TB_3030101_N.extRiskList = problemProduct
							this.requestParam.policy.TB_3030101_N.allsumpre = this.jiafeiList1.allsumpre
							this.requestParam.policy.dzType += '3030101_N,'

						}
						if(this.show8 == true && ispass) {
							ispass = this.vaild();
							let select
							let problemProduct = this.jiafeiList2.extraList.selected
							if(this.jiafeiList2.selected1 == true) {
								select = '01'
							} else if(this.jiafeiList2.selected2 == true) {
								select = '02'
							} else if(this.jiafeiList2.selected3 == true) {
								select = '03'
							}
							if(select != '01' && select != '02' && select != '03') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							if(select == '03' && problemProduct.length == 0) {
								this.$refs.showalert.showMOdal('选择第三项时必选附加险！')
								return false
							}
							this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
							this.requestParam.policy.TB_3030101_Y.select = select
							this.requestParam.policy.TB_3030101_Y.extRiskList = problemProduct
							this.requestParam.policy.TB_3030101_Y.allsumpre = this.jiafeiList2.allsumpre
							this.requestParam.policy.dzType += '3030101_Y,'

						}
						if(this.show9 == true && ispass) {
							ispass = this.vaild();
							let select
							if(this.jubaoList1.selected1 == true) {
								select = '01'
							} else if(this.jubaoList1.selected2 == true) {
								select = '02'
							}
							if(select != '01' && select != '02') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							this.requestParam.policy.TB_3030101_N = this.TB_3030101_N
							this.requestParam.policy.TB_3030101_N.select = select
							this.requestParam.policy.TB_3030101_N.allsumpre = this.jubaoList1.allsumpre
							this.requestParam.policy.dzType += '3030101_N,'

						}
						if(this.show10 == true && ispass) {
							ispass = this.vaild();
							let select
							if(this.jubaoList2.selected1 == true) {
								select = '01'
							} else if(this.jubaoList2.selected2 == true) {
								select = '02'
							}
							if(select != '01' && select != '02') {
								this.$refs.showalert.showMOdal('单选选项必选其一！')
								return false
							}
							this.requestParam.policy.TB_3030101_Y = this.TB_3030101_Y
							this.requestParam.policy.TB_3030101_Y.select = select
							this.requestParam.policy.TB_3030101_Y.allsumpre = this.jubaoList2.allsumpre
							this.requestParam.policy.dzType += '3030101_Y,'

						}
						if(ispass) {
							this.requestParam.policy.dzType = this.requestParam.policy.dzType.substring(0, this.requestParam.policy.dzType
								.length - 1)
							let requ = this.requestParam
							console.log(requ, '请求参数')
							utils.http.postFast('MOPROBLEMREPLY', requ, (body) => {
								let result = body.policy
								console.log(result, '问题件请求返回')
								if(result.resultCode == 0) {
									this.$refs.showalert.showMOdal(result.resultMessage);
									setTimeout(() => {
										this.$router.push('/backlog')
									}, 1000)
								} else {
									this.$refs.showalert.showMOdal(result.resultMessage)
								}
							})
						}
					})
				}, () => {})
			},
			//投保流程N
			business1() {
				console.log("this.content1" + this.content1)
				console.log("this.appntSign" + this.signImg.appntSign)
				console.log("this.insSign" + this.signImg.insSign)
				if(this.content1 == "" || this.content1 == null) {
					this.$refs.showalert.showMOdal('回复内容不能为空')
					return false
				}
				if(this.policy.holderIssueSend.reaPath == '') {
					this.$refs.showalert.showMOdal('投保人签字不能为空！')
					return false
				}
				this.policy.insuredIssueSend.forEach(item => {
					if(item.reitoapp != '00' && item.reaPath == '') {
						this.$refs.showalert.showMOdal('被保人签字不能为空！')
						return false
					}
				})
				return true
			},
			//投保流程Y
			business2() {
				console.log("this.content2" + this.content2)
				if(this.content2 == "" || this.content2 == null) {
					this.$refs.showalert.showMOdal('回复内容不能为空！')
					return false
				}
				if(this.policy.holderIssueSend.reaPath == '') {
					this.$refs.showalert.showMOdal('投保人签字不能为空！')
					return false
				}
				this.policy.insuredIssueSend.forEach(item => {
					if(item.reitoapp != '00' && item.reaPath == '') {
						this.$refs.showalert.showMOdal('被保人签字不能为空！')
						return false
					}
				})
				return true
			},
			//代理人N
			agent1() {
				console.log("this.content3" + this.content3)
				console.log("this.agentSign" + this.signImg.agentSign)
				if(this.content3 == "" || this.content3 == null) {
					this.$refs.showalert.showMOdal('回复内容不能为空！')
					return false
				}
				if(this.signImg.agentSign == "" || this.signImg.agentSign == null) {
					this.$refs.showalert.showMOdal('代理人签字不能为空！')
					return false
				}
				return true
			},
			//代理人y
			agent2() {
				console.log("this.content4" + this.content4)
				if(this.content4 == "" || this.content4 == null) {
					this.$refs.showalert.showMOdal('回复内容不能为空！')
					return false
				}
				if(this.signImg.agentSign == "" || this.signImg.agentSign == null) {
					this.$refs.showalert.showMOdal('代理人签字不能为空！')
					return false
				}
				return true
			},
			//加费/除责/拒保
			vaild() {
				if(this.policy.holderIssueSend.reaPath == '') {
					this.$refs.showalert.showMOdal('投保人签字不能为空！')
					return false
				}
				this.policy.insuredIssueSend.forEach(item => {
					if(item.reitoapp != '00' && item.reaPath == '') {
						this.$refs.showalert.showMOdal('被保人签字不能为空！')
						return false
					}
				})
				return true
			},
			//删除image
			DeleteImg(index, arr) {
				if(arr == 1) {
					this.imgList_1.splice(index, 1)
				} else if(arr == 2) {
					this.imgList_2.splice(index, 1)
				} else if(arr == 3) {
					this.imgList_3.splice(index, 1)
				} else if(arr == 4) {
					this.imgList_4.splice(index, 1)
				}
			}
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.main-contents {
		bottom: 0 !important;
	}
	
	.textCenter {
		text-align: center;
	}
	
	.display {
		display: inline-block
	}
	
	.photo {
		display: block;
		width: 100%;
		line-height: 45px;
		border: 0;
		background: #fff;
	}
	/*新样式*/
	
	.mainCaption {
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #FEB101;
		background: #F3F3F3;
		text-align: center;
		font-size: 14px;
	}
	
	.fuCaption>p:first-child {
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #fff;
		background: #FEB101;
		text-align: center;
		font-size: 14px;
	}
	
	.fuCaption>p+p,
	.fuCaption>div,
	.fuCaption>table+p {
		margin: 10px 5px;
		padding: 10px;
		line-height: 20px;
	}
	
	.fuCaption>div {
		border-bottom: 1px dashed #AFAFAF;
		input {
			position: relative;
			top: 2px;
		}
		div {
			margin: 1% 10% 1% 3%;
			p {
				border: 1px solid #ddd;
				border-radius: 5px;
				display: inline-block;
				width: 80%;
			}
			img {
				width: 22px;
				height: 22px;
				position: relative;
				top: 5px;
				left: 5px;
			}
		}
		textarea {
			width: 100%;
			height: 50px;
			padding: 5px;
			margin-top: 10px;
			border: 1px solid #C6C6C7;
		}
		span {
			display: block;
			color: #F4A200;
			margin-top: 10px;
		}
	}
	/*
	.fuCaption+p{
		width: 100%;
		height: 10px;
	    border: 1px solid #CECECE;
	    background: #EAEAEA;
	    margin: 15px 0;
	}*/
	
	.fuCaption>div:last-child {
		border: none;
		p:first-child {
			color: #FFB411;
		}
	}
	
	.fuCaption>table {
		width: 100%;
		thead>tr {
			background: #0B3074;
			color: #fff;
			width: 100%;
			height: 45px;
			line-height: 45px;
		}
		th,
		td {
			width: 15%;
			height: 45px;
			vertical-align: middle;
			text-align: center;
		}
		tr>td {
			/*text-align:center;*/
		}
		tr>th:first-child,
		tr>td:first-child {
			width: 25%;
			/*text-align:center;*/
		}
		tbody>tr:last-child>td {
			text-align: left;
			padding-left: 10px;
			height: 40px;
			line-height: 40px;
		}
	}
	
	.part {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		div {
			width: 48%;
			height: 120px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			p {
				height: 25px;
			}
		}
	}
	
	.shares {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		z-index: 10000;
		.content {
			width: 85%;
			background: #fff;
			line-height: 35px;
			box-sizing: border-box;
			margin: 80% auto;
			border: 1px solid #ddd;
			border-radius: 5px;
			padding: 0;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			h3 {
				background: url('./../../../static/img/policy/bg.png') no-repeat top left #fff;
				background-size: 100% 100%;
				text-align: center;
				margin-bottom: 15px;
				padding: 10px 0;
			}
			.flex {
				display: flex;
				justify-content: space-around;
				width: 100%;
				flex-wrap: wrap;
				p {
					width: 43%;
					color: #999;
					border: 1px solid #cbcbcb;
					border-radius: 15px;
					text-align: center;
					background: #fff;
					margin-bottom: 15px;
				}
				p.active {
					background: #FEB101;
					color: #fff;
				}
			}
			.foot {
				text-align: center;
				background: #F0F0F0;
				color: #999;
				padding: 5px 0;
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;
			}
			.footAct {
				background: #FEB101;
				color: #fff;
			}
		}
	}
</style>
