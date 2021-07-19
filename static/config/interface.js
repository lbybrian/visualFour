let origin = "http://localhost:8686";
const InterfaceConfig = {
    getEntityData: {
        origin: origin,
        name: '测试接口A',
        // url: "/labelTool/entity",
        url: "/test/entity",
        method: "get"
    },
    addEntityData: {
        origin: origin,
        name: '测试接口B',
        url: "/test/entity",
        method: "put"
    },
    updateEntityData: {
        origin: origin,
        name: '测试接口C',
        url: "/labelTool/entity",
        method: "post"
    },
    removeEntityData: {
        origin: origin,
        name: '测试接口D',
        url: "/labelTool/entity",
        method: "delete"
    },
    getEventParam: {
        url: "/static/mock/eventParam.json",
        method: "get"
    },
    getEventLabel: {
        url: "/static/mock/eventLabel.json",
        method: "get"
    },
    getEntitiLabel: {
        url: "/static/mock/entityLabel.json",
        method: "get"
    },
    getmodelData: {
        url: "/static/mock/modelData.json",
        method: "get"
    },
    getAppData: {
        url: "/static/mock/appData.json",
        method: "get"
    },
    getAppDataGallery1: {
        url: "/static/mock/gallery1.json",
        method: "get"
    }
}