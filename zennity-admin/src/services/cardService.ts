/**
 * Card Service
 * Handles CRUD operations for credit cards
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db, COLLECTIONS } from '../firebase/config';
import type { Card } from '../models/Card';

export const cardService = {
  // Get all cards
  async getAll(): Promise<Card[]> {
    const q = query(
      collection(db, COLLECTIONS.CARDS),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      issueDate: doc.data().issueDate?.toDate(),
      expiryDate: doc.data().expiryDate?.toDate(),
      feeNextDue: doc.data().feeNextDue?.toDate(),
    })) as Card[];
  },

  // Get active cards only
  async getActive(): Promise<Card[]> {
    const q = query(
      collection(db, COLLECTIONS.CARDS),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      issueDate: doc.data().issueDate?.toDate(),
      expiryDate: doc.data().expiryDate?.toDate(),
      feeNextDue: doc.data().feeNextDue?.toDate(),
    })) as Card[];
  },

  // Get single card
  async getById(id: string): Promise<Card | null> {
    const docRef = doc(db, COLLECTIONS.CARDS, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      issueDate: docSnap.data().issueDate?.toDate(),
      expiryDate: docSnap.data().expiryDate?.toDate(),
      feeNextDue: docSnap.data().feeNextDue?.toDate(),
    } as Card;
  },

  // Create new card
  async create(data: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CARDS), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Update card
  async update(id: string, data: Partial<Card>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CARDS, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete card
  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CARDS, id);
    await deleteDoc(docRef);
  },

  // Toggle active status
  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CARDS, id);
    await updateDoc(docRef, {
      isActive,
      updatedAt: Timestamp.now(),
    });
  },

  // Search cards
  async search(bankName?: string, tier?: string): Promise<Card[]> {
    let q = query(collection(db, COLLECTIONS.CARDS));

    if (bankName) {
      q = query(q, where('bankName', '==', bankName));
    }

    if (tier) {
      q = query(q, where('tier', '==', tier));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      issueDate: doc.data().issueDate?.toDate(),
      expiryDate: doc.data().expiryDate?.toDate(),
      feeNextDue: doc.data().feeNextDue?.toDate(),
    })) as Card[];
  },
};
