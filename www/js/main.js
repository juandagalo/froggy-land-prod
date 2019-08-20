let miStorage = window.localStorage;
var looper;
var degrees = 0;
var seguir;
var element;
var globalspeed;
var canvas;
var ctx;
var x;
var y;
var angle;
let dx;
let dy;
var ballRadius = 15;
var current_flies = []; var drawn_flies = false;
var current_bees = []; var drawn_bees = false;
var current_fireflies = []; var drawn_fireflies = false;
var drawer_speed = 10;
var froggy_speed = 600;
var flyX; var flyY; 
var fly; var bee; var firefly;
var flies = 7; var bees = 2; var fireflies = 1;
var xbees = []; var ybees = []; var xflies = []; var yflies = []; var xfireflies = []; var yfireflies = [];
let points = 0;
let highest_score = miStorage.getItem('highest_score');

var drawer;


// window.addEventListener('touchstart', function() {
//     if (document.getElementById("home").classList.contains("hide")) {
//         canvass("myCanvas");
//         clearTimeout(looper);
//         looper = setTimeout('rotate(\''+element+'\','+globalspeed+')',600);
//         drawer = setInterval(draw, 10); //llama a la funcion draw
//         x = canvas.width/2;
//         y = canvas.height/2;
//         dx = 10*Math.cos(angle);
//         dy = 10*Math.sin(angle);
//     }
// });

function touch(){
    canvass("myCanvas");
    clearTimeout(looper);
    looper = setTimeout('rotate(\''+element+'\','+globalspeed+')',froggy_speed);
    drawer = setInterval(draw, drawer_speed); //llama a la funcion draw
    x = canvas.width/2;
    y = canvas.height/2;
    dx = 10*Math.cos(angle);
    dy = 10*Math.sin(angle);
}

function startGame(){
    hideRules("rule-1","rule-2","rule-3");
    fly = document.getElementById("flyImage");
    bee = document.getElementById("beeImage");
    firefly = document.getElementById("fireflyImage");
    document.getElementById("home").classList.add("hide");
    document.getElementById("credits").classList.add("hide");
    document.getElementById("game").classList.remove("hide");
    document.getElementById("rules").classList.add("hide");
    timer();
    drawBugs();
}

function goHome(){
    document.getElementById("game").classList.add("hide");
    document.getElementById("credits").classList.add("hide");
    document.getElementById("home").classList.remove("hide");
    document.getElementById("rules").classList.add("hide");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(drawer);
}

function goCredits(){
    document.getElementById("game").classList.add("hide");
    document.getElementById("credits").classList.remove("hide");
    document.getElementById("home").classList.add("hide");
    document.getElementById("rules").classList.add("hide");
}

function goRules(){
    document.getElementById("game").classList.add("hide");
    document.getElementById("credits").classList.add("hide");
    document.getElementById("home").classList.add("hide");
    document.getElementById("rules").classList.remove("hide");
}

function changeRule(newrule){
    ruleID = "rule-"+newrule;
    oldruleID = "rule-"+(newrule-1);
    document.getElementById(oldruleID).classList.add("hide");
    document.getElementById(ruleID).classList.remove("hide");
}

function hideRules(r1, r2, r3){
    document.getElementById(r2).classList.add("hide");
    document.getElementById(r1).classList.remove("hide");
    document.getElementById(r3).classList.add("hide");
}

function rotate(el, speed) {
    var elem = document.getElementById(el);
    element = el;
    globalspeed = speed;
    elem.style.transform = "rotate("+degrees+"deg)";
    looper = setTimeout('rotate(\''+el+'\','+speed+')',speed);
    degrees++;
    if (degrees > 359) {
        degrees = 1;
    }
    angle = (degrees+10)*Math.PI/180; //Convierte el angulo de grados a radianes
}

function canvass(id_canvas){
    canvas = document.getElementById(id_canvas);
    ctx = canvas.getContext("2d");
    x = canvas.width/2;
    y = canvas.height/2;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FAC1B6";
    ctx.fill();
    ctx.closePath();
}


function pause(){
    clearInterval(drawer);
    clearTimeout(looper);
    ctx.beginPath();
    // DIBUJA LO QUE VA EN EL PAUSE
    ctx.closePath();
}

function resume() {
    looper = setTimeout('rotate(\''+element+'\','+globalspeed+')',froggy_speed);
    drawer = setInterval(draw, drawer_speed); //llama a la funcion draw
}

