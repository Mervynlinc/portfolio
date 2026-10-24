# Namanya Mervyn portfolio

Next.js App Router portfolio with Tailwind CSS v4. Contact messages are sent directly through an SMTP server using Nodemailer. The project does not use an email API service. The form limits each client IP to five submissions per 15-minute window in each server process, validates input, and sets the visitor's address as the reply-to address.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set the SMTP values in `.env.local` before sending contact messages. `SMTP_FROM` must be an address your SMTP account is allowed to send from. `CONTACT_TO` defaults to `namanyamervyn@gmail.com`.

For port 587, set `SMTP_SECURE=false` and let the connection upgrade with STARTTLS. For port 465, set `SMTP_SECURE=true` for TLS from connection start. Keep SMTP credentials private and out of client-side code.

For a production build, run `npm run build` and then `npm start`.

## GitHub data

The featured project cards load descriptions, primary languages, and star counts for the curated repositories from GitHub's public REST API. Results are cached for one hour. The cards keep their local fallback details if GitHub is unavailable.

The contribution card shows a daily heatmap for the past year, with current streak and this year's contribution total. It uses public profile data without a token; set `GITHUB_TOKEN` to include contributions GitHub only exposes to an authenticated account. The token is used only by the server route in `app/api/github/route.js`; do not add it to client-side code or commit `.env.local`. Contribution data is cached for one hour.
