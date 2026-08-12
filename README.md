# slyboots.church

A clean single-viewport page: one full-bleed looping background video with
edge and bottom fades, plus a subtle door in the bottom-right corner. The
door zooms you through the portal into a white room with a join form.
Static HTML/CSS/JS, no build step, deployed via GitHub Pages.

## The join form (Web3Forms)

Wired: submissions email the inbox behind the access key in `js/main.js`.
On localhost the form runs in demo mode (nothing is sent; a console warning
says so); production always submits.

Earlier versions (The Church of Slyboots, the full "Next Layer of
Intelligence" hero with text and nav) live in git history.

## DNS (Spaceship → GitHub Pages), still pending

In Spaceship's DNS settings for `slyboots.church` (Domain → DNS records,
using Spaceship's nameservers), remove the parking records and add:

| Type  | Name | Value             |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | skrabacz-michal.github.io |

Then in repo Settings → Pages, once DNS propagates, tick **Enforce HTTPS**.
