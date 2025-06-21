import { createQiscusApp, type QiscusAppConfig } from '../main'
import { useAppConfigStore } from '../stores/app-config'

// Example 1: Initialize with configuration
const appConfig: QiscusAppConfig = {
  userToken: 'your-user-token-here',
  appId: 'your-app-id-here',
  appVersion: '1.0.0'
}

// Create app with configuration
createQiscusApp('#app', 'your-app-id', appConfig)

// Example 2: Initialize without configuration (will use fallback)
createQiscusApp('#app', 'your-app-id')

// Example 3: Initialize with configuration after app creation

// You can also set configuration after app creation
const appConfigStore = useAppConfigStore()
appConfigStore.setConfig({
  userToken: 'new-user-token',
  appId: 'new-app-id',
  appVersion: '2.0.0'
})

// Example 4: Update individual values
appConfigStore.setUserToken('updated-token')
appConfigStore.setAppId('updated-app-id')
appConfigStore.setAppVersion('1.1.0')

// Example 5: Check if configuration is complete
if (appConfigStore.isConfigured()) {
  console.log('App is properly configured')
  console.log('Headers:', appConfigStore.getHeaders())
} else {
  console.log('App configuration is incomplete')
}

// Example 6: Clear configuration
appConfigStore.clearConfig()

/*
Usage in HTML/JavaScript:

<script type="module">
  import { createQiscusApp } from './dist/qiscus-vue-app.es.js'
  
  // Initialize with configuration
  const app = createQiscusApp('#app', 'your-app-id', {
    userToken: 'your-user-token',
    appId: 'your-app-id', 
    appVersion: '1.0.0'
  })
</script>

Or without configuration (will use fallback to localStorage):
<script type="module">
  import { createQiscusApp } from './dist/qiscus-vue-app.es.js'
  
  const app = createQiscusApp('#app', 'your-app-id')
</script>
*/ 