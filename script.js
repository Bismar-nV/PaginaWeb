const player = document.getElementById('player');
const finish = document.getElementById('finish');
const walls = document.querySelectorAll('.wall');
const gameStatus = document.getElementById('game-status');

let playerPosition = { x: 0, y: 0 };

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(0, -10);
      break;
    case 'ArrowDown':
      movePlayer(0, 10);
      break;
    case 'ArrowLeft':
      movePlayer(-10, 0);
      break;
    case 'ArrowRight':
      movePlayer(10, 0);
      break;
  }
  checkFinish();
});

function movePlayer(dx, dy) {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;
  
  player.style.left = newX + 'px';
  player.style.top = newY + 'px';

  if (!checkCollision(newX, newY)) {
    playerPosition.x = newX;
    playerPosition.y = newY;
  } else {
    // Si choca con una pared, no actualizar la posición
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
  }
}

function checkCollision(newX, newY) {
  const playerRect = {
    left: newX,
    right: newX + player.offsetWidth,
    top: newY,
    bottom: newY + player.offsetHeight
  };

  for (let wall of walls) {
    const wallRect = wall.getBoundingClientRect();
    if (
      playerRect.right > wallRect.left &&
      playerRect.left < wallRect.right &&
      playerRect.bottom > wallRect.top &&
      playerRect.top < wallRect.bottom
    ) {
      return true;
    }
  }
  return false;
}

function checkFinish() {
  const playerRect = player.getBoundingClientRect();
  const finishRect = finish.getBoundingClientRect();

  if (
    playerRect.right > finishRect.left &&
    playerRect.left < finishRect.right &&
    playerRect.bottom > finishRect.top &&
    playerRect.top < finishRect.bottom
  ) {
    gameStatus.innerText = '¡Ganaste! Llegaste a la meta 🎉';
    document.removeEventListener('keydown', movePlayer); // Desactivar movimiento
  }
}
