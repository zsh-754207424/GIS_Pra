RecordSet["prototype"]["getString"] = function (_0xcf7f9b, _0x4e299d, _0x345539) {
    this["g_nStrLen"] = _0xcf7f9b["getInt16"](_0x345539, !![]);
    var _0x5b9bfc = new Uint8Array(this["g_nStrLen"]);
    var _0x380fe5;
    _0x345539 += 2;
    for (_0x380fe5 = 0; _0x380fe5 < this["g_nStrLen"]; _0x380fe5++) {
        _0x5b9bfc[_0x380fe5] = _0xcf7f9b["getUint8"](_0x345539 + _0x380fe5);
    }
    this["g_strParse"] = GBK["decode"](_0x5b9bfc);
    return this["g_strParse"];
};

function getInt64(_0x1bc97c, _0x4115bb) {
    var _0xd6fa6b = _0x1bc97c["getInt32"](_0x4115bb, !![]);
    var _0x4b510b = (_0xd6fa6b << (0x6dd71 ^ 0x6dd51)) + _0x1bc97c["getInt32"](_0x4115bb + (0xe716a ^ 0xe716e), !![]);
    return _0x4b510b;
}

function RecordSet(_0x27be8d) {
    var _0x3ec0e8 = new DataView(_0x27be8d);
    var _0xe1e71c = _0x3ec0e8["getInt32"](0, !![]);
    if (_0xe1e71c != 0xf423f) {
        this["getString"](_0x3ec0e8, _0x27be8d, 4);
        alert(this["g_strParse"]);
        return null;
    }
    var _0x446aa7 = _0x3ec0e8["getInt8"](4);
    this["fieldNum"] = _0x446aa7;
    len = _0x3ec0e8["getInt32"](5, !![]);
    this["Count"] = len;
    var _0x54d6c3, _0x17c1cb;
    var _0x298bde = 0xd0913 ^ 0xd091a;
    var _0x3bdb13 = new Array(_0x446aa7);
    this["Fields"] = _0x3bdb13;
    var _0x565fae = new Array(_0x446aa7);
    this["mapField"] = new Map();
    for (_0x54d6c3 = 0x0; _0x54d6c3 < _0x446aa7; _0x54d6c3++) {
        var _0x541fef = _0x3ec0e8["getInt8"](_0x298bde);
        _0x298bde += 0x2;
        _0x3bdb13[_0x54d6c3] = this["getString"](_0x3ec0e8, _0x27be8d, _0x298bde);
        this["mapField"]["set"](_0x3bdb13[_0x54d6c3], _0x54d6c3);
        _0x298bde += this["g_nStrLen"] + 0x3;
        var _0x34aa46 = _0x3ec0e8["getUint8"](_0x298bde + (0xb0f03 ^ 0xb0f01));
        _0x298bde += 0x48dae ^ 0x48daa;
        var _0x11da0c;
        switch (_0x541fef) {
            case 0xf315c ^ 0xf3158:
            case 0xb:
            case 0xc:
            case 0x1: {
                _0x11da0c = new Array(len);
                for (_0x17c1cb = 0x0; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = this["getString"](_0x3ec0e8, _0x27be8d, _0x298bde);
                    _0x298bde += 0x3 + this["g_nStrLen"];
                }
                break;
            }
            case 0x189d0 ^ 0x189d3: {
                _0x11da0c = new Float32Array(len);
                for (_0x17c1cb = 0xc5411 ^ 0xc5411; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = _0x3ec0e8["getFloat32"](_0x298bde, !![]);
                    if (_0x34aa46 > 0x0 && _0x34aa46 < 0x8) {
                        _0x11da0c[_0x17c1cb] = _0x11da0c[_0x17c1cb]["toFixed"](_0x34aa46);
                    }
                    if (_0x34aa46 == 0x0) _0x11da0c[_0x17c1cb] = parseFloat(_0x11da0c[_0x17c1cb]["toFixed"](0x6));
                    _0x298bde += 0x4;
                }
                break;
            }
            case 0xa:
            case 0xd0b06 ^ 0xd0b0e: {
                _0x11da0c = new Float64Array(len);
                for (_0x17c1cb = 0x0; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = _0x3ec0e8["getFloat64"](_0x298bde, !![]);
                    if (_0x34aa46 > 0x0 && _0x34aa46 < (0xad2d5 ^ 0xad2dd)) {
                        _0x11da0c[_0x17c1cb] = _0x11da0c[_0x17c1cb]["toFixed"](_0x34aa46);
                    }
                    if (_0x34aa46 == 0x0) _0x11da0c[_0x17c1cb] = parseFloat(_0x11da0c[_0x17c1cb]["toFixed"](0x6));
                    _0x298bde += 0x8;
                }
                break;
            }
            case 0x3b1af ^ 0x3b1a0: {
                _0x11da0c = new Array(len);
                for (_0x17c1cb = 0x9218d ^ 0x9218d; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = getInt64(_0x3ec0e8, _0x298bde);
                    _0x298bde += 0x8;
                }
                break;
            }
            case 0x6b9ce ^ 0x6b9c7: {
                _0x11da0c = new Uint8Array(len);
                for (_0x17c1cb = 0x19e43 ^ 0x19e43; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = _0x3ec0e8["getUint8"](_0x298bde);
                    _0x298bde++;
                }
                break;
            }
            case 0xd: {
                _0x11da0c = new Int16Array(len);
                for (_0x17c1cb = 0x24b5f ^ 0x24b5f; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = _0x3ec0e8["getInt16"](_0x298bde, !![]);
                    _0x298bde += 0x440f3 ^ 0x440f1;
                }
                break;
            }
            case 0x2: {
                _0x11da0c = new Int32Array(len);
                for (_0x17c1cb = 0x0; _0x17c1cb < len; _0x17c1cb++) {
                    _0x11da0c[_0x17c1cb] = _0x3ec0e8["getInt32"](_0x298bde, !![]);
                    _0x298bde += 0x4;
                }
                break;
            }
            case 0x5:
            case 0x6: {
                _0x11da0c = new Array(len);
                for (_0x17c1cb = 0x0; _0x17c1cb < len; _0x17c1cb++) {
                    var _0x58c751 = _0x3ec0e8["getInt32"](_0x298bde, !![]);
                    _0x298bde = _0x298bde + 0x4;
                    var _0x35dcef = _0x27be8d["slice"](_0x298bde, _0x58c751 + _0x298bde);
                    _0x298bde += _0x58c751;
                    _0x11da0c[_0x17c1cb] = _0x35dcef;
                }
                break;
            }
        }
        _0x565fae[_0x54d6c3] = _0x11da0c;
    }
    this["FieldsData"] = _0x565fae;
}

