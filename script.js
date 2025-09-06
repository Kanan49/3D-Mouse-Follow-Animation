const multiple = 9;
const scene = document.getElementById("scene");
const keys = scene.children;

const resizeObserver = new ResizeObserver(entries => {
	for (let entry of entries) {
		const { width, height } = entry.contentRect;
		entry.target.style.setProperty('--width', width);
		entry.target.style.setProperty('--height', height);
		
		const rect = entry.target.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		entry.target.style.setProperty('--x', centerX);
		entry.target.style.setProperty('--y', centerY);
	}
});

for (let i = 0; i < keys.length; i++) {
	resizeObserver.observe(keys[i]);
}

var x = window.innerWidth/2;
var y = window.innerHeight/2;
var ballX = x;
var ballY = y;

const lerp = (x, y, a) => x * (1 - a) + y * a;

let animationFrameId;

function loop() {
	ballX = lerp(ballX, x, 0.08);
	ballY = lerp(ballY, y, 0.08);
	scene.style.setProperty('--mouse-x', ballX);
	scene.style.setProperty('--mouse-y', ballY);

	if (Math.abs(ballX - x) > 0.1 || Math.abs(ballY - y) > 0.1) {
		animationFrameId = requestAnimationFrame(loop);
	} else {
		animationFrameId = null;
	}
}

function mousemove(e) {
	x = e.pageX;
	y = e.pageY;

	if (!animationFrameId) {
		loop();
	}
}

function touch(e) {
	if (e.changedTouches) {
		const touch = e.changedTouches[0];
		x = touch.pageX;
		y = touch.pageY;

		if (!animationFrameId) {
			loop();
		}
	}
}

scene.addEventListener('touchstart', touch);
scene.addEventListener('touchmove', touch);
scene.addEventListener('mousemove', mousemove);





















// const multiple = 10;
// const scene = document.getElementById("scene");
// const keys = scene.children;

// const resizeObserver = new ResizeObserver(entries => {
//     for (let entry of entries) {
//         const { width, height } = entry.contentRect;
//         entry.target.style.setProperty('--width', width);
//         entry.target.style.setProperty('--height', height);
        
//         const rect = entry.target.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         entry.target.style.setProperty('--x', centerX);
//         entry.target.style.setProperty('--y', centerY);
//     }
// });

// for (let i = 0; i < keys.length; i++) {
//     resizeObserver.observe(keys[i]);
// }

// scene.addEventListener("mousemove", (e) => {
//     window.requestAnimationFrame(function () {
// 		// update --mouse-x and --mouse-y custom properties
//         scene.style.setProperty('--mouse-x', e.clientX);
//         scene.style.setProperty('--mouse-y', e.clientY);
// 	});
// });