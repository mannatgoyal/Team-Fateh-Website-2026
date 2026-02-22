# Team Fateh 2026 - Deployment & Domain Guide

This document outlines the steps to deploy the new Next.js website and connect it to your existing Namecheap domain.

## 🚨 URGENT: Domain Renewal (Namecheap)
Since your domain expires tomorrow, you **must** renew it first before doing anything else. If it expires, DNS changes will fail, and the site will go offline.

1.  Log in to your [Namecheap Dashboard](https://www.namecheap.com/myaccount/login/).
2.  Go to **Domain List**.
3.  Find your domain (e.g., `teamfateh.com`) and click **Manage** or the shopping cart icon next to it to add it to your cart.
4.  Complete the checkout process to renew for at least 1 year.
5.  *Recommendation*: Turn on **Auto-Renew** to prevent this in the future.

---

## Deployment (Vercel)
The new website is built with Next.js, which is created by Vercel. Therefore, Vercel is the absolute best and easiest place to host it. It is free for open-source/non-profit student teams.

### Step 1: Push Code to GitHub
Ensure all your local changes (the entire `team-fateh-2026` folder) are committed and pushed to your GitHub repository.

### Step 2: Deploy on Vercel
1.  Create a free account or log in to [Vercel](https://vercel.com/login) using your GitHub account.
2.  Click **Add New...** -> **Project**.
3.  Import the GitHub repository containing your website code.
4.  **Important Configurations**:
    *   **Framework Preset**: Next.js (Should be auto-detected).
    *   **Root Directory**: Click "Edit" and change this to `team-fateh-2026` (since the Next.js app is inside this subfolder, not the root of the repo).
5.  Click **Deploy**.
6.  Wait 2-3 minutes. Vercel will build the site and give you a temporary URL (e.g., `team-fateh-2026.vercel.app`). Test this URL to ensure it works.

---

## Connecting Your Namecheap Domain

Once the site is live on Vercel, you need to point your Namecheap domain to Vercel's servers.

### Step 1: Add Domain to Vercel
1.  In your Vercel Project Dashboard, go to **Settings** -> **Domains**.
2.  Enter your custom domain (e.g., `teamfateh.com`) and click **Add**.
3.  Vercel will usually ask if you want to add the `www` version as well (e.g., `www.teamfateh.com`). Say **Yes** and set it to redirect to the base domain.
4.  Vercel will now show you the **DNS Records** you need to add to Namecheap (usually an `A` record and a `CNAME` record). Keep this window open.

### Step 2: Configure Namecheap DNS
1.  Go back to your [Namecheap Dashboard](https://www.namecheap.com/myaccount/login/).
2.  Go to **Domain List** -> Click **Manage** next to your domain.
3.  Go to the **Advanced DNS** tab.
4.  **Delete any existing A, CNAME, or URL Redirect records** that point to the old hosting.
5.  Click **Add New Record** and input the values Vercel gave you.

**Typical Vercel DNS Configuration:**

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Auto |
| **CNAME Record** | `www` | `cname.vercel-dns.com.` | Auto |

6.  Click the green checkmark to save each record.

### Step 3: Wait for Propagation
DNS changes can take anywhere from 5 minutes to 24 hours to propagate globally. Vercel will automatically provision a free SSL certificate (HTTPS) once the DNS resolves correctly. You can monitor the status back on the Vercel **Settings -> Domains** page.
