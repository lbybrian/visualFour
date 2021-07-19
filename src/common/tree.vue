<template>
  <div>
    <el-tree class="custom-tree-node" :data="treeData.tree" ref="tree" :node-key="treeData.nodeKey"
      :flag="treeData.hideParentCheckBox" :accordion="treeData.accordion"
      :expand-on-click-node="treeData.expandClickNode" :highlight-current="treeData.highlightCurrent"
      :indent="treeData.treeIndent" :show-checkbox="treeData.treeShowCheckbox"
      :check-strictly="treeData.treeCheckStrictly" @node-click="nodeClick" @check="check" @check-change="checkChange"
      :previewJson="previewJson">
      <div class="custom-tree-node span-ellipsis" slot-scope="{ node, data }" :id="'nodeId' + node.id"
        @mouseenter="enter('nodeId' + node.id, data, node)" @mouseleave="leave('nodeId' + node.id, data)">
        <span class="span_label" v-if="treeData.collect">{{
          `${node.label}(${data.count || 0})`
        }}</span>
        <span class="span_label" v-else>{{ node.label }}</span>
        <span class="hoverIcon span_label_show" v-if="treeData.editable" style=" display: none;">
          <span class="el-icon-plus opButton" style="color: #409EFF" @click.stop="() => appendNode(node, data)"
            title="添加标签"></span>
          <span class="el-icon-edit opButton" @click="editNode(node, data)" title="修改标签"></span>
          <span class="el-icon-close opButton" @click.stop="() => removeNode(node, data)" title="删除"></span>
        </span>
      </div>
    </el-tree>
    <el-dialog :title="treeData.dialogData.title" :visible.sync="treeData.dialogData.visible" @close="closeDialog">
      <el-form :model="treeData.form" :rules="treeData.tagRule" ref="form">
        <el-form-item label="名称" label-width="120px" prop="label">
          <el-input v-model="treeData.form.label" auto-complete="off" autofocus placeholder="输入节点名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序" label-width="120px" prop="is_order">
          <el-input-number v-model="dialogData.form.is_order" controls-position="right" :min="1" style="width: 100%" placeholder="输入排列顺序"></el-input-number>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="dialogSure('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  var Parser = require('fast-xml-parser')
  export default {
    name: 'tree',
    props: {
      dataObj: Object,
    },
    data() {
      return {
        treeData: {
          tree: [{
              id: 1,
              label: '一级 1',
              count: 10,
              children: [{
                id: 4,
                label: '二级 1-1',
                count: 10,
                children: [{
                    id: 9,
                    label: '三级 1-1-1',
                    count: 3,
                    children: [{
                      id: 23,
                      label: '四级 1-1-1-3',
                      count: 3,
                    }, ],
                  },
                  {
                    id: 10,
                    label: '三级 1-1-2',
                    count: 7,
                  },
                ],
              }, ],
            },
            {
              id: 2,
              label: '一级 2',
              count: 10,
              children: [{
                  id: 5,
                  label: '二级 2-1',
                  count: 8,
                },
                {
                  id: 6,
                  label: '二级 2-2',
                  count: 2,
                },
              ],
            },
            {
              id: 3,
              label: '一级 3',
            },
          ],
          nodeKey: 'id', //唯一标识
          expandClickNode: false, //点击节点展开与否
          accordion: false, //是否手风琴模式
          highlightCurrent: true, //当前选择是否高亮
          treeIndent: 16, //水平缩进
          treeShowCheckbox: false, //是否复选
          treeCheckStrictly: false, //是否严格的遵循父子不互相关联的做法,配合treeShowCheckbox(复选)实现单选
          editable: true, //可否编辑
          collect: false, //是否展示统计
          hideParentCheckBox: false, //隐藏父级复选框
          JsonToXmlOptions: { //不要下面属性修改
            attributeNamePrefix: '_attrs', //用这个前缀标识属性，否则将它们视为标记
            attrNodeName: '_attrs', //当属性分组在单个属性下时，标识它们
            textNodeName: 'label',
            ignoreAttributes: false, //不检查属性。把一切都当作标签
            format: true, //如果设置为true，则格式化XML输出
            // indentBy: '',//当format设置为true时使用这个字符缩进
          },
          xmlToJsonOptions: { //不要下面属性修改
            // attrNodeName: '_attrs', //(有效名称)将所有属性分组为给定名称的属性
            textNodeName: 'label', //文本对应的标签
            ignoreAttributes: false, //忽略要解析的属性
            allowBooleanAttributes: true, //标签可以有没有任何值的属性
            trimValues: true, //修剪属性或节点的字符串值
            parseTrueNumberOnly: false, //如果为真，那么像"+123"或"0123"这样的值将不会被解析为数字
            stopNodes: ['parse-me-as-string'], //一个不需要解析的标签名数组。相反，它们的值被解析为字符串
          },
          dialogData: {
            title: '',
            visible: false,
          },
          form: {
            label: '',
            // is_order:'',
          },
          tagRule: {
            label: [{
              required: true,
              message: '请输入名称',
              trigger: ['blur'],
            }, ],
          },
        },
      }
    },
    beforeMount() {
      if (this.dataObj) {
        this.updateData(this.dataObj)
      }
    },
    mounted() {},
    methods: {
      //json转xml方法
      jsonToXml(json) {
        return this.doXml(this.parseData(this.mapChildren(json)))
      },
      //获取除children、label之外的属性，返回新对象
      deleteParam(obj) {
        const {
          children,
          label,
          ...rest
        } = obj
        return rest
      },
      //获取children中的子项(label为key，value为_attrs和子项的children中的子项)添加到对象中，返回新对象
      mapObj(obj) {
        const {
          children,
          label,
          ...rest
        } = obj
        let result = {
          children,
          label,
        }
        if (Object.keys(this.deleteParam(obj)).length) {
          result = {
            ...result,
            _attrs: this.deleteParam(obj),
          }
        }
        if (children) {
          const newObj = this.mapChildren(children)
          result = {
            ...result,
            ...newObj,
          }
        }
        return result
      },
      // 遍历数组
      mapChildren(child) {
        let obj = {}
        child &&
          child.forEach((item) => {
            if ([item.label] in obj) {
              let oldData = obj[item.label]
              if (Array.isArray(oldData)) {
                obj[item.label] = [...oldData, this.mapObj(item)]
              } else {
                obj[item.label] = [oldData, this.mapObj(item)]
              }
            } else {
              obj[item.label] = this.mapObj(item)
            }
          })
        return obj
      },
      // 删除key为label和children的属性，递归删除
      parseData(obj) {
        for (var prop in obj) {
          if (prop === 'label' || prop === 'children') {
            delete obj[prop]
          } else if (obj[prop].label) {
            this.parseData(obj[prop])
          } else if (Array.isArray(obj[prop])) {
            obj[prop].forEach((item) => this.parseData(item))
          }
        }
        return obj
      },
      // xml转json组件调用方法
      previewJson(xml) {
        var tData = this.xmlToTreeData(xml)
        this.treeData.tree = tData.children
        console.log(this.treeData.tree, 980000)
      },
      //xml转json插件方法调用
      xmlToTreeData(xml) {
        this.idCount = 0
        const objJson = Parser.parse(xml, this.treeData.xmlToJsonOptions)
        var ret = this.xmlJsonToTreeData(objJson)
        return ret
      },
      //遍历嵌套对象为json
      xmlJsonToTreeData(json, label) {
        let ret = {
          id: this.idCount,
          children: [],
        }
        ret.label = label || ret.label
        this.idCount++
        for (var k in json) {
          var t = json[k]
          if (t.constructor.name === 'Object') {
            var a = this.xmlJsonToTreeData(t, k)
            ret.children.push(a)
          } else if (t.constructor.name === 'Array') {
            for (var i = 0; i < t.length; i++) {
              var b = this.xmlJsonToTreeData(t[i], k)
              ret.children.push(b)
            }
          } else if (k === 'label') {
            this.idCount++
            var c = {
              id: this.idCount,
              label: t,
            }
            ret.children.push(c)
          } else {
            ret[k] = t
          }
        }
        return ret
      },
      // 鼠标移入移除 控制左侧标签树icon的显隐
      enter(id, data, node) {
        data.show = true
        $('#' + id)
          .children('.hoverIcon')
          .show()
      },
      leave(id, data) {
        data.show = false
        $('#' + id)
          .children('.hoverIcon')
          .hide()
      },
      //添加节点
      appendNode(node, data) {
        this.$emit('appendNode', node, data)
      },
      // 编辑节点
      editNode(node, data) {
        this.$emit('editNode', node, data)
      },
      removeNode(node, data) {
        this.$emit('removeNode', node, data)
      },
      //节点点击事件
      nodeClick(data, node, self) {
        this.$emit('nodeClick', data, node, self)
      },
      // 选中事件
      check(data, node) {
        let flat = this.$refs.tree.getCheckedNodes() //所选中的结构集合
        let key = this.$refs.tree.getCheckedKeys() //所选中的节点Key集合
        this.$emit('nodeCheck', data, node, flat, key)
      },
      //选中节点变化事件,实现单选
      checkChange(data, checked, node) {
        if (this.treeData.treeCheckStrictly && checked) {
          this.$refs.tree.setCheckedNodes([data])
        }
      },
      //关闭弹框
      closeDialog() {
        this.treeData.dialogData.visible = false
        // this.dialogData.form.label = ''
        this.$refs.form.resetFields()
      },
      // 弹窗提交
      dialogSure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.treeData.dialogData.title == '新增节点') {
              this.appendNodeSubmit(this.treeData.form)
            } else {
              this.editNodeSubmit(this.treeData.form)
            }
          }
        })
      },
      //新增提交
      appendNodeSubmit(data) {
        this.$emit('appendNodeSubmit', data)
      },
      //编辑提交
      editNodeSubmit(data) {
        this.$emit('editNodeSubmit', data)
      },
      //获取选中的node
      getCheckedNodes() {
        return this.$refs.tree.getCheckedNodes()
      },
      //设置目前勾选的节点
      setCheckedNodes(data) {
        return this.$refs.tree.setCheckedNodes(data)
      },
      //获取选中的节点的 key 所组成的数组
      getCheckedKeys(leafOnly) {
        return this.$refs.tree.getCheckedKeys(leafOnly)
      },
      //通过 keys 设置目前勾选的节点
      setCheckedKeys(keys, leafOnly) {
        return this.$refs.tree.setCheckedKeys(keys, leafOnly)
      },
      //获取当前被选中节点的 key
      getCurrentKey() {
        return this.$refs.tree.getCurrentKey()
      },
      //获取当前被选中节点的 data
      getCurrentNode() {
        return this.$refs.tree.getCurrentNode()
      },
      //删除 Tree 中的一个节点
      remove() {
        return this.$refs.tree.remove()
      },
      //为 Tree 中的一个节点追加一个子节点
      append(data, parentNode) {
        return this.$refs.tree.append(data, parentNode)
      },
      //根据 data 或者 key 拿到 Tree 组件中的 node
      getNode(data) {
        return this.$refs.tree.getNode(data)
      },
      //数据更新
      updateData(data) {
        if (data) {
          this.treeData = Object.assign(this.treeData, data)
        }
        console.log(this.treeData, 678)
      },
      //json转xml插件方法
      doXml(json) {
        const obj2xml = new Parser.j2xParser(
          this.treeData.JsonToXmlOptions
        ).parse(json)
        return obj2xml
      },
    },
  }

</script>

<style scoped>
  .opButton {
    margin-left: 7px;
  }

  .span_label {
    float: left;
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .span_label_show {
    float: right;
    width: 100px;
    /*overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;*/
  }

  .span-ellipsis {
    float: left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /deep/ .custom-tree-node[flag='true'] .el-tree-node__expand-icon+label.el-checkbox {
    display: none !important;
  }

  /deep/ .custom-tree-node[flag='true'] .is-leaf+label.el-checkbox {
    display: inline-block !important;
  }

</style>
