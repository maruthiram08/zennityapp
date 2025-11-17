# Offer Management Module

A comprehensive offer management system for the Zennity mobile app, allowing administrators to create, manage, and publish offers that flow to clients.

## Overview

The Offer Management Module enables you to:
- Create and manage offers with detailed information
- Add multiple partners (banks, hotels, airlines, etc.)
- Include multiple links (apply, terms, details)
- Set expiry dates and track offer lifecycle
- Verify and publish offers for client visibility
- Track engagement metrics (views, clicks, saves)

## Features

### 📝 Offer Management
- **Create Offers**: Add new offers with rich details
- **Edit Offers**: Update existing offers anytime
- **Delete Offers**: Remove offers permanently
- **Verification Workflow**: Pending → Verified → Published
- **Multi-Partner Support**: Associate multiple partners with each offer

### 🔍 Filtering & Search
- Filter by verification status (All, Verified, Pending)
- Filter by published status
- Search by title, description, partner name, or tags
- Real-time filtering with instant results

### 📊 Analytics
- View counts for each offer
- Click tracking for offer links
- Save counts to measure interest
- Dashboard with aggregate statistics

### 🎯 Client Integration
- Published offers automatically flow to client-facing screens
- Only verified and active offers are shown to clients
- Automatic expiry handling

## Module Structure

```
zennity-mobile/src/
├── models/
│   └── Offer.ts                      # TypeScript interfaces and enums
├── store/
│   └── useOffersStore.ts            # Zustand state management
├── services/
│   └── offersService.ts             # Firebase/API operations
├── components/
│   └── offer/
│       ├── OfferCard.tsx            # Offer display card
│       └── OfferForm.tsx            # Create/edit form
├── screens/
│   └── OffersManagementScreen.tsx   # Main management screen
├── navigation/
│   ├── types.ts                     # Navigation types
│   └── RootNavigator.tsx            # Stack navigator
└── utils/
    └── sampleOffers.ts              # Sample data for testing
```

## Data Model

### Offer Schema

```typescript
interface Offer {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;

  // Links
  links: OfferLink[];

  // Expiry
  expiryDate: Date;
  isActive: boolean;

  // Verification
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedBy?: string;
  verifiedAt?: Date;
  verificationNotes?: string;

  // Partners
  partners: Partner[];
  primaryPartner?: Partner;

  // Publishing
  isPublished: boolean;
  publishedAt?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags?: string[];
  category?: string;
  imageUrl?: string;

  // Engagement
  viewCount?: number;
  clickCount?: number;
  savedCount?: number;
}
```

### Partner Schema

```typescript
interface Partner {
  id: string;
  name: string;
  type: 'bank' | 'hotel' | 'airline' | 'retail' | 'restaurant' | 'other';
  logo?: string;
}
```

### Link Schema

```typescript
interface OfferLink {
  url: string;
  label: string;
  type: 'website' | 'terms' | 'apply' | 'details';
}
```

## Usage

### Accessing the Management Screen

1. Open the app and log in
2. Navigate to **Profile** tab
3. Tap on **🎯 Manage Offers**

### Creating a New Offer

1. Tap the **+** button in the top-right corner
2. Fill in the required fields:
   - **Title**: Short, descriptive title
   - **Short Description**: Brief summary for cards
   - **Full Description**: Detailed information (optional)
   - **Expiry Date**: When the offer expires
   - **Links**: Add at least one link (Apply, Terms, etc.)
   - **Partners**: Add at least one partner
3. Optionally add:
   - Category
   - Tags
   - Image URL
4. Tap **Create Offer**

### Editing an Offer

1. Find the offer in the list
2. Tap the **pencil icon** on the offer card
3. Update the fields
4. Tap **Update Offer**

### Publishing an Offer

1. Find the offer in the list
2. Ensure it's verified (tap the card to verify)
3. Tap the **eye icon** to toggle publish status
4. Published offers appear in the client-facing Offers screen

### Verifying an Offer

1. Tap on the offer card
2. Select **Verify** or **Reject**
3. Add verification notes if needed

### Deleting an Offer

