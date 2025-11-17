/**
 * Attribute Service
 * Handles CRUD operations for attribute schemas
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
import type { Attribute } from '../models/Attribute';

export const attributeService = {
  // Get all attributes
  async getAll(): Promise<Attribute[]> {
    const q = query(
      collection(db, COLLECTIONS.ATTRIBUTES),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Attribute[];
  },

  // Get active attributes only
  async getActive(): Promise<Attribute[]> {
    const q = query(
      collection(db, COLLECTIONS.ATTRIBUTES),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Attribute[];
  },

  // Get single attribute
  async getById(id: string): Promise<Attribute | null> {
    const docRef = doc(db, COLLECTIONS.ATTRIBUTES, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
    } as Attribute;
  },

  // Create new attribute
  async create(data: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.ATTRIBUTES), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Update attribute
  async update(id: string, data: Partial<Attribute>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ATTRIBUTES, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete attribute
  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ATTRIBUTES, id);
    await deleteDoc(docRef);
  },

  // Toggle active status
  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const docRef = doc(db, COLLECTIONS.ATTRIBUTES, id);
    await updateDoc(docRef, {
      isActive,
      updatedAt: Timestamp.now(),
    });
  },

  // Reorder attributes
  async reorder(attributes: { id: string; order: number }[]): Promise<void> {
    const promises = attributes.map(({ id, order }) => {
      const docRef = doc(db, COLLECTIONS.ATTRIBUTES, id);
      return updateDoc(docRef, {
        order,
        updatedAt: Timestamp.now(),
      });
    });
    await Promise.all(promises);
  },
};
