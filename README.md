# slyboots.church

A clean single-viewport page: one full-bleed looping background video with
edge and bottom fades, nothing else. Static HTML/CSS/JS, no build step,
deployed via GitHub Pages.

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
