const socket = io();
const c = document.getElementById("gameCanvas");
const ctx = c.getContext("2d");

let platypus = document.createElement("img");
platypus.onload=function(){
    draw_enemies([]);
}
platypus.src="assets/platypus.png";

kd.RIGHT.down(function(){
    socket.emit("player_move", [1,0])
});
kd.LEFT.down(function(){
    socket.emit("player_move", [-1,0])
});
kd.UP.down(function(){
    socket.emit("player_move", [0,-1])
});
kd.DOWN.down(function(){
    socket.emit("player_move", [0,1])
});

kd.run(function () {
    kd.tick();
});
function draw_self(){
    draw_player(250,250);
}
function draw_player(x,y){
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(0.1,0.1);
    ctx.drawImage(platypus, -platypus.width/2, -platypus.height/2)
    ctx.restore();
}
function draw(enemies, pos){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 500);
    for(let enemy of enemies){
        draw_player(enemy[0],enemy[1]);
    }
    draw_self();
    ctx.font = "20px serif";
    ctx.fillStyle = "white";
    ctx.fillText("X: "+pos[0]+", Y:"+pos[1], 10, 30);
}

socket.on("update_players", (players, newpos)=>{
    draw(players, newpos);
    //console.log(players)
});
//draw_enemies([]);
//socket.emit("player_move", [Math.random()*500, Math.random()*500]);