# 🌿 Meera's Henna Art – Website

A complete, responsive multi-page website for **Meera's Henna Art** built with pure HTML, CSS, and Vanilla JavaScript. No frameworks required.

---

## 📁 Folder Structure

```
meeras-henna/
├── pages/
│   ├── index.html           ← Main website (Home, Classes, Registration, Payment)
│   ├── admin-login.html     ← Admin login page
│   └── admin-dashboard.html ← Admin dashboard
├── css/
│   └── style.css            ← All styles (warm henna theme)
├── js/
│   └── app.js               ← All JavaScript logic
└── README.md                ← This file
```

---

## 🚀 Setup Instructions

### 1. How to Open the Project

**Option A – Open directly in browser (recommended for local use):**
1. Download or unzip the project folder
2. Open `pages/index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. No server setup needed — everything runs from the browser using localStorage

**Option B – Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click `pages/index.html` → "Open with Live Server"

---

### 2. Data Storage

This project uses **browser localStorage** (no backend database required).

| Key | Description |
|---|---|
| `mh_classes` | Array of class objects (auto-seeded with 2 default classes) |
| `mh_registrations` | Array of all student registrations |
| `mh_selected_class` | Currently selected class (temp, for registration flow) |
| `mh_registration` | Current registration data (temp, before payment) |
| `mh_admin_auth` | Admin session flag (`'1'` when logged in) |

**Data is stored in the browser.** To clear all data, open DevTools → Application → Local Storage → Clear All.

---

### 3. How Admin Login Works

| Field | Value |
|---|---|
| **Email** | `admin@meerahenna.com` |
| **Password** | `Meera@2024` |

1. Open `pages/admin-login.html`
2. Enter the credentials above
3. You will be redirected to `admin-dashboard.html`
4. The session persists until you click **Logout**

To change the credentials, edit this section in `js/app.js`:
```javascript
const ADMIN_CREDENTIALS = { email: "admin@meerahenna.com", password: "Meera@2024" };
```

---

### 4. How to Add Classes from the Dashboard

1. Log in to the Admin Dashboard
2. Click **Classes Management** in the sidebar
3. Click **+ Add Class**
4. Fill in:
   - Class Name
   - Monthly Fee
   - Add chapters with the **+ Add Chapter** button
   - Add lessons inside each chapter
5. Click **Save Class**

The class will immediately appear on the public Classes page.

To **edit** a class: click the ✏️ button.  
To **delete** a class: click the 🗑️ button.

---

### 5. How Student Registrations Are Stored

The student registration flow works as follows:

1. User selects a class → saved to `mh_selected_class`
2. User fills the registration form → saved to `mh_registration`
3. User pays and clicks **"I've Paid"** → registration is saved to `mh_registrations` array with `paymentStatus: 'pending'`
4. WhatsApp opens automatically with pre-filled payment confirmation

**Admin can then:**
- View all registrations in the **Student Registrations** table
- Click ✅ to mark a payment as **Verified**
- Click 🗑️ to delete a registration

---

### 6. UPI Payment Configuration

To change the UPI number, edit `js/app.js`:
```javascript
const UPI_NUMBER = "9080760373";
```

To change the WhatsApp confirmation number:
```javascript
const WHATSAPP_NUMBER = "919514301061"; // Country code + number, no +
```

---

### 7. How to Deploy

**Option A – GitHub Pages (free):**
1. Push the project to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, `/root` folder
3. Your site will be live at `https://yourusername.github.io/repo-name/pages/`

**Option B – Netlify (free, drag & drop):**
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `meeras-henna` folder onto the Netlify dashboard
3. Your site goes live instantly

**Option C – Any static hosting:**
Upload all files maintaining the folder structure to any static web host (Vercel, Hostinger, cPanel file manager, etc.)

---

## 🎨 Theme Customization

All colors are CSS variables in `css/style.css`:

```css
:root {
  --henna-dark:   #3B1F0A;   /* Dark brown */
  --henna-brown:  #7B3F1A;   /* Medium brown */
  --henna-warm:   #C4682A;   /* Warm orange-brown */
  --henna-amber:  #E8943A;   /* Amber accent */
  --henna-gold:   #F2C27A;   /* Gold highlight */
  --henna-cream:  #FDF6EC;   /* Cream background */
}
```

---

## 📱 Features

- ✅ Fully responsive (mobile-first)
- ✅ Smooth single-page navigation
- ✅ Class chapters expand/collapse
- ✅ Protected Payment page (registration required)
- ✅ UPI deep link integration
- ✅ WhatsApp pre-filled message confirmation
- ✅ Admin login with session management
- ✅ Admin: Add / Edit / Delete classes
- ✅ Admin: View / Verify / Delete student registrations
- ✅ Dashboard stats overview
- ✅ All data persisted in localStorage
- ✅ No external dependencies (no frameworks, no libraries)

---

## 📞 Contact

For support or customization, contact via the website footer.

🌿 *Meera's Henna Art – Creating beauty, one design at a time.*
