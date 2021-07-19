<template>
  <div style="height: 100%;">
    <el-tree class="custom-tree-node" :flag="hideParentCheckBox" :data="tree" ref="tree" :accordion="accordion"
      :node-key="nodeKey" :default-expand-all="expandAll" :expand-on-click-node="expandClickNode"
      :highlight-current="highlightCurrent" :indent="treeIndent" :show-checkbox="treeShowCheckbox"
      :check-strictly="treeCheckStrictly" @node-click="nodeClick" @check="check" @check-change="checkChange">
      <div class="span-ellipsis" slot-scope="{ node, data }" :id="'nodeId' + node.id"
        @mouseenter="enter('nodeId' + node.id, data, node)" @mouseleave="leave('nodeId' + node.id, data)">
        <span class="span_label" v-if="collect">{{ `${node.label}(${ data.count || 0})` }}</span>
        <span class="span_label" v-else>{{ node.label }}</span>
        <span class="hoverIcon span_label_show" v-if="editable" style=" display: none;">
          <span class="el-icon-plus opButton" style="color: #409EFF" @click.stop="() => appendNode(node, data)"
            title="添加标签"></span>
          <span class="el-icon-edit opButton" @click="editNode(node, data)" title="修改"></span>
          <span class="el-icon-close opButton" @click.stop="() => removeNode(node, data)" title="删除"></span>
        </span>
      </div>
    </el-tree>
    <el-dialog :title="dialogData.title" :visible.sync="dialogData.visible" @close="closeDialog">
      <el-form :model="dialogData.form" :rules="dialogData.tagRule" ref="form">
        <el-form-item label="名称" label-width="120px" prop="label">
          <el-input v-model="dialogData.form.label" auto-complete="off" autofocus placeholder="输入节点名称"></el-input>
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
  export default {
    name: 'tree',
    props: {
      tree: {
        type: Array,
        default: [],
        required: true,
      },
      expandAll: {
        //全部展开
        type: Boolean,
        default: false,
      },
      expandClickNode: {
        //点击节点展开与否
        type: Boolean,
        default: false,
      },
      accordion: {
        //是否手风琴模式
        type: Boolean,
        default: false,
      },
      nodeKey: {
        //唯一标识
        type: String,
        required: true,
      },
      highlightCurrent: {
        //当前选择是否高亮
        type: Boolean,
        default: false,
      },
      treeIndent: {
        //水平缩进
        type: Number,
        default: 12,
      },
      treeShowCheckbox: {
        //是否复选
        type: Boolean,
        default: true,
      },
      treeCheckStrictly: {
        //是否严格的遵循父子不互相关联的做法配合单选
        type: Boolean,
        default: true,
      },
      editable: {
        //可否编辑
        type: Boolean,
        default: true,
      },
      collect: {
        //是否展示统计
        type: Boolean,
        default: true,
      },
      hideParentCheckBox: {
        //是否展示统计
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        checkBoxData: [],
        dialogData: {
          title: '',
          visible: false,
          form: {
            label: '',
            // is_order:'',
          },
          tagRule: {
            label: [{
              required: true,
              message: '请输入名称',
              trigger: ['blur']
            }],
          },
        },
      }
    },
    methods: {
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
      //添加子节点
      appendNode(node, data) {
        this.dialogData.visible = true
        this.dialogData.title = '添加节点'
        // this.$emit('appendNode', node,data);
      },
      editNode(node, data) {
        console.log(node, data, '编辑')
        this.dialogData.visible = true
        this.dialogData.title = '编辑节点'
        this.$nextTick(() => {
          this.dialogData.form.label = node.label
        })

        // this.$emit('editNode', node,data);
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
      //选中节点变化事件
      checkChange(data, checked, node) {
        if (this.treeCheckStrictly && checked) {
          this.$refs.tree.setCheckedNodes([data])
        }
      },
      //关闭弹框
      closeDialog() {
        this.dialogData.visible = false
        // this.dialogData.form.label = ''
        this.$refs.form.resetFields()
      },
      // 弹窗提交
      dialogSure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.dialogData.title == '新增节点') {
              this.appendNodeSubmit(this.dialogData.form)
            } else {
              this.editNodeSubmit(this.dialogData.form)
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
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes()
      },
      //获取选中的节点的 key 所组成的数组
      getCheckedKeys() {
        return this.$refs.tree.getCheckedKeys()
      },
      //通过 keys 设置目前勾选的节点
      setCheckedKeys() {
        return this.$refs.tree.setCheckedKeys()
      },
      getNode(key) {
        return this.$refs.tree.getNode(key);
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
      append() {
        return this.$refs.tree.append()
      },
    },
  }

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .opButton {
    margin-left: 7px;
  }

  .span_label {
    float: left;
    width: calc(100% - 120px);
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
    float: right;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /deep/ .custom-tree-node[flag=true] .el-tree-node__expand-icon+label.el-checkbox {
    display: none !important;
  }

  /deep/ .custom-tree-node[flag=true] .is-leaf+label.el-checkbox {
    display: inline-block !important;
  }

</style>
