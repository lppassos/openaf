/*v:0.1.4;a:Nuno Aguiar*/
var nLinq_USE_CASE=!1,nLinq=function(k,l){$$(k).isMap()&&(l=_$(l,"aKey").isString().default("_key"),k=Object.keys(k).map(a=>{$$(k[a]).isMap()&&(k[a][l]=a);return k[a]}));var g=k,m="",d=nLinq_USE_CASE,f=!1,n=!1,t=0,y=0,C=!1,w=[],G=function(a,b){if(null===a||void 0===a||null===b||void 0===b)return a===b;if(a.constructor!==b.constructor)return!1;if(a instanceof Function||a instanceof RegExp)return a===b;if(a===b||a.valueOf()===b.valueOf())return!0;if(Array.isArray(a)&&a.length!==b.length||a instanceof
Date||!(a instanceof Object)||!(b instanceof Object))return!1;var e=Object.keys(a),h=Object.keys(b);if(e.length!=h.length)return!1;for(var p in a)if(e=a[p],$$(b[p]).isUnDef()||!G(e,b[p]))return!1;return!0},I=function(a,b,e){_$(a).isArray().$_();var h,p=!1;for(h=0;h<a.length&&!p;h++){var r=$$(e).isFunction()?e(a[h]):a[h];G(b,r)&&(p=!0)}return p?h-1:-1},A=function(a){if(!$$(a).isMap())return a;var b={};Object.keys(a).sort().forEach(e=>{b[e]=$$(a[e]).isMap()?A(a[e]):a[e]});return b},J=function(a,b){var e=
b.map(h=>JSON.stringify(A(h),void 0,""));return a.filter(h=>0>e.indexOf(JSON.stringify(A(h),void 0,"")))},K=function(a,b){var e=b.map(h=>JSON.stringify(A(h),void 0,""));return a.filter(h=>0<=e.indexOf(JSON.stringify(A(h),void 0,"")))},L=function(a,b){var e=a.map(h=>JSON.stringify(A(h),void 0,""));return a.concat(b.filter(h=>0>e.indexOf(JSON.stringify(A(h),void 0,""))))},M=function(a,b){return a.map(e=>b.map(h=>isMap(h)?merge(e,h):[e,h])).reduce((e,h)=>e.concat(h))},v=(a,b)=>{$$(a).isFunction()&&(a=
a());$$(a).isArray()||(a=[a]);if(!$$(a).isUnDef()){if(0==m.length){if(C)return[];0!=y&&(a=a.slice(y));return 0!=t?a.slice(0>t?t:0,0<t?t:void 0):a}m=m.replace(/;/g," ");var e=$$(b).isFunction()?b:new Function("r","whereFn","return $$(r).isDef() ? ("+m+") : void 0");g=0!=t?C?a.filter(h=>!e(h,w)).slice(0>t?t:0,0<t?t:void 0):a.filter(h=>e(h,w)).slice(0>t?t:0,0<t?t:void 0):C?a.filter(h=>!e(h,w)):a.filter(h=>e(h,w));0!=y&&(g=g.slice(y));return g}},N=a=>{if($$(a).isString()&&a.replace(/^[^a-zA-Z_$]|[^\w\[\]\.$]/g,
"")==a)return a;if($$(a).isDef())throw"'"+a+"' is not a valid key.";},E=a=>{$$(a).isNumber()||$$(a).isBoolean()||($$(a).isString()&&(a=d?a:a.toLowerCase()),a=JSON.stringify(a,void 0,""));return a},O=a=>{var b=(h,p,r)=>{var u=Object.keys(h);_$(p,"aFunc").isFunction().$_();r=_$(r).isString().default("");for(var x in u)$$(h[u[x]]).isMap()||$$(h[u[x]]).isArray()?b(h[u[x]],p,(""==r?"":r+".")+u[x]):p(u[x],h[u[x]],r,h)},e={};b(a,(h,p,r,u)=>{e[r+(""==r?"":".")+h]=p});return e},q=(a,b,e,h,p,r)=>{if($$(r).isUnDef()&&
$$(a).isMap()){var u=O(a);Object.keys(u).forEach(z=>{q(z,u[z],e,h)})}else{var x=!0;if(p){p=$$(r).isDef();var B=b;b=E(p?b:a);r=E(p?r:B)}else{p=$$(b).isDef();b=E(p?b:a);try{a=p?N(a):void 0}catch(z){if(0<String(z).indexOf("is not a valid key"))x=!1;else throw z;}}0<=e.indexOf("{ki}")&&(e=e.replace(/{ki}/g,$$(b).isString()&&!d?".toLowerCase()":""));0<=e.indexOf("{ski}")&&(e=e.replace(/{ski}/g,$$(b).isString()&&!d?"String(":""));0<=e.indexOf("{eki}")&&(e=e.replace(/{eki}/g,$$(b).isString()&&!d?").toLowerCase()":
""));e=p?e.replace(/{k}/g,x?"r."+a:"$$$$(r).get("+JSON.stringify(a)+")"):e.replace(/{k}/g,"r");$$(b).isString()&&(b=b.replace(/\$/g,"$$$"));$$(r).isDef()?($$(r).isString()&&(r=r.replace(/\$/g,"$$$")),r=E(r),e=e.replace(/{v}/g,b).replace(/{v2}/g,r)):e=e.replace(/{v}/g,b);D(e,h)}},D=(a,b)=>{b=_$(b).default(f);0<m.length&&(m=b?"("+m+") || ":m+" && ");m+="("+a+")"},c={_setState:a=>{_$(a,"map").isMap().$_();m=a.where;d=a.useCase;f=a.useOr;n=a.useNot;t=a.alimit;y=a.askip;C=a.negative;w=a.whereFn;return c},
_getState:()=>({where:m,useCase:d,useOr:f,useNot:n,alimit:t,askip:y,negative:C,whereFn:w}),useCase:a=>{d=$$(a).isUnDef()||a?!0:!1;return c},ignoreCase:a=>{d=$$(a).isUnDef()||a?!1:!0;return c},limit:a=>{$$(a).isNumber()&&(t=a);return c},head:a=>{c.limit(a);return c},tail:a=>{$$(a).isNumber()&&(t=-a);return c},or:()=>{f=!0;return c},and:()=>{f=!1;return c},not:()=>{n=!0;return c},andNot:()=>{f=!1;n=!0;return c},orNot:()=>{n=f=!0;return c},setWhere:a=>{D(a,!1);return c},where:a=>{f?n?c.orNotWhere(a):
c.orWhere(a):n?c.andNotWhere(a):c.andWhere(a);return c},orWhere:a=>{_$(a,"fn").isFunction().$_();w.push(a);D("whereFn["+(w.length-1)+"](r)",!0);return c},andWhere:a=>{_$(a,"fn").isFunction().$_();w.push(a);D("whereFn["+(w.length-1)+"](r)",!1);return c},notWhere:a=>{f?c.orNotWhere(a):c.andNotWhere(a);return c},andNotWhere:a=>{_$(a,"fn").isFunction().$_();w.push(a);D("!whereFn["+(w.length-1)+"](r)",!1);return c},orNotWhere:a=>{_$(a,"fn").isFunction().$_();w.push(a);D("!whereFn["+(w.length-1)+"](r)",
!0);return c},starts:(a,b)=>{f?n?c.orNotStarts(a,b):c.orStarts(a,b):n?c.andNotStarts(a,b):c.andStarts(a,b);return c},ends:(a,b)=>{f?n?c.orNotEnds(a,b):c.orEnds(a,b):n?c.andNotEnds(a,b):c.andEnds(a,b);return c},equals:(a,b)=>{f?n?c.orNotEquals(a,b):c.orEquals(a,b):n?c.andNotEquals(a,b):c.andEquals(a,b);return c},greater:(a,b)=>{f?n?c.orNotGreater(a,b):c.orGreater(a,b):n?c.andNotGreater(a,b):c.andGreater(a,b);return c},less:(a,b)=>{f?n?c.orNotLess(a,b):c.orLess(a,b):n?c.andNotLess(a,b):c.andLess(a,
b);return c},greaterEquals:(a,b)=>{f?n?c.orNotGreaterEquals(a,b):c.orGreaterEquals(a,b):n?c.andNotGreaterEquals(a,b):c.andGreaterEquals(a,b);return c},lessEquals:(a,b)=>{f?n?c.orNotLessEquals(a,b):c.orLessEquals(a,b):n?c.andNotLessEquals(a,b):c.andLessEquals(a,b);return c},contains:(a,b)=>{f?n?c.orNotContains(a,b):c.orContains(a,b):n?c.andNotContains(a,b):c.andContains(a,b);return c},empty:(a,b)=>{f?n?c.orNotEmpty(a,b):c.orEmpty(a,b):n?c.andNotEmpty(a,b):c.andEmpty(a,b);return c},match:(a,b)=>{f?
n?c.orNotMatch(a,b):c.orMatch(a,b):n?c.andNotMatch(a,b):c.andMatch(a,b);return c},type:(a,b)=>{f?n?c.orNotType(a,b):c.orType(a,b):n?c.andNotType(a,b):c.andType(a,b);return c},between:(a,b,e)=>{f?n?c.orNotBetween(a,b,e):c.orBetween(a,b,e):n?c.andNotBetween(a,b,e):c.andBetween(a,b,e);return c},betweenEquals:(a,b,e)=>{f?n?c.orNotBetweenEquals(a,b,e):c.orBetweenEquals(a,b,e):n?c.andNotBetweenEquals(a,b,e):c.andBetweenEquals(a,b,e);return c},is:a=>{f?n?c.orNotIs(a):c.orIs(a):n?c.andNotIs(a):c.andIs(a);
return c},andStarts:(a,b)=>{q(a,b,"String({k}){ki}.startsWith({v})",!1);return c},andEnds:(a,b)=>{q(a,b,"String({k}){ki}.endsWith({v})",!1);return c},andEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} == {v}",!1);return c},andGreater:(a,b)=>{q(a,b,"{ski}{k}{eki} > {v}",!1);return c},andLess:(a,b)=>{q(a,b,"{ski}{k}{eki} < {v}",!1);return c},andGreaterEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} >= {v}",!1);return c},andLessEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} <= {v}",!1);return c},andContains:(a,b)=>{q(a,b,"String({k}){ki}.indexOf({v}) >= 0",
!1);return c},andEmpty:(a,b)=>{q(a,"","($$({k}).isUnDef() || String({k}){ki}.length == 0)",!1);return c},andMatch:(a,b)=>{q(a,b,"String({k}){ki}.match({v})",!1);return c},andType:(a,b)=>{q(a,b,"typeof {k} == {v}",!1);return c},andBetween:(a,b,e)=>{q(a,b,"({ski}{k}{eki} > {v} && {ski}{k}{eki} < {v2})",!1,!0,e);return c},andBetweenEquals:(a,b,e)=>{q(a,b,"({ski}{k}{eki} >= {v} && {ski}{k}{eki} <= {v2})",!1,!0,e);return c},andIs:a=>{q(a,"","{k} != null && {k}",!1);return c},notStarts:(a,b)=>{f?c.orNotStarts(a,
b):c.andNotStarts(a,b);return c},notEnds:(a,b)=>{f?c.orNotEnds(a,b):c.andNotEnds(a,b);return c},notEquals:(a,b)=>{f?c.orNotEquals(a,b):c.andNotEquals(a,b);return c},notGreater:(a,b)=>{f?c.orNotGreater(a,b):c.andNotGreater(a,b);return c},notLess:(a,b)=>{f?c.orNotLess(a,b):c.andNotLess(a,b);return c},notGreaterEquals:(a,b)=>{f?c.orNotGreaterEquals(a,b):c.andNotGreaterEquals(a,b);return c},notLessEquals:(a,b)=>{f?c.orNotLessEquals(a,b):c.andNotLessEquals(a,b);return c},notContains:(a,b)=>{f?c.orNotContains(a,
b):c.andNotContains(a,b);return c},notEmpty:(a,b)=>{f?c.orNotEmpty(a,b):c.andNotEmpty(a,b);return c},notMatch:(a,b)=>{f?c.orNotMatch(a,b):c.andNotMatch(a,b);return c},notType:(a,b)=>{f?c.orNotType(a,b):c.andNotType(a,b);return c},notBetween:(a,b,e)=>{f?c.orNotBetween(a,b,e):c.andNotBetween(a,b,e);return c},notBetweenEquals:(a,b,e)=>{f?c.orNotBetweenEquals(a,b,e):c.andNotBetweenEquals(a,b,e);return c},notIs:a=>{f?c.orNotIs(a):c.andNotIs(a);return c},andNotStarts:(a,b)=>{q(a,b,"!(String({k}){ki}.startsWith({v}))",
!1);return c},andNotEnds:(a,b)=>{q(a,b,"!(String({k}){ki}.endsWith({v}))",!1);return c},andNotEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} != {v}",!1);return c},andNotGreater:(a,b)=>{q(a,b,"{ski}{k}{eki} <= {v}",!1);return c},andNotLess:(a,b)=>{q(a,b,"{ski}{k}{eki} >= {v}",!1);return c},andNotGreaterEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} < {v}",!1);return c},andNotLessEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} > {v}",!1);return c},andNotContains:(a,b)=>{q(a,b,"String({k}){ki}.indexOf({v}) < 0",!1);return c},andNotEmpty:(a,
b)=>{q(a,"","($$({k}).isDef() && String({k}){ki}.length != 0)",!1);return c},andNotMatch:(a,b)=>{q(a,b,"!(String({k}){ki}.match({v}))",!1);return c},andNotType:(a,b)=>{q(a,b,"typeof {k} != {v}",!1);return c},andNotBetween:(a,b,e)=>{q(a,b,"({ski}{k}{eki} < {v} || {ski}{k}{eki} > {v2})",!1,!0,e);return c},andNotBetweenEquals:(a,b,e)=>{q(a,b,"({ski}{k}{eki} <= {v} || {ski}{k}{eki} >= {v2})",!1,!0,e);return c},andNotIs:a=>{q(a,"","{k} == null || !({k})",!1);return c},orStarts:(a,b)=>{q(a,b,"String({k}){ki}.startsWith({v})",
!0);return c},orEnds:(a,b)=>{q(a,b,"String({k}){ki}.endsWith({v})",!0);return c},orEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} == {v}",!0);return c},orGreater:(a,b)=>{q(a,b,"{ski}{k}{eki} > {v}",!0);return c},orLess:(a,b)=>{q(a,b,"{ski}{k}{eki} < {v}",!0);return c},orGreaterEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} >= {v}",!0);return c},orLessEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} <= {v}",!0);return c},orContains:(a,b)=>{q(a,b,"String({k}){ki}.indexOf({v}) >= 0",!0);return c},orEmpty:(a,b)=>{q(a,"","($$({k}).isUnDef() || String({k}){ki}.length == 0)",
!0);return c},orMatch:(a,b)=>{q(a,b,"String({k}){ki}.match({v})",!0);return c},orType:(a,b)=>{q(a,b,"typeof {k} == {v}",!0);return c},orBetween:(a,b,e)=>{q(a,b,"({ski}{k}{eki} > {v} && {ski}{k}{eki} < {v2})",!0,e);return c},orBetweenEquals:(a,b,e)=>{q(a,b,"({ski}{k}{eki} >= {v} && {ski}{k}{eki} <= {v2})",!0,e);return c},orIs:a=>{q(a,"","{k} != null && {k}",!0);return c},orNotStarts:(a,b)=>{q(a,b,"!(String({k}){ki}.startsWith({v}))",!0);return c},orNotEnds:(a,b)=>{q(a,b,"!(String({k}){ki}.endsWith({v}))",
!0);return c},orNotEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} != {v}",!0);return c},orNotGreater:(a,b)=>{q(a,b,"{ski}{k}{eki} <= {v}",!0);return c},orNotLess:(a,b)=>{q(a,b,"{ski}{k}{eki} >= {v}",!0);return c},orNotGreaterEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} < {v}",!0);return c},orNotLessEquals:(a,b)=>{q(a,b,"{ski}{k}{eki} > {v}",!0);return c},orNotContains:(a,b)=>{q(a,b,"String({k}){ki}.indexOf({v}) < 0",!0);return c},orNotEmpty:(a,b)=>{q(a,"","($$({k}).isDef() && String({k}){ki}.length != 0)",!0);return c},
orNotMatch:(a,b)=>{q(a,b,"!(String({k}){ki}.match({v}))",!0);return c},orNotType:(a,b)=>{q(a,b,"typeof {k} != {v}",!0);return c},orNotBetween:(a,b,e)=>{q(a,b,"({ski}{k}{eki} < {v} || {ski}{k}{eki} > {v2})",!1,!0,e);return c},orNotBetweenEquals:(a,b,e)=>{q(a,b,"({ski}{k}{eki} <= {v} || {ski}{k}{eki} >= {v2})",!1,!0,e);return c},orNotIs:a=>{q(a,"","{k} == null || !({k})",!0);return c},min:a=>{a=_$(a).isString().default(void 0);var b;c.select(e=>{var h=$$(a).isDef()?Number($$(e).get(a)):Number(e);null!=
h&&$$(h).isNumber()&&($$(b).isUnDef()?b=e:($$(a).isDef()&&$$(b).get(a)>h&&(b=e),$$(a).isUnDef()&&b>h&&(b=e)))});return b},max:a=>{a=_$(a).isString().default(void 0);var b;c.select(e=>{var h=$$(a).isDef()?Number($$(e).get(a)):Number(e);null!=h&&$$(h).isNumber()&&($$(b).isUnDef()?b=e:($$(a).isDef()&&$$(b).get(a)<h&&(b=e),$$(a).isUnDef()&&b<h&&(b=e)))});return b},average:a=>{a=_$(a).isString().default(void 0);var b=0,e=0;c.select(h=>{h=$$(a).isDef()?Number($$(h).get(a)):Number(h);null!=h&&$$(h).isNumber()&&
(e++,b+=h)});return 0<e?b/e:void 0},sum:a=>{a=_$(a).isString().default(void 0);var b=0;c.select(e=>{e=$$(a).isDef()?Number($$(e).get(a)):Number(e);null!=e&&$$(e).isNumber()&&(b+=e)});return b},distinct:a=>{a=_$(a).isString().default(void 0);var b=[];c.select(e=>{e=$$(a).isDef()?$$(e).get(a):e;0>b.indexOf(e)&&b.push(e)});return b},group:a=>{a=_$(a).isString().default(void 0);var b={};c.select(e=>{var h=$$(a).isDef()?$$(e).get(a):e;$$(h).isBoolean()&&(h=String(h));0>Object.keys(b).indexOf(h)?b[h]=[e]:
b[h].push(e)});return b},groupBy:a=>{a=_$(a).isString().default("key");var b=a.split(",");a={};var e=(h,p,r)=>{Object.keys(h).forEach((u,x)=>{r[u]={};p+1<b.length&&e(nLinq(h[u]).group(b[p+1]),p+1,r[u]);b.length==p+1&&(r[u]=h[u])})};return 0<b.length?(e(c.group(b[0]),0,a),a):[]},minBy:(a,b,e,h)=>c.fnBy(a,p=>$$(nLinq(p).min(b)).get(b),_$(e).default("_min"),h),maxBy:(a,b,e,h)=>c.fnBy(a,p=>$$(nLinq(p).max(b)).get(b),_$(e).default("_max"),h),averageBy:(a,b,e,h)=>c.fnBy(a,p=>nLinq(p).average(b),_$(e).default("_avg"),
h),sumBy:(a,b,e,h)=>c.fnBy(a,p=>nLinq(p).sum(b),_$(e).default("_sum"),h),countBy:(a,b,e)=>c.fnBy(a,h=>nLinq(h).count(),_$(b).default("_count"),e),fnBy:(a,b,e,h)=>{a=_$(a).isString().default("key");b=_$(b).isFunction().default(B=>B.length);e=_$(e).isString().default("_result");h=_$(h).isString().default(a);var p=a.split(","),r=h.split(","),u=[],x=(B,z,F)=>{Object.keys(B).forEach((H,P)=>{F[r[z]]=H;z+1<p.length&&x(nLinq(B[H]).group(p[z+1]),z+1,F);p.length==z+1&&(F[e]=b(B[H]),u.push(clone(F)))})};return 0<
p.length?(x(c.group(p[0]),0,{}),u):[]},at:a=>{_$(a,"index").isNumber().$_();g=v(g);return g[Number(a)]},all:a=>{g=v(g);return $$(g).isArray()?g.length==k.length:a},count:()=>{g=v(g);return g.length},first:a=>{g=v(g);return 0<g.length?g[0]:a},last:a=>{g=v(g);return 0<g.length?g[g.length-1]:a},any:()=>{g=v(g);return 0<g.length},none:()=>{g=v(g);return 0==g.length},reverse:()=>{g=v(g);return g.reverse()},each:a=>{_$(a,"each function").isFunction().$_();c.select(a);return c},intersect:a=>{_$(a,"intersect param").isArray().$_();
g=v(g);g=K(g,a);return c},except:a=>{_$(a,"except param").isArray().$_();g=v(g);g=J(g,a);return c},union:a=>{_$(a,"union param").isArray().$_();g=v(g);g=L(g,a);return c},cartesian:a=>{_$(a,"cartesian param").isArray().$_();g=v(g);g=M(g,a);return c},attach:(a,b)=>{_$(a,"key").$_();_$(b,"value").$_();g=v(g);g=$$(b).isFunction()?g.map(e=>{$$(e).set(a,b(e));return e}):g.map(e=>{$$(e).set(a,b);return e});return c},toDate:a=>{_$(a,"key").$_();g=v(g);g.forEach(b=>{try{var e=$$(b).get(a);($$(e).isString()||
$$(e).isNumber())&&$$(b).set(a,new Date(e))}catch(h){}});return c},filter:a=>{_$(a,"value").$_();g=v(g);g=g.filter(b=>{var e=!0;$$(a).isMap()&&$$(b).isMap()&&Object.keys(a).forEach(h=>{G(a[h],b[h])||(e=!1)});$$(b).isArray()&&0>I(b,a)&&(e=!1);$$(a).isFunction()&&!a(b)&&(e=!1);($$(a).isNumber()||$$(a).isString())&&($$(b).isNumber()||$$(b).isString())&&b!=a&&(e=!1);return e});return c},sort:function(){var a="";g=v(g);for(var b=0;b<arguments.length;b++){var e=arguments[b],h=!1;e.startsWith("-")&&(h=!0,
e=e.substr(1,e.length-1));a=0<a.length?a+" || ":"return ";a=h?a+(' ($$(a).get("'+e+'") > $$(b).get("'+e+'") ? -1 : ($$(a).get("'+e+'") < $$(b).get("'+e+'") ? 1 : 0)) '):a+(' ($$(a).get("'+e+'") > $$(b).get("'+e+'") ? 1 : ($$(a).get("'+e+'") < $$(b).get("'+e+'") ? -1 : 0)) ')}g=g.sort(new Function("a","b",a));return c},assign:(a,b,e,h,p)=>{g=v(g);g.forEach(r=>{r[b]=nLinq(a).equals(h,$$(r).get(e)).first(p)});return c},join:(a,b,e,h)=>{g=v(g);g.forEach(p=>{p[b]=nLinq(a).equals(h,$$(p).get(e)).select()});
return c},skip:a=>{_$(a).isNumber().$_();y=a;return c},skipWhile:a=>{_$(a,"skip function").isFunction().$_();c.notWhere(a);return c},takeWhile:a=>{_$(a,"take function").isFunction().$_();c.where(a);return c},take:a=>{_$(a).isNumber().$_();return c.limit(a)},skipTake:(a,b)=>{_$(a).isNumber().$_();return c.skip(a).take(b)},apply:a=>{a=_$(a,"aMap").isMap().default({});a.where=_$(a.where,"where").isArray().default([]);a.select=_$(a.select,"select").default(void 0);a.transform=_$(a.transform,"transform").isArray().default([]);
a.selector=_$(a.selector,"selector").isMap().default(void 0);a.where.forEach(e=>{$$(e.cond).isString()&&(c=c[e.cond].apply(c,e.args))});a.transform.forEach(e=>{$$(e.func).isString()&&(c=c[e.func].apply(c,e.args))});var b;$$(a.select).isString()&&(b=c.tselect(new Function("elem","index","array",a.select)));$$(a.select).isMap()&&(b=c.select(a.select));$$(b).isUnDef()&&$$(a.selector).isMap()&&(b=$$(a.selector.func).isString()?$$({}).set(a.selector.func,c[a.selector.func].apply(c,a.selector.args)):b);
$$(b).isUnDef()&&$$(a.select).isUnDef()&&(b=c.select());return b},select:a=>{g=v(g);if($$(a).isUnDef())return g;if($$(a).isFunction())return g.map(a);if($$(a).isArray()){var b={};a.forEach(h=>{if($$(h).isString())if(0<h.indexOf(":")){var p=h.substring(0,h.indexOf(":"));h=h.substring(h.indexOf(":")+1);b[p]=h}else b[h]=h});return g.map(h=>{var p={};Object.keys(b).forEach(r=>$$(p).set(r,$$(h).get(b[r])));return p})}if($$(a).isMap()){var e=Object.keys(a);return g.map(h=>{var p={};e.forEach(r=>{$$($$(h).get(r)).isDef()?
$$(p).set(r,$$(h).get(r)):$$(p).set(r,$$(a).get(r))});return p})}},mselect:(a,b,e)=>{a=c.select(a);b=_$(b,"aKey").isString().default("_key");e=_$(e,"dontRemove").isBoolean().default(!0);var h={},p;for(p in a){var r=a[p];if($$(b).isDef()&&$$(r[b]).isDef()){var u=r[b];h[u]=r;e||delete h[u][b]}else h["row"+p]=r}return h},define:a=>{g=c.select(a);return c},removed:a=>{C=!0;g=c.select(a);return c},stream:a=>{var b=0<t?t:1;a=c.streamFn(a);do a(),0<t&&b--;while($$(g).isDef()&&0<b)},streamFn:a=>()=>{var b=
c.select(a);g=$$(k).isFunction()?k():k;return b},query:a=>{a=_$(a,"aMap").isMap().default({});a.where=_$(a.where,"where").isArray().default([]);a.select=_$(a.select,"select").default(void 0);a.transform=_$(a.transform,"transform").isArray().default([]);a.selector=_$(a.selector,"selector").isMap().default(void 0);a.where.forEach(e=>{$$(e.cond).isString()&&(c=c[e.cond].apply(c,e.args))});a.transform.forEach(e=>{$$(e.func).isString()&&(c=c[e.func].apply(c,e.args))});var b;$$(a.select).isString()&&(b=
c.tselect(newFn("elem","index","array",a.select)));$$(a.select).isMap()&&(b=c.select(a.select));$$(b).isUnDef()&&$$(a.selector).isMap()&&(b=$$(a.selector.func).isString()?c[a.selector.func].apply(c,a.selector.args):b);$$(b).isUnDef()&&$$(a.select).isUnDef()&&(b=c.select());return b}};return c},$from=nLinq;"defined"!=typeof isJavaObject&&(isJavaObject=()=>!1);
const $$=function(k){return{get:l=>{if($$(k).isObject()){l=l.replace(/\[(\w+)\]/g,".$1");l=l.replace(/^\./,"");l=l.split(".");for(var g=0,m=l.length;g<m;++g){var d=l[g];if(d in k)k=k[d];else return}return k}},getI:l=>{if($$(k).isObject()){l=l.replace(/\[(\w+)\]/g,".$1");l=l.replace(/^\./,"");l=l.split(".");for(var g=0,m=l.length;g<m;++g){var d=l[g];if($$(k).isMap()){var f={};d=String(d).toUpperCase();Object.keys(k).forEach(n=>f[n.toUpperCase()]=n);if(d in f)k=k[f[d]];else return}else if(d in k)k=
k[d];else return}return k}},set:(l,g)=>{if($$(k).isObject()){var m=k;l=l.replace(/\[(\w+)\]/g,".$1");l=l.replace(/^\./,"");l=l.split(".");for(var d,f,n=0,t=l.length;n<t;++n){var y=l[n];d=k;f=y;y in k||(k[y]={});k=k[y]}d[f]=g;return m}},isDef:()=>isJavaObject(k)||"undefined"!=typeof k?!0:!1,isUnDef:()=>isJavaObject(k)||"undefined"!=typeof k?!1:!0,isJavaObject:()=>isJavaObjecta(k),isArray:()=>Array.isArray(k),isMap:()=>"[object Object]"==Object.prototype.toString.call(k),isObject:()=>{var l=typeof k;
return"function"===l||"object"===l&&!!k},isFunction:()=>"function"==typeof k||!1,isString:()=>"string"==typeof k||!1,isNumber:()=>!isNaN(parseFloat(k))&&isFinite(k),isTNumber:()=>"number"==typeof k||!1,isBoolean:()=>"boolean"==typeof k||!1,isNull:()=>null==k||!1,isDate:()=>null!=k&&!isNaN(k)&&"undefined"!==typeof k.getDate,isRegExp:()=>k instanceof RegExp,isUUID:()=>k.match(/^\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/)?!0:!1,isSchema:(l,g)=>{if("undefined"==typeof Ajv)if("undefined"!=
typeof loadAjv)loadAjv();else throw"Ajv library not loaded.";ow.loadObj();return ow.obj.schemaValidate(l,k,g)}}},_$=function(k,l){l=$$(l).isDef()?l+" ":"";var g=$$(k).isDef()?!0:!1;const m={default:d=>g?k:d,$_:d=>{$$(d).isUnDef()&&(d=l+"not defined or assigned");if(!g)throw d;return k},isNumber:d=>{$$(d).isUnDef()&&(d=l+"is not a number");if(g&&!$$(k).isNumber())throw d;return m},toNumber:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to number");if(g)try{k=Number(k)}catch(f){throw d;}return m},isTNumber:d=>
{$$(d).isUnDef()&&(d=l+"is not a number type");if(g&&!$$(k).isTNumber())throw d;return m},isString:d=>{$$(d).isUnDef()&&(d=l+"is not a string");if(g&&!$$(k).isString())throw d;return m},toString:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to string");if(g)try{k=String(k)}catch(f){throw d;}return m},isBoolean:d=>{$$(d).isUnDef()&&(d=l+"is not boolean");if(g&&"boolean"!==typeof k)throw d;return m},toBoolean:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to a boolean");if(g)try{$$(k).isNumber()&&(k=
!!k),$$(k).isString()&&(k="true"==k.trim().toLowerCase())}catch(f){throw d;}return m},isArray:d=>{$$(d).isUnDef()&&(d=l+"is not an array");if(g&&!$$(k).isArray())throw d;return m},toArray:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to an array");if(g)try{k=String(k).split(",").map(f=>f.trim())}catch(f){throw d;}return m},isMap:d=>{$$(d).isUnDef()&&(d=l+"is not a map");if(g&&!$$(k).isMap())throw d;return m},toMap:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to a map");if(g)try{var f=k;k=$$(global.jsonParse).isFunction()?
global.jsonParse(f,!0):JSON.parse(f)}catch(n){throw d;}return m},isObject:d=>{$$(d).isUnDef()&&(d=l+"is not an object");if(g&&!$$(k).isObject())throw d;return m},isDate:d=>{$$(d).isUnDef()&&(d=l+"is not a date");if(g&&!$$(k).isDate())throw d;return m},toDate:d=>{$$(d).isUnDef()&&(d=l+"can't be converted to date");if(g)try{k=new Date(k)}catch(f){throw d;}return m},isRegExp:d=>{$$(d).isUnDef()&&(d=l+"is not a RegExp");if(g&&!$$(k).isRegExp())throw d;return m},isFunction:d=>{$$(d).isUnDef()&&(d=l+"is not a function");
if(g&&!$$(k).isFunction())throw d;return m},isJavaObject:d=>{$$(d).isUnDef()&&(d=l+"is not a java object");if(g&&!isJavaObject(k))throw d;return m},isInstanceOf:(d,f)=>{$$(f).isUnDef()&&(f=l+"is not an instance of "+d);if(g&&!(k instanceof d))throw f;return m},isNotNull:d=>{$$(d).isUnDef()&&(d=l+"is null");if(g&&null==k)throw d;return m},isUUID:d=>{$$(d).isUnDef()&&(d=l+"is not an UUID");if(g&&(!$$(k).isString()||k.match(/^\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/)))throw d;
return m},isSchema:(d,f,n)=>{if("undefined"==typeof Ajv)if("undefined"!=typeof loadAjv)loadAjv();else throw"Ajv library not loaded.";ow.loadObj();try{ow.obj.schemaValidate(d,k,n)}catch(t){throw $$(f).isUnDef()&&(f=l+" "+String(t)),f;}return m},check:(d,f)=>{if(!$$(d).isFunction()&&!$$(d).isString())throw"please provide a function to check";d=$$(d).isFunction()?d(k):newFn("v","return "+d)(k);$$(f).isUnDef()&&(f=l+"is not ok");if(g&&!d)throw f;return m},expr:(d,f)=>{if(!$$(d).isString())throw"please provide an expression";
d=af.eval(templify(d,{v:k}));$$(f).isUnDef()&&(f=l+"is not ok");if(g&&!d)throw f;return m},equals:(d,f)=>{$$(f).isUnDef()&&(f=l+"is equals to "+d);if(g&&k==d)throw f;return m},notEquals:(d,f)=>{$$(f).isUnDef()&&(f=l+"is not equals to "+d);if(g&&k!=d)throw f;return m},anyOf:(d,f)=>{if(!$$(d).isArray())throw"please provide an array of values";$$(f).isUnDef()&&(f=l+"has a value not in "+JSON.stringify(d));g&&$$(k).isArray()&&k.forEach(n=>{if(0>d.indexOf(n))throw f;});return m},oneOf:(d,f)=>{if(!$$(d).isArray())throw"please provide an array of values";
$$(f).isUnDef()&&(f=l+"is not one of "+JSON.stringify(d));if(g&&!$$(k).isArray()&&0>d.indexOf(k))throw f;return m},between:(d,f,n)=>{$$(n).isUnDef()&&(n=l+"is not between "+d+" and "+f);if(g&&(k>=f||k<=d))throw n;},betweenEquals:(d,f,n)=>{$$(n).isUnDef()&&(n=l+"is not between "+d+" and "+f);if(g&&(k>f||k<d))throw n;},less:(d,f)=>{$$(f).isUnDef()&&(f=l+"is less than "+d);if(g&&k>=d)throw f;return m},lessEquals:(d,f)=>{$$(f).isUnDef()&&(f=l+"is less or equals than "+d);if(g&&k>d)throw f;return m},greater:(d,
f)=>{$$(f).isUnDef()&&(f=l+"is greater than "+d);if(g&&k<=d)throw f;return m},greaterEquals:(d,f)=>{$$(f).isUnDef()&&(f=l+"is greater or equals than "+d);if(g&&k<d)throw f;return m},notEmpty:d=>{$$(d).isUnDef()&&(d=l+"is empty");if(g&&""==String(k))throw d;return m},empty:d=>{$$(d).isUnDef()&&(d=l+"is not empty");if(g&&""!=String(k))throw d;return m},contains:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if contains";$$(f).isUnDef()&&(f=l+"doesn't contain "+d);if(g&&0>String(k).indexOf(d))throw f;
return m},notContains:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if not contains";$$(f).isUnDef()&&(f=l+"contains "+d);if(g&&0<=String(k).indexOf(d))throw f;return m},starts:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if it starts with";$$(f).isUnDef()&&(f=l+"doesn't start with '"+d+"'");if(g&&!k.startsWith(aValu))throw f;return m},ends:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if it ends with";$$(f).isUnDef()&&(f=l+"doesn't end with '"+
d+"'");if(g&&!k.endsWith(d))throw f;return m},notStarts:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if it not starts with";$$(f).isUnDef()&&(f=l+"starts with '"+d+"'");if(g&&k.startsWith(aValu))throw f;return m},notEnds:(d,f)=>{if(!$$(d).isString())throw"please provide a string to check if it not ends with";$$(f).isUnDef()&&(f=l+"ends with '"+d+"'");if(g&&k.endsWith(d))throw f;return m},regexp:(d,f)=>{$$(f).isUnDef()&&(f=l+"doesn't match '"+d+"'");if(!(d instanceof RegExp))throw"is not a regular expression ("+
d+")";if(g&&!d.test(k))throw f;return m},javaRegexp:(d,f,n)=>{if($$(d).isUnDef()||!$$(d).isString())throw"please provide a regular expression string";$$(n).isUnDef()&&(n=l+"doesn't match '"+d+"'");if(g&&!javaRegExp(k).test(d,f))throw n;return m}};return m};
