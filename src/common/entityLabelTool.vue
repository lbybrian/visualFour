<template>
  <div class="contentArea" style="padding: 10px; height: 100%; overflow: auto; width: 100%;">
    <div class="contentContainer" style="width: 100%; height: auto; position: relative; float: left;">
      <div class="relationCanvasItem" ref="relationCanvasItem"
        style="position: absolute; top: 0px; left: 0px; width: 100%; z-index: 0; height: 100%;"></div>
      <div @mouseup="handleSelectText" ref="entityContentArea" class="docContentItem"
        style="padding: 10px; position: relative; z-index: 1;"></div>
    </div>
    <DialogItem @confirmDialog="confirmLabelConfig" :config="labelConfigDialog">
      <template>
        <div class="topFormArea" style="margin-bottom: 10px; margin-top: -20px;">
          <el-radio-group size="mini" v-model="labelInfoConfig.type" style="margin-bottom: 10px; text-align: center;">
            <el-radio-button label="entity">属性</el-radio-button>
            <el-radio-button label="event">事件</el-radio-button>
          </el-radio-group>
          <el-form :inline="true" :model="labelInfoConfig" class="demo-form-inline" label-suffix=":">
            <el-form-item v-if="labelInfoConfig.type === 'entity' " label="标注方式">
              <el-select size="mini" v-model="labelInfoConfig.mode" placeholder="标注方式">
                <el-option label="标注当前" value="current"></el-option>
                <!-- <el-option label="标注所有" value="all"></el-option> -->
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-row style="margin-bottom: 20px; width: 100%; position: relative; float: left;" :gutter="5">
          <el-col :span="24">
            <el-input style="width: 100%; margin-bottom: 10px;" size="small" placeholder="请输关键词检索标签"
              v-model="labelInfoConfig.keyword" class="keywordInput">
              <el-button size="small" type="primary" slot="append" @click="handleSerchEvent" icon="el-icon-search">
              </el-button>
            </el-input>
            <LabelTree ref="entity" v-if="labelInfoConfig.type === 'entity' " :tree="entityLabel.data"
              :treeCheckStrictly="entityLabel.treeCheckStrictly" :treeShowCheckbox="entityLabel.treeShowCheckbox"
              :nodeKey="entityLabel.nodeKey" :collect="entityLabel.collect" :hideParentCheckBox="true"
              style="width: 100%; float: left; ">
            </LabelTree>
            <LabelTree ref="event" v-else-if="labelInfoConfig.type === 'event'" :tree="eventLabel.data"
              :treeCheckStrictly="eventLabel.treeCheckStrictly" :treeShowCheckbox="eventLabel.treeShowCheckbox"
              :nodeKey="eventLabel.nodeKey" :hideParentCheckBox="true" :collect="eventLabel.collect"
              style="width: 100%; float: left; ">
            </LabelTree>
          </el-col>
        </el-row>
      </template>
    </DialogItem>
    <DialogItem @confirmDialog="confirmRelationConfig" :config="relationConfigDialog">
      <template>
        <div>
          <LabelTree ref="relationLabel"
            v-if="relationConfig.type !== 'eventParam' && relationConfig.type !== 'entityRelation'"
            :tree="relationLabel.data" :treeCheckStrictly="relationLabel.treeCheckStrictly"
            :treeShowCheckbox="relationLabel.treeShowCheckbox" :nodeKey="relationLabel.nodeKey"
            :collect="relationLabel.collect" :hideParentCheckBox="true" style="width: 100%; float: left; ">
          </LabelTree>
          <el-radio-group v-model="relationConfigDialog.data" size="small">
            <slot v-for="item in eventParam.options">
              <el-radio :label="item.label" :title="item.label" border style="margin-bottom: 10px;">
                {{item.label}}</el-radio>
            </slot>
          </el-radio-group>
          <el-input style="width: 100%; margin-bottom: 10px;" size="small" placeholder="请输入关系名称"
            v-model="relationConfigDialog.data"></el-input>
        </div>
      </template>
    </DialogItem>

  </div>
</template>

<script>
import DialogItem from "@/common/dialogItem";
import LabelTree from '@/common/tree';
import FormInfo from "@/common/formInfo";
import cytoscape from "cytoscape";

