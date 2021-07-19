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
      colors: [
        "rgb(91, 143, 249)",
        "rgb(90, 216, 166)",
        "rgb(93, 112, 146)",
        "rgb(246, 189, 22)",
        "rgb(232, 104, 74)",
        "rgb(109, 200, 236)",
        "rgb(146, 112, 202)",
        "rgb(255, 157, 77)",
        "rgb(38, 154, 153)",
        "rgb(227, 137, 163)",
      ],
      modes: {
        default: [
          {
            type: "edge-tooltip",
            formatText: function formatText(model) {
              var text =
                "source: " +
                model.sourceName +
                "<br/> target: " +
                model.targetName;
              return text;
            },
          },
        ],
      },
      defaultNode: {
        style: {
          opacity: 0.8,
          lineWidth: 1,
          stroke: "#999",
        },
      },
      dataInfo: {
        option: {},
      },
      defaultEdge: {
        size: 1,
        color: "#e2e2e2",
        style: {
          opacity: 0.6,
          lineAppendWidth: 3,
        },
      },
      type: "basic",
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
      var arr = ["nodes", "edges", "modes", "colors", "type"];
      this.dataInfo = {
        colors: { ...this.colors },
        modes: { ...this.modes },
        defaultNode: { ...this.defaultNode },
        defaultEdge: { ...this.defaultEdge },
        nodes: { ...this.nodes } ,
        edges: { ...this.edges },
        type: { ...this.type },
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
      var colors = this.colors;
      // var ty = this.dataInfo.ty;
      var container = this.$refs.chartItem;
      var width = container.scrollWidth;
      var height = container.scrollHeight || 500;
     // console.log(width,height,999999999)
      this.graph && this.graph.destroy();
      var graph = new G6.Graph({
        container: container,
        width,
        height,
        linkCenter: true,
        modes: this.dataInfo.modes || [],
        defaultNode: this.dataInfo.defaultNode,
        defaultEdge: this.dataInfo.defaultEdge,
      });
      this.change();
      let maxValue = -9999,
        minValue = 9999;
      this.dataInfo.nodes.forEach(function (n) {
        if (maxValue < n.value) maxValue = n.value;
        if (minValue > n.value) minValue = n.value;
      });
      var sizeRange = [3, 30];
      var sizeDataRange = [minValue, maxValue];
      scaleNodeProp(
        this.dataInfo.nodes,
        "size",
        "value",
        sizeDataRange,
        sizeRange
      );

      graph.data({
        nodes: this.dataInfo.nodes || [],
        edges: this.dataInfo.edges || [],
      });

      this.$nextTick(function () {
        this.status = true;
        graph.render();
      });
      function scaleNodeProp(
        nodes,
        propName,
        refPropName,
        dataRange,
        outRange
      ) {
        var outLength = outRange[1] - outRange[0];
        var dataLength = dataRange[1] - dataRange[0];
        nodes.forEach(function (n) {
          n[propName] =
            ((n[refPropName] - dataRange[0]) * outLength) / dataLength +
            outRange[0];
        });
      }
      this.graph = graph;
    },
    change() {
      if (this.dataInfo.type == "basic") {
        var colors = this.colors;
        var edges = this.dataInfo.edges;
        var nodes = this.dataInfo.nodes;
        var nodeMap = new Map();
        var clusterMap = new Map();
        let clusterId = 0;
        var n = nodes.length;
        const horiPadding = 10;
        const begin = [10, 315];
        const end = [790, 315];
        const xLength = end[0] - begin[0];
        const yLength = end[1] - begin[1];
        const xSep = xLength / n;
        const ySep = yLength / n;
        nodes.forEach(function (node, i) {
          node.x = begin[0] + i * xSep;
          node.y = begin[1] + i * ySep;
          nodeMap.set(node.id, node);
          // cluster
          if (node.cluster && clusterMap.get(node.cluster) === undefined) {
            clusterMap.set(node.cluster, clusterId);
            clusterId++;
          }
          const id = clusterMap.get(node.cluster);
          if (node.style) {
            node.style.fill = colors[id % colors.length];
          } else {
            node.style = {
              fill: colors[id % colors.length],
            };
          }
          // label
          node.label = node.name;
          node.labelCfg = {
            position: "bottom",
            offset: 5,
            style: {
              rotate: Math.PI / 2,
              textAlign: "start",
            },
          };
        });
        edges.forEach((edge) => {
          edge.type = "arc";
          var source = nodeMap.get(edge.source);
          var target = nodeMap.get(edge.target);
          var endsSepStep = (target.x - source.x) / xSep;
          var sign = endsSepStep < 0 ? -1 : 1;
          var curveOffset = sign * 10 * Math.ceil(Math.abs(endsSepStep));
          edge.curveOffset = curveOffset;
          edge.color = source.style.fill;
          edge.sourceName = source.name;
          edge.targetName = target.name;
        });
        if (typeof window !== "undefined")
          window.onresize = () => {
            if (!graph || graph.get("destroyed")) return;
            if (!container || !container.scrollWidth || !container.scrollHeight)
              return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
          };
      } else {
        var colors = this.colors;
        var origin = [225, 225];
        var radius = 160;
        var edges = this.dataInfo.edges;
        var nodes = this.dataInfo.nodes;
        var nodeMap = new Map();
        var clusterMap = new Map();
        let clusterId = 0;
        var n = nodes.length;
        var angleSep = (Math.PI * 2) / n;
        nodes.forEach(function (node, i) {
          var angle = i * angleSep;
          node.x = radius * Math.cos(angle) + origin[0];
          node.y = radius * Math.sin(angle) + origin[1];
          node.angle = angle;
          nodeMap.set(node.id, node);
          // cluster
          if (node.cluster && clusterMap.get(node.cluster) === undefined) {
            clusterMap.set(node.cluster, clusterId);
            clusterId++;
          }
          var id = clusterMap.get(node.cluster);
          if (node.style) {
            node.style.fill = colors[id % colors.length];
          } else {
            node.style = {
              fill: colors[id % colors.length],
            };
          }
          // label
          node.label = node.name;
          node.labelCfg = {
            position: "center",
            style: {
              rotate: angle,
              rotateCenter: "lefttop",
              textAlign: "start",
            },
          };
        });
        edges.forEach((edge) => {
          edge.type = "quadratic";
          var source = nodeMap.get(edge.source);
          var target = nodeMap.get(edge.target);
          edge.controlPoints = [
            {
              x: origin[0],
              y: origin[1],
            },
          ];
          edge.color = source.style.fill;
          edge.sourceName = source.name;
          edge.targetName = target.name;
        });
      }
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
