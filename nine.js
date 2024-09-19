let canvas = document.getElementById("can")
let c = canvas.getContext("2d")
let canvas2 = document.getElementById("links")
let canvas2_width = canvas2.width = window.innerWidth
let canvas2_height = canvas2.height = window.innerHeight
let ctx = canvas2.getContext('2d')
let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight
c.font = '30px Sans-Serif'

let limit = 100;

let lists = []

let score = 0

function clouds(Xaxis, Yaxis) {
    this.Xaxis = Xaxis
    this.Yaxis = Yaxis
    this.cloud = new Image()
    this.cloud.src = "clouds.png"
    this.stuff = function () {
        c.drawImage(this.cloud, 0, 0, 1338, 571, Xaxis, Yaxis, 1338 / 4, 571 / 4)
    }
}

let Clouds = []
for (let i = 0; i <= 10; i++) {
    let X = Math.random() * 1500
    let Y = Math.random() * 5000
    Clouds.push(new clouds(X, Y))
}

let explosions = []
window.addEventListener("click", function (e) {
    let detecy = ctx.getImageData(e.x, e.y, 1, 1)
    let area = detecy.data;
    lists.forEach((maps) => {
        if (maps.rands[0] === area[0] && maps.rands[1] === area[1] && maps.rands[2] === area[2]) {
            maps.gone = true
            score++
            explosions.push(new explode(maps.x, maps.y, maps.widths))
            console.log(explosions)
        }
    })
})

function explode(X, Y, sizex) {
    this.X = X
    this.Y = Y
    this.sizex = sizex
    this.move = 0
    this.moveY = 0
    this.spritewidth = 206.33
    this.spriteheight = 133.33
    this.stags = 2
    this.tres = 0
    this.delete = false
    this.images = new Image()
    this.audio = new Audio()
    this.audio.src = "likes.wav"
    this.images.src = "Explode.png"
    this.make = function () {
        c.drawImage(this.images, this.spritewidth * this.move, this.spriteheight * this.moveY, this.spritewidth, this.spriteheight, this.X, this.Y, this.spritewidth, this.spriteheight)
        if (this.tres % this.stags == 0) {
            this.move += 1
        }
        if (this.move == 0) {
            this.audio.play()

        }
        if (this.move > 2) {
            this.moveY += 1
            if (this.moveY > 2) {
                this.moveY = 0
                this.delete = true

            }
            this.move = 0
        }
        this.tres++
    }
}




function vile(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.gone = false
    this.spritewidth = 243.83
    this.spriteheight = 171
    this.X = 0
    this.score = 0
    this.stags = Math.floor(Math.random() * 7) + 2
    this.tres = 0
    this.radian = 0.01
    this.widths = this.spritewidth / this.stags
    this.rands = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    this.color = `rgb(${this.rands[0]}, ${this.rands[1]}, ${this.rands[2]})`
    this.heights = this.spriteheight / this.stags
    this.image = new Image()
    this.image.src = "bird.png"
    this.make = function () {
        Score(this.score)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.widths, this.heights)
        c.drawImage(this.image, this.spritewidth * this.X, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.widths, this.heights)
        if (this.tres % this.stags == 0) {
            this.X += 1
            if (this.X >= 5) {
                this.X = 0
            }
        }
        this.tres++
    }
    this.update = function () {
        this.x -= this.stags
        this.y += (Math.sin(this.radian) * 1)
        if (this.tres % this.stags == 0) {
            this.radian++
        }
        if (this.x + this.size < 0) {
            this.gone = true
        }
    }
}
let last = 0;
let nexts = 0;

function Score(Scores) {
    c.fillStyle = "Black"
    c.fillText("Scores " + score, 55, 80)
}

function animate(timestamp) {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, width, height)
    ctx.clearRect(0, 0, width, height)
    let deltas = timestamp - last
    Clouds.forEach((clod) => {
        clod.stuff()
    })

    last = timestamp;
    nexts += deltas;
    if (nexts > limit) {
        let x = window.innerWidth
        let y = Math.random() * window.innerHeight
        let size = 30
        nexts = 0
        lists.push(new vile(x, y, size))
    }
    Score(score);
    [...lists].forEach(map => map.make());
    [...lists].forEach(map => map.update());

    lists = lists.filter(value => value.gone == false);
    [...explosions].forEach(map => map.make());
    explosions = explosions.filter(val => val.delete == false);
}

animate(0)