(this.webpackJsonpforgotmyglasses=this.webpackJsonpforgotmyglasses||[]).push([[0],{26:function(e,t){},466:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),o=a(53),i=a.n(o),l=(a(62),a(7)),c=a.n(l),s=a(19),u=a(6),d=(a(64),a(468)),p=a(15),m=a.n(p),h=a(56),f=a(28),b=a(54),g=a(55);m.a.config.region="eu-west-1",m.a.config.credentials=new m.a.CognitoIdentityCredentials({IdentityPoolId:"eu-west-1:4a8f8cca-1fe0-4ce5-843c-3118a21061f6"});var y=new m.a.Rekognition;var E=function(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),a=t[0],o=t[1],i=Object(n.useState)(!1),l=Object(u.a)(i,2),p=l[0],m=l[1],E=Object(n.useState)(Object(d.a)()),w=Object(u.a)(E,2),v=w[0],k=w[1],x=Object(n.useState)(!0),I=Object(u.a)(x,2),F=I[0],O=I[1],j=Object(n.useState)(!1),B=Object(u.a)(j,2),P=B[0],S=B[1],T=Object(n.useState)(!1),C=Object(u.a)(T,2),D=C[0],N=C[1],A=Object(n.useState)(0),M=Object(u.a)(A,2),W=M[0],R=M[1];function Y(){return(Y=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={CollectionId:v},e.next=4,y.createCollection(t).promise();case 4:k(v),O(!1),S(!0),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function z(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(){t(n.result)},n.onerror=a,n.readAsArrayBuffer(e)}))}function J(e){return q.apply(this,arguments)}function q(){return(q=Object(s.a)(c.a.mark((function e(t){var a,n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.prev=1,e.next=4,z(t);case 4:if(null!=(a=e.sent)){e.next=7;break}throw new Error("Error reading file");case 7:return n={CollectionId:v,Image:{Bytes:a}},e.next=10,y.indexFaces(n).promise();case 10:(r=e.sent).FaceRecords&&0===r.FaceRecords.length?window.alert("Woops, no face was registered in that photo. Can you try a different one?"):(N(!0),R(W+1),document.getElementById("uploadTrainingPhoto").value=""),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0.message);case 17:o(!1);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})))).apply(this,arguments)}function K(){return(K=Object(s.a)(c.a.mark((function e(t){var a,n,r,o,i,l,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.files?t.target.files:[new Blob],m(!0),e.prev=2,e.next=5,z(a[0]);case 5:if(null!=(r=e.sent)){e.next=8;break}throw new Error("Error reading file");case 8:return o={CollectionId:v,Image:{Bytes:r},MaxFaces:1},e.next=11,y.searchFacesByImage(o).promise();case 11:if((i=e.sent).FaceMatches){e.next=14;break}return e.abrupt("return");case 14:if(0!=(null===(n=i.FaceMatches)||void 0===n?void 0:n.length)){e.next=19;break}return window.alert("This is definitely not your friend. Abort!"),m(!1),document.getElementById("uploadFriendPhoto").value="",e.abrupt("return");case 19:if(!i.FaceMatches[0]){e.next=39;break}if(l=i.FaceMatches[0].Similarity){e.next=23;break}return e.abrupt("return");case 23:e.t0=!0,e.next=e.t0===l<50?26:e.t0===l<75?28:e.t0===l<90?30:e.t0===l<99.5?32:e.t0===l<=100?34:36;break;case 26:return s="This is probably not your friend (less than 50% similarity)",e.abrupt("break",37);case 28:return s="This could be, but probably is not, your friend (less than 75% similarity) - worth a go?",e.abrupt("break",37);case 30:return s="This is probably your friend (greater than 75% similarity)! Say hello!",e.abrupt("break",37);case 32:return s="This is almost certainly your friend (greater than 90% similarity)! Say hello!",e.abrupt("break",37);case 34:return s="This is DEFINITELY your friend (100% similarity score)!",e.abrupt("break",37);case 36:s="Something went wrong, sorry!";case 37:window.alert(s),document.getElementById("uploadFriendPhoto").value="";case 39:e.next=46;break;case 41:e.prev=41,e.t1=e.catch(2),console.log(e.t1.message),m(!1),document.getElementById("uploadFriendPhoto").value="";case 46:case"end":return e.stop()}}),e,null,[[2,41]])})))).apply(this,arguments)}return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h2",null,"Ever forget your glasses and fail to recognise a friend?"),r.a.createElement("h4",null,"Keep calm and use this robot to help you \ud83d\udc40"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("b",null,"Teach the robot")," by uploading photos of your friends \ud83c\udf70"),r.a.createElement("li",null,r.a.createElement("b",null,"Ask the robot if someone is your friend")," by quickly snapping a photo \ud83d\udcf8"))),r.a.createElement("body",null,F&&r.a.createElement("div",null,r.a.createElement(h.a,{size:"lg",onClick:function(){return Y.apply(this,arguments)}},"Amazing, let's do it! \ud83d\udd25")),P&&r.a.createElement("div",null,0===W?r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Provide a photo of at least one friend."),r.a.createElement("p",null,"A photo may contain up to 100 faces.")):W>0&&W<2?r.a.createElement("h2",null,"One photo added \ud83c\udf89 You can now try the friend-checker below or add more photos."):r.a.createElement("h2",null,W," photos added \ud83c\udf89 You can now try the friend-checker below or add more photos."),r.a.createElement("input",{id:"uploadTrainingPhoto",onChange:function(e){J(e.target.files?e.target.files[0]:new Blob)},type:"file",accept:"image/*",capture:"camera"}),a?r.a.createElement(f.a,{animation:"border"}):r.a.createElement("div",{id:"dropbox",onClick:function(){return document.getElementById("uploadTrainingPhoto").click()},onDragEnter:function(e){e.stopPropagation(),e.preventDefault()},onDragOver:function(e){e.stopPropagation(),e.preventDefault()},onDrop:function(e){e.stopPropagation(),e.preventDefault(),function(e){var t=e.dataTransfer.files;if(t.length>1)window.alert("Sorry, only one image at at time please");else{var a=t[0];a.type.startsWith("image")?J(a):window.alert("File must be an image")}}(e)}},r.a.createElement(b.a,{className:"PlusIcon",color:"#61dafb",icon:g.a,size:"3x"}),r.a.createElement("div",{className:"TextWithinUploadBox"},r.a.createElement("span",null,"Drag & drop"),r.a.createElement("span",null,"or click to upload")))),D&&r.a.createElement("div",{className:"FriendChecker"},r.a.createElement("h2",null,"Friend-checker. Snap a photo of your 'friend' and I'll tell you if it's your friend"),r.a.createElement("p",null,"If more than one person is present in the photo, the largest face will be used for the comparison"),p?r.a.createElement(f.a,{animation:"border"}):r.a.createElement("input",{id:"uploadFriendPhoto",onChange:function(e){return K.apply(this,arguments)},type:"file",accept:"image/*",capture:"camera"})),!F&&r.a.createElement("p",{className:"Disclaimer"},"Note: I do not store your photos. Facial features from the training photos are extracted and stored for a maximum of 24 hours. Your data will be used only by you. Nothing is stored from photos uploaded for friend-checking.")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(465);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,a){e.exports=a(466)},62:function(e,t,a){},64:function(e,t,a){}},[[57,1,2]]]);
//# sourceMappingURL=main.72c3f580.chunk.js.map