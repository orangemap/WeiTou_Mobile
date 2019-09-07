<template>
    <div>
        <Headerbtns :title="page_title">
            <div ref='header' slot="left" class="back" @click="Goback">
                <i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;color: #FDB92C;'></i>
            </div>
        </Headerbtns>
        <div class='xq-1-content'>
            <div class='xq-1-content-top-div'>
                <p style='font-size:.8rem;'>查询明细</p>
                <year-picker class="picker" :values="title" v-model="title" :items="SelectList" code="id" text="text">
                </year-picker>
                <p class='call-detail-img-bottom'></p>
            </div>
            <router-view></router-view>
        </div>
    </div>    
</template>

<script>
    import Headerbtns from '@/components/policy/common/Header'
    import yearPicker from '@/components/common/Picker.vue'
    import {mapState,mapMutations} from 'vuex'
    import store from '@/vuex/comprehensive/comprehensive'
    export default {
        components: {
            Headerbtns,yearPicker
        },
        data() {
            return {
                isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                agentCode:utils.cache.get('personsal').agentCode,
                page_title: '催缴明细查询',
                SelectList: ['催缴明细','一年期短险清单','五年期保证续保到期提醒清单','主险交费期满附加险仍有效清单','失效可复效及垫交保单明细' 
                ],
                title:""
            }
        },
        computed:{
            ...mapState(['TablesNum'])
        },store,
        mounted(){
            this.title = '催缴明细'
            console.log(this.isiOS)
            if(this.isiOS){
                if(screen.height == 812 && screen.width == 375){
                    $('.xq-1-content-top-div').css('margin-top','92px')
                }else{
                    $('.xq-1-content-top-div').css('margin-top','70px')
                }
            }else{
                $('.xq-1-content-top-div').css('margin-top','50px')
            }
            console.log(this.$route.params)
            console.log(this.TablesNum)
            if(this.TablesNum == 1){
                this.title = '催缴明细'
                this.$router.push('/comprehensiveXuqi/calldetailindex/renwalcallSel')
            }else if(this.TablesNum == 2){
                this.title = '一年期短险清单'
                this.$router.push('/comprehensiveXuqi/calldetailindex/renwalShortSel')
            }else if(this.TablesNum == 3){
                this.title = '五年期保证续保到期提醒清单'
                this.$router.push('/comprehensiveXuqi/calldetailindex/renwalFiveYearSel')
            }else if(this.TablesNum == 4){
                this.title = '主险交费期满附加险仍有效清单'
                this.$router.push('/comprehensiveXuqi/calldetailindex/renwalStillValidSel')
            }else if(this.TablesNum == 5){
                this.title = '失效可复效及垫交保单明细'
                this.$router.push('/comprehensiveXuqi/calldetailindex/renwalnavlidSel')
            }
        },
        watch:{
            title(old){
                if(old == '催缴明细'){
                    this.$router.push('/comprehensiveXuqi/calldetailindex/renwalcallSel')
                }else if(old == '一年期短险清单'){
                    this.$router.push('/comprehensiveXuqi/calldetailindex/renwalShortSel')
                }else if(old == '五年期保证续保到期提醒清单'){
                    this.$router.push('/comprehensiveXuqi/calldetailindex/renwalFiveYearSel')
                }else if(old == '主险交费期满附加险仍有效清单'){
                    this.$router.push('/comprehensiveXuqi/calldetailindex/renwalStillValidSel')
                }else if(old == '失效可复效及垫交保单明细'){
                    this.$router.push('/comprehensiveXuqi/calldetailindex/renwalnavlidSel')
                }
            }
        },
        methods:{
            Goback(){
                this.$router.push('/comprehensiveXuqi/comprehensiveInfo')
            }
        }
    }
</script>

<style>
.xq-1-content .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.xq-1-content .flex-wrap{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.xq-1-content .flex-wrap>label{
    min-width:33%;
}
.xq-1-content .flex-wrap>label:last-child{
    width:52%;
}
.xq-1-content .flex-wrap>label:nth-child(4),
.xq-1-content .flex-wrap>label:nth-child(5){
    margin-top:5px;
}
.xq-1-content .flex-wrap>label:nth-child(5){
    display: flex;
    justify-content: left;
}
.xq-1-content .xq-1-content-top-div {
    height: 50px;
    background: #eee;
    width: 90%;
    padding: 0 5%;
    display: flex;
    align-items: center;
    position: relative;
}

.xq-1-content .xq-1-content-top-div>p {
    text-align: center;
    line-height: 50px;
    font-size: 1rem;
    color: #333;
}

.xq-1-content .xq-1-content-top-div input {
    text-align: left;
    padding-left:10px;
    margin-left:10px;
    border:1px solid #ccc;
    height:35px;
    border-radius: 5px;
}
.xq-1-content .xq-1-content-top-div .mbsc-control-ev{
    flex:1;
    background:#FFF;
}
.xq-1-content .xq-1-content-top-div>select {
    border: 1px solid #c1c1c1;
    border-radius: 5px;
    height: 35px;
    width: 75%;
    margin-left: 5%;
    padding-left: 5px;
    color: #c1c1c1;
}

.xq-1-content .xq-1-content-cnt-div>div {
    border-bottom: 1px dashed #c2c1c1;
    height: 40px;
    align-items: center;
    padding: 0 5%;
    font-size: 1rem;
}

.xq-1-content-cnt-div>div:last-child {
    width: 80%;
    margin: 10px auto;
    border: none;
}

.xq-1-content-cnt-div select {
    border: none;
    color: #c2c1c1;
}

.xq-1-content-cnt-div input,
.xq-1-content-cnt-div select,
.xq-1-content-cnt-div p,
.xq-1-content-cnt-div label {
    font-size: .8rem;
}

.xq-1-content-cnt-div input {
    width: 85%;
    text-align: right;
}

.xq-1-content-cnt-div label {
    display: flex;
    align-items: center;
    width: 28%;
}

.checkbox-1 {
    width: 15px!important;
}

.xq-1-content-cnt-div button {
    width: 100px;
    height: 35px;
    background: #FEB101;
    color: #FFF;
    text-align: center;
    outline: none;
    line-height: 35px;
    border: none;
    border-radius: 5px;
}

.call-detail-img-right {
    background: url('../../../../../static/img/comprehensive/Xuqi/right.png') no-repeat;
    background-size: 100% 100%;
    width: 10px;
    height: 15px;
}

.call-detail-img-bottom {
    background: url('../../../../../static/img/comprehensive/Xuqi/bottom.png') no-repeat;
    background-size: 100% 100%;
    width: 15px;
    height: 10px;
    position: absolute;
    right:10%;
}

.call-detail-img-data {
    background: url('../../../../../static/img/comprehensive/Xuqi/date.png') no-repeat;
    background-size: 100% 100%;
    width: 20px!important;
    height: 20px;
    margin-left:5px;
}

.call-input-70 {
    text-align: right!important;
    width: 70%!important;
}
.call-details-date{
    width:100px;
}
.show-date{
    width:75px;
}
.call-details-date>p{
    display: flex!important;
    justify-content: center;
    align-items: center;
    padding:0!important;
}
.call-details-date>p>label{
    width:80%!important;
}
.call-details-date>p>i{
    font-size:1.5rem;
}
.picker-toolbar{
    background:#FEB101;
}
.picker-toolbar>span{
    color:#fff;
    box-sizing: border-box;
}
.picker-toolbar>span:last-child{
    border-left:1px solid;
}
.policy-type>label{
    width:33%;
}
.EEE{
    color:#757575;
}
.end-picker .mbsc-control{
    width:70%!important;
}
</style>