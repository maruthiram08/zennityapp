# Zennity Admin Portal

A comprehensive web-based admin portal for managing credit card metadata with customizable attributes and dynamic data input.

## Features

### 🎯 Cards Metadata Management
- **CRUD Operations**: Create, Read, Update, and Delete credit card entries
- **Dynamic Form Fields**: Forms automatically adapt based on custom attributes
- **Search & Filter**: Quickly find cards by name, bank, or type
- **Status Management**: Toggle cards between active/inactive states

### ⚙️ Attribute Schema Management
- **Custom Attributes**: Define your own card attributes with various data types
- **Multiple Data Types**:
  - Text, Number, Boolean, Date
  - Select (single choice), Multiselect (multiple choices)
  - Textarea, Email, URL, Phone
  - Currency, Percentage
- **Validation Rules**: Set min/max values, length constraints, regex patterns
- **Grouping**: Organize attributes into logical groups
- **Required/Optional**: Mark fields as mandatory or optional

### 📊 Dashboard
- Quick overview of total and active cards
- Attribute schema statistics
- Quick action links

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod
- **Backend**: Firebase (Firestore + Auth + Storage)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure Firebase**:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase credentials from Firebase Console

3. **Start development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
```

## Firebase Setup

### 1. Create Firestore Database

Go to Firebase Console → Firestore Database → Create Database

### 2. Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Attributes collection
    match /attributes/{attributeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Cards collection
    match /cards/{cardId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Admin users
    match /admins/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;
    }
  }
}
```

### 3. Enable Authentication

- Go to Firebase Console → Authentication → Sign-in method
- Enable Email/Password provider
- Create admin users manually

## Project Structure

```
zennity-admin/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── Modal.tsx
│   │   └── layout/
│   │       └── Layout.tsx    # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── cards/
│   │   │   ├── CardsPage.tsx
│   │   │   └── CardForm.tsx
│   │   └── attributes/
│   │       ├── AttributesPage.tsx
│   │       └── AttributeForm.tsx
│   ├── models/
│   │   ├── Card.ts           # Card data model
│   │   └── Attribute.ts      # Attribute schema model
│   ├── services/
│   │   ├── cardService.ts    # Card CRUD operations
│   │   └── attributeService.ts # Attribute CRUD operations
│   ├── firebase/
│   │   └── config.ts         # Firebase configuration
│   └── App.tsx               # Main app with routing
├── .env                      # Environment variables (not in git)
├── .env.example              # Example env file
└── package.json
```

## Usage Guide

### Creating Custom Attributes

1. Navigate to **Attributes** page
2. Click **Create Attribute**
3. Fill in the form:
   - **Field Name**: Internal name (e.g., `rewards_multiplier`)
   - **Display Name**: User-friendly label (e.g., "Rewards Multiplier")
   - **Data Type**: Choose from 12 data types
   - **Validation**: Set required, min/max, patterns
   - **Options**: For select/multiselect, add choices
4. Click **Create Attribute**

### Managing Cards

1. Navigate to **Cards** page
2. Click **Add Card**
3. Fill in basic information:
   - Card name, bank, tier, network
   - Annual fee, credit limit, rewards rate
4. Fill in custom attribute fields (if any)
5. Click **Create Card**

### Dynamic Form Example

Once you create attributes like:
- "Cashback Rate" (Percentage)
- "International Fee" (Currency)
- "Partner Airlines" (Multiselect)

The card form will automatically include these fields with appropriate input types and validation!

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint + TypeScript ESLint
- Functional components with hooks
- Tailwind CSS for styling

## Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Or deploy to any static hosting service (Vercel, Netlify, etc.)

## License

MIT License - feel free to use this for your projects!

## Support

For issues or questions, please open an issue in the repository.
