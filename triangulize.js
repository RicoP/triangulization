//(function() { 

function Triangulize() {
  
}

function randPoint(xmin, xmax, ymin, ymax) {
    if(xmin > xmax) return randPoint(xmax, xmin, ymin, ymax);   
    if(ymin > ymax) return randPoint(xmin, xmax, ymax, ymin);   

    var x = (xmax - xmin) * Math.random() + xmin;
    var y = (ymax - ymin) * Math.random() + ymin;

    return new Point(x,y); 
}

function randTriangleAroundStandardSquare() {
    do { 
        var p1 = randPoint(-1, 2, -1, 2);
        var p2 = randPoint(-1, 2, -1, 2);
        var p3 = randPoint(-1, 2, -1, 2);

        var t = new Triangle(p1,p2,p3); 
    } while(
        !t.pointIsInTriangle(new Point(0,0)) ||
        !t.pointIsInTriangle(new Point(1,0)) ||
        !t.pointIsInTriangle(new Point(0,1)) ||
        !t.pointIsInTriangle(new Point(1,1))
    );
            
    return t;  
}

function randPointInTriangle(t) {
    var xmin = Math.min(t.a.x, Math.min(t.b.x, t.c.x));   
    var ymin = Math.min(t.a.y, Math.min(t.b.y, t.c.y));   
    var xmax = Math.max(t.a.x, Math.max(t.b.x, t.c.x));   
    var ymax = Math.max(t.a.y, Math.max(t.b.y, t.c.y));   

    var p = randPoint(xmin, xmax, ymin, ymax); 
    return t.pointIsInTriangle(p) ? p : randPointInTriangle(t); 
}

//}()); 
