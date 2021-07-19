 <template>
  <div style="padding: 20px" v-loading="loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>可视化</el-breadcrumb-item>
      <el-breadcrumb-item>模型算法</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :space="800" :active="active" finish-status="success" align-center>
      <el-step description="选择训练数据"></el-step>
      <el-step description="设置算法参数"></el-step>
      <el-step description="选择标签数据"></el-step>
      <el-step description="数据查看"></el-step>
      <el-button v-if="active !== 1" style="margin-top: 12px; height: 40px" @click="getBack()">上一步</el-button>
      <el-button v-if="active !== 4" style="margin-top: 12px; height: 40px" type="primary" @click="next()">下一步
      </el-button>
      <el-button v-if="active == 4" style="margin-top: 12px; height: 40px" type="success" @click="confirm()">确定
      </el-button>
    </el-steps>
    <!-- 步骤1 -->
    <div style="border: 1px solid #ccc; padding: 20px; height:650px;" v-if="active === 1">
      <!-- <h3 style="margin-bottom: 20px">Step 1:选择训练数据</h3> -->
      <div>
        <el-select v-model="value" @change="switchTrain()" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="choiceClass">
        <el-radio class="choiceList" v-for="(item,index) in fileList" :key="index" v-model="trainDataRadio" border
          :label="index" @change="radioClick(item)"> {{item.name}}</el-radio>
      </div>
    </div>
    <!-- 步骤2 -->
    <el-row :gutter="20" v-if="active === 2">

      <el-row>
        <el-col :span="11" class="twoOverall">
          <div class="grid-content bg-purple">
            <div style="height:50px; line-height:50px; border-bottom:1px solid #ccc; margin-bottom:50px;">
              算法模型列表
            </div>
            <el-checkbox-group style="overflow-y:scroll; height:500px;" v-model="checkboxValue" @change="changeClick">
              <el-checkbox style="width:170px;" v-for="(item, index) in checkboxGroup" :label="item" :key="index"
                border>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :span="5" class="twoOverall">
          <div class="grid-content bg-purple-light">
            <div style="height:50px; line-height:50px; border-bottom:1px solid #ccc; margin-bottom:50px;">
              已选择算法的模型
            </div>
            <div v-if="checkboxValue.length==0" class="placefolderText">请选择算法模型</div>
            <div v-if="checkboxValue.length!=0" style="overflow-y:scroll; height:500px;">
              <el-card shadow="hover" style="width:150px;" v-for="(item, index) in checkboxValue" :key="index"
                :class="index == idx ? 'active_check_card' : 'check_card'" @click.native="clickCard(index,item)">
                {{ item }}
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="twoOverall">
          <div class="grid-content bg-purple">
            <div style="height:50px; line-height:50px; border-bottom:1px solid #ccc; margin-bottom:50px;">
              参数信息配置
            </div>
            <div style="padding-left:30px;">
              <div style="margin-bottom: 20px">
                <label>选择参数接口:</label>
                <el-select v-model="checkvalue" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div v-for="(item ,index) in 8" :key="index" style="margin-bottom:15px;">
                  <label>配置参数信息 {{index+1}} :</label>
                  <el-input v-model="input" style="width:300px" placeholder="请输入内容"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

    </el-row>
    <!-- 步骤3 -->
    <el-row :gutter="20" v-if="active === 3">
      <div>
        <el-select v-model="values" @change="labelClock()" placeholder="请选择">
          <el-option v-for="item in labelList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="labelBox">
        <div class="labelBoxDiv">
          实体标签
          <el-divider></el-divider>
          <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
        </div>
        <div class="labelBoxDiv">
          事件标签
          <el-divider></el-divider>
          <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
        </div>
        <div class="labelBoxDiv">
          关系标签
          <el-divider></el-divider>
          <el-tree :data="TreeDatalist" :props="TreeDatalist" :default-expand-all="true"></el-tree>
        </div>
      </div>
    </el-row>
    <!-- 步骤4 -->
    <div v-if="active === 4">
      <el-row style="margin-top: 0px; height: 100%;" :gutter="5">
        <!-- zuo -->
        <div class="left_div">
          <div style="height:50px; line-height:50px; border-bottom:1px solid #ccc; margin-bottom:50px;">
            已选择算法的模型
          </div>
          <div v-if="checkboxValue.length==0" class="placefolderText">请选择算法模型</div>
          <div v-if="checkboxValue.length!=0" style="overflow-y:scroll; height:500px;">
            <el-card shadow="hover" style="width:150px;" v-for="(item, index) in checkboxValue" :key="index"
              :class="index == idx ? 'active_check_card' : 'check_card'" @click.native="clickCard(index,'item')">
              {{ item }}
            </el-card>
          </div>
        </div>
        <!-- you -->
        <div class="documentArea">
          <h3 style="padding: 15px 20px 0px 20px">
            <span style="font-weight: 900">{{ current.title }}</span>
            <!-- <span style="float: right">
              <el-button size="mini" round>导出实体数据</el-button>
              <el-button size="mini" @click="exportEventData" round>导出事件数据</el-button>
              <el-button size="mini" round>导出所有数据</el-button>
              <el-button type="danger" size="mini" round>清空实体标签</el-button>
              <el-button type="danger" size="mini" round>清空事件标签</el-button>
            </span> -->
          </h3>
          <div class="bottom_data">
            <EntityLabelTool :dataObj="current.data" ref="labelToolItem"></EntityLabelTool>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
