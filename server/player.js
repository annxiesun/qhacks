class player {
    constructor(id, next) {
        this.id = id;
        this.lives = 2;
        this.alive = true;
        this.next = next;
    }

    getAlive() { return this.alive; }

    getId() { return this.id; }

    isId(testId) { return this.id == testId; }

    next() {
        return this.next
    }

    loseLife() {
        this.lives--;
        if(this.lives == 0) {
            alive = false;
        }
    }

    gainLife() {
        this.lives++;
    }
}
