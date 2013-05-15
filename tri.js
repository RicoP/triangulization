  var canvas = document.getElementById("c"); 
  var ctx = canvas.getContext("2d"); 
  var mousedown = false; 


  $(canvas).mousedown(function(ev) {
    mousedown = true; 
  }); 

  $(canvas).mouseup(function(ev) {
    mousedown = false; 
  }); 

  $(canvas).mousemove(function(ev) {
    if(!mousedown) return; 

    var x = ev.offsetX; 
    var y = ev.offsetY; 
    var radius = 20; 

    var grd=ctx.createRadialGradient(x,y,0, x,y,radius);
    grd.addColorStop(0.0,"rgba(255,255,255,0.10)");
    grd.addColorStop(1.0,"rgba(255,255,255,0.00)");

    ctx.beginPath(); 
    //ctx.fillStyle = 'green';
    ctx.fillStyle = grd;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();    
  });

  ctx.beginPath(); 
  ctx.fillRect(0, 0, canvas.width, canvas.height); 
  ctx.fill();    

  function Tuple(a,b,c,d,e,f,g,h) {
    this.a = a;   
    this.b = b;   
    this.c = c;   
    this.d = d;   
    this.e = e;   
    this.f = f;   
    this.g = g;   
    this.h = h;   
  }

  function Point(x,y) {
    this.x = x; 
    this.y = y; 
  }

  function Triangle(p1,p2,p3) {
    this.a = p1;   
    this.b = p2;   
    this.c = p3;   

    this.calcArea = function() {
      return .5 * this.calcAreaTwice(); 
    };

    this.calcAreaTwice = function() {
      return (           
        (this.a.x - this.c.x)*(this.b.y - this.a.y) -
        (this.a.x - this.b.x)*(this.c.y - this.a.y)
      );  
    };

    this.barycentricCoodinate = function(p) {
      var pab = new Triangle(p, this.a, this.b);   
      var pbc = new Triangle(p, this.b, this.c);   
      var pca = new Triangle(p, this.c, this.a);   

      var A = this.calcArea(); 
      var Apab = pab.calcArea(); 
      var Apbc = pbc.calcArea(); 
      //var Apca = pca.calcArea(); 
      var Apca = A - Apab - Apbc

      var ba = Apbc / A; 
      var bb = Apca / A; 
      //var bc = Apab / A; 
      var bc = 1 - ba - bb; 

      return new Tuple(ba,bb,bc); 
    };

    this.pointIsInTriangle = function(p) {
      var tri = this.barycentricCoodinate(p); 
      return tri.a >= 0 && tri.b >= 0 && tri.c >= 0; 
    };
  }

  //DEBUG 
  var A = new Point(0,1);
  var B = new Point(1,0);
  var C = new Point(0,0);
  var t = new Triangle(A,B,C)
  var I = new Point (1, 1)

