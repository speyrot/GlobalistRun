// Camera.js
export class Camera {
    constructor() {
        this.x = 0; // Initial camera position
    }

    update(playerX) {
        if (playerX > 400) { // Example threshold
            this.x = playerX - 400;
        }
    }
}