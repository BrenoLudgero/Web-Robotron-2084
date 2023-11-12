# Web Robotron: 2084 (Work In Progress)
Robotron: 2084 is a classic arcade game released in 1982\
This repository aims to faithfully recreate the game with online high score leaderboards

## Usage
Download the source code and open "index.html" with the Live Server extension in VS Code

## Gameplay
Shoot the enemies and rescue the humans to rack as many points as you can!\
At every 25,000 points you get an extra life (indicated next to the score)\
Clear the screen of vulnerable enemies to advance to the next wave

## Enemies
Destroying enemies grants you points but getting too close will cost you a life!

### ![Grunt](/github-images/grunt.png) G.R.U.N.T. (100 Points)
The Ground Roving Unit Network Terminator moves at increasing speeds towards the player

### ![Hulk](/github-images/hulk.png) Hulk
Hulks are indestructible and will destroy humans on contact but can be pushed back with your projectiles

### ![Spheroid](/github-images/spheroid.png) Spheroids (1,000 Points)
A Spheroid roams around the screen. Given enough time, it'll create Enforcers

### ![Enforcer](/github-images/enforcer.png) Enforcer (150 Points)
Enforcers pursue the player while firing Sparks (25 Points)

### ![Brain](/github-images/brain.png) Brain (500 Points)
Brains fire Cruise Missiles (25 Points) that pursue the player. They can chase and convert humans into Progs on contact

### ![Prog](/github-images/prog.png) Prog (100 Points)
Progs (or reprogrammed humans) will relentlessly chase the player

### ![Quark](/github-images/quark.png) Quarks (1,000 Points)
Quarks behave similar to Spheroids, but will create Tanks

### ![Tank](/github-images/tank.png) Tank (200 Points)
Tanks move relatively slowly and fire Bounce Bombs (25 Points) that bounce upon touching a wall

### ![Humans](/github-images/humans.png) Humans (1,000 - 5,000 Points)
Rescuing a human grants 1000 points. Every subsequent rescue grants an additional 1000 points up to 5000\
Losing a life or advancing to the next wave resets the next rescue to the initial 1000 points

### Obstacles
Obstacles are scattered around the screen and will destroy the player on contact

## Controls
| Keyboard Key | Description |
| :----------: | :---------: |
| W  | Move up |
| A  | Move left |
| S  | Move down |
| D  | Move right |
| Arrow Up  | Shoot up |
| Arrow Left  | Shoot left |
| Arrow Down  | Shoot down |
| Arrow Right  | Shoot right |

## Known Issues
You can't move if Caps Lock is turned on

## Debugging Shortcuts
| Keyboard Key | Description |
| :----------: | :---------: |
| U  | Freezes all actors |
| H  | Draws all hitboxes |
| I  | Disables all collision |
