(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[687],{3208:function(r,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/post/[id]",function(){return t(5968)}])},9424:function(r,n,t){"use strict";var e=t(5893),i=t(3238),o=t(3725),u=t(3894),a=(t(7294),t(1664)),l=t.n(a),c=t(7952);function s(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function d(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var t=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,i,o=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(e=t.next()).done)&&(o.push(e.value),!n||o.length!==n);u=!0);}catch(l){a=!0,i=l}finally{try{u||null==t.return||t.return()}finally{if(a)throw i}}return o}}(r,n)||function(r,n){if(!r)return;if("string"===typeof r)return s(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(r,n)}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.Z=function(r){var n,t=r.id,a=r.creatorId,s=(0,c.UE)().data,f=d((0,c.jn)(),1)[0];return(null===s||void 0===s||null===(n=s.me)||void 0===n?void 0:n.id)!==a?null:(0,e.jsxs)(o.xu,{children:[(0,e.jsx)(l(),{href:"/post/edit[id]",as:"/post/edit/".concat(t),children:(0,e.jsx)(u.hU,{"aria-label":"Edit Post",mr:4,size:"lg",icon:(0,e.jsx)(i.dY,{})})}),(0,e.jsx)(u.hU,{"aria-label":"Delete Post",size:"lg",onClick:function(){return f({variables:{id:t},update:function(r){r.evict({id:"Post:"+t})}})},icon:(0,e.jsx)(i.pJ,{})})]})}},749:function(r,n,t){"use strict";t.d(n,{Z:function(){return j}});var e=t(5893),i=(t(7294),t(4051)),o=t.n(i),u=t(3725),a=t(3894),l=t(1664),c=t.n(l),s=t(7952),d=t(1163),f=t(6252);function h(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}function v(r,n,t,e,i,o,u){try{var a=r[o](u),l=a.value}catch(c){return void t(c)}a.done?n(l):Promise.resolve(l).then(e,i)}function p(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var t=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,i,o=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(e=t.next()).done)&&(o.push(e.value),!n||o.length!==n);u=!0);}catch(l){a=!0,i=l}finally{try{u||null==t.return||t.return()}finally{if(a)throw i}}return o}}(r,n)||function(r,n){if(!r)return;if("string"===typeof r)return h(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return h(r,n)}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var x=function(r){r=null!==r?r:function(r){throw r}(new TypeError("Cannot destructure undefined")),(0,d.useRouter)();var n,t=p((0,s._y)(),2),i=t[0],l=t[1].loading,h=(0,f.x)(),x=(0,s.UE)({skip:!1}),y=x.data,j=null;return x.loading||(j=(null===y||void 0===y?void 0:y.me)?(0,e.jsxs)(u.kC,{align:"center",children:[(0,e.jsx)(c(),{href:"/create-post",children:(0,e.jsx)(a.zx,{mr:4,as:u.rU,variant:"outline",children:"Create Post"})}),(0,e.jsx)(u.xu,{mr:3,children:y.me.username}),(0,e.jsx)(a.zx,{onClick:(n=o().mark((function r(){return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,i();case 2:return r.next=4,h.resetStore();case 4:case"end":return r.stop()}}),r)})),function(){var r=this,t=arguments;return new Promise((function(e,i){var o=n.apply(r,t);function u(r){v(o,e,i,u,a,"next",r)}function a(r){v(o,e,i,u,a,"throw",r)}u(void 0)}))}),isLoading:l,variant:"link",children:"Logout"})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(c(),{href:"/login",children:(0,e.jsx)(u.rU,{color:"black",mr:2,children:"Login"})}),(0,e.jsx)(c(),{href:"/register",children:(0,e.jsx)(u.rU,{color:"black",mr:2,children:"Register"})})]})),(0,e.jsxs)(u.kC,{zIndex:1,position:"sticky",top:0,bg:"tomato",p:4,children:[(0,e.jsx)(c(),{href:"/",children:(0,e.jsx)(u.rU,{children:(0,e.jsx)(u.X6,{children:"Typescript GraphQL"})})}),(0,e.jsx)(u.xu,{ml:"auto",children:j})]})},y=t(6476),j=function(r){var n=r.children,t=r.variant;return(0,e.jsxs)("div",{children:[(0,e.jsx)(x,{}),(0,e.jsx)(y.Z,{variant:t,children:n})]})}},5968:function(r,n,t){"use strict";t.r(n),t.d(n,{default:function(){return c}});var e=t(5893),i=t(3725),o=(t(7294),t(9424)),u=t(749),a=t(7952),l=t(921);var c=(0,t(1201).C)({ssr:!0})((function(r){r=null!==r?r:function(r){throw r}(new TypeError("Cannot destructure undefined"));var n=function(){var r=(0,l.q)();return(0,a.Ss)({skip:-1===r,variables:{id:r}})}(),t=n.data;n.error;return n.loading?(0,e.jsx)(u.Z,{children:(0,e.jsx)("div",{children:"loading..."})}):(null===t||void 0===t?void 0:t.post)?(0,e.jsxs)(u.Z,{children:[(0,e.jsx)(i.X6,{mb:4,children:t.post.title}),(0,e.jsx)(i.xu,{mb:4,children:t.post.text}),(0,e.jsx)(o.Z,{id:t.post.id,creatorId:t.post.creator.id})]}):(0,e.jsx)(u.Z,{children:(0,e.jsx)(i.xu,{children:"could not find post"})})}))},921:function(r,n,t){"use strict";t.d(n,{q:function(){return i}});var e=t(1163),i=function(){var r=(0,e.useRouter)();return"string"===typeof r.query.id?parseInt(r.query.id):-1}}},function(r){r.O(0,[180,424,238,436,774,888,179],(function(){return n=3208,r(r.s=n);var n}));var n=r.O();_N_E=n}]);