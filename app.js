(() => {

  const getStyle = () => {
    const defaultStyle = "geolonia/basic"
    const styleUrl = 'https://raw.githubusercontent.com/%s/master/style.json'

    let style

    if (location.hash) {
      if (location.hash.match(/^#https:\/\//)) {
        style = location.hash.replace( /^#/, '' )
      } else {
        const stylePath = location.hash.replace( /^#/, '' ).split( /\// )
        style = styleUrl.replace( '%s', stylePath.join( '/' ) )
      }
    } else {
      style = styleUrl.replace( '%s', defaultStyle )
    }

    return style
  }

  const style = getStyle()

  const e = document.getElementById( 'map' )
  e.dataset.style = style

  const map = new geolonia.Map( document.getElementById( 'map' ) );

  window.addEventListener('hashchange', () => {
    const style = getStyle()
    map.setStyle(style)
  })
})()
