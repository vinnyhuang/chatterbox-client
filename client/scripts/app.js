// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/messages',
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
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  }
};

app.fetch();