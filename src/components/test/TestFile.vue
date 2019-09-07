<template>
	<div>
		<div class="nav-lists">
        <ul class="nav-list">
          <li onclick="createAndWriteFile()">
            <p>创建文件</p>
          </li>
          <li onclick="getAndReadFile()">
            <p>读取文件</p>
          </li>
        </ul>
      </div>
	</div>
</template>

<script>
	
	export default{
		name:'test',
		data () {
	    return {
	    }
	  },
	  beforeMount(){
	  },
	  mounted(){
	  },
	  methods:{
	  	
	  },
	}
</script>

<style>
	li{
		margin-top: 10px;
	}
</style>