1. Tap the **trash icon** on the offer card
2. Confirm deletion in the alert dialog

## Firebase Integration

### Firestore Collection

Offers are stored in the `offers` collection with the following structure:

```
offers/
  {offerId}/
    - title: string
    - shortDescription: string
    - fullDescription: string
    - links: array
    - expiryDate: timestamp
    - verificationStatus: string
    - partners: array
    - isPublished: boolean
    - createdAt: timestamp
    - updatedAt: timestamp
    - ...
```

### Service Functions

```typescript
// Create
await createOffer(data, userId);

// Read
await getAllOffers();
await getOfferById(offerId);
await getPublishedOffers();

// Update
await updateOffer({ id, ...data });
await updateVerificationStatus(offerId, status, verifiedBy, notes);
await togglePublishStatus(offerId);

// Delete
await deleteOffer(offerId);

// Analytics
await incrementViewCount(offerId);
await incrementClickCount(offerId);
```

## State Management

The module uses Zustand for state management:

```typescript
const {
  offers,              // All offers
  selectedOffer,       // Currently selected offer
  filters,             // Active filters
  isLoading,           // Loading state

  // Actions
  setOffers,
  addOffer,
  updateOffer,
  deleteOffer,
  setFilters,
  getFilteredOffers,

  // Computed
  getActiveOffers,
  getExpiredOffers,
  getOfferById,
} = useOffersStore();
```

## Testing with Sample Data

Sample offers are provided in `src/utils/sampleOffers.ts`:

```typescript
import { sampleOffers, getPublishedOffers } from '@utils/sampleOffers';

// Load sample data
useOffersStore.getState().setOffers(sampleOffers);

// Get specific subsets
const published = getPublishedOffers();
const active = getActiveOffers();
```

## Client-Side Display

To display published offers in the client-facing screen:

```typescript
import { getPublishedOffers } from '@services/offersService';

// Fetch published offers
const offers = await getPublishedOffers();

// Display using OfferCard component
<OfferCard
  offer={offer}
  onPress={() => handleOfferPress(offer)}
/>
```

## Customization

### Adding New Partner Types

Edit `src/models/Offer.ts`:

```typescript
export enum PartnerType {
  BANK = 'bank',
  HOTEL = 'hotel',
  AIRLINE = 'airline',
  RETAIL = 'retail',
  RESTAURANT = 'restaurant',
  OTHER = 'other',
  // Add new types here
  INSURANCE = 'insurance',
  TELECOM = 'telecom',
}
```

### Adding New Verification Statuses

Edit `src/models/Offer.ts`:

```typescript
export enum OfferVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  // Add new statuses here
  UNDER_REVIEW = 'under_review',
}
```

## Best Practices

1. **Always verify offers** before publishing
2. **Set realistic expiry dates** and monitor them
3. **Use descriptive titles** for better searchability
4. **Add multiple links** to provide comprehensive information
5. **Include partner logos** when available
6. **Use tags** for better categorization
7. **Monitor engagement metrics** to optimize offers
8. **Update or remove expired offers** regularly

## Troubleshooting

### Offers not appearing in client view
- Check if offer is published (`isPublished: true`)
- Check if offer is verified
- Check if offer is not expired
- Check if Firebase permissions are correct

### Create/Update failing
- Ensure all required fields are filled
- Check Firebase connection
- Verify user authentication
- Check for validation errors in form

### Performance issues
- Implement pagination for large datasets
- Use indexed queries in Firestore
- Optimize image loading
- Consider caching strategies

## Future Enhancements

- [ ] Offer templates for quick creation
- [ ] Bulk import/export
- [ ] Advanced analytics dashboard
- [ ] Scheduled publishing
- [ ] A/B testing for offers
- [ ] Push notifications for new offers
- [ ] Partner management portal
- [ ] Multi-language support
- [ ] Offer performance reports

## Support

For issues or questions:
1. Check the codebase documentation
2. Review Firebase logs
3. Contact the development team

---

**Version**: 1.0.0
**Last Updated**: November 17, 2025
**Maintainer**: Zennity Development Team
