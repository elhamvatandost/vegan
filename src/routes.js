var Admin = resolve => {
  require.ensure(["./Pages/Admin/Index.vue"], () => {
    resolve(require("./Pages/Admin/Index.vue"));
  });
};
var AdminDetails = resolve => {
  require.ensure(["./Pages/Admin/User/Details.vue"], () => {
    resolve(require("./Pages/Admin/User/Details.vue"));
  });
};
var AdminProfile = resolve => {
  require.ensure(["./Pages/Admin/User/Profile.vue"], () => {
    resolve(require("./Pages/Admin/User/Profile.vue"));
  });
};
var AdminCustomer = resolve => {
  require.ensure(["./Pages/Admin/User/Customer.vue"], () => {
    resolve(require("./Pages/Admin/User/Customer.vue"));
  });
};
var AdminService = resolve => {
  require.ensure(["./Pages/Admin/Service/Service.vue"], () => {
    resolve(require("./Pages/Admin/Service/Service.vue"));
  });
};
var AdminServiceDetail = resolve => {
  require.ensure(["./Pages/Admin/Service/Detail.vue"], () => {
    resolve(require("./Pages/Admin/Service/Detail.vue"));
  });
};
var AdminServiceGroup = resolve => {
  require.ensure(["./Pages/Admin/Service/Category/Category.vue"], () => {
    resolve(require("./Pages/Admin/Service/Category/Category.vue"));
  });
};
var AdminVideo = resolve => {
  require.ensure(["./Pages/Admin/Video/Video.vue"], () => {
    resolve(require("./Pages/Admin/Video/Video.vue"));
  });
};
var AdminVideoDetail = resolve => {
  require.ensure(["./Pages/Admin/Video/Detail.vue"], () => {
    resolve(require("./Pages/Admin/Video/Detail.vue"));
  });
};
var AdminUpload = resolve => {
  require.ensure(["./Pages/Admin/Upload/Upload.vue"], () => {
    resolve(require("./Pages/Admin/Upload/Upload.vue"));
  });
};
var AdminFaq = resolve => {
  require.ensure(["./Pages/Admin/Product/Faq/Faq.vue"], () => {
    resolve(require("./Pages/Admin/Product/Faq/Faq.vue"));
  });
};
var AdminFaqDetail = resolve => {
  require.ensure(["./Pages/Admin/Product/Faq/Detail.vue"], () => {
    resolve(require("./Pages/Admin/Product/Faq/Detail.vue"));
  });
};
var AdminSettingInfo = resolve => {
  require.ensure(["./Pages/Admin/Setting/Info.vue"], () => {
    resolve(require("./Pages/Admin/Setting/Info.vue"));
  });
};
var AdminSettingSlide = resolve => {
  require.ensure(["./Pages/Admin/Setting/Slide/Slide.vue"], () => {
    resolve(require("./Pages/Admin/Setting/Slide/Slide.vue"));
  });
};
var AdminProduct = resolve => {
  require.ensure(["./Pages/Admin/Product/Product.vue"], () => {
    resolve(require("./Pages/Admin/Product/Product.vue"));
  });
};
var AdminProductDetail = resolve => {
  require.ensure(["./Pages/Admin/Product/Detail.vue"], () => {
    resolve(require("./Pages/Admin/Product/Detail.vue"));
  });
};
var AdminProductFeature = resolve => {
  require.ensure(["./Pages/Admin/Product/Feature/Feature.vue"], () => {
    resolve(require("./Pages/Admin/Product/Feature/Feature.vue"));
  });
};
var AdminProductGroup = resolve => {
  require.ensure(["./Pages/Admin/Product/Group/Group.vue"], () => {
    resolve(require("./Pages/Admin/Product/Group/Group.vue"));
  });
};
var AdminLogin = resolve => {
  require.ensure(["./Pages/Admin/User/Login.vue"], () => {
    resolve(require("./Pages/Admin/User/Login.vue"));
  });
};
var AdminNull = resolve => {
  require.ensure(["./Pages/Admin/Shared/AdminNull.vue"], () => {
    resolve(require("./Pages/Admin/Shared/AdminNull.vue"));
  });
};
var Ui = resolve => {
  require.ensure(["./Pages/Ui/Index.vue"], () => {
    resolve(require("./Pages/Ui/Index.vue"));
  });
};
var UiHome = resolve => {
  require.ensure(["./Pages/Ui/Home/Home.vue"], () => {
    resolve(require("./Pages/Ui/Home/Home.vue"));
  });
};
var UiGroup = resolve => {
  require.ensure(["./Pages/Ui/Product/Group.vue"], () => {
    resolve(require("./Pages/Ui/Product/Group.vue"));
  });
};
var UiProductList = resolve => {
  require.ensure(["./Pages/Ui/Product/ProductList.vue"], () => {
    resolve(require("./Pages/Ui/Product/ProductList.vue"));
  });
};
var UiVideoList = resolve => {
  require.ensure(["./Pages/Ui/Video/VideoList.vue"], () => {
    resolve(require("./Pages/Ui/Video/VideoList.vue"));
  });
};
var UiVideo = resolve => {
  require.ensure(["./Pages/Ui/Video/Video.vue"], () => {
    resolve(require("./Pages/Ui/Video/Video.vue"));
  });
};
var UiCat = resolve => {
  require.ensure(["./Pages/Ui/Service/Category.vue"], () => {
    resolve(require("./Pages/Ui/Service/Category.vue"));
  });
};
var UiService = resolve => {
  require.ensure(["./Pages/Ui/Service/Service.vue"], () => {
    resolve(require("./Pages/Ui/Service/Service.vue"));
  });
};
var UiProduct = resolve => {
  require.ensure(["./Pages/Ui/Product/Product.vue"], () => {
    resolve(require("./Pages/Ui/Product/Product.vue"));
  });
};
var UiAboutUs = resolve => {
  require.ensure(["./Pages/Ui/Info/AboutUs.vue"], () => {
    resolve(require("./Pages/Ui/Info/AboutUs.vue"));
  });
};
var err401 = resolve => {
  require.ensure(["./Pages/Error/401.vue"], () => {
    resolve(require("./Pages/Error/401.vue"));
  });
};
var err404 = resolve => {
  require.ensure(["./Pages/Error/404.vue"], () => {
    resolve(require("./Pages/Error/404.vue"));
  });
};
export const routes = [
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "admin",
        component: AdminDetails
      },
      {
        path: "profile",
        name: "profile",
        component: AdminProfile
      },
      {
        path: "customer",
        name: "customer",
        component: AdminCustomer
      },
      {
        path: "service",
        component: AdminNull,
        children: [
          {
            path: "",
            name: "service",
            component: AdminService
          },
          {
            path: "detail/:id",
            name: "service-detail",
            component: AdminServiceDetail
          },
          {
            path: "group",
            component: AdminNull,
            children: [
              {
                path: "",
                name: "service-group",
                component: AdminServiceGroup
              }
            ]
          }
        ]
      },
      {
        path: "video",
        component: AdminNull,
        children: [
          {
            path: "",
            name: "video",
            component: AdminVideo
          },
          {
            path: "detail/:id",
            name: "video-detail",
            component: AdminVideoDetail
          }
        ]
      },
      {
        path: "upload",
        component: AdminNull,
        children: [
          {
            path: "",
            name: "upload",
            component: AdminUpload
          }
        ]
      },
      {
        path: "faq",
        component: AdminNull,
        children: [
          {
            path: "",
            name: "faq",
            component: AdminFaq
          },
          {
            path: "detail/:id",
            name: "faq-detail",
            component: AdminFaqDetail
          }
        ]
      },
      {
        path: "setting",
        component: AdminNull,
        children: [
          {
            path: "info",
            name: "info",
            component: AdminSettingInfo
          },
          {
            path: "slide",
            component: AdminNull,
            children: [
              {
                path: "",
                name: "slide",
                component: AdminSettingSlide
              }
            ]
          }
        ]
      },
      {
        path: "product",
        component: AdminNull,
        children: [
          {
            path: "",
            name: "product",
            component: AdminProduct
          },
          {
            path: "detail/:id",
            name: "product-detail",
            component: AdminProductDetail
          },
          {
            path: "feature",
            component: AdminNull,
            children: [
              {
                path: "",
                name: "product-feature",
                component: AdminProductFeature
              }
            ]
          },
          {
            path: "group",
            component: AdminNull,
            children: [
              {
                path: "",
                name: "product-group",
                component: AdminProductGroup
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/admin/login",
    name: "login",
    component: AdminLogin
  },
  {
    path: "",
    component: Ui,
    children: [
      {
        path: "",
        name: "home",
        component: UiHome
      },
      {
        path: "/video",
        name: "ui-videos",
        component: UiVideoList
      },
      {
        path: "/video/:video",
        name: "ui-video",
        component: UiVideo
      },
      {
        path: "/product",
        name: "ui-groups",
        component: UiGroup
      },
      {
        path: "product/:gp",
        name: "product-list",
        component: UiProductList
      },
      {
        path: "product/:gp/:product",
        name: "ui-product",
        component: UiProduct
      },
      {
        path: "/service",
        name: "categories",
        component: UiCat
      },
      {
        path: "/service/:cat",
        name: "service-list",
        component: UiCat
      },
      {
        path: "/service/:cat/:service",
        name: "ui-service",
        component: UiService
      },
      {
        path : "/about",
        name : "ui-about",
        component : UiAboutUs
      }
    ]
  },
  {
    path: "/errors/401",
    name: "err401",
    component: err401
  },
  {
    path: "/errors/404",
    name: "err404",
    component: err404
  },
  {
    path : "*",
    component: err404
  }
];
