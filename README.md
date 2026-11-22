# BLDR website

The home page for [BLDR](https://github.com/otto-tries-to-build-stuff/bldr-workout-app), an open-source Android workout app. Live at **https://getbldr.vercel.app**.

The app's code lives in its own repository. This one only holds the website.

## What's here

| File | Page |
|---|---|
| `index.html` | Home |
| `features.html` | Features (`/features`) |
| `get.html` | Download and install steps (`/get`) |
| `faq.html` | Questions and what's new (`/faq`) |
| `404.html` | Page not found |
| `styles.css` | Styles shared by every page |
| `site.js` | Scroll effects shared by every page |
| `assets/` | Promo video, fonts, icons and the link-preview image |

It's a plain static site with no build step and no dependencies. Vercel publishes it automatically when changes are pushed to `main`.

## Preview locally

```
npx serve .
```

## When a new app version comes out

The download button always fetches the newest `BLDR.apk` from the app's GitHub releases, so it never needs changing. Update the version number by hand in:

- `get.html`: the download card ("Version 0.2 · Android 8.0 or later")
- the footer of every page ("BLDR · Version 0.2")
- `faq.html`: add a line to "What's new"
