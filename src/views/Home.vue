<template>
  <article class="Home">
    <h1>Home</h1>
    <p v-if="!loading">
      {{ success ? 'Congratulations, you have logged in' : 'Invalid token. Please try to login again.' }}
    </p>
    <span v-else>loading...</span>
  </article>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      success: false
    }
  },
  created() {
    const domain = `DOMAIN`
    const client_id = `CLIENT_ID`

    var request_url = domain + "/oauth2/token"

    // get the code 
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    const state = urlParams.get('state')

    if (code) {
      // Verify state matches what we set at the beginning
      if(localStorage.getItem("pkce_state") != state) {
        console.error('Invalid state.')
        this.success = false
        this.loading = false
      } else {
        // Exchange the authorization code for an access token
        this.sendPostRequest(request_url, {
          grant_type: "authorization_code",
          code: code,
          client_id: client_id,
          redirect_uri: 'http://localhost:8080/home',
          code_verifier: localStorage.getItem("pkce_code_verifier")
        }, (request, responseData) => {
          console.log('request:', request)
          // Initialize your application now that you have an access token.
          // here we just print out grant details to the console. 
          console.log('%cGrant Details:', "color:#2052e3;font-family:sans-serif;font-size:3rem;-webkit-text-stroke: 1px black;font-weight:bold")
          console.log('%cid_token', 'color:#2052e3', responseData.id_token)
          console.log('%caccess_token', 'color:#2052e3', responseData.access_token)
          console.log('%crefresh_token', 'color:#2052e3', responseData.refresh_token)
          console.log('%cexpires_in', 'color:#2052e3', responseData.expires_in)
          this.success = true
          this.loading = false

          // Replace the history entry to remove the auth code from the browser address bar
          window.history.replaceState({}, null, "/")
        }, () => {
          // This could be an error response from the OAuth server, or an error because the 
          // request failed such as if the OAuth server doesn't allow CORS requests
          console.error('Invalid token.')
          this.success = false
          this.loading = false
        })
      }
    
      // Clean these up since we don't need them anymore
      localStorage.removeItem("pkce_state");
      localStorage.removeItem("pkce_code_verifier");
    }
  },
  methods: {
    // Make a POST request and parse the response as JSON
    sendPostRequest(url, params, success, error) {
      const request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onload = function() {
        let body = {};
        try {
          body = JSON.parse(request.response);
        } catch(e) {
          console.error(e)
        }

        if (request.status == 200) {
          success(request, body);
        } else {
          error(request, body);
        }
      }
      request.onerror = function() {
        error(request, {});
      }
      var body = Object.keys(params).map(key => key + '=' + params[key]).join('&');
      request.send(body);
    }
  }
}
</script>
