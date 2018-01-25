(function() {
  $('.card-img-top').each( function() {
    var image = $(this);
    var album = $(this).attr('alt');
    // console.log(album);

    $.getJSON(`https://pixabay.com/api/?key=7820553-2db0914dedbbf0a01e34371c2&q=${album}&image_type=photo&pretty=false&per_page=3&orientation=horizontal`)
      .done(function( data ) {
        console.log(data.hits[0].webformatURL);
        image.attr('src', data.hits[0].webformatURL);

        $.each( data, function( i, item ) {
          // console.log(item["2"]);
          // image.attr('src', 'https://picsum.photos/500/500/?random');
          // $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
          if ( i === 3 ) {
            return false;
          }
        });
      });
  });

  var counter = 0;
  $('[scope=row]').each( function(val) {
    console.log(val)
    $(this).html(val + 1)
    // console.log($(this).text() + 1);
  })

})();