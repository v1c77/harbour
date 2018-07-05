import _ from 'lodash'
import config from './config.js'
import './style.css'
const cpoint = [113.945215,22.543454];
const GDMap = {
  map: undefined, // map obj
  // async get api
  getApi: function (funcName) {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src = `http://webapi.amap.com/maps?v=1.4.7&key=${config.map_key}&callback=${funcName}`;
    document.head.appendChild(script);
  }
};

function component() {
  let element = document.createElement('div'); element.id = 'head'; element.innerHTML = _.join(['<h3>Hello, Harbour</h3>']); document.body.appendChild(element);
  let map = document.createElement('div'); map.id = 'container'; document.body.appendChild(map);
  let panel = document.createElement('dev'); panel.id = 'panel'; document.body.appendChild(panel);
  GDMap.getApi('');
}

component();

window.onload = function() {
  let map = new AMap.Map('container', {
    center: cpoint,
    zoom: 15,
    resizeEnable: true,
    layers: [ // 图层
      new AMap.TileLayer({zooms: [11, 18]}), // 标准图层
      new AMap.TileLayer.RoadNet(), //路网
      new AMap.TileLayer.Traffic({opacity: 0.7, 'autoRefresh': true, 'interval': 60}), //实时路况图层
    ]
  });
  GDMap.map = map;
  // 插件
  AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function(){
    let toolbar = new AMap.ToolBar(); map.addControl(toolbar);
    let scale = new AMap.Scale(); map.addControl(scale);
  });

  // 区域
  AMap.service(["AMap.PlaceSearch"], function() {
    let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
      pageSize: 50,
      type: '住宅区',
      pageIndex: 1,
      city: "shenzhen", //城市
      map: map,
      panel: "panel"
    });
    placeSearch.searchNearBy('', cpoint, 2200, function(status, result) {
        console.log(result);
    });
  });
};
