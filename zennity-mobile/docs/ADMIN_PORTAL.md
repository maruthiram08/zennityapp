# Admin Portal Documentation

## Overview

The Admin Portal is a comprehensive content management system built into the Zennity mobile app. It allows administrators to create, edit, and manage six different types of content that are displayed to end users.

## Accessing the Admin Portal

1. Open the Zennity mobile app
2. Navigate to the **Admin** tab (⚙️ icon) in the bottom navigation
3. You'll see the Admin Dashboard with overview statistics

## Content Types

The admin portal supports 6 different content types:

### 1. Spend Offers 💰

Manage credit card spending offers where users can earn rewards by meeting spend requirements.

**Visible Fields (shown on main feed):**
- Card name
- Bank name
- Reward (amount, description)
- Spend required (amount, description)
- Days left (calculated from expiry date)
- Difficulty badge (Easy/Medium/Hard)

**Hidden Fields (shown on details page):**
- Step-by-step requirements
- Registration details
- Fine print (terms and conditions)

**Example:**
- Card: HDFC Infinia
- Reward: ₹500 Amazon voucher
- Spend: ₹5,000 in 30 days
- Difficulty: Medium

---

### 2. LTF Cards 🎁

Manage lifetime free credit card offerings.

**Visible Fields:**
- Card name
- Bank name
- "Lifetime Free" badge
- Main benefit (e.g., "5% on Flipkart")
- CTA button text and URL

**Hidden Fields:**
- Complete benefits list (JSON format)
- Zero fee explanation
- Eligibility criteria
- Terms and conditions

**Example:**
- Card: Amazon Pay ICICI
- Main Benefit: 5% cashback on Amazon
- CTA: "Apply Free"

---

### 3. Premium Campaigns ⭐

Manage premium credit card upgrade campaigns and limited-time offers.

**Visible Fields:**
- Card name
- Bank name
- Main offer (e.g., "50% off upgrade fee")
- Offer percentage
- Key benefit visual
- Premium badge

**Hidden Fields:**
- 4 benefits grid (JSON format)
- Warning notes
- Detailed calculations
- Eligibility requirements
- Application URL

**Example:**
- Card: Amex Platinum
- Offer: 50% off first year fee
- Offer Percentage: 50%

---

### 4. Stacking Hacks 🎯

Manage reward stacking strategies that combine multiple offers.

**Visible Fields:**
- Stack name
- Final percentage (total rewards)
- Number of steps
- Pro tip badge
- Category (e.g., E-commerce, Travel)

**Hidden Fields:**
- Detailed step-by-step instructions (JSON format)
- Calculation breakdown
- Required cards
- Required accounts
- Estimated value
- Real-world examples

**Example:**
- Stack: Flipkart Triple Stack
- Final Percentage: 12.5%
- Steps: 3
- Category: E-commerce

---

### 5. Transfer Bonus ✈️

Manage loyalty points transfer promotions with bonus percentages.

**Visible Fields:**
- From program (e.g., "HSBC")
- To program (e.g., "Marriott")
- Bonus percentage
- Transfer route (visual representation)
- Days left
- Visual URL

**Hidden Fields:**
- Example calculations with different point amounts
- Detailed terms and conditions
- Transfer steps with time estimates
- Limitations
- Best uses

**Example:**
- Route: HSBC → Marriott Bonvoy
- Bonus: +40%
- Valid: 30 days

---

### 6. Status Offers 👑

Manage elite status matching and instant status offers through credit cards.

**Visible Fields:**
- Status name (e.g., "Marriott Gold")
- Program name (e.g., "Marriott Bonvoy")
- Card required
- "Instant" badge
- Key benefit (e.g., "25% bonus points")
- Status tier (Silver/Gold/Platinum/Diamond/Other)

**Hidden Fields:**
- Full benefits list (JSON format)
- Enrollment steps
- Requirements
- Status matching details
- Valuation examples

**Example:**
- Status: Marriott Gold Elite
- Program: Marriott Bonvoy
- Card: Amex Platinum
- Instant: Yes
- Key Benefit: Room upgrades + late checkout

---

## Using the Admin Portal

### Dashboard

The dashboard provides:
- **Total Content Count**: Total number of content items across all types
- **Active/Inactive Stats**: Quick overview of published vs draft content
- **Content Type Cards**: Quick navigation to specific content types with item counts
- **Create New Button**: Quick access to create new content

### Content List Screen

Features:
- **Search**: Search across all content fields
- **Filters**: Filter by content type or status (active/inactive)
- **Sorting**: Sort by creation date, update date, or priority
- **Actions per item**:
  - **Edit**: Modify content details
  - **Activate/Deactivate**: Toggle visibility to end users
  - **Delete**: Remove content (with confirmation)

### Content Editor Screen

#### Creating New Content

1. Click "Create New Content" from the dashboard or FAB button
2. Select content type (only available when creating)
3. Fill in common settings:
   - **Active**: Toggle to publish/unpublish
   - **Priority**: Higher numbers appear first (0-100 recommended)
4. Fill in type-specific fields (required fields marked with *)
5. Click "Create" to save

#### Editing Existing Content

1. Select content from the list
2. Click "Edit" button
3. Modify any fields except content type
4. Click "Update" to save changes

#### Field Guidelines

