(function($){ 
    var tranPrefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
    (/firefox/i).test(navigator.userAgent) ? 'Moz' :
    (/trident/i).test(navigator.userAgent) ? 'ms' :
    'opera' in window ? 'O' : '';
    var statusColor = {'one':'#db5141','two':'#d5b040','three':'#5a97c3','normal':'#52b363'};
    var squareHeight = 10;
    var groupWidth = 50;
    var groupMargin = 10;

    var square = function(className,bottom){
          this.name = className;
          this.bottom = bottom;
          this.status = 'normal';
          this._init();
    }
    square.prototype ={
    	_init:function(){
    		 var s=this;
         s.html = '<div class='+s.name+'><div class="shap"><div class="face one"></div><div class="face two"></div><div class="face three"></div><div class="face four"></div><div class="face five"></div><div class="face six"></div></div></div>';   	     
    	},
      appendTo:function(parent,translateZ,status){
          var s = this;
          var css = {bottom:s.bottom+'px'};
          css[tranPrefix+'Transform'] = 'rotateY(90deg) translateX('+translateZ+'px)';
          s.el = $(s.html).appendTo(parent).css(css);
          s.changeStatus(status);
      },
      changeStatus:function(status){
           var s = this;
           s.status = status;
           s.el.find('.face').css('backgroundColor',statusColor[s.status])
      }
    }


    var group = function(left,count){
        this.left = left;    
        this.count = count;
        this.squares = [];
    }
    group.prototype = {
       appendTo : function(parent,translateZ){
          var g = this;
          var css = {left:g.left};
          g.el = $('<div class="square-group"></div>').appendTo(parent).css(css);
          var status = g.count >= 9 ? 'one':(g.count >= 8 ? 'two' : g.count > 6 ? 'three' : 'normal');
          for(var i=0;i<g.count;i++){
              var s = new square('square-s',i*squareHeight);
              g.squares.push(s);
              s.appendTo(g.el,translateZ,status);
          }
       },
       changeStatus:function(status){
            for(var s in this.squares){
                 s.changeStatus(status);
            }
       }
    }

    var room = function(parent,data){
         this.groups = [];
         this._init(parent,data);
    }
    room.prototype ={
       _init:function(parent,data){
            var r = this;
            for(var i=0;i<data.length;i++){
                var translateZ = i < 6 ? 60: -60;
                var g = new group((i%6)*groupWidth+(i%6)*groupMargin,data[i].count);
                r.groups.push(g);
                g.appendTo(parent,translateZ);
            }
       }
    }

	window.squareObj = room;
})(jQuery)