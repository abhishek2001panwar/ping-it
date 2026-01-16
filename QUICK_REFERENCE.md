# 📋 Quick Reference - Ping It PWA

## 🚀 Quick Start (30 seconds)

```bash
npm install && npm run dev
```

Open: **http://localhost:3000**

## 🎯 Core Concepts

### Context Types
- 🏠 **Home** - At saved location
- 📍 **Outside** - Away from home
- 🌅 **Morning** - 5 AM - 12 PM
- 🌆 **Evening** - 5 PM - 10 PM
- 🌙 **Night** - 9 PM - 6 AM

### Key Features
- ✅ One-time reminders
- ✅ Context-based triggers
- ✅ Auto-cleanup
- ✅ Local storage only
- ✅ No login required

## 📁 File Structure (Important Files)

```
📱 Pages
  app/page.tsx          → Home dashboard
  app/reminders/        → List reminders
  app/settings/         → App settings

🧠 Logic
  lib/storage.ts        → Data management
  lib/context.ts        → Context detection
  lib/notifications.ts  → Push notifications
  lib/geolocation.ts    → Location services

🎨 Components
  components/CreateReminderModal.tsx
  components/ReminderCard.tsx
  components/ContextSelector.tsx
  components/ThemeToggle.tsx

⚙️ Config
  public/manifest.json  → PWA config
  public/sw.js         → Service worker
```

## 🎨 Customization Quick Guide

### Change App Name
```json
// public/manifest.json
{
  "name": "Your App Name",
  "short_name": "YourApp"
}
```

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your description",
};
```

### Change Theme Color
```json
// public/manifest.json
{
  "theme_color": "#YOUR_COLOR",
  "background_color": "#YOUR_COLOR"
}
```

### Change Check Interval
```typescript
// contexts/ReminderContext.tsx
// Line ~57: Change 2 * 60 * 1000 (2 minutes) to desired interval
const interval = setInterval(checkReminders, 5 * 60 * 1000); // 5 minutes
```

### Add New Context Type
```typescript
// 1. lib/types.ts
export type ContextType = 'home' | 'outside' | 'night' | 'morning' | 'evening' | 'afternoon';

// 2. components/ContextSelector.tsx - Add to contexts array
{
  value: 'afternoon',
  label: 'Afternoon',
  icon: <Sun className="w-6 h-6" />,
  description: '12 PM - 5 PM',
}

// 3. lib/context.ts - Add detection logic
if (currentHour >= 12 && currentHour < 17) {
  contexts.push('afternoon');
}
```

## 🔧 Common Tasks

### Run Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Test PWA Features
1. Open DevTools (F12)
2. Application tab
3. Check:
   - Manifest
   - Service Worker
   - Storage → LocalStorage

### Enable Notifications
```javascript
// In browser console (for testing)
Notification.requestPermission().then(console.log);
```

### Clear All Data
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## 🐛 Quick Troubleshooting

### Notifications Not Working
```
✅ Check: Browser permissions
✅ Check: HTTPS or localhost
✅ Check: Service Worker registered
✅ Try: Incognito mode
```

### Location Not Detected
```
✅ Enable: Browser location permission
✅ Set: Home location in Settings
✅ Check: Device GPS is on
✅ Wait: May take 10-30 seconds
```

### PWA Not Installing
```
✅ Use: HTTPS (Vercel provides this)
✅ Check: manifest.json is valid
✅ Clear: Browser cache
✅ Try: Different browser
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📱 Test on Mobile

### Android (Chrome)
```
1. Open app URL
2. Tap "Add to Home Screen"
3. Or: Menu → Install App
```

### iOS (Safari)
```
1. Open app URL
2. Share button
3. Add to Home Screen
```

## 🎯 Usage Examples

```typescript
// Example 1: Morning reminder at home
{
  title: "Take vitamin",
  context: "morning",
  timeConstraint: {
    startTime: "08:00",
    endTime: "10:00"
  }
}

// Example 2: When leaving home
{
  title: "Lock door",
  context: "outside"
}

// Example 3: Night reminder
{
  title: "Charge phone",
  context: "night",
  timeConstraint: {
    startTime: "22:00"
  }
}
```

## 🎨 Theme Colors Used

```
Primary: #3b82f6 (blue-600)
Secondary: #8b5cf6 (purple-600)
Success: #10b981 (green-600)
Danger: #ef4444 (red-600)
Gray: #6b7280 (gray-600)
```

## 📊 Key Metrics

```
Bundle Size: ~200KB (gzipped)
First Paint: < 1s
Interactive: < 2s
Lighthouse: 90+ expected
```

## 🔗 Important URLs

```
Dev Server:  http://localhost:3000
Production:  https://your-app.vercel.app
Vercel:      https://vercel.com
GitHub:      Your repository URL
```

## 📞 Quick Help

### Check Errors
```bash
# Terminal
npm run build

# Browser Console
F12 → Console tab
```

### View LocalStorage
```javascript
// Browser Console
console.log(localStorage);
console.log(JSON.parse(localStorage.getItem('ping-it-reminders')));
```

### Test Notification
```javascript
// Browser Console
if (Notification.permission === 'granted') {
  new Notification('Test', { body: 'This is a test!' });
}
```

## 🎓 Key Concepts to Remember

1. **Context Detection** runs every 2 minutes
2. **Reminders auto-delete** after triggering
3. **All data is local** (LocalStorage)
4. **Location required** for home/outside contexts
5. **Notifications required** for alerts
6. **HTTPS required** for PWA (or localhost)

## ⚡ Performance Tips

- Keep reminders list reasonable (< 50)
- Use time constraints to reduce checks
- Clear old reminders manually if needed
- Test on actual mobile device
- Monitor battery usage

## 🎯 Best Practices

✅ Set home location first
✅ Enable notifications
✅ Choose correct context
✅ Add time constraints when needed
✅ Delete completed reminders manually
✅ Test on mobile before sharing

## 📚 Learn More

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind: https://tailwindcss.com/docs
- PWA: https://web.dev/progressive-web-apps/

---

**This is your go-to reference for quick answers! 🚀**

Bookmark this file for instant access to:
- Commands
- File locations  
- Common fixes
- Usage examples
- Customization tips

**Happy coding! 📌**
