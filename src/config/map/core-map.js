import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import {XYZ} from "ol/source";
import {transform} from "ol/proj";
import MousePosition from "ol/control/MousePosition";
import {createStringXY} from "ol/coordinate";
import Polygon from "ol/geom/Polygon";
import VectorSource from "ol/source/Vector";
import {Vector} from "ol/layer";
import WKT from "ol/format/WKT";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Overlay from "ol/Overlay";
import Point from "ol/geom/Point";


export function common(map, pictureUrl, rootMap) {
    let layer = new TileLayer({"source": new XYZ({"url": pictureUrl, "projection": "EPSG:3857"})});
    map = new Map({
        "target": rootMap,
        "layers": [layer],
        "view": new View({
            "projection": "EPSG:3857",
            "center": transform([118.7598, 37.554], 'EPSG:4326', 'EPSG:3857'),
            "maxZoom": 17
        })
    });
    return map;
}

export function mouse(map, coordinateFormats, EPSG4326, target) {
    let mousePosition = new MousePosition({
        "coordinateFormat": createStringXY(coordinateFormats),
        "projection": EPSG4326,
        "className": "mousePosition",
        "target": target,
        "undefinedHTML": "&nbsp"
    });
    map.addControl(mousePosition);
    return map;
}

export function base(map, baseData, f0VectorLayer, f1VectorLayer, f2VectorLayer, f3VectorLayer, pointTypes) {
    let normalArray = [];
    let levelOneArray = [];
    let levelTwoArray = [];
    let levelThreeArray = [];
    for (let i = 0; i < baseData["length"]; i++) {
        let _0x541ad6 = new Style({
            "image": new Icon({
                "crossOrigin": "anonymous",
                "src": require("@/assets/images/" + baseData[i]["type"] + ".png"),
                "scale": 0.5,
                "color": baseData[i]["status"] == "正常" ? 'green' : baseData[i]["status"] == "一级预警" ? '#a8a82a' : baseData[i]["status"] == "二级预警" ? 'orange' : 'red'
            }),
            "text": new Text({
                "font": '12px sans-serif',
                "offsetY": 27,
                "text": baseData[i]["name"],
                "fill": new Fill({"color": baseData[i]["status"] == "正常" ? 'lightgreen' : baseData[i]["status"] == "一级预警" ? 'yellow' : baseData[i]["status"] == "二级预警" ? 'orange' : "red"}),
                "stroke": new Stroke({"color": "rgb(45,51,61)", "width": 0x2})
            })
        });
        let _0x3c4914 = new Feature({
            "type": pointTypes,
            "geometry": new Point(transform(baseData[i]["coordinate"], "EPSG:4326", 'EPSG:3857')),
            "item": baseData[i]["baseDatae"],
            "coordinate": transform(baseData[i]["coordinate"], 'EPSG:4326', 'EPSG:3857'),
            "baseDataeLength": baseData[i]["baseDataeLength"],
            "tableDatae": baseData[i]["tableDatae"],
            "name": baseData[i]["name"]
        });
        _0x3c4914["setStyle"](_0x541ad6);
        if (baseData[i]["status"] == "一级预警") {
            levelOneArray["push"](_0x3c4914);
        }
        if (baseData[i]["status"] == "二级预警") {
            levelTwoArray["push"](_0x3c4914);
        }
        if (baseData[i]["status"] == "三级预警") {
            levelThreeArray["push"](_0x3c4914);
        }
        if (baseData[i]["status"] == "正常") {
            normalArray["push"](_0x3c4914);
        }
    }
    f0VectorLayer = new Vector({"declutter": !![], "source": new VectorSource({"features": normalArray}), "zIndex": 9999});
    f1VectorLayer = new Vector({"declutter": !![], "source": new VectorSource({"features": levelOneArray}), "zIndex": 9999});
    f2VectorLayer = new Vector({"declutter": !![], "source": new VectorSource({"features": levelTwoArray}), "zIndex": 9999});
    f3VectorLayer = new Vector({"declutter": !![], "source": new VectorSource({"features": levelThreeArray}), "zIndex": 9999});
    map["addLayer"](f0VectorLayer);
    map["addLayer"](f1VectorLayer);
    map["addLayer"](f2VectorLayer);
    map["addLayer"](f3VectorLayer);
    return {
        "map": map,
        "f0VectorLayer": f0VectorLayer,
        "f1VectorLayer": f1VectorLayer,
        "f2VectorLayer": f2VectorLayer,
        "f3VectorLayer": f3VectorLayer
    };
}

