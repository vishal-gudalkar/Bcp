export default {
  oidc: {
    clientId: '0oa3ppungpyjoEJ1r417',
    issuer: 'https://test-bcp-sekurit.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    //scope: 'openid profile groups',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },  
};