(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-445548d6"],{"0418":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Header"}},[a("van-nav-bar",{staticClass:"hNavBar",attrs:{title:t.title,"left-text":"返回","left-arrow":""},on:{"click-left":t.goback,"click-right":t.toHome}},[a("van-icon",{class:{"d-none":t.hiddenHome},attrs:{slot:"right",name:"wap-home-o",size:"1.5rem"},slot:"right"})],1)],1)},s=[],r=(a("b0c0"),a("2fa7")),i=(a("c3a6"),a("ad06")),c=(a("68ef"),a("09fe"),a("8a0b"),a("2638")),o=a.n(c),l=a("d282"),f=a("a142"),d=a("ba31"),u=a("b1d2"),b=Object(l["a"])("nav-bar"),v=b[0],p=b[1];function m(t,e,a,n){var s;return t("div",o()([{class:[p({fixed:e.fixed}),(s={},s[u["a"]]=e.border,s)],style:{zIndex:e.zIndex}},Object(d["b"])(n)]),[t("div",{class:p("left"),on:{click:n.listeners["click-left"]||f["e"]}},[a.left?a.left():[e.leftArrow&&t(i["a"],{class:p("arrow"),attrs:{name:"arrow-left"}}),e.leftText&&t("span",{class:p("text")},[e.leftText])]]),t("div",{class:[p("title"),"van-ellipsis"]},[a.title?a.title():e.title]),t("div",{class:p("right"),on:{click:n.listeners["click-right"]||f["e"]}},[a.right?a.right():e.rightText&&t("span",{class:p("text")},[e.rightText])])])}m.props={title:String,fixed:Boolean,leftText:String,rightText:String,leftArrow:Boolean,border:{type:Boolean,default:!0},zIndex:{type:Number,default:1}};var g,h=v(m),x={props:{title:String,hiddenHome:Boolean},components:(g={},Object(r["a"])(g,h.name,h),Object(r["a"])(g,i["a"].name,i["a"]),g),methods:{goback:function(){this.$router.go(-1)},toHome:function(){this.$router.push("/type")}}},k=x,_=(a("c517"),a("2877")),y=Object(_["a"])(k,n,s,!1,null,"0fb4c06a",null);e["a"]=y.exports},"2fa7b":function(t,e,a){},"303b":function(t,e,a){t.exports=a.p+"img/st.a5fcb8a2.jpg"},"5f1a":function(t,e,a){"use strict";a("68ef"),a("09fe"),a("9b7e")},"8a02":function(t,e,a){"use strict";a.r(e);var n,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Header",{attrs:{title:"选择商家"}}),a("div",{staticClass:"main pt-2"},[t._m(0),a("p",[a("i",[t._v("订餐类型："),a("span",{staticClass:"text-danger"},[t._v(t._s(t.orderType))])])]),a("ul",{staticClass:"ulBox"},[a("strong",{staticClass:"d-block mb-2"},[t._v(" 可选商家 ")]),a("li",{staticClass:"d-flex justify-content-between",on:{click:t.toNext}},[t._m(1),a("div",{staticClass:"areaName"},[a("div",{staticClass:"font-weight-bold"},[t._v(" 第一食堂三楼职工食堂 ")]),a("div",{staticClass:"d-flex justify-content-between small"},[a("div",{staticStyle:{height:"18px","line-height":"18px",color:"#ff9900"}},[a("van-icon",{attrs:{name:"star"}}),a("van-icon",{attrs:{name:"star"}}),a("van-icon",{attrs:{name:"star"}}),a("van-icon",{attrs:{name:"star"}}),a("van-icon",{attrs:{name:"star"}})],1),a("van-tag",{attrs:{plain:"",type:"danger"}},[t._v("食堂配送")])],1),a("div",{staticClass:"small text-secondary"},[t._v("这是场所的备注一二三四五六七八九十个十百千万gdsf")])])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("i",[t._v("配送地址："),a("span",{staticClass:"text-danger"},[t._v("杨颖滨大楼3楼某某科301病房1号床位")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex flex-column justify-content-center"},[n("img",{staticClass:"d-block border round",staticStyle:{height:"50px",width:"50px"},attrs:{src:a("303b")}})])}],i=(a("b0c0"),a("2fa7")),c=(a("5f1a"),a("a3e2")),o=(a("c3a6"),a("ad06")),l=a("0418"),f={components:(n={Header:l["a"]},Object(i["a"])(n,o["a"].name,o["a"]),Object(i["a"])(n,c["a"].name,c["a"]),n),data:function(){return{orderType:"病人治疗餐"}},methods:{toNext:function(){this.$router.push("/date")}}},d=f,u=(a("a3e8"),a("2877")),b=Object(u["a"])(d,s,r,!1,null,"8c3467e0",null);e["default"]=b.exports},"8a0b":function(t,e,a){},"9b7e":function(t,e,a){},a3e2:function(t,e,a){"use strict";var n=a("2638"),s=a.n(n),r=a("d282"),i=a("ba31"),c=a("b1d2"),o=a("ad06"),l=Object(r["a"])("tag"),f=l[0],d=l[1];function u(t,e,a,n){var r,l,f=e.type,u=e.mark,b=e.plain,v=e.color,p=e.round,m=e.size,g=b?"color":"backgroundColor",h=(r={},r[g]=v,r);e.textColor&&(h.color=e.textColor);var x={mark:u,plain:b,round:p};m&&(x[m]=m);var k=t("span",s()([{style:h,class:[d([x,f]),(l={},l[c["b"]]=b,l)]},Object(i["b"])(n,!0)]),[a.default&&a.default(),e.closeable&&t(o["a"],{attrs:{name:"cross"},class:d("close"),on:{click:function(){Object(i["a"])(n,"close")}}})]);return e.closeable?t("transition",{attrs:{name:"van-fade"}},[k]):k}u.props={size:String,mark:Boolean,color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean,type:{type:String,default:"default"}},e["a"]=f(u)},a3e8:function(t,e,a){"use strict";var n=a("2fa7b"),s=a.n(n);s.a},bc99:function(t,e,a){},c3a6:function(t,e,a){"use strict";a("68ef"),a("09fe")},c517:function(t,e,a){"use strict";var n=a("bc99"),s=a.n(n);s.a}}]);
//# sourceMappingURL=chunk-445548d6.f23551b9.js.map