class game {
    numPlayers
    players
    currPLayer
    currWord
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
        if (word in dictionary && currWord[currWord.length - 1] == word[0] && !(word in this.usedWords)) {
            currWord = word
            usedWords.add(word)
            return true
        }
        return false
    }

    getPlayer() {
        return currPLayer
    }

    nextPlayer(player) {
        let nextP = player
        for (let i = 0; i < numPlayers; i++) {
            nextP = nextP.getNext()
            if (nextP.getAlive() == true) {
                return nextP
            }
        }
    }
}