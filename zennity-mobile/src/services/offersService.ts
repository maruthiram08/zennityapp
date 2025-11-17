/**
 * Offers Service - Firebase operations for offer management
 */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  Offer,
  CreateOfferInput,
  UpdateOfferInput,
  OfferVerificationStatus,
} from '../models/Offer';

const OFFERS_COLLECTION = 'offers';

/**
 * Convert Firestore timestamp to Date
 */
const convertTimestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

/**
 * Convert Offer dates to Firestore timestamps
 */
const convertOfferToFirestore = (offer: any) => {
  return {
    ...offer,
    expiryDate: Timestamp.fromDate(new Date(offer.expiryDate)),
    createdAt: offer.createdAt
      ? Timestamp.fromDate(new Date(offer.createdAt))
      : Timestamp.now(),
    updatedAt: Timestamp.now(),
    verifiedAt: offer.verifiedAt
      ? Timestamp.fromDate(new Date(offer.verifiedAt))
      : null,
    publishedAt: offer.publishedAt
      ? Timestamp.fromDate(new Date(offer.publishedAt))
      : null,
  };
};

/**
 * Convert Firestore document to Offer model
 */
const convertFirestoreToOffer = (doc: any): Offer => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    expiryDate: convertTimestampToDate(data.expiryDate),
    createdAt: convertTimestampToDate(data.createdAt),
    updatedAt: convertTimestampToDate(data.updatedAt),
    verifiedAt: data.verifiedAt ? convertTimestampToDate(data.verifiedAt) : undefined,
    publishedAt: data.publishedAt ? convertTimestampToDate(data.publishedAt) : undefined,
  } as Offer;
};

/**
 * Create a new offer
 */
export const createOffer = async (
  input: CreateOfferInput,
  userId: string
): Promise<Offer> => {
  try {
    const now = new Date();
    const offerData = {
      ...input,
      isActive: true,
      verificationStatus: OfferVerificationStatus.PENDING,
      isPublished: false,
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
      clickCount: 0,
      savedCount: 0,
    };

    const firestoreData = convertOfferToFirestore(offerData);
    const docRef = await addDoc(collection(db, OFFERS_COLLECTION), firestoreData);

    const newDoc = await getDoc(docRef);
    return convertFirestoreToOffer(newDoc);
  } catch (error) {
    console.error('Error creating offer:', error);
    throw new Error('Failed to create offer');
  }
};

/**
 * Update an existing offer
 */
export const updateOffer = async (input: UpdateOfferInput): Promise<Offer> => {
  try {
    const { id, ...updateData } = input;
    const offerRef = doc(db, OFFERS_COLLECTION, id);

    const firestoreData = convertOfferToFirestore({
      ...updateData,
      updatedAt: new Date(),
    });

    await updateDoc(offerRef, firestoreData);

    const updatedDoc = await getDoc(offerRef);
    return convertFirestoreToOffer(updatedDoc);
  } catch (error) {
    console.error('Error updating offer:', error);
    throw new Error('Failed to update offer');
  }
};

/**
 * Delete an offer
 */
export const deleteOffer = async (offerId: string): Promise<void> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);
    await deleteDoc(offerRef);
  } catch (error) {
    console.error('Error deleting offer:', error);
    throw new Error('Failed to delete offer');
  }
};

/**
 * Get all offers
 */
export const getAllOffers = async (): Promise<Offer[]> => {
  try {
    const q = query(
      collection(db, OFFERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreToOffer);
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw new Error('Failed to fetch offers');
  }
};

/**
 * Get a single offer by ID
 */
export const getOfferById = async (offerId: string): Promise<Offer | null> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);
    const offerDoc = await getDoc(offerRef);

    if (!offerDoc.exists()) {
      return null;
    }

    return convertFirestoreToOffer(offerDoc);
  } catch (error) {
    console.error('Error fetching offer:', error);
    throw new Error('Failed to fetch offer');
  }
};

/**
 * Get offers by verification status
 */
export const getOffersByStatus = async (
  status: OfferVerificationStatus
): Promise<Offer[]> => {
  try {
    const q = query(
      collection(db, OFFERS_COLLECTION),
      where('verificationStatus', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreToOffer);
  } catch (error) {
    console.error('Error fetching offers by status:', error);
    throw new Error('Failed to fetch offers by status');
  }
};

/**
 * Get published offers (for client-side display)
 */
export const getPublishedOffers = async (): Promise<Offer[]> => {
  try {
    const now = new Date();
    const q = query(
      collection(db, OFFERS_COLLECTION),
      where('isPublished', '==', true),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const offers = querySnapshot.docs.map(convertFirestoreToOffer);

    // Filter out expired offers
    return offers.filter((offer) => new Date(offer.expiryDate) > now);
  } catch (error) {
    console.error('Error fetching published offers:', error);
    throw new Error('Failed to fetch published offers');
  }
};

/**
 * Update verification status
 */
export const updateVerificationStatus = async (
  offerId: string,
  status: OfferVerificationStatus,
  verifiedBy: string,
  notes?: string
): Promise<Offer> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);

    const updateData = {
      verificationStatus: status,
      verifiedBy,
      verifiedAt: Timestamp.now(),
      verificationNotes: notes || null,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(offerRef, updateData);

    const updatedDoc = await getDoc(offerRef);
    return convertFirestoreToOffer(updatedDoc);
  } catch (error) {
    console.error('Error updating verification status:', error);
    throw new Error('Failed to update verification status');
  }
};

/**
 * Toggle publish status
 */
export const togglePublishStatus = async (offerId: string): Promise<Offer> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);
    const offerDoc = await getDoc(offerRef);

    if (!offerDoc.exists()) {
      throw new Error('Offer not found');
    }

    const currentStatus = offerDoc.data().isPublished;

    const updateData = {
      isPublished: !currentStatus,
      publishedAt: !currentStatus ? Timestamp.now() : null,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(offerRef, updateData);

    const updatedDoc = await getDoc(offerRef);
    return convertFirestoreToOffer(updatedDoc);
  } catch (error) {
    console.error('Error toggling publish status:', error);
    throw new Error('Failed to toggle publish status');
  }
};

/**
 * Increment view count
 */
export const incrementViewCount = async (offerId: string): Promise<void> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);
    const offerDoc = await getDoc(offerRef);

    if (offerDoc.exists()) {
      const currentCount = offerDoc.data().viewCount || 0;
      await updateDoc(offerRef, {
        viewCount: currentCount + 1,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

/**
 * Increment click count
 */
export const incrementClickCount = async (offerId: string): Promise<void> => {
  try {
    const offerRef = doc(db, OFFERS_COLLECTION, offerId);
    const offerDoc = await getDoc(offerRef);

    if (offerDoc.exists()) {
      const currentCount = offerDoc.data().clickCount || 0;
      await updateDoc(offerRef, {
        clickCount: currentCount + 1,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error incrementing click count:', error);
  }
};
