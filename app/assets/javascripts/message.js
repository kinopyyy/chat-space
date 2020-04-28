$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="main_bar__chat__top_items">
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
      `<div class="main_bar__chat__top_items">
        <div class="main_bar__chat__top_items__top">
          <div class="main_bar__chat__top_items__top__nam">
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
});