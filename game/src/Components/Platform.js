// Platform.js
export const getPlatformsForLevel = (levelNumber) => {
    switch (levelNumber) {
        case 1:
            return [
                //{ x: 600, y: 450, width: 100, height: 100 },
                //{ x: 700, y: 400, width: 500, height: 150 },
                { x: 600, y: 450, width: 200, height: 20 },
                { x: 850, y: 400, width: 150, height: 20 },
                { x: 1050, y: 350, width: 120, height: 20 },
                { x: 1220, y: 300, width: 180, height: 20 },
                { x: 1450, y: 450, width: 200, height: 20 },
                { x: 1700, y: 420, width: 160, height: 20 },
                { x: 1900, y: 380, width: 140, height: 20 },
                { x: 2100, y: 340, width: 120, height: 20 },
                { x: 2270, y: 300, width: 180, height: 20 },
                { x: 2500, y: 260, width: 200, height: 20 },                
            ];
        // Add cases for other levels
        default:
            return []; // Default or error case
    }
};

let platformImage;

export const loadPlatformImage = (onLoadCallback) => {
    platformImage = new Image();
    platformImage.onload = onLoadCallback; // Call callback after image loads
    platformImage.src = '/platform.png'; 
};

export const renderPlatforms = (ctx, platforms) => {
    platforms.forEach(platform => {
        if (platformImage) {
            ctx.drawImage(platformImage, 0, 0, platformImage.width, platform.height, platform.x, platform.y, platform.width, platform.height);

        } else {
            ctx.fillStyle = 'black'; // Fallback color if image not loaded
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        }
    });
};

export const checkPlatformCollision = (player, platforms) => {
    platforms.forEach(platform => {
        const withinXBounds = player.x + player.width > platform.x && player.x < platform.x + platform.width;
        const withinYBounds = player.y + player.height > platform.y && player.y < platform.y + platform.height;

        if (withinXBounds && withinYBounds) {
            // Check if collision is from the top
            if (player.y + player.height - player.yVelocity <= platform.y) {
                player.y = platform.y - player.height;
                player.yVelocity = 0;
                player.onGround = true;
            } else if (player.y - player.yVelocity >= platform.y + platform.height) {
                // Collision from below
                player.y = platform.y + platform.height;
                player.yVelocity = 0; 
            } else {
                // Handle side collisions
                if (player.x < platform.x) {
                    player.x = platform.x - player.width; // Collision on left side
                } else if (player.x + player.width > platform.x + platform.width) {
                    player.x = platform.x + platform.width; // Collision on right side
                }
                player.xVelocity = 0; // Stop horizontal movement on side collision
            }
        }
    });
};