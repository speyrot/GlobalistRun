// Game.js
import React, { useRef, useEffect } from 'react';
import GameContainer from '../GameContainer';
import { Camera } from './Camera';
import { loadPlatformImage, getPlatformsForLevel, renderPlatforms, checkPlatformCollision } from './Platform';

const Game = ({ levelNumber = 1 }) => {
    const canvasRef = useRef(null);
    const playerRef = useRef({
        x: 100,
        y: 300,
        width: 50,
        height: 50,
        xVelocity: 0,
        yVelocity: 0,
        onGround: true
    });
    const cameraRef = useRef(new Camera());
    const currentPlatforms = useRef(getPlatformsForLevel(levelNumber));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const groundLevel = canvas.height - 50 - playerRef.current.height;

        loadPlatformImage();

        const handleKeyDown = (event) => {
            const player = playerRef.current;
            if (event.key === 'ArrowLeft') {
                player.xVelocity = -4;
            } else if (event.key === 'ArrowRight') {
                player.xVelocity = 4;
            } else if (event.key === 'ArrowUp' && player.onGround) {
                player.yVelocity = -15;
                player.onGround = false;
            }
        };

        const handleKeyUp = (event) => {
            const player = playerRef.current;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                player.xVelocity = 0;
            }
        };

        const gameLoop = () => {
            const player = playerRef.current;
            const camera = cameraRef.current;

            player.x += player.xVelocity;
            player.y += player.yVelocity;

            if (player.y + player.height < groundLevel) {
                player.yVelocity += 0.6;
                player.onGround = false;
            } else {
                player.y = groundLevel - player.height;
                player.yVelocity = 0;
                player.onGround = true;
            }

            camera.update(player.x);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(-camera.x, 0);

            ctx.fillStyle = 'blue';
            ctx.fillRect(player.x, player.y, player.width, player.height);
            renderPlatforms(ctx, currentPlatforms.current);
            checkPlatformCollision(player, currentPlatforms.current);

            ctx.restore();

            requestAnimationFrame(gameLoop);
        };

        loadPlatformImage(() => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            gameLoop();
        });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [levelNumber]);

    return (
        <GameContainer>
            <canvas ref={canvasRef} width={1000} height={600}></canvas>
        </GameContainer>
    );
};

export default Game;