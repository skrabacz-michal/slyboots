# slyboots.church

"The Next Layer of Intelligence" — a single-viewport, full-bleed video hero,
recreated from the design handoff in `ds/` (see `ds/README.md` for the full
spec; layout is measured against a 1487x1058 reference canvas with a
height-locked unit system). Static HTML/CSS/JS, no build step, deployed via
GitHub Pages.

## DNS (GoDaddy → GitHub Pages), still pending

In GoDaddy DNS for `slyboots.church`, replace the parking records with:

| Type  | Name | Value             |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | skrabacz-michal.github.io |

Then in repo Settings → Pages, once DNS propagates, tick **Enforce HTTPS**.

## Notes

- The background video streams from the CloudFront URL specified in the
  handoff (mandatory asset, do not substitute).
- Partner logo icons are silhouette approximations, as flagged in the
  handoff; swap in the source SVGs if they become available.
- The `logoipsum` wordmarks render in heavy Manrope via the `IpsumMark`
  fallback `@font-face`; drop in the real font binary if it exists.
- The previous site (The Church of Slyboots) lives in git history.
