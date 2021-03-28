# Node Template

A modern NodeJS/Express boilerplate using PostgreSQL, Redis, Google OAuth2.0, Typescript, and Docker!

- User is authenticated by Google OAuth2.0, creating a profile in PostgreSQL and Redis
- User can read, update, and delete ONLY their profile information
- An unauthorized user can access the system status, but not any profile information

## Get Started

### Perquisites

**System Requirements**

Using Docker:

- Docker Desktop
- Make

Using your system:

- PostgreSQL
- Node
- NPM
- Redis

**Set up Google OAuth by first creating a new project in [console.cloud.google.com](https://console.cloud.google.com/)**

1.  Find APIs & Services in the left-hand menu
2.  Click on enable APIs & Services under the search bar at the top
3.  Search and enable the Google+ API (not sure, but they might rename this in the future?)
4.  Click on the Credentials in APIs & Services link
5.  Click on the Create Credentials button and select OAuth Client ID
    1. You may get an error that you need to create a consent screen first. If so, configure the consent screen
    2. If you choose a public-facing app for your consent screen, be sure to add your emails to test
    3. Once the consent screen is finished, go back and configure the OAuth Client ID
    4. Choose Web App as the application type
    5. Add `http://localhost:5000/auth/google/callback` as a callback URI
    6. Authorized JavaScript Origins can be left blank
    7. Copy the ID and secret and save them as GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the `/config/variables.env` file

### Running Locally

## Contributing

Contributions are welcome and appreciated! However, new _features_ will not be accepted. The project is intentionally a very simple boilerplate. My criteria for accepting pull requests:

1. Does it make the project simpler/more readable?
2. Does it improve security?
3. Does it implement best practices?
4. Is the new code covered by tests?

Please explain why/how your code meets the criteria above in your pull request.

## License

MIT. Have fun!
