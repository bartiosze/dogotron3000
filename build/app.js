var app={};app.controller=function(){this.active=m.prop(!1),this.spriteConfig=m.prop({source:"/static/images/horizontal.png",width:272,height:143,frames:11,framesX:11,frameTime:100,animate:!1}),this.spriteApi=m.prop({}),this.toggleAnimation=function(){this.spriteApi().toggleAnimation()}.bind(this),this.stopAnimation=function(){this.spriteApi().stopAnimation()}.bind(this)},app.view=function(i){return m("#layout",[m("#menu"),m("#main",m("h1.header","Dogotron 3000!"),m(".content",[m("h2.content-subhead","~10fps"),m("#spritespin",{config:spriteSpin(i),onmouseout:i.stopAnimation,onmouseover:i.toggleAnimation})]))])};var spriteSpin=function(i){return function(t,n){if(!n){var o=$(t).spritespin(i.spriteConfig());i.spriteApi(o.spritespin("api"))}}};m.module(document.body,app);