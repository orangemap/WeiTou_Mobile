<!-- 证件扫面页面 -->
<template>
  <div>
    <Headerbtns :title="page_title">
      <div slot="left" @click="cancel">
        <i class="fa fa-angle-left"></i>
      </div>
    </Headerbtns>
    <div class="main-contents">
      <div class="id-title">请上传您的身份证正反面照片</div>
      <div class="idcard-zhengmian">
        <img
          id="renxiangmian"
          src="static/img/common/sfz_fronts.png"
          style="width: 244px;height: 160px;"
          @click="openCaptureImgMenu(0)"
        />
      </div>
      <div class="idcard-fanmian">
        <img
          id="guohuimian"
          src="static/img/common/sfz_backs.png"
          style="width: 251px;height: 158px;"
          @click="openCaptureImgMenu(1)"
        />
      </div>
      <div class="photo-redmine">
          照片要求
      </div>
      <div class="redmine-img">
        <img
          class="redmine-img-item"
          src="static/img/common/one.png"
          style="width:77px;height:80px;"
        />
           <img
          class="redmine-img-item"
          src="static/img/common/two.png"
          style="width:77px;height:80px;"
        />
            <img
          class="redmine-img-item"
          src="static/img/common/three.png"
          style="width:77px;height:80px;"
        />
           <img
          class="redmine-img-item"
          src="static/img/common/four.png"
          style="width:77px;height:80px;"
        />
      </div>
    </div>
    <Footerbtns :is_show="false" :disabled="true" total_premium="00.00">
      <button class="btnFoote" slot="center" @click="ocr">证件识别</button>
    </Footerbtns>
    <input
      id="captureFromFile"
      type="file"
      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
      @change="onFileChange"
      style="display: none;"
    />
    <mt-actionsheet :actions="menuOptions" v-model="isCaptureImg"></mt-actionsheet>
    <alert ref="alert"></alert>
  </div>
</template>

<!--js-->
<script>
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
import global_constant from "../../../src/assets/data/global_constant.json";
import Headerbtns from "../../../src/components/policy/common/Header.vue";
import Footerbtns from "../../../src/components/policy/common/Footer.vue";
import alert from "../../../src/components/policy/common/alert.vue";
import "../policy/css/base.css";

