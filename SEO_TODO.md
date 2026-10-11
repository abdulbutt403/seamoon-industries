# SEO content to confirm

Please supply or confirm the following before publishing the SEO updates:

- **Hosting dashboard routing:** live responses identify Render, while this repository also contains Netlify redirect files. The repository changes prepare Netlify routing, but Render does not read those files. Confirm the connected host and configure it to publish `dist`, serve the generated route files, and return its `404.html` for unknown paths. Remove any catch-all rewrite that serves the homepage for unknown URLs.
- **One-hop domain redirect:** the live `http://www.seamoonind.com/` currently takes two redirects (HTTP to HTTPS, then `www` to the apex). Configure the active edge/hosting layer to send HTTP apex, HTTP `www`, and HTTPS `www` directly to `https://seamoonind.com` in one 301. The current domain-level rule set in `netlify.toml` only takes effect if Netlify is the active host.

- **Product lists by category:** owner-approved product names and catalogue references for each dental and surgical category, including the contents of procedure sets.
- **OEM and order FAQs:** minimum order quantities by product type, sample policy, production lead times, payment terms, order process, and shipping terms.
- **Certificates and registrations:** current certificate copies, certificate or registration numbers, validity dates, issuing bodies, and product or market scope for ISO 13485, ISO 9001:2015, CE Mark (EU MDR), and US FDA registration.
- **Industry affiliations:** current SIMAP and SCCI membership or affiliation details, if they should be described beyond their names.
- **WhatsApp contact:** confirm whether **+92 300 7107197** is the correct WhatsApp number. This is the number shown in the current Contact page; the former floating button used a different number. The visible Contact number is now used consistently in the site links.
- **Social profiles:** provide the official Instagram, Facebook, X/Twitter, and LinkedIn profile URLs if the company wants social icons restored. Generic platform homepages have been removed.
- **Catalogue PDF:** confirm whether the current Google Drive catalogue is the correct downloadable PDF for both dental and surgical catalogue buttons.
