

var min = -1.5, max = 1.5;
var tempx = -0.70176;
var tempy = -0.3842;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
	
	var inx = document.getElementById("cx_in");
		inx.type = "range";
		inx.min = "-1000";
		inx.max = "1000"; 
		inx.step = "0.1";
		inx.value = "285";

	var iny = document.getElementById("cy_in");
		iny.type = "range";
		iny.min = "-1000";
		iny.max = "1000"; 
		iny.step = "0.1";
		iny.value = "1";
	
	
	inx.oninput = function()
	{	tempx = this.value/1000;
		draw(ctx, canvas.width, canvas.height);
		
	};
		   
    iny.oninput = function()
	{	tempy = this.value/1000;
		draw(ctx, canvas.width, canvas.height);
		
	};
	
	
    
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
       // canvas.width = innerWidth;
       // canvas.height = innerHeight;
		
		draw(ctx, canvas.width, canvas.height);
    
    }

};


function color(c)
{
	let r, g, b;
	let p = c / 32;
	let l = ~~( p * 6 );
	let o = p * 6 - l;
	let q = 1 - o;
 
	switch(l % 6)
	{
		case 0: r = 1; g = o; b = 0; break;
		case 1: r = q; g = 1; b = 0; break;
		case 2: r = 0; g = 1; b = o; break;
		case 3: r = 0; g = q; b = 1; break;
		case 4: r = o; g = 0; b = 1; break;
		case 5: r = 1; g = 0; b = q; break;
	}
	
	let cor = "#" + ("00"+(~~(r*255)).toString(16)).slice(-2) + 
					("00"+(~~(g*255)).toString(16)).slice(-2) + 
					("00"+(~~(b*255)).toString(16)).slice(-2);
					
	return (cor);
}


function map_range(_in, from1, to1, from2, to2)
{
	return (from2 + ((_in - from1) * (to2 - from2) / (to1 - from1)));
}


function draw(ctx, w, h)
{
  
	var MAX_IT = 1000, it = 0;
	
    for(let i=0;i<w;i++)
    {
        for(let j=0;j<h;j++)
        {
            let sclx = map_range(i, 0, w, min, max);
			let scly = map_range(j, 0, h, min, max);
            
			it = 0;
            while(it < MAX_IT) 
            {
                let x2 = sclx*sclx - scly*scly; 
				let y2 = 2*sclx*scly;

				sclx = x2 + tempx;
				scly = y2 + tempy;
                
                if(x2 + y2 > 4) break;
				it++; 
            }
			
			ctx.fillStyle = color(it);
            ctx.fillRect(i, j, 1, 1);
        }
    }
}






        

 
 

 
 
 
 
