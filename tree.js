let angle;

function setup() {
	createCanvas(400, 400);
	angle = PI / 4;
}
function draw() {	
	background (0); stroke (255);
	translate(200, height);
	angle = map(cos(frameCount * 0.01), -1, 1, PI/2, PI / 16);
	branch(100);
}

function branch(len) {
	line(0, 0, 0, -len);
	translate(0,
	-len);
	if (len > 4) {
		push();
		rotate(angle);
		branch(len * 0.67);
		pop();
		push();
		rotate(-angle);
		branch(len * 0.67);
		pop();
	}
}
