/*import './player.js';
var fs = require("fs");

class game {
    numPlayers
    players
    currPLayer
    currWord
    // animalDict = {
    //     "cat":1,
    //     "dog":2,
    //     "mouse":3,
    //     "lion":4,
    //     "tiger":5,
    //     "giraffe":6
    // };
    dictionary;
    usedWords;
    constructor(playerIds, dictionary) {
        this.numPlayers = playerIds.length;
        this.playerIds = playerIds;
        chooseDictionary();
    }

    setPlayers(playerIds) {
        for (let index = 0; index < playerIds.length; index++) {
            this.players[index] = playerIds[index];
            
        }
    }

    chooseDictionary() {
        var datasetNum = Math.floor(Math.random() * 3) + 1;
        var text = fs.readFileSync("../dataset_dictionaries/dataset" + datasetNum + ".txt");
        var textByLine = text.split("\n");
        var description = textByLine[0];
        textByLine.splice[0, 1]; //splice at [0] and delete 1 word
        this.dictionary = new Set(textByLine);
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
}*/
