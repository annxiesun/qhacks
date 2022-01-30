const MaxTime = 15;

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
  },
  AddUserName: function (id, username) {
    usernames[id] = username;
  },
  AddProfilePhoto: function (id, choice) {
    pfp[id] = choice;
  },
  GetUserName: function(id) {
    if (usernames[id]) {
      return usernames[id];
    }
    return id;
  },
  GetUserProfile: function(prof) {
    if (pfp[prof]) {
      return pfp[prof];
    }
    return prof;
  },
  GetUsers: function(listOfIds){
    var ids = Array.from(listOfIds);
    var ret_array = []
    for (var x = 0; x < ids.length; x++) {
        ret_array.push({
            photo: this.GetUserProfile(ids[x]),
            nickname: this.GetUserName(ids[x])
        });
    };
    return ret_array;
  }

};

var existingLobbies = [];
var usernames = {};
var pfp = {}