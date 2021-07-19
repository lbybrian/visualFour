<template>
  <div class="FormInfoArea">
    <el-form
      class="formItem"
      :label-width="dataInfo.labelWidth"
      :label-position="dataInfo.labelPosition"
      :label-suffix="dataInfo.labelSuffix || ':'"
    >
      <slot v-for="(item, index) in dataInfo.data">
        <el-form-item
          class="formLine"
          :label="item.name"
          :required="item.must"
          prop
          :index="index"
          style="margin-bottom: 0px"
        >
          <el-checkbox
            v-if="item.type === 'checkbox'"
            v-model="item.checkAll"
            label="全部"
            :indeterminate="item.isIndeterminate"
            name="type"
            :size="item.size || 'mini'"
            @change="handleCheckAllChange(item, index)"
          ></el-checkbox>
          <slot v-if="!!item.items && !!item.type">
            <label
              v-for="(d, i) in item.items"
              :key="i"
              style="margin-right: 10px"
            >
              <slot>
                <span v-if="d.type === 'checkbox' || item.type === 'checkbox'">
                  <el-checkbox
                    @change="handleCheckedChange(item, index)"
                    v-model="d.checked"
                    :label="d.name || d"
                    :name="item.name"
                    :size="item.size || 'mini'"
                  ></el-checkbox>
                </span>
                <span v-else-if="d.type === 'radio' || item.type === 'radio'">
                  <el-radio
                    @change="dealChangeEvent(item, index)"
                    :value="d.value"
                    v-model="item.value"
                    :label="d.name || d"
                    :size="item.size || 'mini'"
                    name="type"
                  ></el-radio>
                </span>
                <span v-else-if="d.type === 'switch' || item.type === 'switch'">
                  <span v-if="d">{{ d }}</span>
                  <el-switch
                    @change="dealChangeEvent(item, index)"
                    v-model="item.value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :size="item.size || 'mini'"
                  ></el-switch>
                </span>
                <span
                  v-else-if="
                    d.type === 'dateRange' || item.type === 'dateRange'
                  "
                >
                  <el-date-picker
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['', '']"
                    :size="item.size || 'mini'"
                    v-model="item.value"
                    :picker-options="item.pickerOptions"
                    @change="dealChangeEvent(item, index)"
                  ></el-date-picker>
                </span>
                <span v-else-if="d.type === 'tags' || item.type === 'tags'">
                  <el-tag
                    class="eTagItem"
                    :key="tIndex"
                    v-for="(tag, tIndex) in d.value"
                    :type="tag.type"
                    :size="item.size || 'mini'"
                    style="margin-left: 5px"
                    >{{ tag.name }}</el-tag
                  >
                </span>
                <span v-else-if="d.type === 'text' || item.type === 'text'">
                  <el-input
                    :size="item.size || 'mini'"
                    :placeholder="d.placeholder"
                    @change="dealChangeEvent(item, index)"
                    v-model="item.value"
                  ></el-input>
                </span>
                <span v-else-if="d.type === 'number' || item.type === 'number'">
                  <el-input-number
                    @change="dealChangeEvent(item, index)"
                    :size="item.size || 'mini'"
                    :placeholder="d.placeholder"
                    :min="d.min || item.min"
                    :max="d.max || item.max"
                    :precision="d.precision || item.precision"
                    v-model="item.value"
                  ></el-input-number>
                </span>
                <span v-else-if="d.type === 'select' || item.type === 'select'">
                  <el-select
                    v-model="d.value"
                    :size="item.size || 'mini'"
                    @change="dealChangeEvent(d)"
                    :placeholder="d.placeholder"
                  >
                    <el-option
                      v-for="(tItem, tIndex) in d.options"
                      :key="tIndex"
                      :label="tItem.label || tItem"
                      :value="tItem.value || tItem"
                    ></el-option>
                  </el-select>
                </span>
                <span
                  v-else-if="d.type === 'textarea' || item.type === 'textarea'"
                >
                  <el-input
                    type="textarea"
                    :size="item.size || 'mini'"
                    :placeholder="d.placeholder"
                    @change="dealChangeEvent(item, index)"
                    v-model="item.value"
                  ></el-input>
                </span>
                <span
                  v-else-if="
                    d.type === 'datePicker' || item.type === 'datePicker'
                  "
                >
                  <el-date-picker
                    v-model="item.value"
                    @change="dealChangeEvent(item, index)"
                    :size="item.size || 'mini'"
                    :format="d.format || item.format || 'yyyy-MM-dd HH:mm:ss'"
                    :value-format="
                      d['value-format'] ||
                      item['value-format'] ||
                      'yyyy-MM-dd HH:mm:ss'
                    "
                    :type="d.pickerType || item.pickerType || 'datetime'"
                    :placeholder="
                      d.placeholder || item.placeholder || '选择日期时间'
                    "
                  ></el-date-picker>
                </span>
                <span v-else> </span>
              </slot>
              <slot v-if="!!d.input">
                <span v-for="(t, index) in d.input" :key="index">
                  <el-input
                    :size="t.size || 'mini'"
                    :placeholder="t.placeholder"
                    v-model="item[t.mode]"
                    @change="dealChangeEvent(item, index)"
                    :style="
                      'display: inline-block; width: ' +
                      (t.width || 100) +
                      'px;'
                    "
                  ></el-input>
                  <span v-if="t.label" style="margin-right: 5px">{{
                    t.label
                  }}</span>
                  <span v-if="t.text" style="margin-right: 10px">{{
                    t.text
                  }}</span>
                </span>
              </slot>
            </label>
          </slot>
          <slot v-else>
            <p
              style="width: 100%"
              v-if="
                item.value.constructor &&
                item.value.constructor.name !== 'Array'
              "
            >
              {{ item.value }}
            </p>
            <p
              v-else
              v-for="(t, index) in item.value"
              :key="index"
              style="width: 100%"
            >
              {{ t }}
            </p>
          </slot>
          <slot
            v-if="
              item.folding &&
              (item.type === 'checkbox' || item.type === 'radio')
            "
          >
            <label
              style="
                position: absolute;
                top: 2px;
                right: 0px;
                line-height: 15px;
              "
              :title="item.buttonText || '收起'"
            >
              <el-button
                @click="switchCondition(item, index)"
                type="text"
                size="mini"
              >
                <i
                  style="
                    display: inline-block;
                    border: solid 1px #eee;
                    padding: 2px;
                    border-radius: 2px;
                  "
                  :class="item.buttonIcon || 'el-icon-arrow-up'"
                ></i>
              </el-button>
            </label>
          </slot>
          <p
            v-if="item.errorTips"
            style="line-height: 1; color: rgba(220, 0, 0, 0.8)"
          >
            {{ item.errorTips }}
          </p>
        </el-form-item>
      </slot>
    </el-form>
  </div>
