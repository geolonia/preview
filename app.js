(function(){
  var defaultStyle = "geolonia/basic"

  var repoUrl = "https://github.com/%s"
  var styleUrl = 'https://raw.githubusercontent.com/%s/master/style.json'
  var style = ''

  if (location.hash) {
    var stylePath = location.hash.replace( /^#/, '' ).split( /\// )
    style = styleUrl.replace( '%s', stylePath.join( '/' ) )
    repo = repoUrl.replace( '%s', stylePath.join( '/' ) )
  } else {
    style = styleUrl.replace( '%s', defaultStyle )
    repo = repoUrl.replace( '%s', defaultStyle )
  }

  console.log(repo)

  var e = document.getElementById( 'map' )
  e.dataset.style = style

  var a = document.getElementById( 'forkme' )
  a.href = repo

  var map = new geolonia.Map( document.getElementById( 'map' ) );
})()
