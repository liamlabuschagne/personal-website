// Get and initialize the canvas
var c = document.getElementById("canvas");
c.width = 500;
c.height = 500;

// Get the three sliders
var rs = document.getElementById("r");
var gs = document.getElementById("g");
var bs = document.getElementById("b");
var ws = document.getElementById("w");
var as = document.getElementById("a");

var rp = document.getElementById("rp");
var gp = document.getElementById("gp");
var bp = document.getElementById("bp");
var ap = document.getElementById("ap");
var wp = document.getElementById("wp");


// Get a 2d context using the canvas
var ctx = c.getContext("2d");

var x = 0;
var y = 0;

var mx = 0;
var my = 0;

var r = rs.value;
var g = gs.value;
var b = bs.value;
var a = as.value;
var w = ws.value;


var drawing = false;
function draw()
{
    r = rs.value;
    g = gs.value;
    b = bs.value;
    a = as.value;
    w = ws.value;
    
    rp.innerHTML = r;
    gp.innerHTML = g;
    bp.innerHTML = b;
    ap.innerHTML = a;
    wp.innerHTML = w;
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
    ctx.beginPath() ;

    var rx            = w;         // The X radius
    var ry            = w;          // The Y radius
    var rotation      = 0;           // The rotation of the ellipse (in radians)
    var start         = 0;           // The start angle (in radians)
    var end           = 2 * Math.PI; // The end angle (in radians)
    var anticlockwise = false;       // Whether the ellipse is drawn in a clockwise direction or
                                     // anti-clockwise direction
    ctx.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);
    ctx.fill();
}
document.click = toggle;
document.onmousedown = toggle;
document.onmouseup = toggle;

function toggle()
{
    if(drawing)
        drawing = false;
    else
        drawing = true;
}

document.addEventListener("mousemove", function(e){
    if(drawing)
    {
        x = e.clientX;
        y = e.clientY;
        mx = x;
        my = y;
        draw();   
    }
    
});
    
function button(x, y, width, height)
{
     this.x = x;
     this.y = y;
     this.w = width;
     this.h = height;
}
    
function buttonClicked(button)
{
    if(mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h)
            return true;
    else
        return false;
}