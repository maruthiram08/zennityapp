import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAdminStore } from '@store/useAdminStore'
import { getAllContent } from '@services/contentService'
import { Theme } from '@constants/theme'
import { ContentType } from '@models/Content'

/**
 * Admin Dashboard Screen
 * Overview of all content with stats and quick actions
 */
export const AdminDashboardScreen: React.FC = () => {
  const navigation = useNavigation()
  const {
    contents,
    setContents,
    getStats,
    isLoading,
    setLoading,
    error,
    setError,
  } = useAdminStore()

  const stats = getStats()

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setLoading(true)
      const data = await getAllContent()
      setContents(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const navigateToContentType = (type: ContentType) => {
    navigation.navigate('ContentList' as never, { type } as never)
  }

  const navigateToCreateContent = () => {
    navigation.navigate('ContentEditor' as never, { mode: 'create' } as never)
  }

  const contentTypeCards = [
    {
      type: ContentType.SPEND_OFFER,
      title: 'Spend Offers',
      icon: '💰',
      color: Theme.colors.primary,
      count: stats.byType[ContentType.SPEND_OFFER],
    },
    {
      type: ContentType.LTF_CARD,
      title: 'LTF Cards',
      icon: '🎁',
      color: Theme.colors.success,
      count: stats.byType[ContentType.LTF_CARD],
    },
    {
      type: ContentType.PREMIUM_CAMPAIGN,
      title: 'Premium Campaigns',
      icon: '⭐',
      color: Theme.colors.secondary,
      count: stats.byType[ContentType.PREMIUM_CAMPAIGN],
    },
    {
      type: ContentType.STACKING_HACK,
      title: 'Stacking Hacks',
      icon: '🎯',
      color: Theme.colors.warning,
      count: stats.byType[ContentType.STACKING_HACK],
    },
    {
      type: ContentType.TRANSFER_BONUS,
      title: 'Transfer Bonus',
      icon: '✈️',
      color: '#007AFF',
      count: stats.byType[ContentType.TRANSFER_BONUS],
    },
    {
      type: ContentType.STATUS_OFFER,
      title: 'Status Offers',
      icon: '👑',
      color: '#FFD700',
      count: stats.byType[ContentType.STATUS_OFFER],
    },
  ]

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadContent}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Content Management</Text>
        <Text style={styles.subtitle}>Manage all content types from one place</Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Content</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: Theme.colors.success }]}>
            {stats.active}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: Theme.colors.text.tertiary }]}>
            {stats.inactive}
          </Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
      </View>

      {/* Create New Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToCreateContent}
      >
        <Text style={styles.createButtonText}>+ Create New Content</Text>
      </TouchableOpacity>

      {/* Content Type Cards */}
      <View style={styles.contentTypesContainer}>
        <Text style={styles.sectionTitle}>Content Types</Text>
        <View style={styles.cardsGrid}>
          {contentTypeCards.map((card) => (
            <TouchableOpacity
              key={card.type}
              style={[styles.typeCard, { borderLeftColor: card.color }]}
              onPress={() => navigateToContentType(card.type)}
            >
              <Text style={styles.typeIcon}>{card.icon}</Text>
              <View style={styles.typeInfo}>
                <Text style={styles.typeTitle}>{card.title}</Text>
                <Text style={styles.typeCount}>{card.count} items</Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  header: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    ...Theme.typography.h2,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.text.secondary,
  },
  createButton: {
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    ...Theme.typography.button,
    color: '#FFFFFF',
  },
  contentTypesContainer: {
    padding: Theme.spacing.lg,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  cardsGrid: {
    gap: Theme.spacing.md,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: Theme.spacing.sm,
  },
  typeIcon: {
    fontSize: 32,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    ...Theme.typography.h4,
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  typeCount: {
    ...Theme.typography.caption,
    color: Theme.colors.text.secondary,
  },
  arrowIcon: {
    fontSize: 24,
    color: Theme.colors.text.tertiary,
  },
  loadingText: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
    marginTop: Theme.spacing.sm,
  },
  errorText: {
    ...Theme.typography.body,
    color: Theme.colors.error,
    marginBottom: Theme.spacing.md,
  },
  retryButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  retryButtonText: {
    ...Theme.typography.button,
    color: '#FFFFFF',
  },
})
