<template>
  <div class="anaManage">
    <div  class="anaManageDiv">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        size="small "
        @click="batchDelete"
        >批量删除</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        size="small "
        style="margin-left: 10px; float: right"
        @click="editItem"
        >新建</el-button
      >
    </div>
    <DataTable
      :dataObjOne="dataObj"
      @button-click="dealButtonClick"
    ></DataTable>
    <!-- 删除 -->
    <el-dialog
      class="allocation"
      title="删除"
      width="600px"
      :visible.sync="examine.dialogFormVisible"
      @close="allocationClose"
    >
      <div slot="footer" class="dialog-footer">
        <el-button @click="examine.dialogFormVisible = falses">取 消</el-button>
        <el-button type="primary" @click="allocationSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <DialogItem
      :config="setComponentDialog"
      ref="testDialog"
      class="DialogItem"
      @confirmDialog="dealConfirmDialog"
    >
      <template>
        <FormInfo
           ref="configForm"
          :dataObj="setComponentDialog.formData"
        ></FormInfo>
      </template>
    </DialogItem>
  </div>
</template>

<script>
import DataTable from "../common/dataTable";
import DialogItem from "@/common/dialogItem";
import FormInfo from "@/common/formInfo";
export default {
  components: {
    DataTable,
    DialogItem,
    FormInfo,
  },
  mounted() {},
  data() {
    return {
      dataObj: {
        withSelection: true,
        withIndex: true,
        size: "medium",
        // border: true,
        heightCurrentRow: true,
        header: [
          {
            prop: "nameIdentification",
            label: "名称标识",
            width: "180",
            align: "center",
          },
          {
            prop: "operationType",
            label: "操作类型",
            width: "180",
            align: "center",
          },
          {
            prop: "sqlStatement",
            label: "SQL语句",
            width: "180",
            align: "center",
          },
          {
            prop: "actions",
            label: "操作",
            align: "center",
            width: "180",
            buttons: [
              {
                text: "删除",
                eventName: "removeItem",
              },
              {
                text: "编辑",
                eventName: "editItem",
              },
              {
                text: "测试",
                eventName: "testItem",
              },
            ],
          },
        ],
        data: [
          {
            id: 1,
            nameIdentification: "新增实体数据",
            operationType: "新增",
            sqlStatement: "....",
          },
          {
            id: 2,
            nameIdentification: "新增实体数据",
            operationType: "新增",
            sqlStatement: "....",
          },
          {
            id: 3,
            nameIdentification: "新增实体数据",
            operationType: "新增",
            sqlStatement: "....",
          },
          {
            id: 4,
            nameIdentification: "新增实体数据",
            operationType: "新增",
            sqlStatement: "....",
          },
        ],
        page: {
          size: 20,
          count: 3,
          layout: "prev, pager, next, sizes",
          total: 200,
          background: true,
        },
      },
      examine: {
        dialogFormVisible: false,
      },
      editAnaManage: {
        dialogFormVisible: false,
      },
      dataInfo: {

      },
      setComponentDialog: {
        title: "SQL管理",
        current: null,
        withFooter: true,
        data: {
          interfaceName: "",
          url: "",
          component: "",
          requestMethod: "",
          interfaceType: "",
          sqlStatement: "",
          options: [
            {
              label: "XXXXXX",
              value: "AAAAAA",
            },
          ],
        },
        visible: false,
        formData: {
          labelWidth: "120px",
          data: [
            {
              name: "名称标识",
              value: "",
              key: "nameIdentification",
              type: "text",
              items: [
                {
                  placeholder: "请输入名称标识",
                },
              ],
            },
             {
              name: "操作类型",
              value: "",
              type: "text",
              key: "operationType",
              items: [
                {
                  placeholder: "请输入操作类型",
                },
              ],
            },
            {
              name: "SQL语句",
              value: "",
              type: "textarea",
              key: "sqlStatement",
              items: [
                {
                  placeholder: "",
                },
              ],
            },
          ],
        },
        width: "600px",
      },
      exampleData: {}
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dealButtonClick(eventName, row, index) {
      // console.log(eventName, row, index);
      switch (eventName) {
        case "removeItem":
          // this.$message('这是删除')
          this.removeItem();
          break;
        case "editItem":
          // this.$message("这是编辑");
          this.editItem(row);
          break;
        case "editItem":
          // this.$message("这是编辑");
          this.testItem();
          break;
      }
    },
    //table删除
    removeItem() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {});
    },
    //编辑和新增
    editItem(row) {
      this.$refs.testDialog.show();
      this.exampleData = row;
      if(row.id) {
        this.$nextTick(() => {
          this.updateCurrentItem();
        })
      }else{
         this.exampleData = {}
         this.updateCurrentItem();
      }
      this.updateInterfaceOptions();
      // this.updateComOptions();
      this.$nextTick(() => {
        this.$refs.configForm.$forceUpdate();
      });
    },
    //测试
    testItem() {},
    //分配弹窗关闭
    allocationClose() {},
    //分配提交
    allocationSubmit() {},
    //批量删除
    batchDelete() {
      this.$confirm("确定批量删除文档吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {});
    },
    dealConfirmDialog() {
      var tData = this.$refs.configForm.getFormValue();
      console.log(tData,8989898989)
      // var item = this.setComponentDialog.current;
      // item.switchComponent(tData);
      // 点击确定的时候就是把这些信息传过去是吧
    },
    updateCurrentItem() {
        var tData = this.setComponentDialog.formData.data;
        for (var i = 0; i < tData.length; i++) {
          if (tData[i].key) {
            if (tData[i].type === 'select'){
              for (var j = 0; j < tData[i].items.length; j++) {
               tData[i].items[j].value = this.exampleData[tData[i].key] || "";
            }
            }else {
               tData[i].value = this.exampleData[tData[i].key] || "";
            }
          }
        }
      },
    updateInterfaceOptions() {
        var tData = this.setComponentDialog.formData.data;
        // tData[2].type = "select";
        // tData[2].items[0].options = [{
        //   label: "get",
        //   value: "1"
        // }, {
        //   label: "post",
        //   value: "2"
        // },
        // {
        //   label: "put",
        //   value: "3"
        // }, {
        //   label: "delete",
        //   value: "4"
        // }];
      }
  },
};
</script>

<style >
* {
  box-sizing: border-box;
}
.anaManage .el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #fff;
  z-index: 1;
}
/* .anaManage .el-select {
    display: inline-block;
    position: relative;
    width: 400px;
} */
.DialogItem .el-select .el-input {
    width: 400px;
}
.anaManageDiv {
  width: 960px; 
  margin-bottom: 25px
}
</style>