RecordSet["prototype"]["getFieldValue"] = function (_0x222554, _0x4f4598, _0x1b2bd3) {
    var _0x1798af = this["mapField"]["get"](_0x222554);
    if (_0x1798af == null) return null;
    if (_0x4f4598 < 0x0 || _0x4f4598 >= this["Count"]) return null;
    if (_0x1b2bd3 == null || _0x1b2bd3 == ![]) return this["FieldsData"][_0x1798af][_0x4f4598];
    var _0x40da2b = this["FieldsData"][_0x1798af][_0x4f4598];
    if (_0x40da2b instanceof ArrayBuffer) {
        var _0x296fcf = _0x40da2b["byteLength"];
        var _0xe78853 = _0x40da2b["slice"](0x277c1 ^ 0x277c1, _0x296fcf);
        var _0x3e34af = new DataView(_0xe78853);
        for (var _0x169cc5 = 0x0; _0x169cc5 < _0x296fcf; _0x169cc5++) {
            var _0x5c5be9 = _0x3e34af["getUint8"](_0x169cc5);
            _0x5c5be9 = ~_0x5c5be9;
            _0x3e34af["setUint8"](_0x169cc5, _0x5c5be9);
        }
        return _0xe78853;
    }
};
RecordSet["prototype"]["getCurveValue"] = function (_0x241a92, _0x4dc6a2, _0x3b11b8) {
    var _0x3dfacf = this["mapField"]["get"](_0x241a92);
    if (_0x3dfacf == null) return null;
    var _0x3f56a6 = this["FieldsData"][_0x3dfacf][_0x4dc6a2];
    if (_0x3f56a6 instanceof ArrayBuffer) {
        var _0x121220 = _0x3f56a6["byteLength"] / (0x896eb ^ 0x896ef);
        var _0x15c26c = new DataView(_0x3f56a6);
        var _0x25d96c = new Array(_0x121220);
        var _0x47f527 = 0xe5e25 ^ 0xe5e25;
        for (var _0x311d43 = 0x0; _0x311d43 < _0x121220; _0x311d43++) {
            _0x25d96c[_0x311d43] = _0x15c26c["getFloat32"](_0x47f527, !![]);
            _0x47f527 += 0x40c66 ^ 0x40c62;
        }
        return _0x25d96c;
    }
    return null;
};
RecordSet["prototype"]["getFieldValueByIndex"] = function (_0xb249a2, _0x2c9da7) {
    if (_0xb249a2 < 0x0 || _0xb249a2 > this["fieldNum"]) return null;
    if (_0x2c9da7 < 0x0 || _0x2c9da7 >= this["Count"]) return null;
    return this["FieldsData"][_0xb249a2][_0x2c9da7];
};
RecordSet["prototype"]["getFieldIndex"] = function (_0x31ee52) {
    var _0x31ee52 = this["mapField"]["get"](strFieldName);
    if (_0x31ee52 == null) return -0x1;
    return _0x31ee52;
};
RecordSet["prototype"]["getFieldNum"] = function () {
    return this["fieldNum"];
};

