<template>
  <div class="menuItemsArea" ref="container"></div>
</template>

<script>
  import G6 from "@antv/g6";
  export default {
    name: "",
    mounted() {
      this.updateData(this.dataObj);
    },
    data() {
      return {
        dataInfo: {
          option: {
            modes: {
              default: ["drag-canvas", "zoom-canvas", "drag-node"], // 允许拖拽画布、放缩画布、拖拽节点
            },
            defaultNode: {
              type: 'card-node',
              size: [100, 40],
            },
            defaultEdge: {
              type: 'cubic-horizontal',
              style: {
                endArrow: true,
              },
            },
            layout: {
              type: 'indented',
              direction: 'LR',
              dropCap: false,
              indent: 200,
              getHeight: () => {
                return 60;
              },
            },
            nodeStateStyles: {
              // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
              hover: {
                fill: "lightsteelblue",
              },
              // 鼠标点击节点，即 click 状态为 true 时的样式
              click: {
                stroke: "#000",
                lineWidth: 3,
              },
            },
            // 边不同状态下的样式集合
            edgeStateStyles: {
              // 鼠标点击边，即 click 状态为 true 时的样式
              click: {
                stroke: "steelblue",
              },
            },
          },
          nodes: [{
              id: "node1", // 节点的唯一标识
              label: "n0", // 节点文本
            },
            {
              id: "node2",
              label: "n2",
            },
          ],
          // 边集
          edges: [
            // 表示一条从 node1 节点连接到 node2 节点的边
            {
              source: "node1", // 起始点 id
              target: "node2", // 目标点 id
              label: "l1", // 边的文本
            },
          ],
          data: {
            id: 'A',
            children: [{
                id: 'A1',
                children: [{
                  id: 'A11'
                }, {
                  id: 'A12'
                }, {
                  id: 'A13'
                }, {
                  id: 'A14'
                }],
              },
              {
                id: 'A2',
                children: [{
                    id: 'A21',
                    children: [{
                      id: 'A211'
                    }, {
                      id: 'A212'
                    }],
                  },
                  {
                    id: 'A22',
                  },
                ],
              },
            ],
          }
        },
      };
    },
    methods: {
      handleCollapse(e) {
        const target = e.target;
        const id = target.get('modelId');
        const item = graph.findById(id);
        const nodeModel = item.getModel();
        nodeModel.collapsed = !nodeModel.collapsed;
        this.graph.layout()
        this.graph.setItemState(item, 'collapse', nodeModel.collapsed)
      },
      initGraph(option) {
        var rect = this.$refs.container.getClientRects();
        var param = {
          container: this.$refs.container,
          width: rect[0].width,
          height: rect[0].height,
        };
        if (option) {
          for (var k in option) {
            param[k] = param[k] || option[k];
          }
        }
        this.register();
        this.graph = new G6.TreeGraph(param);
      },
      updateData(data) {
        data = data || this.dataInfo || {};
        if (data.option || !this.graph) {
          this.initGraph(data.option || this.dataInfo.option);
        }
        if (data.data) {
          this.dataInfo = data.data;
        } else {
          this.dataInfo.nodes = data.nodes || this.dataInfo.nodes || [];
          this.dataInfo.edges = data.edges || this.dataInfo.edges || [];
        }
        this.graph.data(this.dataInfo);
        this.graph.render();
        this.graph.fitView();
        this.initEvent();
      },
      initEvent() {
        var graph = this.graph;
        graph.off("node:mouseenter");
        graph.on("node:mouseenter", (e) => {
          const nodeItem = e.item; // 获取鼠标进入的节点元素对象
          graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
        });

        // 鼠标离开节点
        graph.off("node:mouseleave");
        graph.on("node:mouseleave", (e) => {
          const nodeItem = e.item; // 获取鼠标离开的节点元素对象
          graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
        });

        // 点击节点
        graph.off("node:click");
        graph.on("node:click", (e) => {
          // 先将所有当前是 click 状态的节点置为非 click 状态
          const clickNodes = graph.findAllByState("node", "click");
          clickNodes.forEach((cn) => {
            graph.setItemState(cn, "click", false);
          });
          const nodeItem = e.item; // 获取被点击的节点元素对象
          graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
        });

        // 点击边
        graph.off("edge:click");
        graph.on("edge:click", (e) => {
          // 先将所有当前是 click 状态的边置为非 click 状态
          const clickEdges = graph.findAllByState("edge", "click");
          clickEdges.forEach((ce) => {
            graph.setItemState(ce, "click", false);
          });
          const edgeItem = e.item; // 获取被点击的边元素对象
          graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
        });
        var _self = this;
        graph.on('collapse-text:click', e => {
          _self.handleCollapse(e)
        })
        graph.on('collapse-back:click', e => {
          _self.handleCollapse(e)
        })
      },
      register() {
        G6.registerNode('card-node', {
          draw: function drawShape(cfg, group) {
            const r = 2;
            const color = '#5B8FF9';
            const w = cfg.size[0];
            const h = cfg.size[1];
            const shape = group.addShape('rect', {
              attrs: {
                x: -w / 2,
                y: -h / 2,
                width: w, //200,
                height: h, // 60
                stroke: color,
                radius: r,
                fill: '#fff',
              },
              name: 'main-box',
              draggable: true,
            });

            group.addShape('rect', {
              attrs: {
                x: -w / 2,
                y: -h / 2,
                width: w, //200,
                height: h / 2, // 60
                fill: color,
                radius: [r, r, 0, 0],
              },
              name: 'title-box',
              draggable: true,
            });

            // title text
            group.addShape('text', {
              attrs: {
                textBaseline: 'top',
                x: -w / 2 + 8,
                y: -h / 2 + 2,
                lineHeight: 20,
                text: cfg.id,
                fill: '#fff',
              },
              name: 'title',
            });
            cfg.children &&
              group.addShape('marker', {
                attrs: {
                  x: w / 2,
                  y: 0,
                  r: 6,
                  cursor: 'pointer',
                  symbol: G6.Marker.collapse,
                  stroke: '#666',
                  lineWidth: 1,
                  fill: '#fff',
                },
                name: 'collapse-icon',
              });
            group.addShape('text', {
              attrs: {
                textBaseline: 'top',
                x: -w / 2 + 8,
                y: -h / 2 + 24,
                lineHeight: 20,
                text: 'description',
                fill: 'rgba(0,0,0, 1)',
              },
              name: `description`,
            });
            return shape;
          },
          setState(name, value, item) {
            if (name === 'collapsed') {
              const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
              const icon = value ? G6.Marker.expand : G6.Marker.collapse;
              marker.attr('symbol', icon);
            }
          },
        });
      }
    },
    created() {},
    props: {
      dataObj: Object,
    },
  };

</script>

<style scoped>
  .menuItemsArea {
    width: 100%;
    height: 100%;
  }

</style>