var color = "rgb(64, 158, 255)";
export default {
  components: {
    DialogItem,
    FormInfo,
    LabelTree,
  },
  data () {
    return {

      currentData: {},
      labelConfigDialog: {
        visible: false,
        title: "添加标注信息",
        withFooter: true,
        width: "600px"
      },
      labelInfoConfig: {
        type: "entity",
        mode: "current",
        keyword: "",
        eventTrigger: 0

      },
      relationConfig: {
        type: "entityRelation"
      },
      entityLabel: {
        data: [],
        nodeKey: 'id',
        treeShowCheckbox: true,
        treeCheckStrictly: true,
        collect: false,
        keyword: ""
      },
      eventLabel: {
        data: [],
        nodeKey: 'id',
        treeShowCheckbox: true,
        treeCheckStrictly: true,
        collect: false,
        keyword: ""
      },
      relationLabel: {
        data: [],
        nodeKey: 'id',
        treeShowCheckbox: true,
        treeCheckStrictly: false,
        collect: false,
        keyword: ""
      },
      eventParam: {
        data: [],
        nodeKey: 'id',
        treeShowCheckbox: true,
        treeCheckStrictly: false,
        collect: false,
        keyword: "",
        options: []
      },
      relationConfigDialog: {
        visible: false,
        title: "添加标注信息",
        withFooter: true,
        data: "",
        width: "600px"
      },
      params: {
        zoom: 1,
        map: {
          id: "id",
          label: "label",
          source: "source",
          target: "target",
          image: "image",
        },
        style: [{
          selector: 'node',
          style: {
            'width': '5px',
            "height": "5px",
            "background-color": color
          }
        }, {
          selector: 'edge',
          style: {
            'width': 0.5,
            'line-color': color,
            "label": "data(label)",
            "color": color,
            "taxi-direction": "downward",
            "font-size": 12,
            "line-cap": "round",
            'target-arrow-color': color,
            'target-arrow-shape': 'triangle',
            'curve-style': 'unbundled-bezier'
          }
        }]
      },
      viewDataConfigDialog: {
        visible: false,
        title: "查看数据",
        withFooter: false,
        data: "",
        width: "1000px"
      },
      viewDataJson: {
        activeName: 'labelData',
        fromUrl: null,
        current: {
          title: "b0144adf-bcb7-4ad5-a9c5-aa1000c786fa.txt",
          content: "",
          relation: [],
          labels: []
        },
        labelData: {
          withSelection: false,
          withIndex: true,
          size: 'medium',
          border: true,
          heightCurrentRow: true,
          header: [{
            prop: 'textOffset',
            label: '文本-偏移',
            align: 'left',
          },
          {
            prop: 'labels',
            label: '标签',
            align: 'left',
          },
          ],
          data: [{
            textOffset: '杨铁虎[9]',
            labels: '姓名(基础属性类标签-人物-实体标签)',
          },
          {
            textOffset: '2021-01-20 17:03[14]',
            labels: '发布时间(时间-实体标签)',
          },
          ]
        },
        examineLabelData: {
          withSelection: true,
          withIndex: true,
          size: 'medium',
          border: true,
          heightCurrentRow: true,
          header: [{
            prop: 'textOffset',
            label: '文本-偏移',
            align: 'left',
          },
          {
            prop: 'labels',
            label: '标签',
            align: 'left',
            radios: 'radios',
          },
          ],
          data: [{
            textOffset: '杨铁虎[9]',
            labels: '',
            radios: [{
              label: "id1",
              name: "姓名(基础属性类标签-人物-实体标签)"
            },
            {
              label: "id2",
              name: "别名(基础属性类标签-人物-实体标签)"
            }
            ],
            value: ''
          },
          {
            textOffset: '2021-01-20 17:03[14]',
            labels: '发布时间(时间-实体标签)',
            value: ''
          },
          ],
        },
        labelLine: {
          withSelection: false,
          withIndex: true,
          size: 'medium',
          border: true,
          heightCurrentRow: true,
          header: [{
            prop: 'sourceTextOffset',
            label: '源文本-偏移',
            align: 'left',
          },
          {
            prop: 'targetTextOffset',
            label: '目标文本-偏移',
            align: 'left',
          },
          {
            prop: 'relationshipLabel',
            label: '关系标签',
            align: 'left',
          },
          ],
          data: [{
            sourceTextOffset: '杨铁虎[9]',
            targetTextOffset: '2021-01-20 17:03[14]',
            relationshipLabel: '发布文章',
          },]
        },
        entityData: [{

        }],
        eventData: [{

        }],
        relationData: {
          withSelection: false,
          withIndex: true,
          size: 'medium',
          border: true,
          heightCurrentRow: true,
          header: [{
            prop: 'sourceEntityName',
            label: '源实体名称',
            align: 'left',
          },
          {
            prop: 'targetEntityName',
            label: '目标实体名称',
            align: 'left',
          },
          {
            prop: 'relationshipLabel',
            label: '关系标签',
            align: 'left',
          },
          ],
          data: [{
            sourceEntityName: '杨铁虎',
            targetEntityName: '杨明',
            relationshipLabel: '父子关系',
          },]
        },
        eventData: [{
          text: "文本11",
          tNum: 2,
          eventItems: {
            withSelection: false,
            withIndex: false,
            border: true,
            header: [{
              prop: "date",
              label: "日期222",
              width: "180",
            },
            {
              prop: "name",
              label: "姓名",
              width: "180",
              align: "left",
            },
            {
              prop: "address",
              label: "地址",
            },
            {
              prop: "val",
              label: "值"
            }
            ],
            data: [{
              date: "2020-02-21",
              name: "张大壳子0000",
              address: "三义0000000院",
              val: "99999999999999"
            }],
          }

        }, {
          text: "文本22221",
          tNum: 44,
          eventItems: {
            withSelection: false,
            withIndex: false,
            border: true,
            header: [{
              prop: "date",
              label: "日期222",
              width: "180",

            },
            {
              prop: "name",
              label: "姓名",
              width: "180",
              align: "left",
            },
            {
              prop: "address",
              label: "地址",
            },
            ],
            data: [{
              date: "2020-02-21",
              name: "张大壳子",
              address: "三义庙2号院",
            }],
          }
        }],
        entityeventData: [{
          text: "文本3333",
          tNum: 2,
          eventItems: {
            withSelection: false,
            withIndex: false,
            border: true,
            header: [{
              prop: "date",
              label: "实体日期222",
              width: "180",
            },
            {
              prop: "name",
              label: "实体姓名",
              width: "180",
              align: "left",
            },
            {
              prop: "address",
              label: "实体地址",
            },
            {
              prop: "val",
              label: "实体值"
            }
            ],
            data: [{
              date: "2020-02-21",
              name: "实体张三三",
              address: "三义0000000院",
              val: "99999999999999"
            },
            {
              date: "2020-02-22",
              name: "李思思",
              address: "三义庙2号院",
              val: "7777777777777"
            },
            ],
          }

        }, {
          text: "火爆新闻",
          tNum: 44,
          eventItems: {
            withSelection: false,
            withIndex: false,
            border: true,
            header: [{
              prop: "date",
              label: "火爆222",
              width: "180",

            },
            {
              prop: "name",
              label: "火爆4444444",
              width: "180",
              align: "left",
            },
            {
              prop: "address",
              label: "地址0000000",
            },
            ],
            data: [{
              date: "2020-02-21",
              name: "张恒郑爽",
              address: "三义庙2号院",
            },
            {
              date: "2020-02-22",
              name: "迪丽热巴",
              address: "三义庙2号院",
            },
            ],
          }
        }]
      },
      dataInfo: {
        labelRoleConfig: {
          default: "姓名"
        },
        content: "被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县。曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元。后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人民法院判处有期徒刑二年六个月,并处罚金五千元;后又因犯盗窃罪于2014年12月20日被湖南省祁东县人民法院判处有期徒刑一年六个月,并处罚金一千元被告人周春桥法院,男,1965年2月11日出生,汉族,湖南省祁阳县人,初中文化,无业,家住湖南省祁阳县;曾因犯盗窃罪于2011年8月30日被永州市零陵区人",
        relation: [],
        labels: [

        ]
      }

    };
  },
  props: {
    // dataObj: Object,
  },
  beforeMount () {
    this.updateLabelData();
  },
  mounted () {
    var h = $(".contentArea").height();
    $(".contentContainer").css("min-height", h - 200);
    $(".el-tab-pane").css({
      "height": h - 160,
      "overflow": "auto"
    });

    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      tData = {
        ...tData
      };
      console.log(tData, 123)
      this.updateData(tData);
    });
  },
  methods: {
    handleSerchEvent (val) {

    },
    getEventLabel () {
      var eventData = {
        ...this.eventParam.data
      };
      this.eventLabel.data = this.util.removeLeafNode(eventData);
    },
    updateEventParam (data, label, name, type) {
      var index = data.findItem("label", label);
      var arr = [];
      if (index !== -1) {
        if (type === 'entity') {
          data[index].children[0].children.forEach(item => {
            console.log(item)
            if (item.children.length == 0) {
              arr.push(item)
            } else {
              arr = arr.concat(item.children)
            }
          });
          arr.removeItem("label", name);
          // data[index].children.removeItem("label", name);
          // arr = data[index].children;
        } else if (type === 'event') {
          let childIndex = data[index].children.findItem("label", name);
          if (childIndex !== -1) {
            arr = data[index].children[childIndex].children;
          }
        }
      }
      this.eventParam.options = arr;
      console.log(this.eventParam)
    },
    getLabelRole (d, index) {
      var ret = "normal";
      if (d.type === "event") {
        ret = "leader"
      } else {
        var name = d.name;
        var config = this.dataInfo.labelRoleConfig;
        var tArray = d.labelType.split("-");
        index = index || 0;
        var tName = tArray[tArray.length - 1 - index];
        if ((config[tName] && config[name] === name) || name === config.default) {
          ret = "leader";
        }
      }
      return ret;
    },
    updateLabelData () {
      var _self = this;
      this.adapter.getEntitiLabel({}, function (d) {
        _self.entityLabel.data = d.data;
      });
      this.adapter.getEventLabel({}, function (d) {
        _self.eventLabel.data = d.data;
      })
      this.adapter.getEventParam({}, function (d) {
        _self.eventParam.data = d.data;
      })
    },
    updateData (tData) {
      console.log(tData, 234)
      this.dataInfo.labels = [];
      this.dataInfo.relation = [];
      this.dataInfo.content = tData.content;
      for (var k in tData) {
        this.dataInfo[k] = tData[k] || this.dataInfo[k];
      }
      this.updateContentArea();
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    removeRelationById (id, flag) {
      if (!flag) {
        this.dataInfo.relation.removeItem("source", id);
        this.dataInfo.relation.removeItem("target", id);
        this.dataInfo.relation.removeItem("id", id);
      } else {
        this.dataInfo.relation.removeItem(flag, id);
      }
    },
    findRelation (sId, tId) {
      var ret = -1;
      var arr = this.dataInfo.relation;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].source === sId && arr[i].target === tId) {
          ret = i;
          break;
        }
      }
      return ret;
    },

    getPrefixLabel (node, n) {
      var arr = [];
      node = node.parent;
      while (node && node.data) {
        if (node.data.label) {
          arr.push(node.data.label);
        }
        node = node.parent;
      }

      return arr;
    },
    confirmLabelConfig () {
      if (this.labelConfigDialog.labelsIndes) {
        this.labelConfigDialog.data = this.dataInfo.labels[parseInt(this.labelConfigDialog.labelsIndes)];
      }
      var type = this.labelInfoConfig.type;
      this.labelConfigDialog.data.type = type;
      var nodes = this.$refs[type].getCheckedNodes();
      console.log(nodes);
      if (nodes && nodes.length !== 0) {
        var item = nodes[nodes.length - 1];
        var node = this.$refs[type].getNode(item.id);
        var arr = this.getPrefixLabel(node);
        var labelType = arr.join("-");
        var label = item.label + "(" + arr.join("-") + ")";
        if (arr.length === 0) {
          label = item.label;
        }
        if (type === "event") {
          arr.push(item.label);
          labelType = arr.join("-");
          label = labelType;
        }
        var tData = this.labelConfigDialog.data || {};

        tData.name = nodes[nodes.length - 1].label;
        tData.type = type;
        tData.labelType = labelType;
        tData.label = label;
        tData.labelId = item.id;

        tData.role = this.getLabelRole(tData, 1);
        this.labelConfigDialog.data = tData;
        this.addSpanData(this.labelConfigDialog.data);
        console.log(this.dataInfo.labels);
        localStorage.setItem('exportJson', JSON.stringify(this.dataInfo.labels))
        // 添加成功清空选项
        this.$refs[type].clean();

      }
      this.updateContentArea();
      this.$emit('confirmLabelSure', this.dataInfo.labels)//抛出确认标注方法(已标注的标签集合)
      // this.$message("添加标注成功。");
    },
    confirmRelationConfig () {
      var type = this.relationConfig.type;
      // var tree = this.$refs[type];
      // var nodes = tree.getCheckedNodes();
      var input = "";
      // if (nodes && nodes.length !== 0) {
      //   input = nodes[0].label;
      // }
      input = this.eventParam.value || this.relationConfigDialog.data;
      this.addRelationData(this.relationConfigDialog.sNode, this.relationConfigDialog.tNode, input);
      console.log(this.dataInfo.relation, '关系呀')
      this.updateContentArea();
      // this.$message("添加关系成功。");
      this.$emit('confirmRelationConfig', this.dataInfo.relation)//抛出确认标注连线方法(已标注连线集合)
    },

    addSpanData (data) {
      let flag = true;
      if (this.dataInfo.labels.length != 0) {
        this.dataInfo.labels.forEach(item => {
          if (item.id == data.id) {
            item = data;
            flag = false;
          }
        });
      }
      if (flag) {
        if (data && data.constructor.name !== "Array") {
          data = [data];
        }
        this.dataInfo.labels = this.dataInfo.labels.concat(data);
      }
    },
    getAllTextOffset (keyword) {
      if (!keyword) {
        return false
      }
      var reg = eval('/' + keyword + '/g');
      var arr = [];
      this.dataInfo.content.replace(reg, function (m, t) {
        arr.push({
          offset: t,
          text: m
        })
      });
      return arr;
    },
    handleSelectText (e) {
      var elem = this.$refs.entityContentArea;
      let txt = window.getSelection ?
        window.getSelection() :
        elem.selection.createRange().text;
      if (txt.toString() !== "") {
        var ret = this.getSelectTextOffset(txt);
        console.log(e.srcElement);
        if (ret.text === "" || e.srcElement.className !== "docContentItem") {
          this.$message("标注区域已有标注信息。");
        } else {
          // this.$message(ret.text);
          this.labelConfigDialog.title = `添加标注信息 ( ${ret.text} )`
          this.labelConfigDialog.visible = true;
          this.labelConfigDialog.data = ret;
        }
        console.log(ret);
      }
    },
    updateContentArea (flag) {
      var elem = this.$refs.entityContentArea;
      //添加标注信息
      var str = this.addSpanByData(this.dataInfo.labels, this.dataInfo.content)
      elem.innerHTML = str;

      this.$nextTick(function () {
        var _self = this;
        $(".opSpanInfoArea .removeSpanBtn").off("click");
        $(".opSpanInfoArea .removeSpanBtn").on("click", function () {
          var index = $(this).attr("index");
          var d = _self.dataInfo.labels[index];
          _self.$confirm("确定要删除此标签吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _self.dataInfo.labels.splice(index, 1);
            _self.removeRelationById(d.id);

            _self.updateContentArea();
            _self.$emit('deleteLabelFun', _self.dataInfo.labels, _self.dataInfo.relation)//抛出删除标签确认事件(已标注的标签集合，已标注连线集合)
          }).catch(() => { });
        });
        $(".opSpanInfoArea .editSpanBtn").off("click");
        $(".opSpanInfoArea .editSpanBtn").on("click", function () {
          var index = $(this).attr("index");
          var d = _self.dataInfo.labels[index];
          _self.labelConfigDialog.title = `编辑标注 ( ${d.text} )`;
          _self.labelConfigDialog.labelsIndes = index;
          _self.labelConfigDialog.visible = true;
          // 设置默认选中
          _self.$nextTick(() => {
            _self.$refs.entity.setValue(d.labelId);
          })
        });

        $(".spanItem").off("click");
        $(".spanItem").on("click", function () {
          var t = $(this).attr("active");
          var activeSelector = $(".spanItem[active=true]");
          if (t === "true") {
            $(this).attr("active", "false");
            if ($(this).attr("flag") === "source") {
              $(".spanItem[flag=target]").attr("flag", "source");
            }
            $(this).attr("flag", "");
          } else {
            if (activeSelector.length > 1) {
              activeSelector.attr("active", "false");
            }
            $(this).attr("active", "true");
            if (activeSelector.length == 0) {
              $(this).attr("flag", "source");
            } else if (activeSelector.length === 2) {
              $(".spanItem").attr("flag", "");
              $(this).attr("flag", "source");
            } else {
              $(this).attr("flag", "target");
            }
          }

          var sSelector = $(".spanItem[flag=source]");
          var tSelector = $(".spanItem[flag=target]");
          if (sSelector.length === 1 && tSelector.length === 1) {
            var sIndex = sSelector.attr('index');
            var tIndex = tSelector.attr("index");
            var sNode = _self.dataInfo.labels[sIndex];
            var tNode = _self.dataInfo.labels[tIndex];
            var rIndex = _self.findRelation(sNode.id, tNode.id);
            if (rIndex === -1) {
              _self.relationConfigDialog.title = `添加关系信息 ( ${sNode.text} - ${tNode.text} )`;
              _self.relationConfigDialog.visible = true;
              _self.relationConfigDialog.sNode = sNode;
              _self.relationConfigDialog.tNode = tNode;
              _self.relationConfigDialog.data = tNode.name;
              if (sNode.type === "event") {
                _self.relationConfig.type = "eventParam";
                var arr = sNode.labelType.split("-");
                if (arr[0]) {
                  _self.updateEventParam(_self.eventParam.data, arr[0], sNode.name, 'event');
                }

              } else {
                _self.relationConfig.type = "entityRelation";
                var arr = sNode.labelType.split("-");
                if (arr[0]) {
                  _self.updateEventParam(_self.eventParam.data, arr[0], sNode.name, 'entity');
                }
              }
            } else {
              var d = _self.dataInfo.relation[rIndex];
              _self.$confirm("关系已存在，需要删除该关系吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _self.removeRelationById(d.id, "id");

                _self.updateContentArea();
                _self.$emit('deleteRelation', _self.dataInfo.labels, _self.dataInfo.relation)//抛出删除关系确认事件(已标注的标签集合，已标注连线集合)
              }).catch(() => { });
            }

            // _self.labelConfigDialog.data = ret;
          }

        });

        //更新关系节点和边数据
        setTimeout(() => {
          _self.updateRelationCanvas();
        }, 200);

      });
    },
    addRelationData (sNode, tNode, label) {
      var id = sNode.id + "-" + tNode.id;
      var item = {
        id: id,
        source: sNode.id,
        target: tNode.id,
        label: label
      };
      if (sNode.role == "leader" && tNode.role == "leader") {
        item.roleType = 'leader'
      }
      this.dataInfo.relation.removeItem("id", id);
      this.dataInfo.relation.push(item);
    },
    adustNodePosition (elem) {
      var pos = {
        x: 50,
        y: 50
      }
      var tRect = elem.getBoundingClientRect();
      var pRect = $(".docContentItem")[0].getBoundingClientRect();
      pos.x = tRect.x - pRect.x;
      pos.y = tRect.y - pRect.y + 25;
      return pos;
    },
    getRelationData () {
      // var rData = rData || this.dataInfo.relation;
      var spanSelector = $(".spanItem");
      var nodes = [];
      for (var i = 0; i < spanSelector.length; i++) {
        var iSelector = spanSelector.eq(i);
        var index = iSelector.attr("index");
        var item = {
          data: this.dataInfo.labels[index]
        };
        item.position = this.adustNodePosition(iSelector[0]);
        nodes.push(item);
      }

      var edges = this.dataInfo.relation || [];
      edges = edges.map(item => {
        return {
          data: item
        }
      })

      return {
        edges: edges,
        nodes: nodes
      }
    },
    updateRelationCanvas () {
      var rData = this.getRelationData();
      var params = {
        ...this.params
      };
      rData.nodes = rData.nodes || [];
      rData.edges = rData.edges || [];
      params.container = this.$refs.relationCanvasItem;
      params.elements = [];
      this.cy = cytoscape(params);
      this.cy.edges().remove();
      this.cy.nodes().remove();
      params.elements = params.elements.concat(rData.nodes);
      params.elements = params.elements.concat(rData.edges);
      for (var i = 0; i < params.elements.length; i++) {
        var elem = params.elements[i];
        this.cy.add(elem)
      }
    },
    //获取选中文本的偏移量
    getSelectTextOffset (txt) {
      var lastNode = txt.baseNode.previousElementSibling
      var pos = txt.baseOffset
      let str = txt.baseNode.data.slice(txt.baseOffset, txt.focusOffset)
      if (lastNode) {
        var tPos = Number(lastNode.getAttribute('offset'))
        var text = lastNode.innerText
        var tText = text.split('\n')[0]
        pos += tPos + tText.length
      }
      var id = `${str}[${pos}]`;
      let ret = {
        text: str,
        type: txt.type,
        offset: pos,
        id: id
      }
      return ret
    },
    // 改标签内容和样式
    addSpanByData (data, text) {
      if (!data || data.length === 0) {
        return text
      }
      data.sort(function (a, b) {
        return a.offset - b.offset
      })
      var rStr = text.slice(0, data[0].offset);
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var tStr =
          `<span style="position: relative;" type="${item.type}" role="${item.role}" class="spanItem" index=${i} id="${item.id}" title="${item.label}" offset=${item.offset}>${item.text}
                <div class="spanInfoArea" style="">${item.label}
                <span class="opSpanInfoArea"><i title="编辑标注信息" index=${i} class="el-icon-setting editSpanBtn"></i> <i title="删除标注信息" class="removeSpanBtn el-icon-delete" index=${i} style="margin-left: 10px;"></i></span></div></span>`;

        rStr += tStr
        if (i < data.length - 1) {
          rStr += text.slice(data[i].offset + data[i].text.length, data[i + 1].offset);
        } else {
          rStr += text.slice(data[i].offset + data[i].text.length);
        }
      }
      return rStr
    },

    initCurrentData () {

    },
    updateLabelDataView () {
      this.viewDataJson.labelData.data = [];
      this.dataInfo.labels.forEach(item => {
        this.viewDataJson.labelData.data.push({
          textOffset: item.id,
          labels: item.label,
        })
      })
    },

    dealSelectionChange (val) {
      console.log(val)
    },
    dealSortChange (param) {
      console.log(param)
    },
    dealPageChange (current, size) {
      console.log(current, size)
    },
    dealCellClick (row, column, cell, event) {
      console.log(row, column, cell)
    },
    dealButtonClick (eventName, row, index) {
      console.log(eventName, row, index)
    },
    //页码切换
    dealSizeChange (current, size) {
      console.log(current, size)
    },
  }
};

