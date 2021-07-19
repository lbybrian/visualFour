<template>
  <div>
    <div class="layoutTemplateWeb">
      <div class="layoutTemplateDiv">
        <div>
          <el-radio v-model="radio" class="elRadio" label="1" @change="getValue">两栏布局</el-radio>
        </div>
        <Example></Example>
      </div>
      <div class="layoutTemplateDiv">
        <div>
          <el-radio v-model="radio" class="elRadio" label="2" @change="getValue">三栏布局(1)</el-radio>
        </div>
        <ThreeLayout></ThreeLayout>
      </div>
      <div class="layoutTemplateDiv">
        <div>
          <el-radio v-model="radio" class="elRadio" label="3" @change="getValue">四栏布局</el-radio>
        </div>
        <FourLayout></FourLayout>
      </div>
      <div class="layoutTemplateDiv">
        <div>
          <el-radio v-model="radio" class="elRadio" label="4" @change="getValue">三栏布局(2)</el-radio>
        </div>
        <ThreeTwo></ThreeTwo>
      </div>
    </div>
  </div>
</template>

<script>
  import Example from '../app/example';
  import ThreeLayout from "../app/threeLayout";
  import FourLayout from "../app/fourLayout";
  import ThreeTwo from "../app/threeTwo";
  export default {
    data() {
      return {
        radio: '',
        url: ''
      }
    },
    components: {
      Example,
      ThreeLayout,
      FourLayout,
      ThreeTwo
    },
    props: {
      la: String
    },
    methods: {
      getValue() {
        this.$emit("listenToChildEvent", this.radio)
        if (this.radio == 1) {
          this.url = "/app/example"
        } else if (this.radio == 2) {
          this.url = "/app/threeLayout"
        } else if (this.radio == 3) {
          this.url = "/app/fourLayout"
        } else if (this.radio == 4) {
          this.url = "/app/threeTwo"
        }
        localStorage.setItem('url', this.url);
        // console.log( this.url ,898989)
      }
    },
    created() {
      this.radio = this.la;
    }
  }

</script>

<style scoped>
  body,
  html {
    width: 100%;
    height: 100%;
  }

  .layoutTemplateWeb {
    /* display: flex;
    justify-content:space-between; */
    padding: 70px 0px 20px 0px;
  }

  .layoutTemplateDiv {
    border: 1px solid #ddd;
    height: 375px;
    width: 30%;
    float: left;
    margin-right: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 25px;

  }

  .layoutTemplateWebOne {
    border: 1px solid #ddd;
    width: 44%;
    height: 190px;
    /* margin-top:25px */
  }

  .layoutTemplateWebTwo {
    border: 1px solid #ddd;
    width: 44%;
    height: 92px;
  }

  .layoutTemplateWebThree {
    height: 88px;
    border: 1px solid #ddd;
    width: 94%;
    margin-left: 11px;
    margin-top: 8px;
  }

  .elRadio {
    margin-top: 5px;
  }

</style>
