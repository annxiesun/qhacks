<<<<<<< Updated upstream
class game {
    numPlayers
    players
    currPLayer
    currWord
=======


class game {
    numPlayers
    players
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    checkWord(word) {
        return (word in dictionary && currWord[currWord.length - 1] == word[0])
    }

    nextPlayer(player) {
=======
    checkWord(word) { 
        return word in dictionary
    }

    nextTurn(player, numPlayers) {
>>>>>>> Stashed changes
        // have a next id variable inside each player instance
        // start i at 1 to exclude the current player
        let nextP = player
        for (let i = 1; i < numPlayers; i++) {
<<<<<<< Updated upstream
            nextP = nextP.getNext()
            if (nextP.getAlive() == true) {
                return nextP
            }
        }
        return winGame(player)
=======
            nextP = nextP.next()
            if (nextP.alive() == true) {
                return nextP
            }
        }
        winGame(player)
>>>>>>> Stashed changes
    }
    
    winGame(player) {
        for (const p of players) {
            io.to(p.getId()).emit(`${player.getId()} is the winner!`)
        }
    }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
