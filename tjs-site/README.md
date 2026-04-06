# TJ's Pizza Products — Website

## Quick Deploy (15 minutes)

### Step 1 — GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** button top right → **New repository**
3. Name it `tjs-pizza-website`
4. Set to **Public**
5. Click **Create repository**
6. On the next screen, click **uploading an existing file**
7. Drag in everything from this folder (`index.html`, `vercel.json`, `.gitignore`, `README.md`, and the `images/` folder)
8. Click **Commit changes**

---

### Step 2 — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Add New → Project**
3. Find `tjs-pizza-website` in the list → click **Import**
4. Leave all settings as default — Vercel detects static HTML automatically
5. Click **Deploy**
6. Done — you'll get a live URL like `tjs-pizza-website.vercel.app`

---

### Step 3 — Custom Domain (tjspizzaproducts.com.au)

In Vercel project settings → **Domains** → Add `tjspizzaproducts.com.au`

Then in GoDaddy DNS:
- Add a **CNAME** record: `www` → `cname.vercel-dns.com`
- Add an **A** record: `@` → `76.76.21.21`

Propagates within 1–24 hours.

---

### Adding Images

The `images/` folder is where all product photos live. If any images aren't showing:

1. Download photos directly from WordPress admin at tjspizzaproducts.com.au/wp-admin
2. Drop them into the `images/` folder
3. Commit and push — Vercel auto-deploys within 30 seconds

---

### Updating the Site

Any change to `index.html` → commit to GitHub → Vercel auto-deploys in ~30 seconds.

---

Built by All In Code · allincode.com.au
