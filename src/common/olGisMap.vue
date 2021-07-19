<template>
  <div>
    <div ref="gisMap"
         id="gisMap"
         :style="cssType || 'width:100%;height:400px;'"></div>
    <!-- 弹框 -->
    <div id="popup"
         v-show="showPopupFlag">
      <div class="popupCon">{{description}}</div>
      <div class="arrow">
        <div class="arrows"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControls, FullScreen, ScaleLine, ZoomSlider } from 'ol/control.js';
import Projection from 'ol/proj/Projection';
import { fromLonLat } from 'ol/proj';
import { LineString, MultiPolygon, Point, Polygon } from "ol/geom";
import Feature from "ol/Feature";
import { Heatmap as HeatmapLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Overlay from "ol/Overlay";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from "ol/style";
import { transform } from "ol/proj";
import smooth from "chaikin-smooth";
import { log } from '@antv/g2plot/lib/utils';
import animationIcon from "@/assets/image/animation.png";
import icon from "@/assets/image/icon.png";

export default {
  name: 'olgismap',
  props: {
    cssType: Object,
  },
  data () {
    return {
      map: '',
      showPopupFlag: false,
      description: '',
      time: null,
      pointTime: null,
      dataObj: {
        center: [103.00, 36.00],
        zoom: 4,
        minZoom: 2,
        maxZoom: 19,
      },
      typeArr: ['point', 'line', 'linePoint', 'animationLine', 'animationPoint', 'icon', 'breathe', 'polygon'],
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.init();
      this.showPopup();
    })
  },
  methods: {
    //地图初始化
    init () {
      let that = this;
      //地图的基础配置
      this.map = new Map({
        target: 'gisMap',
        //新建视图
        view: new View({
          //设置中心点，将转换坐标点经度/纬度转换为其他投影，默认值为Web Mercator，即“ EPSG：3857”。
          center: fromLonLat(that.dataObj.center),
          //设置缩放级别
          zoom: that.dataObj.zoom || 4,
          //设置最小缩放级别
          minZoom: that.dataObj.minZoom || 2,
          //设置最大缩放级别
          maxZoom: that.dataObj.maxZoom || 19,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          // 使用谷歌地图或者本地地图
          // new TileLayer({
          //   source: new XYZ({
          //     url: 'http://10.170.130.230:8091/server/map/{x}/{y}/{z}'
          //     // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
          //   })
          // }),
          // new TileLayer({
          //   source: new XYZ({
          //     url: 'http://10.170.130.230:8091/server/mapImage/{x}/{y}/{z}'
          //     // url: "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G",
          //   })
          // }), 
        ],
      });
    },

    //Popup弹框
    showPopup () {
      let that = this;
      let map = that.map;
      var element = document.getElementById("popup");
      let popup = this.addOverlay(map, element);
      //鼠标的悬浮效果
      map.on('pointermove', function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        that.showPopupFlag = true;
        var feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
          return feature;
        });
        if (feature && feature.values_.description) {
          that.showPopupFlag = false;
          popup.setPosition(e.coordinate);
          that.showPopupFlag = true;
          that.description = feature.get("description");
        } else {
          that.showPopupFlag = false;
        }
      });
    },

    //添加Popup图层到map中
    addOverlay (map, element) {
      var popup = new Overlay({
        element: element,
        positioning: "bottom-center",
        stopEvent: true,
        offset: [0, -20]
      });
      map.addOverlay(popup);
      return popup;
    },

    //画点的逻辑
    showPoint (data, map, id) {
      let features = [];
      //数据处理 创建feature
      data.features.forEach(item => {
        let location = fromLonLat(item.coordinates);
        let feature = new Feature({
          geometry: new Point(location),
          title: item.title,
          description: item.description,
          color: item.color,
          id: Math.ceil(Math.random() * 1000)
        });
        features.push(feature);
      });
      //坐标点样式设置
      const styleFunction = function (feature, resolution) {
        const properties = feature.getProperties();
        const color = properties.color;
        let image = new CircleStyle({
          fill: new Fill({
            //mark点的颜色
            color: color ? color : "red",
          }),
          stroke: new Stroke({
            color: "white",
            //mark点的外边阴影大小  颜色可以使用rgba设置透明度
            width: 2
          }),
          //mark点的大小
          radius: 6
        });
        const styleConf = {
          image: image
        };
        //需要描述时展示
        if (properties.title) {
          styleConf.text = new Text({
            text: properties.title,
            font: "bold 12px Arial,x-locale-body,sans-serif",
            fill: new Fill({
              color: "#fff"
            }),
            backgroundFill: new Fill({
              color: "rgba(37, 155, 163, 0.9)"
            }),
            backgroundStroke: new Stroke({
              width: 1,
              color: "#33ffff"
            }),
            padding: [5, 5, 5, 5],
            offsetY: 22,
            rotateWithView: true
          });
        }
        let style = new Style(styleConf);
        return style;
      };
      //坐标点填充到地图上
      var source = new VectorSource({});
      var vector = new VectorLayer({
        source: source,
        style: styleFunction,
        //每个人layer层 id唯一
        id: id
      });
      source.addFeatures(features);
      map.addLayer(vector);
    },

    //画线的逻辑
    showLine (data, map, id, animation) {
      let features = [];
      let linePointFeatures = [];
      data.features.forEach(temp => {
        let coors = [];
        for (let index = 0; index < temp.lineData.length; index++) {
          let location = fromLonLat(temp.lineData[index].coordinates);
          coors.push(location);
          //创建点的feature
          let setPointFeature = function () {
            let linePointFeature = new Feature({
              geometry: new Point(location),
              title: temp.lineData[index].title,
              description: temp.lineData[index].description,
              color: temp.lineColor,
              id: Math.ceil(Math.random() * 1000)
            });
            linePointFeatures.push(linePointFeature);
          }
          //是动画的话只取首尾两个点
          if (animation) {
            if (index == 0 || index == temp.lineData.length - 1) {
              setPointFeature();
            }
          } else {
            setPointFeature();
          }
        };
        //是动画的话 点做平滑处理
        if (animation) {
          for (let index = 0; index < 5; index++) {
            coors = smooth(coors);
          }
        }
        const lineFeature = new Feature({
          geometry: new LineString(coors),
          color: temp.lineColor,
          description: temp.lineTitle,
          id: Math.ceil(Math.random() * 1000)
        });
        features.push(lineFeature);
      });
      //需要时 可设置成虚线样式
      // function resizeArray(start, end) {
      //   return Array.from(new Array(end + 1).keys()).slice(start);
      // }
      //坐标点样式设置
      const styleFunction = function (feature, resolution) {
        const properties = feature.getProperties();
        // let array = resizeArray(1, parseInt(60 / map.getView().getZoom()));
        const color = properties.color;
        let stroke = new Stroke({
          //需要时 可设置虚线
          // lineDash: array,
          width: 3,
          color: color ? color : "red"
        })
        const styleConf = {
          stroke: stroke
        };
        // 需要描述时展示
        // if (properties.description) {
        //   styleConf.text = new Text({
        //     text: properties.description,
        //     font: "bold 12px Arial,x-locale-body,sans-serif",
        //     fill: new Fill({
        //       color: "#fff"
        //     }),
        //     backgroundFill: new Fill({
        //       color: "rgba(37, 155, 163, 0.9)"
        //     }),
        //     backgroundStroke: new Stroke({
        //       width: 1,
        //       color: "#33ffff"
        //     }),
        //     padding: [5, 5, 5, 5],
        //     offsetY: 22,
        //     rotateWithView: true
        //   });
        // }
        let style = new Style(styleConf);
        return style;
      };
      //坐标点填充到地图上
      var source = new VectorSource({});
      var vector = new VectorLayer({
        source: source,
        style: styleFunction,
        id: id
      });
      source.addFeatures(features);
      map.addLayer(vector);
      this.showLinePoint(linePointFeatures, map);
    },

    //画线上的点的逻辑
    showLinePoint (data, map) {
      //坐标点样式设置
      const styleFunction = function (feature, resolution) {
        const properties = feature.getProperties();
        const color = properties.color;
        let image = new CircleStyle({
          fill: new Fill({
            //mark点的颜色
            color: color ? color : "red",
          }),
          stroke: new Stroke({
            color: "white",
            width: 2
          }),
          radius: 4
        });
        const styleConf = {
          image: image
        };
        let style = new Style(styleConf);
        return style;
      };
      //坐标点填充到地图上
      var source = new VectorSource({});
      var vector = new VectorLayer({
        source: source,
        style: styleFunction,
        id: "linePoint"
      });
      source.addFeatures(data);
      map.addLayer(vector);
    },

    //画图标按轨迹运动的逻辑
    showAnimation (map) {
      let obj = {};
      //先把图标的layer 添加到map中
      this.setLayerStyleAnimationPoint(map, "animationPoint");
      clearInterval(this.time);
      let pointLayer = this.getLayer("animationPoint");
      let features = this.getLayer("animationLine").getSource().getFeatures();
      if (features.length > 0) {
        //利用计时器循环清除点的layer中已添加的图标feature  再重新添加下一个坐标点的feature
        this.time = setInterval(evt => {
          pointLayer.getSource().clear();
          let points = [];
          for (let i = 0; i < features.length; i++) {
            let feature = features[i];
            if (!obj[feature.ol_uid] || obj[feature.ol_uid].count == obj[feature.ol_uid].length) {
              obj[feature.ol_uid] = {};
              obj[feature.ol_uid].count = 0;
              obj[feature.ol_uid].length = feature.getGeometry().getCoordinates().length - 1;
            }
            let point = feature.getGeometry().getCoordinates()[obj[feature.ol_uid].count + 1];
            points.push(this.timeDataHandle(feature, point, obj));
            obj[feature.ol_uid].count++;
          }
          pointLayer.getSource().addFeatures(points);
        }, 40);
      }
    },

    //创建新的图标 feature
    timeDataHandle (feature, point, obj) {
      return new Feature({
        geometry: new Point(
          feature.getGeometry().getCoordinates()[obj[feature.ol_uid].count]
        ),
        id: feature.values_.id,
        point: point,
      });
    },

    //动画上的图标的样式
    setLayerStyleAnimationPoint (map, layerId) {
      let styleFunction = function (feature, resolution) {
        var geometry = feature.getGeometry().getCoordinates();
        const properties = feature.getProperties();
        let point = properties.point;
        //转换做成经纬度
        let pointFirst = transform(geometry, "EPSG:3857", "EPSG:4326");
        let pointNext = transform(point, "EPSG:3857", "EPSG:4326");
        let x = pointFirst[0] - pointNext[0];
        let y = pointFirst[1] - pointNext[1];
        //计算方向角  改变图标方向
        var rotation = Math.atan2(y, x);
        let style = {};
        let image = new Icon({
          src: animationIcon,
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        });
        if (map.getView().getZoom() <= 4) {
          //改变图标大小
          image.setScale(0.6);
        }
        style = new Style({
          image: image
        });
        return style;
      };
      var source = new VectorSource();
      let layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: layerId
      });
      //设置layer层级
      layer.setZIndex(4);
      map.addLayer(layer);
    },

    //地图上显示图标
    showIcon (data, map, id) {
      let features = [];
      data.features.forEach(item => {
        let location = fromLonLat(item.coordinates);
        let feature = new Feature({
          geometry: new Point(location),
          description: item.description,
          color: item.color,
          id: Math.ceil(Math.random() * 1000)
        });
        features.push(feature);
      });
      const styleFunction = function (feature, resolution) {
        const properties = feature.getProperties();
        const color = properties.color;
        let image = new Icon({
          src: icon,
          anchor: [0.5, 0.5],
        });
        //可以通过地图缩放级别改变图标的缩放比例
        image.setScale(
          0.15 * map.getView().getZoom() > 1
            ? 1
            : 0.15 * map.getView().getZoom()
        );
        const styleConf = {
          image: image
        };
        let style = new Style(styleConf);
        return style;
      };
      var source = new VectorSource({});
      var vector = new VectorLayer({
        source: source,
        style: styleFunction,
        id: id
      });
      source.addFeatures(features);
      map.addLayer(vector);
    },

    //地图上显示呼吸效果
    showBreathe (data, map, id) {
      let start = 10;
      let features = [];
      //处理数据 创建feature
      data.features.forEach(item => {
        let location = fromLonLat(item.coordinates);
        let feature = new Feature({
          geometry: new Point(location),
          description: item.description,
          color: item.color,
          id: Math.ceil(Math.random() * 1000)
        });
        features.push(feature);
      });
      this.setBreatheStyle(map, id);
      let breatheLayer = this.getLayer(id);
      clearInterval(this.pointTime);
      if (features.length > 0) {
        //利用计时器循环清除点的layer中已添加的图标feature  再重新添加下一个坐标点的feature
        this.pointTime = setInterval(() => {
          breatheLayer.getSource().clear();
          start = start + 5;
          if (start >= 35) {
            start = 10;
          }
          let points = this.BreatheHandle(features, start);
          breatheLayer.getSource().addFeatures(points);
        }, 300);
      }
    },

    //地图上显示呼吸效果的样式
    setBreatheStyle (map, id) {
      let styleFunction = function (feature, resolution) {
        let properties = feature.getProperties();
        // 改变圆半径
        const radius = properties.diff;
        // 改变圆的颜色、透明度
        var colorDiff = parseInt(properties.colorDiff);
        let opacity = 1 - properties.diff / 35;
        let color = "rgba(255, 0, 0, " + opacity + ")";
        if (colorDiff == 1) {
          color = "rgba(0,128,0, " + opacity + ")";
        }
        if (colorDiff == 2) {
          color = "rgba(255,255,0, " + opacity + ")";
        }
        if (colorDiff == 3) {
          color = "rgba(255, 0, 0, " + opacity + ")";
          opacity = opacity + 2;
        }
        let styleConf = {
          image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
              color: color,
              width: 0
            }),
            fill: new Fill({
              color: color
            })
          })
        };
        let style = new Style(styleConf);
        return style;
      };
      var source = new VectorSource();
      let layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: id
      });
      layer.setZIndex(2);
      map.addLayer(layer);
    },

    //创建不同半径圆的feature
    BreatheHandle (pointFeatures, diff) {
      return pointFeatures.map(item => {
        const properties = item.getProperties();
        var flashGeom = item.getGeometry().clone();
        return new Feature({
          geometry: flashGeom,
          colorDiff: properties.color,
          description: properties.description,
          diff: diff,
          id: Math.ceil(Math.random() * 1000)
        });
      });
    },

    //展示多边形的逻辑
    showPolygon (data, map, id) {
      let features = [];
      data.features.forEach(temp => {
        let coors = [];
        for (let index = 0; index < temp.lineData.length; index++) {
          let location = fromLonLat(temp.lineData[index].coordinates);
          coors.push(location);
        };
        const polygonFeature = new Feature({
          //多边形的geojson是3层数组
          geometry: new Polygon([coors]),
          description: temp.polygonDescription,
          lineColor: temp.lineColor,
          coverColor: temp.coverColor,
          id: Math.ceil(Math.random() * 1000)
        });
        features.push(polygonFeature);
      });
      let styleFunction = function (feature, resolution) {
        let properties = feature.getProperties();
        let styleConf = {
          //面的颜色
          fill: new Fill({
            color: properties.coverColor
              ? properties.coverColor
              : "rgba(166,157,99, 0.6)"
          }),
          //线的颜色
          stroke: new Stroke({
            width: 2,
            color: properties.lineColor
              ? properties.lineColor
              : "rgba(136, 38, 179, 1)"
          })
        };
        let style = new Style(styleConf);
        return style;
      };
      var source = new VectorSource({});
      let layer = new VectorLayer({
        source: source,
        style: styleFunction,
        id: id
      });
      layer.getSource().addFeatures(features)
      map.addLayer(layer);
    },

    //通过id获取图层
    getLayer (layerId) {
      var layers = this.map.getLayers().getArray();
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].getProperties().id === layerId) {
          return layers[i];
        }
      }
    },

    //移除地图上除popup图层的其他图层
    removerLayers () {
      //清除动画的定时器
      clearInterval(this.time);
      clearInterval(this.pointTime);
      this.typeArr.forEach(item => {
        if (this.getLayer(item)) {
          let layer = this.getLayer(item);
          this.map.removeLayer(layer);
        }
      })
    },

    //数据更新
    dataUpdate (geo) {
      this.$nextTick(function () {
        if (geo.center != this.dataObj.center)
          this.map.getView().setCenter(fromLonLat(geo.center));
        if (geo.zoom != this.dataObj.zoom)
          this.map.getView().setZoom(geo.zoom);
        if (geo.minZoom != this.dataObj.minZoom)
          this.map.getView().setMinZoom(geo.minZoom);
        if (geo.maxZoom != this.dataObj.maxZoom)
          this.map.getView().setMaxZoom(geo.maxZoom);
        this.removerLayers();
        geo.geojson.forEach(item => {
          if (item.type == 'point')
            this.showPoint(item, this.map, "point");
          if (item.type == 'line')
            this.showLine(item, this.map, "line");
          if (item.type == 'animation') {
            this.showLine(item, this.map, "animationLine", true);
            this.showAnimation(this.map)
          }
          if (item.type == 'icon')
            this.showIcon(item, this.map, "icon");
          if (item.type == 'polygon')
            this.showPolygon(item, this.map, "polygon");
          if (item.type == 'breathe')
            this.showBreathe(item, this.map, "breathe");
        })
      })
    }

  },
  destroyed () {
    //清除动画的定时器
    clearInterval(this.time);
    clearInterval(this.pointTime);
  },
}
</script>

<style scoped>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
#popup {
  position: relative;
}
#popup .popupCon {
  max-width: 420px;
  overflow: hidden;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: bold;
  background: rgba(37, 155, 163, 0.9);
  border: 1px solid #33ffff;
  color: white;
}
#popup .arrow {
  position: relative;
}
#popup .arrows {
  position: absolute;
  left: 50%;
  margin-left: -8px;
  width: 0;
  margin-top: 0px;
  height: 0;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-top: 8px solid #33ffff;
}
</style>

