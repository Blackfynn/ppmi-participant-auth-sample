<template>
    <div class="welcome">
        <h1>Welcome to the test</h1>
        <el-button 
            type="primary" 
            @click="handleLoginClick"
        >
            Click to Login
        </el-button>
    </div>
</template>

<script>
export default {
    methods: {
        async handleLoginClick() {
            // setup request parameters
            const domain = `DOMAIN`
            const client_id = `CLIENT_ID`
            const redirect_uri = 'REDIRECT_URI'

            // Create and store a random "state" value
            var state = this.generateRandomString()
            localStorage.setItem("pkce_state", state)

            // Create and store a new PKCE code_verifier (the plaintext random secret)
            var code_verifier = this.generateRandomString()
            localStorage.setItem("pkce_code_verifier", code_verifier)

            // Hash and base64-urlencode the secret to use as the challenge
            var code_challenge = await this.pkceChallengeFromVerifier(code_verifier)

            // Build the authorization URL
            var request_url = domain
                + "/oauth2/authorize"
                + "?response_type=code"
                + "&client_id="+encodeURIComponent(client_id)
                + "&state="+encodeURIComponent(state)
                + "&redirect_uri="+encodeURIComponent(redirect_uri)
                + "&code_challenge="+encodeURIComponent(code_challenge)
                + "&code_challenge_method=S256"
            
            // Redirect to the authorization server
            window.location = request_url;
        },

        // Generate a secure random string using the browser crypto functions
        generateRandomString() {
            var array = new Uint32Array(28)
            window.crypto.getRandomValues(array)
            return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('')
        },

        // Calculate the SHA256 hash of the input text. 
        // Returns a promise that resolves to an ArrayBuffer
        sha256(plain) {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        },

        // Base64-urlencodes the input string
        base64urlencode(str) {
            // Convert the ArrayBuffer to string using Uint8 array to convert to what btoa accepts.
            // btoa accepts chars only within ascii 0-255 and base64 encodes them.
            // Then convert the base64 encoded to base64url encoded
            //   (replace + with -, replace / with _, trim trailing =)
            return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
                .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        },

        // Return the base64-urlencoded sha256 hash for the PKCE challenge
        async pkceChallengeFromVerifier(v) {
            const hashed = await this.sha256(v)
                return this.base64urlencode(hashed)
        }
    }
}
</script>
