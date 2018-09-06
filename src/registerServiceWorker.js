// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

function handleConnectionStatus (connectionStatus) {
  if (!connectionStatus) {
    var offlineToast = document.createElement('div')
    var offlineOverlay = document.createElement('div')
    offlineOverlay.id = 'offlineOverlay'
    offlineToast.id = 'offlineToast'

    offlineOverlay.style.height = '100%'
    offlineOverlay.style.width = '100%'
    offlineOverlay.style.position = 'fixed'
    offlineOverlay.style.left = '0'
    offlineOverlay.style.top = '0'
    offlineOverlay.style.zIndex = '99999'

    offlineToast.style.position = 'fixed'
    offlineToast.style.visibility = 'visible'
    offlineToast.style.bottom = '0'
    offlineToast.style.left = '0'
    offlineToast.style.zIndex = '99999'
    offlineToast.style.width = '100%'
    offlineToast.style.background = '#323232'
    offlineToast.style.color = '#fff'
    offlineToast.style.fontSize = '14px'
    offlineToast.style.height = '45px'
    offlineToast.style.transition = '0.3s'
    offlineToast.style.padding = '10px'
    offlineToast.style.textAlign = 'center'
    offlineToast.textContent = 'You seems to be offline, please check your internet connection.'
    document.body.style.filter = 'grayscale(0.9)'
    document.body.appendChild(offlineToast)
    document.body.appendChild(offlineOverlay)
  } else {
    document.body.style.filter = 'none'
    document.body.removeChild(document.getElementById('offlineToast'))
    document.body.removeChild(document.getElementById('offlineOverlay'))
  }
}

function showRefreshUI (registration) {
  // TODO: Display a toast or refresh UI.

  // This demo creates and injects a button.

  var button = document.createElement('button')
  button.style.position = 'absolute'
  button.style.top = '0'
  button.style.left = '0'
  button.style.zIndex = '9999'
  button.style.width = '100%'
  button.style.height = '54px'
  button.style.background = '#555'
  button.style.color = '#fff'
  button.style.fontSize = '13px'
  button.textContent = 'This site has updated. Please click here to see changes.'

  button.addEventListener('click', function () {
    window.location.reload()
  })

  document.body.appendChild(button)
}

// export default function LocalServiceWorkerRegister() {
//   const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
//   if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register(swPath).then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       });
//     });
//   }
// }

export default function register () {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      function updateOnlineStatus (event) {
        if (navigator.onLine) {
          // handle online status
          console.log('online')
          handleConnectionStatus(navigator.onLine)
        } else {
          // handle offline status
          console.log('offline')
          handleConnectionStatus(navigator.onLine)
        }
      }

      window.addEventListener('online', updateOnlineStatus)
      window.addEventListener('offline', updateOnlineStatus)

      if (!isLocalhost) {
        // Is not local host. Just register service worker
        registerValidSW(swUrl)
      } else {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl)
      }
    })
  }
}

function registerValidSW (swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.')
              showRefreshUI()
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.')
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker (swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export function unregister () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
