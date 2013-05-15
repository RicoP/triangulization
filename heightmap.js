function Heightmap(width, height) {
    this.width = width; 
    this.height = height; 
    this.buffer = new Float32Array(width*height);     
}

Heightmap.fromContext = function(ctx) {
    var w = ctx.canvas.width; 
    var h = ctx.canvas.height; 
    var hm = new Heightmap(w, h); 
    var data = ctx.getImageData(0, 0, w, h).data;        

    for(var x = 0; x != w; x++) {
        for(var y = 0; y != h; y++) {
          var pixel = data[(x + y * w) * 4]; 
          var height = pixel / 255.0; 
          hm.buffer[x + y * w] = height; 
        }
    }
    return hm; 
}
