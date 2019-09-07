<template>
	<div>
		<CustomerSearch v-show="customerValue.isopen" v-model="customerValue"></CustomerSearch>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue"></IDCardScanning>
		<OccupationSearch v-show="occupationValue.isopen" v-model="occupationValue"></OccupationSearch>
		<SelectArea v-show="SelectAreaValue.isOpen" @selectadress="selectActions" v-model="SelectAreaValue" @cancel="cancels"></SelectArea>
		<div v-show="mainCustIsOpen">
			<!--第{{toggle.insNo | getInsNo(toggle.insNo)}}-->
			<Headerbtns :title="title">
				<div slot="left" @click="stepSaveNext('back')">
					<i class="fa fa-angle-left"></i>
				</div>
				<div slot="right" @click="sheetVisible = !sheetVisible">
					<i class="fa fa-ellipsis-v"></i>
				</div>
			</Headerbtns>
			<div v-show="loadData" class="main-contents process">
				<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
				<div class="main-contents-right">
					<div class="sheet_a" :class="[showList == '2'?'sheet_b':'',showList == '3'?'sheet_c':'']">
						<p @click="select(1)">身份信息</p>
						<p @click="select(2)">其他信息</p>
						<p @click="select(3)">受益人信息</p>
					</div>
					<div v-show="showList==1">
						<ul>
							<li>
								<p>与投保人关系</p>
								<p>{{insurant.relToAppDesc}}</p>
							</li>
							<li :class="checkData.name!=''?'active':''">
								<p>姓名</p>
								<div>
									<input type="text" v-model="insurant.name" v-supportLetterChinese @focus="removeCheckName('ins')" @blur="checkName('ins')" maxlength="15" placeholder="请输入" :readonly="insurant.memberType == '1'" />
									<img src="../../../static/img/policy/icon_search.png" @click="customerSearch()" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_INSURE,insurant.id)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType=='1'" />
								</div>
							</li>
							<li class="validText" v-show="checkData.name!=''">{{checkData.name}}</li>
							<li>
								<p>证件类型</p>
								<div>
									<label v-if="insurant.memberType!='1'" style="display: flex;justify-content: space-between;width: 85%;">
										<picker v-model="insurant.idType" :values="insurant.idType" :items="dict.cardTypeList" code="code" text="text" @change="changeIdType()"></picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</label>
									<p v-if="insurant.memberType=='1'" style="width: 85%;">{{insurant.idType|Notype}}</p>
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_INSURE,insurant.id)" style="margin-left: 0;" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType=='1'" style="margin-left: 0;" />
								</div>
							</li>
							<li>
								<p>证件号码</p>
								<input type="text" v-model="insurant.idNo" v-filterLetterNumber placeholder="请输入证件号码" :readonly="insurant.memberType == '1'" />
							</li>
							<li>
								<p>证件有效起期</p>
								<div>
									<date-picker v-model="insurant.idStaDate" style="width:85%;" defaultTime="2010-01-01"></date-picker>
									<i class="fa fa-angle-right" aria-hidden="true"></i>
								</div>
							</li>
							<li :class="!insurant.idExpDateLong ?'base':''">
								<p>证件有效止期</p>
								<div style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
									<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!insurant.idExpDateLong">
										<date-picker v-model="insurant.idExpDate" style="width: 85%;" defaultTime="2020-01-01"></date-picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</div>
									<p style="display:flex;align-items: center;line-height: 2;">
										<input type="checkbox" v-model="insurant.idExpDateLong" @change="changeIdExpDateLong()" />
										<span>长期有效</span>
									</p>
								</div>
							</li>
							<li class="sex">
								<p>性别</p>
								<SwitchBox v-if="insurant.memberType!='1'" :optionList="dict.sexList" v-model="insurant.sex"></SwitchBox>
								<SwitchBox v-if="insurant.memberType=='1'" :optionList="dict.sexList" v-model="insurant.sex" :disabled="false"></SwitchBox>
							</li>
							<li>
								<p>出生日期</p>
								<div>
									<date-picker v-if="insurant.memberType!='1'" v-model="insurant.birthday" :defaultTimeYear="defaultTime" :defaultTime="insurant.birthday" style="width: 85%;"></date-picker>
									<p v-if="insurant.memberType=='1'">{{insurant.birthday}}</p>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li>
								<p>国籍</p>
								<label>
								<picker v-model="insurant.nativePlace" :values="insurant.nativePlace" :items="dict.nationalList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
							<li>
								<p>婚姻</p>
								<label>
								<picker v-model="insurant.marriage" :values="insurant.marriage" :items="dict.marriageList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
						</ul>
					</div>
					<div v-show="showList==2">
						<ul>
							<li style="align-items: baseline;">
								<p>联系地址</p>
								<div style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
									<div @click="selectAdress()" style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;">
										<p v-show='insurant.province == ""' style="color:#ccc;width:80%;">请选择</p>
										<p v-show='insurant.province!=""' class="hideText" style="width:80%;">{{insurant.province | getProvinceText}}{{insurant.city | getCityText}}{{insurant.county}}</p>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</div>
									<p style="display:flex;align-items: center;line-height: 2;">
										<input type="checkbox" v-model="toggle.sameTBAddress" @change="changeSyncAddress()" style="height:auto;" />
										<span style="font-size: 14px;">同投保人地址</span>
									</p>
								</div>
							</li>
							<li>
								<p>镇/街道</p>
								<input type="text" v-model="insurant.street" placeholder="**街道" maxlength="150" :readonly="toggle.sameTBAddress" />
							</li>
							<li>
								<p>村/社区</p>
								<input type="text" v-model="insurant.community" placeholder="**小区" maxlength="50" :readonly="toggle.sameTBAddress" />
							</li>
							<li>
								<p>详细地址</p>
								<div>
									<input type="text" v-model="insurant.postalAddress" placeholder="1号楼一单元101室" :readonly="toggle.sameTBAddress" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('ins','postalAddress')" />
								</div>
							</li>
							<li :class="checkData.zipCode!=''?'active':''">
								<p>邮政编码</p>
								<div>
									<input type="text" v-model="insurant.zipCode" v-supportNumber placeholder="请输入邮政编码" maxlength="6" @blur="checkZip('ins')" @focus="removeCheckZip('ins')" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('ins','zipCode')" />
								</div>
							</li>
							<li class="validText" v-show="checkData.zipCode!=''">{{checkData.zipCode}}</li>
							<li :class="checkData.mobile!=''?'active':''">
								<p>手机号码</p>
								<div>
									<input type="text" v-model="insurant.mobile" v-supportNumber placeholder="请录入被保险人手机号码" maxlength="11" :readonly="insurant.age<18" @blur="checkMobile('ins')" @focus="removeCheckMobile('ins')" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('ins','mobile')" />
								</div>
							</li>
							<li class="validText" v-show="checkData.mobile!=''">{{checkData.mobile}}</li>
							<li>
								<p>职业</p>
								<div>
									<p class="job" @click="occupationSearch('ins')">
										<span class="hideText">{{insurant.insOccupation}}</span>
										<i class="fa fa-angle-right"></i>
									</p>
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('ins','occupation')" />
								</div>
							</li>
							<li>
								<p style="line-height:2;">工作单位/学校</p>
								<div>
									<input type="text" v-model="insurant.grpName" maxlength="15" v-filterSpecialChar placeholder="请输入工作单位/学校" :readonly="insurant.age<7" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('ins','grpName')" />
								</div>
							</li>
							<li>
								<p>年收入</p>
								<SwitchBox :optionList="dict.salaryList" v-model="insurant.salaryCode" :desc="insurant.salary" @selected="getSalaryCode" @desc="getSalary" type="salary" style="padding: 2% 0;"></SwitchBox>
							</li>
							<li v-show="showHasInsurance">
								<p>投保时有无社会基本医疗保险</p>
								<SwitchBox :optionList="[{'code':'0','text':'有'},{'code':'1','text':'无'}]" v-model="isHasInsurance" :disabled="false"></SwitchBox>
							</li>
						</ul>
					</div>
					<div v-show="showList==3">
						<ul>
							<li style="justify-content: space-between;">
								<p style="width: auto;">是否为法定受益人</p>
								<SwitchBox :optionList="dict.isHasItem" v-model="newBnfInfo.bnfType" style="width: auto;"></SwitchBox>
							</li>
						</ul>
						<div v-show="newBnfInfo.bnfType=='1' && sum>0">
							<p style="background: #F0F0F0;line-height: 50px;padding: 0 4%;font-size: 16px;color: #333;">主险受益人</p>
							<ul v-for="(item,index) in newBnfInfo.insBnf">
								<p style="background: #F5F5F5;height: 10px;" v-show="index!=0"></p>
								<li v-if="insurant.relToApp!='00'">
									<p>是否同投保人</p>
									<div style="display: flex;">
										<div class="bnfSwitch">
											<p :class="item.bnfInsurant=='0'?'active':''" @click="changeBnfInsurant(item,0)" style="margin-right:10px;">是</p>
											<p :class="item.bnfInsurant=='1'?'active':''" @click="changeBnfInsurant(item,1)">否</p>
										</div>
										<i class="fa fa-close" v-show="newBnfInfo.insBnf.length>1" @click="removeBnfInfo('ins',index)"></i>
									</div>
								</li>
								<li style="position: relative;">
									<p>与被保险人关系</p>
									<div v-show="item.bnfInsurant == '1'">
										<label style="width:100%;display: flex;justify-content: space-between;align-items: center;">
											<picker v-model="item.relToIns" :values="item.relToIns" :items="dict.benefitrelation" code="code" text="text" @change="changeRelation('ins',item,index)"></picker>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</label>
										<span v-show="item.relToIns == '30'" class="hideText" style="position: absolute;right: 30%;">({{item.relToInsDesc}})</span>
									</div>
									<span v-show="item.bnfInsurant == '0'">{{item.relToInsDesc}}</span>
								</li>
								<li>
									<p>姓名</p>
									<div>
										<input type="text" v-model="item.bfcyName" v-supportLetterChinese @focus="removeCheckName()" @blur="checkName()" :readonly="item.bnfInsurant == '0'" maxlength="15" placeholder="请输入" />
										<img v-show="item.bnfInsurant == '1'" src="../../../static/img/policy/icon_search.png" @click="customerSearch('ins',index)" />
										<img v-show="item.bnfInsurant == '1'" src="../../../static/img/policy/icon_camera.png" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_BNF,item.id,'ins',index)" />
									</div>
								</li>
								<li>
									<p>证件类型</p>
									<div v-show="item.bnfInsurant == '1'">
										<label style="display: flex;justify-content: space-between;width: 85%;">
										<picker v-model="item.bfcyIdType" :values="item.bfcyIdType" :items="dict.cardTypeList" code="code" text="text" @change="changeIdType('ins',index)"></picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</label>
										<img src="../../../static/img/policy/icon_camera.png" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_BNF,item.id,'ins',index)" style="margin-left:0;" />
									</div>
									<span v-show="item.bnfInsurant == '0'">{{item.bfcyIdType|getIdType}}</span>
								</li>
								<li>
									<p>证件号码</p>
									<input type="text" v-model="item.bfcyIdCode" placeholder="请输入证件号码" :readonly="item.bnfInsurant == '0'"  v-filterLetterNumber/>
								</li>
								<li>
									<p>证件有效起期</p>
									<div>
										<date-picker v-show="item.bnfInsurant == '1'" v-model="item.idStaDate" style="width:85%;" defaultTime="2010-01-01"></date-picker>
										<span v-show="item.bnfInsurant == '0'">{{item.idStaDate}}</span>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</div>
								</li>
								<li :class="!item.bfcyIsLong ?'base':''">
									<p>证件有效止期</p>
									<div v-show="item.bnfInsurant == '1'" style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
										<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!item.bfcyIsLong">
											<date-picker v-model="item.bfcyIdExpDate" style="width: 85%;" defaultTime="2020-01-01"></date-picker>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</div>
										<p style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.bfcyIsLong" @change="changeIdExpDateLong('ins',index)" />
											<span>长期有效</span>
										</p>
									</div>
									<div v-show="item.bnfInsurant == '0'" style="display: flex;flex-direction: column;align-items: flex-start;height: auto;width:65%;">
										<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!item.bfcyIsLong">
											<span style="width: 85%;">{{item.bfcyIdExpDate}}</span>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</div>
										<p style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.bfcyIsLong" disabled />
											<span>长期有效</span>
										</p>
									</div>
								</li>
								<li class="sex">
									<p>性别</p>
									<SwitchBox v-if="item.bnfInsurant == '1'" :optionList="dict.sexList" v-model="item.bfcySex" :disabled="item.idCardDisable"></SwitchBox>
									<SwitchBox v-if="item.bnfInsurant == '0'" :optionList="dict.sexList" v-model="item.bfcySex" :disabled="false"></SwitchBox>
								</li>
								<li>
									<p>出生日期</p>
									<div>
										<date-picker v-show="item.bnfInsurant == '1'" v-model="item.bfcyBirthday" :defaultTimeYear="defaultTime" :defaultTime="item.bfcyBirthday" style="width: 85%;"></date-picker>
										<span v-show="item.bnfInsurant == '0'">{{item.bfcyBirthday}}</span>
										<i class="fa fa-angle-right"></i>
									</div>
								</li>
								<li>
									<p>国籍</p>
									<label v-show="item.bnfInsurant == '1'">
										<picker v-model="item.bfcyNativePlace" :values="item.bfcyNativePlace" :items="dict.nationalList" code="code" text="text"></picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</label>
									<span v-show="item.bnfInsurant == '0'">{{item.bfcyNativePlace | getNationalItemText(item.bfcyNativePlace)}}</span>
								</li>
								<li style="align-items: baseline;">
									<p>联系地址</p>
									<div style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
										<div v-show="item.bnfInsurant == '1'" @click="selectAdress('ins',index)" style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;">
											<p v-show="item.province==''" style="color:#ccc;width:80%;">请选择</p>
											<p v-show="item.province!=''" class="hideText"  style="width:80%;">{{item.province|getProvinceText}}{{item.city|getCityText}}{{item.county}}</p>
											<i class="fa fa-angle-right"></i>
										</div>
										<span v-show="item.bnfInsurant == '0'">{{item.province|getProvinceText}}{{item.city|getCityText}}{{item.county}}</span>
										<p v-if="item.bnfInsurant=='0'" style="display:flex;align-items: center;line-height: 2;">
											<input disabled="disabled" checked type="checkbox" style="height:auto;" />
											<span style="font-size: 14px;">同投保人地址</span>
										</p>
										<p v-if="item.bnfInsurant=='1'" style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.state" @change="changeBnfSyncAddress(item)" style="height:auto;" />
											<span style="font-size: 14px;">同投保人地址</span>
										</p>
									</div>
								</li>
								<li>
									<p>镇/街道</p>
									<input type="text" v-model="item.street" placeholder="**街道" maxlength="150" :readonly="item.bnfInsurant == '0'" />
								</li>
								<li>
									<p>村/社区</p>
									<input type="text" v-model="item.community" placeholder="**小区" maxlength="50" :readonly="item.bnfInsurant == '0'" />
								</li>
								<li>
									<p>详细地址</p>
									<div>
										<input type="text" v-model="item.postalAddress" placeholder="1号楼一单元101室" maxlength="200" :readonly="item.bnfInsurant == '0'" />
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','postalAddress',item)" />
									</div>
								</li>
								<li>
									<p>手机号码</p>
									<div>
										<input type="text" v-model="item.phone" v-supportNumber placeholder="请输入手机号码" maxlength="11" :readonly="item.bnfInsurant == '0'||item.age < 18" />
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','phone',item)" />
									</div>
								</li>
								<li>
									<p>职业</p>
									<div v-show="item.bnfInsurant == '1'">
										<p class="job" @click="occupationSearch('bnf',item)">
											<span v-if="item.occupation==''" style="color:#ccc;">请选择</span>
											<span v-if="item.occupation!=''" class="hideText">{{item.occupation}}</span>
											<i class="fa fa-angle-right"></i>
										</p>
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','occupation',item)" />
									</div>
									<span v-show="item.bnfInsurant == '0'" style="width: 60%;font-size: 14px;line-height: 2;">{{item.occupation}}</span>
								</li>
								<li>
									<p>受益顺序</p>
									<SwitchBox :optionList="dict.bfcyLevelList" v-model="item.bfcyLevel"></SwitchBox>
								</li>
								<li>
									<p>受益比例</p>
									<SwitchBox :optionList="dict.bfcyRatioList" v-model="item.bfcyRatioCode" :desc="item.bfcyRatio" @selected="getRatioCode" @desc="getRatio" type="ratio" :index="index"></SwitchBox>
								</li>
							</ul>
						</div>
						<div class="addIns" v-show="newBnfInfo.bnfType=='1' && (newBnfInfo.insBnf.length+newBnfInfo.insHMBnf.length) < sum" @click="addBnfInfo('ins')">
							<img src="../../../static/img/policy/icon_add.png" style="width:26px;margin-right:2%;" />
							<span>添加指定受益人</span>
						</div>
						<div v-show="newBnfInfo.bnfType=='1' && toggle.isHM && sum>0">
							<p style="background: #F0F0F0;line-height: 50px;padding: 0 4%;font-size: 16px;color: #333;">豁免险受益人</p>
							<ul v-for="(item,index) in newBnfInfo.insHMBnf">
								<p style="background: #F5F5F5;height: 10px;" v-show="index!=0"></p>
								<li>
									<p>是否同主险被保险人</p>
									<div style="display: flex;">
										<div class="bnfSwitch">
											<p :class="item.bnfHMInsurant=='0'?'active':''" @click="changeBnfHMInsurant(item,0)" style="margin-right:10px;">是</p>
											<p :class="item.bnfHMInsurant=='1'?'active':''" @click="changeBnfHMInsurant(item,1)">否</p>
										</div>
										<i class="fa fa-close" v-show="newBnfInfo.insHMBnf.length>1" @click="removeBnfInfo('insHM',index)"></i>
									</div>
								</li>
								<li style="position: relative;">
									<p>与被保险人关系</p>
									<div v-show="item.bnfHMInsurant == '1'">
										<label style="width:100%;display: flex;justify-content: space-between;align-items: center;">
											<picker v-model="item.relToIns" :values="item.relToIns" :items="dict.benefitrelation" code="code" text="text" @change="changeRelation('insHM',item,index)"></picker>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</label>
										<span v-show="item.relToIns == '30'" class="hideText" style="position: absolute;right: 30%;">({{item.relToInsDesc}})</span>
									</div>
									<span v-show="item.bnfHMInsurant == '0'">{{item.relToInsDesc}}</span>
								</li>
								<li>
									<p>姓名</p>
									<div>
										<input type="text" v-model="item.bfcyName" @blur="testName()" :readonly="item.bnfHMInsurant == '0'" />
										<img v-show="item.bnfHMInsurant == '1'" src="../../../static/img/policy/icon_search.png" @click="customerSearch('insHM',index)" />
										<img v-show="item.bnfHMInsurant == '1'" src="../../../static/img/policy/icon_camera.png" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_BNF,item.id,'insHM',index)" />
									</div>
								</li>
								<li>
									<p>证件类型</p>
									<div v-show="item.bnfHMInsurant == '1'">
										<label style="display: flex;justify-content: space-between;width: 85%;">
										<picker v-model="item.bfcyIdType" :values="item.bfcyIdType" :items="dict.cardTypeList" code="code" text="text" @change="changeIdType('insHM',index)"></picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</label>
										<img src="../../../static/img/policy/icon_camera.png" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_BNF,item.id,'insHM',index)" style="margin-left:0;" />
									</div>
									<span v-show="item.bnfHMInsurant == '0'">{{item.bfcyIdType|getIdType}}</span>
								</li>
								<li>
									<p>证件号码</p>
									<input type="text" v-model="item.bfcyIdCode" placeholder="请输入证件号码" :readonly="item.bnfHMInsurant == '0'" />
								</li>
								<li>
									<p>证件有效起期</p>
									<div>
										<date-picker v-show="item.bnfHMInsurant == '1'" v-model="item.idStaDate" style="width:85%;" defaultTime="2010-01-01"></date-picker>
										<span v-show="item.bnfHMInsurant == '0'">{{item.idStaDate}}</span>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</div>
								</li>
								<li :class="!item.bfcyIsLong ?'base':''">
									<p>证件有效止期</p>
									<div v-show="item.bnfHMInsurant == '1'" style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
										<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!item.bfcyIsLong">
											<date-picker v-model="item.bfcyIdExpDate" style="width:85%;" defaultTime="2020-01-01"></date-picker>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</div>
										<p style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.bfcyIsLong" @change="changeIdExpDateLong('insHM',index)" />
											<span>长期有效</span>
										</p>
									</div>
									<div v-show="item.bnfHMInsurant == '0'" style="display: flex;flex-direction: column;align-items: flex-start;height: auto;width:65%;">
										<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!item.bfcyIsLong">
											<span style="width:85%;">{{item.bfcyIdExpDate}}</span>
											<i class="fa fa-angle-right" aria-hidden="true"></i>
										</div>
										<p style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.bfcyIsLong" disabled />
											<span>长期有效</span>
										</p>
									</div>
								</li>
								<li class="sex">
									<p>性别</p>
									<SwitchBox v-if="item.bnfHMInsurant == '1'" :optionList="dict.sexList" v-model="item.bfcySex"></SwitchBox>
									<SwitchBox v-if="item.bnfHMInsurant == '0'" :optionList="dict.sexList" v-model="item.bfcySex" :disabled="false"></SwitchBox>
								</li>
								<li>
									<p>出生日期</p>
									<div>
										<date-picker v-show="item.bnfHMInsurant == '1'" v-model="item.bfcyBirthday" :defaultTimeYear="defaultTime" :defaultTime="item.bfcyBirthday" style="width: 85%;"></date-picker>
										<span v-show="item.bnfHMInsurant == '0'">{{item.bfcyBirthday}}</span>
										<i class="fa fa-angle-right"></i>
									</div>
								</li>
								<li>
									<p>国籍</p>
									<label v-show="item.bnfHMInsurant == '1'">
								<picker v-model="item.bfcyNativePlace" :values="item.bfcyNativePlace" :items="dict.nationalList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
									<span v-show="item.bnfHMInsurant == '0'">{{item.bfcyNativePlace | getNationalItemText(item.bfcyNativePlace)}}</span>
								</li>
								<li style="align-items: baseline;">
									<p>联系地址</p>
									<div style="display: flex;flex-direction: column;align-items: flex-start;height: auto;">
										<div v-show="item.bnfHMInsurant == '1'" @click="selectAdress('insHM',index)" style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;">
											<span v-show="item.province==''" style="color:#ccc;">请选择</span>
											<span v-show="item.province!=''" class="hideText">{{item.provinceDesc}}{{item.cityDesc}}{{item.county}}</span>
											<i class="fa fa-angle-right"></i>
										</div>
										<span v-show="item.bnfHMInsurant == '0'">{{item.province|getProvinceText}}{{item.city|getCityText}}{{item.county}}</span>
										<p style="display:flex;align-items: center;line-height: 2;">
											<input type="checkbox" v-model="item.state" @change="changeBnfSyncAddress(item)" style="height:auto;" />
											<span style="font-size: 14px;">同投保人地址</span>
										</p>
									</div>
								</li>
								<li>
									<p>镇/街道</p>
									<input type="text" v-model="item.street" placeholder="**街道" maxlength="150" :readonly="item.bnfHMInsurant == '0'" />
								</li>
								<li>
									<p>村/社区</p>
									<input type="text" v-model="item.community" placeholder="**小区" maxlength="50" :readonly="item.bnfHMInsurant == '0'" />
								</li>
								<li>
									<p>详细地址</p>
									<div>
										<input type="text" v-model="item.postalAddress" placeholder="1号楼一单元101室" maxlength="200" :readonly="item.bnfHMInsurant == '0'" />
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','postalAddress',item)" />
									</div>
								</li>
								<li>
									<p>手机号码</p>
									<div>
										<input type="text" v-model="item.phone" v-supportNumber placeholder="请输入手机号码" maxlength="11" :readonly="item.bnfHMInsurant == '0'||item.age < 18" />
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','phone',item)" />
									</div>
								</li>
								<li>
									<p>职业</p>
									<div v-show="item.bnfHMInsurant == '1'">
										<p class="job" @click="occupationSearch('bnf',item)">
											<span v-show="item.occupation==''" style="color:#ccc;">请选择</span>
											<span v-show="item.occupation!=''" class="hideText">{{item.occupation}}</span>
											<i class="fa fa-angle-right"></i>
										</p>
										<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('bnf','occupation',item)" />
									</div>
									<span v-show="item.bnfHMInsurant == '0'" style="width: 60%;font-size: 14px;line-height: 2;">{{item.occupation}}</span>
								</li>
								<li>
									<p>受益顺序</p>
									<SwitchBox :optionList="dict.bfcyLevelList" v-model="item.bfcyLevel"></SwitchBox>
								</li>
								<li>
									<p>受益比例</p>
									<SwitchBox :optionList="dict.bfcyRatioList" v-model="item.bfcyRatioCode" :desc="item.bfcyRatio" type="ratio" @selected="getRatioCodes" @desc="getRatios" :index="index"></SwitchBox>
								</li>
							</ul>
						</div>
						<div class="addIns" v-show="newBnfInfo.bnfType=='1' && toggle.isHM && (newBnfInfo.insBnf.length+newBnfInfo.insHMBnf.length) < sum" @click="addBnfInfo('insHM')">
							<img src="../../../static/img/policy/icon_add.png" style="width:26px;margin-right:2%;" />
							<span>添加指定受益人</span>
						</div>
					</div>
				</div>
			</div>
      	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
			<FooterBar>
				<div slot="center" @click="stepSave">下一步</div>
			</FooterBar>
			<prompt ref="btn" @detonate="relationEdit"></prompt>
			<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		</div>
	</div>
