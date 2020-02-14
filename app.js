(function(){
  var style = "geolonia/basic"

  if (location.hash) {
    var stylePath = location.hash.replace( /^#/, '' ).split( /\// )

    var styleUrl = 'https://raw.githubusercontent.com/%s/master/style.json'
    style = styleUrl.replace( '%s', stylePath.join( '/' ) )
  }

  var e = document.getElementById( 'map' )
  e.dataset.style = style

  var map = new geolonia.Map( document.getElementById( 'map' ) );
})()
