# Zennity - Mobile Credit Card Deals App

**Tagline:** "Never Miss a Deal"

A modern, mobile-first credit card deals application designed for iOS, targeting credit card enthusiasts in India.

## Overview

Zennity helps users discover, track, and maximize credit card rewards through an intuitive interface that emphasizes time-sensitive deals, progress tracking, and intelligent offer stacking.

## Brand Identity

### Colors
- **Primary Orange** (#FF6B35) - CTAs, badges, primary actions
- **Secondary Purple** (#5856D6) - Transfer bonuses, premium features
- **Success Green** (#34C759) - Completed tasks, positive status
- **Warning Orange** (#FF9500) - Expiring soon, attention needed
- **Alert Red** (#FF3B30) - Breaking news, urgent alerts
- **Background** (#FAFAFA) - Light gray
- **Card Background** (#FFFFFF) - Pure white
- **Text Primary** (#1A1A1A) - Almost black
- **Text Secondary** (#666666) - Medium gray
- **Text Tertiary** (#999999) - Light gray

### Typography
- **Primary Font:** SF Pro (iOS system font)
- **Headings:** Bold, 20-24px
- **Body:** Regular, 14-16px
- **Captions:** Regular, 12-13px
- **Small text:** Regular, 11px

## Design System

### UI Components
- **Cards:** 12px border radius, subtle shadows (0 2px 8px rgba(0,0,0,0.08))
- **Buttons:** 8px border radius, 10px vertical padding
- **Badges:** Pill-shaped, 20px height, color-coded by category
- **Spacing:** 4px, 8px, 12px, 15px, 20px, 25-30px (sections)

### Design Principles
- Modern, clean, card-based UI
- Generous white space
- Bottom tab navigation with 5 items
- iOS design guidelines compliance
- Focus on scannability and quick actions
- High contrast for accessibility (minimum 4.5:1 ratio)
- Comfortable tap targets (minimum 44x44pt)

## Screens

### Screen 1: Feed Screen (Home)
Browse the latest credit card deals with filtering options:
- Hot deals with countdown timers
- Transfer bonuses
- Welcome offers
- Filter chips: All, My Cards, Watching, Ending Soon

### Screen 2: Card Detail
Detailed view of individual credit cards:
- Gradient hero section with stats
- Active offers list
- Quick action buttons
- Spending tracking and reminders

### Screen 3: My Tracker
Track your progress on active deals:
- Visual progress bars for spending goals
- Transaction completion tracking
- Upcoming actions calendar
- Days remaining indicators

### Screen 4: Offers Browser
Explore all available offers:
- Category filtering (Spend, Transfer, Welcome)
- Featured stacking calculator
- Trending offers with complexity indicators
- Quick win highlights

### Screen 5: Stacking Calculator
Maximize returns through offer stacking:
- Purchase amount input
- Merchant category selection
- Step-by-step stacking recommendations
- Alternative options comparison
- Total savings calculation

### Screen 6: Cards Portfolio
Manage your credit card collection:
- Visual card representations
- Active offers count
- Fee due dates
- Quick navigation to card details

## Technical Details

### Phone Frame
- **Dimensions:** 393 x 852 pt (iPhone 14 Pro)
- **Safe Area:** 20px padding on sides
- **Status Bar:** 44px height
- **Bottom Navigation:** 70px height

### Bottom Navigation
Five main sections:
1. **Feed** (🏠) - Home screen with deals
2. **Cards** (💳) - Card portfolio
3. **Offers** (🏷️) - Offers browser
4. **Tracker** (✅) - Progress tracking
5. **Profile** (👤) - User profile

## Usage

Open `index.html` in a web browser to navigate between all screens. Each screen is a standalone HTML file linked from the index page.

### Files Structure
```
zennityapp/
├── index.html              # Main navigation page
├── styles.css              # Shared design system
├── screen1-feed.html       # Feed Screen
├── screen2-card-detail.html # Card Detail Screen
├── screen3-tracker.html    # My Tracker Screen
├── screen4-offers.html     # Offers Browser Screen
├── screen5-calculator.html # Stacking Calculator Screen
└── screen6-portfolio.html  # Cards Portfolio Screen
```

## Features

- ✅ Mobile-first responsive design
- ✅ Clean, modern card-based UI
- ✅ Time-sensitive deal indicators
- ✅ Progress tracking with visual bars
- ✅ Intelligent offer stacking calculator
- ✅ Category-based filtering
- ✅ Bottom tab navigation
- ✅ iOS native feel with SF Pro font
- ✅ Accessibility-compliant contrast ratios
- ✅ Touch-friendly tap targets

## Target Audience

Credit card enthusiasts in India who want to:
- Stay updated on the latest card offers
- Track spending goals and welcome bonuses
- Maximize rewards through strategic offer stacking
- Manage multiple credit cards efficiently
- Never miss time-sensitive deals

---

**Designed with ❤️ for credit card enthusiasts**
