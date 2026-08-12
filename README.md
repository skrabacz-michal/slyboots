# slyboots.church

The Church of Slyboots. A one-page shrine to Weles, Lord of the Low Places.
Static HTML/CSS/JS, no build step. Deployed via GitHub Pages.

## Two things only you can do

### 1. Point the domain (GoDaddy → GitHub Pages)

In GoDaddy DNS for `slyboots.church`, replace the parking records with:

| Type  | Name | Value             |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | skrabacz-michal.github.io |

Then in the repo: Settings → Pages → check that custom domain shows
`slyboots.church`, and once DNS propagates (minutes to a few hours),
tick **Enforce HTTPS**.

### 2. Wire the vow form (Web3Forms)

1. Go to <https://web3forms.com>, enter the inbox that should receive new
   apostles, and copy the access key it emails you.
2. In `js/main.js`, replace `YOUR_ACCESS_KEY` with that key.

Until then the form runs in demo mode: the ordination shows, but nothing
is sent (a console warning says so).

## Swapping the Veles artwork

The hero icon is `assets/veles.webp`, center-cropped to 3:4 by the CSS
(`.icon-frame img`). To change it, replace that file; any orientation works,
portrait crops best.