**Common Fields:**
- **Active**: Set to ON to make content visible to users
- **Priority**: Used for sorting (higher = more prominent)

**Text Fields:**
- Keep titles concise and clear
- Use proper capitalization
- Avoid special characters unless necessary

**Numeric Fields:**
- Enter numbers without currency symbols or % signs
- Decimals allowed (e.g., 12.5)

**JSON Fields** (Benefits, Steps, etc.):
- Must be valid JSON format
- Use the structure shown in placeholders
- Example format:
```json
[
  {
    "id": "1",
    "title": "Benefit Title",
    "description": "Detailed description",
    "icon": "optional-icon-name"
  }
]
```

**Multiline Fields:**
- Separate items with new lines
- Each line becomes a separate item in the list

---

## Data Storage

All content is stored in Firebase Firestore under the `contents` collection.

### Firestore Structure

```
contents/
├── {contentId1}/
│   ├── type: "SPEND_OFFER"
│   ├── isActive: true
│   ├── priority: 100
│   ├── cardName: "..."
│   ├── ...
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp
└── {contentId2}/
    └── ...
```

### Indexes Required

For optimal performance, create these Firestore indexes:

1. `contents` collection:
   - Fields: `type` (Ascending), `createdAt` (Descending)
   - Fields: `isActive` (Ascending), `priority` (Descending)

---

## Best Practices

### Content Creation

1. **Start with inactive content**: Create content with Active=OFF, review, then activate
2. **Use priority strategically**: Reserve high priorities (90-100) for featured content
3. **Keep main fields concise**: Users see these first - make them compelling
4. **Fill in hidden fields completely**: Users expect detailed information on details pages
5. **Test JSON fields**: Validate JSON before saving to avoid parsing errors

### Content Management

1. **Regular audits**: Review and remove expired/outdated content weekly
2. **Consistent naming**: Use consistent naming conventions for cards and banks
3. **Update expiry dates**: Keep expiry dates current to ensure "Days left" is accurate
4. **Monitor active content**: Don't over-saturate - quality over quantity
5. **Use categories**: For stacking hacks, consistently use the same category names

### Data Quality

1. **Verify calculations**: Double-check percentages and amounts
2. **Update terms**: Keep fine print and terms current
3. **Test CTAs**: Ensure all links and URLs are valid
4. **Consistent formatting**: Use the same currency format (₹ vs INR vs Rs.)
5. **Proofread**: Check for typos and grammatical errors

---

## Troubleshooting

### Common Issues

**Issue**: Content not appearing in app
- **Solution**: Check that `isActive` is set to ON
- **Solution**: Verify Firestore connection is working
- **Solution**: Check if content meets filter criteria

**Issue**: JSON parse errors
- **Solution**: Validate JSON using an online validator
- **Solution**: Ensure proper quotation marks and commas
- **Solution**: Check for trailing commas

**Issue**: Search not finding content
- **Solution**: Search looks in specific fields per content type
- **Solution**: Try using exact matches or fewer keywords
- **Solution**: Check spelling and case sensitivity

**Issue**: Unable to delete content
- **Solution**: Check Firebase permissions
- **Solution**: Ensure content ID is valid
- **Solution**: Try refreshing the content list

---

## Technical Details

### State Management

The admin portal uses Zustand for state management with the following store:

```typescript
useAdminStore()
  ├── contents: Content[]
  ├── selectedContent: Content | null
  ├── filter: ContentFilter
  ├── isLoading: boolean
  └── error: string | null
```

### API Service

All Firestore operations are handled by `contentService.ts`:

- `getAllContent()`: Fetch all content
- `getContentById(id)`: Fetch specific content
- `getContentByType(type)`: Fetch content by type
- `getActiveContent()`: Fetch only active content
- `createContent(content)`: Create new content
- `updateContent(id, updates)`: Update content
- `deleteContent(id)`: Delete content
- `toggleContentActive(id, isActive)`: Toggle active status
- `updateContentPriority(id, priority)`: Update priority

### Type Safety

All content types are fully typed with TypeScript:

```typescript
// Base interface
interface BaseContent {
  id: string
  type: ContentType
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  priority: number
}

// Specific types extend BaseContent
interface SpendOffer extends BaseContent { ... }
interface LTFCard extends BaseContent { ... }
// ... etc
```

---

## Future Enhancements

Planned features for future releases:

1. **Bulk Operations**: Edit/delete multiple items at once
2. **Content Templates**: Pre-filled templates for common content types
3. **Image Upload**: Direct image upload for visuals
4. **Preview Mode**: See how content will look to end users
5. **Version History**: Track changes and rollback if needed
6. **Scheduled Publishing**: Schedule content to go live at specific times
7. **Analytics**: View metrics on content performance
8. **Content Duplication**: Clone existing content to create similar items
9. **Import/Export**: CSV import/export for bulk content management
10. **Rich Text Editor**: WYSIWYG editor for formatted text fields

---

## Support

For technical issues or questions:
- Check the main project README
- Review Firebase console for data issues
- Check browser/app console for error messages
- Contact the development team

---

## Changelog

### Version 1.0.0 (Current)
- Initial admin portal release
- Support for 6 content types
- CRUD operations
- Search and filtering
- Active/inactive status
- Priority-based sorting