export function initialization(map, extent) {
    let polygon = new Polygon([[[extent[0], extent[1]], [extent[2], extent[1]], [extent[2], extent[3]], [extent[0], extent[1]], [extent[0], extent[1]]]]);
    map["getView"]()["fit"](polygon, {"padding": [0, 0, 0, 0]});
    return map;
}

export function minZoom(map) {
    map["getView"]()["setMinZoom"](Math["trunc"](map["getView"]()["getZoom"]()));
    return map;
}

export function ov(map, _0x77ada9, bottomLeft, element) {
    let myov = new Overlay({
        "positioning": bottomLeft,
        "offset": [20, 0],
        "element": element,
        "zIndex": 10001
    });
    map.addOverlay(myov);
    return {"map": map, "ov": myov};
}

export function readFeature(map, dyExtentArrs) {
    var vectorSource = new VectorSource({"wrapX": ![]});
    var vector = new Vector({"source": vectorSource, "isBaseLayer": ![]});
    map["addLayer"](vector);

    var _0x3bb0eb = getOuterAreaOverlayWkt(dyExtentArrs);
    var _0x18f94d = new WKT();
    var _0x17cd37 = _0x18f94d["readFeature"](_0x3bb0eb);
    var _0x44dc9f = new Style({"fill": new Fill({"color": "rgba(166,175,187,0.7)"})});
    _0x17cd37["setStyle"](_0x44dc9f);
    vectorSource["addFeature"](_0x17cd37);
    var _0x390a0a = [];
    for (var _0x177da2 = 0x0; _0x177da2 < dyExtentArrs["length"]; _0x177da2++) {
        var _0x2da946 = dyExtentArrs[_0x177da2];
        var _0x4a9be0 = gps84LonLat_to_Gcj02(_0x2da946);
        _0x390a0a["push"](_0x4a9be0);
    }
    var _0x3d1a20 = new Style({
        "stroke": new Stroke({
            "color": "rgba(166,175,187,0.5)",
            "width": 0,
            "lineDash": [16, 12]
        })
    });
    var _0x5a03bc = new Feature(new LineString(_0x390a0a));
    _0x5a03bc["setStyle"](_0x3d1a20);
    vectorSource["addFeature"](_0x5a03bc);
    return map;
}

function gps84LonLat_to_Gcj02(_0x621979) {
    let _0x34ffa3 = transform(_0x621979, 'EPSG:4326', 'EPSG:3857');
    return _0x34ffa3;
}

function getOuterAreaOverlayWkt(dyExtentArrs) {
    let _0x5b7427 = [];
    for (let i = 0; i < dyExtentArrs["length"]; i++) {
        let _0x19436c = dyExtentArrs[i];
        let _0x232ee5 = gps84LonLat_to_Gcj02(_0x19436c);
        _0x5b7427["push"](_0x232ee5);
    }
    let _0x20eaca = [[180, 85.05], [180, -85.05], [-180, -85.05], [-180, 85.05], [180, 85.05]];
    for (let _0x11813e = 0; _0x11813e < _0x20eaca["length"]; _0x11813e++) {
        let _0x5f1974 = _0x20eaca[_0x11813e];
        _0x20eaca[_0x11813e] = gps84LonLat_to_Gcj02(_0x5f1974);
    }
    let _0x38a733 = "))renni(,)retuo(( NOGYLOP".split("").reverse().join("");
    let _0x16e111 = "".split("").reverse().join("");
    let _0x172193 = "".split("").reverse().join("");
    for (let _0x2b0986 = 0; _0x2b0986 < _0x5b7427["length"]; _0x2b0986++) {
        let _0x5e3b73 = _0x5b7427[_0x2b0986];
        if (_0x2b0986 === 0) _0x172193 = _0x5e3b73[0] + '\x20' + _0x5e3b73[1]; else _0x172193 += "," + _0x5e3b73[0] + '\x20' + _0x5e3b73[1];
    }
    for (let _0xf086bd = 0; _0xf086bd < _0x20eaca["length"]; _0xf086bd++) {
        let _0x45459a = _0x20eaca[_0xf086bd];
        if (_0xf086bd === 0) _0x16e111 = _0x45459a[0] + '\x20' + _0x45459a[1]; else _0x16e111 += "," + _0x45459a[0] + '\x20' + _0x45459a[1];
    }
    _0x38a733 = _0x38a733["replace"]("outer", _0x16e111);
    _0x38a733 = _0x38a733["replace"]("inner", _0x172193);
    return _0x38a733;
}
