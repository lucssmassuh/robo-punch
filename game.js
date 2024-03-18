const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define robot object with feet positions and rotation settings
const robot = {
    footRadius: 20,
    // Counter-clockwise rotation initially
    spinSpeed: -0.02,
    // Initial position of the static foot
    staticFoot: { x: canvas.width / 2, y: canvas.height / 2 },
    // Initial position of the dynamic foot will be calculated
    dynamicFoot: { x: 0, y: 0 },
    // Initial angle for rotation
    rotationAngle: 0,

    // Function to update dynamic foot position relative to static foot
    updateDynamicFootPosition: function() {
        // Offset the dynamic foot by a fixed distance from the static foot
        this.dynamicFoot.x = this.staticFoot.x + Math.cos(this.rotationAngle) * (this.footRadius * 3);
        this.dynamicFoot.y = this.staticFoot.y + Math.sin(this.rotationAngle) * (this.footRadius * 3);
    },

    // Function to draw both feet
    draw: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Update dynamic foot position
        this.updateDynamicFootPosition();

        // Draw static foot
        ctx.fillStyle = '#0095DD';
        ctx.beginPath();
        ctx.arc(this.staticFoot.x, this.staticFoot.y, this.footRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Draw dynamic foot with a shadow effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(this.dynamicFoot.x, this.dynamicFoot.y, this.footRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Update the rotation angle for the next frame
        this.rotationAngle += this.spinSpeed;
    },

    // Function to toggle feet roles
    toggleFeet: function() {
        // Swap roles by directly setting the new static foot to the current dynamic foot position
        // and calculate the next dynamic foot position without using previous values
        let tempX = this.staticFoot.x, tempY = this.staticFoot.y;
        this.staticFoot.x = this.dynamicFoot.x;
        this.staticFoot.y = this.dynamicFoot.y;
        this.dynamicFoot.x = tempX;
        this.dynamicFoot.y = tempY;

        // Reverse the rotation direction
        this.spinSpeed = -this.spinSpeed;

        // Reset the rotation angle to start the new dynamic rotation from the exact static position
        this.rotationAngle = Math.atan2(this.dynamicFoot.y - this.staticFoot.y, this.dynamicFoot.x - this.staticFoot.x);
    }
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        robot.toggleFeet();
    }
});

function gameLoop() {
    requestAnimationFrame(gameLoop);
    robot.draw();
}

gameLoop();
