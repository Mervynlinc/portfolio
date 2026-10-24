# Namanya Mervyn portfolio

Next.js App Router with Tailwind CSS v4. The contact form sends through Resend and displays a toast with the result. It limits each client IP to five submissions per 15-minute window in each server process. Configure RESEND_API_KEY and RESEND_FROM_EMAIL in the server environment; the sender address must be allowed by your Resend account. The contact form sends to Namanya's email address and uses the visitor's address as the reply-to address.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. For a production build, run `npm run build` and then `npm start`.

The Julius Caesar GLB and portrait artwork are in `public/`. The 3D viewer is loaded from Google's hosted `<model-viewer>` script. The Resend API key stays on the server and is never sent to the browser.

## GitHub data

The featured project cards load descriptions, primary languages, and star counts for the curated repositories from GitHub's public REST API. Results are cached for one hour. The cards keep their local fallback details if GitHub is unavailable.

The contribution card shows a daily heatmap for the past year, with current streak and this year's contribution total. It uses public profile data without a token; set `GITHUB_TOKEN` to include contributions GitHub only exposes to an authenticated account. The token is used only by the server route in `app/api/github/route.js`; do not add it to client-side code or commit `.env.local`. Contribution data is cached for one hour.