</template>
<script>
	import { Actionsheet } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import SwitchBox from '../policy/common/SwitchSingleBox.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import CustomerSearch from '../common/CustomerSearch.vue'
	import IDCardScanning from '../common/IDCardScanning.vue'
	import OccupationSearch from '../common/OccupationSearch.vue'
	import picker from '../common/Picker.vue'
	import datePicker from '../common/DatePicker.vue'
	import prompt from '../policy/common/prompt.vue'
	import SelectArea from '../policy/common/SelectArea.vue'
	import relationBenefitList from '../../../static/dict/relation_benefit.json'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import marriageList from '../../../static/dict/marriage_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	import cityList from '../../../static/dict/city_sunlife.json'
	import global_constant from '../../assets/data/global_constant.json'
	import '../policy/css/base.css'
	import '../policy/css/process.css'

	export default {
		name: "custDetails",
		components: {
			Headerbtns,
			FooterBar,
			SwitchBox,
			NavigationBox,
			CustomerSearch,
			IDCardScanning,
			OccupationSearch,
			picker,
			datePicker,
			prompt,
			SelectArea
		},
		data() {
			return {
				loadData:false,
				showHasInsurance: false,
				isHasInsurance: '',
				title: '完善被保人信息',
				showNavList: false,
				navigationList: [],
				showList: 1,
				defaultTime: '30',
				sum: 15,
				productDefList: [], //产品定义
				dict: {
					global_constant: global_constant.constant,
					relationBenefitList: relationBenefitList.relation.item,
					cardTypeList: cardTypeList.dict_cardtype.item,
					nationalList: nationalList.national.item,
					marriageList: marriageList.marriage.item,
					benefitrelation: [],
					sexList: [{
							code: '1',
							text: '男'
						},
						{
							code: '2',
							text: '女'
						},
					],
					salaryList: [{
							"code": '1',
							"val": '10',
							"text": '10万'
						},
						{
							"code": '2',
							"val": '20',
							"text": '20万'
						},
						{
							"code": '3',
							"val": '30',
							"text": '30万'
						},
						{
							"code": '4',
							"val": '40',
							"text": '40万'
						},
						{
							"code": '5',
							"val": '50',
							"text": '50万'
						},
						{
							"code": '6',
							"val": '',
							"text": '其它'
						}

					],
					isHasItem: [{
							"code": '0',
							"text": '是'
						},
						{
							"code": '1',
							"text": '否'
						}
					],
					bfcyLevelList: [{
							"code": '1',
							"text": '第一'
						},
						{
							"code": '2',
							"text": '第二'
						},
						{
							"code": '3',
							"text": '第三'
						},
						{
							"code": '4',
							"text": '第四'
						},
						{
							"code": '5',
							"text": '第五'
						}
					],
					bfcyRatioList: [{
							"code": '0',
							"text": '50%'

						},
						{
							"code": '1',
							"text": '100%'

						},
						{
							"code": '2',
							"text": '其他'

						}
					]
				},
				sheetVisible: false,
				actions: [{
						name: "刷新页面",
						method: this.winReload
					},
					{
						name: "返回首页",
						method: this.stepSaveNext
					}
				],
				customerValue: {
					isopen: false,
					type: '',
					index: '',
					cusItem: {},
					searchType: '1'
				},
				cardScanningValue: {
					isopen: false,
					type: '',
					id: '',
					bnfType: '',
					index: '',
					cusItem: {}
				},
				occupationValue: {
					isopen: false,
					type: '',
					obj: '',
					occItem: '',
					speechRecVal: ''
				},
				SelectAreaValue: {
					isOpen: false,
					type: '',
					index: '',
					areaItem: ''
				},
				checkData: {
					name: '',
					zipCode: '',
					mobile: ''
				},
				toggle: {
					insNo: this.$route.params.insNo,
					sameTBAddress: false,
					hasYiLIao: false,
					hasYiLIao_plan: '',
					isHM: false,
					HMproductName: '',
				},
				insurant: {
					relToApp: "",
					relToAppDesc: "",
					name: "",
					idType: "11",
					idNo: "",
					idStaDate: "",
					idExpDate: "",
					idExpDateLong: false,
					sex: "1",
					birthday: "",
					nativePlace: "CHN",
					marriage: "",
					sameTBAddress: "", //0-true 1-false
					province: "",
					provinceDesc: "",
					city: "",
					cityDesc: "",
					county: "",
					street: "",
					community: "",
					postalAddress: "",
					zipCode: "",
					email: "",
					mobile: "",
					occupationCode: "",
					occupationType: "",
					insOccupation: "",
					grpName: "",
					salary: "",
					isHasInsurance: "", //0-是 1-否
				},
				newBnfInfo: {
					bnfType: "0", //0-法定 1-指定
					insBnf: [], //0
					insHMBnf: [] //1
				},
				policy: {},
			}
		},
		mounted() {
			if(this.$route.params.step != '') {
				this.showList = this.$route.params.step
			}
			let requ = {
				"productDef": {
					"agentCode": utils.cache.get('personsal').agentCode || '',
					"productCode": utils.cache.get('productCodeDetail'),
					"token": new Date().getTime(),
					"openId": "1",
					"channel": utils.cache.get('channel')
				}
			}
			utils.http.post('PRODUCTDEFLIST', requ).then(response => {
				if(response.data.header.responseCode == 0) {
					this.productDefList = response.data.response.productDefList[0]
					console.log('this.productDefList', this.productDefList)
					this.getPolicyMsg()
				}
			}, true)
			for(let item of this.dict.relationBenefitList) {
				if(item.code != '00') {
					this.dict.benefitrelation.push(item)
				}
			}
		},
		computed: {
			customerIsOpen() {
				return this.customerValue.isopen
			},
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
			},
			occupationIsOpen() {
				return this.occupationValue.isopen
			},
			mainCustIsOpen() {
				if(this.customerValue.isopen || this.cardScanningValue.isopen || this.occupationValue.isopen || this.SelectAreaValue.isOpen) {
					return false
				} else {
					return true
				}
			},
			insurantIdType() {
				return this.insurant.idType
			},
			insurantIdNo() {
				return this.insurant.idNo
			},
			insurantBirthday() {
				return this.insurant.birthday
			},
			changeBnfType() {
				return this.newBnfInfo.bnfType
			},
		},
		watch: {
			showNavList(val, oldval) {
				if(val == true) {
					let sum = 0
					let interval = setInterval(() => {
						sum += 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 50) {
							clearInterval(interval)
						}
					}, 5)
				} else {
					let sum = 50
					let interval = setInterval(() => {
						sum -= 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 0) {
							clearInterval(interval)
						}
					}, 5)
				}
			},
			customerIsOpen(val, oldval) {
				if(!val) {
					if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.data != undefined && this.customerValue.cusItem.data.appntMsg.appntName != undefined) {
						if(this.customerValue.type == undefined) {
							utils.common.customerConvertInPolicy('INS', this.insurant, this.customerValue.cusItem.data.appntMsg)
							this.insurant.idExpDateLong = (this.customerValue.cusItem.data.appntMsg.idExpDate == '2200-12-31') ? true : false
							this.insurant.age = utils.valid.getAge(this.insurant.birthday)
						} else if(this.customerValue.type == 'ins') {
							utils.common.customerConvertInPolicy('BENEFIC', this.newBnfInfo.insBnf[this.customerValue.index], this.customerValue.cusItem.data.appntMsg)
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyIsLong = (this.customerValue.cusItem.data.appntMsg.idExpDate == '2200-12-31') ? true : false
							this.newBnfInfo.insBnf[this.customerValue.index].age = utils.valid.getAge(this.newBnfInfo.insBnf[this.customerValue.index].bfcyBirthday)
						} else {
							utils.common.customerConvertInPolicy('BENEFIC', this.newBnfInfo.insHMBnf[this.customerValue.index], this.customerValue.cusItem.data.appntMsg)
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyIsLong = (this.customerValue.cusItem.data.appntMsg.idExpDate == '2200-12-31') ? true : false
							this.newBnfInfo.insHMBnf[this.customerValue.index].age = utils.valid.getAge(this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyBirthday)
						}
					} else if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.customerName != undefined) {
						if(this.customerValue.type == undefined) {
							this.insurant.name = this.customerValue.cusItem.customerName
							this.insurant.idType = this.customerValue.cusItem.idType
							this.insurant.idNo = this.customerValue.cusItem.idNo
							this.insurant.idStaDate = this.customerValue.cusItem.idStartDate
							this.insurant.idExpDate = this.customerValue.cusItem.idEndDate
							this.insurant.idExpDateLong = (this.customerValue.cusItem.idEndDate == '2200-12-31') ? true : false
							this.insurant.sex = this.customerValue.cusItem.sex
							this.insurant.birthday = this.customerValue.cusItem.birthday
							this.insurant.marriage = this.customerValue.cusItem.isMarriage
							this.insurant.province = this.customerValue.cusItem.province
							this.insurant.city = this.customerValue.cusItem.city
							this.insurant.county = this.customerValue.cusItem.county
							this.insurant.street = this.customerValue.cusItem.street
							this.insurant.community = this.customerValue.cusItem.community
							this.insurant.postalAddress = this.customerValue.cusItem.postalAddress
							this.insurant.zipCode = this.customerValue.cusItem.zipcode
							this.insurant.mobile = this.customerValue.cusItem.mobile
							this.insurant.insOccupation = this.customerValue.cusItem.workType
							this.insurant.occupationCode = this.customerValue.cusItem.occupationCode
							this.insurant.occupationType = this.customerValue.cusItem.occupationType
							this.insurant.grpName = this.customerValue.cusItem.grpName
							this.insurant.salary = this.customerValue.cusItem.salary
							this.insurant.age = utils.valid.getAge(this.insurant.birthday)
						} else if(this.customerValue.type == 'ins') {
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyName = this.customerValue.cusItem.customerName
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyIdType = this.customerValue.cusItem.idType
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyIdCode = this.customerValue.cusItem.idNo
							this.newBnfInfo.insBnf[this.customerValue.index].idStaDate = this.customerValue.cusItem.idStartDate
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyIdExpDate = this.customerValue.cusItem.idEndDate
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyIsLong = (this.customerValue.cusItem.idEndDate == '2200-12-31') ? true : false
							this.newBnfInfo.insBnf[this.customerValue.index].bfcySex = this.customerValue.cusItem.sex
							this.newBnfInfo.insBnf[this.customerValue.index].bfcyBirthday = this.customerValue.cusItem.birthday
							this.newBnfInfo.insBnf[this.customerValue.index].province = this.customerValue.cusItem.province
							this.newBnfInfo.insBnf[this.customerValue.index].city = this.customerValue.cusItem.city
							this.newBnfInfo.insBnf[this.customerValue.index].county = this.customerValue.cusItem.county
							this.newBnfInfo.insBnf[this.customerValue.index].street = this.customerValue.cusItem.street
							this.newBnfInfo.insBnf[this.customerValue.index].community = this.customerValue.cusItem.community
							this.newBnfInfo.insBnf[this.customerValue.index].postalAddress = this.customerValue.cusItem.postalAddress
							this.newBnfInfo.insBnf[this.customerValue.index].phone = this.customerValue.cusItem.mobile
							this.newBnfInfo.insBnf[this.customerValue.index].occupation = this.customerValue.cusItem.workType
							this.newBnfInfo.insBnf[this.customerValue.index].occupationCode = this.customerValue.cusItem.occupationCode
							this.newBnfInfo.insBnf[this.customerValue.index].occupationType = this.customerValue.cusItem.occupationType
							this.newBnfInfo.insBnf[this.customerValue.index].age = utils.valid.getAge(this.insurant.bfcyBirthday)
						} else {
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyName = this.customerValue.cusItem.customerName
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyIdType = this.customerValue.cusItem.idType
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyIdCode = this.customerValue.cusItem.idNo
							this.newBnfInfo.insHMBnf[this.customerValue.index].idStaDate = this.customerValue.cusItem.idStartDate
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyIdExpDate = this.customerValue.cusItem.idEndDate
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyIsLong = (this.customerValue.cusItem.idEndDate == '2200-12-31') ? true : false
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcySex = this.customerValue.cusItem.sex
							this.newBnfInfo.insHMBnf[this.customerValue.index].bfcyBirthday = this.customerValue.cusItem.birthday
							this.newBnfInfo.insHMBnf[this.customerValue.index].province = this.customerValue.cusItem.province
							this.newBnfInfo.insHMBnf[this.customerValue.index].city = this.customerValue.cusItem.city
							this.newBnfInfo.insHMBnf[this.customerValue.index].county = this.customerValue.cusItem.county
							this.newBnfInfo.insHMBnf[this.customerValue.index].street = this.customerValue.cusItem.street
							this.newBnfInfo.insHMBnf[this.customerValue.index].community = this.customerValue.cusItem.community
							this.newBnfInfo.insHMBnf[this.customerValue.index].postalAddress = this.customerValue.cusItem.postalAddress
							this.newBnfInfo.insHMBnf[this.customerValue.index].phone = this.customerValue.cusItem.mobile
							this.newBnfInfo.insHMBnf[this.customerValue.index].occupation = this.customerValue.cusItem.workType
							this.newBnfInfo.insHMBnf[this.customerValue.index].occupationCode = this.customerValue.cusItem.occupationCode
							this.newBnfInfo.insHMBnf[this.customerValue.index].occupationType = this.customerValue.cusItem.occupationType
							this.newBnfInfo.insHMBnf[this.customerValue.index].age = utils.valid.getAge(this.insurant.bfcyBirthday)
						}
					}
				}
			},
			cardScannIsOpen(val, oldval) {
				if(!val) {
					if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined) {
						if(this.cardScanningValue.type == this.dict.global_constant.TAG_SEARCH_CUS_INSURE) {
							utils.common.cardScanningValueChange(3, this.insurant, this.cardScanningValue)
							this.insurant.idExpDateLong = (this.cardScanningValue.cusItem.valid_date == '2200-12-31') ? true : false
						} else {
							if(this.cardScanningValue.bnfType == 'ins') {
								utils.common.cardScanningValueChange(4, this.newBnfInfo.insBnf[this.cardScanningValue.index], this.cardScanningValue)
								this.newBnfInfo.insBnf[this.cardScanningValue.index].bfcyIsLong = (this.cardScanningValue.cusItem.valid_date == '2200-12-31') ? true : false
							} else {
								utils.common.cardScanningValueChange(4, this.newBnfInfo.insHMBnf[this.cardScanningValue.index], this.cardScanningValue)
								this.newBnfInfo.insHMBnf[this.cardScanningValue.index].bfcyIsLong = (this.cardScanningValue.cusItem.valid_date == '2200-12-31') ? true : false
							}
						}
					}
				}
			},
			occupationIsOpen(val, oldval) {
				if(!val) {
					if(this.occupationValue.occItem != undefined) {
						if(this.occupationValue.type == 'ins') {
							utils.common.occupationValueChange(3, this.insurant, this.occupationValue)
						} else if(this.occupationValue.type == 'bnf') {
							utils.common.occupationValueChange(4, this.occupationValue.obj, this.occupationValue)
							//utils.common.occupationValueChange(4, this.newBnfInfo.insBnf[this.occupationValue.index], this.occupationValue)
						} else {
							//utils.common.occupationValueChange(4, this.newBnfInfo.insHMBnf[this.occupationValue.index], this.occupationValue)
						}
					}
				}
			},
			insurantIdType(val, oldval) {
				if(val != oldval) {
					if(val == '12') {
						if(this.insurant.birthday != '') {
							this.insurant.idStaDate = this.insurant.birthday
							let value = this.idExpDateValid(this.insurant.birthday, 16)
							this.$nextTick(() => {
								this.insurant.idExpDateLong = false
								this.insurant.idExpDate = value
							})
						}
					} else if(val == '20') {
						if(this.insurant.birthday != '') {
							this.insurant.idStaDate = this.insurant.birthday
							let value = this.idExpDateValid(this.insurant.birthday, 3)
							this.$nextTick(() => {
								this.insurant.idExpDateLong = false
								this.insurant.idExpDate = value
							})
						}
					}
				}
			},
			insurantIdNo(val, oldval) {
				if(val != oldval) {
					if(this.insurant.idType != undefined && this.insurant.idType != '') {
						if(this.insurant.idType == '11') {
							this.insurant.idNo = val.replace(/x/, 'X')
							if(val.length == 18) {
								if(utils.valid.checkIdCard(val)) {
									this.insurant.birthday = val.slice(6, 10) + '-' + val.slice(10, 12) + '-' + val.slice(12, 14)
									let sex = val.slice(16, 17)
									if(sex % 2 == 1) {
										this.insurant.sex = 1
									} else if(sex % 2 == 0) {
										this.insurant.sex = 2
									}
								}
							}
						}
					}
				}
			},
			insurantBirthday(val, oldval) {
				if(val != undefined && val != '') {
					this.insurant.age = utils.valid.getAge(val)
					if(this.insurant.age < 18) {
						this.$nextTick(() => {
							this.insurant.marriage = '10'
						})
					}
				}
				if(val != oldval) {
					this.insurant.age = utils.valid.getAge(val)
					if(this.insurant.age < 7) {
						this.insurant.occupationCode = '1001007'
						this.insurant.occupationType = '1'
						this.insurant.insOccupation = '学龄前儿童'
						this.insurant.grpName = ''
					} else {
						if(this.insurant.insOccupation == '学龄前儿童') {
							this.insurant.occupationCode = ''
							this.insurant.occupationType = ''
							this.insurant.insOccupation = ''
						}
						if(this.insurant.age < 18) {
							this.insurant.mobile = ''
							this.$nextTick(() => {
								this.insurant.marriage = '10'
							})
						}
					}
					if(this.insurant.idType == '12') {
						this.insurant.idStaDate = val
						let value = this.idExpDateValid(val, 16)
						this.$nextTick(() => {
							this.insurant.idExpDateLong = false
							this.insurant.idExpDate = value
						})
					} else if(this.insurant.idType == '20') {
						this.insurant.idStaDate = val
						let value = this.idExpDateValid(val, 3)
						this.$nextTick(() => {
							this.insurant.idExpDateLong = false
							this.insurant.idExpDate = value
						})
					}
				}
			},
			changeBnfType(val, oldval) {
				if(val == 0) {
					this.newBnfInfo.insBnf = []
					this.newBnfInfo.insHMBnf = []
				} else {
					if(this.sum == 0) {
						this.newBnfInfo.bnfType = '0'
						this.newBnfInfo.insBnf = []
						this.newBnfInfo.insHMBnf = []
						this.showToast('受益人已添加至最多，无法再添加')
					} else {
						if(this.newBnfInfo.insBnf.length == 0) {
							this.addBnfInfo('ins')
						}
						if(this.toggle.isHM && this.newBnfInfo.insHMBnf.length == 0) {
							this.addBnfInfo('insHM')
						}
					}
				}
			},
			'newBnfInfo.insBnf': {
				handler(val, oldval) {
					console.log('监听被保人受益人', val)
					if(val.length > 0) {
						this.watcherBnfInfo(val)
					}
				},
				deep: true
			},
			'newBnfInfo.insHMBnf': {
				handler(val, oldval) {
					console.log('监听豁免险受益人', val)
					if(val.length > 0) {
						this.watcherBnfInfo(val)
					}
				},
				deep: true
			},
		},
		filters: {
			getInsNo(code) {
				if(code == '-1') {
					return '一'
				} else if(code == '0') {
					return '二'
				} else if(code == '1') {
					return '三'
				} else if(code == '2') {
					return '四'
				} else if(code == '3') {
					return '五'
				} else if(code == '4') {
					return '六'
				}
			},
			getIdType(code) {
				for(let item of cardTypeList.dict_cardtype.item) {
					if(code == item.code) {
						return item.text
					}
				}
			},
			getRelToIns(code, item) {
				if(code != 30) {
					for(let item of relationBenefitList.relation.item) {
						if(code == item.code) {
							return item.text
						}
					}
				} else {
					return item.relToInsDesc
				}
			},
			getNationalItemText(code) {
				for(let item of nationalList.national.item) {
					if(code == item.code) {
						return item.text
					}
				}
			},
			getProvinceText(code) {
				for(let items of provinceList.province.item) {
					if(items.code == code) {
						return items.text
					}
				}
			},
			getCityText(code) {
				for(let items of cityList.city.item) {
					if(items.code == code) {
						return items.text
					}
				}
			},
		},
		methods: {
			getInsShow(code) {
				if(code == '-1') {
					return '第一被保人信息'
				} else if(code == '0') {
					return '第二被保人信息'
				} else if(code == '1') {
					return '第三被保人信息'
				} else if(code == '2') {
					return '第四被保人信息'
				} else if(code == '3') {
					return '第五被保人信息'
				} else if(code == '4') {
					return '第六被保人信息'
				}
			},
			checkNavChangeInfo(){
				if(this.insurant.salaryCode != '6') {
					this.dict.salaryList.forEach(item => {
						if(item.code == this.insurant.salaryCode) {
							this.insurant.salary = item.val
						}
					})
				}
				let result = []
				result = utils.valid.checkDataBase(2, this.insurant)
				if(this.policy.custInfo.appnt.appntSex == 1) {
					if(this.insurant.relToApp == '40') {
						result.push('关系填写有误，请检查')
					} else if(this.insurant.relToApp == '33' || this.insurant.relToApp == '38' || this.insurant.relToApp == '39' || this.insurant.relToApp == '08' || this.insurant.relToApp == '10' || this.insurant.relToApp == '12' || this.insurant.relToApp == '14') {
						if(this.insurant.sex == 1) {
							result.push('关系填写有误，请检查')
						}
					} else if(this.insurant.relToApp == '37') {
						if(this.insurant.sex == 2) {
							result.push('关系填写有误，请检查')
						}
					}
				} else if(this.policy.custInfo.appnt.appntSex == 2) {
					if(this.insurant.relToApp == '37') {
						result.push('关系填写有误，请检查')
					} else if(this.insurant.relToApp == '33' || this.insurant.relToApp == '38' || this.insurant.relToApp == '39' || this.insurant.relToApp == '07' || this.insurant.relToApp == '09' || this.insurant.relToApp == '11' || this.insurant.relToApp == '13') {
						if(this.insurant.sex == 2) {
							result.push('关系填写有误，请检查')
						}
					} else if(this.insurant.relToApp == '40') {
						if(this.insurant.sex == 1) {
							result.push('关系填写有误，请检查')
						}
					}
				}
				//被保人重复
				if(this.toggle.insNo == '-1') {
					if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						for(let item of this.policy.custInfo.insurants.otherInsurant.insurant) {
							if(this.insurant.idNo == item.idNo && item.relToApp != '00') {
								result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
							}
						}
					}
				} else if(this.policy.custInfo.insurants.firstInsurant.relToApp == '00' && this.insurant.idNo == this.policy.custInfo.appnt.idNo) {
					result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
				} else if(this.policy.custInfo.insurants.firstInsurant.relToApp != '00' && this.insurant.idNo == this.policy.custInfo.insurants.firstInsurant.idNo) {
					result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
				} else {
					this.policy.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
						if(item.relToApp == '00' && this.insurant.idNo == this.policy.custInfo.appnt.idNo) {
							result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
						}
						if(item.relToApp != '00' && this.insurant.idNo == item.idNo && this.toggle.insNo != index) {
							result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
						}
					})
				}
				if(result.length > 0) {
					return result
				}
				result = utils.valid.checkDataDetails(2, this.insurant)
				if(result.length > 0) {
					return result
				}
				if(this.newBnfInfo.bnfType == '1') {
					if(this.newBnfInfo.insBnf.length == 0) {
						result.push("已选择指定受益人,请填写受益人信息")
					} else {
						this.newBnfInfo.insBnf.forEach(item => {
							if(item.bfcyRatioCode == '0') {
								item.bfcyRatio = '50'
							} else if(item.bfcyRatioCode == '1') {
								item.bfcyRatio = '100'
							}
						})
						let msg = this.checkBnfBaseInfo(this.newBnfInfo.insBnf, this.insurant.sex)
						if(msg != undefined && msg != "") {
							result = result.concat(msg)
						}
						if(this.toggle.isHM == true) {
							if(this.newBnfInfo.insHMBnf.length == 0) {
								result.push("选择" + this.toggle.HMproductName + "时，被保险人受益人与豁免险被保险人受益人需同时法定或同时指定。")
							} else {
								this.newBnfInfo.insHMBnf.forEach(item => {
									if(item.bfcyRatioCode == '0') {
										item.bfcyRatio = '50'
									} else if(item.bfcyRatioCode == '1') {
										item.bfcyRatio = '100'
									}
								})
								msg = this.checkBnfBaseInfo(this.newBnfInfo.insHMBnf, this.policy.custInfo.appnt.appntSex)
								if(msg != undefined && msg != "") {
									result = result.concat(msg)
								}
							}
						}
					}
				}
				if(result.length > 0) {
					return result
				}
				return result
			},
			selectedNav(item) {
				let result = this.checkNavChangeInfo()
				if(result.length > 0) {
					this.showAlert(result)
				} else {
					this.insurant.sameTBAddress = this.toggle.sameTBAddress ? '0' : '1'
					if(this.newBnfInfo.bnfType == '1') {
						if(this.toggle.isHM) {
							let bnfInfo = {
								bnfType: this.newBnfInfo.bnfType,
								beneficiaries: {
									bnfCount: this.newBnfInfo.insBnf.length + this.newBnfInfo.insHMBnf.length,
									beneficiary: this.newBnfInfo.insBnf.concat(this.newBnfInfo.insHMBnf)
								}
							}
							this.insurant.bnfInfo = bnfInfo
						} else {
							let bnfInfo = {
								bnfType: this.newBnfInfo.bnfType,
								beneficiaries: {
									bnfCount: this.newBnfInfo.insBnf.length,
									beneficiary: this.newBnfInfo.insBnf
								}
							}
							this.insurant.bnfInfo = bnfInfo
						}
					} else {
						let bnfInfo = {
							bnfType: this.newBnfInfo.bnfType,
							beneficiaries: {
								bnfCount: '0',
								beneficiary: []
							}
						}
						this.insurant.bnfInfo = bnfInfo
					}
					if(this.toggle.insNo == '-1') {
						this.policy.custInfo.insurants.firstInsurant = JSON.parse(JSON.stringify(this.insurant))
					} else {
						let otherInsurant = this.policy.custInfo.insurants.otherInsurant.insurant
						otherInsurant.forEach((item, index) => {
							if(otherInsurant[index].seqNumber == this.toggle.insNo) {
								otherInsurant[index] = JSON.parse(JSON.stringify(this.insurant))
							}
						})
						this.policy.custInfo.insurants.otherInsurant.insurant = otherInsurant
					}
					let requ = {
						'policy': this.policy
					}
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							let step = utils.cache.get('step_' + this.$route.params.planId)
							if(step > 5) {
								step = 5
							}
							console.log(step)
							if(item.step <= step) {
								if(item.step == 1 || item.step == 3) {
									this.$router.push({
										name: item.name,
										params: {
											planId: this.$route.params.planId,
											step: '1'
										}
									})
								} else if(item.step == 2) {
									this.$router.push({
										name: item.name,
										params: {
											planId: this.$route.params.planId
										}
									})
								} else if(item.step == 4) {
									if(Number(item.seqNumber) < Number(this.toggle.insNo)) {
										this.$router.push({
											name: item.name,
											params: {
												planId: this.$route.params.planId,
												insNo: item.seqNumber,
												step: '1'
											}
										})
										window.location.reload();
									}
								} else {
									this.$router.push({
										name: item.name,
										params: {
											planId: this.$route.params.planId
										}
									})
								}
							} else {
								console.log(item.step)
								console.log(this.policy.substepNo)
								if(utils.cache.get('step_' + this.$route.params.planId) >= 5 && item.step >= 5) {
									alert_n22.confirm('提示', '请打开险种信息页面对信息进行确认！', '打开', '', (flag) => {
										this.$router.push({
											name: 'productsPage',
											params: {
												planId: this.$route.params.planId
											}
										})
									})
								} else {
									alert_n22.alert("提示", "请您按顺序依次填写保单信息！", "确定")
								}
							}
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				}
			},
			select(index) {
				console.log('选中sheet,当前页', index, this.showList)
				if(this.insurant.relToApp == '00') {
					//this.showToast('存在本人关系-当前页不可点')
				} else if(index > this.showList) {
					//this.showToast('请填写当前页后点击下一步继续')
				} else {
					this.showList = index
				}
			},
			stepSave() {
				console.log('保存==>', this.showList)
				if(event.target.disabled) {
					this.showToast('点击太频繁了...')
					return
				}
				if(this.insurant.salaryCode != '6') {
					this.dict.salaryList.forEach(item => {
						if(item.code == this.insurant.salaryCode) {
							this.insurant.salary = item.val
						}
					})
				}
				let result = []
				if(this.showList == 1) {
					result = utils.valid.checkDataBase(2, this.insurant)
					if(this.policy.custInfo.appnt.appntSex == 1) {
						if(this.insurant.relToApp == '40') {
							result.push('关系填写有误，请检查')
						} else if(this.insurant.relToApp == '33' || this.insurant.relToApp == '38' || this.insurant.relToApp == '39' || this.insurant.relToApp == '08' || this.insurant.relToApp == '10' || this.insurant.relToApp == '12' || this.insurant.relToApp == '14') {
							if(this.insurant.sex == 1) {
								result.push('关系填写有误，请检查')
							}
						} else if(this.insurant.relToApp == '37') {
							if(this.insurant.sex == 2) {
								result.push('关系填写有误，请检查')
							}
						}
					} else if(this.policy.custInfo.appnt.appntSex == 2) {
						if(this.insurant.relToApp == '37') {
							result.push('关系填写有误，请检查')
						} else if(this.insurant.relToApp == '33' || this.insurant.relToApp == '38' || this.insurant.relToApp == '39' || this.insurant.relToApp == '07' || this.insurant.relToApp == '09' || this.insurant.relToApp == '11' || this.insurant.relToApp == '13') {
							if(this.insurant.sex == 2) {
								result.push('关系填写有误，请检查')
							}
						} else if(this.insurant.relToApp == '40') {
							if(this.insurant.sex == 1) {
								result.push('关系填写有误，请检查')
							}
						}
					}
					//被保人重复
					if(this.toggle.insNo == '-1') {
						if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
							for(let item of this.policy.custInfo.insurants.otherInsurant.insurant) {
								if(this.insurant.idNo == item.idNo && item.relToApp != '00') {
									result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
								}
							}
						}
					} else if(this.policy.custInfo.insurants.firstInsurant.relToApp == '00' && this.insurant.idNo == this.policy.custInfo.appnt.idNo) {
						result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
					} else if(this.policy.custInfo.insurants.firstInsurant.relToApp != '00' && this.insurant.idNo == this.policy.custInfo.insurants.firstInsurant.idNo) {
						result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
					} else {
						this.policy.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
							if(item.relToApp == '00' && this.insurant.idNo == this.policy.custInfo.appnt.idNo) {
								result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
							}
							if(item.relToApp != '00' && this.insurant.idNo == item.idNo && this.toggle.insNo != index) {
								result.push('被保险人' + this.insurant.name + "请勿重复添加被保人")
							}
						})
					}
				} else if(this.showList == 2) {
					result = utils.valid.checkDataDetails(2, this.insurant)
				} else if(this.showList == 3) {
					if(this.newBnfInfo.bnfType == '1') {
						if(this.newBnfInfo.insBnf.length == 0) {
							result.push("已选择指定受益人,请填写受益人信息")
						} else {
							this.newBnfInfo.insBnf.forEach(item => {
								if(item.bfcyRatioCode == '0') {
									item.bfcyRatio = '50'
								} else if(item.bfcyRatioCode == '1') {
									item.bfcyRatio = '100'
								}
							})
							let msg = this.checkBnfBaseInfo(this.newBnfInfo.insBnf, this.insurant.sex)
							if(msg != undefined && msg != "") {
								result = result.concat(msg)
							}
							if(this.toggle.isHM == true) {
								if(this.newBnfInfo.insHMBnf.length == 0) {
									result.push("选择" + this.toggle.HMproductName + "时，被保险人受益人与豁免险被保险人受益人需同时法定或同时指定。")
								} else {
									this.newBnfInfo.insHMBnf.forEach(item => {
										if(item.bfcyRatioCode == '0') {
											item.bfcyRatio = '50'
										} else if(item.bfcyRatioCode == '1') {
											item.bfcyRatio = '100'
										}
									})
									msg = this.checkBnfBaseInfo(this.newBnfInfo.insHMBnf, this.policy.custInfo.appnt.appntSex)
									if(msg != undefined && msg != "") {
										result = result.concat(msg)
									}
								}
							}
						}
					}
				}
				if(result.length > 0) {
					this.showAlert(result)
				} else {
					this.stepSaveNext('next')
				}
			},
			stepSaveNext(tag) {
				this.insurant.sameTBAddress = this.toggle.sameTBAddress ? '0' : '1'
				if(this.showList == 3) {
					if(this.newBnfInfo.bnfType == '1') {
						if(this.toggle.isHM) {
							let bnfInfo = {
								bnfType: this.newBnfInfo.bnfType,
								beneficiaries: {
									bnfCount: this.newBnfInfo.insBnf.length + this.newBnfInfo.insHMBnf.length,
									beneficiary: this.newBnfInfo.insBnf.concat(this.newBnfInfo.insHMBnf)
								}
							}
							this.insurant.bnfInfo = bnfInfo
						} else {
							let bnfInfo = {
								bnfType: this.newBnfInfo.bnfType,
								beneficiaries: {
									bnfCount: this.newBnfInfo.insBnf.length,
									beneficiary: this.newBnfInfo.insBnf
								}
							}
							this.insurant.bnfInfo = bnfInfo
						}
					} else {
						let bnfInfo = {
							bnfType: this.newBnfInfo.bnfType,
							beneficiaries: {
								bnfCount: '0',
								beneficiary: []
							}
						}
						this.insurant.bnfInfo = bnfInfo
					}
				}
				if(this.toggle.insNo == '-1') {
					this.policy.custInfo.insurants.firstInsurant = JSON.parse(JSON.stringify(this.insurant))
				} else {
					let otherInsurant = this.policy.custInfo.insurants.otherInsurant.insurant
					otherInsurant.forEach((item, index) => {
						if(otherInsurant[index].seqNumber == this.toggle.insNo) {
							otherInsurant[index] = JSON.parse(JSON.stringify(this.insurant))
						}
					})
					this.policy.custInfo.insurants.otherInsurant.insurant = otherInsurant
				}
				let requ = {
					'policy': this.policy
				}
				utils.http.postFast("MODISTRIESAVE", requ, body => {
					if(body.policy.resultCode == '0') {
						if(tag == 'next') {
							if(this.showList != 3) {
								this.showList++
							} else {
								let i
								this.navigationList.forEach((item, index) => {
									if(item.step == 4 && item.seqNumber == this.toggle.insNo) {
										i = index
									}
								})
								if(this.navigationList[i + 1].step == '4') {
									this.$router.push({
										name: this.navigationList[i + 1].name,
										params: {
											planId: this.$route.params.planId,
											insNo: this.navigationList[i + 1].seqNumber,
											step: '1'
										}
									})
									window.location.reload()
								} else {
									this.$router.push({
										name: this.navigationList[i + 1].name,
										params: {
											planId: this.$route.params.planId
										}
									})
								}
							}
						} else if(tag == 'back') {
							if(this.showList == 1 || this.showList == 3 && this.insurant.relToApp == '00') {
								let i
								this.navigationList.forEach((item, index) => {
									if(item.step == 4 && item.seqNumber == this.toggle.insNo) {
										i = index
									}
								})
								if(this.navigationList[i - 1].step == '4') {
									this.$router.push({
										name: this.navigationList[i - 1].name,
										params: {
											planId: this.$route.params.planId,
											insNo: this.navigationList[i - 1].seqNumber,
											step: '3'
										}
									})
									window.location.reload()
								} else {
									this.$router.push({
										name: this.navigationList[i - 1].name,
										params: {
											planId: this.$route.params.planId,
											step: '3'
										}
									})
								}
							} else {
								this.showList--
							}
						} else {
							this.$router.push("/home")
						}
					} else {
						alert_n22.alert("提示", body.policy.resultMessage, "确定")
					}
				})
			},
			checkBnfBaseInfo(val, sex) {
				let result = []
				let msg
				for(let i = 0; i < val.length; i++) {
					msg = utils.valid.checkDataBase(3, val[i])
					if(msg != undefined && msg != "") {
						result = result.concat(msg)
					}
					if(sex == 1) {
						if(val[i].relToIns == '40') {
							result.push('关系填写有误，请检查')
						} else if(val[i].relToIns == '33' || val[i].relToIns == '38' || val[i].relToIns == '39' || val[i].relToIns == '08' || val[i].relToIns == '10' || val[i].relToIns == '12' || val[i].relToIns == '14') {
							if(val[i].bfcySex == 1) {
								result.push('关系填写有误，请检查')
							}
						} else if(val[i].relToIns == '37') {
							if(val[i].bfcySex == 2) {
								result.push('关系填写有误，请检查')
							}
						}
					} else if(sex == 2) {
						if(val[i].relToIns == '37') {
							result.push('关系填写有误，请检查')
						} else if(val[i].relToIns == '33' || val[i].relToIns == '38' || val[i].relToIns == '39' || val[i].relToIns == '07' || val[i].relToIns == '09' || val[i].relToIns == '11' || val[i].relToIns == '13') {
							if(val[i].bfcySex == 2) {
								result.push('关系填写有误，请检查')
							}
						} else if(val[i].relToIns == '40') {
							if(val[i].bfcySex == 1) {
								result.push('关系填写有误，请检查')
							}
						}
					}
					if(val[i].province == '' || val[i].city == '' || val[i].county == '') {
						result.push('请选择投保省市区')
					}
					if(val[i].street == '' && val[i].community == '' && val[i].postalAddress == '') {
						result.push('请输入镇/街道信息')
						result.push('请输入村/社区信息')
						result.push('请输入详细地址信息')
					}
					//					if(val[i].community == '') {
					//						result.push('请输入村/社区信息')
					//					}
					//					if(val[i].postalAddress == '') {
					//						result.push('请输入详细地址信息')
					//					}
					let addrLen = utils.common.length(val[i].street + val[i].community + val[i].postalAddress)
					console.log('详细地址addrLen-->>', addrLen)
					if(addrLen < 10) {
						result.push('村/社区+镇/街道+详细地址长度不可小于10个字符')
					}
					if(addrLen > 50) {
						result.push('村/社区+镇/街道+详细地址长度不可大于50个字符')
					}
					if(utils.valid.getAge(val[i].bfcyBirthday) > 18) {
						if(val[i].phone == '') {
							result.push('请输入手机号码')
						} else if(val[i].phone.length != 11) {
							result.push('手机号必须为11位数字')
						} else if(val[i].phone.substring(0, 1) != 1) {
							result.push('手机号开头必须以1开头')
						}
					}
					if(utils.valid.getAge(val[i].bfcyBirthday) > 6 && (val[i].occupationCode == '' || val[i].occupationType == '' || val[i].occupation == '')) {
						result.push('请选择职业')
					}
					if(val[i].bfcyLevel == '') {
						result.push('请选择受益人受益顺序')
					}
					if(val[i].bfcyRatioCode == '' || val[i].bfcyRatio == '') {
						result.push('请填写受益人受益比例')
					} else if(val[i].bfcyRatio > 100 || val[i].bfcyRatio < 1) {
						result.push('受益人' + val[i].bfcyName + "受益比例只能填写1~100数字")
					}
					if(i == 0) {
						if(val[i].bfcyLevel != '1') {
							result.push('受益人' + val[i].bfcyName + "受益顺序请从1开始")
						}
					} else {
						let bfcyLevels = Number(val[i].bfcyLevel) - Number(val[i - 1].bfcyLevel)
						if(bfcyLevels != 1 && bfcyLevels != 0) {
							result.push('受益人' + val[i].bfcyName + "受益顺序请从1开始，连续数字")
						}
					}
				}
				//受益顺序 比例
				let maxNum = 5
				let dataArr = val
				let benefitArrs = []
				for(let i = 1; i <= maxNum; i++) {
					let benefitArr = []
					benefitArrs.push(benefitArr)
				}
				for(let i in dataArr) {
					benefitArrs[dataArr[i].bfcyLevel - 1].push(dataArr[i])
				}
				console.log('benefitArrs', benefitArrs)
				for(let i in benefitArrs) {
					let allPercentage = 0
					if(benefitArrs[i].length <= 5) {
						for(let j = 0; j < benefitArrs[i].length; j++) {
							if(benefitArrs[i][j].bfcyRatio > 100) {
								//result.push('第' + benefitArrs[i][j].bfcyLevel + '受益人:' + benefitArrs[i][j].bfcyName + '的受益比例不得超过100')
								result.push('同一受益顺序受益比例不能超过100%')
							} else if(benefitArrs[i][j].bfcyRatio <= 0) {
								result.push('第' + benefitArrs[i][j].bfcyLevel + '受益人:' + benefitArrs[i][j].bfcyName + '的受益比例不得小于等于0')
							} else {
								allPercentage += Number(benefitArrs[i][j].bfcyRatio)
							}
							if(j == benefitArrs[i].length - 1) {
								if(allPercentage != 100) {
									result.push('第' + benefitArrs[i][j].bfcyLevel + '受益人总比率需为100%!')
								}
							}
						}
					} else {
						result.push('同一序位受益人不得超过5人')
					}
				}
				//重复受益人
				for(let i in val) {
					let oldBenef = val[i]
					for(let j = i + 1; j < val.length; j++) {
						let nextBenef = val[j]
						if(oldBenef != undefined && nextBenef != undefined) {
							if(oldBenef.bfcyName == nextBenef.bfcyName) {
								if(oldBenef.bfcySex == nextBenef.bfcySex) {
									if(oldBenef.bfcyBirthday == nextBenef.bfcyBirthday) {
										if(oldBenef.bfcyIdType == nextBenef.bfcyIdType) {
											if(oldBenef.bfcyIdCode == nextBenef.bfcyIdCode) {
												result.push('请勿重复添加受益人')
											}
										}
									}
								}
							}
						}
					}
				}
				return result
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "4",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,8',
						"nothave":'1,2,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy = JSON.parse(JSON.stringify(body.policy))
					this.policy.substepNo = '4'
					this.policy.smartStepNo = this.toggle.insNo
					this.navigationList = this.policy.navigationList
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '4') {
							item.path = 'cheng'
						}
						if(item.step == '4') {
							if(Number(item.seqNumber) < Number(this.toggle.insNo)) {
								item.path = 'cheng'
							}
							if(Number(item.seqNumber) == Number(this.toggle.insNo)) {
								item.path = 'lv'
							}
						}
					})
					for(let i = 0; i < this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length; i++) {
						if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[i].belongWith == '') {
							this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(i--, 1)
						}
					}
					for(let i = 0; i < this.policy.custInfo.insurants.otherInsurant.insurant.length; i++) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant[i].name == '') {
							this.policy.custInfo.insurants.otherInsurant.insurant.splice(i--, 1)
						} else {
							for(let j = 0; j < this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.length; j++) {
								if(this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].belongWith == '') {
									this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.splice(j--, 1)
								}
							}
						}
					}
					console.log('policy===>>>', this.policy)
					if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.title = this.getInsShow(this.toggle.insNo)
					}
					if(this.toggle.insNo == '-1') {
						this.insurant = JSON.parse(JSON.stringify(this.policy.custInfo.insurants.firstInsurant))
					} else {
						this.policy.custInfo.insurants.otherInsurant.insurant.forEach(item => {
							if(item.seqNumber == this.toggle.insNo) {
								this.insurant = JSON.parse(JSON.stringify(item))
							}
						})
					}
					this.insurant.idExpDateLong = (this.insurant.idExpDate == '2200-12-31') ? true : false
					this.toggle.sameTBAddress = (this.insurant.sameTBAddress == '0') ? true : false
					this.insurant.age = utils.valid.getAge(this.insurant.birthday)
					console.log('被保人insurant===>>>', this.insurant)
					this.isHasInsurance = this.insurant.isHasInsurance
					if(this.insurant.isHasInsurance !== '') {
						this.showHasInsurance = true
					}
					if(this.insurant.relToApp == '00') {
						this.showList = 3
					}
					let sum = 0
					if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.sum = 15
						this.policy.custInfo.insurants.otherInsurant.insurant.forEach(InsItem => {
							if(InsItem.seqNumber != this.toggle.insNo) {
								sum += InsItem.bnfInfo.beneficiaries.beneficiary.length
							}
						})
						if(this.toggle.insNo != '-1') {
							sum += this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length
						}
					} else {
						this.sum = 6
					}
					this.sum -= sum
					console.log('===>sum', sum, this.sum)
					for(let item of this.insurant.products.product) {
						if(item.prodCode == this.productDefList.productCode) {
							if(this.productDefList.productDefine.isHuomian == 'true') {
								this.toggle.isHM = true
								this.toggle.HMproductName = this.productDefList.productName
							}
							if(this.productDefList.productDefine.hasYiLiao == 'true') {
								this.toggle.hasYiLIao = true
								this.toggle.hasYiLIao_plan = item.rank
							}
						}
						for(let extra of this.productDefList.extraList) {
							if(item.prodCode == extra.productCode) {
								if(extra.productDefine.isHuomian == 'true') {
									this.toggle.isHM = true
									this.toggle.HMproductName = extra.productName
								}
								if(extra.productDefine.hasYiLiao == 'true') {
									this.toggle.hasYiLIao = true
									this.toggle.hasYiLIao_plan = item.rank
								}
							}
						}
					}
					if(this.insurant.bnfInfo.bnfType == '1') { //0-法定 1-指定
						let bnfInfo = JSON.parse(JSON.stringify(this.insurant.bnfInfo))
						this.newBnfInfo.bnfType = bnfInfo.bnfType
						let insBnf = []
						let insHMBnf = []
						for(let item of bnfInfo.beneficiaries.beneficiary) {
							item.bfcyIsLong = (item.bfcyIdExpDate == '2200-12-31') ? true : false
							item.age = utils.valid.getAge(item.bfcyBirthday)
							if(item.belongWith == '1') {
								insBnf.push(item)
							} else if(item.belongWith == '0') {
								insHMBnf.push(item)
							}
						}
						this.newBnfInfo.insBnf = insBnf
						this.newBnfInfo.insHMBnf = insHMBnf
					}
					console.log('受益人newBnfInfo===>>>', this.newBnfInfo)
					console.log('序号/医保/计划/豁免/豁免险', this.toggle.insNo, this.toggle.hasYiLIao, this.toggle.hasYiLIao_plan, this.toggle.isHM, this.toggle.HMproductName)
					this.loadData = true
				}, true)
			},
			winReload() {
				this.$router.push({
					name: "custDetails",
					params: {
						planId: this.$route.params.planId,
						insNo: this.$route.params.insNo,
						step: this.showList
					}
				})
				window.location.reload();
			},
			getSalaryCode(value) {
				if(value == 6) {
					this.insurant.salary = ''
				}
			},
			getSalary(value) {
				this.insurant.salary = value
			},
			customerSearch(type, index) {
				this.customerValue.isopen = !this.customerValue.isopen
				this.customerValue.type = type
				this.customerValue.index = index
				this.customerValue.relationship = ""
				this.customerValue.sex = ""
				if(index != undefined) { //受益人
					this.customerValue.infoId = this.policy.custInfo.insurants.firstInsurant.infoId
				} else { //被保人
					this.customerValue.infoId = ""
				}
			},
			cardScanning(tag, id, bnfType, index) {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
				this.cardScanningValue.type = tag
				this.cardScanningValue.id = id
				this.cardScanningValue.bnfType = bnfType
				this.cardScanningValue.index = index
			},
			occupationSearch(type, obj) {
				this.occupationValue.isopen = !this.occupationValue.isopen
				this.occupationValue.type = type
				this.occupationValue.obj = obj
			},
			getRatioCode(val, index) {
				if(val == 2) {
					this.newBnfInfo.insBnf[index].bfcyRatio = ''
				}
			},
			getRatio(val, index) {
				this.newBnfInfo.insBnf[index].bfcyRatio = val
			},
			getRatioCodes(val, index) {
				if(val == 2) {
					this.newBnfInfo.insHMBnf[index].bfcyRatio = ''
				}
			},
			getRatios(val, index) {
				this.newBnfInfo.insHMBnf[index].bfcyRatio = val
			},
			checkName(tag) {
				if(tag == 'ins') {
					this.insurant.name = this.insurant.name.replace(/\s+/g, "")
					if(this.insurant.name != '' && this.insurant.name.length < 2) {
						this.checkData.name = '请确认输入的姓名是否正确'
					} else {
						this.checkData.name = ''
					}
				}
			},
			removeCheckName(tag) {
				if(tag == 'ins') {
					this.checkData.name = ''
				}
			},
			checkZip(tag) {
				if(tag == 'ins') {
					if(this.insurant.zipCode != '' && this.insurant.zipCode.length < 6) {
						this.checkData.zipCode = '邮编必须为6位数字'
					}
				}
			},
			removeCheckZip(tag) {
				if(tag == 'ins') {
					this.checkData.zipCode = ''
				}
			},
			checkMobile(tag) {
				if(tag == 'ins') {
					if(this.insurant.mobile != '') {
						if(this.insurant.mobile.length != 11) {
							this.checkData.mobile = '手机号必须为11位数字'
						} else if(this.insurant.mobile.substring(0, 1) != 1) {
							this.checkData.mobile = '手机号开头必须以1开头'
						}
					}
				}
			},
			removeCheckMobile(tag) {
				if(tag == 'ins') {
					this.checkData.mobile = ''
				}
			},
			removeCheckData() {
				this.checkData.name = ''
				this.checkData.zipCode = ''
				this.checkData.mobile = ''
			},
			showAlert(arr) {
				let msg = ''
				for(let i = 0; i < arr.length; i++) {
					msg += i + 1 + '.' + arr[i] + '</br>'
				}
				console.log('msg==>>', msg)
				alert_n22.alert("提示", msg, "确定")
			},
			showToast(message) {
				Toast({
					message: message,
					position: 'bottom',
					duration: 1500
				})
			},
			changeRelation(type, items, index) {
				if(items.relToIns != '30') {
					for(let item of this.dict.relationBenefitList) {
						if(items.relToIns == item.code) {
							items.relToInsDesc = item.text
						}
					}
				} else {
					this.$refs.btn.showMOdal(index, type)
				}
			},
			relationEdit(index, value, bnfType) {
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				console.log('受益人与被保人关系', index, value, bnfType)
				if(bnfType == 'ins') {
					this.newBnfInfo.insBnf[index].relToInsDesc = value
				} else {
					this.newBnfInfo.insHMBnf[index].relToInsDesc = value
				}
			},
			isLeapYear(intYear) {
				if(intYear % 100 == 0 && intYear % 400 == 0) {
					return true
				} else if((intYear % 4) == 0) {
					return true
				}
				return false
			},
			idExpDateValid(idStaDate, year) {
				let tempDate = new Date(idStaDate)
				let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
				let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
				let isLeapYear = this.isLeapYear(tempDate.getFullYear() + Number(year))
				if(!isLeapYear && tempMonth == "02" && tempDay == "29") {
					tempDay = tempDay - 1
				}
				let tempBir = tempDate.getFullYear() + Number(year) + '-' + tempMonth + '-' + tempDay;
				if(tempBir.indexOf('NaN') != '-1') {
					tempBir = ''
				}
				console.log('idExpDateValid->有效止期', tempBir, tempBir.indexOf('NaN'))
				return tempBir
			},
			changeIdType(type, index) {
                console.log(type)
                console.log(this.insurant.idType)
				if(type == undefined) {
					if(this.insurant.idType == '11' || this.insurant.idType == '12' || this.insurant.idType == '20') {
						this.insurant.nativePlace = 'CHN'
					} else {
						this.insurant.nativePlace = ''
					}
					if(this.insurant.idType == '12' || this.insurant.idType == '20') {
						this.insurant.idNo = ''
					} else {
                        if(this.insurant.idType != '11'){
                          	this.insurant.idNo = ''
						    this.insurant.idStaDate = ''
						    this.insurant.idExpDate = ''
						    this.insurant.idExpDateLong = false
                        }
					}
				} else {
					if(type == 'ins') {
						if(this.newBnfInfo.insBnf[index].bfcyIdType == '11' || this.newBnfInfo.insBnf[index].bfcyIdType == '12' || this.newBnfInfo.insBnf[index].bfcyIdType == '20') {
							this.newBnfInfo.insBnf[index].bfcyNativePlace = 'CHN'
						} else {
							this.newBnfInfo.insBnf[index].bfcyNativePlace = ''
						}
						if(this.newBnfInfo.insBnf[index].bfcyIdType == '12' || this.newBnfInfo.insBnf[index].bfcyIdType == '20') {
							this.newBnfInfo.insBnf[index].bfcyIdCode = ''
						} else {
                            if(this.newBnfInfo.insBnf[index].bfcyIdType != '11'){
                               this.newBnfInfo.insBnf[index].bfcyIdCode = ''
							   this.newBnfInfo.insBnf[index].idStaDate = ''
							   this.newBnfInfo.insBnf[index].bfcyIdExpDate = ''
							   this.newBnfInfo.insBnf[index].bfcyIsLong = false
                            }
						}
					} else if(type == 'insHM') {
						if(this.newBnfInfo.insHMBnf[index].bfcyIdType == '11' || this.newBnfInfo.insHMBnf[index].bfcyIdType == '12' || this.newBnfInfo.insHMBnf[index].bfcyIdType == '20') {
							this.newBnfInfo.insHMBnf[index].bfcyNativePlace = 'CHN'
						} else {
							this.newBnfInfo.insHMBnf[index].bfcyNativePlace = ''
						}
						if(this.newBnfInfo.insHMBnf[index].bfcyIdType == '12' || this.newBnfInfo.insHMBnf[index].bfcyIdType == '20') {
							this.newBnfInfo.insHMBnf[index].bfcyIdCode = ''
						} else {
                            if(this.newBnfInfo.insHMBnf[index].bfcyIdType!="11"){
                              	this.newBnfInfo.insHMBnf[index].bfcyIdCode = ''
							    this.newBnfInfo.insHMBnf[index].idStaDate = ''
							   this.newBnfInfo.insHMBnf[index].bfcyIdExpDate = ''
							   this.newBnfInfo.insHMBnf[index].bfcyIsLong = false
                            }
						}
					}
				}
			},
			changeIdExpDateLong(type, index) {
				if(type == undefined) {
					if(this.insurant.idExpDateLong) {
						this.insurant.idExpDate = '2200-12-31'
					} else {
						this.insurant.idExpDate = ''
					}
				} else {
					if(type == 'ins') {
						if(this.newBnfInfo.insBnf[index].bfcyIsLong) {
							this.newBnfInfo.insBnf[index].bfcyIdExpDate = '2200-12-31'
						} else {
							this.newBnfInfo.insBnf[index].bfcyIdExpDate = ''
						}
					} else if(type == 'insHM') {
						if(this.newBnfInfo.insHM[index].bfcyIsLong) {
							this.newBnfInfo.insHM[index].bfcyIdExpDate = '2200-12-31'
						} else {
							this.newBnfInfo.insHM[index].bfcyIdExpDate = ''
						}
					}
				}
			},
			changeBnfSyncAddress(item){
				if(item.state){
					item.province = this.policy.custInfo.appnt.province
					item.city = this.policy.custInfo.appnt.city
					item.county = this.policy.custInfo.appnt.county
					item.street = this.policy.custInfo.appnt.street
					item.community = this.policy.custInfo.appnt.community
					item.postalAddress = this.policy.custInfo.appnt.postalAddress
				}else{
					item.province = ""
					item.city = ""
					item.county = ""
					item.street = ""
					item.community = ""
					item.postalAddress = ""
				}
			},
			changeSyncAddress() {
				if(this.toggle.sameTBAddress) {
					//this.showToast('投保人省市县' + this.policy.custInfo.appnt.province + '-' + this.policy.custInfo.appnt.city + '-' + this.policy.custInfo.appnt.county)
					this.insurant.province = this.policy.custInfo.appnt.province
					this.insurant.city = this.policy.custInfo.appnt.city
					this.insurant.county = this.policy.custInfo.appnt.county
					this.insurant.street = this.policy.custInfo.appnt.street
					this.insurant.community = this.policy.custInfo.appnt.community
					this.insurant.postalAddress = this.policy.custInfo.appnt.postalAddress
					this.insurant.zipCode = this.policy.custInfo.appnt.zipCode
				} else {
					this.insurant.province = ''
					this.insurant.provinceDesc = ''
					this.insurant.city = ''
					this.insurant.cityDesc = ''
					this.insurant.county = ''
					this.insurant.street = ''
					this.insurant.community = ''
					this.insurant.postalAddress = ''
					this.insurant.zipCode = ''
				}
			},
			selectAdress(type, index) {
				if(type == undefined && this.toggle.sameTBAddress) {

				} else {
					this.SelectAreaValue.isOpen = true
					this.SelectAreaValue.type = type
					this.SelectAreaValue.index = index
					this.SelectAreaValue.areaItem = ''
					//console.log('选择地址前', this.SelectAreaValue)
				}
			},
			selectActions() {
				this.SelectAreaValue.isOpen = false
				//console.log('选择地址后', this.SelectAreaValue)
				if(this.SelectAreaValue.type == undefined) {
					this.insurant.province = this.SelectAreaValue.areaItem.provinceCode
					this.insurant.provinceDesc = this.SelectAreaValue.areaItem.provinceDesc
					this.insurant.city = this.SelectAreaValue.areaItem.cityCode
					this.insurant.cityDesc = this.SelectAreaValue.areaItem.cityDesc
					this.insurant.county = this.SelectAreaValue.areaItem.county
				} else if(this.SelectAreaValue.type == 'ins') {
					this.newBnfInfo.insBnf[this.SelectAreaValue.index].province = this.SelectAreaValue.areaItem.provinceCode
					this.newBnfInfo.insBnf[this.SelectAreaValue.index].provinceDesc = this.SelectAreaValue.areaItem.provinceDesc
					this.newBnfInfo.insBnf[this.SelectAreaValue.index].city = this.SelectAreaValue.areaItem.cityCode
					this.newBnfInfo.insBnf[this.SelectAreaValue.index].cityDesc = this.SelectAreaValue.areaItem.cityDesc
					this.newBnfInfo.insBnf[this.SelectAreaValue.index].county = this.SelectAreaValue.areaItem.county
				} else {
					this.newBnfInfo.insHMBnf[this.SelectAreaValue.index].province = this.SelectAreaValue.areaItem.provinceCode
					this.newBnfInfo.insHMBnf[this.SelectAreaValue.index].provinceDesc = this.SelectAreaValue.areaItem.provinceDesc
					this.newBnfInfo.insHMBnf[this.SelectAreaValue.index].city = this.SelectAreaValue.areaItem.cityCode
					this.newBnfInfo.insHMBnf[this.SelectAreaValue.index].cityDesc = this.SelectAreaValue.areaItem.cityDesc
					this.newBnfInfo.insHMBnf[this.SelectAreaValue.index].county = this.SelectAreaValue.areaItem.county
				}
			},
			cancels() {
				this.SelectAreaValue.isOpen = false
				this.SelectAreaValue.type = ''
				this.SelectAreaValue.index = ''
				this.SelectAreaValue.areaItem = ''
			},
			speechRec(type, tag, item) {
				if(type == 'ins' && tag == 'postalAddress' && this.toggle.sameTBAddress) {
					return
				} else if(type == 'ins' && tag == 'mobile' && this.insurant.age < 18) {
					return
				} else if(type == 'ins' && tag == 'grpName' && this.insurant.age < 7) {
					return
				} else if(type == 'bnf' && tag == 'postalAddress' && (item.bnfInsurant == '0' || item.bnfHMInsurant == '0')) {
					return
				} else if(type == 'bnf' && tag == 'phone' && (item.bnfInsurant == '0' || item.bnfHMInsurant == '0' || item.age < 18)) {
					return
				} else if(type == 'bnf' && tag == 'occupation' && (item.bnfInsurant == '0' || item.bnfHMInsurant == '0')) {
					return
				} else {
					MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc) => {
						if(type == 'ins' && tag == 'postalAddress') {
							this.insurant.postalAddress = callbackSucc.result
						} else if(type == 'ins' && tag == 'mobile') {
							this.insurant.mobile = callbackSucc.result
						} else if(type == 'ins' && tag == 'zipCode') {
							this.insurant.zipCode = callbackSucc.result.substring(0, 6)
						} else if(type == 'ins' && tag == 'grpName') {
							this.insurant.grpName = callbackSucc.result.substring(0, 15)
						} else if(type == 'bnf' && tag == 'postalAddress') {
							item.postalAddress = callbackSucc.result
						} else if(type == 'bnf' && tag == 'phone') {
							item.phone = callbackSucc.result
						} else if(tag == 'occupation') {
							this.occupationValue.isopen = !this.occupationValue.isopen
							this.occupationValue.type = type
							this.occupationValue.obj = item
							this.occupationValue.speechRecVal = callbackSucc.result
						}
					}, (callbackFail) => {})
				}
			},
			addBnfInfo(type) {
				let bnfInfo = {
					belongWith: '', //隶属第几被保人 1-被保人 0-豁免险被保险人
					bnfInsurant: '1', //是否同投保人 /0 true 1 false
					bnfHMInsurant: '1', //是否同主险被保险人 /0 true 1 false
					relToIns: '',
					relToInsDesc: '',
					idCardDisable:true,
					bfcyName: '',
					bfcyIdType: '',
					bfcyIdCode: '',
					idStaDate: '',
					bfcyIdExpDate: '',
					bfcyIsLong: false,
					bfcySex: '1',
					bfcyBirthday: '',
					bfcyNativePlace: '',
					province: '',
					city: '',
					county: '',
					street: '',
					community: '',
					postalAddress: '',
					phone: '',
					occupation: '',
					occupationCode: '',
					occupationType: '',
					age: '',
					bfcyLevel: '', //受益顺序
					bfcyRatio: '', //受益比例
					bfcyLevelNum: '', //排序
				}
				if(type == 'ins') {
					bnfInfo.belongWith = '1'
					bnfInfo.bfcyLevelNum = this.newBnfInfo.insBnf.length
					this.newBnfInfo.insBnf.push(bnfInfo)
				} else if(type == 'insHM') {
					bnfInfo.belongWith = '0'
					bnfInfo.bfcyLevelNum = this.newBnfInfo.insHMBnf.length
					this.newBnfInfo.insHMBnf.push(bnfInfo)
				}
			},
			removeBnfInfo(type, index) {
				if(type == 'ins') {
					this.newBnfInfo.insBnf.splice(index, 1)
				} else if(type == 'insHM') {
					this.newBnfInfo.insHMBnf.splice(index, 1)
				}
			},
			watcherBnfInfo(newArr) {
				let bnfInsurantCount = 0 //被保人受益人 同投保人
				let bnfHMInsurantCount = 0 //豁免险受益人(投保人) 同被保人
				for(let i = 0; i < newArr.length; i++) {
					if(newArr[i].bnfInsurant == '0') {
						bnfInsurantCount++
					}
					if(newArr[i].bnfHMInsurant == '0') {
						bnfHMInsurantCount++
					}
					if(newArr[i].bfcyIdType == '11') {
						newArr[i].bfcyIdCode = newArr[i].bfcyIdCode.replace(/[x]/g, 'X')
						if(newArr[i].bfcyIdCode.length == 18) {
							if(utils.valid.checkIdCard(newArr[i].bfcyIdCode)) {
								newArr[i].bfcyBirthday = newArr[i].bfcyIdCode.slice(6, 10) + '-' + newArr[i].bfcyIdCode.slice(10, 12) + '-' + newArr[i].bfcyIdCode.slice(12, 14)
								let sex = newArr[i].bfcyIdCode.slice(16, 17)
								if(sex % 2 == 1) {
									newArr[i].bfcySex = 1
								} else if(sex % 2 == 0) {
									newArr[i].bfcySex = 2
								}
								newArr[i].idCardDisable = false
							}	
						}
					} else if(newArr[i].bfcyIdType == '12') {
						if(newArr[i].bfcyBirthday!=''){
							newArr[i].idStaDate = newArr[i].bfcyBirthday
							let value = this.idExpDateValid(newArr[i].bfcyBirthday, 16)
							this.$nextTick(() => {
								newArr[i].bfcyIsLong = false
								newArr[i].bfcyIdExpDate = value
							})
						}
					} else if(newArr[i].bfcyIdType == '20') {
						if(newArr[i].bfcyBirthday!=''){
							newArr[i].idStaDate = newArr[i].bfcyBirthday
							let value = this.idExpDateValid(newArr[i].bfcyBirthday, 3)
							this.$nextTick(() => {
								newArr[i].bfcyIsLong = false
								newArr[i].bfcyIdExpDate = value
							})
						}
					}
					if(/[a-z]/.test(newArr[i].bfcyIdCode)) {
						//this.showToast('证件号码不可包含小写字母')
					}
					newArr[i].age = utils.valid.getAge(newArr[i].bfcyBirthday)
					if(newArr[i].age < 7) {
						newArr[i].occupationCode = '1001007'
						newArr[i].occupationType = '1'
						newArr[i].occupation = '学龄前儿童'
					} else {
						if(newArr[i].occupation == '学龄前儿童') {
							newArr[i].occupationCode = ''
							newArr[i].occupationType = ''
							newArr[i].occupation = ''
						}
						if(newArr[i].age < 18) {
							newArr[i].phone = ''
						}
					}
				}
			},
			clearBnfInfo(item) {
				item.bnfInsurant = '1'
				item.bnfHMInsurant = '1'
				item.relToIns = ''
				item.relToInsDesc = ''
				item.bfcyName = ''
				item.bfcyIdType = ''
				item.bfcyIdCode = ''
				item.idStaDate = ''
				item.bfcyIdExpDate = ''
				item.bfcyIsLong = false
				item.idCardDisable = true
				item.bfcySex = '1'
				item.bfcyBirthday = ''
				item.bfcyNativePlace = ''
				item.province = ''
				item.provinceDesc = ''
				item.city = ''
				item.cityDesc = ''
				item.county = ''
				item.street = ''
				item.community = ''
				item.postalAddress = ''
				item.phone = ''
				item.occupation = ''
				item.occupationCode = ''
				item.occupationType = ''
				item.age = utils.valid.getAge(item.bfcyBirthday)
			},
			//被保人受益人 同投保人
			changeBnfInsurant(item, index) {
				item.bnfInsurant = index
				if(item.bnfInsurant == '1') {
					this.clearBnfInfo(item)
				} else {
					let count = 0
					for(let i in this.newBnfInfo.insBnf) {
						if(this.newBnfInfo.insBnf[i].bnfInsurant == '0') {
							count++
						}
					}
					if(count == 1) {
						console.log('====同投保人关系', this.insurant.relToApp)
						let appnt = this.policy.custInfo.appnt
						item.relToIns = this.insurant.relToApp
						item.relToInsDesc = this.insurant.relToAppDesc
						item.bfcyName = appnt.appntName
						item.bfcyIdType = appnt.idType
						item.bfcyIdCode = appnt.idNo
						item.idStaDate = appnt.idStaDate
						item.bfcyIdExpDate = appnt.idExpDate
						item.bfcyIsLong = appnt.idExpDate == '2200-12-31' ? true : false
						item.bfcySex = appnt.appntSex
						item.bfcyBirthday = appnt.appntBirthday
						item.bfcyNativePlace = appnt.nativePlace
						item.province = appnt.province
						item.provinceDesc = appnt.provinceDesc
						item.city = appnt.city
						item.cityDesc = appnt.cityDesc
						item.county = appnt.county
						item.street = appnt.street
						item.community = appnt.community
						item.postalAddress = appnt.postalAddress
						item.phone = appnt.mobile
						item.occupation = appnt.appOccupation
						item.occupationCode = appnt.occupationCode
						item.occupationType = appnt.occupationType
						item.age = utils.valid.getAge(item.bfcyBirthday)
					} else {
						this.showToast('仅可添加一次')
						item.bnfInsurant = '1'
					}
				}
			},
			//豁免险受益人 同被保人
			changeBnfHMInsurant(item, index) {
				item.bnfHMInsurant = index
				if(item.bnfHMInsurant == '1') {
					this.clearBnfInfo(item)
				} else {
					let count = 0
					for(let i in this.newBnfInfo.insHMBnf) {
						if(this.newBnfInfo.insHMBnf[i].bnfHMInsurant == '0') {
							count++
						}
					}
					if(count == 1) {
						item.relToIns = this.insurant.relToApp
						item.relToInsDesc = this.insurant.relToAppDesc
						item.bfcyName = this.insurant.name
						item.bfcyIdType = this.insurant.idType
						item.bfcyIdCode = this.insurant.idNo
						item.idStaDate = this.insurant.idStaDate
						item.bfcyIdExpDate = this.insurant.idExpDate
						item.bfcyIsLong = this.insurant.idExpDate == '2200-12-31' ? true : false
						item.bfcySex = this.insurant.sex
						item.bfcyBirthday = this.insurant.birthday
						item.bfcyNativePlace = this.insurant.nativePlace
						item.province = this.insurant.province
						item.provinceDesc = this.insurant.provinceDesc
						item.city = this.insurant.city
						item.cityDesc = this.insurant.cityDesc
						item.county = this.insurant.county
						item.street = this.insurant.street
						item.community = this.insurant.community
						item.postalAddress = this.insurant.postalAddress
						item.phone = this.insurant.mobile
						item.occupation = this.insurant.insOccupation
						item.occupationCode = this.insurant.occupationCode
						item.occupationType = this.insurant.occupationType
						item.age = utils.valid.getAge(item.bfcyBirthday)
					} else {
						this.showToast('仅可添加一次')
						item.bnfHMInsurant = '1'
					}
				}
			},
			next() {
				let requ
				if(this.policy.custInfo.insurants.firstInsurant.relToApp != '00') {
					requ = {
						"amntInfo": {
							"name": this.policy.custInfo.insurants.firstInsurant.name,
							"sex": this.policy.custInfo.insurants.firstInsurant.sex == "1" ? "0" : "1",
							"birthday": this.policy.custInfo.insurants.firstInsurant.birthday,
							"idType": this.policy.custInfo.insurants.firstInsurant.idType,
							"idNo": this.policy.custInfo.insurants.firstInsurant.idNo
						}
					}
				} else {
					requ = {
						"amntInfo": {
							"name": this.policy.custInfo.appnt.appntName,
							"sex": this.policy.custInfo.appnt.appntSex == "1" ? "0" : "1",
							"birthday": this.policy.custInfo.appnt.appntBirthday,
							"idType": this.policy.custInfo.appnt.idType,
							"idNo": this.policy.custInfo.appnt.idNo
						}
					}
				}
				utils.http.postFast('MOHISCOVERAGE', requ, (body, header) => { // 获取被保险人风险保额
					if(header.resultCode == "0") {
						let result = []
						result.push('0-3年的累计寿险保额' + Number(body.amntInfo.lifeAmntZero) / 10000 + '万元')
						result.push('3-5年的累计寿险保额' + Number(body.amntInfo.lifeAmntThree) / 10000 + '万元')
						result.push('5年以上的累计寿险保额' + Number(body.amntInfo.lifeAmntFive) / 10000 + '万元')
						result.push('正常累计寿险保额' + Number(body.amntInfo.lifeAmnt) / 10000 + '万元')
						result.push('打折后累计寿险新保额' + Number(body.amntInfo.lifeAmntNew) / 10000 + '万元')
						result.push('0-3年的累计重疾险保额' + Number(body.amntInfo.illnessAmntZero) / 10000 + '万元')
						result.push('3-5年的累计重疾险保额' + Number(body.amntInfo.illnessAmntThree) / 10000 + '万元')
						result.push('5年以上的累计重疾险保额' + Number(body.amntInfo.illnessAmntFive) / 10000 + '万元')
						result.push('正常累计重疾险保额' + Number(body.amntInfo.illnessAmnt) / 10000 + '万元')
						result.push('打折后累计重疾险新保额' + Number(body.amntInfo.illnessAmntNew) / 10000 + '万元')
						console.log('==result===>', result)
						let msg = ''
						for(let i = 0; i < result.length; i++) {
							msg += result[i] + '</br>'
						}
						alert_n22.confirm('提示', msg, '确定', '取消', (flag) => {
							console.log('===>确定')
						})
					} else if(header.resultMsg == "客户号不存在！") {
						alert_n22.confirm("温馨提示", "未查询到历史保额！", "确定", "取消", this.next)
					} else if(header.resultCode == "1") {
						alert_n22.alert("提示", header.resultMsg, "确定")
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.main-contents {
		bottom: 50px;
		.sheet_a {
			height: 56px;
			display: flex;
			justify-content: space-around;
			padding: 2px 5%;
			box-sizing: border-box;
			background: url('./../../../static/img/policy/icon_a.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p {
				line-height: 52px;
				font-size: 14px;
				color: #949495;
			}
			p:first-child {
				color: #FEB101;
			}
		}
		.sheet_b {
			background: url('./../../../static/img/policy/icon_b.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p:nth-child(2) {
				color: #FEB101;
			}
		}
		.sheet_c {
			background: url('./../../../static/img/policy/icon_c.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p {
				color: #FEB101;
			}
		}
		li>p+div {
			height: 50px;
		}
		li>p+.switch {
			height: auto;
		}
		li.base {
			align-items: baseline;
		}
		li.flex {
			div {
				width: 60%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		div.bnfSwitch {
			display: flex;
			p {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 65px;
				height: 33px;
				border: 1px solid #ccc;
				border-radius: 3px;
				font-size: 14px;
				color: #ccc;
				padding: 0 3%;
			}
			p.active {
				background: #FEB101;
				color: #fff;
				border-color: transparent;
			}
		}
	}
</style>
