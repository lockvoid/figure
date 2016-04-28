# Developing

Fork and clone the repository.

Next, [Sign up for a free Theron account](https://theron.db.com/signup), create
a new application, and then connect it to your hosted Postgres database
to receive the required Theron credentials.

Next, [Sign up for a free Sendgrid account](https://sendgrid.com/pricing), and
then generate a new API key to receive the required Sendgrid credentials.
You can skip this step if you don't want to send email notifications.

Next, in the cloned repository rename `.env.example` to `.env` and define the
environment variables:

- `DATABASE_URL` - your hosted Postgres database connection credentials.
- `FIGURE_URL` - a Figure application instance host required in the production environment.
- `JWT_SECRET` - a randomly generated secret token for the JWT authentication purposes.
- `SENDGRID_SECRET` - an API key from the Sendgrid dashboard for sending notification emails.
- `THERON_APP` - a name of Theron application your created before.
- `THERON_SECRET` - a secret key from the Theron application dashboard required in the production environment.

> Put `PGSSLMODE=require` into the `.env` file if your database
> [forces](https://github.com/tgriesser/knex/issues/852) SSL connection.

Next, install the NPM packages:

```
$ npm install
```

Next, install the JSPM packages:

```
$ (npm bin)/jspm install
```

Next, install the TypeScript typings:

```
$ (npm bin)/typings install
```

Next, run the database migrations:

```
$ (npm bin)/knex migrate:latest --knexfile db/config.js
```

Finally, build the application and go to `http://0.0.0.0:7070`:

```
$ (npm bin)/gulp
```

> Since global installs can become stale, and required versions can vary by
> project, we prefix these command invocations with `$(npm bin)`. You can drop
> this path prefix by defining a bash alias like alias `nbin='PATH=$(npm bin):$PATH'`,
> as detailed in this StackOverflow [answer](http://stackoverflow.com/questions/9679932/how-to-use-package-installed-locally-in-node-modules/15157360#15157360),
> and use it like this: `nbin gulp build`.