export default {
  name: "id_card_scanning",
  components: { Headerbtns, Footerbtns, alert },
  props: ["value"],
  data() {
    return {
      menuOptions: [
        {
          name: "拍照",
          method: this.captureImgViaCamera
        },
        {
          name: "相册",
          method: this.captureImgViaAlbum
        }
      ],
      //影像采集方式
      ImageAcquisitionMode: {
        viaCamera: "1",
        viaAlbum: "2"
      },
      //获取影像开关,默认关闭
      isCaptureImg: false,
      captureImgIndex: "",
      renxiangmianimg: "",
      guohuimianimg: "",
      page_title: "证件识别",
      search_tag: "",
      search_parameter: {
        customerName: "",
        phoneNumber: ""
      },
      customerInfo: {},
      global_constant: global_constant
    };
  },
  beforeMount() {},
  mounted() {
    this.search_tag = this.$route.params.tags;
  },
  watch: {
    "value.isopen": {
      handler(val, oldval) {
        if (val != oldval) {
          this.renxiangmianimg = "";
          this.guohuimianimg = "";
          this.init();
        }
      },
      deep: true
    }
  },
  methods: {
    //接收input文件选择后的data数据
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let that = this;
      console.log(files[0], "文件获取OK");
      utils.common.imgResize(
        files[0],
        data => {
          //压缩为宽200的图片
          console.log(data);
        },
        data => {
          //压缩为宽720的图片
          if (this.captureImgIndex == "0") {
            var renxiangmian = document.getElementById("renxiangmian");
            renxiangmian.style.display = "block";
            renxiangmian.src = data;
            this.renxiangmianimg = data.substring(23, data.length);
          } else if (this.captureImgIndex == "1") {
            var guohuimian = document.getElementById("guohuimian");
            guohuimian.style.display = "block";
            guohuimian.src = data;
            this.guohuimianimg = data.substring(23, data.length);
          }
        }
      );
      $("#captureFromCamera").val("");
      $("#captureFromFile").val("");
    },
    //触发拍照input的click事件
    capturePic(tag) {
      let vm = this;
      if (tag == this.ImageAcquisitionMode.viaAlbum) {
        //				$('#captureFromFile').trigger('click');
        try {
          getNewPhoto(
            pictureSource.SAVEDPHOTOALBUM,
            imageData => {
              let data = "data:image/jpeg;base64," + imageData;
              if (this.captureImgIndex == "0") {
                var renxiangmian = document.getElementById("renxiangmian");
                renxiangmian.style.display = "block";
                renxiangmian.src = data;
                this.renxiangmianimg = data.substring(23, data.length);
              } else if (this.captureImgIndex == "1") {
                var guohuimian = document.getElementById("guohuimian");
                guohuimian.style.display = "block";
                guohuimian.src = data;
                this.guohuimianimg = data.substring(23, data.length);
              }
            },
            message => {
              console.log(message);
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
      return false;
    },
    //通过相机获取影像
    captureImgViaCamera() {
      console.log("通过相机获取影像 当前序号 :" + this.captureImgIndex);
      this.scanning(this.captureImgIndex);
    },
    //通过相册获取影像
    captureImgViaAlbum() {
      console.log("通过相册获取影像 当前序号 :" + this.captureImgIndex);
      this.capturePic(this.ImageAcquisitionMode.viaAlbum);
    },
    //打开获取影像菜单
    openCaptureImgMenu(tag) {
      this.isCaptureImg = true;
      this.captureImgIndex = tag;
      console.log("打开获取影像菜单 " + tag);
    },
    init: function() {
      var renxiangmian = document.getElementById("renxiangmian");
      renxiangmian.style.display = "block";
	  renxiangmian.src="data:image/png;base64,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"
      var guohuimian = document.getElementById("guohuimian");
      guohuimian.style.display = "block";
      guohuimian.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA9AAAAKABAMAAACGeY2YAAAAIVBMVEX/uAD/uwDw3bH/ugDax5r////k0KX72p3979j/znL+wDX1UxMeAAAAAnRSTlMCjk6lAZ0AABbiSURBVHja7J1Nj9vWGUYd9A8EyD8gRvRk10YIHM9SoAm7S6Gs2S4JzjWytTMWZqtUgLoOCkOzK4QuRr+ykuaLlMQP8fJ+8jw1AgeWUYVnnvcekpfSq1cP+e6HMfEw//3+VSlg9jZ/gfPwSMN5GKS/41j4ne8p9KAqTaEHUmkKPYxKU+iBVPpPHAb/82cm93BmN0dhCGGJHswizRI9kEUa0AMBjYsNxMYAPRDQaw7CMLSbQwBoAmgCaAJoAmgCaAJoAmgCaEATQBNAE0ATQBNAE0ATQBNAE0ADmgCaAJoAmgCaAJoAmgCaABrQBNAE0ATQBNAE0ATQBNAE0ATQgCaAJoAmgCaAJoAmgCaAJoAGNAE0ATQBNAE0ATQBNAE0ATQBNKAJoAmgCaDJAEC/XSTlfOGY73NzcFwcB311yDn5CONd3iR+gf4lSXT/F7mRnz0D/R9ADwP00eRmdPs5uo8LjYw9ZOQdaJiezqYQQA8jV4AeSABNowFNowFNowFNowFNowFNowFNowFNowmNptGAptFOgd58mwVDz+x2tfG90ZvVt8+DBx2I1d3a80bf0+dtXoe3d343+v4blPcJi8Pbv0Zfwfkp+Z3PjX7L+vw8vT+s/W301QrAz/nxzt9Gb5jchVX6r2tvG33P5C7kduNto5ncxVxsvG00k7ukY3feNpqLJeVT6ecDc6P+SSWtoFmiS/nwfGB+Uv+kklbQsC2N7l913iEDtMGbWIAeRn7zCHTZMmBbnt0egX5TsgzYliI8Al0ObL1tNKBr8hXQNBrQNBrQruUToGk0oFmjAc15NKC51g1ocwkBjYwBGtCAxroBjXUDGusGNNYNaGQM0IAGNNaNdQMa6wY01g1oZAzQgAY01g1orBvQWDegsW6CjAEa0Fg3oLFuQGPdgMa6rQUdhkKION7+I8uQMW9BbynH0UPiaAsb0D6CDkUeHSR3GTXWXcU5OpHY3QGOdZ/EnEcVcRY11n0WZ3dJY90nplxUGzdXamTsXM6Okgb0GWP7eXxj3e6DbsHZSdJYdwfOLpLGus9bn51dp7HuTpyjyLWzLGSs+FMfRd6SBvT5C7STyzTW/ZKLKPKXNNbdbXA7N7yx7m6D27lKY90dB/cuE2TMQdBRhwDaPdB5F9CylRYiznv6JTKsW1mhZX1MRH0mw7pVFVqy0mEU6SONdcsUWm6V7plz/VkA1i1TaKlTrIu+QdfOF2RMslzdQeeRzkoDWrJcE1tW6IZVGuuWXS3tmdy1oLHu5nIJJWdYuQLQMdYtc8yFEh2L9ILGuhsLHYdKLppoBo2MNa6Wk0CJjqkAHQFa4pBnTaPdItAZ1t39PKcRdGbL2VXdzxzW3ai/jaBjFxqNdbfAGDoDGuvuPkPjNsMd63Yf9KTVS6y/YALo6gMex0913b0mFv3O7lzrEo1114zQWATZ4w4dkWWZ6PcES/NNjcFbd9j6uOX2L9LsMOk2QUsjue4JeUsW6Qk7TDoe7rjLT4S52c12384DVLTsnxU3KieAlrn+2QpKtztYQte5Fdbd5nJJy5PtLsO7T9KCpymlxmd2zs/DQZbLZJd0uaxmHQRZ2McvnqY8H3R+DDqv+uNq0MtFUki65GlKk6DDxq1Dx68TbRbpZXIUs6i/AvqonVleBzoOmkFfLpITSeeAtqrRWVi+dyVKZ2EtQC+Tihgs9cCt+6SLFfFnu9eI4guzoMnGFkllUmOgBaAPFmixK/FzqR+2l2RPGwiz3RcuCCHqQNdwNkh6BujDFTorzvSH38RP//5wsprVgU4agnWbAH1KxYp3MOLH3zzt7S7/6amLoEliJ+mvgD7VzYvDk2ZR/NO82sYWzaBTQGsHHVYJdF57+6IadAvOhki/BvRZoOOqO1570KOkVaZYtw2gt7JVfW07DsTpfd672xqXScvMsW69oE+fRouoen+YCHNx8q+JViJmTshCQJ+61F0JOt6fap+e6Yv2oFNkzDjoOK+4Q/Vi4afvX10mZ2QOaOON7rq/IzkrWLeroEfngZ5i3RpBN+/PaffxFjvrThKrKz0DdO08fj5Nbir/9bmgU6zbEtBbuX65M709eRaiz0LrrvRXQFdvqwxfXjHZ/kvdDsHR+aBTQNsBOi5eOpvUb8PuUGjNlX4N6NqdvqJwezLvcYXWLt5Yd8OW7vD5VkbNU3Zxktheaay74YGqPWiR1Z91v+sGeop127JGP8F9IF350kVifaWRsZrJXbhdKXY3L6sq/b4jZ51XvAFdfXqVxy+g4915dN7fuZX2Myysu7bUYekaWd6riumd3Vh37TItjn/X4+TWqWNYd7ubGnV3NRbdQadYtzu3KeN6kpcLK2Y3Gw+k867Bqy+tmN2Als6oaTQvbJjd7DBRPLmbdvVj3TpA9/FRX+8bJ/PIhmsmM0BL5loO9BTrdgT0Qg50goy5ATpOAG0/6EDxEt0G9BTrdgL0tSOg+QwTlUt0G9Ap1u0C6DiRBZ1g3S6Afi8Peo6MqQcdKr3Q3Q70FNAOgB7Jg06xbvWgA7UuZhFoAWipJPKgE6xbA2hJG5v0AXqOdasHfaFUui0CzZenqJTudqCngLYe9KgP0CnWrR605CK9cAa0ALRC6W4HOsG6NYAOBwKab4RXeXbVEvQcGdMAOld4dtUadCb9P0A3Wop50P/qYUdThnUrXKTf9QP6b5F60oO3bqlF2iLQTd9hPQO0xFXQ635A/72XTyPNsG5ls3vUD+hppL7SyJjM7F70Azrt5wOGAa1sdtsFeoJ1q5rddoGOsW5V10wcAo11y1S6263l428djtQv0lh3n6Bb3nBcKAKdIWOKZnfHuxOXgDYEOvAfNNYtU+muN5YNgMa6ZVZph0Bj3TKVtgw01q2q0h037o4MgEbGZLYf2HV6FQNa1ehedNLuEde6XV+jO14CTdS7GNbdb6PtvU2JdXsDesIOE2WgrdphwnZfdddAbQKdAVodaIs2B7KvW+Ul0J5AT4V8eJpSJeie9nVLPwnf/EQO1i0Furdnr3iaEtA8Tdkn6I5P2sWAdgz0hVHQfIaJ7TtMHPrEA6xbCrQ7H1aDdUuBvnYGNNYtBZoPlBvG6RUfEekc6I6VdudDX7FuqUr3AjrAuvWB7kY6Dpz5YHasW8bHAndAY90SpLN2X4zCl6fYBfpsIcuChq97bwd6Dmi9oM9dpicnn66x9QvOsO6u97DiiqcuLP3KQqy7Y6ezwC3QWPdpIasod3z0nNOlLGg9SzTWfTjh4se+imPUcSyeOv/yPJsroJGxgx/8MHzcUxkGWSZEvqW7ZS52/wz3Pwni6XdtZnczaE2TG9DSGbkBGuuWzaUcaE2TG+uWjxxoXe8S65bOoomjDZMb61a8SM/bzHZkzAnQ9VdBg8uFDZMb0Kpntw23KLFuDbPbhluUWLeO2Z1YMbmxbqOzW9/kxrqVXzOx4WoJMmZ4dgeAdgv0yHYVw7qNVlrnO8S6zVVaZ6GxboM6Ntf5DrFuY5XWWmhkzFyl54B2EPT5ldZbaKzbmHjrLTTWbarSmguNdZuqtO53h3Wb8bG57neHjBm5iZUGgHYXdGDv4Ma6zQzvuf73hnUbMO+pgbeGdetfplMT7wzr1k7aCGdkrO9lemGhiAHahHobeltYt97pnZp6V1i3VtLGOGPdKrKs4rw0956wbn1Kls4NviVk7DGZ6DUnLpLNhaJkGaBbD7a862fwV6bc6nTe+/9B4eOSWpDGuvdRQiEOlnvY6VIl5VZfQYp1K+SsNRnW3WZwO8+58Al3WLfPhW6uNDLmRaGbKw1oPwq9+9oHrLshXnBumt1Ytx+Tu3F2Y90DAY11+wK6YXYjY564WJONAXogjca6g4tBNBrrPu9LkJwFjXVj3Vww8Qk0MuaLdmeA5lo31u3P7G66e4V1D+R+NNbtR6UFO0wGcYbVuJMIGfODNPu6W5MWubMRbTbwY93Pj2oEmZsJeZqSYN2DC9Y9kCBjgAa0T8G6BxKsG+sGNNYNaGQM0IAGNNYNaKwb0Fg3oLFuQCNjgAY01g1orBvQWDegsW5AI2OABjSgsW5AY90E68a6AY2MARrQgMa6AY11AxrrBjTWDWhkDNCAxroBjXUDGusGNNYNaGQM0IAGNNYNaKwb0Fg3wbqRMUADGtBYN6CxbkDTaECzRgO6x3wC9DDyG6CHkVtvQX8GbtHFPhSPzZvkiz+gZ9AtXgFdFY/NTfLRH9DfoFsEfVc8NkmS+AP6HrqF/LgpHJorv0CzSBfy69rbRl8xuwsudrf2ttHjFZV+OYvejP0CXTxvuAL0cz6UJrcHo7t43nD1DdJPK/Td2LNGl/4LWKWfVujVeuxZo8ug72d0eov50+1m7HWjt6SZ3lvOq8167HWjx+PNajZ7HXwe9K/Z7d1m7HmjiaHDBGg7QqNpNKBpNKBpNKBpNKBpNKBpNKBpNKBpNKHRNBrQNBrQNBrQNBrQNBrQNBrQNBrQNJocZlOOF6CL+QLifUbJUfwC/RHGu7w55pz6BZo5vs/Px6D/AehhgP6d0T2I0Z2ukTEfc3PI+Y+x46CJFQE0oAmgCaAJoAmgCaAJoAmgCaABTQBNAE0ATQBNAE0ATQBNAE0ADWgCaAJoAmgCaAJoAmgCaAJoQBNAE0ATQBNAE0ATQBNAE0ATQAOaAJoAmgCaAJoAmgCaAJoAGtBW5X51V/VHb19e9Efl3/9pOVs3/v1drtaANpmb6u+L+d+/X170z6oX/ZIk6/q////2zmW3bSMKwy76AgW66zYgnGTVkgh4eQwZA0l5jAoEZS9jEFa8DEHY6rKCYLlPWXJmODfOUKJEIk74/4vcRI4cfjxzLnML6edJulI/C8/B/poB9BigU9KQzt2HyuzdJ0jx1yOlB1is9Sa8x96U/87d7xRAXwI6Fx8R8s59/9x9/2f5m94p+IRQb5BsTVkdyevT+5weesJ+jPXGra8A3Rd0LA6HijuO28mdvXrMuCSsmb32QpT8pKbw2MFjr9vs7435aUrcWgJ0X9C+wBu6+8zEbezcakPWTKQdthbzo5rcoJ9r8zQ/3NwC9PCg9wJvZPPDZesZ31i9N4/WQr1XeCZk1gm6DXOTFc7PAPoC0KnA++ks0Nx7l5Ro04OLniCnXcGpoDfXt0qfovnoqiH46ItAy1hsbwu4joLm3tvjzXj6F/nUpEUwVlm4How1oDeb7Hbb9R/Yv8VzGX8k0DQWy1s0V6eCDrVYrL5e7xY8zbtH5nmp1c+1dddytBduCdCXgI5qqJ2gZ1pe5BmguW8WIV3EMyrFpOedoG9O+w947mIOQJ8CuqwffSfoeScZ7uJFQaXqIT4bhBZDgM5HPiH4pwed1yAvAM1dvCcuy40bfPI4AOiO/A6gTwHNDDCrtSbkOmtUnAg6ZL45kXZcGn13sNkNADo0WwXofqA/SeP1reXsI6B5Fh7JZiLzGPb/ggFAR+5aO0CfAlpm0RXzWX/QHruplGevJ10H1J8N+k1mVz8QaJWKPYGpEG70wsWN3vMvWV1krnyVu5ftCTp31MUWAN0TdKQUE+2j0d15NL/fV7vrqKNACdDfCXSpQLEnMN2gU3a/FoBVvcRi12pnu90B9HcDnShV58Q+SNkJOmb3J0Rz79Ut7fkGtsEtgB4D9CyTUiLkChSrRD8RcmuZGdAZjB0Y6EgvkoTMpGPm1B+OgF60ZxU8SNDsprn29xCgu0DbjDKloMKuccBO0B670DPCr5yadMwamh8BbdEcoIcFHZNzQe8a0+X369ccqEkD9JsBfTgb9GzHnXFdAU3NEkk9Cn0P0G8HdMWjPAt0yLLnKgargrywHWUf6r48Zmn3MdDzuvaqxA9ZriYCAD1A1F1lv8tSBGOEfNhagzHLMCUbi6xw3lft1kWTV+2aIsnnotx2DPRN/cIUWrHtBqAHBV1Z+UqUw2LHzEBresUKp/UE7LrdkhR6h3Ef+CsnaBZYFwLdTf3LOy3lewfQA4Oeybqn73h6NtAJmz7kUf9c9QhfAxO0UBs0U6FWabSanDpOBdCDgC6rhyxAu0YNbKD5VM+0+pW3exnovT4JZRGYoPVxcoDuCfpTFUMJ0K51V7ZBDT5WtZ8Hw4DWehN1TQhADxOMPSpDVrljBocl6k54XBytRLuvNExb0lAs7wbNQuudqIzeG9VXdU0IQA8COi4k6MQ1tmgB3YxVxXq7TbR8BLTePPtnZeZfqEMH6AFAM45L/nwdD88COlXy5rQ9+tUHNLflvRwU2avRfwO6yfAQjF0MOtJd8ZcO0Et1vFlptzHFPqBj1pH4qtNWvg9R9+CgS9c4YBu0OkdUaTe+AHQiBjZjbYgToAcHnfcBPbO1K/LfPqCbBZxifcdeGxUH6KFBJ9aRfZ+mU2Z6paVPsl2/YdgHdPP3ZhZpFdCrEAF6aNChAXPePH7r/I6drV1R6OgHmt3UzC709SkMAD14162Fwjn3kw7Qj9Z2RXmrD2gxxZjPOjNmkAL0qKDFOrnoqEEr7Yo/kR6gRQQQ0lDenMIA0KOCFuuowqwlYqyhk+3mvF6ib3lzBLS8nU5HMqcwoGAyJmi/Yz3bwVwfLdqVWx1ocTMFnThBi7eDDo63pjAA9JigPdu0bJHlukDL0mUbtF+4QCsWXJm0Z84TBujhQSeKQbt2gUtyN2i5tWALdOKtHKDVDa986v8LgB4ZdPmwa2C6DDqpXOgid4BORRmlBfpQm60VtK8G2R5pvWIIxgYHXfGd0Wf+7DTomjP5mDpA58qcJB10Qt8NK2htMWxJWmtFAHpw0HXHuVhRTA6DTmqL+xo4QIfq/oOFBvpAA3Ur6FKppv7bSt0AegTQYe1+F3eB5zLouL5gvnOBljVqE/SCGaoVtLJXVZzrU7oBeiQfzR70e2JdDR8E3+pP62n7DtCyRh0aoDk9G2hl9zka561pnwHQ46ZXtGsm9iWV8fuGswO0T9qDGxJ04QAtUzLq/9lk0o8APXIeTR+27bLkWy44O0Cn2h4myuf7pkkbaJmSpczuabdyB9BjF0zW7Uy20hPznjz9soIOlRFsfQt3rwmwbKBFSia+mK4OugPofgq1kUdjHXJhq4ylrcCXWzMhH8QlFtCpUgH3VC+f0Nw4ESt+xF6g9f4HzZ5VyVq6DLru76MErf/sfJ0HQBugO7ZBJlbQtPeeSdLbdTNidRd0gA6Vidoveu9Px5ltP8hKbCMaeyrcZ/Wtwo4HI4FmEZlMeZqLr3cKuTbolKdFXmV6+gSU6qPCCbqkLvol14yYTUrjfgKgxwLNwqHHQLOoL421st6zBbrZZ79Zr6HG7dFj4ASd1508zdvUUJvFhDOAPs9Ht+QATaEs1arkl3/UyMowWGbRzQD2nhBiJOJx4AZNVwEdDM6c9JyDfmgPiWdrgO6v9jDlQTHJaHFdaBery6Yk6Ehu4WwL2y2H5NBgLKybitUAgF++JmItwMraUwH0AKCDUj7GRP9k3y5SUtAJL2fF26fsdnf6l68pTMubsRYzhwF6IL1kdy37c55XEarL43iS3b7/dNH36MX2ZvBTF5RdhlV3kGUADQE0BNAQQEMADQE0QEMADQE0BNAQQEMADQE0BNAQQAM0BNAQQEMADQE0BNAQQEMADQE0BNAADQE0BNAQQEMADQE0BNAQQEMADdAQQEMADQE0BNAQQEMADQE0BNAQQAM0BNAQQEMADQE0BNAQQEMADQE0QEMADf0koHd4BlNQcvU7HsIU9BdATwX0r3gIU9CfAD0V0L/gIUxBv10hv5pGdnWFaGwasdgVnPQ0XPQVnPREXDT67on03DDpqRg0THoiBg2TnopBw6QnYtAgPRnOID0VzpWf/gOP5KfE3Pjn/wF6AaOT437OrgAAAABJRU5ErkJggg=='
    },
    showMsg: function(msg) {
      if (msg != undefined && msg != "") {
        this.$refs.alert.showMOdal(msg);
      }
    },
    scanning: function(tag) {
      let platform = globalConfig.os;
      if (tag == "0") {
        MAPlugin.hybridCallAction(
          "hybrid://MAOcrIdCard:401/invokeOcrIdCard?0",
          callbackSucc => {
            var renxiangmian = document.getElementById("renxiangmian");
            renxiangmian.style.display = "block";
            renxiangmian.src =
              "data:image/jpeg;base64," + callbackSucc.idcardImg;
            this.renxiangmianimg = callbackSucc.idcardImg;
          },
          function(callbackFail) {
            this.showMsg(callbackFail);
          }
        );
      } else if (tag == "1") {
        MAPlugin.hybridCallAction(
          "hybrid://MAOcrIdCard:401/invokeOcrIdCard?1",
          callbackSucc => {
            var guohuimian = document.getElementById("guohuimian");
            guohuimian.style.display = "block";
            guohuimian.src = "data:image/jpeg;base64," + callbackSucc.idcardImg;
            this.guohuimianimg = callbackSucc.idcardImg;
          },
          function(callbackFail) {
            this.showMsg(callbackFail);
          }
        );
      }
    },
    cancel: function() {
      this.value.isopen = !this.value.isopen;
      this.value.cusItem = undefined;
      console.log("取消识别客户===>", this.value);
    },
    ocr: function() {
      console.log(this.renxiangmianimg);
      if (this.renxiangmianimg != "" && this.guohuimianimg != "") {
        let customerType = "100";
        if (
          this.value.type == global_constant.constant.TAG_SEARCH_CUS_APPLICANT
        ) {
          customerType = "1";
        } else if (
          this.value.type == global_constant.constant.TAG_SEARCH_CUS_INSURE
        ) {
          customerType = "2";
        } else if (
          this.value.type == global_constant.constant.TAG_SEARCH_CUS_BNF
        ) {
          customerType = "3";
        }
        let requ = {
          policy: {
            //utils.cache.get('orderCode')
            orderCode:
              customerType == "100"
                ? customerType
                : utils.cache.get("orderCode"),
            agentCode: utils.cache.get("personsal").agentCode,
            applyCode: "",
            customerType: customerType,
            policyCode: "",
            functionCode: "",
            idCardFront: this.renxiangmianimg,
            idCardBack: this.guohuimianimg,
            id: this.value.id
          }
        };
        console.log("识别身份证件");
        console.log(this.policy);
        utils.http.postFast("OCRIDCARD", requ, body => {
          let policy = body.policy;
          if (policy.resultCode == 0) {
            let item = {};
            item.id = policy.id;
            item.name = policy.name; //姓名
            item.id_card_number = policy.id_card_number; //证件号
            item.address = policy.address; //地址
            let birthdayarr = policy.birthday.split("-");
            let birthday = "";
            if (birthdayarr[1] < 10 && birthdayarr[1].length == 1) {
              birthdayarr[1] = "0" + birthdayarr[1];
            }
            if (birthdayarr[2] < 10 && birthdayarr[2].length == 1) {
              birthdayarr[2] = "0" + birthdayarr[2];
            }
            item.birthday =
              birthdayarr[0] + "-" + birthdayarr[1] + "-" + birthdayarr[2]; //生日
            //add spoon 增加证件起期节点
            item.idStaDate = policy.valid_date
              .substring(0, 10, policy.valid_date.length)
              .split(".")
              .join("-");
            item.valid_date = policy.valid_date
              .substring(11, policy.valid_date.length)
              .split(".")
              .join("-"); //有效期
            if (item.valid_date == "长期") {
              item.valid_date = "2200-12-31";
            }
            if (policy.gender != undefined && policy.gender != "") {
              if (policy.gender == "男") {
                item.gender = "1";
              } else if (policy.gender == "女") {
                item.gender = "2";
              }
            }
            item.renxiangmianimg = this.renxiangmianimg;
            item.guohuimianimg = this.guohuimianimg;
            this.value.isopen = !this.value.isopen;
            this.value.cusItem = item;
            console.log("身份证识别信息返回===>" + JSON.stringify(body));
            utils.cache.set("isOcr", "orc");
          } else {
            this.showMsg(policy.resultMsg);
          }
        });
      } else {
        this.showMsg("请完成拍摄证件后进行证件识别！");
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
.main-contents {
  bottom: 50px;
}
.btnFoote {
  border: 0;
  color: #fff;
  width: 90%;
  margin-left: 5%;
  border-radius:3px;
  height: 50px;
  background: #feb101;
  height: 50px;
  position: fixed;
  bottom: 15px;
  font-size: 16px;
}
.id-title {
  font-size: 14px;
  font-weight: 400;
  margin-top: 18px;
  text-align: center;
  color: rgba(51, 51, 51, 1);
}
.idcard-zhengmian {
  width: 244px;
  height: 160px;
  margin: 20px auto;
}
.idcard-fanmian {
  width: 244px;
  height: 160px;
  margin: 0 auto;
}
.photo-redmine {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin: 20px 0;
  color: rgba(153, 153, 153, 1);
}
.redmine-img{
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
}
</style>
<style>
	.footer-content{
		margin: 0 auto;
	}
</style>
