# Remedy Roofing static site rebuild

This folder is a static rebuild of https://www.remedyroofingky.com/ suitable for GitHub Pages or another static host.

## Pages included

- `index.html`
- `roofing.html`
- `roofingrepairs.html`
- `siding.html`
- `gutters.html`
- `repairs.html`
- `stormdamage.html`
- `atticventingrepairs.html`
- `gallery.html`

## Deploying on GitHub Pages

1. Create a new GitHub repository for the site.
2. Upload the contents of this folder, not the parent workspace.
3. In GitHub, open Settings → Pages.
4. Choose Deploy from a branch, then select the branch and `/root`.
5. If moving the existing domain, add a `CNAME` file containing `www.remedyroofingky.com`, then update DNS after the GitHub Pages URL is working.

## Contact form note

The old site posts to `contact.php`, which will not run on GitHub Pages. I replaced it with a static-friendly mailto handler using `remedyroofingky@gmail.com`. For a more polished production setup, swap this for Formspree, Basin, Netlify Forms, or another form service.
