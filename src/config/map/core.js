/*!
* 图层显示及图层控制底层组件V1.2
* 应用于web图形底图层位右键控制
* 有底图的支持类 core
* 增加了底图的支持类 coreWithoutBaseMap
* Jiang
* 2016-12-05
*/

function coreWithoutBaseMap(map) {
    this.curMap = map;
}

//显示图层控制菜单
coreWithoutBaseMap.prototype.showLayerCtrl = function () {
    var dataMap = [];

    $("#layerCtrl_MenuTree").tree('loadData', []);


    var layers = this.curMap.getLayers().getArray();

    var titleList = [];

    for (var i = 0, count = layers.length; i < count; i++) {
        var titleTmp = layers[i].get('title');
        var bVisible = layers[i].get('visible');
        if (titleTmp != 'undefined' && titleTmp != '' && titleTmp != null) {
            var bFind = false;
            for (var j = 0, l = titleList.length; j < l; j++) {
                if (titleTmp == titleList[j]) {
                    bFind = true;
                    break;
                }
            }
            if (!bFind) {
                titleList.push(titleTmp);
                var data1 = {
                    id: 11,
                    type: 0,
                    text: titleTmp,
                    checked: bVisible
                };
                dataMap.push(data1);
            }
        }

    }

    if (dataMap.length > 0) {
        $('#layerCtrl_MenuTree').tree('append', {
            parent: null,
            data: dataMap
        });
    }
}

//加载界面
coreWithoutBaseMap.prototype.loadUI = function (objName) {
    $('body').append('<div id="layerCtrltree_div"></div>');

    var pBody = document.createElement("div");
    pBody.setAttribute("id", "layerCtrl_parent");
    var dlg = document.createElement("div");
    dlg.setAttribute("id", "layerCtrl_dlg");
    dlg.setAttribute("class", "easyui-dialog");
    dlg.setAttribute("title", "图层控制");
    dlg.setAttribute("data-options", "iconCls:'icon-save',modal:true");
    dlg.setAttribute("style", "width:350px;height:500px;padding:10px;top:100px;left:500px");
    dlg.setAttribute("closed", "true");

    var divT = document.createElement("div");
    divT.setAttribute("id", "layerCtrl_divTree");
    divT.setAttribute("style", "height:100%");
    divT.setAttribute("border", "false");


    var ult = document.createElement("ul");
    ult.setAttribute("id", "layerCtrl_MenuTree");
    ult.setAttribute("class", "easyui-tree");
    ult.setAttribute("data-options", "animate:true,checkbox:true");

    divT.appendChild(ult);

    dlg.appendChild(divT);

    var menu = document.createElement("div");
    menu.setAttribute("id", "layerCtrl_mm");
    menu.setAttribute("class", "easyui-menu");
    menu.setAttribute("style", "width:120px;");

    var div1 = document.createElement("div");
    div1.setAttribute("data-options", "iconCls:'icon-info'");

    div1.setAttribute("onclick", "$('#layerCtrl_dlg').dialog('open');" + objName + ".showLayerCtrl();");
    div1.innerHTML = "打开层位控制";

    menu.appendChild(div1);

    pBody.appendChild(menu);
    pBody.appendChild(dlg);
    //document.body.appendChild(pBody);
    $.parser.parse('#layerCtrl_parent');
}

//初始化函数
coreWithoutBaseMap.prototype.InitLayerCtrl = function (objName, objPtr) {

    this.loadUI(objName);

    $(document).bind('contextmenu', function (e) {
        e.preventDefault();
        $('#layerCtrl_mm').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    });

    $('#layerCtrl_MenuTree').tree({
        onCheck: function (node, checked) {
            var Value;
            var nodeList;

            if (checked) {
                Value = 1;
            } else {
                Value = 0;
            }
            //判断该节点类型
            if (node.type == 0)//业务图层
            {
                var layers = objPtr.curMap.getLayers().getArray();

                for (var i = 0, l = layers.length; i < l; i++) {
                    //alert(layers[i].get('title'));
                    if (layers[i].get('title') == node.text)
                        layers[i].setVisible(checked);
                }
            }
        }
    });
}


//构造函数，当无底图模式时，只填写第一个参数
function core(geoMap) {
    this.geoMap = geoMap;
    this.curMap = geoMap.getMap();
    this.curServerIP = geoMap.getServerIP();
    this.curToken = geoMap.getToken();
    this.curMapID = geoMap.getMapID();
}


//获取菜单的ID，方便外部控制使用
core.prototype.getMenuID = function () {
    return "layerCtrl_mm";

}

//修改mapID,底图修改后需要调用该函数
core.prototype.setMapID = function (mapID) {
    this.curMapID = mapID;
}

