/**
 * OffersManagement Screen - Main screen for managing offers
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import { useOffersStore } from '../store/useOffersStore';
import { useAuthStore } from '../store/useAuthStore';
import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  togglePublishStatus,
  updateVerificationStatus,
} from '../services/offersService';
import {
  CreateOfferInput,
  Offer,
  OfferVerificationStatus,
  PartnerType,
} from '../models/Offer';
import OfferCard from '../components/offer/OfferCard';
import OfferForm from '../components/offer/OfferForm';
import Button from '../components/Button';
import FilterChip from '../components/FilterChip';

const OffersManagementScreen: React.FC = () => {
  const { user } = useAuthStore();
  const {
    offers,
    setOffers,
    addOffer,
    updateOffer: updateOfferInStore,
    deleteOffer: deleteOfferInStore,
    getFilteredOffers,
    filters,
    setFilters,
    clearFilters,
    isLoading,
    setLoading,
    setError,
  } = useOffersStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load offers on mount
  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const fetchedOffers = await getAllOffers();
      setOffers(fetchedOffers);
      setError(null);
    } catch (error) {
      console.error('Error loading offers:', error);
      setError('Failed to load offers');
      Alert.alert('Error', 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOffer = async (data: CreateOfferInput) => {
    if (!user?.id) {
      Alert.alert('Error', 'You must be logged in to create offers');
      return;
    }

    try {
      setIsSubmitting(true);
      const newOffer = await createOffer(data, user.id);
      addOffer(newOffer);
      setShowCreateModal(false);
      Alert.alert('Success', 'Offer created successfully');
    } catch (error) {
      console.error('Error creating offer:', error);
      Alert.alert('Error', 'Failed to create offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateOffer = async (data: CreateOfferInput) => {
    if (!editingOffer) return;

    try {
      setIsSubmitting(true);
      const updatedOffer = await updateOffer({
        id: editingOffer.id,
        ...data,
      });
      updateOfferInStore(updatedOffer);
      setEditingOffer(null);
      Alert.alert('Success', 'Offer updated successfully');
    } catch (error) {
      console.error('Error updating offer:', error);
      Alert.alert('Error', 'Failed to update offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteOffer = (offer: Offer) => {
    Alert.alert(
      'Delete Offer',
      `Are you sure you want to delete "${offer.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteOffer(offer.id);
              deleteOfferInStore(offer.id);
              Alert.alert('Success', 'Offer deleted successfully');
            } catch (error) {
              console.error('Error deleting offer:', error);
              Alert.alert('Error', 'Failed to delete offer');
            }
          },
        },
      ]
    );
  };

  const handleTogglePublish = async (offer: Offer) => {
    try {
      const updatedOffer = await togglePublishStatus(offer.id);
      updateOfferInStore(updatedOffer);
    } catch (error) {
      console.error('Error toggling publish status:', error);
      Alert.alert('Error', 'Failed to update publish status');
    }
  };

  const handleUpdateVerification = (offer: Offer) => {
    Alert.alert(
      'Update Verification Status',
      `Current status: ${offer.verificationStatus}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Verify',
          onPress: async () => {
            try {
              const updatedOffer = await updateVerificationStatus(
                offer.id,
                OfferVerificationStatus.VERIFIED,
                user?.id || 'admin'
              );
              updateOfferInStore(updatedOffer);
              Alert.alert('Success', 'Offer verified successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to verify offer');
            }
          },
        },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedOffer = await updateVerificationStatus(
                offer.id,
                OfferVerificationStatus.REJECTED,
                user?.id || 'admin',
                'Rejected by admin'
              );
              updateOfferInStore(updatedOffer);
              Alert.alert('Success', 'Offer rejected');
            } catch (error) {
              Alert.alert('Error', 'Failed to reject offer');
            }
          },
        },
      ]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters({ ...filters, searchQuery: query });
  };

  const handleFilterByStatus = (status: OfferVerificationStatus) => {
    setFilters({
      ...filters,
      verificationStatus:
        filters.verificationStatus === status ? undefined : status,
    });
  };

  const handleFilterByPublished = (isPublished: boolean) => {
    setFilters({
      ...filters,
      isPublished: filters.isPublished === isPublished ? undefined : isPublished,
    });
  };

  const filteredOffers = getFilteredOffers();

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Offer Management</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={Theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={Theme.colors.textTertiary}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search offers..."
          placeholderTextColor={Theme.colors.textTertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={Theme.colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterChip
          label="All"
          active={!filters.verificationStatus}
          onPress={() => setFilters({ ...filters, verificationStatus: undefined })}
        />
        <FilterChip
          label="Verified"
          active={filters.verificationStatus === OfferVerificationStatus.VERIFIED}
          onPress={() =>
            handleFilterByStatus(OfferVerificationStatus.VERIFIED)
          }
        />
        <FilterChip
          label="Pending"
          active={filters.verificationStatus === OfferVerificationStatus.PENDING}
          onPress={() =>
            handleFilterByStatus(OfferVerificationStatus.PENDING)
          }
        />
        <FilterChip
          label="Published"
          active={filters.isPublished === true}
          onPress={() => handleFilterByPublished(true)}
        />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{offers.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {
              offers.filter(
                (o) => o.verificationStatus === OfferVerificationStatus.VERIFIED
              ).length
            }
          </Text>
          <Text style={styles.statLabel}>Verified</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {offers.filter((o) => o.isPublished).length}
          </Text>
          <Text style={styles.statLabel}>Published</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {
              offers.filter(
                (o) =>
                  o.isActive && new Date(o.expiryDate) > new Date()
              ).length
            }
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>
    </View>
  );

  const renderOfferCard = ({ item }: { item: Offer }) => (
    <OfferCard
      offer={item}
      onPress={() => handleUpdateVerification(item)}
      onEdit={() => setEditingOffer(item)}
      onDelete={() => handleDeleteOffer(item)}
      onTogglePublish={() => handleTogglePublish(item)}
    />
  );

  if (isLoading && offers.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>Loading offers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredOffers}
        renderItem={renderOfferCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={64}
              color={Theme.colors.textTertiary}
            />
            <Text style={styles.emptyText}>No offers found</Text>
            <Button
              text="Create Your First Offer"
              onPress={() => setShowCreateModal(true)}
              style={styles.emptyButton}
            />
          </View>
        }
      />

      {/* Create Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Offer</Text>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={Theme.colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
          <OfferForm
            onSubmit={handleCreateOffer}
            onCancel={() => setShowCreateModal(false)}
            isSubmitting={isSubmitting}
          />
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={!!editingOffer}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Offer</Text>
            <TouchableOpacity onPress={() => setEditingOffer(null)}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={Theme.colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
          {editingOffer && (
            <OfferForm
              offer={editingOffer}
              onSubmit={handleUpdateOffer}
              onCancel={() => setEditingOffer(null)}
              isSubmitting={isSubmitting}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  loadingText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.md,
  },
  header: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.textPrimary,
  },
  createButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Theme.typography.body,
    color: Theme.colors.textPrimary,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...Theme.typography.h2,
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: Theme.spacing.xxl,
  },
  emptyText: {
    ...Theme.typography.h3,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  emptyButton: {
    minWidth: 200,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  modalTitle: {
    ...Theme.typography.h2,
    color: Theme.colors.textPrimary,
  },
});

export default OffersManagementScreen;
