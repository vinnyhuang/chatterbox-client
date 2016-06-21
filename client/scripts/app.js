// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/messages',
  myUser: undefined,
  users: {},
  init() {},
  send(message) {
    /*var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };*/
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch() {
    $.ajax({
      url: this.server,
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Message fetched', data);
        app.clearMessages();
        for (var i = data.results.length - 1; i >= 0; i--) {
          app.addMessage(data.results[i]);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  },

  clearMessages() {
    $('#chats').children().remove();
  },

  addMessage(message) {
    var $msg = `<div class="message"><h3 class="username">${message.username}:</h3><p class="text">${message.text}</p></div>`;
    $('#chats').prepend($msg);
    if (this.users[message.username] === undefined) {
      this.users[message.username] = false;
    }
    $('#chats').children().first().click((event) => {
      this.addFriend(message.username);
    });
  },

  addRoom(roomName) {
    var $room = `<option>${roomName}</option>`;
    $('#roomSelect').append($room);
  },

  addFriend(username) {
    this.users[username] = true;
  },

  handleSubmit() {
    //event.preventDefault();
    var message = {
      username: app.myUser,
      text: $('#message').val(),
      roomname: 'chatroom'
    };
    console.log("here");
    //console.log($('#userInput'));
    app.send(message);
    app.fetch();
  }
};

$(document).ready( () => {
  app.fetch();
  app.myUser = window.location.search.match(/username=(.+)/)[1];
  $('form').submit((event) => { 
    app.handleSubmit();
    event.preventDefault();
  });
});

