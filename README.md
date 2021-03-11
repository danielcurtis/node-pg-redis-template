# Node Template

NodeJS/Express server template using PostgreSQL, Redis, Google OAuth2.0, Typescript, and no opinions!

## Get Started

### Prequesites

- Clone the repo: `git clone https://github.com/danielcurtis/node-template.git`
- Install dependencies: `npm install`

- Set up Google OAuth by first creating a new project in [console.cloud.google.com](https://console.cloud.google.com/)
  1.  Find APIs & Services in the left-hand menu
  2.  Click on enable APIs & Services under the search bar at the top
  3.  Search and enable the Google+ API (not sure, but they might rename this in the future?)
  4.  Click on the Credentials in APIs & Services link
  5.  Click on the Create Credentials button and select OAuth Client ID
      1. You may get an error that you need to create a consent screen first. If so, configure the consent screen
      2. If you choose a public facing app for your consent screen, be sure to add your emails to test
      3. Once the consent screen is finished, go back and configure the OAuth Client ID
      4. Choose Web App as the application type
      5. Add `http://localhost:5000/auth/google/callback` as a callback URI
      6. Authorized JavaScript Origins can be left blank
      7. Copy the ID and secret and save them as GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the `/config/variables.env` file
