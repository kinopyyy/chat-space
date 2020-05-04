$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="main_bar__chat__top_items" data-message-id=${message.id}>
          <div class="main_bar__chat__top_items__top">
            <div class="main_bar__chat__top_items__top__name">
              ${message.user_name}
            </div>
            <div class="main_bar__chat__top_items__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_bar__chat__top_items__message">
            <p class="main_bar__chat__top_items__message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="main_bar__chat__top_items" data-message-id=${message.id}>
        <div class="main_bar__chat__top_items__top">
          <div class="main_bar__chat__top_items__top__name">
            ${message.user_name}
          </div>
          <div class="main_bar__chat__top_items__top__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_bar__chat__top_items__message">
          <p class="main_bar__chat__top_items__message__content">
            ${message.content}
          </p>
        </div> 
      </div>`  
    return  html;
    };
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main_bar__chat').append(html);
        $('.main_bar__chat').animate({ scrollTop: $('.main_bar__chat')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function() {
          alert("メッセージ送信に失敗しました");
      })
  })

  var reloadMessages = function() {
    var last_message_id = $('.main_bar__chat__top_items:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.lenght !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_bar__chat').append(insertHTML);
        $('.main_bar__chat').animate({ scrollTop: $('.main_bar__chat')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});