//加载界面
core.prototype.loadUI = function (objName) {
    $('body').append('<div id="layerCtrltree_div"></div>');

    var pBody = document.createElement("div");
    pBody.setAttribute("id", "layerCtrl_parent");
    var dlg = document.createElement("div");
    dlg.setAttribute("id", "layerCtrl_dlg");
    dlg.setAttribute("class", "easyui-dialog");
    dlg.setAttribute("title", "图层控制");
    dlg.setAttribute("data-options", "iconCls:'icon-save',modal:true");
    dlg.setAttribute("style", "width:350px;height:500px;padding:10px;top:100px;left:500px");
    dlg.setAttribute("closed", "true");

    var divT = document.createElement("div");
    divT.setAttribute("id", "layerCtrl_divTree");
    divT.setAttribute("style", "height:100%");
    divT.setAttribute("border", "false");


    var ult = document.createElement("ul");
    ult.setAttribute("id", "layerCtrl_MenuTree");
    ult.setAttribute("class", "easyui-tree");
    ult.setAttribute("data-options", "animate:true,checkbox:true");

    divT.appendChild(ult);

    dlg.appendChild(divT);


    var menu = document.createElement("div");
    menu.setAttribute("id", "layerCtrl_mm");
    menu.setAttribute("class", "easyui-menu");
    menu.setAttribute("style", "width:120px;");

    var div1 = document.createElement("div");
    div1.setAttribute("data-options", "iconCls:'icon-info'");

    div1.setAttribute("onclick", "$('#layerCtrl_dlg').dialog('open');" + objName + ".showLayerCtrl();");

    div1.innerHTML = "打开层位控制";

    menu.appendChild(div1);

    pBody.appendChild(menu);
    pBody.appendChild(dlg);
    //document.body.appendChild(pBody);
    $.parser.parse('#layerCtrl_parent');
    document.getElementById("div01").appendChild(divT);
}

//初始化函数
core.prototype.InitLayerCtrl = function (objName, objPtr) {

    this.loadUI(objName);

    $(document).bind('contextmenu', function (e) {
        e.preventDefault();
        $('#layerCtrl_mm').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    });

    $('#layerCtrl_MenuTree').tree({
        onCheck: function (node, checked) {
            var Value;
            var nodeList;

            if (checked) {
                Value = 1;
            } else {
                Value = 0;
            }
            //判断该节点类型
            if (node.type == 0)//业务图层
            {
                var layers = objPtr.curMap.getLayers().getArray();

                for (var i = 0, l = layers.length; i < l; i++) {
                    //alert(layers[i].get('title'));
                    if (layers[i].get('title') == node.text)
                        layers[i].setVisible(checked);
                }
            } else if (node.type == 1)//底图图层根节点
            {
                nodeList = "";
                for (var i = 0, l = node.children.length; i < l; i++) {
                    for (var j = 0, len = node.children[i].children.length; j < len; j++) {
                        if (nodeList == "") {
                            nodeList = node.children[i].children[j].id;
                        } else {
                            nodeList += "," + node.children[i].children[j].id;
                        }
                    }
                }
                objPtr.geoMap.dispMapClick(nodeList, Value);

                //将该层位直接设置为可见或不可见

                //objPtr.imageLayer.setVisible(checked);
            } else if (node.type == 2)//底图图层二级节点
            {
                nodeList = "";
                for (var i = 0, l = node.children.length; i < l; i++) {
                    if (nodeList == "") {
                        nodeList = node.children[i].id;
                    } else {
                        nodeList += "," + node.children[i].id;
                    }
                }
                objPtr.geoMap.dispMapClick(nodeList, Value);
            } else if (node.type == 3)//底图图层三级节点
            {
                objPtr.geoMap.dispMapClick(node.id, Value);
            }
        }
    });
}

//显示图层控制菜单
core.prototype.showLayerCtrl = function () {
    var dataMap = [];

    $("#layerCtrl_MenuTree").tree('loadData', []);


    var layers = this.curMap.getLayers().getArray();

    var titleList = [];

    for (var i = 0, count = layers.length; i < count; i++) {
        var titleTmp = layers[i].get('title');
        var bVisible = layers[i].get('visible');
        if (titleTmp != 'undefined' && titleTmp != '' && titleTmp != null) {
            var bFind = false;
            for (var j = 0, l = titleList.length; j < l; j++) {
                if (titleTmp == titleList[j]) {
                    bFind = true;
                    break;
                }
            }
            if (!bFind) {

                titleList.push(titleTmp);

                var data1 = {
                    id: 11,
                    type: 0,
                    text: titleTmp,
                    checked: bVisible
                };
                //dataMap.push(data1);
            }
        }

    }
    if (dataMap.length > 0) {
        $('#layerCtrl_MenuTree').tree('append', {
            parent: null,
            data: dataMap
        });
    }

    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    var UVurl = this.curServerIP + 'resource?ID=11&TOKEN=' + this.curToken;
    xmlhttp.open("GET", UVurl, true);
    xmlhttp.setRequestHeader("Content-type", "text/plain");
    xmlhttp.send();
    xmlhttp.onload = function () {
        var data = [];
        var rs = xmlhttp.response;

        if (rs == null) return;

        var json = JSON.parse(rs);

        json.sort(sortByType);

        var childList = [];

        var dataTop = {
            id: 20,
            type: 1,
            text: "图件元素"
        };
        for (var i = 0, l = json.length; i < l; i++) {

            var typeid = json[i].typeid;
            var typeName = json[i].type;
            if (typeid == 9900000) {
                typeName = "未分组";
            }

            var data1 = {
                id: json[i].typeid,
                type: 2,
                state: 'open',
                text: typeName
            };

            var grandList = [];
            for (var j = i; j < l; j++) {
                if (json[j].typeid != typeid)
                    break;
                var data2 = {
                    id: json[j].id,
                    type: 3,
                    text: json[j].text,
                    checked: json[j].checked
                };
                grandList.push(data2);
            }
            i = j;
            data1.children = grandList;
            childList.push(data1);
            //$("#layerCtrl_MenuTree").tree('collapse',data1.target);
        }
        dataTop.children = childList;
        data.push(dataTop)
        $('#layerCtrl_MenuTree').tree('append', {
            parent: null,
            data: data
        });
    }
}

//可按对象的某一数字属性对对象排序,该方法做为类成员时调用无效
function sortByType(a, b) {
    return a.typeid - b.typeid;
}
