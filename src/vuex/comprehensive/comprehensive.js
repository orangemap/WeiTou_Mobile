

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
	/*银保渠道*/
	ComprehensiveTitleType:1,/*切换考核预警、正式考核状态*/
	ComprehensiveSearchMonthDate:'0',/*切换考核详情、考核分析时的月份*/
	ComprehensiveSearchYearDate:0,/*切换考核详情、考核分析时的年份*/
	ComprehensiveYearDate:'',/*我的薪酬年份*/
	ComprehensiveMonthDate:'',/*我的薪酬月份*/
	/*个险渠道*/
	ComprehensiveGeXianYearDate:'',/*我的佣金->佣金详情/佣金分析年份*/
	ComprehensiveGeXianMonthDate:'',/*我的佣金->佣金详情/佣金分析月份*/
	YearDate1:'',/*正式考核年份*/
	MonthDate1:'',/*正式考核月份*/
	YuJingYear:'',/*考核预警年*/
	YuJingMounth:'',/*考核预警月*/
	/*续期渠道*/
	CallData:{},
	FiveYearData:{},
	LnvalidData:{},
	ShortData:{},
	StillValidData:{},
	XuQiAgentData:{},
	TablesNum:0
}

const mutations = {
	/*银保渠道*/
	SetComprehensiveTitleType(state,type){
		state.ComprehensiveTitleType = type
	},
	SetComprehensiveSearchMonthDate(state,mount){
		state.ComprehensiveSearchMonthDate = mount
	},
	SetComprehensiveSearchYearDate(state,year){
		state.ComprehensiveSearchYearDate = year
	},
	SetComprehensiveYearDate(state,yearcont){
		state.ComprehensiveYearDate = yearcont
	},
	SetComprehensiveMonthDate(state,mountcont){
		state.ComprehensiveMonthDate = mountcont
	},
	/*个险渠道*/
	SetComprehensiveGeXianYearDate(state,year){/*我的佣金年*/
		state.ComprehensiveGeXianYearDate = year
	},
	SetComprehensiveGeXianMonthDate(state,mount){/*我的佣金月*/
		state.ComprehensiveGeXianMonthDate = mount
	},
	SetYearDate(state,year){/*正式考核年*/
		state.YearDate1 = year
	},
	SetMonthDate(state,month){/*正式考核月*/
		state.MonthDate1 = month
	},
	SetYuJingYear(state,year){/*考核预警年*/
		state.YuJingYear = year
	},
	SetYuJingMounth(state,mounth){/*考核预警月*/
		state.YuJingMounth = mounth
	},
	/*续期*/
	SetCallData(state,newObject){/*催缴明细*/
		state.CallData = newObject
	},
	SetFiveYearData(state,newObject){/*五年期保险*/
		state.FiveYearData = newObject
	},
	SetLnvalidData(state,newObject){/*失效可复效*/
		state.LnvalidData = newObject
	},
	SetShortData(state,newObject){/*一年期短险清单*/
		state.ShortData = newObject
	},
	SetStillValidData(state,newObject){/*主险交费期满附加险*/
		state.StillValidData = newObject
	},
	SetXuQiAgentData(state,newObject){/*代理人信息存储*/
		state.XuQiAgentData = newObject
	},
	SetTablesNum(state,num){/*读取状态*/
		state.TablesNum = num
	}
}

export default new Vuex.Store({
	state,mutations
})