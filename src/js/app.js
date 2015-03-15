var app = {};

app.controller = function(data) {
  this.active = m.prop(false);
  this.spriteConfig = m.prop({
    source:  '/static/images/horizontal.png',
    width: 272,
    height: 143,
    frames: 11,
    framesX: 11,
    frameTime: 100
  });
  this.spriteApi = m.prop({});
  this.toggleAnimation = function(){
    this.spriteApi().toggleAnimation();
  }.bind(this);
  this.stopAnimation = function(){
    this.spriteApi().stopAnimation();
  }.bind(this);
};

app.view = function(ctrl){
  return m("#layout", [
    m("#menu"),
    m("#main",
      m("h1.header", "Dogotron 3000!"),
      m(".content", [
        m("h2.content-subhead", "~10fps"),
        m("#spritespin",
          {config: spriteSpin(ctrl),
           onmouseout: ctrl.toggleAnimation,
           onmouseover: ctrl.stopAnimation
          })
      ]))
  ]);
};

var spriteSpin = function(ctrl) {
  return function (elem, isInit, context){
    if(!isInit){
      var spin = $(elem).spritespin(ctrl.spriteConfig());
      ctrl.spriteApi(spin.spritespin("api"));
    }
  };
};

m.module(document.body, app);
