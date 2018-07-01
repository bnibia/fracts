





var axiom = "F";
var instruction = "";
var rules;
var size = 8;
var dist = 10;
var W, H, ctx;
var angle = 22.5;
var rad;

function set_rules()
{
	rules = [];
	rules[0] = {a: "F", b: "FF+[+F-F-F]-[-F+F+F]"};
}

function get_road()
{
	for(let i=0;i<size;i++)
	{
		if(!i) 
		{	instruction = axiom;
			continue;
		}

		let temp = "";

		for(let j=0;j<instruction.length;j++)
		{
			let ctr = 0;

			for(k=0;k<rules.length;k++)
			{
				if(instruction[j] == rules[k].a)
				{
					temp += rules[k].b;
					ctr = 1;
				}
			}

			if(!ctr) temp += instruction[j];
		}

		instruction = temp;
	}
}



var index=0;
function draw()
{

	let aux = instruction[index];

	if(aux == "F")
	{
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -dist);
		ctx.stroke();
		ctx.translate(0, -dist);
	}
	else if(aux == "+") ctx.rotate(angle*rad);
	else if(aux == "-") ctx.rotate(-angle*rad);
	else if(aux == "[") ctx.save();
	else if(aux == "]") ctx.restore();
	
	index++;

	if(index >= instruction.length) return;
	window.requestAnimationFrame(draw);

}



window.onload = function()
{
    
   	
	set_rules();
	get_road();

	rad = Math.PI/180;
   	var canvas = document.getElementById("canvas");
	
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
       	W = canvas.width;
       	H = canvas.height;

       	ctx.translate(W/2, H);
       	draw();
    }
};







