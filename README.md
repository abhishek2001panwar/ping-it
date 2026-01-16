# 📌 Ping It - Context-Aware Reminder PWA

A modern Progressive Web App (PWA) that provides **context-aware, one-time reminders** for daily tasks. Unlike traditional alarm apps, Ping It triggers reminders based on your **location and time context**, not just fixed schedules.

## ✨ Features

- **Context-Based Reminders**: Set reminders for home, outside, morning, evening, or night
- **Geolocation Detection**: Automatically detects when you're at home or away
- **Smart Notifications**: Browser push notifications at the right time and place
- **One-Time Reminders**: No recurring alarms - reminders auto-delete after triggering
- **PWA Installation**: Install as a native-like app on mobile devices
- **Dark/Light/System Theme**: Full theme support with smooth transitions
- **Offline Support**: Works without internet connection
- **Mobile-First Design**: Optimized for touch and mobile devices
- **Privacy-Focused**: All data stored locally, no server required

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Storage**: LocalStorage API
- **APIs**: Geolocation API, Notification API, Service Worker API
- **Deployment**: Vercel (recommended)

## 📱 Use Cases

1. **Bring Matchbox** - Reminds when at home in evening
2. **Buy Milk** - Triggers when you leave home
3. **Charge Phone** - Reminds at night before bed
4. **Take Medicine** - Morning reminder at home
5. **Carry ID Card** - Reminds when going outside
6. **Fill Water Bottle** - Morning at home
7. **Send Message** - Evening context reminder
8. **Switch Off Gas** - When leaving home
9. **Workout Reminder** - Evening one-time alert
10. **Carry Charger** - When going outside

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ installed
- Modern browser (Chrome, Edge, Safari, Firefox)

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
ping-it/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── reminders/page.tsx   # Reminders list
│   ├── settings/page.tsx    # Settings page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── BottomNav.tsx        # Navigation bar
│   ├── ContextSelector.tsx  # Context picker
│   ├── CreateReminderModal.tsx
│   ├── InstallPrompt.tsx    # PWA install banner
│   ├── ReminderCard.tsx
│   ├── ThemeToggle.tsx
│   └── PWAInstaller.tsx
├── contexts/                # React contexts
│   ├── ThemeContext.tsx     # Theme management
│   └── ReminderContext.tsx  # Reminder state
├── lib/                     # Core utilities
│   ├── types.ts             # TypeScript types
│   ├── storage.ts           # LocalStorage manager
│   ├── geolocation.ts       # Location services
│   ├── context.ts           # Context detection
│   ├── notifications.ts     # Notification handler
│   └── pwa.ts              # PWA utilities
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   ├── icon-192.svg
│   └── icon-512.svg
└── scripts/
    └── generate_icons.py    # Icon generator
```

## 🎨 Key Features Explained

### Context Detection

The app detects five contexts:

- **Home**: Based on saved GPS location (within configurable radius)
- **Outside**: When away from home location
- **Morning**: 5 AM - 12 PM
- **Evening**: 5 PM - 10 PM  
- **Night**: 9 PM - 6 AM

### Location Privacy

- Location data is **never sent to any server**
- Stored locally in browser LocalStorage
- Only used for context detection
- User can clear location anytime

### Notification System

- Requires browser permission (one-time)
- Checks reminders every 2 minutes
- Auto-marks reminders as triggered
- Vibration support on mobile devices

### PWA Installation

- Shows install prompt on first visit
- Installable on iOS, Android, desktop
- Works offline after installation
- Appears in app drawer/home screen

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Setup

No environment variables required - fully client-side!

## 📱 PWA Testing

### Test PWA locally:

1. Build production version: `npm run build`
2. Start server: `npm start`
3. Open in browser
4. Check DevTools > Application > Manifest
5. Test "Add to Home Screen"

### Requirements for PWA:

- ✅ HTTPS (localhost works for testing)
- ✅ Service Worker registered
- ✅ Web App Manifest
- ✅ Icons (192x192 and 512x512)
- ✅ Installable criteria met

## 🎯 Roadmap

- [ ] Convert SVG icons to PNG for better compatibility
- [ ] Add screenshot for PWA showcase
- [ ] Battery level integration for "low battery" context
- [ ] Voice input for creating reminders
- [ ] Multiple home locations support
- [ ] Reminder history and analytics
- [ ] Export/import reminders
- [ ] Widget support (when available in PWAs)

## 🐛 Troubleshooting

### Notifications not working?

- Check browser notification permissions
- Ensure site is served over HTTPS (or localhost)
- Service Worker must be registered
- Try in incognito mode to rule out extensions

### Location not detected?

- Enable browser location permission
- Check device location services are on
- Set home location in Settings first
- Indoor locations may be less accurate

### PWA not installing?

- Must be served over HTTPS
- Clear browser cache and retry
- Check browser console for errors
- Some browsers need multiple visits

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ for better daily task management

---

**Note**: This is a client-side only PWA. No backend, no database, no user authentication required. Perfect for privacy-conscious users!
