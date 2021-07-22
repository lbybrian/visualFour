 <template>
  <div style="padding: 20px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>可视化</el-breadcrumb-item>
      <el-breadcrumb-item>模型算法</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps
      :space="800"
      :active="active"
      finish-status="success"
      align-center
    >
      <el-step description="选择算法模型"></el-step>
      <el-step description="设置算法参数"></el-step>
      <el-step description="选择分析对象"></el-step>
      <el-button
        v-if="active !== 1"
        style="margin-top: 12px; height: 40px"
        @click="getBack()"
        >上一步</el-button
      >
      <el-button
        v-if="active !== 3"
        style="margin-top: 12px; height: 40px"
        type="primary"
        @click="next()"
        >下一步</el-button
      >
      <el-button
        v-if="active == 3"
        style="margin-top: 12px; height: 40px"
        type="success"
        @click="confirm()"
        >确定</el-button
      >
    </el-steps>
    <div style="border: 1px solid #dcdfe6; padding: 20px" v-if="active === 1">
      <h3 style="margin-bottom: 20px">Step 1:选择算法模型</h3>
      <el-checkbox-group v-model="checkboxValue" @change="changeClick">
        <el-checkbox
          v-for="(item, index) in checkboxGroup"
          :label="item"
          :key="index"
          border
        ></el-checkbox>
      </el-checkbox-group>
    </div>
    <el-row :gutter="20" v-if="active === 2">
      <h3 style="margin: 20px 0">Step 2: 设置算法参数</h3>
      <el-col :span="10">
        <el-card
          shadow="hover"
          v-for="(item, index) in checkboxValue"
          :key="index"
          :class="index == idx ? 'active_check_card' : 'check_card'"
          @click.native="clickCard(index)"
        >
          {{ item }}
        </el-card>
        <!-- <el-radio v-model="radioValue" :label="index" v-for="(item, index) in checkboxValue" :key="index" border>{{item}}</el-radio> -->
      </el-col>

      <el-col :span="14">
        <div style="margin-bottom: 80px">
          <label>选择参数接口:</label>
          <el-select v-model="checkvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <label>配置参数信息:</label>
          <el-input type="textarea" v-model="textValue" :rows="2"></el-input>
        </div>
      </el-col>
    </el-row>
    <div v-if="active === 3">
      <div>
        <h3 style="margin: 20px 0">Step 3: 选择分析对象</h3>
        <el-select v-model="docvalue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div style="display:inline-flex;margin:0 10px">
          <el-card
            shadow="hover"
            v-for="(item, index) in checkboxValue"
            :key="index"
            :class="index == idx ? 'active_check_card' : 'check_card'"
            @click.native="clickCard(index)"
            style="margin: 0px"
          >
            {{ item }}
          </el-card>
        </div>
      </div>

      <el-row style="margin-top: 0px; height: 100%" :gutter="5">
        <el-col :span="7" style="height: 100%; overflow: auto">
          <div style="padding: 0px 20px" class="documentList">
            <h3 style="padding: 15px 0px">文档列表</h3>
            <div
              class="dataFilterArea"
              style="padding-top: 0px; padding-bottom: 20px"
            >
              <el-date-picker
                size="small"
                style="width: 250px"
                v-model="dataFilter.value"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="dataFilter.pickerOptions"
              >
              </el-date-picker>
              <span style="display: inline-block; float: right; width: 200px">
                <el-input
                  size="small"
                  placeholder="请输关键词检索"
                  v-model="dataFilter.keyword"
                  class="keywordInput"
                >
                  <el-button
                    size="small"
                    type="primary"
                    slot="append"
                    @click="handleSerchEvent"
                    icon="el-icon-search"
                  >
                  </el-button>
                </el-input>
              </span>
            </div>
            <div style="height: 1000px; overflow: auto; width: 100%">
              <DataTable
                ref="docListItem"
                :dataObj="docListTable"
                @highlightChange="handleHighlightChange"
              ></DataTable>
            </div>
          </div>
        </el-col>
        <el-col :span="17" style="height: 100%">
          <div class="documentArea">
            <h3 style="padding: 15px 20px 0px 20px">
              <span style="font-weight: 900">{{ current.title }}</span>
              <span style="float: right">
                <el-button size="mini" round>导出实体数据</el-button>
                <el-button size="mini" @click="exportEventData" round
                  >导出事件数据</el-button
                >
                <el-button size="mini" round>导出所有数据</el-button>
                <el-button type="danger" size="mini" round
                  >清空实体标签</el-button
                >
                <el-button type="danger" size="mini" round
                  >清空事件标签</el-button
                >
              </span>
            </h3>
            <div style="height: 1100px; width: 100%">
              <EntityLabelTool
                :dataObj="current.data"
                ref="labelToolItem"
              ></EntityLabelTool>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import DataTable from "@/common/textTable";
import EntityLabelTool from "@/common/entityLabelTool";
export default {
  components: {
    DataTable,
    EntityLabelTool,
  },
  mounted() {},
  data() {
    return {
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
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
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
  created() {
    this.getList();
  },
  methods: {
    clickCard(item) {
      this.idx = item;
      if (item === 0) {
        this.options = this.options1;
      } else {
        this.options = this.options2;
      }
    },
    updateToolCanvas() {
      this.$refs.labelToolItem.updateData(this.current.data);
    },
    exportEventData() {
      var eventItems = this.$refs.labelToolItem.produceEventItems();
      var tData = this.$refs.labelToolItem.transferEventData(eventItems);
      var fileName = this.current.title + ".json";
      this.downloadJSON(tData, fileName);
    },
    handleHighlightChange(d) {
      this.current.title = d.name;
      var prefix = "/static/mock/document/";
      var url = prefix + d.name;
      var _self = this;
      $.get(url, function (d) {
        _self.current.data.content = d.replace(/\r/g, "");
        _self.updateToolCanvas();
      });
    },
    handleSerchEvent() {
      this.$message("处理检索事件");
    },
    handleSelectText(e) {
      this.$refs.labelToolItem.handleSelectText(e);
      this.$refs.labelToolItem.updateLabelData();
    },
    changetext(url) {
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
    next() {
      this.active = this.active++;
      if (this.active++ > 2) this.active = 1;
      if (this.checkboxValue.length === 0) {
        this.$message({
          message: "忘了选择算法模型哦",
          type: "warning",
        });
        this.active = 1;
        return;
      }
      if (this.checkvalue === "" && this.active === 3) {
        this.$message({
          message: "设置算法参数",
          type: "warning",
        });
        this.active = 2;
        return;
      }
    },
    getBack() {
      this.active = this.active - 1;
    },
    confirm() {},
    changeClick(item) {},
    getList() {
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
</style>