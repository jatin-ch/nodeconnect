$(function(){

  $('#search').keyup(function(){

    var search_term = $(this).val();

    $.ajax({
      method: 'POST',
      url: '/api/search',
      data: {
        search_term
      },
      dataType: 'json',
      success: function(json){
        var data = json.hits.hits.map(function(hit){
          return hit;
        });
        console.log(data);
        $('#searchResults').empty();
        for(var i = 0; i < data.length; i++){
          var html = "";
          html += '<div class="media" style="margin:10px">';
          html += '<div class="media-left">';
          html += '<img class="media-object img-thumbnail" style="width:60px" src="'+  data[i]._source.image  +'">';
          html += '</div>';
          html += '<div class="media-body">';
          html += '<p><a href="/story/'+  data[i]._id +'">' + data[i]._source.headline + '</a></p>';
          html += '</div>';
          html += '</div>';

          $('#searchResults').append(html);
        }
      },
      error: function(err){
        console.log(err);
      }
    });

  });


});