</template>
<script>
var $ = require("jquery");
export default {
  data() {
    return {
      dataInfo: {
        labelWidth: "100px",
        data: [{
          name: "姓名",
          value: "XXXX"
        }],
      },
    };
  },
  props: {
    dataObj: Object,
  },
  methods: {
    updateData(data) {
      this.dataInfo = data;
      data = data.data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].type === "checkbox") {
          // data[i].checkAll = true;
          data[i].value = [];
          for (var j = 0; j < data[i].items.length; j++) {
            var item = data[i].items[j];
            if (typeof item === "string") {
              data[i].items[j] = {
                name: item,
                value: item,
              };
            }
          }
        }
      }
    },
    dealChangeEvent(item, index) {
      this.$emit("change", item, index, this.dataInfo);
      console.log(item, index);
      this.checkValue(item);
    },
    getFormValue() {
      var arr = this.dataInfo.data || [];
      var tData = {};
      for (var i = 0; i < arr.length; i++) {
        var key = arr[i].key || i;
        tData[key] = arr[i].value;
      }
      return tData;
    },
    updateFormValue(data) {
      var arr = this.dataInfo.data || [];
      for(var i = 0; i < arr.length; i++) {
        var key = arr[i].key || i;
        arr[i].value = data[key];
      }
      this.$forceUpdate();
    },
    emptyFormValue(data) {
      var arr = this.dataInfo.data || [];
      for(var i = 0; i < arr.length; i++) {
        if(!arr[i].type) {
          continue;
        }
        if(arr[i].value && arr[i].value.constructor.name === "Array") {
          arr[i].value = [];
        }
        else {
          arr[i].value = ""
        }
      }
      this.$forceUpdate();
    },
    checkValue(item) {
      var tRet = {
        code: 0,
        message: "OK",
      };
      if(item.must && (item.value === undefined || item.value.length === 0)) {
        tRet.code = 1;
        tRet.message = "不可为空。";
        item.errorTips = tRet.message;
        this.$forceUpdate();
        return tRet;
      }
      else {
        item.errorTips = "";
      }

      var rule = item.checkRule;
      item.errorTips = undefined;
      if (rule) {
        if (rule.constructor.name === "Object" && rule.callback) {
          var tt = rule.callback(item.value);
          if(tt !== 0) {
            tRet.code = tt;
            tRet.message = rule.message || "";
          }
        } else if (rule.constructor.name === "Array") {
          for (var i = 0; i < rule.length; i++) {
            if (rule[i] && rule[i].constructor.name === "Object" && rule[i].callback) {
              var tt = rule[i].callback(item.value);
              console.log(tt);
              if (tt !== 0) {
                tRet.code = tt;
                tRet.message = rule[i].message;
                break;
              }
            }
          }
        }
      }
      if(tRet.code !== 0) {
        item.errorTips = tRet.message;
      }
      else {
        item.errorTips = "";
      }
      this.$forceUpdate();
      return tRet;
    },
    checkAllItems() {
      var ret = 0;
      var arr = this.dataInfo;
      for(var i = 0; i < arr.length; i++) {
        var tRet = this.checkValue(arr[i]);
        if(tRet.code !== 0 && ret === 0) {
          ret = tRet.code;
        }
      }
      return ret;
    },
    dealPickerEvent(start, end, item) {
      console.log(start);
      item.value = [start, end];
    },
    handleCheckAllChange(item, index) {
      item.value = [];
      for (var i = 0; i < item.items.length; i++) {
        if (item.checkAll) {
          item.items[i].checked = true;
          item.value.push(item.items[i].value || item.items[i].name);
        } else {
          item.items[i].checked = false;
        }
      }
      item.isIndeterminate = false;

      this.$forceUpdate();
      this.$emit("change", item, index, this.dataInfo);
      console.log(item, index);
      this.checkValue(item);
    },
    handleCheckedChange(item, index) {
      item.value = [];
      for (var i = 0; i < item.items.length; i++) {
        if (item.items[i].checked) {
          item.value.push(item.items[i].value || item.items[i].name);
        }
      }
      let checkedCount = item.value.length;
      item.checkAll = checkedCount === item.items.length;
      item.isIndeterminate =
        checkedCount > 0 && checkedCount < item.items.length;

      this.$forceUpdate();
      this.$emit("change", item, index, this.dataInfo);
      console.log(item, index);
      this.checkValue(item);
    },
    switchCondition(item, index) {
      var selector = $(".formLine").eq(index);
      item.buttonText = item.buttonText || "收起";
      if (item.buttonText === "收起" && item.folding) {
        item.buttonText = "展开";
        item.buttonIcon = "el-icon-arrow-down";
        selector.find(".el-form-item__content").css({
          height: "40px",
          overflow: "hidden",
        });
      } else if (item.folding && item.buttonText === "展开") {
        item.buttonText = "收起";
        item.buttonIcon = "el-icon-arrow-up";
        selector.find(".el-form-item__content").css({
          height: "auto",
        });
      }
      this.$forceUpdate();
    }
  },
  beforeMount() {
    // this.dataInfo = this.dataObj;
    if(this.dataObj) {
      this.updateData(this.dataObj);
    }
    
  },
};
</script>

<style scoped>
.formLine > label {
  font-weight: 700;
}

.el-form {
  background: rgba(245, 246, 252, 0.5);
  padding: 5px 10px;
}

.formLine {
  border-bottom: dotted 1px rgba(220, 220, 220, 0.5) !important;
}

/deep/ .el-form-item__content {
  padding-right: 20px;
  padding-top: 1px;
  padding-bottom: 3px;
}

/deep/ .el-input__inner,
.el-input-number {
  width: 100%;
}
</style>
