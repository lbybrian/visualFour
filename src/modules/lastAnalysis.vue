<template>
  <div class="stepContent">
      <Example ref="example" v-if="radioValue=='1'" :lastStatus="lastShow"></Example>
      <ThreeLayout ref="example" v-if="radioValue=='2'" :lastStatus="lastShow"></ThreeLayout>
      <FourLayout ref="example" v-if="radioValue=='3'" :lastStatus="lastShow"></FourLayout>
      <ThreeTwo ref="example" v-if="radioValue=='4'" :lastStatus="lastShow"></ThreeTwo>
  </div>
</template>

<script>
import Example from "../app/example";
import ThreeLayout from "../app/threeLayout";
import FourLayout from "../app/fourLayout";
import ThreeTwo from "../app/threeTwo";
export default {
  name :"lastAnalysis",
  components: {
     Example,
     ThreeLayout,
     FourLayout,
     ThreeTwo
  },
  data () {
      return {
          lastShow: 1,
          showData: [],
          radioValue: '',
          lastData: []
      }
  },
  props: {
   
  },
  methods: {
    lastUpdateView() {
      var _self = this
      let dataB = {
        _id : this.$route.query.id
      }
      _self.tAdapter.getEntityData({
        condition : dataB
      }, function (d) {
       _self.showData = d.data[0].data
      // console.log(_self.showData,1111111)
        if (_self.showData.length !== 0) {
           _self.$refs.example.updateView(_self.showData)
        }
      })   
    }
  },
  mounted() {
    this.radioValue =  this.$route.query.radioValue
    this.url = this.$route.query.url
    this.lastUpdateView()
  },
}
</script>

<style>
.stepContent{
  height: 660px;
  width: 1280px;
}
</style>
