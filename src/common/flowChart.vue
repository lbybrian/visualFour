<template>
  <div v-show="status === true" class="chartArea" ref="chartItem"></div>
</template>

<script>
// 引入基本模板
import G6 from "@antv/g6";
export default {
  name: "",
  data() {
    return {
      status: true,
      layout: {
        type: "dagre",
        rankdir: "LR",
        nodesepFunc: (d) => {
          if (d.id === "3") {
            return 500;
          }
          return 50;
        },
        ranksep: 70,
        controlPoints: true,
      },
      defaultNode: {
        type: "sql",
      },
      defaultEdge: {
        type: "polyline",
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: "#C2C8D5",
        },
      },
      nodeStateStyles: {
        selected: {
          stroke: "#d9d9d9",
          fill: "#5394ef",
        },
      },
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          "click-select",
          {
            type: "tooltip",
            formatText(model) {
              const cfg = model.conf;
              const text = [];
              cfg.forEach((row) => {
                text.push(row.label + ":" + row.value + "<br>");
              });
              return text.join("\n");
            },
            offset: 30,
          },
        ],
      },
      fitView: true,
      dataInfo: {},
    };
  },
  props: {
    dataObj: Object,
  },
  mounted() {
    this.$nextTick(function () {
      var tData = this.dataObj || this.dataInfo;
      this.updateData(tData);
    });
  },
  methods: {
    updateOption(data) {
      var arr = ["nodes", "edges", "modes"];
      this.dataInfo = {
        layout: { ...this.layout },
        defaultNode: { ...this.defaultNode },
        defaultEdge: { ...this.defaultEdge },
        nodeStateStyles: { ...this.nodeStateStyles },
        modes: { ...this.modes },
        nodes: { ...this.nodes },
        edges: { ...this.edges },
        fitView: true,
      };
      for (var k in data) {
        if (arr.indexOf(k) !== -1) {
          if(k !== "nodes" && k !== "edges") {
            this.dataInfo[k] = data[k];
          }
          else {
            this.dataInfo[k] = JSON.parse(JSON.stringify(data[k]));
          }

          
        } else {
          for (var j in data[k]) {
            this.dataInfo[k] = this.dataInfo[k] || {};
            this.dataInfo[k][j] = data[k][j];
          }
        }
      }
    },
    updateData(data) {
      this.status = false;
      this.updateOption(data);
      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3,
              },
              name: "rect-shape",
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold",
                },
                name: "text-shape",
              });
            }
            return rect;
          },
        },
        "single-node"
      );
      var container = this.$refs.chartItem;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      console.log(width, height)
      this.graph && this.graph.destroy();
      var graph = new G6.Graph({
        container: container,
        width,
        height,
        layout: this.dataInfo.layout,
        defaultNode: this.dataInfo.defaultNode,
        defaultEdge: this.dataInfo.defaultEdge,
        nodeStateStyles: this.dataInfo.nodeStateStyles,
        modes: this.dataInfo.modes || [],
        fitView: this.dataInfo.fitView || true,
      });
      graph.data(
        {
        nodes: this.dataInfo.nodes || [],
        edges: this.dataInfo.edges || [],
      }
      );

      this.$nextTick(function () {
        this.status = true;
        graph.render();
      });
      this.graph = graph;
    },
  },
};
</script>

<style scoped>
.chartArea {
  height: 100%;
  min-height: 200px;
}
</style>
