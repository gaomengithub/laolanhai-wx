import * as echarts from '../../libs/ec-canvas/echarts';
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";

function setOption(chart) {
  var option = {
    polar: {
      radius: [30, '85%']
    },
    angleAxis: {
      max: 25,
      startAngle: 75
    },
    radiusAxis: {
      show:false,
      type: 'category',
      data: ['罚球', '三分', '得分']
    },
    series: {
      type: 'bar',
      data: [4, 9, 18.5],
      silent: true, //禁用此饼图的鼠标悬停交互
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}-{c}'
      },
      roundCap:true,
      itemStyle: {
        color: function(params) {
          var colorList = ['#03c3d7', '#76e806', '#f62a78'];
          return colorList[params.dataIndex]
        }
      }
    }
  };
  chart.setOption(option);
}


Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },
  storeBindings: {
    store:user,
    fields: ["user"]
  },

  data: {
    isLoaded: false,
    isDisposed: false,
    ec: {
      lazyLoad: true,
    }
  },
  lifetimes: {
    ready() {
      this.ecComponent = this.selectComponent('#ec-charts');
      this.init()
    }
  },

  methods: {
    dispose: function () {
      if (this.chart) {
        this.chart.dispose();
      }

      this.setData({
        isDisposed: true
      });
    },
    // 点击按钮后初始化图表
    init: function () {
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart);

        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;

        this.setData({
          isLoaded: true,
          isDisposed: false
        });

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    },
  }
})
