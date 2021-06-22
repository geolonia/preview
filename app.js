const getStyle = () => {
  const defaultStyle = "geolonia/basic"
  const styleUrl = 'https://raw.githubusercontent.com/%s/master/style.json'

  let style

  const styleIdentifier = new URLSearchParams(location.search).get('style')
  if (styleIdentifier) {
    if (styleIdentifier.match(/^https:\/\//)) {
      style = styleIdentifier
    } else {
      const stylePath = styleIdentifier.split( /\// )
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

map.on('load', () => {
  const dumpFeature = event => {
    const features = map.queryRenderedFeatures(event.point)
    console.log(features)
    const jsonContainer = document.getElementById('json')
    jsonContainer.innerText = JSON.stringify(features, null, '  ')
  }

  const mouseEnter = () => {
    map.getCanvas().style.cursor = 'pointer'
  }

  const mouseLeave = () => {
    map.getCanvas().style.cursor = ''
  }

  map.getStyle().layers.forEach( (item) => {
    map.on('click', item.id, dumpFeature)
    map.on('mouseenter', item.id, mouseEnter)
    map.on('mouseleave', item.id, mouseLeave)
  })
})