function drawBugs(){
    drawFlies();
    drawBees();
    drawFireflies();
}

function draw() {
    drawBall();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {//Detección de colision con muros laterales 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(drawer);
        drawBugs();
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) { //Detección de colision con muros verticales
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(drawer);
        drawBugs();
    }
    for(i=0;i<current_flies.length;i++){
        if((x > xflies[i] && x < xflies[i]+40)&&(y > yflies[i] && y < yflies[i]+40)){
            // points += 10;
            updateScore(10);
            // console.log("una mosca +10. Puntos: "+points);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearInterval(drawer);
            drawBugs();
        }
    }
    for(i=0;i<current_bees.length;i++){
        if((x > xbees[i] && x < xbees[i]+40)&&(y > ybees[i] && y < ybees[i]+40)){
            // points -= 5;
            updateScore(-5);
            // console.log("una abeja -5. Puntos: "+points);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearInterval(drawer);
            drawBugs();
        }
    }
    for(i=0;i<current_fireflies.length;i++){
        if((x > xfireflies[i] && x < xfireflies[i]+40)&&(y > yfireflies[i] && y < yfireflies[i]+40)){
            // points += 50;
            updateScore(50);
            // console.log("UNA PINCHI LUCIERNAGA!!! +50. puntos: "+points+" WOOOOOOO.");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearInterval(drawer);
            drawBugs();
        }
    }
    x += dx;
    y += dy;
}

function drawFlies(){
    for(c=0; c<flies; c++) {
        current_flies[c] = { x: getRandomInt("x", 50, 670), y: getRandomInt("y", 50, 1230), radius: 3 };
        getBugsCoordenates(xflies, yflies, current_flies, c);
        flyX = current_flies[c].x + current_flies[c].radius * Math.cos(angle * Math.PI / 180);
        flyY = current_flies[c].y + current_flies[c].radius * Math.sin(angle * Math.PI / 180);
        ctx.beginPath();
        ctx.drawImage(fly, flyX, flyY, 40, 40);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawBees(){
    for(c=0; c<bees; c++) {
        current_bees[c] = { x: getRandomInt("x", 50, 670), y: getRandomInt("y", 50, 1230), radius: 3 };
        getBugsCoordenates(xbees, ybees, current_bees, c);
        flyX = current_bees[c].x + current_bees[c].radius * Math.cos(angle * Math.PI / 180);
        flyY = current_bees[c].y + current_bees[c].radius * Math.sin(angle * Math.PI / 180);
        ctx.beginPath();
        ctx.drawImage(bee, flyX, flyY, 40, 40);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawFireflies(){
    for(c=0; c<fireflies; c++) {
        current_fireflies[c] = { x: getRandomInt("x", 50, 670), y: getRandomInt("y", 50, 1230), radius: 3 };
        getBugsCoordenates(xfireflies, yfireflies, current_fireflies, c);
        flyX = current_fireflies[c].x + current_fireflies[c].radius * Math.cos(angle * Math.PI / 180);
        flyY = current_fireflies[c].y + current_fireflies[c].radius * Math.sin(angle * Math.PI / 180);
        ctx.beginPath();
        ctx.drawImage(firefly, flyX, flyY, 40, 40);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function getBugsCoordenates(xbug, ybug, current_bug, c){
    xbug[c] = current_bug[c].x;
    ybug[c] = current_bug[c].y;
}

function getRandomInt(xy, min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    ran = Math.floor(Math.random() * (max - min + 1)) + min;
    if (xy === "x"){
        if(180<ran&&ran<540){
            getRandomInt("x",min, max);
        }
    }
    else if (xy === "y"){
        if(460<ran&&ran<820){
            getRandomInt("y",min, max);
        }
    }
    return ran;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    clock = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert('Se ha acabado el tiempo, mejor puntaje:' + miStorage.getItem('highest_score') + ' Puntaje actual:'+points)
            clearInterval(clock);
        }
    }, 1000);
}

function timer() {
    var one_minute = 60 * 1;
    display = document.getElementById("timer");
    startTimer(one_minute, display);
};

function updateScore(score) {
    points += score;
    socre_board = document.getElementById("points");
    socre_board.textContent=points;
    master();
}

function master() {
    if (!miStorage.getItem('highest_score')) {

        miStorage.setItem('highest_score', points);

    } else if(points > parseInt(miStorage.getItem('highest_score'))) {

            miStorage.setItem('highest_score', points);

    }
    
}