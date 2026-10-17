# Merkeb Career Explorer

A polished, responsive Next.js career exploration app styled with the same warm editorial look as Addis Eats: cream backgrounds, dark typography, lime accents, rounded cards, and mobile-first layouts.

## Features
- Home page and searchable/filterable career directory
- 10 career guides with roles, skills, learning paths, industry context, salary/source notes, and common questions
- Dynamic career detail pages with static params
- Simulated registration, sign in, and sign out
- Private dashboard with saved careers, completed learning topics, weekly checklist, seven-day activity visualization, and reflection notes
- Weekly planner with four editable tasks and ISO-week tracking
- Browser-local persistence using `localStorage`
- Responsive styling, accessible form labels, loading states, empty states, and 404 page

## Brand assets
- `public/images/merkeb-sailboat.svg` is used as the Merkeb logo in the header and footer.
- `public/images/compass-rose.svg` is used as the main visual in the home-page hero.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP and open the `merkeb-career-app` folder in VS Code.
3. Open Terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000.

To test the personal workspace, choose **Get started**, create a demo account, then save a career, check off topics and weekly tasks, and revisit the dashboard.

## Demo account behavior and limitations
This is a frontend-only simulation. There is no real database, API backend, email verification, password reset, or server-side authentication. Demo accounts, the signed-in session, saved careers, tasks, and notes are stored in the current browser's `localStorage`; clearing site data or changing browsers can remove them. Passwords are stored in browser storage for demo purposes only, so **do not use a real or reused password**. The client-side route guard is for demonstrating UX, not production security. A real app must move authentication and authorization to a trusted server and store passwords as secure hashes.

## Career data
The source data is in `data/careers.json` and mirrored to `public/data/careers.json`. The dataset covers Ethiopia plus international reference data where supplied. Salary and employment outlook values are source-labeled and may be dated; check the referenced source and current local job advertisements before relying on a figure.

## Deploying
This project can be deployed to a Node.js host such as Render. Create a Web Service, connect the repository, set the build command to `npm install && npm run build`, and the start command to `npm start`. This demo can be hosted, but browser-local accounts and progress will remain on each visitor's own device; deployment does not add a database or real authentication.
