# Line Up

**English** · [Español](README.es.md)

<!-- portfolio:en -->
Jot down quick to-dos without signing in. Its mini mode opens a floating window that stays on top of your calls, so you can capture action items without leaving the conversation.
<!-- /portfolio:en -->

**Demo:** [line-up-reminder-app.vercel.app/](https://line-up-reminder-app.vercel.app//)

Line Up was built for a very specific moment: you're on a call, an *action item* comes up ("let Ana know about the CRM update"), and you need to write it down **right now**, without opening another app or creating an account. Type it, press Enter, and stay in the conversation.

![Mock](modern-browser-mockup.png)

## Features

- **One-step capture**: a single field; Enter saves.
- **Mini mode (Picture-in-Picture)**: a 260×240 floating window that stays on top of Meet, Zoom, or your editor. It opens straight into the capture view and has a button to see your to-do list and mark items as done. It follows the page's theme.
- **Light and dark theme**: respects your system preference and remembers the one you choose.
- **Filters and search**: All / Pending / Done, plus text search.
- **Inline editing**: edit a to-do in place (Enter saves, Esc cancels).
- **No backend, no accounts**: everything lives in `localStorage` and syncs across tabs.
- **Responsive**: on mobile, the capture field stays pinned to the bottom, within thumb's reach.
- **Accessible**: real buttons with `aria-label`, labels on every field, visible focus, and 44 px touch targets.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (CSS-based configuration with `@theme`, dark mode with `@custom-variant`)
- Heroicons
- ESLint 10 (flat config) with React Hooks rules
- [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture)

## How mini mode works

Press **Mini mode** in the header and the floating window opens. To close it, close it like any other window.

`usePictureInPicture` opens the window with `documentPictureInPicture.requestWindow()` and copies the page's stylesheets into it. Then `App` mounts the `MiniWidget` component inside that window with `createPortal`. Because the floating window is part of the same React tree, it shares state with the main tab: whatever you write on one side shows up instantly on the other, with no extra syncing.

The API is available in desktop Chrome and Edge (116+). In other browsers, the **Mini mode** button simply isn't shown.

## Structure

```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Page composition and mini mode portal
├── components/
│   ├── header/             # Logo, date, Mini mode button, and theme toggle
│   ├── quickCapture/       # Capture card and reusable CaptureInput
│   ├── todoCounter/        # Completed and pending cards
│   ├── filterTabs/         # All / Pending / Done
│   ├── todoSearch/
│   ├── todoList/
│   ├── todoItem/           # To-do with inline editing and CheckButton
│   ├── miniWidget/         # Floating window content
│   ├── icons/
│   └── footer/
├── hooks/
│   ├── useTodos.js         # State + localStorage + cross-tab sync
│   ├── useTheme.js         # Light / dark theme
│   └── usePictureInPicture.js
├── utils/date.js           # Dates in Spanish ("Hoy · 10:24")
└── css/App.css             # Tailwind: theme, brand colors, and dark mode
```

## Running the project

Requires Node.js 20.19 or later.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # sirve el build localmente
npm run lint
```

## Deployment

The project is hosted on Vercel. `vercel.json` uses the Vite preset: it runs `npm run build` and publishes `dist/`.

## Author

Built by **Génesis Guerrero** · [geneg.com.mx](https://geneg.com.mx) · [LinkedIn](https://www.linkedin.com/in/genesisd-guerrero/)
