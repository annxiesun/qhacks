const MaxTime = 15;
var tools = require('./game');
module.exports = {
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
  AddUser: function(name) {
    if (allUserNames.indexOf(name) == -1){
        allUserNames.push(name)
    }
  },
  SetUpLives: function (id) {
    liveMap[id] = 2;
  },
  GetUsersIds: function() { return allUserNames },
  GetUserName: function(id) {
    if (usernames[id]) {
      return usernames[id];
    }
    return "Default-Player";
  },
  GetUserProfile: function(id) {
    if (pfp[id]) {
      return pfp[id];
    }
    if (pfp[id] == 0) {
      return 0;
    }
    return 1;
  },
  GetUserLives: function(id) { return liveMap[id] },
  GetUsers: function(listOfIds) {
    var ret_array = []
    for (var x = 0; x < listOfIds.length; x++) {
        ret_array.push({
            pic: this.GetUserProfile(ids[x]),
            username: this.GetUserName(ids[x]),
            lives: this.GetUserLives(ids[x])
        });
    };
    return ret_array;
  },
  GetLobby: function(listOfIds){
    var ids = Array.from(listOfIds);
    var ret_array = []
    for (var x = 0; x < ids.length; x++) {
        ret_array.push({
            pic: this.GetUserProfile(ids[x]),
            username: this.GetUserName(ids[x])
        });
    };
    return ret_array;
  },
  NewGame: function(room, playerIDs) {
    games[room] = games(2,2)
  },
  GetGame: function(room) {
    return games[room];
  }

};

var existingLobbies = [];
var allUserNames = [];
var usernames = {};
var pfp = {}
var liveMap = {}
var games = {}