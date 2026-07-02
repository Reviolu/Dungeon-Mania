# Dungeon Mania

Dungeon Mania is a top-down survival game inspired by Vampire Survivors, built using JavaScript and Phaser.

The game features real-time combat, procedural enemy spawning, and currently looking into adding scalable difficulty progression.

## Features
- Player movement and directional animations
- Real-time combat system with hit detection
- Procedural enemy spawning
- Enemy that tracks and attacks the player

## Getting Started
1. Clone the repository:
   git clone https://github.com/yourusername/dungeon-mania

2. Navigate into the project:
   cd dungeon-mania

3. Start a local server (required for Phaser assets):
   npm live-server

4. Open the game in your browser

## Architecture
The game uses an object-oriented design:

- `Player` class handles movement, combat, and state
- `Enemy` is an abstract base class for reusable enemy logic
- `Bat` extends `Enemy` with custom behaviour
- Phaser physics system is used for collision and overlap detection

Enemies are managed using Phaser groups for efficient updates and spawning.

## Currently Working on:
- Scalable difficulty / progression system
- More enemies
- Add sound effects and UI (health bar, score)
- Introduce wave-based progression system
