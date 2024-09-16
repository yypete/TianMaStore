"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getWiperList();
    this.getNavList();
    this.getFloorList();
  },
  methods: {
    async getWiperList() {
      try {
        const {
          data: res
        } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
        if (res.meta.status !== 200) {
          return common_vendor.index.$showMsg();
        }
        this.swiperList = res.message;
        common_vendor.index.$showMsg("数据请求成功");
      } catch (error) {
        common_vendor.index.$showMsg("请求失败");
      }
    },
    async getNavList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.navList = res.message;
      common_vendor.index.$showMsg("数据请求成功2");
    },
    async getFloorList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
    },
    navHandler(item) {
      if (item.name == "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?good_id=" + item.goods_id,
        c: index
      };
    }),
    b: common_vendor.f($data.navList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: index,
        c: common_vendor.o(($event) => $options.navHandler(item), index)
      };
    }),
    c: common_vendor.f($data.floorList, (item, index, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (item2, index2, i1) => {
          return {
            a: item2.image_src,
            b: item2.image_width + "rpx",
            c: index2,
            d: index2 !== 0,
            e: item2.url
          };
        }),
        f: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
