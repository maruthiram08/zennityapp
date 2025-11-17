import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@firebase/config'
import { Content, ContentType } from '@models/Content'

/**
 * Content Service
 * Handles all CRUD operations for content management
 */

// Collection name
const CONTENT_COLLECTION = 'contents'

// Helper to convert Firestore timestamps to Dates
const firestoreToContent = (docData: any): Content => {
  return {
    ...docData,
    createdAt: docData.createdAt?.toDate() || new Date(),
    updatedAt: docData.updatedAt?.toDate() || new Date(),
    expiryDate: docData.expiryDate?.toDate?.() || undefined,
  } as Content
}

// Helper to convert Dates to Firestore timestamps
const contentToFirestore = (content: Partial<Content>): any => {
  const { createdAt, updatedAt, expiryDate, ...rest } = content as any

  return {
    ...rest,
    createdAt: createdAt ? Timestamp.fromDate(new Date(createdAt)) : Timestamp.now(),
    updatedAt: Timestamp.now(),
    expiryDate: expiryDate ? Timestamp.fromDate(new Date(expiryDate)) : null,
  }
}

/**
 * Fetch all content items
 */
export const getAllContent = async (): Promise<Content[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, CONTENT_COLLECTION), orderBy('createdAt', 'desc'))
    )

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...firestoreToContent(doc.data()),
    }))
  } catch (error) {
    console.error('Error fetching content:', error)
    throw new Error('Failed to fetch content')
  }
}

/**
 * Fetch content by ID
 */
export const getContentById = async (id: string): Promise<Content | null> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...firestoreToContent(docSnap.data()),
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching content by ID:', error)
    throw new Error('Failed to fetch content')
  }
}

/**
 * Fetch content by type
 */
export const getContentByType = async (type: ContentType): Promise<Content[]> => {
  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where('type', '==', type),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...firestoreToContent(doc.data()),
    }))
  } catch (error) {
    console.error('Error fetching content by type:', error)
    throw new Error('Failed to fetch content by type')
  }
}

/**
 * Fetch active content
 */
export const getActiveContent = async (): Promise<Content[]> => {
  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where('isActive', '==', true),
      orderBy('priority', 'desc')
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...firestoreToContent(doc.data()),
    }))
  } catch (error) {
    console.error('Error fetching active content:', error)
    throw new Error('Failed to fetch active content')
  }
}

/**
 * Create new content
 */
export const createContent = async (
  content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Content> => {
  try {
    const firestoreData = contentToFirestore(content)

    const docRef = await addDoc(collection(db, CONTENT_COLLECTION), firestoreData)

    const newDoc = await getDoc(docRef)

    return {
      id: docRef.id,
      ...firestoreToContent(newDoc.data()),
    }
  } catch (error) {
    console.error('Error creating content:', error)
    throw new Error('Failed to create content')
  }
}

/**
 * Update existing content
 */
export const updateContent = async (
  id: string,
  updates: Partial<Content>
): Promise<void> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id)
    const firestoreData = contentToFirestore(updates)

    await updateDoc(docRef, firestoreData)
  } catch (error) {
    console.error('Error updating content:', error)
    throw new Error('Failed to update content')
  }
}

/**
 * Delete content
 */
export const deleteContent = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting content:', error)
    throw new Error('Failed to delete content')
  }
}

/**
 * Toggle content active status
 */
export const toggleContentActive = async (
  id: string,
  isActive: boolean
): Promise<void> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id)
    await updateDoc(docRef, {
      isActive,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error toggling content active status:', error)
    throw new Error('Failed to toggle content status')
  }
}

/**
 * Update content priority (for sorting/featuring)
 */
export const updateContentPriority = async (
  id: string,
  priority: number
): Promise<void> => {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id)
    await updateDoc(docRef, {
      priority,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating content priority:', error)
    throw new Error('Failed to update content priority')
  }
}

// Mock data for development/testing
export const mockContents: Content[] = []

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
  try {
    return !!db
  } catch {
    return false
  }
}
