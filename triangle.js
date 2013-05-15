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
}

Triangle.prototype.calcArea = function() {
  return .5 * this.calcAreaTwice(); 
};

Triangle.prototype.calcAreaTwice = function() {
  return (           
    (this.a.x - this.c.x)*(this.b.y - this.a.y) -
    (this.a.x - this.b.x)*(this.c.y - this.a.y)
  );  
};

Triangle.prototype.counterClockwise = function() {
   return (           
    (this.a.x - this.c.x)*(this.b.y - this.a.y) > 
    (this.a.x - this.b.x)*(this.c.y - this.a.y) 
  );     
};

Triangle.prototype.reverse = function() {
    return new Triangle(this.c, this.b, this.a);   
};

Triangle.prototype.barycentricCoodinate = function(p) {
  var pab = new Triangle(p, this.a, this.b);   
  var pbc = new Triangle(p, this.b, this.c);   
  var pca = new Triangle(p, this.c, this.a);   

  var A = this.calcArea(); 
  var Apab = pab.calcArea(); 
  var Apbc = pbc.calcArea(); 
  //var Apca = pca.calcArea(); 
  var Apca = A - Apab - Apbc

  var bca = Apbc / A; 
  var bcb = Apca / A; 
  //var bcc = Apab / A; 
  var bcc = 1 - bca - bcb; 

  return new Tuple(bca,bcb,bcc); 
};

Triangle.prototype.pointIsInTriangle = function(p) {
  var tri = this.barycentricCoodinate(p); 
  return tri.a >= 0 && tri.b >= 0 && tri.c >= 0; 
};

