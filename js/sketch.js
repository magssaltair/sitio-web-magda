let stars = [];
let connections = [];

function setup() {
  // Crear canvas y colocarlo dentro del contenedor #p5-background
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-background");

  // Crear estrellas iniciales
  for (let i = 0; i < 80; i++) {
    stars.push(new Star());
  }
}

function draw() {
    background(0);
  clear(); // hace transparente el fondo para que se mezcle con el hero

  // Dibujar estrellas
  for (let s of stars) {
    s.move();
    s.twinkle();
    s.show();

    // Crear conexiones nuevas cerca del mouse
    let d = dist(mouseX, mouseY, s.x, s.y);
    if (d < 150) {
      connections.push(new Connection(mouseX, mouseY, s.x, s.y, d));
    }
  }

  // Dibujar y actualizar las conexiones
  for (let i = connections.length - 1; i >= 0; i--) {
    connections[i].show();
    connections[i].fade();
    if (connections[i].alpha <= 0) {
      connections.splice(i, 1);
    }
  }
}

// ===== Clase Estrella =====
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.baseR = random(6, 12);
    this.r = this.baseR;
    this.speed = random(0.2, 1.2);
    this.floatX = random(-0.5, 0.5);
    this.floatY = random(-0.5, 0.5);
    this.color = random([color(255), color(0, 255, 100)]); // blanco o verde
    this.twinkleSpeed = random(0.02, 0.05);
    this.offset = random(TWO_PI);
  }

  move() {
    this.x += this.floatX;
    this.y += this.floatY;
    this.x += map(mouseX, 0, width, -0.1, 0.1) * this.speed;
    this.y += map(mouseY, 0, height, -0.1, 0.1) * this.speed;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  twinkle() {
    this.r = this.baseR + sin(frameCount * this.twinkleSpeed + this.offset) * 2;
  }

  show() {
    let dMouse = dist(mouseX, mouseY, this.x, this.y);

    // Si el mouse está lejos → estrella con glow
    if (dMouse > 100) {
      noStroke();
      for (let i = 4; i > 0; i--) {
        fill(red(this.color), green(this.color), blue(this.color), 40 / i);
        ellipse(this.x, this.y, this.r * (i * 2));
      }
    }

    // Estrella principal (siempre se dibuja)
    noStroke();
    fill(this.color);
    drawStar(this.x, this.y, this.r / 2, this.r, 5);
  }
}

// ===== Clase Conexión =====
class Connection {
  constructor(x1, y1, x2, y2, d) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.alpha = map(d, 0, 150, 150, 30); // líneas más transparentes
  }

  show() {
    // Glow más suave (muy transparente)
    for (let i = 2; i > 0; i--) {
      stroke(0, 255, 100, this.alpha / (i * 1.5));
      strokeWeight(i * 1.5);
      line(this.x1, this.y1, this.x2, this.y2);
    }
  }

  fade() {
    this.alpha -= 3; // desvanecen suavemente
  }
}

// ===== Función para dibujar estrellas de puntas =====
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
