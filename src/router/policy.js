export default [{
	name: 'policy',
	path: '/policy',
	component(r) {
		require.ensure([], () => r(require('../components/policy/Policy.vue')), 'policy')
	},
	children: [{
			name: 'product_list_page',
			path: 'list',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/ProductListPage.vue')), 'product_list_page')
			}
		},
		{
			name: 'product_details_page',
			path: 'product/:planId/:step',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '1'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/ProductDetailsPage.vue')), 'product_details_page')
			}
		}, 
		{
			name: 'customer_details_page',
			path: 'details/:planId/:step',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '3'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/CustomerDetailsPage.vue')), 'customer_details_page')
			}
		},
		{
			name: 'custDetails',
			path: 'detailsInfo/:planId/:insNo/:step',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '4'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/CustDetails.vue')), 'custDetails')
			}
		},
		{
			name: 'productsPage',
			path: 'productsInfo/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '5'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/ProductsPage.vue')), 'productsPage')
			}
		},
		{
			name: 'electronics_policy_page',
			path: 'electronics/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '8'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/ElectronicsPolicyPage.vue')), 'electronics_policy_page')
			}
		}, {
			name: 'electronics_policy_share_page',
			path: 'electronics_share/:planId/:applyCode/:index/:result/:resultmsg',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/ElectronicsPolicySharePage.vue')), 'electronics_policy_share_page')
			}
		}, {
			name: 'inform_page',
			path: 'inform/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '6'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/InformPage.vue')), 'inform_page')
			}
		}, {
			name: 'payment_page',
			path: 'payment',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/PaymentPage.vue')), 'payment_page')
			}
		}, {
			name: 'questionnaire_page',
			path: 'questionnaire/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '2'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/QuestionnairePage.vue')), 'questionnaire_page')
			}
		}, {
			name: 'questionnaire_page_nb',
			path: 'questionnaire_nb/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '2'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/QuestionnairePageNB.vue')), 'questionnaire_page_nb')
			}
		}, {
			name: 'questionnaire_page_sh',
			path: 'questionnaire_sh/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '2'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/QuestionnairePageSH.vue')), 'questionnaire_page_sh')
			}
		},
		{
			name: 'salesman_report_page',
			path: 'salesman/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false,
				step: '7'
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/SalesmanReportPage.vue')), 'salesman_report_page')
			}
		},
		{
			name: 'audioAndVideoNoNewTypeProductBook',
			path: 'audioAndVideoNoNewTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoNoNewTypeProductBook.vue')), 'audioAndVideoNoNewTypeProductBook')
			}
		},
		{
			name: 'audioAndVideoDividendTypeProductBook',
			path: 'audioAndVideoDividendTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoDividendTypeProductBook.vue')), 'audioAndVideoDividendTypeProductBook')
			}
		},
		{
			name: 'audioAndVideoLinkTypeProductBook',
			path: 'audioAndVideoLinkTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoLinkTypeProductBook.vue')), 'audioAndVideoLinkTypeProductBook')
			}
		},
		{
			name: 'audioAndVideoUniversalTypeProductBook',
			path: 'audioAndVideoUniversalTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/audioAndVideoUniversalTypeProductBook.vue')), 'audioAndVideoUniversalTypeProductBook')
			}
		},
		{
			name: 'olderCustomerInsuranceSpecialBook',
			path: 'olderCustomerInsuranceSpecialBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/olderCustomerInsuranceSpecialBook.vue')), 'olderCustomerInsuranceSpecialBook')
			}
		},
		{
			name: 'shenZhenAlertBook',
			path: 'shenZhenAlertBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/shenZhenAlertBook.vue')), 'shenZhenAlertBook')
			}
		},
		{
			name: 'doubleEntryAllTypeProductBook',
			path: 'doubleEntryAllTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/doubleEntryAllTypeProductBook.vue')), 'doubleEntryAllTypeProductBook')
			}
		},
		{
			name: 'doubleEntryDividendTypeProductBook',
			path: 'doubleEntryDividendTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/doubleEntryDividendTypeProductBook.vue')), 'doubleEntryDividendTypeProductBook')
			}
		},
		{
			name: 'doubleEntryLinkTypeProductBook',
			path: 'doubleEntryLinkTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/doubleEntryLinkTypeProductBook.vue')), 'doubleEntryLinkTypeProductBook')
			}
		},
		{
			name: 'doubleEntryUniversalTypeProductBook',
			path: 'doubleEntryUniversalTypeProductBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/doubleEntryUniversalTypeProductBook.vue')), 'doubleEntryUniversalTypeProductBook')
			}
		},
		{
			name: 'insuranceSpecialNoteBook',
			path: 'insuranceSpecialNoteBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/insuranceSpecialNoteBook.vue')), 'insuranceSpecialNoteBook')
			}
		},
		{
			name: 'dl_self_hold_entry_all',
			path: 'dl_self_hold_entry_all',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_all.vue')), 'dl_self_hold_entry_all')
			}
		},
		{
			name: 'dl_self_hold_entry_dividend',
			path: 'dl_self_hold_entry_dividend',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_dividend.vue')), 'dl_self_hold_entry_dividend')
			}
		},
		{
			name: 'dl_self_hold_entry_link',
			path: 'dl_self_hold_entry_link',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_link.vue')), 'dl_self_hold_entry_link')
			}
		},
		{
			name: 'dl_self_hold_entry_universal',
			path: 'dl_self_hold_entry_universal',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/dl_self_hold_entry_universal.vue')), 'dl_self_hold_entry_universal')
			}
		},
		{
			name: 'compensatePrompt',
			path: 'compensatePrompt',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/compensatePrompt.vue')), 'compensatePrompt')
			}
		},
		{
			name: 'personalInsuranceBook',
			path: 'personalInsuranceBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/personalInsuranceBook.vue')), 'personalInsuranceBook')
			}
		},
		{
			name: 'cqSurveyBook',
			path: 'cqSurveyBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/cqSurveyBook.vue')), 'cqSurveyBook')
			}
		},
		{
			name: 'policyPromptBook',
			path: 'policyPromptBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/policyPromptBook.vue')), 'policyPromptBook')
			}
		},
		{
			name: 'nbSurveyBook',
			path: 'nbSurveyBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/nbSurveyBook.vue')), 'nbSurveyBook')
			}
		},
		{
			name: 'commonproductspec',
			path: 'commonproductspec',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/commonproductspec.vue')), 'commonproductspec')
			}
		},
		{
			name: 'cqSpecialBook',
			path: 'cqSpecialBook',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/cqSpecialBook.vue')), 'cqSpecialBook')
			}
		},
		{
			name: 'GoToQuestionnaire',
			path: 'GoToQuestionnaire/:planId/:insNo/:code',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/GoToQuestionnaire.vue')), 'GoToQuestionnaire')
			}
		},
		{
			name: 'RuleInform/:planId',
			path: 'RuleInform/:planId',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/RuleInform.vue')), 'RuleInform')
			}
		},
		{
			name: 'commonResponsibilityConfirm',
			path: 'commonResponsibilityConfirm',
			meta: {
				login: false,
				hasFooter: false,
				hasTabs: false,
				hasHeader: false
			},
			component(r) {
				require.ensure([], () => r(require('../components/policy/productBook/commonResponsibilityConfirm.vue')), 'commonResponsibilityConfirm')
			}
		},
	]
}]
