<!--空页面-->
<template>
	<div>
	</div>
</template>

<!--js-->
<script>
	export default {
		name: 'empty',
		data() {
			return {}
		},
		created(){
			if(this.$route.query.redirect!=undefined&&this.$route.query.redirect.length>0){
				let redirect = decodeURIComponent(this.$route.query.redirect || '/');
				if(redirect.indexOf('/pay/')>-1){
					this.$router.push({name: "home",query: {t: new Date().getTime()}})
				}else{
					this.$router.push({path: redirect})
				}
			}else if(this.$route.query.href!=undefined&&this.$route.query.href.length>0){
				location.href = this.$route.query.href
			}
		},
	}
</script>

<style scoped type="text/css" lang="scss">
</style>