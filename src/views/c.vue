<style>
.ol-control button {
  height: 2em;
  width: 2em;
}

.rightWeather {
  right: 0.5em;
  top: 0.5em;
  z-index: 99999999;
}

.rightBottomWeather {
  right: 0.5em;
  bottom: 0.5em;
}

.ol-control.ol-profil table {
  display: none;
}

.options .ol-profilbar, .options .ol-profilcursor::before {
  background-color: blue;
}
</style>
<template>
  <div class="ginger" :key="mapKey">
    <div id="map" ref="rootmap" :style="mapS">
      <div id="myposition"
           style="position:absolute;z-index:99;left:10px;display:block;bottom:10px;font-weight: bold;font-size: 15px;"></div>
      <div id="app-right-top">
        <div id="user-center" class="ui3-user-center-wrap" style="visibility: visible;margin-top: -69px"
             v-on:click="initialization()">
          <div class="avatar-abstract"></div>
        </div>
        <div id="message-center" class="has-message" style="right: 50px;margin-top: -69px">
          <div class="message-center-entrance">
            <div class="message-center-entrance-child">
              <el-date-picker
                  style="width: 130px;margin-top: 3px;left: 12px"
                  size="mini"
                  v-model="value1"
                  type="date"
                  :editable="false"
                  :clearable="false"
                  :picker-options="pickerOptions"
                  value-format="yyyyMMdd"
                  align="center"
                  placeholder="">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div id="left-panel" class="" style="height: 809px;display: block;margin-top: -42px">
        <div id="searchbox" class="clearfix">
          <div id="searchbox-container" style="width: 288px">
            <div id="sole-searchbox-content" class="searchbox-content" style="width: 288px">
              <input id="sole-input" class="searchbox-content-common" type="text" name="word" autocomplete="off"
                     maxlength="256" placeholder="请（模糊）输入公司名称 . . ." value=""
                     style="font-size: 13px;font-family: STHeiti;background:#FFFFFF url('/images/mapMain6.png') -7px 3px no-repeat; padding-left:35px;width: 248px"/>
              <div id="input-clear-id" class="input-clear" title="清空" style="display: none;right: 40px"
                   onclick="inputclearfun()"></div>
              <div class="searchbox-content-button right-button route-button loading-button" data-title="路线"
                   data-tooltip="2" @click="enter13()"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="nanhaiDiv" style="display: block;position: absolute;z-index: 99999;bottom: 10px;right:10px">
        <img id="nanhaiId" src="@/assets/images/南沙群岛.jpg" width="100" height="150"/>
      </div>
      <div id="tuliDiv"
           style="display: block;position: absolute;z-index: 99999;bottom: 35px;left:10px;width: 340px;height: 330px;">
        <table class="gridtable-tl">
          <tr style="height: 40px">
            <td>用电类别</td>
            <td>图示</td>
            <td>预警级别</td>
          </tr>
          <tr>
            <td>余气发电</td>
            <td style="padding: 3px"><img src="@/assets/images/余气发电.png" width="32" height="32"/></td>
            <td rowspan="7" align="center">
              <div
                  style="height: 275px;width: 20px;background: linear-gradient(to bottom, green, yellow, orange, red);">
                <el-slider v-model="sliderModel" vertical height="275px" style="margin-left: -9px;"
                           :show-tooltip="false" @change="sliderChange"></el-slider>
              </div>
            </td>
          </tr>
          <tr>
            <td>余热发电</td>
            <td style="padding: 3px"><img src="@/assets/images/余热发电.png" width="32" height="32"/></td>
          </tr>
          <tr>
            <td>光伏发电</td>
            <td style="padding: 3px"><img src="@/assets/images/光伏发电.png" width="32" height="32"/></td>
          </tr>
          <tr>
            <td>分布式光伏</td>
            <td style="padding: 3px"><img src="@/assets/images/分布式光伏.png" width="32" height="32"/></td>
          </tr>
          <tr>
            <td>火电</td>
            <td style="padding: 3px"><img src="@/assets/images/火电.png" width="32" height="32"/></td>
          </tr>
          <tr>
            <td>生物质发电</td>
            <td style="padding: 3px"><img src="@/assets/images/生物质发电.png" width="32" height="32"/></td>
          </tr>
          <tr>
            <td>风力发电</td>
            <td style="padding: 3px"><img src="@/assets/images/风力发电.png" width="32" height="32"/></td>
          </tr>
        </table>
      </div>
    </div>
    <div id="poInfoBase" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.4);padding: 2px;">
      <table class="gridtable">
        <template v-for="(value,key) in baseDataChecked">
          <tr>
            <td style="text-align: center"><span class="baseSpan">{{ key }}</span></td>
            <td style="text-align: center"><span class="baseSpan">{{ value }}</span></td>
          </tr>
        </template>
      </table>
    </div>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="80%">
      <el-table
          size="mini"
          height="397"
          :data="tableData.slice((pageNo-1)*pageSize,pageNo*pageSize)"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column v-for="(item,index) in tableColumn" :prop="item.prop" :label="item.label" :key="index.key"
                         align="center"></el-table-column>
      </el-table>
      <el-pagination
          style="margin-top: 15px;margin-bottom: 10px"
          background
          layout="->, prev, pager, next, total"
          :current-page="pageNo"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import "ol/ol.css"
