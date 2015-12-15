var width = 640, height=480;

var cells;

var score = 0;

var inGame = false;
var gameOver = false;

var maxHeight = 0;

function draw()
{   
	if(inGame || gameOver){
		
		polygonfill(canvas,4,[width/2-125, height/2 - 125, width/2-25, height/2-225, width/2-25, height/2+25, width/2-125, height/2+125],makecol(230*((abs(maxHeight))/(10)),230*(10 - (abs(maxHeight))/(10)),0));
		polygonfill(canvas,4,[width/2+75, height/2 - 125, width/2-25, height/2-225, width/2-25, height/2+25, width/2+75, height/2+125],makecol(200*((abs(maxHeight))/(10)),200*(10 - (abs(maxHeight))/(10)),0));
		
		
		cells.forEach(function(value){
			if(value.color == 'grey'){
				polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x-25, value.y+value.height*25, value.x, value.y-25+value.height*25],makecol(145,145,145));
				polygonfill(canvas,4,[value.x-25, value.y + value.height*25, value.x, value.y+25+value.height*25 , value.x, value.y+50, value.x-25, value.y+25],makecol(230,230,230));
				polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x, value.y+50, value.x+25, value.y+25],makecol(200,200,200));
			}else if(value.color = 'red'){
				polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x-25, value.y+value.height*25, value.x, value.y-25+value.height*25],makecol(145,0,0));
				polygonfill(canvas,4,[value.x-25, value.y + value.height*25, value.x, value.y+25+value.height*25 , value.x, value.y+50, value.x-25, value.y+25],makecol(230,0,0));
				polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x, value.y+50, value.x+25, value.y+25],makecol(200,0,0));
			}
		});
		
		textout_centre(canvas,font,"SCORE: "+ score,SCREEN_W/2 + 200,SCREEN_H/2,14,makecol(0,0,0));
	}
	if(gameOver){
		polygonfill(canvas, 4, [0,0,width,0,width,height,0,height], makecol(255,255,255, 190));
		textout_centre(canvas,font,"GAME OVER!",SCREEN_W/2,SCREEN_H/2,20,makecol(0,0,0));
		textout_centre(canvas,font,"SCORE: "+score,SCREEN_W/2,SCREEN_H/2+50,15,makecol(0,0,0));
	}
	if(!inGame && !gameOver){
		textout_centre(canvas,font,"Welcome in",SCREEN_W/2,SCREEN_H/2-30,15,makecol(0,0,0));
		textout_centre(canvas,font,"IZOMETRIC",SCREEN_W/2,SCREEN_H/2,20,makecol(0,0,0));
		textout_centre(canvas,font,"Click on column to decrease its height.",SCREEN_W/2,SCREEN_H/2+50,10,makecol(0,0,0));
		textout_centre(canvas,font,"Don't allow the to grow to high.",SCREEN_W/2,SCREEN_H/2+70,10,makecol(0,0,0));
		textout_centre(canvas,font,"Press SPACE to start!",SCREEN_W/2,SCREEN_H/2+90,10,makecol(0,0,0));
	}
	
}

function update()
{	

	
	if(inGame){
		maxHeight = 0;
		cells.forEach(function(value){
			if(frand() <= 0.005){
				value.height--;
			}
			
			if(value.height <=-10){
				inGame = false;
				gameOver = true;
				value.color = 'red';
				log(value.y + value.height*25);
			}
			
			if(value.height < maxHeight){
				maxHeight = value.height;
			}
		});
	}
}

function controls ()
{
	if(inGame){
		if(mouse_b){
			cells.forEach(function(value){
				if(distance(mouse_x, mouse_y, value.x, value.y + value.height * 25) <=17 && value.height < 0){
					value.height++;
					score += 10;
				}
			});	
		}
	}
}

function events()
{
	if(!inGame && !gameOver && pressed[KEY_SPACE]){
		inGame = true;
	}
	
	if(gameOver && pressed[KEY_SPACE]){
		cells.forEach(function(value){
			value.height = 0;
			value.color = 'grey';
		});
		gameOver = false;
		inGame = true;
	}
	
}

function dispose ()
{

}

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	ready(function(){
        loop(function(){
            clear_to_color(canvas,makecol(255,255,255));
			dispose();
			controls();
            update();
			events();
            draw();
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	cells = new Set();
	for(var j =0; j < 5; j++){
		for(var i =0; i < j; i++){
			cells.add({
				x: width/2 + 50*i - 25*j,
				y: height/2 + 25*j, 
				height: 0,
				color: 'grey'
			});
		}
	}
	for(var j =3; j > 0; j--){
		for(var i =0; i < j; i++){
			cells.add({
				x: width/2 + 50*i - 25*j,
				y: height/2 - 25*j +200,
				height: 0,
				color: 'grey'

			});
		}
	}
}