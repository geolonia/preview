(() => {

  const getStyle = () => {
    const defaultStyle = "geolonia/basic"

    const repoUrl = "https://github.com/%s"
    const styleUrl = 'https://raw.githubusercontent.com/%s/master/style.json'

    let url, repo

    if (location.hash) {
      const stylePath = location.hash.replace( /^#/, '' ).split( /\// )
      url = styleUrl.replace( '%s', stylePath.join( '/' ) )
      repo = repoUrl.replace( '%s', stylePath.join( '/' ) )
    } else {
      url = styleUrl.replace( '%s', defaultStyle )
      repo = repoUrl.replace( '%s', defaultStyle )
    }

    return {url: url, repo: repo}
  }

  const style = getStyle()

  const e = document.getElementById( 'map' )
  e.dataset.style = style.url

  const a = document.getElementById( 'forkme' )
  a.href = style.repo

  const map = new geolonia.Map( document.getElementById( 'map' ) );

  window.addEventListener('hashchange', () => {
    const style = getStyle()
    map.setStyle(style.url)
  })
})()
