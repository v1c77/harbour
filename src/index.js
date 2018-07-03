import _ from 'lodash'
import config from './config.js'
import './style.css'

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
  let element = document.createElement('div');
  element.id = 'head';
  element.innerHTML = _.join(['<h3>Hello, Harbour</h3>']);
  document.body.appendChild(element);
  let map = document.createElement('div');
  map.id = 'container';
  map.classList.add('container');
  document.body.appendChild(map);
  GDMap.getApi('onload');

}


component();


window.onload = function() {
  let map = new AMap.Map('container', {
    center: [113.945215,22.543454],
    zoom: 15,
    resizeEnable: false,
    layers: [ // 图层
      new AMap.TileLayer({zooms: [11, 18]}), // 标准图层
      new AMap.TileLayer.RoadNet(), //路网
      new AMap.TileLayer.Traffic({opacity: 0.7, 'autoRefresh': true, 'interval': 60}), //实时路况图层
    ]
  });
  // 插件
  AMap.plugin(['AMap.ToolBar'], function(){
    let toolbar = new AMap.ToolBar();
    map.addControl(toolbar);
  });
  console.log(map)
};
