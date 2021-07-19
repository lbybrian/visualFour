<template>
  <div style="" class="example">
    <div class="headerCont">
      <div class="topCon">
        <ul class="nav">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ active: navCurrent == item.type }"
            @click="
              addClass(item, $event),
                changeCurmb(item, '1'),
                navChangeStatus(item)
            "
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="weather">
          <img src="../assets/image/duoyun.png" />
          <span style="margin-left: 6px">多云</span>
          <span style="margin-left: 6px">20℃</span>
          <span style="margin-left: 12px">2021-04-18 13:00:00</span>
        </div>
      </div>
      <div class="crumbs">
        <img src="../assets/image/dingwei.png" />
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <slot v-for="(d, n) in breadListIm">
            <el-breadcrumb-item v-if="!!d.path" :to="{ path: d.path }">
              <span class="b_span" @click="tobreadCrumb(d, n)">{{
                d.name || d
              }}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else
              ><span class="b_span" @click="tobreadCrumb(d, n)">{{
                d.name || d
              }}</span>
            </el-breadcrumb-item>
          </slot>
        </el-breadcrumb>
        <div    
        style="color: #ccc; margin-left: 120px; cursor: pointer"  @click="goydyl('d')">东南亚一带一路</div>
        <div
          v-if="['11', '12', '13', '15'].indexOf(state) !== -1"
          style="color: #ccc; margin-left: 20px; cursor: pointer"
          @click="goydyl('all')"
        >
          全球一带一路
        </div>
        <a
          v-if="state === '15'"
          click="return false;"
          href="/static/mock/report.docx"
          download="report.docx"
          style="position: absolute; right: -410px; color: #fff"
          >生成数据报告</a
        >
      </div>
    </div>
    <!-- 点击全球一带一路 -->
    <div
      v-if="state === '15'"
      style="color: #ccc; margin-left: 20px;position: absolute;
    right: 0px;
    z-index: 99;"
      @click="goydyl('d')"
    >
      <img
        style="width: auto; height: 560px; margin-top: 20px;"
        src="/static/images/map1.png"
      />
    </div>
    <!-- 太阳图 跳到图六 -->
    <HotEvents v-if="state == '6'" ></HotEvents>
    <!-- 热点事件 跳军事力量 -->
    <SideTabForce v-if="state == '9'" />
    <RDSJ
      @clickImage="dealImageClick"
      v-if="['7_1', '7_2'].indexOf(state) !== -1"
    />
    <RWHX v-if="['8_1', '8_2'].indexOf(state) !== -1" />
    <!-- 各种一带一路-->
    <SideTabSituation
      ref="t11"
      :title="myTitle"
      v-if="['11'].indexOf(state) !== -1"
    />
    <SideTabSituation
      ref="t12"
      :title="myTitle"
      v-if="['12'].indexOf(state) !== -1"
    />
    <SideTabSituation
      ref="t13"
      :title="myTitle"
      v-if="['13'].indexOf(state) !== -1"
    />
    <slot v-for="(item, index) in config">
      <div
        v-if="item.ref === 'item1'"
        :state="item.ref"
        :index="index"
        @click="dealClick({ ref: 'item1' })"
        :key="index"
        :class="'chartItem ' + item.ref"
      >
        <div style="width: 100%; height: 100%; overflow: hidden">
          <img
            :src="backgroundImage"
            v-if="['8_1', '8_2', 'zz', 'jj'].indexOf(state) === -1"
          />
        </div>
      </div>
      <div
        v-if="item.ref !== 'item1' && item.isDisplay && dataObj[item.ref]"
        :state="item.ref"
        :index="index"
        :key="index"
        :class="'chartItem ' + item.ref"
      >
        <DynamicItem
          :comName="dataObj[item.ref].comName"
          :title="dataObj[item.ref].title"
          @click="dealClick"
          :dataObj="dataObj[item.ref].dataObj"
          :ref="item.ref"
        ></DynamicItem>
      </div>
    </slot>
    <div v-if="bottomControl.indexOf(state) !== -1" class="bottombar">
      <div
        class="bottomBox"
        :style="
          bottomShow != 1
            ? { backgroundImage: 'url(' + background_5 + ')' }
            : { backgroundImage: 'url(' + background_3 + ')' }
        "
      >
        <ul
          class="bottomUl"
          :style="
            bottomShow != 1
              ? { marginLeft: '18%', width: '64%' }
              : { marginLeft: '31%', width: '45%' }
          "
        >
          <li
            class="buttomItem"
            v-for="(item, index) in buttonList"
            :key="index"
            @click="selectBar(item), changeCurmb(item, '2')"
            :style="bottomShow != 2 ? { width: '28%' } : { width: '33%' }"
          >
            <div
              class="buttonDiv"
              :style="
                !item.status
                  ? { backgroundImage: 'url(' + item.backgroundUrlPre + ')' }
                  : { backgroundImage: 'url(' + item.backgroundUrl + ')' }
              "
            >
              <p>
                <img
                  :src="!item.status ? item.iconSrcPre : item.iconSrc"
                  alt="..."
                />
                <span
                  :style="
                    !item.status ? { color: '#00F6FF' } : { color: '#fff' }
                  "
                  >{{ item.name }}</span
                >
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicItem from "@/common/dynamicItem";
import SideTabForce from "@/common/sideTab_force";
import RDSJ from "@/common/RDSJ";
import RWHX from "@/common/RWHX";
import SideTabSituation from "@/common/sideTabSituation";
import HotEvents from "@/common/hotEvents"
var colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
export default {
  components: {
    DynamicItem,
    SideTabForce,
    SideTabSituation,
    RDSJ,
    RWHX,
    HotEvents
  },
  created() {
    this.updateChartsItem();
    this.updateConfig();
  },
  mounted() {
    // this.updateAppData();
    this.$nextTick(() => {
      this.updateComponentItems();
    });
    //底部控制显示
    if (this.bottomShow == 1) {
      this.buttonList = this.buttonList_3;
    } else if (this.bottomShow == 2) {
      this.buttonList = this.buttonList_5;
    }
  },
  computed: {
    backgroundImage() {
      return this.util.itemImgData(this.state);
    },
  },
  data() {
    return {
      bottomControl: [
        "1",
        "2_1",
        "2_2",
        "2_3",
        "4",
        "5",
        "7_1",
        "7_2",
        "6",
        "9",
        "8_1",
        "8_2",
        "10",
        "11",
        "zz",
        "jj",
        "13",
        "12",
        "10_1",
        "10_2"
      ],
      navCurrent: "",
      bottomShow: "1",
      sunCharts: false,
      myTitle: "缅甸一带一路",
      dataObj: {
        item1: {
          // 地图
          ref: "item1",
          comName: "",
          title: " ",
          dataObj: {},
        },
        item2_1: {
          // 侧边栏
          ref: "item2_1",
          comName: "sidebar",
          title: "",
          dataObj: {
            title: "五大热点区域",
            itemArray_3: [
              {
                id: "1",
                country: "东南亚",
              },
              {
                id: "2",
                country: "中东",
              },
              {
                id: "3",
                country: "南亚",
              },
              {
                id: "4",
                country: "欧洲",
              },
              {
                id: "5",
                country: "美洲",
              },
            ],
          },
        },
        item2_2: {
          ref: "item2_2",
          comName: "sidebar",
          title: "",
          dataObj: {
            title: "十大热点国家",
            itemArray_3: [
              {
                id: "1",
                country: "缅甸",
              },
              {
                id: "2",
                country: "美国",
              },
              {
                id: "3",
                country: "印度",
              },
              {
                id: "4",
                country: "埃塞俄比亚",
              },
              {
                id: "5",
                country: "伊朗",
              },
              {
                id: "6",
                country: "巴基斯坦",
              },
              {
                id: "7",
                country: "埃及",
              },
              {
                id: "8",
                country: "土耳其",
              },
              {
                id: "9",
                country: "巴西",
              },
              {
                id: "10",
                country: "俄罗斯",
              },
            ],
          },
        },
        item2_3: {
          ref: "item2_3",
          comName: "sidebar",
          title: "",
          dataObj: {
            title: "十大热点事件",
            itemArray_3: [
              {
                id: "1",
                country: "缅甸军方政变",
                openStatus: true,
                flag: false,
                data: [
                  {
                    title: " 2020年11月8日缅甸大选，民盟胜出继续执政。",
                  },
                  {
                    title:
                      " 2020年12月10日，缅甸选举委员会在拒绝了缅军要求「复核投票」的请求，斥责其为「非法。",
                  },
                  {
                    title:
                      " 2020年12月23日缅甸军方自行发布了“大选舞弊”的调查报告。",
                  },
                  {
                    title:
                      " 2020年1月14日，缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。",
                  },
                  {
                    title: " 2021年1月26日，缅甸军方举办发布会质疑选举舞弊。",
                  },
                ],
              },
              {
                id: "2",
                country: "日本决定核废水排放入海",
                openStatus: true,
                flag: false,
                data: [
                   {
                    title:
                      " 2020年1月14日，缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。",
                  },
                  {
                    title: " 2021年1月26日，缅甸军方举办发布会质疑选举舞弊。",
                  }
                ],
              },
              {
                id: "3",
                country: "国外新冠疫苗安全性争议",
                openStatus: true,
              },
              {
                id: "4",
                country: "美航母群入南海",
                openStatus: true,
              },
              {
                id: "5",
                country: "乌克兰东部大规模交火",
                openStatus: true,
              },
              {
                id: "6",
                country: "新疆棉花事件",
                openStatus: true,
              },
              {
                id: "7",
                country: "日本决定核废水排放入海",
                openStatus: true,
              },
              {
                id: "8",
                country: "美国欲重返伊核协议",
                openStatus: true,
              },
              {
                id: "9",
                country: "国外疫情恶化",
                openStatus: true,
              },
              {
                id: "10",
                country: "英国“脱欧”后续影响",
                openStatus: true,
              },
            ],
          },
        },
        item3: {
          ref: "item3",
          comName: "sidebar",
          title: "",
          dataObj: {
            title: "东南亚国家列表",
            itemArray_3: [
              {
                id: "1",
                country: "缅甸",
              },
              {
                id: "2",
                country: "美国",
              },
              {
                id: "3",
                country: "印度",
              },
              {
                id: "4",
                country: "埃塞俄比亚",
              },
              {
                id: "5",
                country: "伊朗",
              },
              {
                id: "6",
                country: "巴基斯坦",
              },
              {
                id: "7",
                country: "埃及",
              },
              {
                id: "8",
                country: "土耳其",
              },
              {
                id: "9",
                country: "巴西",
              },
              {
                id: "10",
                country: "俄罗斯",
              },
            ],
          },
        },
        item4: {
          ref: "item4",
          comName: "",
          title: " ",
          dataObj: {},
        },
        item5: {
          ref: "item5",
          comName: "sunburst",
          title: " ",
          dataObj: {
            itemStyle: {
              type: "sunburst",
              center: ["50%", "48%"],
              label: {
                rotate: "radial",
                color: "#2E2733",
              },
              itemStyle: {
                // borderColor: bgColor,
                borderWidth: 2,
              },
              levels: [
                {},
                {
                  r0: 0,
                  r: 40,
                  label: {
                    rotate: 0,
                  },
                },
                {
                  r0: 40,
                  r: 105,
                },
                {
                  r0: 115,
                  r: 140,
                  itemStyle: {
                    shadowBlur: 2,
                    shadowColor: colors[2],
                    color: "transparent",
                  },
                  label: {
                    rotate: "tangential",
                    fontSize: 10,
                    color: colors[0],
                  },
                },
                {
                  r0: 140,
                  r: 145,
                  itemStyle: {
                    shadowBlur: 80,
                    shadowColor: colors[0],
                  },
                  label: {
                    position: "outside",
                    textShadowBlur: 5,
                    textShadowColor: "#333",
                  },
                  downplay: {
                    label: {
                      opacity: 0.5,
                    },
                  },
                },
              ],
            },
            data: [
              {
                name: "国家风险",
                itemStyle: {
                  color: colors[1],
                },
                children: [],
              },
              {
                name: "国家风险",
                itemStyle: {
                  color: colors[2],
                },
                children: [
                  {
                    name: "政治风险",
                    children: [
                      {
                        name: "4.8",
                        children: [
                          {
                            name: "政治干预",
                          },
                        ],
                      },
                      {
                        name: "4.8",
                        children: [
                          {
                            name: "社会稳定性",
                          },
                          {
                            name: "国家治理",
                          },
                        ],
                      },
                      {
                        name: "4.8",
                        children: [
                          {
                            name: "国际环境",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "经济风险",
                    children: [
                      {
                        name: "4",
                        children: [
                          {
                            name: "宏观经济",
                          },
                        ],
                      },
                      {
                        name: "4",
                        children: [
                          {
                            name: "货币金融",
                          },
                          {
                            name: "财政收支",
                          },
                          {
                            name: "公共债务",
                          },
                        ],
                      },
                      {
                        name: "4",
                        children: [
                          {
                            name: "国际收支",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "营商环境风险",
                    children: [
                      {
                        name: "4.3",
                        children: [
                          {
                            name: "营商成本",
                          },
                        ],
                      },
                      {
                        name: "4.3",
                        children: [
                          {
                            name: "双边贸易",
                          },
                          {
                            name: "基础设施发展",
                          },
                        ],
                      },
                      {
                        name: "4.3",
                      },
                      {
                        name: "4.3",
                        children: [
                          {
                            name: "吸引外资情况",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "法律风险",
                    children: [
                      {
                        name: "3",
                        children: [
                          {
                            name: "法律保护",
                          },
                          {
                            name: "国际协定",
                          },
                          {
                            name: "争端与仲裁",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        item6: {
          ref: "item6",
          comName: "",
          title: "",
          dataObj: {},
        },
        item7_1: {
          ref: "item7_1",
          comName: "",
          title: " ",
          dataObj: {},
        },
        // item7_2: {
        //   ref: "item7_2",
        //   comName: "",
        //   title: " ",
        //   dataObj: {

        //   },
        // },
        // item8_1: {
        //   ref: "item8_1",
        //   comName: "",
        //   title: " ",
        //   dataObj: {

        //   },
        // },
        // item8_2: {
        //   ref: "item8_2",
        //   comName: "",
        //   title: " ",
        //   dataObj: {

        //   },
        // },
        item9: {
          ref: "item9",
          comName: "",
          title: "",
          dataObj: {},
        },
        item10_1: {
          ref: "item10_1",
          comName: "barChart",
          title: "缅甸社会环境",
          dataObj: {
            name: "失业率",
            title: "缅甸社会环境",
            color: [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2",
            ],
            xAxisStyle: {
              name: "年",
            },
            yAxisStyle: {
              name: "%",
            },
            data: [
              {
                name: "2012",
                value: 4,
              },
              {
                name: "2013",
                value: 4,
              },
              {
                name: "2014",
                value: 4,
              },
              {
                name: "2015",
                value: 0.8,
              },
              {
                name: "2016",
                value: 3.8,
              },
              {
                name: "2017",
                value: 3.8,
              },
              {
                name: "2018",
                value: 4,
              },
              {
                name: "2019",
                value: 3.8,
              },
              {
                name: "2020",
                value: 8.2,
              },
            ],
            mode: "vertical",
          },
        },
        item10_2: {
          ref: "item10_2",
          comName: "barChart",
          title: "缅甸双边援助主要来源国/机构",
          dataObj: {
            name: "",
            color: [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2",
            ],
            xAxisStyle: {
              name: "亿美元",
            },
            data: [
              {
                name: "日本",
                value: 4.6,
              },
              {
                name: "国际开发协会",
                value: 2.2,
              },
              {
                name: "英国",
                value: 1.47,
              },
              {
                name: "美国",
                value: 1.42,
              },
              {
                name: "欧盟机构",
                value: 0.8,
              },
              {
                name: "国际基金",
                value: 0.76,
              },
              {
                name: "澳大利亚",
                value: 0.6,
              },
              {
                name: "韩国",
                value: 0.58,
              },
              {
                name: "德国",
                value: 0.56,
              },
              {
                name: "瑞士",
                value: 0.49,
              },
            ],
            mode: "horizontal",
          },
        },
        item10_3: {
          ref: "item10_3",
          comName: "lineChart",
          title: "缅甸法治得分",
          dataObj: {
            title: "",
            name: ["法治得分(左轴)", "分位点(右轴)"],
            legendStyle: {
              textStyle: {
                color: "#ffffff",
              },
            },
            color: [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2",
            ],
            tooltip: {
              trigger: "axis",
            },
            yAxisStyle: {
              type: "value",
              name: "法治得分",
              min: -3,
              max: 12,
              interval: 3,
            },
            data: [
              {
                name: "2009",
                value: [-1.54, 3],
              },
              {
                name: "2010",
                value: [-1.6, 2.5],
              },
              {
                name: "2011",
                value: [-1.4, 4.7],
              },

              {
                name: "2012",
                value: [-1.36, 6.6],
              },
              {
                name: "2013",
                value: [-1.27, 10],
              },
              {
                name: "2014",
                value: [-1.2, 7.7],
              },
              {
                name: "2015",
                value: [-1.3, 7.5],
              },
              {
                name: "2016",
                value: [-0.8, 17.5],
              },
              {
                name: "2017",
                value: [-0.9, 16.5],
              },
              {
                name: "2018",
                value: [-1.1, 15.5],
              },
            ],
            mode: "vertical",
          },
        },
        item10_4: {
          ref: "item10_4",
          comName: "barChart",
          title: "缅甸出口商品结构",
          dataObj: {
            name: ["天然气", "服饰", "豆类", "大米"],
            legendStyle: {
              textStyle: {
                color: "#ffffff",
              },
            },
            color: [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2",
            ],
            data: [
              {
                name: "2012",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [42, 50.6, 61, 65],
              },
              {
                name: "2013",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [38, 42, 51.3, 56],
              },
              {
                name: "2014",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [39, 48, 56, 61],
              },
              {
                name: "2015",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [41, 49, 60, 65],
              },
              {
                name: "2016",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [26, 39, 51, 54],
              },
              {
                name: "2017",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [22, 41, 48, 57],
              },
              {
                name: "2018",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [21, 39, 45, 52],
              },
              {
                name: "2019",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [21, 38.5, 45, 52],
              },
              {
                name: "2020",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [20, 38.5, 45, 54],
              },
              {
                name: "2021",
                type: "bar",
                stack: "总量",
                label: {
                  show: true,
                  position: "insideRight",
                },
                value: [21, 40, 46, 55],
              },
            ],
            mode: "vertical",
          },
        },
        item10_5: {
          ref: "item10_5",
          comName: "barChart",
          title: "缅甸进口商品结构",
          dataObj: {
                "name": [
                    "天然气",
                    "服饰",
                    "豆类",
                    "大米"
                ],
                "legendStyle": {
                    "textStyle": {
                        "color": "#ffffff"
                    }

                },
                "color": [
                    "#1890ff",
                    "#2fc25b",
                    "#facc14",
                    "#223273",
                    "#8543e0",
                    "#13c2c2"
                ],
                "data": [{
                        "name": "2012",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            44,
                            51,
                            61,
                            65
                        ]
                    },
                    {
                        "name": "2013",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            38,
                            44,
                            52,
                            55
                        ]
                    },
                    {
                        "name": "2014",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            39,
                            47,
                            55,
                            61
                        ]
                    },
                    {
                        "name": "2015",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            41,
                            49,
                            60,
                            65
                        ]
                    },
                    {
                        "name": "2016",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            26,
                            39,
                            51,
                            54
                        ]
                    },
                    {
                        "name": "2017",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            22,
                            41,
                            48,
                            56
                        ]
                    },
                    {
                        "name": "2018",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            22,
                            39,
                            45,
                            53
                        ]
                    },
                    {
                        "name": "2019",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            22,
                            39,
                            45,
                            53
                        ]
                    },
                    {
                        "name": "2020",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            19,
                            38,
                            45,
                            54
                        ]
                    },
                    {
                        "name": "2021",
                        "type": "bar",
                        "stack": "总量",
                        "label": {
                            "show": true,
                            "position": "insideRight"
                        },
                        "value": [
                            22,
                            39,
                            45,
                            54
                        ]
                    }
                ],
                "mode": "vertical"
            }
        },
        item10_6: {
          ref: "item10_6",
          comName: "lineChart",
          title: "缅甸汇率水平",
          dataObj: {
            title: "",
            name: [
              "汇率(平均，左轴)",
              "汇率(年末，左轴)",
              "实际y有效汇率(CPI调整，右边轴)",
            ],
            legendStyle: {
              textStyle: {
                color: "#ffffff",
              },
            },
            color: [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2",
            ],
            tooltip: {
              trigger: "axis",
            },
            yAxisStyle: [
              {
                type: "value",
                name: "cpi",
                min: 170.0,
                max: 230.0,
                interval: 2,
              },
              {
                type: "value",
                name: "平均率",
                min: 0.0,
                max: 2000.0,
                interval: 1000,
              },
            ],
            data: [
              {
                name: "2012",
                value: [700, 850, 228],
              },
              {
                name: "2013",
                value: [900, 1000, 214],
              },
              {
                name: "2014",
                value: [1000, 1080, 219],
              },
              {
                name: "2015",
                value: [1200, 1300, 209],
              },
              {
                name: "2016",
                value: [1250, 1350, 212],
              },
              {
                name: "2017",
                value: [1350, 1350, 195],
              },
              {
                name: "2018",
                value: [1550, 1400, 195],
              },
              {
                name: "2019",
                value: [1450, 1550, 196],
              },
              {
                name: "2020",
                value: [1400, 1350, 223],
              },
              {
                name: "2021",
                value: [1600, 1550, 220],
              },
            ],
            mode: "vertical",
          },
        },
        item10_7:{
           "ref": "item10_7",
            "comName": "lineChart",
            "title": "缅甸汇率水平",
            "dataObj": {
                "title": "",
                "name": [
                    "汇率(平均，左轴)",
                    "汇率(年末，左轴)",
                    "实际y有效汇率(CPI调整，右边轴)"
                ],
                "legendStyle": {
                    "textStyle": {
                        "color": "#ffffff"
                    }

                },
                "color": [
                    "#1890ff",
                    "#2fc25b",
                    "#facc14",
                    "#223273",
                    "#8543e0",
                    "#13c2c2"
                ],
                "tooltip": {
                    "trigger": "axis"
                },
                "yAxisStyle": [{
                        "type": "value",
                        "name": "cpi",
                        "min": 170.0,
                        "max": 230.0,
                        "interval": 2
                    },
                    {
                        "type": "value",
                        "name": "平均率",
                        "min": 0.0,
                        "max": 2000.0,
                        "interval": 1000
                    }
                ],
                "data": [{
                        "name": "2012",
                        "value": [
                            700,
                            850,
                            228

                        ]
                    },
                    {
                        "name": "2013",
                        "value": [
                            900,
                            1000,
                            214
                        ]
                    },
                    {
                        "name": "2014",
                        "value": [
                            1000,
                            1080,
                            219
                        ]
                    },
                    {
                        "name": "2015",
                        "value": [
                            1200,
                            1300,
                            209
                        ]
                    },
                    {
                        "name": "2016",
                        "value": [
                            1250,
                            1350,
                            212
                        ]
                    },
                    {
                        "name": "2017",
                        "value": [
                            1350,
                            1350,
                            195
                        ]
                    },
                    {
                        "name": "2018",
                        "value": [
                            1550,
                            1400,
                            195
                        ]
                    },
                    {
                        "name": "2019",
                        "value": [
                            1450,
                            1550,
                            196
                        ]
                    },
                    {
                        "name": "2020",
                        "value": [
                            1400,
                            1350,
                            223
                        ]
                    },
                    {
                        "name": "2021",
                        "value": [
                            1600,
                            1550,
                            220
                        ]
                    }
                ],
                "mode": "vertical"
            }
        },
        item10_8:{
           "ref": "item10_8",
            "comName": "lineChart",
            "title": "缅甸FDI",
            "dataObj": {
                "title": "",
                "name": "FDI流量",
                "color": [
                    "#1890ff",
                    "#2fc25b",
                    "#facc14",
                    "#223273",
                    "#8543e0",
                    "#13c2c2"
                ],
                "data": [{
                        "name": "2012",
                        "value": 12
                    },
                    {
                        "name": "2013",
                        "value": 22
                    },
                    {
                        "name": "2014",
                        "value": 21
                    },
                    {
                        "name": "2015",
                        "value": 41
                    },
                    {
                        "name": "2016",
                        "value": 32
                    },
                    {
                        "name": "2017",
                        "value": 40
                    },
                    {
                        "name": "2018",
                        "value": 12
                    },
                    {
                        "name": "2019",
                        "value": 30
                    },
                    {
                        "name": "2020",
                        "value": 18
                    },
                    {
                        "name": "2021",
                        "value": 50
                    }

                ],
                "mode": "vertical"
            }
        },
        item10_9:{
           "ref": "item10_9",
            "type": "jj",
            "comName": "mixChart",
            "title": "缅甸宏观经济表现",
            "dataObj": {
                "title": "",
                "typeMap": [
                    "line",
                    "bar"
                ],
                "legendStyle": {
                    "textStyle": {
                        "color": "#ffffff"
                    }

                },
                "styleMap": [{
                        "color": "#1890ff"
                    },
                    {
                        "color": "#2fc25b"
                    }
                ],
                "name": [
                    "实际GDP(左轴)",
                    "实际GDO增速(右轴)"
                ],
                "color": [
                    "#1890ff",
                    "#2fc25b",
                    "#facc14",
                    "#223273",
                    "#8543e0",
                    "#13c2c2"
                ],
                "data": [{
                    "name": "2012",
                    "value": [
                        470,
                        7.4
                    ]
                }, {
                    "name": "2013",
                    "value": [
                        510,
                        8.4
                    ]
                }, {
                    "name": "2014",
                    "value": [
                        550,
                        8.0
                    ]
                }, {
                    "name": "2015",
                    "value": [
                        590,
                        7.0
                    ]
                }, {
                    "name": "2016",
                    "value": [
                        610,
                        6.9
                    ]
                }, {
                    "name": "2017",
                    "value": [
                        650,
                        6.8
                    ]
                }, {
                    "name": "2018",
                    "value": [
                        700,
                        6.2
                    ]
                }, {
                    "name": "2019",
                    "value": [
                        750,
                        6.6
                    ]
                }, {
                    "name": "2020",
                    "value": [
                        760,
                        2.1
                    ]
                }, {
                    "name": "2021",
                    "value": [
                        810,
                        7.5
                    ]
                }],
                "mode": "vertical"
            }
        },
        item11: {
          ref: "item11",
          comName: "",
          title: " ",
          dataObj: {},
        },
        item12: {
          ref: "item12",
          comName: "",
          title: " ",
          dataObj: {},
        },
        item13: {
          ref: "item13",
          comName: "",
          title: " ",
          dataObj: {},
        },
      },
      state: "1",
      config: [
        {
          ref: "item1",
          state: [
            "1",
            "2_1",
            "2_2",
            "2_3",
            "3",
            "4",
            "5",
            "7_1",
            "7_2",
            "8_1",
            "8_2",
            "9",
            "10",
            "11",
            "12",
            "13",
            "10_1",
            "10_2"
          ],
        },
        {
          ref: "item2_1",
          state: "2_1",
        },
        {
          ref: "item2_2",
          state: "2_2",
        },
        {
          ref: "item2_3",
          state: "2_3",
        },
        {
          ref: "item3",
          state: "3",
        },
        {
          ref: "item4",
          state: "4x",
        },
        {
          ref: "item5",
          state: "5",
        },
        {
          ref: "item7_1",
          state: ["7_1", "7_2"],
        },
        {
          ref: "item7_2",
          state: ["7_1", "7_2"],
        },
        {
          ref: "item8_1",
          state: ["8_1", "8_2"],
        },
        {
          ref: "item8_2",
          state: ["8_1", "8_2"],
        },
        {
          ref: "item9",
          state: "9",
        },
        {
          ref: "item10_1",
          state: ['zz','10_1','10'],
        },
        {
          ref: "item10_2",
          state: ['zz','10_1','10'],
        },
        {
          ref: "item10_3",
          state: ['zz','10_1','10'],
        },
        {
          ref: "item10_4",
          state: ['jj','10_2','10'],
        },
        {
          ref: "item10_5",
          state: ['jj',"10_2",'10'],
        },
        {
          ref: "item10_6",
          state: ['jj',"10_2",'10'],
        },
         {
          ref: "item10_7",
          state: ['jj',"10_2"],
        },
         {
          ref: "item10_8",
          state: ['jj',"10_2"],
        },
         {
          ref: "item10_9",
          state: ['jj',"10_2"],
        },
        {
          ref: "item11",
          state: "11",
        },
        {
          ref: "item12",
          state: "12",
        },
        {
          ref: "item13",
          state: "13",
        },
      ],
      navList: [
        {
          name: "政治",
          type: "zz",
        },
        {
          name: "军事",
          type: "js",
        },
        {
          name: "安全",
          type: "aq",
        },
        {
          name: "外交",
          type: "wj",
        },
        {
          name: "经济",
          type: "jj",
        },
        {
          name: "科技",
          type: "kj",
        },
      ],
      breadListIm: [
        {
          name: "全球政治",
          type: "zz",
        },
      ],
      //底部数据啊
      buttonList: [],
      buttonList_5: [
        {
          name: "国家风险评估",
          id: 1,
          iconSrcPre: require("../assets/image/icon-国家风险评估-未选中.png"),
          iconSrc: require("../assets/image/icon-国家风险评估-选中.png"),
          backgroundUrlPre: require("../assets/image/button左-未选中.png"),
          backgroundUrl: require("../assets/image/button左-选中.png"),
          status: false,
          type: "fxpg",
        },
        {
          name: "国家力量数据",
          id: 2,
          iconSrcPre: require("../assets/image/icon-国家力量-未选中.png"),
          iconSrc: require("../assets/image/icon-国家力量-选中.png"),
          backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
          backgroundUrl: require("../assets/image/button中间-选中.png"),
          status: false,
          type: "llsj",
        },
        {
          name: "热点事件追踪",
          id: 3,
          iconSrcPre: require("../assets/image/icon-热点事件-未选中.png"),
          iconSrc: require("../assets/image/icon-热点事件-选中.png"),
          backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
          backgroundUrl: require("../assets/image/button中间-选中.png"),
          status: false,
          type: "sjzz",
        },
        {
          name: "重要人物画像",
          id: 4,
          iconSrcPre: require("../assets/image/icon-重要人物-未选中.png"),
          iconSrc: require("../assets/image/icon-重要人物-选中.png"),
          backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
          backgroundUrl: require("../assets/image/button中间-选中.png"),
          status: false,
          type: "rwhx",
        },
        {
          name: "一带一路态势",
          id: 5,
          iconSrcPre: require("../assets/image/icon-一带一路-未选中.png"),
          iconSrc: require("../assets/image/icon-一带一路-选中.png"),
          backgroundUrlPre: require("../assets/image/button右-未选中.png"),
          backgroundUrl: require("../assets/image/button右-选中.png"),
          status: false,
          type: "ydyl",
        },
      ],
      buttonList_3: [
        {
          name: "五大热点区域",
          id: 6,
          iconSrcPre: require("../assets/image/icon-五大热点区域-未选中.png"),
          iconSrc: require("../assets/image/icon-五大热点区域-选中.png"),
          backgroundUrlPre: require("../assets/image/button左-未选中.png"),
          backgroundUrl: require("../assets/image/button左-选中.png"),
          status: false,
          type: "hotqy",
        },
        {
          name: "十大热点国家",
          id: 7,
          iconSrcPre: require("../assets/image/icon-十大热点国家-未选中.png"),
          iconSrc: require("../assets/image/icon-十大热点国家-选中.png"),
          backgroundUrlPre: require("../assets/image/button中间-未选中.png"),
          backgroundUrl: require("../assets/image/button中间-选中.png"),
          status: false,
          type: "hotgj",
        },
        {
          name: "十大热点事件",
          id: 8,
          iconSrcPre: require("../assets/image/icon-十大热点事件-未选中.png"),
          iconSrc: require("../assets/image/icon-十大热点事件-选中.png"),
          backgroundUrlPre: require("../assets/image/button右-未选中.png"),
          backgroundUrl: require("../assets/image/button右-选中.png"),
          status: false,
          type: "hotsj",
        },
      ],
      status: 4,
      background_3: require("../assets/image/btbg.png"),
      background_5: require("../assets/image/bg线条.png"),
      dataInfoOne: {
        title: "缅甸一带一路",
        titleEcharts: "舆情综合指数：4(满分10分)",
        tableData: [
          {
            militaryRegion: "",
            resident: "",
          },
        ],
        ChineseFundedProjects: [
          {
            id: 1,
            militaryRegion: "中缅油气管道项目",
            resident: "中国石油天然气集团有限公司(简称“中国石油”)",
          },
          {
            id: 2,
            militaryRegion: "缅甸莱比塘铜矿项目",
            resident:
              "中国兵器工业集团下属子公司中国北方工业有限公司万宝矿产公司(简称“万宝矿产”)",
          },
          {
            id: 3,
            militaryRegion: "缅甸道耶卡第二水电站项目",
            resident: "中国机械设备工程股份有限公司",
          },
        ],
        influenceFactor: [
          {
            id: 1,
            militaryRegion: "海军总部",
            resident: "内比都",
          },
        ],
        PublicOpinionIndex: [
          {
            id: 1,
            militaryRegion: "空军司令部",
            resident: "内比都",
          },
        ],
        dataObjOne: {
          title: "",
          color: ["#4374D0", "#18A670", "#C05C35"],
          data: [
            {
              name: "支持 37%",
              value: 37,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "中立 22%",
              value: 22,
                label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "反对 49%",
              value: 49,
                label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
          ],
        },
        itemArray_3: [
          {
            id: "1",
            country: "美国",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2018年11月，中缅双方代表在缅甸商务部签署皎漂深水港项目框架协议，中方占股70%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "2",
            country: "印度",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "西边是中巴经济走廊，南边是斯里兰卡的科伦坡港、汉班托塔港，东边是孟中印缅经济走廊、中尼印经济走廊，这就是对印度进行U型包围。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "3",
            country: "日本",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2013年至2015年，由于当时日本各界对“一带一路”的目标和主要政策认识不足，日本各界对“一带一路”抱有“观察”和“质疑”态度。日本新闻网站以“一带一路”、“2013”等关键词搜索发现，日本官方鲜有回应，日本舆论充满疑虑，日本学者则是褒贬不一。新华社此前报道指出，当时，有些日本媒体曾就此宣扬“中国威胁论”，并把“一带一路”建设与“马歇尔计划”、“珍珠链战略”相提并论。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
        ],
      },
      dataInfoTwo: {
        title: "东南亚一带一路",
        titleEcharts: "舆情综合指数：6（满分10）",
        tableData: [
          {
            militaryRegion: "",
            resident: "",
          },
        ],
        ChineseFundedProjects: [
          {
            id: 1,
            militaryRegion: "菲律宾，河钢菲律宾钢铁项目",
            resident: "1.	驻缅甸联邦共和国使馆",
          },
          {
            id: 2,
            militaryRegion: "泰国，泰国23号公路",
            resident:
              "驻泰王国大使馆（驻孔敬总领事馆、驻清迈总领事馆、驻宋卡总领事馆）",
          },
          {
            id: 3,
            militaryRegion: "印度尼西亚，加锡铁路项目",
            resident: "3.	驻柬埔寨王国大使馆",
          },
        ],
        influenceFactor: [
          {
            id: 1,
            militaryRegion: "海军总部",
            resident: "内比都",
          },
        ],
        PublicOpinionIndex: [
          {
            id: 1,
            militaryRegion: "空军司令部",
            resident: "内比都",
          },
        ],
        dataObjOne: {
          title: "",
          color: ["#4374D0", "#18A670", "#C05C35"],
          data: [
            {
              name: "支持 59%",
              value: 59,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "中立 14%",
              value: 14,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "反对 27%",
              value: 27,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
          ],
        },
        itemArray_3: [
          {
            id: "1",
            country: "美国",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2018年11月，中缅双方代表在缅甸商务部签署皎漂深水港项目框架协议，中方占股70%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "2",
            country: "印度",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "西边是中巴经济走廊，南边是斯里兰卡的科伦坡港、汉班托塔港，东边是孟中印缅经济走廊、中尼印经济走廊，这就是对印度进行U型包围。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "3",
            country: "日本",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2013年至2015年，由于当时日本各界对“一带一路”的目标和主要政策认识不足，日本各界对“一带一路”抱有“观察”和“质疑”态度。日本新闻网站以“一带一路”、“2013”等关键词搜索发现，日本官方鲜有回应，日本舆论充满疑虑，日本学者则是褒贬不一。新华社此前报道指出，当时，有些日本媒体曾就此宣扬“中国威胁论”，并把“一带一路”建设与“马歇尔计划”、“珍珠链战略”相提并论。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
        ],
      },
      dataInfoThree: {
        title: "全球一带一路",
        titleEcharts: "舆情综合指数：7（满分10）",
        tableData: [
          {
            militaryRegion: "",
            resident: "",
          },
        ],
        ChineseFundedProjects: [
          {
            id: 1,
            militaryRegion: "哈萨克斯坦公路项目，希塔段公路项目",
            resident: "中国水电十六局",
          },
          {
            id: 2,
            militaryRegion:
              "加蓬利伯维尔至各省会收费国道整治、扩建、铺筑沥青项目",
            resident: "中国路桥（中交）(简称“万宝矿产”)",
          },
          {
            id: 3,
            militaryRegion: "达拉苏夫至亚考朗道路修复改造项目",
            resident: "中国路桥（中交）",
          },
        ],
        influenceFactor: [
          {
            id: 1,
            militaryRegion: "海军总部",
            resident: "内比都",
          },
        ],
        PublicOpinionIndex: [
          {
            id: 1,
            militaryRegion: "空军司令部",
            resident: "内比都",
          },
        ],
        dataObjOne: {
          title: "",
          color: ["#4374D0", "#18A670", "#C05C35"],
          data: [
            {
              name: "支持 43%",
              value: 43,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "中立 35%",
              value: 35,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
            {
              name: "反对 22%",
              value: 22,
              label: {
                  fontSize: 16,
                  color: '#fff'
                }
            },
          ],
        },
        itemArray_3: [
          {
            id: "1",
            country: "美国",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2018年11月，中缅双方代表在缅甸商务部签署皎漂深水港项目框架协议，中方占股70%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "2",
            country: "印度",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "西边是中巴经济走廊，南边是斯里兰卡的科伦坡港、汉班托塔港，东边是孟中印缅经济走廊、中尼印经济走廊，这就是对印度进行U型包围。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
          {
            id: "3",
            country: "日本",
            openStatus: false,
            flag: false,
            data: [
              {
                title:
                  "2013年至2015年，由于当时日本各界对“一带一路”的目标和主要政策认识不足，日本各界对“一带一路”抱有“观察”和“质疑”态度。日本新闻网站以“一带一路”、“2013”等关键词搜索发现，日本官方鲜有回应，日本舆论充满疑虑，日本学者则是褒贬不一。新华社此前报道指出，当时，有些日本媒体曾就此宣扬“中国威胁论”，并把“一带一路”建设与“马歇尔计划”、“珍珠链战略”相提并论。%，缅方占股30%。项目规模比原计划大幅缩减，由最初的修建约10个泊位调整为2个泊位，初期投资额也由最初的73亿美元缩减到了13亿美元。《华尔街日报》报道称，在这一调整的背后，有美国的“贡献”。报道引述不具名“美国现任和前任政府官员”的话称，一个由美国经济学家、外交官和律师组成的团队被派往缅甸进行“试点项目”，内容是审查合同、就对缅甸不利的交易作出提醒，并帮助该国争取与中国机构和公司达成更好的条款。",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    dealImageClick() {
      this.switchState(9);
    },
    dealClick(d) {
      console.log(d,88888888888);
      if (d.ref === "item2_1") {
        this.switchState("3");
      } else if (d.ref === "item1") {
        if (this.state === "13") {
          this.switchState("15");
        } else if(this.state === "12"){
           this.switchState("10")
        }else {
          this.switchState("3");
        }
      } else if (d.ref === "item3") {
        this.switchState("4");
        this.bottomShow = 2;
        this.buttonList = this.buttonList_5;
      }
    },
    goydyl(type) {
      if (type == "all") {
        this.bottomShow = 2;
        this.buttonList = this.buttonList_5;
        this.switchState("13");
        this.$nextTick(() => {
          this.$refs["t13"].dataInfo = this.dataInfoThree;
        });
      } else if(type == 'd'){
        this.bottomShow = 2;
        this.buttonList = this.buttonList_5;
        this.switchState("12");
        this.$nextTick(() => {
          this.$refs["t12"].dataInfo = this.dataInfoTwo;
        });
      }
    },
    updateChartsItem() {
      var _self = this;
      var d = ItemList;
      for (var i = 0; i < d.length; i++) {
        _self.dataObj[d[i].ref] = d[i];
      }
    },
    updateConfig() {
      for (var i = 0; i < this.config.length; i++) {
        var item = this.config[i];
        if (
          item.state === this.state ||
          (item.state.constructor.name === "Array" &&
            item.state.indexOf(this.state) !== -1)
        ) {
          item.isDisplay = true;
        } else {
          item.isDisplay = false;
        }
      }
    },
    switchState: function (state) {
      this.state = state || 1;
      this.updateConfig();
      this.$nextTick(() => {
        this.updateComponentItems();
      });
    },
    updateComponentItems() {
      for (var k in this.dataObj) {
        if (this.dataObj[k].comName) {
          var rValue = this.dataObj[k].ref;
          if (this.$refs[rValue]) {
            var comItem = this.$refs[rValue];
            if (comItem && comItem.length !== 0) {
              comItem[0].switchComponent(this.dataObj[k]);
            }
          }
        }
      }
    },
    updateAppData: function () {
      var _self = this;
      adapter.getAppData(
        {
          _id: "xxxx",
        },
        function (d) {
          _self.dataObj.title = d.data.title;
          d = d.data.list;
          for (var i = 0; i < d.length; i++) {
            var rValue = d[i].ref;
            if (_self.$refs[rValue]) {
              _self.dataObj[rValue] = d[i];
              _self.$refs[rValue].switchComponent(d[i]);
            }
          }
        }
      );
    },
    //接收导航标题
    itemChildren(v) {
      // console.log(v,9999999)
    },
    addClass(item, event) {
      this.navCurrent = item.type;
      //获取点击对象
      var el = event.navCurrentTarget;
    },
    //底部方法
    selectBar(item) {
      this.buttonList.forEach((i) => {
        i.status = false;
      });
      this.$set(item, "status", true);
      if (item.type == "hotqy") {
        this.switchState("2_1");
      } else if (item.type == "hotgj") {
        this.switchState("2_2");
      } else if (item.type == "hotsj") {
        this.switchState("2_3");
      } else if (item.type == "llsj") {
        this.switchState("10");
          //this.switchState("10_1");
      } else if (item.type == "sjzz") {
        this.switchState("7_1");
        //this.switchState("6");
      } else if (item.type == "rwhx") {
        this.switchState("8_1");
      } else if (item.type == "ydyl") {
        this.switchState("11");
        this.$nextTick(() => {
          this.$refs["t11"].dataInfo = this.dataInfoOne;
        });
      } else if (item.type == "ydyl1") {
        this.switchState("13");
      } else {
      }//llsj
      if (item.type == "fxpg") {
        this.switchState("5");
      }
       if (item.type == "llsj") {
        this.switchState("10");
      }
    },
    //nav点击
    navChangeStatus(val) {
      console.log(val.name);
      if (val.type == "zz") {
        this.switchState(val.type);
        this.switchState("10_1");
      }else if( val.type == "jj" ){
        this.switchState(val.type);
        this.switchState("10_2");
      }
    },
    //动态改变面包屑数据
    changeCurmb(val, type) {
      // nav为第一级
      let json = [],
        flag = false;
      if (type == "1") {
        json = {
          name: "全球" + val.name,
          type: val.type,
        };
      } else {
        json = {
          name: val.name,
          type: val.type,
        };
      }
      if (type == "1") {
        if (this.breadListIm.length > 0) {
          this.breadListIm.splice(0, 1, json);
        } else {
          this.breadListIm.push(json);
        }
      }
      if (type == "2") {
        if (this.breadListIm.length > 1) {
          this.breadListIm.splice(1, 1, json);
        } else {
          this.breadListIm.push(json);
        }
      }
      if (type == "3") {
        if (this.breadListIm.length > 2) {
          this.breadListIm.splice(2, 1, json);
        } else {
          this.breadListIm.push(json);
        }
      }
    },
    //点击面包屑改变数据
    tobreadCrumb(val, index) {
      console.log(this.breadListIm.length > index + 1);
      if (this.breadListIm.length > index + 1) {
        this.breadListIm.splice(
          index + 1,
          this.breadListIm.length - (index + 1)
        );
        console.log(val, index);
      }
      console.log(val);
      if (index === 0) {
        this.switchState("1");
      }
      if (index === 0 && val.type == "zz") {
        this.bottomShow = 1;
        this.buttonList = this.buttonList_3;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.example {
  height: 100%;
  padding: 0 !important;
  background-color: #002f47;
}

.componentArea {
  width: 100%;
  height: 100%;
}

.headerCont {
  width: 100%;
  height: 130px;
  background: url("../assets/image/topbg.png") no-repeat;
  background-size: 100% 100%;
}

.topCon {
  display: flex;
  width: 100%;
  padding-left: 26%;
}

.topCon .nav {
  width: 70%;
  height: 72px;
}

.topCon .nav li {
  float: left;
  height: 72px;
  line-height: 72px;
  font-size: 30px;
  width: 120px;
  text-align: center;
  color: #00d8ff;
  cursor: pointer;
}

.topCon .nav li:hover {
  font-weight: bold;
  color: #83e3ff;
}

.topCon .nav li.active {
  font-weight: bold;
  color: #83e3ff;
  background: url("../assets/image/navbg.png") no-repeat center bottom;
}

.example > .sidebar {
  padding: 10px 20px;
  width: 600px;
  position: absolute;
  right: 0px;
  z-index: 3;
}


.weather {
  display: flex;
  font-size: 20px;
  color: rgb(192, 235, 255);
  align-items: center;
  height: 72px;
}

.weather img {
  height: 26px;
}

.crumbs {
  height: 46px;
  position: absolute;
  top: 73px;
  left: 26%;
  font-size: 16px;
  padding-top: 10px;
  display: flex;
  align-items: center;
}

.crumbs img {
  display: inline-block;
  height: 20px;
  margin-right: 14px;
}

.crumbs .b_span {
  cursor: pointer;
  color: #00d8ff;
}

.crumbs .b_span:hover {
  color: #83e3ff;
}

.componentArea {
  position: relative;
  width: 100%;
  height: 100%;
}

.bottomBox {
  position: fixed;
  bottom: 10px;
  width: 98%;
  height: 60px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bottomUl {
  margin-top: -10px;
  display: flex;
  /* justify-content: space-between; */
}

.buttomItem {
  margin-left: 3px;
  font-size: 22px;
  cursor: pointer;
}

.buttonDiv {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 10px 8px 20px;
}

.buttonDiv p {
  margin-left: 5%;
}

.buttonDiv img {
  width: 20px;
}

.tankuang {
  width: 60%;
  height: 65%;
  position: absolute;
  left: 18%;
  z-index: 555;
}
</style>
