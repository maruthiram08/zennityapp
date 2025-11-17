import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { useAdminStore } from '@store/useAdminStore'
import { Theme } from '@constants/theme'
import { Content, ContentType } from '@models/Content'
import { deleteContent, toggleContentActive } from '@services/contentService'

type RouteParams = {
  ContentList: {
    type?: ContentType
  }
}

/**
 * Content List Screen
 * Shows filterable list of content items
 */
export const ContentListScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'ContentList'>>()
  const navigation = useNavigation()
  const {
    getFilteredContents,
    filter,
    setFilter,
    selectContent,
    deleteContent: deleteContentFromStore,
    updateContent,
  } = useAdminStore()

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Set initial filter from route params
    if (route.params?.type) {
      setFilter({ type: route.params.type })
    }
  }, [route.params])

  useEffect(() => {
    // Update search filter
    setFilter({ searchQuery })
  }, [searchQuery])

  const filteredContents = getFilteredContents()

  const handleEdit = (content: Content) => {
    selectContent(content)
    navigation.navigate('ContentEditor' as never, {
      mode: 'edit',
      contentId: content.id,
    } as never)
  }

  const handleDelete = async (content: Content) => {
    Alert.alert(
      'Delete Content',
      `Are you sure you want to delete this ${content.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteContent(content.id)
              deleteContentFromStore(content.id)
              Alert.alert('Success', 'Content deleted successfully')
            } catch (error) {
              Alert.alert('Error', 'Failed to delete content')
            }
          },
        },
      ]
    )
  }

  const handleToggleActive = async (content: Content) => {
    try {
      const newStatus = !content.isActive
      await toggleContentActive(content.id, newStatus)
      updateContent(content.id, { isActive: newStatus })
    } catch (error) {
      Alert.alert('Error', 'Failed to update content status')
    }
  }

  const handleCreate = () => {
    navigation.navigate('ContentEditor' as never, {
      mode: 'create',
      type: filter.type,
    } as never)
  }

  const getContentTitle = (content: Content): string => {
    switch (content.type) {
      case ContentType.SPEND_OFFER:
        return `${content.cardName} - ${content.reward.description}`
      case ContentType.LTF_CARD:
        return content.cardName
      case ContentType.PREMIUM_CAMPAIGN:
        return `${content.cardName} - ${content.mainOffer}`
      case ContentType.STACKING_HACK:
        return content.stackName
      case ContentType.TRANSFER_BONUS:
        return content.transferRoute
      case ContentType.STATUS_OFFER:
        return `${content.statusName} via ${content.cardRequired}`
      default:
        return 'Unknown'
    }
  }

  const getContentSubtitle = (content: Content): string => {
    switch (content.type) {
      case ContentType.SPEND_OFFER:
        return content.bankName
      case ContentType.LTF_CARD:
        return content.mainBenefit
      case ContentType.PREMIUM_CAMPAIGN:
        return content.bankName
      case ContentType.STACKING_HACK:
        return `${content.finalPercentage}% in ${content.numberOfSteps} steps`
      case ContentType.TRANSFER_BONUS:
        return `+${content.bonusPercentage}% bonus`
      case ContentType.STATUS_OFFER:
        return content.programName
      default:
        return ''
    }
  }

  const renderContentItem = ({ item }: { item: Content }) => (
    <View style={styles.contentItem}>
      <View style={styles.contentInfo}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>{getContentTitle(item)}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: item.isActive ? Theme.colors.success : Theme.colors.text.tertiary },
            ]}
          >
            <Text style={styles.statusText}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        <Text style={styles.contentSubtitle}>{getContentSubtitle(item)}</Text>
        <Text style={styles.contentType}>{item.type.replace('_', ' ')}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            item.isActive ? styles.deactivateButton : styles.activateButton,
          ]}
          onPress={() => handleToggleActive(item)}
        >
          <Text style={styles.actionButtonText}>
            {item.isActive ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {filter.type ? filter.type.replace('_', ' ') : 'All Content'}
        </Text>
        <Text style={styles.subtitle}>{filteredContents.length} items</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search content..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            !filter.type && styles.filterButtonActive,
          ]}
          onPress={() => setFilter({ type: undefined })}
        >
          <Text
            style={[
              styles.filterButtonText,
              !filter.type && styles.filterButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {Object.values(ContentType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter.type === type && styles.filterButtonActive,
            ]}
            onPress={() => setFilter({ type })}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.type === type && styles.filterButtonTextActive,
              ]}
            >
              {type.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content List */}
      <FlatList
        data={filteredContents}
        renderItem={renderContentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No content found</Text>
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>Create New</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Floating Action Button */}
      {filteredContents.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleCreate}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    ...Theme.typography.h2,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
    textTransform: 'capitalize',
  },
  subtitle: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
  },
  searchContainer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
  },
  searchInput: {
    ...Theme.typography.body,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    color: Theme.colors.text.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  filterButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.pill,
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  filterButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  contentItem: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentInfo: {
    marginBottom: Theme.spacing.sm,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.xs,
  },
  contentTitle: {
    ...Theme.typography.h4,
    color: Theme.colors.text.primary,
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  contentSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
    marginBottom: 4,
  },
  contentType: {
    ...Theme.typography.caption,
    color: Theme.colors.text.tertiary,
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.pill,
  },
  statusText: {
    ...Theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Theme.colors.primary,
  },
  activateButton: {
    backgroundColor: Theme.colors.success,
  },
  deactivateButton: {
    backgroundColor: Theme.colors.warning,
  },
  deleteButton: {
    backgroundColor: Theme.colors.error,
  },
  actionButtonText: {
    ...Theme.typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxl,
  },
  emptyText: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.md,
  },
  createButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  createButtonText: {
    ...Theme.typography.button,
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    right: Theme.spacing.lg,
    bottom: Theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    lineHeight: 40,
  },
})
