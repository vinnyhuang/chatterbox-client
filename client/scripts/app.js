// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/messages',
  myUser: undefined,
  users: {},
  currentChatRoom: 'chatroom',
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
          app.addRoom(data.results[i].roomname);
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
    var $msg = `<div class="message"><h3 class="username">room:${message.roomname} - ${message.username}:</h3><p class="text">${message.text}</p></div>`;
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
    $('#roomSelect').prepend($room);
  },

  addFriend(username) {
    this.users[username] = true;
  },

  handleSubmit() {

    var message = {
      username: app.myUser,
      text: $('#message').val(),
      roomname: app.currentChatRoom
    };

    app.send(message);
    app.fetch();
  }
};

$(document).ready(() => {
  app.fetch();
  setInterval(() => { app.fetch(); }, 3000);
  app.myUser = window.location.search.match(/username=(.+)/)[1];

  $('form').submit((event) => { 
    app.handleSubmit();
    event.preventDefault();
  });

  $('#roomSelect').change(function(event) {

    //create new room
    if ($(this).val() === 'create new room') {
      var $roomNameInput = `<form id="createNewRoom">
                              <input class='roomNameInput' type='text'>
                              <input type="submit" name="submit" value="create new room">
                            </form>`
      $('form').first().after($roomNameInput);

      $('#createNewRoom').submit((event) => {
        var chatroom = $('.roomNameInput').val()
        app.addRoom(chatroom);
        app.currentChatRoom = chatroom;
        event.preventDefault();
      });

    //or switch current room to selection
    } else {
      app.currentChatRoom = $(this).val();
    }

  });


});

