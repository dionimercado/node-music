(function() {
  $('.album-cover').each( function() {
    var image = $(this);
    var album = $(this).attr('alt');
    // console.log(album);

    // $.getJSON(`https://pixabay.com/api/?key=7820553-2db0914dedbbf0a01e34371c2&q=${album}&image_type=photo&pretty=false&per_page=3&orientation=horizontal`)
    $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&limit=1&api_key=4eb31b12a17ffea4b78d571a205b8d93&format=json`)
      .done(function( data ) {
        console.log(data.results.albummatches.album["0"]);
        if( data.results.albummatches.album["0"].image[3]["#text"] ) {
          image.attr('src', data.results.albummatches.album["0"].image[3]["#text"]);
        }

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


  $('.artist-cover').each( function() {
    var image = $(this);
    var artist = $(this).attr('alt');
    // console.log(album);

    // $.getJSON(`https://pixabay.com/api/?key=7820553-2db0914dedbbf0a01e34371c2&q=${album}&image_type=photo&pretty=false&per_page=3&orientation=horizontal`)
    $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=1&api_key=4eb31b12a17ffea4b78d571a205b8d93&format=json`)
      .done(function( data ) {
        // console.log(data);
        image.attr('src', data.results.artistmatches.artist["0"].image[3]["#text"]);

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
  
  const singleArtist = $('.biography').data('artist');
  $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${singleArtist}&api_key=4eb31b12a17ffea4b78d571a205b8d93&format=json`)
    .done(function( data ) {
      // console.log(data);
      if( data.artist ) {
        $('.biography').html(data.artist.bio.summary);
      }

  });

  const artistAlbums = [];
  
  $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${singleArtist}&limit=12&api_key=4eb31b12a17ffea4b78d571a205b8d93&format=json`, data => {
    // console.log(data);
    if( data.topalbums ) {
      $.each( data.topalbums.album, ( i, album ) => {
        artistAlbums.push(`
        <div class="col-4 col-md-2 m-0 p-0">
          <!--<div class="card mb-4 box-shadow">-->
            <img class="img-fluid" src="${album.image[3]["#text"]}" alt="Card image cap">
            <div class="card-body d-none">
              <h5>${album.name}</h5>
            </div>
          <!--</div>-->
        </div>
        `);
      });      
    }
  }).done(data => $('.artist-albums').html(artistAlbums) );

  
  
  const topArtists = [];
  
  $.getJSON(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=4eb31b12a17ffea4b78d571a205b8d93&format=json`, function(data) {

    // console.log(data.artists.artist);

    $.each( data.artists.artist, function( i, artist ) {
        console.log(artist);
        
        topArtists.push(`
        <div class="col-md-4">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="${artist.image[4]["#text"]}" alt="Card image cap">
            <div class="card-body">
              <h5>${artist.name}</h5>
            </div>
          </div>
        </div>
        `);
      });
  }).done(data => $('.top-artists').html(topArtists) );
  
  var albumPrice = 0;
  $('[scope=price]').each( function() {
    albumPrice += parseFloat($(this).text() * .8);
  });
  
  $('.buy-album span').html(Number(albumPrice).toFixed(2));

  $('[scope=row]').each( function(val) {
    // console.log(val)
    $(this).html(val + 1)
    // console.log($(this).text() + 1);
  })

})();