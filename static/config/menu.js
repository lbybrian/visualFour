const MenuConfig = {
  admin: [
    {
      icon: "",
      label: "可视化",
      children: [{
        icon: "",
        label: "数据分析",
        path: "/tool/analysis",
      },
      {
        icon: "",
        label: "算法模型",
        path: "/tool/algorithm",
      },
      {
        icon: "",
        label: "模型训练",
        path: "/tool/trainModel",
      }
      ]
    },
    {
      icon: "",
      label: "数据接入管理",
      children: [{
        icon: "",
        label: "数据分析接口管理",
        path: "/tool/anaManage",
      },
      {
        icon: "",
        label: "模型参数接口管理",
        path: "/tool/algManage",
      },
      {
        icon: "",
        label: "SQL管理",
        path: "/tool/sqlManage",
      }
      ]
    }
  ]
}

// export default RouteConfig