</script>

<style scope>
* {
  box-sizing: border-box;
}

.docContentItem {
  height: auto;
  min-height: 400px;
  width: 100%;
  line-height: 3.5;
  border-radius: 5px;
  white-space: pre-line;
}

.spanItem {
  border: solid 1px rgb(64, 158, 255);
  color: rgb(64, 158, 255);
  border-bottom: none;
  display: inline-block;
  line-height: 25px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-left: 10px;
  min-width: 60px;
  cursor: pointer;
  padding: 0px 3px;
  text-align: center;
}

.spanItem[type="event"] {
  color: rgb(103, 194, 58);
  border-color: rgb(103, 194, 58);
}

.spanItem[active="true"] {
  color: #000;
  background-color: rgb(64, 158, 255);
}

.spanItem[type="event"][active="true"] {
  color: #000;
  background-color: rgb(103, 194, 58);
}

.el-radio.is-bordered {
  margin-left: 0px !important;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}

/deep/ .el-tabs__content {
  height: calc(100% - 60px) !important;
}

/deep/ .el-tab-pane {
  height: 100% !important;
}

/deep/ .el-dialog__body {
  padding: 20px 20px !important;
}

/deep/ .is-leaf + label.el-checkbox {
  display: none !important;
}

.spanInfoArea {
  position: absolute;
  bottom: -15px;
  left: -1px;
  width: calc(100% + 2px);
  min-width: 60px;
  line-height: 15px;
  font-size: 10px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  color: rgb(64, 158, 255);
  border: solid 1px rgb(64, 158, 255);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 3px;
  padding-right: 3px;
}

.spanItem[type="event"] .spanInfoArea {
  color: rgb(103, 194, 58);
  border-color: rgb(103, 194, 58);
}

.spanItem[role="leader"] .spanInfoArea {
  border-top-color: red;
}

.opSpanInfoArea {
  position: absolute;
  display: none;
  line-height: 1;
  background-color: rgba(252, 252, 252, 0.8);
  right: 0px;
  top: 0px;
  width: 100%;
  padding: 2px 0px;
  text-align: center;
}

.topFormArea .el-form-item {
  margin-bottom: 0px !important;
}

.spanInfoArea:hover .opSpanInfoArea {
  display: inline-block;
}

.opSpanInfoArea i {
  position: relative;
}
</style>
