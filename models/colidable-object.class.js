/**
 * Base class for game objects that support collision detection, physics (gravity/jumping),
 * movement, health tracking, and hit states.
 * Inherits from MoveableObject.
 * @extends MoveableObject
 */
class ColidableObject extends MoveableObject {
  /**
   * Creates an instance of ColidableObject.
   * Initializes horizontal flipping, physics parameters, health, and hit timestamps.
   */
  constructor() {
    super();
    /** @type {boolean} Determines whether rendering should be horizontally mirrored. */
    this.mirrored = false;

    /** @type {number} Current vertical velocity component. */
    this.speedY = 0;

    /** @type {number} Downward gravitational acceleration factor. */
    this.acceleration = 1.5;

    /** @type {number} Current health points. */
    this.health = 100;

    /** @type {number} Timestamp (in ms) when damage was last received. */
    this.lastHit = 0;
  }

  /** 
   * Hitbox offsets for precision collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}} 
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Evaluates axis-aligned bounding box (AABB) intersection between this object and another, taking offsets into account.
   * @param {ColidableObject} mo - The target collidable object to check against.
   * @returns {boolean} True if hitboxes overlap, false otherwise.
   */
  collidingHitbox(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces health points, stops snoring audio, and logs damage timestamp.
   * @returns {void}
   */
  hit() {
    stopSnoring();
    this.health -= 20;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was damaged recently (within the last 1.0 second).
   * @returns {boolean} True if currently in the post-hit invulnerability or hurt frame window.
   */
  getDamage() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.0;
  }

  /**
   * Determines whether health has reached zero.
   * @returns {boolean} True if health is zero, false otherwise.
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Sets upward vertical velocity and plays the jump sound effect.
   * @returns {void}
   */
  jump() {
    this.speedY = 20;
    playSound(gameSounds.jump_sound);
  }

  /**
   * Continuously shifts the object to the left at 60 FPS unless paused.
   * @returns {void}
   */
  moveLeft() {
    setInterval(() => {
      if (world && world.isPaused) return;
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Moves the character to the left and mirrors the rendered sprite.
   * @returns {void}
   */
  characterMoveLeft() {
    this.x -= this.speed;
    this.mirrored = true;
  }

  /**
   * Moves the character to the right and unmirrors the rendered sprite.
   * @returns {void}
   */
  characterMoveRight() {
    this.x += this.speed;
    this.mirrored = false;
  }

  /**
   * Starts a repetitive loop applying gravity to vertical position (`y`) and decreasing vertical velocity (`speedY`).
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this instanceof ThrowableObject && !this.isFalling) {
        return;
      }
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Determines if the object is above ground level.
   * @returns {boolean} True if above vertical threshold 140.
   */
  isInAir() {
    return this.y < 140;
  }
}
