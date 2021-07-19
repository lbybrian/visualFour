const RouteConfig = {
    admin: [{
        component: "main/index",
        path: "/",
        children: [{
            component: "modules/index",
            path: "/",
        }, {
            component: "app/mapApp",
            path: "/mapApp",
        }]
    }, {
        component: "main/map",
        path: "/map",
        children: [{
            component: "app/mapApp",
            path: "/map/app",
        }]
    }, {
        component: "main/tool",
        path: "/tool",
        children: [{
                component: "modules/analysis",
                path: "/tool/analysis",
            }, {
                component: "modules/algorithm",
                path: "/tool/algorithm",
            }, {
                component: "modules/algManage",
                path: "/tool/algManage",
            }, {
                component: "modules/anaManage",
                path: "/tool/anaManage",
            }, {
                component: "modules/sqlManage",
                path: "/tool/sqlManage",
            }, {
                component: "modules/trainModel",
                path: "/tool/trainModel",
            }, {
                component: "modules/lastAnalysis",
                path: "/tool/lastAnalysis",
            },
            {
                component: "modules/index",
                path: "/tool/lastAnalysis",
            },
        ]
    }, {
        component: "main/app",
        path: "/app",
        children: [{
                component: "app/example",
                path: "/app/example",
            },
            {
                component: "app/threeLayout",
                path: "/app/threeLayout",
            },
            {
                component: "app/fourLayout",
                path: "/app/fourLayout",
            },
            {
                component: "app/threeTwo",
                path: "/app/threeTwo",
            }, {
                component: "app/gallery",
                path: "/app/gallery",
            }, {
                component: "app/gallery1",
                path: "/app/gallery1",
            }
        ]
    }]
}