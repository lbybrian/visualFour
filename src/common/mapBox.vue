<template>
  <div>
    <div ref="basicMapbox" :style="cssType || 'width:100%;height:450px;'"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
export default {
  name: 'mapbox',
  props: {
    cssType: Object,
  },
  data() {
    return {
      dataObj: {
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description: '',//描述
              },
              geometry: {
                type: 'Point',
                coordinates: [],//坐标
              },
            },
          ],
        },
        lineBox:{
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                color: '#F7455D',
                // iconSize: [45, 45],
              },
              geometry: {
                type: 'LineString',
                coordinates: [
                  // [133.28, 22.54],
                  // [136.88, 26.54],
                  // [140.28, 30.54],
                  // [142.88, 34.54],
                  // [144.28, 31.54],
                ],
              },
            },
          ],
        },
        center: [121.4333, 34.5],
        pointsVisibility:'visible',
        lineSvisibility:'visible',
        zoom:4,
      },
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    // 初始化
    init() {
      let that = this
      mapboxgl.accessToken =
        'pk.eyJ1Ijoia3hzNTU1IiwiYSI6ImNraW9kM2FkMjE5c3YycWxiZnRjaWJnb2MifQ.QlQsQo9VBaaNCmGRbUUTBg' //引用官方地图，账户Token
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox, // 内容展示区域
        style: 'mapbox://styles/kxs555/cki5l0a6t6a4n19p5knj7cmnw', //地图的 Mapbox 配置样式，详见官方文档。方式一：官方地图
        // style: {//方式二：离线地图
        //   version: 8,//样式规范版本号必须为8，不能更改
        //   sources: {},//资源此处资源和图层在load里加载
        //   layers: []//图层
        // },
        center: that.dataObj.center, //地图展示中心点
        zoom: that.dataObj.zoom, //初始缩放比
        dragRotate: false, //禁止鼠标右键旋转地图
      })
      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: 'zh' }) //初始化语言为中文zh
      map.addControl(language) //添加到地图
      //画锚点--start
      var size = 35
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },
        render: function () {
          var duration = 1000
          var t = (performance.now() % duration) / duration
          var radius = (size / 2) * 0.3
          var outerRadius = (size / 2) * 0.5 * t + radius
          var context = this.context

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height)
          context.beginPath()
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          )
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
          context.fill()
          // draw inner circle
          context.beginPath()
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
          context.fillStyle = '#ff0202'
          context.strokeStyle = 'white'
          context.lineWidth = 1 + 4 * (1 - t)
          context.fill()
          context.stroke()
          this.data = context.getImageData(0, 0, this.width, this.height).data
          map.triggerRepaint()
          return true
        },
      }
      //画锚点--end

      //地图所需资源加载
      map.on('load', function () {
        //mapBox添加离线地图资源--start
        // 此处为加载离线mapBox地图（服务器地图）
        // map.addSource("google.tile", {
        //   type: "raster",
        //   tiles: ["http://21.5.4.203:8085/MapServer?lyr=sh&x={x}&y={y}&z={z}"],//离线部署地址
        //   tileSize: 256
        // });
        // map.addLayer({
        //   id: "google",
        //   type: "raster",
        //   source: "google.tile",
        // });
        //mapBox添加离线地图资源--end

        // 加载锚点--start
        map.addImage('pulsing-dot', pulsingDot)
        map.addSource('points', {
          //第一个参数对应addLayer的id
          type: 'geojson',
          data: that.dataObj.geojson,
        })
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'points',
          layout: {
            'visibility': that.dataObj.pointsVisibility, //显示visible，隐藏none
            'icon-image': 'pulsing-dot', //对应addImage第一个参数
            'icon-allow-overlap': false, //是否可以重叠
          },
        })
        //加载锚点--end

        //添加线条 --start
        map.addSource('lineSS', {
          type: 'geojson',
          data: that.dataObj.lineBox,
        })
        map.addLayer({
          id: 'lineSS',
          type: 'line',
          source: 'lineSS',
          layout: {
            'visibility': that.dataObj.lineSvisibility, //显示visible，隐藏none
            'line-join': 'round',
            'line-cap': 'round',
            // 'icon-allow-overlap': false,
          },
          paint: {
            'line-color': '#F7455D',
            'line-width': 2,
          },
        })
        //添加线条 --end
        //加载浮点信息提示--start
        const popup = new mapboxgl.Popup({
          closeButton: false, //信息弹窗右上角关闭按钮
          closeOnClick: false, //点击地图关闭弹窗
        })
        //获取焦点触发
        map.on('mouseenter', 'points', function (e) {
          map.getCanvas().style.cursor = 'pointer'
          var coordinates = e.features[0].geometry.coordinates.slice()
          var description = e.features[0].properties.description
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
          popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })
        //失去焦点触发
        map.on('mouseleave', 'points', function () {
          map.getCanvas().style.cursor = ''
          popup.remove()
        })
        //加载浮点信息提示--end
      })
    },
    //数据更新
    dataUpdate(geo) {
      this.dataObj.lineBox.features[0].geometry.coordinates=[]
      if (geo && geo.geojson.length > 0) {
        for (let i = 0; i < geo.geojson.length; i++) {
          this.dataObj.geojson.features[i] = {
            type: 'Feature',
            properties: {
              description: geo.geojson[i].time + geo.geojson[i].description,
            },
            geometry: {
              type: 'Point',
              coordinates: geo.geojson[i].coordinates,
            },
          }
          this.dataObj.lineBox.features[0].geometry.coordinates.push(geo.geojson[i].coordinates)
        }
        console.log(this.dataObj.lineBox)
        this.dataObj.pointsVisibility = geo.pointsVisibility
        this.dataObj.lineSvisibility = geo.lineSvisibility
        this.dataObj.zoom = geo.zoom
        // this.dataObj.center = this.dataObj.geojson.features[0].geometry.coordinates
        this.init()
      }
    },
  },
}
</script>

<style scoped>
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>
