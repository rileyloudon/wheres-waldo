(this["webpackJsonpwheres-waldo"]=this["webpackJsonpwheres-waldo"]||[]).push([[0],{34:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(26),o=n.n(r),s=(n(34),n(28)),i=n(5),d=n.p+"static/media/pallet-town-on-parade-title.efdc353a.png",l=n(1),u=function(){return Object(l.jsx)("header",{children:Object(l.jsx)("img",{id:"title",src:d,alt:"Pallet Town On Parade"})})},h=n(29),j=n(9),m=n(6);n(36),n(25);m.a.apps.length?m.a.app():m.a.initializeApp({apiKey:"AIzaSyAeqwNXZKfTkNi8zXI-Sk-gDMGAuLv5HTA",authDomain:"wheres-waldo-c710d.firebaseapp.com",projectId:"wheres-waldo-c710d",storageBucket:"wheres-waldo-c710d.appspot.com",messagingSenderId:"323021756225",appId:"1:323021756225:web:fe289f8025376aeb0973c0"});var b=function(){return m.a.auth().currentUser},f=function(){return m.a.auth().signInAnonymously()},O=function(e){var t=e.loadingPokemon,n=e.remainingPokemon,a=e.startGame;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("p",{children:"Welcome to Pallet Town's annual parade! "}),Object(l.jsx)("p",{children:"This year we have selected the following Pokemon for you to catch:"}),!t&&n.map((function(e){return Object(l.jsx)("img",{className:"hidden-pokemon",src:"img/hidden-pokemon/".concat(e,".svg"),alt:e},e)})),Object(l.jsxs)("dl",{children:[Object(l.jsx)("dt",{children:"How to play:"}),Object(l.jsx)("dd",{children:"1. Click on the map to throw a Pokeball"}),Object(l.jsx)("dd",{children:"2. Aim for the center of each Pokemon"}),Object(l.jsx)("dd",{children:"3. Catch 'em all as fast as you can to be added to the leaderboards"}),Object(l.jsx)("dd",{children:"Have Fun!"})]}),Object(l.jsx)("button",{className:"start",onClick:a,children:"Start Game"})]})},p=n.p+"static/media/pallet-town-on-parade-gameboard.3cf50eb5.jpg",g=n.p+"static/media/pokeball.5a45c02d.svg",x=function(e){var t=e.remainingPokemon,n=e.pokeballStyles,a=e.handleGameClick;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"remaining",children:t.map((function(e){return Object(l.jsx)("img",{className:"hidden-pokemon",src:"img/hidden-pokemon/".concat(e,".svg"),alt:e},e)}))}),Object(l.jsx)("img",{className:"pokeball",src:g,alt:"Targeting Pokeball",style:n}),Object(l.jsx)("img",{onClick:function(e){return a(e)},id:"gameboard",src:p,alt:"Gameboard"})]})},k=function(e){var t=e.userTime,n=e.userPokemon,c=Object(i.f)(),r=Object(a.useState)(!1),o=Object(j.a)(r,2),s=o[0],d=o[1],u=Object(a.useState)(""),h=Object(j.a)(u,2),b=h[0],f=h[1];return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h2",{children:"Congratulations!"}),Object(l.jsxs)("p",{children:["You found everyone in ",t.toFixed(2)," seconds!"]}),Object(l.jsx)("p",{children:"Would you like to be added to the leaderboard?"}),s?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("label",{className:"name-input",children:["Whats your name?",Object(l.jsx)("input",{placeholder:"Ash",type:"text",value:b,maxLength:"12",onChange:function(e){return f(e.target.value)}})]}),Object(l.jsx)("button",{className:"cancelBtn",onClick:function(){return c.push("/leaderboards")},children:"Cancel"}),Object(l.jsx)("button",{className:"addBtn",onClick:function(){c.push("/leaderboards"),function(e,t,n){var a=m.a.auth().currentUser;m.a.firestore().collection("leaderboards").add({name:e||"Ash",pokemon:t,time:n,id:a.uid})}(b,n,t)},children:"Add"})]}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{className:"noBtn",onClick:function(){return c.push("/leaderboards")},children:"No"}),Object(l.jsx)("button",{className:"yesBtn",onClick:function(){return d(!0)},children:"Yes"})]})]})},v=function(){var e=Object(a.useState)({top:0,left:0,opacity:0}),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!0),o=Object(j.a)(r,2),s=o[0],i=o[1],d=Object(a.useState)(!1),u=Object(j.a)(d,2),b=u[0],p=u[1],g=Object(a.useState)(!0),v=Object(j.a)(g,2),w=v[0],y=v[1],S=Object(a.useState)(),N=Object(j.a)(S,2),P=N[0],T=N[1],C=Object(a.useState)(0),M=Object(j.a)(C,2),A=M[0],B=M[1],I=Object(a.useState)([]),F=Object(j.a)(I,2),E=F[0],G=F[1];return Object(a.useEffect)((function(){var e=["kabutops","ditto","pikachu","magnemite","gengar","diglett","mr_mime","persian","eevee"],t=Math.floor(Math.random()*e.length),n=e[t];e.splice(t,1);var a=Math.floor(Math.random()*e.length),c=e[a];e.splice(a,1);var r=e[Math.floor(Math.random()*e.length)];T([n,c,r]),y(!1)}),[]),s?Object(l.jsx)(O,{loadingPokemon:w,remainingPokemon:P,startGame:function(){i(!1),f().then((function(){!function(e){var t=m.a.auth().currentUser;m.a.firestore().collection("game-sessions").doc(t.uid).set({pokemon:e,startTime:m.a.firestore.Timestamp.now()})}(P)}))}}):b?Object(l.jsx)(k,{userTime:A,userPokemon:E}):Object(l.jsx)(x,{remainingPokemon:P,pokeballStyles:n,handleGameClick:function(e){var t=document.getElementById("gameboard"),n=t.width/1347,a=t.height/959,r=Math.round((e.pageX-t.offsetLeft)/n),o=Math.round((e.pageY-document.querySelector("header").offsetHeight-document.querySelector(".remaining").offsetHeight)/a),s=document.querySelector(".pokeball");c({top:e.pageY-s.height/2,left:e.pageX-s.width/2,opacity:100}),function(e,t,n,a,c){var r=[];return m.a.firestore().collection("pokemon-locations").where(m.a.firestore.FieldPath.documentId(),"in",c).get().then((function(c){return c.forEach((function(e){r.unshift(e.data())})),r.find((function(c){return c.location[0]>=e&&c.location[0]<=t&&c.location[1]>=n&&c.location[1]<=a}))})).catch((function(e){return console.log(e)}))}(t.width>500?r-s.width/2:r-s.width,t.width>500?r+s.width/2:r+s.width,t.height>500?o-s.height/2:o-s.height,t.height>500?o+s.height/2:o+s.height,P).then((function(e){if("object"===typeof e){var t=Object(h.a)(P),n=P.indexOf(e.name);t.splice(n,1),t.length>0?T(t):(function(){var e=m.a.auth().currentUser;return m.a.firestore().collection("game-sessions").doc(e.uid).set({endTime:m.a.firestore.Timestamp.now()},{merge:!0})}().then((function(){(function(){var e=m.a.auth().currentUser;return m.a.firestore().collection("game-sessions").doc(e.uid).get().then((function(e){return e.data()}))})().then((function(e){B(e.endTime-e.startTime),G(e.pokemon)})).then((function(){return function(){var e=m.a.auth().currentUser;return m.a.firestore().collection("game-sessions").doc(e.uid).delete()}()}))})),p(!0))}}))}})},w=(n(46),function(){var e=Object(a.useState)([]),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)([]),o=Object(j.a)(r,2),s=o[0],i=o[1],d=Object(a.useState)(),u=Object(j.a)(d,2),h=u[0],O=u[1],p=Object(a.useState)(),g=Object(j.a)(p,2),x=g[0],k=g[1],v=Object(a.useState)(b()),w=Object(j.a)(v,2),y=w[0],S=w[1];y||f().then((function(){return S(b())})),Object(a.useEffect)((function(){var e=m.a.firestore().collection("leaderboards").orderBy("time","asc").onSnapshot((function(e){var t=[];e.forEach((function(e){t.push(e.data())})),c(t)}));return function(){e()}}),[]),Object(a.useEffect)((function(){if(i(n.slice(0,10)),y){var e=n.findIndex((function(e){return e.id===y.uid}));k(n[e]),O(e)}}),[n,y]);var N=function(e,t){return Object(l.jsxs)("tr",{className:t>10||e===x?"user-best":null,children:[Object(l.jsxs)("td",{className:"rank",children:[t+1,". "]}),Object(l.jsx)("td",{className:"name",children:e.name}),Object(l.jsxs)("td",{className:"pokemon",children:[e.pokemon[0],","," ","mr_mime"!==e.pokemon[1]?e.pokemon[1]:"Mr. Mime",","," ","mr_mime"!==e.pokemon[2]?e.pokemon[2]:"Mr. Mime",","]}),Object(l.jsxs)("td",{className:"time",children:[e.time.toFixed(2),"s"]})]},e.name+e.time)};return Object(l.jsxs)("div",{id:"leaderboards",children:[Object(l.jsx)("h2",{children:"Leaderboards"}),h<10&&-1!==h&&Object(l.jsx)("p",{className:"user-best",children:"Your Best Time"}),Object(l.jsxs)("table",{children:[Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Rank"}),Object(l.jsx)("th",{children:"Name"}),Object(l.jsx)("th",{children:"Pokemon Caught"}),Object(l.jsx)("th",{children:"Time"})]})}),Object(l.jsx)("tbody",{className:"leaderboard-entry",children:s.map((function(e,t){return N(e,t)}))})]}),h>10&&Object(l.jsxs)("table",{children:[Object(l.jsx)("thead",{children:Object(l.jsx)("tr",{children:Object(l.jsx)("th",{colSpan:"4",children:"Your Best Time"})})}),Object(l.jsx)("tbody",{className:"leaderboard-entry",children:N(x,h)})]})]})});n(47);var y=function(){return Object(l.jsx)(s.a,{basename:"/wheres-waldo",children:Object(l.jsxs)("div",{className:"Pallet-Town-On-Parade",children:[Object(l.jsx)(u,{}),Object(l.jsxs)(i.c,{children:[Object(l.jsx)(i.a,{exact:!0,path:"/",component:v}),Object(l.jsx)(i.a,{exact:!0,path:"/leaderboards",component:w})]})]})})};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("app"))}},[[48,1,2]]]);
//# sourceMappingURL=main.f878ffa2.chunk.js.map