import "@/config/baiduscript/index_b000206.css"
import 'font-awesome/css/font-awesome.min.css'
import {transform} from 'ol/proj'
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import {Style, Stroke} from "ol/style"
import olStyleRegularShape from "ol/style/RegularShape"
import {easeOut} from "ol/easing"
import Zoom from "ol-ext/featureanimation/Zoom"
import {RecordSet} from "@/config/map/core-data"
import {common, mouse, initialization, minZoom, readFeature, ov, base} from '@/config/map/core-map'
let date_rangeLet = []

export default {
  data() {
    return {
      value1: '',
      f0VectorLayer: null,
      f1VectorLayer: null,
      f2VectorLayer: null,
      f3VectorLayer: null,
      sliderModel: 100,
      pageSize: 10,
      pageNo: 1,
      total: 0,
      tableData: [],
      tableColumn: [],
      date_range: [],
      title: '',
      dialogVisible: false,
      mapS: {
        height: window.innerHeight - 0 + 'px',
        width: '100%',
        cursor: 'noDrop'
      },
      map: null,
      mapKey: null,
      baseData: [],
      baseDataChecked: {},
      pickerOptions: {
        disabledDate(time) {
          return time <= new Date(date_rangeLet[0].substring(0, 4) + '-' + date_rangeLet[0].substring(4, 6) + '-' + date_rangeLet[0].substring(6, 8)) || time >= new Date(date_rangeLet[1].substring(0, 4) + '-' + date_rangeLet[1].substring(4, 6) + '-' + date_rangeLet[1].substring(6, 8))
        }
      },
    };
  },
  mounted() {
    this.iniData()
  },
  watch: {
    value1(newName, oldName) {
      let _this = this
      _this.mapKey = new Date().getTime()
      if (oldName) {
        _this.iniMapData()
      }
    }
  },
  methods: {
    getOuterAreaOverlayWkt(pntList) {
      let tempList = [];
      for (let i = 0; i < pntList.length; i++) {
        let lonLat = pntList[i];
        let pnt = this.gps84LonLat_to_Gcj02(lonLat);
        tempList.push(pnt);
      }
      let outerList = [[180, 85.05], [180, -85.05], [-180, -85.05], [-180, 85.05], [180, 85.05]]
      for (let i = 0; i < outerList.length; i++) {
        let pnt = outerList[i];
        outerList[i] = this.gps84LonLat_to_Gcj02(pnt);
      }
      let wkt = "POLYGON ((outer),(inner))";
      let outer = "";
      let inner = "";
      for (let i = 0; i < tempList.length; i++) {
        let pnt = tempList[i];
        if (i === 0)
          inner = pnt[0] + " " + pnt[1];
        else
          inner += "," + pnt[0] + " " + pnt[1];
      }
      for (let i = 0; i < outerList.length; i++) {
        let pnt = outerList[i];
        if (i === 0)
          outer = pnt[0] + " " + pnt[1];
        else
          outer += "," + pnt[0] + " " + pnt[1];
      }
      wkt = wkt.replace("outer", outer);
      wkt = wkt.replace("inner", inner);
      return wkt;
    },
    gps84LonLat_to_Gcj02(lonLat) {
      return transform(lonLat, 'EPSG:4326', 'EPSG:3857');
    },
    sliderChange() {
      let _this = this
      _this.f0VectorLayer.setVisible(false)
      _this.f1VectorLayer.setVisible(false)
      _this.f2VectorLayer.setVisible(false)
      _this.f3VectorLayer.setVisible(false)
      if (_this.sliderModel < 25 && _this.sliderModel >= 0) {
        _this.f3VectorLayer.setVisible(true)
      } else if (_this.sliderModel < 50 && _this.sliderModel > 25) {
        _this.f2VectorLayer.setVisible(true)
      } else if (_this.sliderModel < 75 && _this.sliderModel > 50) {
        _this.f1VectorLayer.setVisible(true)
      } else if (_this.sliderModel < 100 && _this.sliderModel > 75) {
        _this.f0VectorLayer.setVisible(true)
      } else if (_this.sliderModel == 100) {
        _this.f0VectorLayer.setVisible(true)
        _this.f1VectorLayer.setVisible(true)
        _this.f2VectorLayer.setVisible(true)
        _this.f3VectorLayer.setVisible(true)
      }
    },
    iniData() {
      let _this = this
      _this.$axios.get(config.api + '').then(function (response) {
        _this.date_range = response.data.date_range
        date_rangeLet = response.data.date_range
        _this.value1 = _this.date_range[1]
        _this.iniMapData()
      })
    },
    iniMapData() {
      let _this = this
      _this.$axios.get(config.api + '' + _this.value1).then(function (response) {
        _this.baseData = response.data.data
        console.log(response.data.data)
        _this.baseData.map(item => {
          item.tableDatae = item.datasource.table_data
          Reflect.deleteProperty(item.datasource, 'table_data')
          item.baseDatae = item.datasource
          item.baseDataeLength = Object.keys(item.baseDatae).length
        })

        console.log(_this.baseData)
        _this.drawing()
      })
    },
    drawing() {
      let _this = this
      this.map = common(this.map, config.test ? config.onlineLayerServer : config.outLayerServer + '/{z}/{x}/{y}.png', this.$refs.rootmap)
      this.map = mouse(this.map, this.mapconfig.coordinateFormats, this.mapconfig.EPSG4326, document.getElementById('myposition'))
      this.map = initialization(this.map, this.mapconfig.extent)
      this.map = minZoom(this.map)
      this.map = readFeature(this.map, this.mapconfig.dyExtentArrs)
      this.mapBase = base(this.map, this.baseData, this.f0VectorLayer, this.f1VectorLayer, this.f2VectorLayer, this.f3VectorLayer, this.mapconfig.pointTypes)
      this.map = this.mapBase.map
      this.f0VectorLayer = this.mapBase.f0VectorLayer
      this.f1VectorLayer = this.mapBase.f1VectorLayer
      this.f2VectorLayer = this.mapBase.f2VectorLayer
      this.f3VectorLayer = this.mapBase.f3VectorLayer
      this.ovMap = ov(this.map, this.ov, this.mapconfig.bottomLeft, document.getElementById("poInfoBase"))
      this.map = this.ovMap.map
      this.ov = this.ovMap.ov
      this.map.on(this.mapconfig.mOn, function (e) {
        _this.map.getTargetElement().style.cursor = 'default'
        _this.ov.setPosition([0, 0])
        let feature = _this.map.forEachFeatureAtPixel(_this.map.getEventPixel(e.originalEvent), function (feature) {
          return feature;
        }, {hitTolerance: 10})
        if (feature) {
          if (feature.get('item')) {
            _this.map.getTargetElement().style.cursor = "pointer"
            _this.ov.setOffset([20, feature.get('baseDataeLength') * 20])
            _this.ov.setPosition(feature.get('coordinate'))
            _this.baseDataChecked = feature.get('item')
          }
        }
      })
      this.map.on(this.mapconfig.mLeft, function (e) {
        let feature = _this.map.forEachFeatureAtPixel(_this.map.getEventPixel(e.originalEvent), function (feature) {
          return feature;
        }, {hitTolerance: 10})
        if (feature) {
          if (feature.get('item')) {
            try {
              let columns = feature.get('tableDatae').columns
              let columnsGinger = []
              let data = feature.get('tableDatae').data
              let dataGinger = []
              columns.map((item, index) => {
                columnsGinger.push({prop: 'prop' + index, label: item, key: 'key' + index})
              })
              data.map((item, index) => {
                let itemkv = {}
                item.map((itemc, indexc) => {
                  itemkv['prop' + indexc] = itemc
                })
                dataGinger.push(itemkv)
              })
              _this.tableColumn = columnsGinger
              _this.tableData = dataGinger
              _this.total = _this.tableData.length
              _this.pageNo = 1
              _this.title = feature.get('name')
              _this.dialogVisible = true
            } catch (e) {
            }
          }
        }
      })
    },
    handleCurrentChange(val) {
      this.pageNo = val
    },
    initialization() {
      this.map = initialization(this.map, this.mapconfig.extent)
    },
    enter13() {
      let _this = this
      this.initialization()
      let enterInfos = this.baseData.filter(item => item.name.indexOf(document.getElementById('sole-input').value) != -1)
      if (enterInfos && enterInfos.length > 0) {
        enterInfos.map((item, index) => {
          _this.pulse(item.coordinate)
        })
      }
    },
    pulse(coordinates) {
      var _this = this
      for (var i = 0; i < 3; i++) {
        setTimeout(function () {
          var f = new Feature(new Point(transform(coordinates, 'EPSG:4326', 'EPSG:3857')));
          f.setStyle(new Style({
            image: new olStyleRegularShape({
              radius: 50,
              points: 4,
              stroke: new Stroke({color: 'rgb(245,135,90)', width: 3})
            })
          }));
          _this.map.animateFeature(f, new Zoom({
            fade: easeOut,
            duration: 3000,
            easing: easeOut
          }));
        }, i * 500);
      }
    },
  },
}
</script>
<style lang="scss" scoped>
table.gridtable {
  width: 100%;
  font-family: verdana, arial, sans-serif;
  font-size: 13px;
  color: white;
  border-width: 1px;
  border-color: white;
  border-collapse: collapse;
}

table.gridtable th {
  border-width: 1px;
  //padding: 8px;
  border-style: solid;
  border-color: white;
  background-color: white;
}

table.gridtable td {
  border-width: 1px;
  padding: 10px;
  border-style: solid;
  border-color: white;
  background-color: rgba(0, 0, 0, 0.5);
}

/deep/ .el-dialog__body {
  padding: 5px 20px;
  color: rgba(255, 0, 0, 0.73);
}

table.gridtable-tl {
  width: 100%;
  font-family: verdana, arial, sans-serif;
  font-size: 13px;
  color: white;
  border-width: 1px;
  border-color: white;
  border-collapse: collapse;
}

table.gridtable-tl th {
  border-width: 1px;
  border-style: solid;
  border-color: white;
  background-color: white;
}

table.gridtable-tl td {
  border-width: 1px;
  padding: 0px;
  border-style: solid;
  border-color: rgba(171, 52, 52, 0.1);
  background-color: cornflowerblue;
}
</style>
<style>
.el-slider__runway {
  background-color: rgba(0, 0, 0, 0);
}

.el-slider__bar {
  background-color: rgba(0, 0, 0, 0);
}

.el-slider__button {
  border-radius: 0%;
  border: 2px solid #000000;
}
</style>
