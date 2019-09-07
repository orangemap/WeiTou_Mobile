<template>
    <div id='content_div'>
        <div id="right_div">
            <div id="right_div1">
                <div id="right_divx">
                    <table id="right_table1" ref='right_table1'>
                        <tr>
                            <th>首行标题1</th>
                            <th>首行标题2</th>
                            <th>首行标题3</th>
                            <th>首行标题4</th>
                            <th>首行标题5</th>
                            <th>首行标题6</th>
                            <th>首行标题7</th>
                            <th>首行标题8</th>
                            <th>首行标题9</th>
                            <th>首行标题10</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="right_div2" ref='right_div2'>
                <table id="right_table2" ref='right_table2'>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                    <tr>
                        <th>内容1</th>
                        <th>内容2</th>
                        <th>内容3</th>
                        <th>内容4</th>
                        <th>内容5</th>
                        <th>内容6</th>
                        <th>内容7</th>
                        <th>内容8</th>
                        <th>内容9</th>
                        <th>内容10</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            btmDivLeft: ''
        }
    },
    mounted() {
        let _this = this
        let btm = _this.$refs.right_div2
        btm.addEventListener('scroll', _this.getLeft)
    },
    methods: {
        getLeft() {
            let btmDiv = this.$refs.right_div2
            this.btmDivLeft = btmDiv.scrollLeft
            let topDiv = this.$refs.right_table1
            topDiv.style.left = '-' + btmDiv.scrollLeft + 'px'
        }
    }
}
</script>
<style>
#content_div ::-webkit-scrollbar {
    width: 0px
}

table {
    border-collapse: collapse;
}

td,
th {
    width: 100px;
    border: 1px solid #000;
    box-sizing: border-box;
    padding: 5px!important;
}

#right_div {
    width: 320px;
    /*设备宽度*/
    float: left;
}

#right_div1 {
    width: 100%;
    overflow: hidden;
    position: relative;
}

#right_divx {
    width: 820px;
    color: #000;
}

#right_div2 {
    width: 320px;
    /*设备宽度*/
    height: 178px;
    overflow: auto;
}

#right_table1 {
    width: 800px;
    position: relative;
}

#right_table1 th {
    height: 39px;
}

#right_table2 {
    width: 800px;
    height: 400px;
}
</style>