module.exports = {
  GenerateLobbyUrl: function () {
    var randomLobby = Math.random().toString(16).substring(2,10);
    if (randomLobby in existingLobbies) {
        GenerateLobbyUrl();
    } else {
        existingLobbies.push(randomLobby);
        return randomLobby;
    }
  },
  GetUserProfile: function (path) {
    var choice = path.toString().substring(16);
    if (choice >= 1 && choice <= 3) {
        return choice
    }
    return "placeholder"
  },
  GetLastValue: function (set) {
    let value;
    for(value of set);
    return value;
  }

};

var existingLobbies = []