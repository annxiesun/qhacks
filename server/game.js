var fs = require("fs");

module.exports = {

  checkWord(word) {
    var updated_word = word.toLowerCase() + "\r";

    if (dict.includes(updated_word) && currWord.charAt(currWord.length - 1) == word.charAt(0) ) {
      currWord = updated_word
      return true
    }
      return false
  }


}


var text = fs.readFileSync("./dataset_dictionaries/dataset0.txt").toString();
var dict = text.split("\n")
var currWord = "keemstar";