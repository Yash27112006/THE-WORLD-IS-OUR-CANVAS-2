var currentPath = [];
var drawing = [];
var dbDrawing = [];

function setup(){
    canvas = createCanvas(1000,600);
    database = firebase.database();
    drawingRef = database.ref('drawing');
    drawingRef.on("value",readData,showError)
    canvas.mousePressed(start);

}

function draw(){
   background(51);
    if(mouseIsPressed){
       var point = {
          x:mouseX,
          y:mouseY
       }
      currentPath.push(point);
    }
    database.ref('drawing').set({d:currentPath});
    stroke(255);
    strokeWeight(5);
    noFill();
    if(dbDrawing !== undefined){
      for(var i=0; i<dbDrawing.length; i++){
         var path = dbDrawing[i].d;
         beginShape();
            for(var j =0; j<path.length; j++){
               vertex(path[j].x,path[j].y);
            }   
         endShape();
      }
   }
}
function start(){
   currentPath = [];
   dbDrawing.push(currentPath);
}
function readData(data){
   dbDrawing = data.val();
}
function showError(){
   console.log("Error");
}
