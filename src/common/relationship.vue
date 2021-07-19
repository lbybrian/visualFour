<template>
  <div v-if="isShow" ref="myContainer" class="containerArea"></div>
</template>

<script>
  import cytoscape from "cytoscape";
  import popper from "cytoscape-popper";
  cytoscape.use(popper);
  import cola from "cytoscape-cola";
  cytoscape.use(cola);
  import avsdf from "cytoscape-avsdf";
  cytoscape.use(avsdf);
  import cise from "cytoscape-cise";
  cytoscape.use(cise);
  import coseBilkent from "cytoscape-cose-bilkent";
  cytoscape.use(coseBilkent);
  import d3Force from "cytoscape-d3-force";
  cytoscape.use(d3Force);
  import dagre from "cytoscape-dagre";
  cytoscape.use(dagre);
  import euler from "cytoscape-euler";
  cytoscape.use(euler);
  import fcose from "cytoscape-fcose";
  cytoscape.use(fcose);
  import klay from "cytoscape-klay";
  cytoscape.use(klay);
  // import ngraph from "cytoscape-ngraph.forcelayout";
  // var cyforcelayout = require('cytoscape-ngraph.forcelayout');
  // cyforcelayout(cytoscape);
  // cytoscape.use(ngraph);
  // import klay from "cytoscape-klay";
  // cytoscape.use(klay);
  import spread from "cytoscape-spread";
  cytoscape.use(spread);
  import springy from "cytoscape-springy";
  cytoscape.use(springy);

  export default {
    name: "",
    beforeMount() {
      this.all = this.produceRandomElements(500, 2590);
      this.filterData();
      // for (var k in this.dataObj) {
      //   this.data[k] = this.dataObj[k];
      // }
      if (this.dataObj && this.dataObj.popper) {
        this.popperTip.callback = this.dataObj.popper;
      }
    },
    data() {
      return {
        isShow: true,
        popperTip: "",
        data: {
          current: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 112, 113, 114, 115, 116, 117, 118, 102, 103,
            104, 105, 106, 107, 108
          ],
          nodes: [],
          edges: [],
          map: {
            id: "id",
            label: "label",
            source: "source",
            target: "target",
            image: "image",
          },
          layout: {
            name: "fcose",
            padding: 5,
            nodeSeparation: 2,
            idealEdgeLength: 2,
            gravity: 2
          },
          labelSelector: {
            node: {
              "label": "data(label)",
              "height": 5,
              "width": 5,
              "padding": "5px",
              'border-width': 1,
              "background-color": "#fff",
              "border-color": "rgb(106, 176, 184)",
              'background-image': "data(image)",
              'background-fit': 'contain',
              "color": "#999",
              "text-valign": "bottom",
              "z-index": 3,
              "font-size": 8,
              "text-margin-y": 1,
            },
            edge: {
              "curve-style": "bezier",
              "width": 0.2,
              "line-color": "#aaaaaa",
              "font-size": 6,
              "label": "data(label)",
              "color": "#666666",
              "text-max-width": 10,
              "text-wrap": "wrap",
              "arrow-scale": 0.2,
              "target-arrow-shape": "vee",
              "text-overflow-wrap": "whitespace",
              "edge-text-rotation": "autorotate",
            },
          },
          idSelector: {
            1: {
              "border-color": "red"
            },
          },
          style: [],
          option: {
            zoom: 1,
            minZoom: 1,
            maxZoom: 10,
          },
        },
      };
    },
    mounted() {
      this.$nextTick(function () {
        this.initChart();
      });
    },
    beforeDestroy() {
      this.popperRemove();
    },
    methods: {
      updateData(newObj) {
        this.isShow = false;
        this.$nextTick(function () {
          this._updateData(newObj);

          this.isShow = true;
          this.$nextTick(function () {
            this.initChart();
          });
        });
      },
      showRelatedItems(node) {
        var edges = this.cy.$(node).connectedEdges();
        edges.style("opacity", 1);
        var nodes = edges.connectedNodes();
        nodes.style("opacity", 1);
        node.style("opacity", 1);
      },
      heighlightCurrentRelated(node) {
        this.hideAllElements(node);
        this.showRelatedItems(node);
      },
      hideAllElements(node) {
        var opacity = 0.1;
        this.cy.nodes().style("opacity", opacity);
        this.cy.edges().style("opacity", opacity);
      },
      showAllElements() {
        var opacity = 1;
        this.cy.nodes().style("opacity", opacity);
        this.cy.edges().style("opacity", opacity);
      },
      produceRandomElements(n, m) {
        this.data.nodes = [];
        this.nodeMap = {};
        for (var i = 0; i < n; i++) {
          var item = {
            id: i + "",
            label: "N-" + i,
            image: "/static/images/test.png"
          };
          this.data.nodes.push(item);
          this.nodeMap[item.id] = item;
        }
        if (m) {
          this.data.edges = [];
          for (i = 0; i < m; i++) {
            var temp1 = Math.floor(Math.random() * 10000) % n;
            var temp2 = Math.floor(Math.random() * 10000) % n;
            var item = {
              id: temp1 + "-" + temp2,
              target: temp1 + "",
              source: temp2 + "",
              label: "关注",
            };
            this.data.edges.push(item);
          }
        }
        return {
          nodes: this.data.nodes,
          edges: this.data.edges
        }
      },
      switchRelation(id) {
        if (!id || !this.nodeMap[id]) {
          this.filterData();
          this.initChart();
          return false;
        }

        this.data.nodes = [this.nodeMap[id]];
        this.data.edges = [];
        var eArr = this.all.edges;
        for (var i = 0; i < eArr.length; i++) {
          var edge = eArr[i];
          if (edge.source === id || edge.target === id) {
            if (edge.source === id) {
              this.data.nodes.push(this.nodeMap[edge.target])
            } else {
              this.data.nodes.push(this.nodeMap[edge.source])
            }
            this.data.edges.push(edge);
          }
        }
        this.initChart();
      },
      filterData() {
        if (this.data.current.constructor.name === "Array") {
          var tMap = this.data.current;
          this.currentMap = {};
          for (var i = 0; i < tMap.length; i++) {
            this.currentMap[tMap[i]] = [];
          }
        } else {
          this.currentMap = this.data.current || {};
        }
        this.data.nodes = [];
        for (var i = 0; i < this.all.nodes.length; i++) {
          var node = this.all.nodes[i];
          if (this.currentMap[node.id]) {
            this.data.nodes.push(this.all.nodes[i]);
          }
        }
        this.data.edges = [];
        for (var i = 0; i < this.all.edges.length; i++) {
          var edge = this.all.edges[i];
          if (this.currentMap[edge.source] && this.currentMap[edge.target]) {
            this.data.edges.push(edge);
          }
        }
      },
      _updateData(newObj) {
        for (var k in newObj) {
          this.$set(this.data, k, newObj[k]);
        }
      },
      initElements() {
        this.param.elements = [];
        var idMap = {};
        for (var i = 0; i < this.data.nodes.length; i++) {
          var tData = this.data.nodes[i];
          if (this.data.map) {
            for (var k in this.data.map) {
              if (this.data.map[k] && tData[this.data.map[k]] !== undefined) {
                tData[k] = tData[this.data.map[k]];
              }
            }
          }
          if (tData.id) {
            idMap[tData.id] = tData;
            var item = {
              data: tData,
            };
            this.param.elements.push(item);
          }
        }
        for (var i = 0; i < this.data.edges.length; i++) {
          var tData = this.data.edges[i];
          if (this.data.map) {
            for (var k in this.data.map) {
              if (this.data.map[k]) {
                tData[k] = tData[this.data.map[k]] || this.data.map[k];
              }
            }
          }
          if (tData.target && tData.source) {
            if (!idMap[tData.target]) {
              var node = {
                data: {
                  id: tData.target,
                },
              };
              idMap[tData.target] = node;
              this.param.elements.push(node);
            }
            if (!idMap[tData.source]) {
              var node = {
                data: {
                  id: tData.source,
                },
              };
              idMap[tData.source] = node;
              this.param.elements.push(node);
            }
            var item = {
              data: tData,
            };
            this.param.elements.push(item);
          }
        }
      },
      initStyle() {
        this.param.style = [];
        for (var k in this.data.labelSelector) {
          var item = {
            selector: k,
            style: this.data.labelSelector[k],
          };
          this.param.style.push(item);
        }
        for (var k in this.data.idSelector) {
          var item = {
            selector: "#" + k,
            style: this.data.idSelector[k],
          };
          this.param.style.push(item);
        }

        if (this.data.style && this.data.style.length > 0) {
          this.param.style = this.param.style.concat(this.data.style);
        }
      },
      initChart() {
        this.param = this.param || {};
        this.param.container = this.$refs.myContainer;
        this.param.layout = this.data.layout;
        for (var k in this.data.option) {
          this.param[k] = this.data.option[k];
        }
        this.initStyle();
        this.initElements();
        this.cy = cytoscape(this.param);
        var _self = this;

        this.$emit("inited", this.cy, this);

        var popperUpdate = function () {
          _self.popperUpdate();
        };

        this.cy.nodes().off("click");
        this.cy.nodes().on("click", function (e) {
          var currentNode = e.target;
          _self.$emit("node-click", currentNode.data(), currentNode, _self.cy, _self);
          var d = currentNode.data();
          _self.popperRemove();
          _self.switchRelation(d.id);
          e.stopPropagation();
        });

        this.cy.on("click", function (e) {
          var current = e.target;
          console.log(current);
          _self.switchRelation();
        });

        this.cy.edges().off("click");
        this.cy.edges().on("click", function (e) {
          var currentNode = e.target;
          _self.$emit("edge-click", currentNode.data(), currentNode, _self.cy, _self);
        });

        this.cy.nodes().off("mouseover");
        this.cy.nodes().on("mouseover", function (e) {
          var currentNode = e.target;
          _self.popperRemove();
          currentNode.off("position");
          currentNode.on("position", popperUpdate);
          _self.$emit("node-hover", currentNode.data(), currentNode, _self);
          _self.heighlightCurrentRelated(currentNode);
        });

        this.cy.edges().off("mouseover");
        this.cy.edges().on("mouseover", function (e) {
          var currentNode = e.target;
          _self.$emit("edge-hover", currentNode.data(), currentNode, _self);
        });

        this.cy.nodes().on("mouseout", function (e) {
          var currentNode = e.target;
          _self.popperRemove();
          _self.showAllElements();
        });

        this.cy.on("pan zoom resize", popperUpdate);
      },
      popperUpdate() {
        if (this.popperTip && this.popperTip.scheduleUpdate) {
          this.popperTip.scheduleUpdate();
        }
      },
      popperRemove() {
        if (
          this.popperTip &&
          this.popperTip.destroy &&
          this.popperTip.popper.parentNode
        ) {
          this.popperTip.destroy();
          this.popperTip.popper.parentNode.removeChild(this.popperTip.popper);
        }
      },
    },
    created() {},
    props: {
      dataObj: Object,
    },
  };

</script>

<style scoped>
  .containerArea {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
  }

</style>
