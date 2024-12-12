var config = { 
    type: Phaser.AUTO, 
    width: 1310, 
    height: 630, 
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 300 }, 
            debug: false
        } 
    }, 
    scene: { 
        preload: preload, 
        create: create, 
        update: update 
    } 
}; 
 
var player; 
var stars; 
var cursors; 
var score = 0; 
var scoreText; 
 
var game = new Phaser.Game(config); 
 
function preload () { 
    this.load.image('sky', 'assets/sky2.jpg'); 
    this.load.image('ground', 'assets/ground.png'); 
    this.load.image('star', 'assets/star.png'); 
    this.load.spritesheet('dude', 'assets/dude.jpg', { frameWidth: 32, 
frameHeight: 48 }); 
} 
 
function create () { 
    // Menambahkan latar belakang 
    console.log("Creating scene...");
    this.add.image(400, 300, 'sky').setScale(8); 
 
    // Membuat platform 
    var platforms = this.physics.add.staticGroup(); 
    platforms.create(675, 650, 'ground').setScale(6,2).refreshBody();
    platforms.create(1000, 200, 'ground').setScale(0.5,0.5).refreshBody(); 
    platforms.create(200, 200, 'ground').setScale(0.5,0.5).refreshBody(); 
    platforms.create(400, 400, 'ground').setScale(0.5,0.5).refreshBody();
    platforms.create(600, 200, 'ground').setScale(0.5,0.5).refreshBody();
    platforms.create(800, 400, 'ground').setScale(0.5,0.5).refreshBody();

    // Membuat player 
    player = this.physics.add.sprite(300, 450, 'dude'); 
    player.setBounce(0.2); 
    player.setCollideWorldBounds(true); 
 
    this.anims.create({ 
        key: 'left', 
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 
}), 
        frameRate: 10, 
        repeat: -1 
    }); 
 
    this.anims.create({ 
        key: 'turn', 
        frames: [ { key: 'dude', frame: 4 } ], 
        frameRate: 20 
    }); 
 
    this.anims.create({ 
        key: 'right', 
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 
}), 
        frameRate: 10, 
        repeat: -1 
    }); 
 
    // Menambahkan kontrol keyboard 
    cursors = this.input.keyboard.createCursorKeys(); 
 
    // Menambahkan bintang 
    stars = this.physics.add.group({ 
        key: 'star', 
        repeat: 20, 
        setXY: { x: 20, y: 0, stepX: 70 } 
    }); 
 
    stars.children.iterate(function (child) { 
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
        child.setScale(0.1);
    }); 
 
    // Menambahkan skor 
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 
'#000' }); 
 
    // Menambahkan fisika ke player dan bintang 
    this.physics.add.collider(player, platforms); 
    this.physics.add.collider(stars, platforms); 
 
    // Ketika player menyentuh bintang 
    this.physics.add.overlap(player, stars, collectStar, null, this); 
} 
 
function update () { 
    if (cursors.left.isDown) { 
        player.setVelocityX(-160); 
        player.anims.play('left', true);
    } else if (cursors.right.isDown) { 
        player.setVelocityX(160); 
        player.anims.play('right', true); 
        } else { 
        player.setVelocityX(0); 
        player.anims.play('turn'); 
        } 
        if (cursors.up.isDown && player.body.touching.down) { 
        player.setVelocityY(-330); 
        } 
        } 
        function collectStar (player, star) { 
        star.disableBody(true, true); 
        // Menambah skor 
        score += 10; 
        scoreText.setText('Score: ' + score); 
    }