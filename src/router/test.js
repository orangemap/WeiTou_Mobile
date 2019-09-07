export default [
{
	name: 'test',
	path: '/test',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/test/Test.vue')), 'test')
	}
},{
	name: 'testca',
	path: '/testca',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/test/TestCA.vue')), 'testca')
	}
},{
	name: 'testcamera',
	path: '/testcamera',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/test/TestCamera.vue')), 'testcamera')
	}
},{
	name: 'testfile',
	path: '/testfile',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/test/TestFile.vue')), 'testfile')
	}
},{
	name: 'testlocationocr',
	path: '/testlocationocr',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/test/TestLocationOcr.vue')), 'testlocationocr')
	}
}]