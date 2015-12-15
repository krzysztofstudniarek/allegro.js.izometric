var width = 640, height=480;

var cells;

function draw()
{   
	cells.forEach(function(value){
		polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x-25, value.y+value.height*25, value.x, value.y-25+value.height*25],makecol(145,145,145));
		polygonfill(canvas,4,[value.x-25, value.y + value.height*25, value.x, value.y+25+value.height*25 , value.x, value.y+50, value.x-25, value.y+25],makecol(230,230,230));
		polygonfill(canvas,4,[value.x+25, value.y+value.height*25, value.x, value.y+25+value.height*25, value.x, value.y+50, value.x+25, value.y+25],makecol(200,200,200));
	});


}

function update()
{	
	cells.forEach(function(value){
		if(frand() <= 0.003){
			value.height -= 1;
		}
	});
}

function controls ()
{
	
	if(mouse_b){
		cells.forEach(function(value){
	
			if(distance(mouse_x, mouse_y, value.x, value.y + value.height * 25) <=18 && value.height < 0){
				value.height ++;
			}
			
		});	
	}
}

function events()
{
	
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
			wipe_log();
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
				height: 0
			});
		}
	}
	for(var j =3; j > 0; j--){
		for(var i =0; i < j; i++){
			cells.add({
				x: width/2 + 50*i - 25*j,
				y: height/2 - 25*j +200,
				height: 0

			});
		}
	}
}