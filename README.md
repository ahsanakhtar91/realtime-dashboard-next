
## 🛠️ My Dev Journey | Building a Real-Time Dashboard in Next.js (July 30 – August 3, 2025)

This is a full behind-the-scenes log of how I built this real-time dashboard app using **Next.js 15**, **Tailwind CSS**, **Typescript** along with the libs like **recharts**, **React Query** and **react-leaflet** to be evaluated by the team at **Bask Health**.

My idea was to create something that not only looks clean and performs well, but also shows my thought process and code decisions (like it shows the way I actually work on the production apps for the clients/companies I've worked for till now).

This app is deployed to **Vercel** so all team members can easily access and evaluate it. I have also recorded a **Loom video** where I walk through the core functionality of the app, along with some highlights of the codebase.

- 🚀 **Live App URL**: **https://ahsan-bask-health.vercel.app**

- 📹 **Loom Walk‑through video**: *Coming up next...*

**I’ve tried to keep my commits meaningful, and any commit that starts with a `*` is where something significant happened. Here's how it all went down:**

## 🧱 1. Bootstrapping the Project (July 30, 2025)

- `Initial commit`
- Created a new `Next.js 15` project (**app directory structure**) with `TypeScript` and `Tailwind CSS`
  → Got the base up and running. Included Tailwind setup from the start for all of the styling needs.

- *Added `fetchDashboardData` hook as a data fetcher (returning Promise)*  
  → Started defining how the frontend will talk to the backend. Made it generic to be consumed later using *React Query*.

- *Added complete `DashboardApiResponse`*  
  → Defined strong types by testing the API with *Postman* and looking at the response (I generated types very early from day 1 because I wanted zero guesswork in the UI layer).

- *Then I took the start - I started by building the top level `Header` component first*.

## 🌙 2. UI Theme, Button Component, and Dark Mode (July 30–31, 2025)

- *Started Dark Mode implementation + created a custom `Button` component*  
  → Started theme support early (built the components by testing them on both light/dark themes). 
  → Built a Tailwind-based `Button` component that accepts both icon and label and renders properly based on props (with the intention that I will keep using the same component throughout the app and will keep adding props to make it adapt to every use-case).

- Added more buttons in the app using same `Button` component, added dark mode styling to the entire app: on the backgrounds, borders, texts on Buttons as well as on the full app background.

- *"Start/Pause auto-fetch" and "Refresh" buttons added*  
  → These controls will let users start/stop polling the data (refetch after 5 seconds interval), as well as manually *Refresh* the data.

- *CLIENT SIDE THEME HANDLING TOOK PLACE TILL THIS POINT ONLY. From here onwards, I moved the theme state to be stored on server-side.*

## 🌐 3. Server-Managed Themes + Icon Updates (August 1, 2025)

- *Persisted light/dark theme on the server via `toggleTheme` server action*  
  → Created `toggleTheme` server action to **persist theme state (light/dark) in cookies** on server + **Added random styling tokens** for dynamic style variations. `toggleTheme` actions toggles the theme value on server which then passes it onto client. All styling tokens live in server (in **layout.tsx**).

- *Switched to `Polaris` iconography set, removed the existing `lucide` which I was using earlier than this*  
  → Important cleanup to standardize the design language (as per the task requirements).

## 📦 4. Dashboard Layout & Widget System (August 1–2, 2025)

### 💡 Flexbox-Based Layout

- *Created a `Widget` component and rendered 3 fully responsive rows of widgets*  
  → Built the layout using **Flexbox** using `Tailwind` classes, made it fully responsive and it adapts nicely across laptop, tablet, and mobile (different arrangements of widgets to be seen for each size). Everything stacks vertically on mobile.

### 🛠️ Editable Layout (Backed by Server State)

- *Added Edit Mode Switch in the `Header` and Delete icons on each empty `Widgets` till this point*  
  → Enabled delete buttons for each widget (top-right), conditionally rendered when edit mode is on.

- *Implemented full delete/restore functionality on the **backend** via cookies*  
  → I liked this. Instead of handling layout state purely on client, I used `cookies` to persist deleted/restored widgets on the server-side. Layout adjusted properly on the fly.
  → Two new server actions were implemented and used for this use-case: `deleteWidget` and `restoreAllWidgets`

- *Integrated API calls into frontend with React Query; added polling (`refetchInterval` using React Query`)*.

- I then moved the data fetching code as API inside `/app/api/route.ts` (to be called on frontend).
  → By doing this I avoided CORS issue.
  → Another reason: Because I wanted to hide the `AUTH_TOKEN`  in the client/browser (kept it secret).
  → More cleanup + better separation of concerns between frontend and API proxy.

- *Implemented loading skeletons on widgets as per Figma design*  
  → UX polish. Each widget now gracefully loads in with a placeholders before data arrives.

- *Added toasts (`react-toastify`) for API errors + implemented proper disabled states for buttons using design tokens*  
  → Error Feedback with toasts + and disabled state (on `Button`) done properly.

- Properly handled and displayed the occasional **You hit the 5% chance of error :)** response coming from the API without breaking the UI.

---

## 📊 5. Widgets Rollout Begins (August 3, 2025)

Now that the layout + data fetching was solid, I started plugging in actual widget content.

- *Added a `MapView` component using `react-leaflet` for **Locations** widget*  
  → Quick integration. No problems rendering geo points.

- *Created reusable `ChartWidget` component using `recharts` lib*
 → I made this component such that it supports `bottom-to-top` and `left-to-right` chart layout via `direction` prop in the same component.
  → It will make the `ChartWidget` component flexible to render the BarChart in both **Orders** and **Top Products** widgets.

- *Rendered **Top Products** widget using the existing `ChartWidget`* 
  → First test of the reusable chart logic—success.

- *Updated `ChartWidget` to support AreaChart (used in **Total sales over time** widget)*  
  → Added `type` prop to support both `area-chart` along with `bar-chart`. Switched chart type based on this prop.

---

## 📄 6. Table + Summary Widgets (all done by EOD August 3, 2025)

- *Created a `TableWidget` with pagination, built entirely in Tailwind (no libs involved)*  
  → No libraries, just raw Tailwind. Table is fully responsive and supports pagination.

- *Finalized the `SummaryWidget` using data from `salesOverTime` and `userEngagement`*  
  → This was the last piece. Pulled from two data sources (`salesOverTime` and `userEngagement`) in the API response and rendered a summary of high-level stats.

## ✅ Final Thoughts

Here’s what I wanted to show with this project:

- **Detailed commit messages** that track thought process
- Clean Tailwind-based styling (no `.css` files or inline styling involved). 
- Responsive widgets layouts (adapts to laptop/tablet/mobile, even when you delete widgets).
- Polished dark/light theme management.
- Reusability (Build once, re-use forever).
- Real-time data via **polling** with **React Query**.
- **Server-side persistence** of *layout preferences* and *theme (light/dark)* via **cookies**.
- Deployed to Vercel so all team members may evaluate easily.

## 🚀 Possible Future Extensions 

I had one idea that's now in my wish-list (or you can say on my todo-list):

- **Drag & drop widget rearrangement**: 
	- With persistent layout saved to the server (just like it's being saved while deleting/restoring widgets). 
	- I did experiment with this for a while using libs like `react-grid-layout` and `@dnd-kit`, but honestly I lost motivation midway since I had to focus on the core functional requirements first.

## 👨‍💻 Created By

**Ahsan Akhtar** 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/m-ahsan-akhtar) [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/ahsanakhtar91) [![CV](https://img.shields.io/badge/CV-8A2BE2?logo=readdotcv)](https://drive.google.com/file/d/1WZWmlD3t8bML3HRjmkP0dUp8BZmStsPj/view)

- 🚀 **Live App URL**: **https://ahsan-bask-health.vercel.app**

- 📹 **Loom Walk‑through video**: *Coming up next...*