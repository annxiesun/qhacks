class game {
    numPlayers
    players
    animalDict = {
        "cat":1,
        "dog":2,
        "mouse":3,
        "lion":4,
        "tiger":5,
        "giraffe":6
    };
    dictionary;
    usedWords;
    constructor(playerIds, dictionary) {
        this.numPlayers = playerIds.length;
        this.playerIds = playerIds;
        this.dictionary = dictionary;
    }

    checkWord(word) { 
        return word in dictionary
    }

    nextTurn(player, numPlayers) {
        // have a next id variable inside each player instance
        // start i at 1 to exclude the current player
        let nextP = player
        for (let i = 1; i < numPlayers; i++) {
            nextP = nextP.next()
            if (nextP.alive() == true) {
                return nextP
            }
        }
        return winGame(player)
    }
    
    winGame(player) {
        for (const p of players) {
            io.to(p.getId()).emit(`${player.getId()} is the winner!`)
        }
    }
}