// 步骤1数据
import treedata from "@/assets/json/treedata.json";
import DataTable from "@/common/textTable";
import EntityLabelTool from "@/common/entityLabelTool";
export default {
  components: {
    DataTable,
    EntityLabelTool,
  },
  mounted () {
    // 调用默认选择第一个
    this.switchTrain(0)
    // 步骤一下拉列表赋值
    this.value = treedata.oneSelect[0].value
    this.options = treedata.oneSelect

    // 步骤三下拉列表赋值
    this.values = treedata.twoSelect[0].value
    this.labelList = treedata.twoSelect

    // 步骤二 数据赋值
    this.TreeDatalist = treedata.twoSelectData
  },
  data () {
    return {
      labelList: [],
      TreeDatalist: [],
      input: '',
      right_title: '参数信息配置',
      loading: false,
      // 第一步radio是否选中
      trainDataRadio: null,
      value: "",
      // 步骤一下拉列表
      options: [],
      // 训练数据列表
      fileList: [],
      checkboxGroup: [
        "算法模型A",
        "算法模型B",
        "算法模型C",
        "算法模型D",
        "算法模型E",
        "算法模型F",
        "算法模型F1",
        "算法模型F2",
        "算法模型F3",
        "算法模型F4",
        "算法模型F5",
        "算法模型F6",
        "算法模型F7",
        "算法模型F8",
        "算法模型F9",
        "算法模型F10",
        "算法模型F11",
        "算法模型F12",
        "算法模型F13",
        "算法模型F131",
        "算法模型F132",
        "算法模型F133",
        "算法模型F134",
        "算法模型F135",
        "算法模型F136",
        "算法模型F137",
        "算法模型F138",
        "算法模型F139",
        "算法模型F140",
        "算法模型F141",
        "算法模型F1411",
        "算法模型F1412",
        "算法模型F1413",
        "算法模型F1414",
        "算法模型F1415",
        "算法模型F1416",
      ],
      idx: 0,
      radioValue: "",
      dataFilter: {
        value: "",
        keyword: "",
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick (picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
      },
      current: {
        title: "2020年美国第1次军事演习报道",
        data: {
          content: "#测试",
        },
      },
      docListTable: {
        withIndex: true,
        heightCurrentRow: true,
        header: [
          {
            prop: "name",
            label: "文档名称",
            align: "left",
          },
          {
            prop: "date",
            label: "操作",
            width: "120",
            buttons: [
              {
                text: "同步",
                eventName: "updateItem",
              },
              {
                text: "导出",
                eventName: "exportItem",
              },
            ],
          },
        ],
        data: [
          {
            date: "2020-02-21",
            name: "2020年美国第1次军事演习报道",
          },
          {
            date: "2020-03-22",
            name: "2020年美国第2次军事演习报道",
          },
          {
            date: "2020-05-23",
            name: "2020年美国第3次军事演习报道",
          },
          {
            date: "2020-06-24",
            name: "2020年美国第4次军事演习报道",
          },
          {
            date: "2020-07-24",
            name: "2020年美国第5次军事演习报道",
          },
          {
            date: "2020-08-24",
            name: "2020年美国第6次军事演习报道",
          },
          {
            date: "2020-09-24",
            name: "2020年美国第7次军事演习报道",
          },
          {
            date: "2020-10-24",
            name: "2020年美国第8次军事演习报道",
          },
          {
            date: "2020-11-24",
            name: "2020年美国第9次军事演习报道",
          },
          {
            date: "2020-12-24",
            name: "2020年美国第10次军事演习报道",
          },
        ],
        page: {
          size: 10,
          count: 3,
          layout: "prev, pager, next, sizes",
          background: true,
          align: "left",
          total: 200,
        },
      },
      checkboxValue: [],
      options: [],
      options2: [
        {
          value: "选项1",
          label: "模型A参数接口",
        },
        {
          value: "选项2",
          label: "模型B参数接口",
        },
        {
          value: "选项3",
          label: "模型C参数接口",
        },
        {
          value: "选项4",
          label: "模型D参数接口",
        },
        {
          value: "选项5",
          label: "模型F参数接口",
        },
      ],
      options1: [
        {
          value: "选项11",
          label: "模型1参数接口",
        },
        {
          value: "选项22",
          label: "模型2参数接口",
        },
        {
          value: "选项33",
          label: "模型3参数接口",
        },
        {
          value: "选项44",
          label: "模型4参数接口",
        },
        {
          value: "选项55",
          label: "模型5参数接口",
        },
      ],
      checkvalue: "",
      docvalue: "",
      textValue: "",
      radio: "",
      articleValue: "",
      articleoptions: [
        {
          path:
            "static\\mock\\document\\b10d8c88-8a39-4771-b61c-a95a003335e3.txt",
          name: "文档1",
        },
        {
          path:
            "static\\mock\\document\\b10d8c88-8a39-4771-b61c-a95a003335e3.txt",
          name: "文档2",
        },
        {
          path:
            "static\\mock\\document\\b10d8c88-8a39-4771-b61c-a95a003335e3.txt",
          name: "文档3",
        },
        {
          path:
            "static\\mock\\document\\b10d8c88-8a39-4771-b61c-a95a003335e3.txt",
          name: "文档4",
        },
      ],
      // 默认步骤
      active: 1,
      content: "",
      dataInfo: {
        labelRoleConfig: {
          default: "姓名",
        },
        content:
          "被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县。曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元。后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人",
        relation: [],
        labels: [],
      },

    };
  },
  created () {
    this.getList();
    // console.log(treedata)
    // 步骤一下拉列表赋值
    this.value = treedata.oneSelect[0].value
    this.options = treedata.oneSelect
    // let _this = this
    // setInterval(function () {
    //   _this.sum += 1
    // }, 1000)
    // setInterval(() => {
    //   this.sum += 1
    // })
  },
  methods: {
    // 步骤2选择标签
    labelClock () {
      if (this.values === '选项1') {
        this.TreeDatalist = treedata.twoSelectData
      }
      if (this.values === '选项2') {
        this.TreeDatalist = treedata.twoSelectDatas
      }
    },
    // 步骤一选择文件
    radioClick (item) {
      // console.log(item)
      // this.current.title = item.name
      // console.log('您选择的文档是：', item.name)
    },
    // 步骤1选择文件列表切换
    switchTrain () {
      this.fileList = []
      this.trainDataRadio = null
      if (this.value === '选项1') {
        this.forData("海军", 100, 's9007')
      }
      if (this.value === '选项2') {
        this.forData("陆军", 200, 'n95')
      }
      if (this.value === '选项3') {
        this.forData("空军", 80, 'ak47')
      }
    },
    // 生成数据 名称 数量 编号
    forData (name, sum, num) {
      let data = []
      for (let i = 0; i < sum; i++) {
        data.push(
          {
            name: name + '训练数据' + num + i,
            checked: false
          },
        )
      }
      this.fileList = data
    },
    clickCard (item, data) {
      if (data === 'item') {
        this.$message({
          message: '给文章添加、算法模型对应的批注',
          type: 'success'
        });
      }
      console.log(item, data)
      this.idx = item;
      if (item === 0) {
        this.options = this.options1;
      } else {
        this.options = this.options2;
      }
    },
    updateToolCanvas () {
      this.$refs.labelToolItem.updateData(this.current.data);
    },
    exportEventData () {
      var eventItems = this.$refs.labelToolItem.produceEventItems();
      var tData = this.$refs.labelToolItem.transferEventData(eventItems);
      var fileName = this.current.title + ".json";
      this.downloadJSON(tData, fileName);
    },
    handleHighlightChange (d) {
      this.current.title = d.name;
      var prefix = "/static/mock/document/";
      var url = prefix + d.name;
      var _self = this;
      $.get(url, function (d) {
        _self.current.data.content = d.replace(/\r/g, "");
        _self.updateToolCanvas();
      });
    },
    handleSerchEvent () {
      this.$message("处理检索事件");
    },
    handleSelectText (e) {
      this.$refs.labelToolItem.handleSelectText(e);
      this.$refs.labelToolItem.updateLabelData();
    },
    changetext (url) {
      var _self = this;
      $.get(url, function (d) {
        if (d[0] === "<") {
          _self.content = "";
          return;
        }
        _self.content = d;
      });
      var obj = {
        content: _self.content,
      };
      this.$refs.labelToolItem.updateData(obj);
    },
    next () {
      if (this.active === 1 && this.trainDataRadio === null) {
        this.$message({
          message: '请选择文件',
        });
        return
      }
      if (this.active === 2 && this.checkboxValue.length === 0) {
        this.$message({
          message: "请选择算法模型",
        });
        return;
      }
      this.active += 1
      // this.loading = true
      // let _this = this
      // setTimeout(function () {
      //   _this.loading = false
      // }, 1500)
    },
    getBack () {
      this.active = this.active - 1;
    },
    confirm () { },
    changeClick (item) {
      console.log('选中了', item)
    },
    getList () {
      var _self = this;
      _self.adapter.getmodelData({}, function (d) {
        _self.docListTable.data = d.data;
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.el-breadcrumb {
  margin-bottom: 10px;
}

.el-steps {
  padding: 10px 80px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
  margin-bottom: 20px;
}

.el-textarea {
  width: 220px;
}
/deep/ .el-step.is-center .el-step__description {
  margin-top: 10px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0;
}
/deep/ .el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0px;
}
/deep/ .el-radio.is-bordered {
  margin-top: 20px;
}
.check_card {
  width: 120px;
  height: 40px;
  cursor: pointer;
  float: left;
  margin: 20px 0 0 20px;
}
.active_check_card {
  width: 120px;
  height: 40px;
  cursor: pointer;
  float: left;
  margin: 20px 0 0 20px;
  border: 1px solid #409eff;
}
/deep/ .el-card__body {
  padding: 0px;
  text-align: center;
  line-height: 40px;
}
/* 设置算法参数 */
.setParameter {
  width: 100%;
  height: 350px;
  padding: 10px;
  overflow-y: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.right_div {
  width: 40%;
  padding: 10px;
  height: 260px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.placefolderText {
  color: #ccc;
  padding: 25% 0 0 40%;
}
.choiceClass {
  margin-top: 10px;
  width: 100%;
  overflow-y: scroll;
  height: 550px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.bottom_data {
  height: 600px;
  overflow-y: scroll;
  width: 100%;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  margin-top: 10px;
}
.twoOverall {
  height: 650px;
  padding: 10px;
  /* overflow-y: scroll; */
  margin: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.left_div {
  width: 29%;
  height: 650px;
  float: left;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.documentArea {
  float: right;
  width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.labelBox {
  width: 100%;
  height: 400px;
  display: flex;
}
.labelBoxDiv {
  flex: 1;
  margin: 10px 10px 0 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 15px;
  overflow-y: scroll;
}
</style>