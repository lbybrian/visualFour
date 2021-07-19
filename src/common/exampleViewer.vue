<template>
  <div class="containerArea">
    <codemirror ref="mycode" :value="curCode" :options="cmOptions" class="code"></codemirror>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/material.css";
import "codemirror/theme/icecoder.css";
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/fold/indent-fold.js");
require("codemirror/addon/fold/comment-fold.js");
var beautify = require("js-beautify").js;

export default {
  name: "",
  components: {
    codemirror,
  },
  beforeMount() {
    this.curCode = beautify(this.code, {
      indent_size: 2,
      space_in_empty_paren: true,
    });
  },
  data() {
    return {
      curCode: "",
      cmOptions: {
        value: "",
        mode: "text/html",
        lineNumbers: true,
        readOnly: true,
      },
    };
  },
  methods: {
    getExampleCode(url) {
      url = url || this.url;
      this.ajaxGET(url, 1).then(d => {
        this.curCode = d;
      });
    }
  },
  mounted() {
    this.getExampleCode()
  },
  props: {
    url: String
  },
};
</script>

<style scoped>
.containerArea {
  width: 100%;
  height: 100%;
  border-top: solid 1px #ddd;
  border-left: solid 1px #ddd;
  box-shadow: 1px 1px 1px #ddd;
}

.CodeMirror {
  border: 1px solid #eee;
  height: 100%;
}

.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
