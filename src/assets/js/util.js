import Vue from "vue";

import {
    ajaxGET,
    ajaxPUT,
    ajaxPOST,
    ajaxDELETE
} from './ajax'
Vue.prototype.ajaxGET = ajaxGET
Vue.prototype.ajaxPUT = ajaxPUT
Vue.prototype.ajaxPOST = ajaxPOST
Vue.prototype.ajaxDELETE = ajaxDELETE

import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror);

window.beautify = require("js-beautify").js;
window.opts = {
    indent_size: 2,
    space_in_empty_paren: true,
    // preserve_newlines: false,
    brace_style: "expand"
};

/**
 * 公共方法
 * @constructor
 */
var Utils;
Utils = {
    stringToObject: function(str, flag) {
        function getObj(data) {
            return data;
        }
        if (flag) {
            try {
                var temp = unescape(str);
                str = temp;
            } catch (e) {
                console.log(e);
            }
        }
        var data = eval("(\n" + str + "\n)");
        return data;
    },
    objectToString: function(obj, flag) {
        if (obj && obj.constructor.name === "Object") {
            var str = "{";
            for (var k in obj) {
                if (typeof(obj[k]) === "string") {
                    if (obj[k].search("'") !== -1) {
                        str += "\"" + k + '\":"' + obj[k] + '",';
                    } else {
                        str += "\"" + k + "\":'" + obj[k] + "',";
                    }
                } else {
                    str += "\"" + k + "\":" + this.objectToString(obj[k]) + ","
                }
            }
            if (str.length === 1) {
                str = "{}"
            } else {
                str = str.slice(0, str.length - 1) + "}";
            }
        } else if (obj && (obj.constructor.name === "Array")) {
            if (obj.length > 0) {
                var str = "[ " + this.objectToString(obj[0]);
                for (var i = 1; i < obj.length; i++) {
                    str += "," + this.objectToString(obj[i]);
                }
                str += "]"
            } else {
                var str = "[]";
            }
        } else if (obj && (obj.constructor.name === "Function")) {
            var str = obj.toString();
        } else if (obj && (typeof(obj) === "string")) {
            if (flag) {
                var str = "\'" + escape(obj) + "\'";
            } else {
                var str = "\'" + obj.replace(/\'/g, "\\'") + "\'";
            };
        } else if ((typeof(obj) === "number") || (typeof(obj) === "boolean")) {
            var str = obj;
        } else {
            var str = "''";
        }
        return str;
    },
    copyData: function(d) {
        var str = this.objectToString(d);
        return this.stringToObject(str);
    },
    removeLeafNode: function(obj, parent) {
        if (!obj) {
            return false;
        }
        if (!parent && obj.children && obj.children.length === 0) {
            var index = parent.children.indexOf(obj);
            parent.children = parent.children.splice(index, 1);
        } else if (parent && obj.children) {
            parent = obj;
            for (var i = 0; i < obj.children.length; i++) {
                this.removeLeafNode(obj.children[i], parent);
            }
        } else {}
    },
    getEventData(labels, relation, content) {
        var eItems = this.produceEventItems(labels, relation);
        var ret = this.transferEventData(eItems, content);
        return ret;
    },
    transferEventData(eItems, content) {
        var dArr = [];
        for (var i = 0; i < eItems.length; i++) {
            var t = eItems[i];
            var start = t.trigger_start_index;
            var end = start + t.trigger.length;
            for (var j = 0; j < t.arguments.length; j++) {
                var arg = t.arguments[j];
                if (start > arg.argument_start_index) {
                    start = arg.argument_start_index;
                }
                var tEnd = arg.argument_start_index + arg.argument;
                if (end < tEnd) {
                    end = tEnd;
                }
            }
            var tIndex = content.slice(0, start).split("").reverse().join("").search(/。|；|\n|\;|\!|\?/);
            start -= tIndex;
            tIndex = content.slice(end).search("。");
            end += tIndex;

            var tText = content.slice(start, end);

            var item = {
                text: tText,
                event_list: [t]
            }
            dArr.push(item);
        }
        return dArr;
    },
    produceEventItems(labels, relation) {
        var arr = [];
        var eArr = [];
        for (var i = 0; i < labels.length; i++) {
            var item = labels[i];
            if (item.type === "event") {
                var eItem = {
                    id: item.id,
                    event_type: item.labelType,
                    trigger: item.text,
                    trigger_start_index: item.offset,
                    arguments: []
                }
                arr.push(eItem);
            } else {
                eArr.push(item);
            }
        }

        for (var i = 0; i < arr.length; i++) {
            var eItem = arr[i];
            for (var j = 0; j < relation.length; j++) {
                if (relation[j].source === eItem.id) {
                    var tItem = {
                        role: relation[j].label,
                        argument: ""
                    }
                    var target = eArr.findItem("id", relation[j].target);
                    target = eArr[target];
                    tItem.argument = target.text;
                    tItem.argument_start_index = target.offset;
                    eItem.arguments.push(tItem);
                }
            }
        }
        return arr;
    },
    transRouteComponent: function(arr) {
        arr = arr || [];
        for (var i = 0; i < arr.length; i++) {
            if (typeof(arr[i].component) === "string") {
                arr[i] = {
                    exact: true,
                    path: arr[i].path,
                    children: this.transRouteComponent(arr[i].children),
                    // components: () =>
                    //     import (`@/${arr[i].component}.vue`)
                    components: require(`@/${arr[i].component}.vue`)
                }
            }
        }
        return arr;
  },
    itemImgData (item) {
      // let imgBox = {
      //   '1': "qqdt.png",
      //   '2_1': "wdrdqy.png",
      //   '2_2':"wdrdqy.png",
      //   '2_2':"sdrdgj.png",
      //   '2_3':"sdrdgj.png",
      //   '3': "dnygj.png",
      //   '4': "mdzq.png",
      //   '5': "mdzq.png",
      //   '7_1':"mdzq.png",
      //   '7_2':"dnygj.png",
      //   '3':"dnygj.png",
      //   '3':"dnygj.png",
      //   '3':"dnygj.png",'3':"dnygj.png",
      // }
      return `/static/images/${item}.png`
    }
};

Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
}

Array.prototype.findItem = function(key, value) {
    var ret = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][key] === value) {
            ret = i;
            break;
        }
    }
    return ret;
}

Array.prototype.removeItem = function(key, value) {
    var ret = this.findItem(key, value);
    if (ret !== -1) {
        this.splice(ret, 1);
        this.removeItem(key, value);
    }
    return ret;
}


export default Utils
