(this.webpackJsonpforgotmyglasses=this.webpackJsonpforgotmyglasses||[]).push([[0],{21:function(e,t){},453:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a.n(r),o=a(45),l=a.n(o),i=(a(51),a(4)),c=a.n(i),s=a(14),u=a(5),d=(a(53),a(455)),h=a(10),f=a.n(h);f.a.config.region="eu-west-1",f.a.config.credentials=new f.a.CognitoIdentityCredentials({IdentityPoolId:"eu-west-1:4a8f8cca-1fe0-4ce5-843c-3118a21061f6"});var p=new f.a.Rekognition;var m=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),a=(t[0],t[1]),o=Object(r.useState)(Object(d.a)()),l=Object(u.a)(o,2),i=l[0],h=l[1],f=Object(r.useState)(!0),m=Object(u.a)(f,2),b=m[0],y=m[1],g=Object(r.useState)(!1),w=Object(u.a)(g,2),E=w[0],v=w[1],k=Object(r.useState)(!1),x=Object(u.a)(k,2),F=x[0],j=x[1],I=Object(r.useState)(0),O=Object(u.a)(I,2),B=O[0],S=O[1];function T(){return(T=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(!0),e.prev=1,t={CollectionId:i},e.next=5,p.createCollection(t).promise();case 5:h(i),y(!1),v(!0),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}function C(e){return new Promise((function(t,a){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=a,r.readAsArrayBuffer(e)}))}function P(e){return M.apply(this,arguments)}function M(){return(M=Object(s.a)(c.a.mark((function e(t){var r,n,o,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.target.files?t.target.files:[new Blob],a(!0),e.prev=2,e.next=5,C(r[0]);case 5:if(null!=(n=e.sent)){e.next=8;break}throw new Error("Error reading file");case 8:return o={CollectionId:i,Image:{Bytes:n},MaxFaces:1},e.next=11,p.indexFaces(o).promise();case 11:(l=e.sent).FaceRecords&&0===l.FaceRecords.length?window.alert("Woops, no face was registered in that photo. Can you try a different one?"):(j(!0),S(B+1),document.getElementById("uploadTrainingPhoto").value=""),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(2),console.log(e.t0.message);case 18:a(!1);case 19:case"end":return e.stop()}}),e,null,[[2,15]])})))).apply(this,arguments)}function A(){return(A=Object(s.a)(c.a.mark((function e(t){var r,n,o,l,s,u,d;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.target.files?t.target.files:[new Blob],a(!0),e.prev=2,e.next=5,C(r[0]);case 5:if(null!=(o=e.sent)){e.next=8;break}throw new Error("Error reading file");case 8:return l={CollectionId:i,Image:{Bytes:o},MaxFaces:1},e.next=11,p.searchFacesByImage(l).promise();case 11:if((s=e.sent).FaceMatches){e.next=14;break}return e.abrupt("return");case 14:if(0!=(null===(n=s.FaceMatches)||void 0===n?void 0:n.length)){e.next=19;break}return window.alert("This is definitely not your friend. Abort!"),a(!1),document.getElementById("uploadFriendPhoto").value="",e.abrupt("return");case 19:if(!s.FaceMatches[0]){e.next=39;break}if(u=s.FaceMatches[0].Similarity){e.next=23;break}return e.abrupt("return");case 23:e.t0=!0,e.next=e.t0===u<50?26:e.t0===u<75?28:e.t0===u<90?30:e.t0===u<99.5?32:e.t0===u<=100?34:36;break;case 26:return d="This is probably not your friend (less than 50% similarity)",e.abrupt("break",37);case 28:return d="This could be, but probability is not, your friend (less than 75% similarity) - worth a go?",e.abrupt("break",37);case 30:return d="This is probably your friend (greater than 75% similarity)! Say hello!",e.abrupt("break",37);case 32:return d="This is almost certainly your friend (greater than 90% similarity)! Say hello!",e.abrupt("break",37);case 34:return d="This is DEFINITELY your friend (100% similarity score)!",e.abrupt("break",37);case 36:d="Something went wrong, sorry!";case 37:window.alert(d),document.getElementById("uploadFriendPhoto").value="";case 39:e.next=46;break;case 41:e.prev=41,e.t1=e.catch(2),console.log(e.t1.message),a(!1),document.getElementById("uploadFriendPhoto").value="";case 46:case"end":return e.stop()}}),e,null,[[2,41]])})))).apply(this,arguments)}return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},n.a.createElement("h2",null,"Ever forget your glasses and fail to recognise your friend? \ud83e\udd26\u200d\u2640\ufe0f"),n.a.createElement("h3",null,"No? But ",n.a.createElement("i",null,"what if!?")," Keep calm and use this robot to help you recognise them \ud83d\udc40"),n.a.createElement("p",null,"Simply:",n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("b",null,"Teach the robot")," by uploading a few photos of your friend's face \ud83d\udcf8"),n.a.createElement("li",null,n.a.createElement("b",null,"Use your new cyborg skill")," by subtly snapping a photo of their face and we'll tell you if it's your friend! \ud83d\udc4b")))),n.a.createElement("body",null,b&&n.a.createElement("div",null,n.a.createElement("h2",null,"Ready to get started?!"),n.a.createElement("button",{onClick:function(){return T.apply(this,arguments)}},"Yes!")),E&&n.a.createElement("div",null,0===B?n.a.createElement("h2",null,"Provide at least one photo of your friend (the more the better)"):B>0&&B<2?n.a.createElement("h2",null,"Great stuff, you've added a photo. Got one more?"):n.a.createElement("h2",null,"Great stuff! you've added ",B," photos so far."),n.a.createElement("p",null,"Note: we do not store your photos. Facial features are extracted from photos and used to recognise similarities. Your data will only be used by you and will be deleted within 24 hours."),n.a.createElement("input",{id:"uploadTrainingPhoto",onChange:P,type:"file",accept:"image/*",capture:"camera"})),F&&n.a.createElement("div",null,n.a.createElement("h2",null,"The robot has been trained! Snap a photo of your 'friend' and we'll tell you if it's your friend"),n.a.createElement("input",{id:"uploadFriendPhoto",onChange:function(e){return A.apply(this,arguments)},type:"file",accept:"image/*",capture:"camera"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},46:function(e,t,a){e.exports=a(453)},51:function(e,t,a){},53:function(e,t,a){}},[[46,1,2]]]);
//# sourceMappingURL=main.9958886a.chunk.js.map