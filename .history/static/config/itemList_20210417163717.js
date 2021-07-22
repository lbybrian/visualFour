const ItemList = [
  {
      "ref": "item10_1",
      "type": "zz",
      "comName": "barChart",
      "title": "缅甸社会环境",
      "dataObj": {
          "name": "失业率",
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "xAxisStyle": {
              "name": "年"
          },
          "yAxisStyle": {
              "name": "%"
          },
          "data": [
              {
                  "name": "2012",
                  "value": 4
              },
              {
                  "name": "2013",
                  "value": 4
              },
              {
                  "name": "2014",
                  "value": 4
              },
              {
                  "name": "2015",
                  "value": 0.8
              },
              {
                  "name": "2016",
                  "value": 3.8
              },
              {
                  "name": "2017",
                  "value": 3.8
              },
              {
                  "name": "2018",
                  "value": 4
              },
              {
                  "name": "2019",
                  "value": 3.8
              },
              {
                  "name": "2020",
                  "value": 8.2
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_2",
      "type": "jj",
      "comName": "lineChart",
      "title": "缅甸信贷情况",
      "dataObj": {
          "title": "",
          "name": [
              "国内信贷增长率",
              "M2增长率"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
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
          "xAxisStyle": {
              "name": "年"
          },
          "yAxisStyle": {
              "name": "%"
          },
          "data": [
              {
                  "name": "2012",
                  "value": [
                      -9.4,
                      32
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      32.2,
                      31.4
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      21.6,
                      21.1
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      28.2,
                      30.4
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      29.8,
                      17.8
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      22.3,
                      20.2
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      17.9,
                      16.4
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      15.4,
                      17.8
                  ]
              },
              {
                  "name": "2020",
                  "value": [
                      20.7,
                      20.6
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      10.1,
                      9.1
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_3",
      "type": "zz",
      "comName": "barChart",
      "title": "缅甸双边援助主要来源国/机构",
      "dataObj": {
          "name": "",
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "xAxisStyle": {
              "name": "亿美元"
          },
          "data": [
              {
                  "name": "日本",
                  "value": 4.6
              },  {
                  "name": "国际开发协会",
                  "value": 2.2
              },
              {
                  "name": "英国",
                  "value": 1.47
              },
              {
                  "name": "美国",
                  "value": 1.42
              },
              {
                  "name": "欧盟机构",
                  "value": 0.8
              },
              {
                  "name": "国际基金",
                  "value": 0.76
              },
              {
                  "name": "澳大利亚",
                  "value": 0.6
              },
              {
                  "name": "韩国",
                  "value": 0.58
              },
              {
                  "name": "德国",
                  "value": 0.56
              },
              {
                  "name": "瑞士",
                  "value": 0.49
              }
          ],
          "mode": "horizontal"
      }
  },
  {
      "ref": "item10_4",
      "type": "jj",
      "comName": "barChart",
      "title": "缅甸出口商品结构",
      "dataObj": {
          "name": [
              "天然气",
              "服饰",
              "豆类",
              "大米"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
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
          "data": [
              {
                  "name": "2012",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      42,
                      50.6,
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
                      42,
                      51.3,
                      56
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
                      48,
                      56,
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
                      57
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
                      21,
                      39,
                      45,
                      52
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
                      21,
                      38.5,
                      45,
                      52
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
                      20,
                      38.5,
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
                      21,
                      40,
                      46,
                      55
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_5",
      "type": "jj",
      "comName": "barChart",
      "title": "缅甸进口商品结构",
      "dataObj": {
          "name": [
              "直接访问",
              "邮件营销",
              "联盟广告",
              "视频广告",
              "搜索引擎"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
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
          "data": [
              {
                  "name": "周一",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      320,
                      302,
                      301,
                      334,
                      390,
                      330,
                      320
                  ]
              },
              {
                  "name": "周二",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      120,
                      132,
                      101,
                      134,
                      90,
                      230,
                      210
                  ]
              },
              {
                  "name": "周三",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      220,
                      182,
                      191,
                      234,
                      290,
                      330,
                      310
                  ]
              },
              {
                  "name": "周四",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      150,
                      212,
                      201,
                      154,
                      190,
                      330,
                      410
                  ]
              },
              {
                  "name": "周五",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      820,
                      832,
                      901,
                      934,
                      1290,
                      1330,
                      1320
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_6",
      "type": "jj",
      "comName": "lineChart",
      "title": "缅甸汇率水平",
      "dataObj": {
          "title": "",
          "name": [
              "汇率(平均，左轴)",
              "汇率(年末，左轴)",
              "实际y有效汇率(CPI调整，右边轴)"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
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
          "yAxisStyle": [
              {
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
          "data": [
              {
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
  {
      "ref": "item10_7",
      "type": "jj",
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
          "data": [
              {
                  "name": "2012",
                  "value": 12
              },
              {
                  "name": "2013",
                  "value": 22
              }
             ,
              {
                  "name": "2014",
                  "value": 21
              }
             ,
              {
                  "name": "2015",
                  "value": 41
              }
             ,
              {
                  "name": "2016",
                  "value": 32
              }
             ,
              {
                  "name": "2017",
                  "value": 40
              }
             ,
              {
                  "name": "2018",
                  "value": 12
              }
             ,
              {
                  "name": "2019",
                  "value": 30
              }
             ,
              {
                  "name": "2020",
                  "value": 18
              }
             ,
              {
                  "name": "2021",
                  "value": 50
              }

          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_8",
      "type": "zz",
      "comName": "lineChart",
      "title": "缅甸法治得分",
      "dataObj": {
          "title": "",
          "name": [
              "法治得分(左轴)",
              "分位点(右轴)"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
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
          "yAxisStyle": {
              "type": "value",
              "name": "法治得分",
              "min": -3,
              "max": 12,
              "interval": 3
          },
          "data": [
              {
                  "name": "2009",
                  "value": [
                      -1.54,
                      3
              ]
               },
              {
                  "name": "2010",
                  "value": [
                      -1.6,
                      2.5
                  ]
              }, {
                  "name": "2011",
                  "value": [
                      -1.4,
                      4.7
                  ]
              },

              {
                  "name": "2012",
                  "value": [
                      -1.36,
                      6.6
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      -1.27,
                      10
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      -1.2,
                      7.7
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      -1.3,
                      7.5
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      -0.8,
                      17.5
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      -0.9,
                      16.5
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      -1.1,
                      15.5
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_9",
      "comName": "mixChart",
      "title": "缅甸军费支出和军事实力情况",
      "dataObj": {
          "title": "",
          "typeMap": [
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }
              
          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              }
          ],
          "name": [
              "AAAAAA",
              "AAAAAA"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "周一",
                  "value": [
                      1300,
                      120
                  ]
              },
              {
                  "name": "周二",
                  "value": [
                      6000,
                      4020
                  ]
              },
              {
                  "name": "周三",
                  "value": [
                      3200,
                      1020
                  ]
              },
              {
                  "name": "周四",
                  "value": [
                      3000,
                      2120
                  ]
              },
              {
                  "name": "周五",
                  "value": [
                      5500,
                      5120
                  ]
              },
              {
                  "name": "周六",
                  "value": [
                      1700,
                      1200
                  ]
              },
              {
                  "name": "周日",
                  "value": [
                      1900,
                      1120
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_10",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸宏观经济表现",
      "dataObj": {
          "title": "",
          "typeMap": [
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
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
          "data": [
              {
                  "name": "2012",
                  "value": [
                      470,
                      7.4
                  ]
              },  {
                  "name": "2013",
                  "value": [
                      510,
                      8.4
                  ]
              },  {
                  "name": "2014",
                  "value": [
                      550,
                      8.0
                  ]
              },  {
                  "name": "2015",
                  "value": [
                      590,
                      7.0
                  ]
              },  {
                  "name": "2016",
                  "value": [
                      610,
                      6.9
                  ]
              },  {
                  "name": "2017",
                  "value": [
                      650,
                      6.8
                  ]
              },  {
                  "name": "2018",
                  "value": [
                      700,
                      6.2
                  ]
              },  {
                  "name": "2019",
                  "value": [
                      750,
                      6.6
                  ]
              },  {
                  "name": "2020",
                  "value": [
                      760,
                      2.1
                  ]
              },  {
                  "name": "2021",
                  "value": [
                      810,
                      7.5
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_11",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸外部经济影响因素",
      "dataObj": {
          "title": "",
          "typeMap": [
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "tooltip":"axis",
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#facc14"
              },
              {
                  "color": "#2fc25b"
              }
          ],
          "name": [
              "NYMEX原油(右轴)",
              "出口价格指数(左轴)",
              "进口价格指数(左轴)"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2019-01",
                  "value": [
                      54,
                      98.1,
                      98.9
                  ]
              },
              {
                  "name": "2019-02",
                  "value": [
                      57,
                      96.7,
                      99
                  ]
              },
              {
                  "name": "2019-03",
                  "value": [
                      61,
                      96.1,
                      99.1
                  ]
              },
              {
                  "name": "2019-04",
                  "value": [
                      66,
                      95.4,
                      99.2
                  ]
              },
              {
                  "name": "2019-05",
                  "value": [
                      52,
                      95.3,
                      99
                  ]
              },
              {
                  "name": "2019-06",
                  "value": [
                      59,
                      94.5,
                      98.8
                  ]
              },
              {
                  "name": "2019-07",
                  "value": [
                      59,
                      94.5,
                      98.9
                  ]
              },
              {
                  "name": "2019-08",
                  "value": [
                      55,
                      94,
                      98.8
                  ]
              },
              {
                  "name": "2019-09",
                  "value": [
                      54,
                      94.8,
                      98.9
                  ]
              },
              {
                  "name": "2019-10",
                  "value": [
                      54,
                      94.9,
                      98.8
                  ]
              },
              {
                  "name": "2019-11",
                  "value": [
                      55,
                      95.4,
                      99.1
                  ]
              },
              {
                  "name": "2019-12",
                  "value": [
                      64,
                      94.9,
                      99.4
                  ]
              },
              {
                  "name": "2020-01",
                  "value": [
                      52,
                      94,
                      99.4
                  ]
              },
              {
                  "name": "2020-02",
                  "value": [
                      48,
                      92.9,
                      98.8
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_12",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸经济增速分解",
      "dataObj": {
          "title": "",
          "typeMap": [
              "bar",
              "bar",
              "line"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "yAxisIndex":1,
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              },
              {
                  "color": "#8543e0"
              }
          ],
          "name": [
              "私人消费",
              "公共消费",
              "固定资产投资",
              "国际平衡",
              "实际GDP增速"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2012",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      1.2,
                      5.1,
                      9,
                      9.8,
                      7.5
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
                      4.9,
                      9.0,
                      13,
                      -6.5,
                      8
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
                      4.8,
                      8.0,
                      10.1,
                      -2.4,
                      7.8
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
                      2.5,
                      3,
                      8,
                      -2.7,
                      7.3
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
                      2.4,
                      -1.0,
                      3.5,
                      7,
                      6
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
                      -1.0,
                      3,
                      6,
                      6.5,
                      7.2
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
                      2.4,
                      5.1,
                      8,
                      -2.0,
                      6
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
                      2.7,
                      3,
                      6,
                      6.5,
                      7.1
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
                      2.2,
                      2.5,
                      -1.0,
                      -1,
                      2.5
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
                      3,
                      4.9,
                      6.5,
                      7.5,
                      7.8
                  ]
              }


          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_13",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸公共债务",
      "dataObj": {
          "title": "",
          "typeMap": [
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              }
          ],
          "name": [
              "公共债务(左轴)",
              "公共债务/GDP(右轴)"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2012",
                  "value": [
                      260,
                      44
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      210,
                      34
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      190,
                      30
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      220,
                      35.1
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      225,
                      35
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      230,
                      35.1
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      250,
                      35
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      300,
                      37
                  ]
              },
              {
                  "name": "2020",
                  "value": [
                      380,
                      41.3
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      410,
                      42
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_14",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸商品货易",
      "dataObj": {
          "title": "",
          "typeMap": [
              "bar",
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              },
              {
                  "color": "#facc14"
              }
          ],
          "name": [
              "商品出口",
              "商品进口",
              "商品贸易余额"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2012",
                  "value": [
                      70,
                      75,
                      11
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      85,
                      86,
                      -2
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      100,
                      120,
                      -20
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      100,
                      130,
                      -40
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      80,
                      125,
                      -38
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      90,
                      155,
                      -60
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      110,
                      155,
                      -44
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      110,
                      130,
                      -28
                  ]
              },
              {
                  "name": "2020",
                  "value": [
                      105,
                      140,
                      -40
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      125,
                      160,
                      -41
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_15",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸通货膨胀",
      "dataObj": {
          "title": "",
          "typeMap": [
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              }
          ],
          "name": [
              "进口价格指数(右轴)",
              "通货膨胀率(CPI，平均，左轴)"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "itemStyle": {
              "barBorderColor": "rgba(0,0,0,0)",
              "color": "rgba(0,0,0,0)"
          },
          "data": [
              {
                  "name": "2012",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      -14,
                      1.5
                  ]
              },
              {
                  "name": "2013",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      -2,
                      5.6
                  ]
              },
              {
                  "name": "2014",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      -9,
                      5.6
                  ]
              },
              {
                  "name": "2015",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      -3.7,
                      8.7
                  ]
              },
              {
                  "name": "2016",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      20,
                      6.7
                  ]
              },
              {
                  "name": "2017",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      3.6,
                      4.6
                  ]
              },
              {
                  "name": "2018",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      1,
                      7.0
                  ]
              },
              {
                  "name": "2019",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      5.0,
                      8.8
                  ]
              },
              {
                  "name": "2020",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      4.8,
                      6.7
                  ]
              },
              {
                  "name": "2021",
                  "type": "bar",
                  "stack": "总量",
                  "value": [
                      0,
                      8.4
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_16",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸外债清况",
      "dataObj": {
          "title": "",
          "typeMap": ["line", "line","line","bar"],
          "styleMap": [{
              "color": "#1890ff"
          }, {
              "color": "#2fc25b"
          },
          {
              "color": "#facc14"
          },
          {
              "color": "#8543e0"
          }
         ],
          "name": [
              "外债总额(左轴)",
              "偿债率(右轴)",
              "负债率(右轴)",
              "债务率(右轴)"
          ],
          "color": ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2"],
          "data": [
              {
                  "name": "2012",
                  "value": [
                      115,
                      12,
                      19,
                      115
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      138,
                      2,
                      22,
                      98
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      143,
                      3,
                      21,
                      91
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      141,
                      4,
                      22,
                      86
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      140,
                      5,
                      22,
                      87
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      150,
                      4,
                      23,
                      87
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      148,
                      5,
                      21,
                      76
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      160,
                      5,
                      20,
                      76
                  ]
              },
              {
                  "name": "2020",
                  "value": [
                      180,
                      4,
                      19,
                      109
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      189,
                      3,
                      18,
                      95
                  ]
              }
          ],
          "mode": "vertical"

      }
  },
  {
      "ref": "item10_17",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸国际储备",
      "dataObj": {
          "title": "",
          "typeMap": ["line", "bar"],
          "styleMap": [{
              "color": "#1890ff"
          }, {
              "color": "#2fc25b"
          }],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "name": [
              "国际储备(左轴)",
              "进口用汇(右轴)"
          ],
          "color": ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2"],
          "data": [
              {
                  "name": "2012",
                  "value": [
                      69,
                      9.2
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      85,
                      8.8
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      45,
                      3.8
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      46,
                      3.3
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      49,
                      3.8
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      51,
                      3.3
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      58,
                      3.7
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      59,
                      3.9
                  ]
              },
              {
                  "name": "20120",
                  "value": [
                      60.5,
                      4.3
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      61.5,
                      3.8
                  ]
              }

          ],
          "mode": "vertical"

      }
  },
  {
      "ref": "item10_18",
      "type": "jj",
      "comName": "mixChart",
      "title": "中缅双边贸易",
      "dataObj": {
          "title": "",
          "typeMap": [
              "bar",
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              },
              {
                  "color": "#facc14"
              }
          ],
          "name": [
              "中国出口",
              "中国进口",
              "中国顺差"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2010",
                  "value": [
                      30,
                      15,
                      25
                  ]
              },
              {
                  "name": "2011",
                  "value": [
                      47,
                      20,
                      30
                  ]
              },
              {
                  "name": "2012",
                  "value": [
                      60,
                      17,
                      40
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      74,
                      29,
                      40
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      90,
                      158,
                      -67
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      92,
                      60,
                      38
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      70,
                      40,
                      39
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      80,
                      45,
                      42
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      110,
                      45,
                      60
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      124,
                      67,
                      61
                  ]
              }

          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_19",
      "type": "wj",
      "comName": "mixChart",
      "title": "中国对缅甸投资",
      "dataObj": {
          "title": "",
          "typeMap": ["line", "bar"],
          "styleMap": [{
              "color": "#1890ff"
          }, {
              "color": "#2fc25b"
          }],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "name": [
              "中国ODI存量(左轴)",
              "中国ODI流量(右轴)"
          ],
          "color": ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2"],
          "data": [
              {
                  "name": "2010",
                  "value": [
                      19,
                      9.0
                  ]
              }, {
                  "name": "2011",
                  "value": [
                      22,
                      2.3
                  ]
              }, {
                  "name": "2012",
                  "value": [
                      31,
                      7.9
                  ]
              }, {
                  "name": "2013",
                  "value": [
                      36,
                      4.9
                  ]
              }, {
                  "name": "2014",
                  "value": [
                      39,
                      3.8
                  ]
              }, {
                  "name": "2015",
                  "value": [
                      42,
                      3.7
                  ]
              }, {
                  "name": "2016",
                  "value": [
                      46,
                      2.9
                  ]
              }, {
                  "name": "2017",
                  "value": [
                      55,
                      4.0
                  ]
              }, {
                  "name": "2018",
                  "value": [
                      48,
                      -2.2
                  ]
              }
          ],
          "mode": "vertical"

      }
  },
  {
      "ref": "item10_20",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸财政执行情况",
      "dataObj": {
          "title": "",
          "typeMap": [
              "bar",
              "line",
              "bar"
          ],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "styleMap": [
              {
                  "color": "#1890ff"
              },
              {
                  "color": "#2fc25b"
              },
              {
                  "color": "#facc14"
              }
          ],
          "name": [
              "财政收入占GDP比重(左轴)",
              "财政支出占GDP比重(左轴)",
              "财政余额占GDP比重(右轴)"
          ],
          "color": [
              "#1890ff",
              "#2fc25b",
              "#facc14",
              "#223273",
              "#8543e0",
              "#13c2c2"
          ],
          "data": [
              {
                  "name": "2012",
                  "value": [
                      10.1,
                      13.5,
                      12
                  ]
              },
              {
                  "name": "2013",
                  "value": [
                      12,
                      14.1,
                      14.1
                  ]
              },
              {
                  "name": "2014",
                  "value": [
                      13,
                      14.3,
                      16
                  ]
              },
              {
                  "name": "2015",
                  "value": [
                      12.9,
                      15.8,
                      13.3
                  ]
              },
              {
                  "name": "2016",
                  "value": [
                      13.8,
                      16.3,
                      13
                  ]
              },
              {
                  "name": "2017",
                  "value": [
                      14.2,
                      18,
                      11
                  ]
              },
              {
                  "name": "2018",
                  "value": [
                      14.8,
                      18.7,
                      10.9
                  ]
              },
              {
                  "name": "2019",
                  "value": [
                      12,
                      18.8,
                      3.1
                  ]
              },
              {
                  "name": "2020",
                  "value": [
                      12.7,
                      18.3,
                      5.4
                  ]
              },
              {
                  "name": "2021",
                  "value": [
                      13,
                      18,
                      7.1
                  ]
              }
          ],
          "mode": "vertical"
      }
  },
  {
      "ref": "item10_21",
      "type": "jj",
      "comName": "mixChart",
      "title": "缅甸经常账户结构",
      "dataObj": {
          "title": "",
          "typeMap": ["line", "bar","bar","bar"],
          "styleMap": [{
              "color": "#1890ff"
          }, {
              "color": "#2fc25b"
          },{
              "color": "#13c2c2"
          }, {
              "color": "#facc14"
          }],
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }

          },
          "name": [
              "商品贸易余额占GDP比重",
              "服务贸易余额占GDP比重",
              "一次收入余额占GDP比重",
              "二次收入余额占GDP比重",
              "经常账户余额占GDP比重"
          ],
          "color": ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2"],
          "data": [
              {
                  "name": "2012",
                  "type": "bar",
                  "stack": "总量",
                  "label": {
                      "show": true,
                      "position": "insideRight"
                  },
                  "value": [
                      1,
                      -0.1,
                      -4.0,
                      -2.0
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
                      0,
                      0.9,
                      -3.1,
                      2.7,
                      -0.6
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
                      -3,
                      1.3,
                      -6.6,
                      3.2,
                      -3.3
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
                      -6,
                      2.1,
                      -9.5,
                      4.9,
                      -4.7
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
                      -5.8,
                      2,
                      -8,
                      5.1,
                      -2.9
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
                      -8.3,
                      1.3,
                      -11.5,
                      5.9,
                      -6.6
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
                      -6,
                      1.7,
                      -8.1,
                      5,
                      -3
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
                      -3.7,
                      3.7,
                      -6.0,
                      6.1,
                      0.8
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
                      -4,
                      0.7,
                      -6.1,
                      1.8,
                      -4.4
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
                      -4,
                      0.2,
                      -6.0,
                      2.1,
                      -3.9
                  ]
               }

          ],
          "mode": "vertical"

      }
  },
  {
      "ref": "item10_22",
      "comName": "sunburst",
      "title": "旭日图",
      "dataObj":{
          "title": "", 
          "color": [
              "FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"
          ], 
          "legendStyle":{
              "textStyle":{
                  "color":"#ffffff"
                }
              
          },
          "itemStyle":{
              
          },
          "data": [
              {
                  "name": "A", 
                  "value": 10, 
                  "itemStyle": {
                      "color": "#255"
                  }, 
                  "children": [
                      {
                          "value": 3, 
                          "name": "Ab", 
                          "itemStyle": {
                              "color": "#965"
                          }
                      }, 
                      {
                          "value": 5, 
                          "name": "Aa", 
                          "itemStyle": {
                              "color": "#755"
                          }
                      }, 
                      {
                          "value": 2, 
                          "name": "Ac", 
                          "itemStyle": {
                              "color": "#235"
                          }
                      }
                  ]
              }, 
              {
                  "name": "B", 
                  "itemStyle": {
                      "color": "blue"
                  }, 
                  "children": [
                      {
                          "name": "Ba", 
                          "value": 4
                      }, 
                      {
                          "name": "Bb", 
                          "value": 2
                      }
                  ]
              }, 
              {
                  "name": "C", 
                  "value": 8, 
                  "itemStyle": {
                      "color": "violet"
                  }, 
                  "children": [
                      {
                          "name": "Ca", 
                          "value": 4, 
                          "itemStyle": {
                              "color": "#568"
                          }
                      }, 
                      {
                          "name": "Cb", 
                          "value": 2, 
                          "itemStyle": {
                              "color": "#755"
                          }
                      }, 
                      {
                          "name": "Cf", 
                          "value": 2, 
                          "itemStyle": {
                              "color": "#154"
                          }
                      }
                  ]
              }
          ]
      }
  },
  
    {
      "ref": "item10_23",
      "comName": "sunburst",
      "title": "",
      "dataObj": {
          "title":"五大热点区域",
          "itemArray_3": [
              {
                  "id": "1", 
                  "country": "东南亚"
                 
              }, 
              {
                  "id": "2", 
                  "country": "中东"
                 
              }, 
              {
                  "id": "3", 
                  "country": "南亚"
              }, 
              {
                  "id": "4", 
                  "country": "欧洲"
              }, 
              {
                  "id": "5", 
                  "country": "美洲"
              }
          ]
      }
  },
  {
      "ref": "item10_25",
      "comName": "sunburst",
      "title": "",
      "dataObj": {
          "title":"十大热点国家",
          "itemArray_3": [
              {
                  "id": "1", 
                  "country": "缅甸"
              }, 
              {
                  "id": "2", 
                  "country": "美国"
              }, 
              {
                  "id": "3", 
                  "country": "印度"
              }, 
              {
                  "id": "4", 
                  "country": "埃塞俄比亚"
              }, 
              {
                  "id": "5", 
                  "country": "伊朗"
              },
              {
                  "id": "6", 
                  "country": "巴基斯坦"
              }, 
              {
                  "id": "7", 
                  "country": "埃及"
              }, 
              {
                  "id": "8", 
                  "country": "土耳其"
              }, 
              {
                  "id": "9", 
                  "country": "巴西"
              }, 
              {
                  "id": "10", 
                  "country": "俄罗斯"
              }
          ]
      }
  },
  {
      "ref": "item10_24",
      "type":1,
      "comName": "sidebar",
      "title": "",
      "dataObj": {
          "title":"十大热点事件",
          "itemArray_3": [
              {
                  "id": "1", 
                  "country": "缅甸军方政变", 
                  "openStatus": true,
                   "flag":false,
                   "data":[
                       {
                           "title" :" 2020年11月8日缅甸大选，民盟胜出继续执政。"
                       },
                       {
                          "title" :" 2020年12月10日，缅甸选举委员会在拒绝了缅军要求「复核投票」的请求，斥责其为「非法。"
                      },
                      {
                          "title" :" 2020年12月23日缅甸军方自行发布了“大选舞弊”的调查报告。"
                      },
                      {
                          "title" :" 2020年1月14日，缅甸人民院议长迪昆妙拒绝了军方有关举行大选舞弊特别会议的请求。"
                      },
                      {
                         "title" :" 2021年1月26日，缅甸军方举办发布会质疑选举舞弊。"
                     }
                   ]
              }, 
              {
                  "id": "2", 
                  "country": "日本决定核废水排放入海", 
                  "openStatus": true
              }, 
              {
                  "id": "3", 
                  "country": "国外新冠疫苗安全性争议", 
                  "openStatus": true
              }, 
              {
                  "id": "4", 
                  "country": "美航母群入南海", 
                  "openStatus": true
              }, 
              {
                  "id": "5", 
                  "country": "乌克兰东部大规模交火", 
                  "openStatus": true
              },
              {
                  "id": "6", 
                  "country": "新疆棉花事件", 
                  "openStatus": true
              }, 
              {
                  "id": "7", 
                  "country": "日本决定核废水排放入海", 
                  "openStatus": true
              }, 
              {
                  "id": "8", 
                  "country": "美国欲重返伊核协议", 
                  "openStatus": true
              }, 
              {
                  "id": "9", 
                  "country": "国外疫情恶化", 
                  "openStatus": true
              }, 
              {
                  "id": "10", 
                  "country": "英国“脱欧”后续影响", 
                  "openStatus": true
              }
          ]
      }
  }
  
]