function resetDBSvc(_0x464ee9) {
    var _0x3039ae;
    _0x3039ae = new XMLHttpRequest();
    var _0x408084 = _0x464ee9 + "80003=DI?".split("").reverse().join("");
    _0x3039ae["open"]("TEG".split("").reverse().join(""), _0x408084, ![]);
    _0x3039ae["send"]();
}

function GetRecordSetSync(_0x3b3830, _0x434c6a, _0x4e55be, _0x30a42e) {
    var _0x501d7d;
    _0x501d7d = new XMLHttpRequest();
    var _0x1f4359;
    var _0x3e811b = _0x3b3830 + "=DIQ&61=DI?".split("").reverse().join("") + _0x434c6a;
    _0x3e811b += "=SMARAP&".split("").reverse().join("") + _0x4e55be;
    _0x501d7d["open"]("TEG".split("").reverse().join(""), _0x3e811b, ![]);
    var _0x98da49 = new Date()["getTime"]();
    _0x501d7d["setRequestHeader"]("epyt-tnetnoC".split("").reverse().join(""), "nialp/txet".split("").reverse().join(""));
    _0x501d7d["overrideMimeType"]('text/plain;\x20charset=x-user-defined');
    _0x501d7d["send"](null);
    var _0x54b88c = stringToArrayBuffer(_0x501d7d["response"]);
    var _0x37f809 = new RecordSet(_0x54b88c);
    if (_0x30a42e) _0x30a42e(_0x37f809);
    return _0x37f809;
}

function stringToArrayBuffer(_0xe1d536) {
    var _0x3128d0 = new ArrayBuffer(_0xe1d536["length"]);
    var _0x1310a6 = new Uint8Array(_0x3128d0);
    for (var _0xed37c9 = 0x0, _0x4984bf = _0xe1d536["length"]; _0xed37c9 < _0x4984bf; _0xed37c9++) {
        _0x1310a6[_0xed37c9] = _0xe1d536["charCodeAt"](_0xed37c9);
    }
    return _0x3128d0;
}

function GetRecordSet(_0x4949dc, _0x5ce645, _0x43af6b, _0x19720f, _0x579adb) {
    var _0x3feb1e;
    if (window["XMLHttpRequest"]) _0x3feb1e = new XMLHttpRequest(); else _0x3feb1e = new ActiveXObject("PTTHLMX.tfosorciM".split("").reverse().join(""));
    _0x3feb1e["responseType"] = "arraybuffer";
    var _0x44196d;
    var _0x1c14a5 = _0x4949dc + "=DIQ&61=DI?".split("").reverse().join("") + _0x5ce645;
    _0x1c14a5 += "=SMARAP&".split("").reverse().join("") + _0x43af6b;
    _0x3feb1e["open"]("TEG".split("").reverse().join(""), _0x1c14a5, !![]);
    var _0x2ff42d = new Date()["getTime"]();
    _0x3feb1e["setRequestHeader"]("epyt-tnetnoC".split("").reverse().join(""), "nialp/txet".split("").reverse().join(""));
    _0x3feb1e["send"]();
    var _0x58dd31;
    _0x3feb1e["onload"] = function () {
        var _0x6535f6 = new RecordSet(_0x3feb1e["response"]);
        var _0x4217a9 = new Date()["getTime"]();
        if (_0x19720f) _0x19720f(_0x6535f6, _0x579adb);
    };
}

export default RecordSet;