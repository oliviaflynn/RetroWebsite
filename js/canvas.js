/*Canvas JS Below*/
requestAnimationFrame(update);
	
const canvas = document.getElementById("c");
const context = canvas.getContext('2d');

var iterations = 0; //how many iterations to perform in current frame, count of fractal func invokes grows exponentially and can be calculated from sum: E 3^k, k = 0 to iterations
const maxIterations = 8; //used when animating, it's better to set 'gradientAnimation' to false, when setting 'maxIterations' to bigger values 
const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
const halfTriangleSide = 250;

//color animation
const gradientAnimation = true;
var t = 0;
var speed = 0.1;

//division animation
var divideAnim = true;
var divide = true; //loop flag
var mod = 0.0; //color modificator

function drawTriangle(A, B, C)
{
	context.beginPath();
	context.moveTo(A.x, A.y);
	context.lineTo(B.x, B.y);
	context.lineTo(C.x, C.y);
	context.lineTo(A.x, A.y);

	if(gradientAnimation)
	{
		context.fillStyle = 
		"rgb(" + 
			((A.x + A.y) * 0.19 * mod) + "," + 
			((B.x + B.y) * 0.15 * mod) + "," + 
			((C.x + C.y) * 0.22 * mod) + 
		")";
	}
	
	context.fill();
}

function fractal(center, halfSideLen, i)
{
	i++;
	var quaterSide = halfSideLen * 0.5;
	
	//calc new triangle coords
	var A = { 
		x: center.x - quaterSide, 
		y: center.y
	};
	
	var B = {
		x: center.x + quaterSide, 
		y: center.y
	};
	
	var C = {
		x: center.x, 
		y: center.y + halfSideLen	
	};
	
	drawTriangle(A, B, C);
	if(i < iterations)
	{		
		fractal({x: A.x, y: A.y + quaterSide}, quaterSide, i);
		fractal({x: B.x, y: B.y + quaterSide}, quaterSide, i);
		fractal({x: C.x, y: C.y - (halfSideLen + quaterSide)}, quaterSide, i);
	}
}

function update()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//init coords
	var A = { 
		x: center.x - halfTriangleSide, 
		y: center.y + halfTriangleSide
	};
	
	var B = {
		x: center.x + halfTriangleSide, 
		y: center.y + halfTriangleSide
	};
	
	var C = {
		x: center.x, 
		y: center.y - halfTriangleSide		
	};
	
	context.fillStyle = "#F00";
	drawTriangle(A, B, C);	
	context.fillStyle = "#000";
	
	if(iterations != 0) fractal(center, halfTriangleSide, 0);	
	
	t += speed;
	if(t > Math.PI * 2)
	{			
		t = 0;
	
		if(divideAnim)
		{
			if(iterations == maxIterations) divide = false;
			else if(iterations == 0) divide = true;
			
			if(divide) iterations++;
			else iterations--;
		}
	}
	
	if(gradientAnimation)
	{
		mod = 1.25 - Math.sin(t) * 0.5;
	}
	
	requestAnimationFrame(update);
}
