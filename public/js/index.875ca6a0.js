(function(e){function t(t){for(var r,c,u=t[0],i=t[1],l=t[2],d=0,f=[];d<u.length;d++)c=u[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var i=n[u];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={index:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/twitch-braille-ascii/public/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"29f5":function(e,t,n){},"2a33":function(e,t,n){"use strict";n("5f54")},"522c":function(e,t,n){},"5f54":function(e,t,n){},"7a80":function(e,t,n){},8793:function(e,t,n){"use strict";n("522c")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a=Object(r["f"])("h1",null,"twitchの点字アスキーアートを作るやつ",-1),o=Object(r["f"])("h2",null,"入力",-1),c=Object(r["f"])("h2",null,"画像プレビュー",-1),u=Object(r["f"])("h2",null,"出力",-1);function i(e,t,n,i,l,s){var d=Object(r["r"])("the-input"),f=Object(r["r"])("the-preview"),b=Object(r["r"])("the-output");return Object(r["l"])(),Object(r["e"])(r["a"],null,[a,Object(r["f"])("section",null,[o,Object(r["h"])(d,{nega:e.input.nega,"onUpdate:nega":t[0]||(t[0]=function(t){return e.input.nega=t}),bg:e.input.bg,"onUpdate:bg":t[1]||(t[1]=function(t){return e.input.bg=t}),"onUpdate:imageUrl":e.onUpdateImageUrl},null,8,["nega","bg","onUpdate:imageUrl"])]),Object(r["f"])("section",null,[c,Object(r["h"])(f,{"image-data-raw":e.preview.imageDataRaw,"image-data-filtered":e.preview.imageDataFiltered},null,8,["image-data-raw","image-data-filtered"])]),Object(r["f"])("section",null,[u,Object(r["h"])(b,{"model-value":e.output},null,8,["model-value"])])],64)}var l=n("1da1");n("96cf");Object(r["n"])("data-v-6eb31f78");var s=["value"],d=Object(r["f"])("br",null,null,-1),f=Object(r["g"])("ダークテーマ"),b=Object(r["f"])("br",null,null,-1);function m(e,t,n,a,o,c){return Object(r["l"])(),Object(r["e"])(r["a"],null,[Object(r["f"])("textarea",{class:Object(r["j"])(e.klass),cols:"60",rows:"20",value:e.modelValue,readonly:""},null,10,s),d,Object(r["f"])("label",null,[Object(r["x"])(Object(r["f"])("input",{"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.darkMode=t}),type:"checkbox"},null,512),[[r["t"],e.darkMode]]),f]),b,Object(r["f"])("button",{type:"button",onClick:t[1]||(t[1]=function(){return e.copyToClipboard&&e.copyToClipboard.apply(e,arguments)})},"クリップボードにコピー")],64)}Object(r["m"])();var h=Object(r["i"])({name:"TheOutput",props:{modelValue:{type:String,default:""}},setup:function(e){var t=Object(r["p"])(!0),n=function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,null===(n=navigator.clipboard)||void 0===n?void 0:n.writeText(e.modelValue);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),a=Object(r["b"])((function(){return{"light-theme":!t.value,"dark-theme":t.value}}));return{copyToClipboard:n,darkMode:t,klass:a}}});n("d735");h.render=m,h.__scopeId="data-v-6eb31f78";var p=h;function v(e,t,n,a,o,c){var u=Object(r["r"])("the-preview-canvas");return Object(r["l"])(),Object(r["e"])(r["a"],null,[Object(r["h"])(u,{"image-data":e.imageDataRaw,width:e.width},null,8,["image-data","width"]),Object(r["h"])(u,{"image-data":e.imageDataFiltered,width:e.width},null,8,["image-data","width"])],64)}n("a9e3");var j={ref:"canvas",width:"60",height:"0"};function g(e,t,n,a,o,c){return Object(r["l"])(),Object(r["e"])("canvas",j,null,512)}var O=Object(r["i"])({name:"ThePreviewCanvas",props:{imageData:ImageData,width:{type:Number,default:60}},setup:function(e){var t=Object(r["p"])(null),n=Object(r["b"])((function(){if(!e.imageData)return 0;var t=e.imageData,n=t.width,r=t.height;return r*n/e.width}));return Object(r["w"])((function(){return e.imageData}),(function(e){if(e&&t.value){t.value.width=e.width,t.value.height=e.height;var n=t.value.getContext("2d");if(!n)throw new Error("canvas context is null");n.putImageData(e,0,0)}})),{canvas:t,computedHeight:n}}});O.render=g;var y=O,w=Object(r["i"])({name:"ThePreview",components:{ThePreviewCanvas:y},props:{imageDataRaw:ImageData,imageDataFiltered:ImageData,width:{type:Number,default:60}}});w.render=v;var T=w;n("99af");Object(r["n"])("data-v-6aed6b7c");var k=Object(r["f"])("h3",null,"入力タイプ",-1),U={class:"horizontal"},D=["value"],x={key:0},q=Object(r["f"])("h3",null,"FFZ連携入力",-1),I={key:1},E=Object(r["f"])("h3",null,"ファイル選択入力",-1),R=Object(r["f"])("h3",null,"微調整",-1),_=Object(r["g"])("ネガ"),G=Object(r["g"])("背景");function P(e,t,n,a,o,c){var u=Object(r["r"])("the-input-ffz"),i=Object(r["r"])("the-input-file-select");return Object(r["l"])(),Object(r["e"])(r["a"],null,[Object(r["f"])("section",null,[k,Object(r["f"])("ul",U,[(Object(r["l"])(!0),Object(r["e"])(r["a"],null,Object(r["q"])(e.inputTypes,(function(n,a){return Object(r["l"])(),Object(r["e"])("li",{key:a},[Object(r["f"])("label",null,[Object(r["x"])(Object(r["f"])("input",{"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.inputTypeChecked=t}),type:"radio",name:"inputType",value:a},null,8,D),[[r["u"],e.inputTypeChecked]]),Object(r["g"])(" "+Object(r["s"])(n),1)])])})),128))])]),"ffz"===e.inputTypeChecked?(Object(r["l"])(),Object(r["e"])("section",x,[q,Object(r["h"])(u,{"onUpdate:imageUrl":e.onUpdateImageUrl},null,8,["onUpdate:imageUrl"])])):Object(r["d"])("",!0),"file-select"===e.inputTypeChecked?(Object(r["l"])(),Object(r["e"])("section",I,[E,Object(r["h"])(i,{"onUpdate:imageUrl":e.onUpdateImageUrl},null,8,["onUpdate:imageUrl"])])):Object(r["d"])("",!0),Object(r["f"])("section",null,[R,Object(r["f"])("ul",null,[Object(r["f"])("li",null,[Object(r["f"])("label",null,[_,Object(r["x"])(Object(r["f"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.negaModel=t}),type:"checkbox"},null,512),[[r["t"],e.negaModel]])])]),Object(r["f"])("li",null,[Object(r["f"])("label",null,[G,Object(r["x"])(Object(r["f"])("input",{"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.bgModel=t}),type:"range",min:"0",max:"255"},null,512),[[r["v"],e.bgModel,void 0,{number:!0}]]),Object(r["f"])("div",{class:"color-preview",style:Object(r["k"])({backgroundColor:"rgb(".concat(e.bgModel,",").concat(e.bgModel,",").concat(e.bgModel,")")})},null,4),Object(r["g"])(" "+Object(r["s"])(e.bgModel),1)])])])])],64)}function C(e,t,n){return Object(r["b"])({get:function(){return e[n]},set:function(e){t("update:".concat(n),e)}})}function F(e,t,n,a,o,c){return Object(r["l"])(),Object(r["e"])("input",{type:"file",onChange:t[0]||(t[0]=function(){return e.onFileSelect&&e.onFileSelect.apply(e,arguments)})},null,32)}Object(r["m"])();n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d");var S=Object(r["i"])({name:"TheInputFileSelect",emits:["update:imageUrl"],setup:function(e,t){var n=t.emit,r=function(e){var t,r,a=null!==(t=(null!==(r=e.target.files)&&void 0!==r?r:[])[0])&&void 0!==t?t:null,o=a?URL.createObjectURL(a):null;n("update:imageUrl",o)};return{onFileSelect:r}}});S.render=F;var M=S;Object(r["n"])("data-v-0a44722d");var z=Object(r["g"])(" twitchチャンネル名: "),A=["value"],L={key:0},Q={key:1},N=["value"],V=["src"];function J(e,t,n,a,o,c){return Object(r["l"])(),Object(r["e"])(r["a"],null,[Object(r["f"])("label",null,[z,Object(r["f"])("input",{type:"text",value:e.twitchName,onChange:t[0]||(t[0]=function(){return e.onTwitchNameSet&&e.onTwitchNameSet.apply(e,arguments)})},null,40,A)]),e.error?(Object(r["l"])(),Object(r["e"])("div",L,Object(r["s"])(e.error),1)):Object(r["d"])("",!0),e.ffzImageUrls.length>0?(Object(r["l"])(),Object(r["e"])("div",Q,[Object(r["f"])("ul",null,[(Object(r["l"])(!0),Object(r["e"])(r["a"],null,Object(r["q"])(e.ffzImageUrls,(function(n){return Object(r["l"])(),Object(r["e"])("li",{key:n,style:{display:"inline"}},[Object(r["f"])("label",null,[Object(r["x"])(Object(r["f"])("input",{"onUpdate:modelValue":[t[1]||(t[1]=function(t){return e.ffzImageUrlPicked=t}),t[2]||(t[2]=function(){return e.onPick&&e.onPick.apply(e,arguments)})],type:"radio",name:"ffz-image",value:n},null,8,N),[[r["u"],e.ffzImageUrlPicked]]),Object(r["f"])("img",{src:n,alt:"ffzImageUrl",width:"30"},null,8,V)])])})),128))])])):Object(r["d"])("",!0)],64)}Object(r["m"])();n("d81d"),n("5db7"),n("73d9"),n("07ac");var B,W=n("262e"),Z=n("2caf"),H=n("5530"),K=n("15fd"),X=n("ade3"),Y=n("53ca"),$=n("d4ec"),ee=n("bee2"),te=(n("4ec9"),n("b64b"),n("a15b"),n("4de4"),["body","secure","path","type","query","format","baseUrl","cancelToken"]);(function(e){e["Json"]="application/json",e["FormData"]="multipart/form-data",e["UrlEncoded"]="application/x-www-form-urlencoded"})(B||(B={}));var ne=function(){function e(){var t,n=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object($["a"])(this,e),this.baseUrl="https://api.frankerfacez.com",this.securityData=null,this.abortControllers=new Map,this.customFetch=function(){return fetch.apply(void 0,arguments)},this.baseApiParams={credentials:"same-origin",headers:{},redirect:"follow",referrerPolicy:"no-referrer"},this.setSecurityData=function(e){n.securityData=e},this.contentFormatters=(t={},Object(X["a"])(t,B.Json,(function(e){return null===e||"object"!==Object(Y["a"])(e)&&"string"!==typeof e?e:JSON.stringify(e)})),Object(X["a"])(t,B.FormData,(function(e){return Object.keys(e||{}).reduce((function(t,n){var r=e[n];return t.append(n,r instanceof Blob?r:"object"===Object(Y["a"])(r)&&null!==r?JSON.stringify(r):"".concat(r)),t}),new FormData)})),Object(X["a"])(t,B.UrlEncoded,(function(e){return n.toQueryString(e)})),t),this.createAbortSignal=function(e){if(n.abortControllers.has(e)){var t=n.abortControllers.get(e);return t?t.signal:void 0}var r=new AbortController;return n.abortControllers.set(e,r),r.signal},this.abortRequest=function(e){var t=n.abortControllers.get(e);t&&(t.abort(),n.abortControllers.delete(e))},this.request=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var r,a,o,c,u,i,s,d,f,b,m,h,p,v;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.body,a=t.secure,o=t.path,c=t.type,u=t.query,i=t.format,s=t.baseUrl,d=t.cancelToken,f=Object(K["a"])(t,te),e.t1=("boolean"===typeof a?a:n.baseApiParams.secure)&&n.securityWorker,!e.t1){e.next=6;break}return e.next=5,n.securityWorker(n.securityData);case 5:e.t1=e.sent;case 6:if(e.t0=e.t1,e.t0){e.next=9;break}e.t0={};case 9:return b=e.t0,m=n.mergeRequestParams(f,b),h=u&&n.toQueryString(u),p=n.contentFormatters[c||B.Json],v=i||m.format,e.abrupt("return",n.customFetch("".concat(s||n.baseUrl||"").concat(o).concat(h?"?".concat(h):""),Object(H["a"])(Object(H["a"])({},m),{},{headers:Object(H["a"])(Object(H["a"])({},c&&c!==B.FormData?{"Content-Type":c}:{}),m.headers||{}),signal:d?n.createAbortSignal(d):void 0,body:"undefined"===typeof r||null===r?null:p(r)})).then(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t,r.data=null,r.error=null,v){e.next=7;break}e.t0=r,e.next=10;break;case 7:return e.next=9,t[v]().then((function(e){return r.ok?r.data=e:r.error=e,r})).catch((function(e){return r.error=e,r}));case 9:e.t0=e.sent;case 10:if(a=e.t0,d&&n.abortControllers.delete(d),t.ok){e.next=14;break}throw a;case 14:return e.abrupt("return",a);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Object.assign(this,r)}return Object(ee["a"])(e,[{key:"encodeQueryParam",value:function(e,t){var n=encodeURIComponent(e);return"".concat(n,"=").concat(encodeURIComponent("number"===typeof t?t:"".concat(t)))}},{key:"addQueryParam",value:function(e,t){return this.encodeQueryParam(t,e[t])}},{key:"addArrayQueryParam",value:function(e,t){var n=this,r=e[t];return r.map((function(e){return n.encodeQueryParam(t,e)})).join("&")}},{key:"toQueryString",value:function(e){var t=this,n=e||{},r=Object.keys(n).filter((function(e){return"undefined"!==typeof n[e]}));return r.map((function(e){return Array.isArray(n[e])?t.addArrayQueryParam(n,e):t.addQueryParam(n,e)})).join("&")}},{key:"addQueryParams",value:function(e){var t=this.toQueryString(e);return t?"?".concat(t):""}},{key:"mergeRequestParams",value:function(e,t){return Object(H["a"])(Object(H["a"])(Object(H["a"])(Object(H["a"])({},this.baseApiParams),e),t||{}),{},{headers:Object(H["a"])(Object(H["a"])(Object(H["a"])({},this.baseApiParams.headers||{}),e.headers||{}),t&&t.headers||{})})}}]),e}(),re=function(e){Object(W["a"])(n,e);var t=Object(Z["a"])(n);function n(){var e;return Object($["a"])(this,n),e=t.apply(this,arguments),e.v1={userDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/user/".concat(t),method:"GET",format:"json"},n))},userDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_user/".concat(t),method:"GET",format:"json"},n))},userIdDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/user/id/".concat(t),method:"GET",format:"json"},n))},userIdDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_user/id/".concat(t),method:"GET",format:"json"},n))},userIdDetail3:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/user/_id/".concat(t),method:"GET",format:"json"},n))},userIdDetail4:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_user/_id/".concat(t),method:"GET",format:"json"},n))},emoteRecommendDetail:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.request(Object(H["a"])({path:"/v1/emote/".concat(t,"/recommend"),method:"GET",query:n,format:"json"},r))},emoteSimilarDetail:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.request(Object(H["a"])({path:"/v1/emote/".concat(t,"/similar"),method:"GET",query:n,format:"json"},r))},emoteDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/emote/".concat(t),method:"GET",format:"json"},n))},emotesList:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/emotes",method:"GET",query:t,format:"json"},n))},emoticonsList:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/emoticons",method:"GET",query:t,format:"json"},n))},badgeDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/badge/".concat(t),method:"GET",format:"json"},n))},badgeDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_badge/".concat(t),method:"GET",format:"json"},n))},badgesList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.request(Object(H["a"])({path:"/v1/badges",method:"GET",format:"json"},t))},badgesList2:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.request(Object(H["a"])({path:"/v1/_badges",method:"GET",format:"json"},t))},badgesIdsList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.request(Object(H["a"])({path:"/v1/badges/ids",method:"GET",format:"json"},t))},roomIdDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/room/id/".concat(t),method:"GET",format:"json"},n))},roomIdDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/room/_id/".concat(t),method:"GET",format:"json"},n))},roomDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/room/".concat(t),method:"GET",format:"json"},n))},roomIdDetail3:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_room/id/".concat(t),method:"GET",format:"json"},n))},roomIdDetail4:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_room/_id/".concat(t),method:"GET",format:"json"},n))},roomDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_room/".concat(t),method:"GET",format:"json"},n))},multiRoomDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/multi_room/".concat(t),method:"GET",format:"json"},n))},multiRoomIdDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/multi_room/id/".concat(t),method:"GET",format:"json"},n))},multiRoomIdDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/multi_room/_id/".concat(t),method:"GET",format:"json"},n))},multiRoomDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_multi_room/".concat(t),method:"GET",format:"json"},n))},multiRoomIdDetail3:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_multi_room/id/".concat(t),method:"GET",format:"json"},n))},multiRoomIdDetail4:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_multi_room/_id/".concat(t),method:"GET",format:"json"},n))},roomsDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/rooms/".concat(t),method:"GET",format:"json"},n))},roomsIdDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/rooms/id/".concat(t),method:"GET",format:"json"},n))},roomsIdDetail2:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/rooms/_id/".concat(t),method:"GET",format:"json"},n))},setGlobalList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.request(Object(H["a"])({path:"/v1/set/global",method:"GET",format:"json"},t))},setGlobalList2:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.request(Object(H["a"])({path:"/v1/_set/global",method:"GET",format:"json"},t))},getV1:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/set/".concat(t),method:"GET",format:"json"},n))},setDetail:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.request(Object(H["a"])({path:"/v1/_set/".concat(t),method:"GET",format:"json"},n))}},e}return n}(ne),ae=n("bc3a"),oe=n.n(ae),ce=Object(r["i"])({name:"TheInputFfz",emits:["update:imageUrl"],setup:function(e,t){var n=t.emit,a=Object(r["p"])(""),o=Object(r["p"])([]),c=Object(r["p"])(""),u=Object(r["p"])(""),i=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=new re,e.prev=1,u.value="",e.next=5,t.v1.roomDetail(a.value);case 5:return e.abrupt("return",e.sent.data);case 8:throw e.prev=8,e.t0=e["catch"](1),n="",e.t0.error&&(r=e.t0.error,o=r.status,c=r.error,i=r.message,n=" ".concat(o," ").concat(c," ").concat(i)),u.value="データを読み込めません。"+n,e.t0;case 14:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.value=t.target.value,e.next=3,i();case 3:n=e.sent,r=n.sets,o.value=Object.values(r).flatMap((function(e){return e.emoticons})).map((function(e){var t,n;return null!==(t=null!==(n=e.urls[4])&&void 0!==n?n:e.urls[2])&&void 0!==t?t:e.urls[1]})).map((function(e){return"https:".concat(e)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(c.value=t,!t){e.next=7;break}return e.next=4,oe.a.get(t,{responseType:"blob"});case 4:r=e.sent.data,a=URL.createObjectURL(r),n("update:imageUrl",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{twitchName:a,ffzImageUrls:o,ffzImageUrlPicked:c,error:u,onTwitchNameSet:s,onPick:d}}});n("8793");ce.render=J,ce.__scopeId="data-v-0a44722d";var ue=ce,ie={"file-select":"ファイル選択",ffz:"FFZ連携"},le=Object(r["i"])({name:"TheInput",components:{TheInputFfz:ue,TheInputFileSelect:M},props:{nega:{type:Boolean,default:!1},bg:{type:Number,default:255}},emits:["update:nega","update:bg","update:imageUrl"],setup:function(e,t){var n=t.emit,a=Object(r["p"])("file-select"),o=function(e){n("update:imageUrl",e)};return{inputTypes:ie,inputTypeChecked:a,negaModel:C(e,n,"nega"),bgModel:C(e,n,"bg"),onUpdateImageUrl:o}}});n("e5fe");le.render=P,le.__scopeId="data-v-6aed6b7c";var se=le;function de(e){return fe.apply(this,arguments)}function fe(){return fe=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r=new Image;r.addEventListener("load",(function(){e(r)})),r.addEventListener("error",(function(e){n(e)})),r.src=t})));case 1:case"end":return e.stop()}}),e)}))),fe.apply(this,arguments)}function be(e){return me.apply(this,arguments)}function me(){return me=Object(l["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,o,c,u=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:60,e.next=3,de(t);case 3:if(r=e.sent,a={width:n,height:Math.round(n*r.height/r.width)},o=document.createElement("canvas"),o.width=a.width,o.height=a.height,c=o.getContext("2d"),c){e.next=11;break}throw new Error("canvas context is null");case 11:return c.drawImage(r,0,0,a.width,a.height),e.abrupt("return",c.getImageData(0,0,a.width,a.height));case 13:case"end":return e.stop()}}),e)}))),me.apply(this,arguments)}function he(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");if(!n)throw new Error("canvas context is null");return n.putImageData(e,0,0),t.toDataURL()}var pe=n("b85c"),ve=(n("8a59"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("76dc"));function je(e){var t=new ImageData(e.width,e.height);return t.data.set(new Uint8ClampedArray(e.data)),t}var ge=function(e){return e},Oe=function(e){return ve(e)},ye=function(e){return function(t){for(var n=je(t),r=n.data,a=0;a<r.length;a+=4){var o=255-t.data[a+3];r[a]=we(r[a],e,o),r[a+1]=we(r[a+1],e,o),r[a+2]=we(r[a+2],e,o),r[a+3]=255}return n}};function we(e,t,n){return Math.round((e*(255-n)+t*n)/255)}var Te=function(e){for(var t=je(e),n=t.data,r=0;r<n.length;++r)r%4!==3&&(n[r]=255-n[r]);return t};function ke(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){var n,r=e,a=Object(pe["a"])(t);try{for(a.s();!(n=a.n()).done;){var o=n.value;r=o(r)}}catch(c){a.e(c)}finally{a.f()}return r}}var Ue=n("b9ee"),De=Object(r["i"])({name:"App",components:{TheInput:se,ThePreview:T,TheOutput:p},setup:function(){var e=Object(r["o"])({nega:!1,bg:255,imageUrl:null}),t=Object(r["o"])({imageDataRaw:null,imageDataFiltered:null}),n=Object(r["p"])(""),a=function(t){e.imageUrl=t};return Object(r["w"])((function(){return e}),Object(l["a"])(regeneratorRuntime.mark((function r(){var a,o,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e.imageUrl){r.next=11;break}return r.next=3,be(e.imageUrl,60);case 3:return a=r.sent,o=ke(e.nega?Te:ge,ye(e.bg),Oe),c=o(a),t.imageDataRaw=a,t.imageDataFiltered=c,r.next=10,Object(Ue["tenjify"])(he(c));case 10:n.value=r.sent;case 11:case"end":return r.stop()}}),r)}))),{deep:!0}),{input:e,preview:t,output:n,onUpdateImageUrl:a}}});n("2a33");De.render=i;var xe=De;Object(r["c"])(xe).mount("#app")},d735:function(e,t,n){"use strict";n("7a80")},e5fe:function(e,t,n){"use strict";n("29f5")}});
//# sourceMappingURL=index.875ca6a0.js.map