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

