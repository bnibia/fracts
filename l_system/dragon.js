





var axiom = "FX";
var instruction = "";
var rules;
var size = 15;
var dist = 5;
var W, H, ctx;
var angle = 90;
var rad;

function set_rules()
{
	rules = [];
	rules[0] = {a: "X", b: "X+YF+"};
	rules[1] = {a: "Y", b: "-FX-Y"};
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
	else 
	{
		if(aux == "+") ctx.rotate(angle*rad);
		else if(aux == "-") ctx.rotate(-angle*rad);
	}

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

       	ctx.translate(W/2, H/2);
       	draw();
    }
};







