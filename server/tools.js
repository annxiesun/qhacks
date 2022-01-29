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
  ConnectUser: function (userId, roomId) {
    userToRoom[userId] = roomId;
    if (roomToUser[roomId]) {
        roomToUser[roomId].push(userId);
    } else {
        roomToUser[roomId] = [userId];
    }
  },
  GetRoomOfUser: function (userId) { return userToRoom[userId] },
  GetUsersInRoom: function (roomId) { return roomToUser[roomId] },
  DeleteUser: function (userId) {
    var room = GetRoomOfUser(userId);
    userToRoom.delete(userId);
    roomToUser[room].pop(userId);
  }
};

var existingLobbies = []
var userToRoom = {};
var roomToUser = {};