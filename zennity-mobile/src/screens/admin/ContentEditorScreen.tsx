import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { useAdminStore } from '@store/useAdminStore'
import { Theme } from '@constants/theme'
import {
  Content,
  ContentType,
  SpendOffer,
  LTFCard,
  PremiumCampaign,
  StackingHack,
  TransferBonus,
  StatusOffer,
} from '@models/Content'
import { createContent, updateContent } from '@services/contentService'

type RouteParams = {
  ContentEditor: {
    mode: 'create' | 'edit'
    contentId?: string
    type?: ContentType
  }
}

/**
 * Content Editor Screen
 * Create or edit content with type-specific forms
 */
export const ContentEditorScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'ContentEditor'>>()
  const navigation = useNavigation()
  const {
    selectedContent,
    getContentById,
    addContent,
    updateContent: updateContentInStore,
  } = useAdminStore()

  const isEditMode = route.params?.mode === 'edit'
  const contentId = route.params?.contentId

  // Get content if editing
  const existingContent = isEditMode && contentId ? getContentById(contentId) : null

  // Content type state
  const [contentType, setContentType] = useState<ContentType>(
    existingContent?.type || route.params?.type || ContentType.SPEND_OFFER
  )

  // Common fields
  const [isActive, setIsActive] = useState(existingContent?.isActive ?? true)
  const [priority, setPriority] = useState(
    existingContent?.priority?.toString() || '0'
  )

  // Spend Offer fields
  const [cardName, setCardName] = useState('')
  const [bankName, setBankName] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const [rewardDescription, setRewardDescription] = useState('')
  const [spendAmount, setSpendAmount] = useState('')
  const [spendDescription, setSpendDescription] = useState('')
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')
  const [requirements, setRequirements] = useState('')
  const [registrationDetails, setRegistrationDetails] = useState('')
  const [finePrint, setFinePrint] = useState('')

  // LTF Card fields
  const [mainBenefit, setMainBenefit] = useState('')
  const [ctaText, setCtaText] = useState('Apply Free')
  const [ctaUrl, setCtaUrl] = useState('')
  const [benefits, setBenefits] = useState('')
  const [zeroFeeExplanation, setZeroFeeExplanation] = useState('')

  // Premium Campaign fields
  const [mainOffer, setMainOffer] = useState('')
  const [offerPercentage, setOfferPercentage] = useState('')
  const [keyBenefitVisual, setKeyBenefitVisual] = useState('')
  const [warningNotes, setWarningNotes] = useState('')

  // Stacking Hack fields
  const [stackName, setStackName] = useState('')
  const [finalPercentage, setFinalPercentage] = useState('')
  const [numberOfSteps, setNumberOfSteps] = useState('')
  const [category, setCategory] = useState('')
  const [steps, setSteps] = useState('')

  // Transfer Bonus fields
  const [fromProgram, setFromProgram] = useState('')
  const [toProgram, setToProgram] = useState('')
  const [bonusPercentage, setBonusPercentage] = useState('')
  const [transferRoute, setTransferRoute] = useState('')

  // Status Offer fields
  const [statusName, setStatusName] = useState('')
  const [programName, setProgramName] = useState('')
  const [cardRequired, setCardRequired] = useState('')
  const [isInstant, setIsInstant] = useState(true)
  const [keyBenefit, setKeyBenefit] = useState('')
  const [statusTier, setStatusTier] = useState<'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Other'>('Gold')

  // Load existing content
  useEffect(() => {
    if (existingContent) {
      loadExistingContent(existingContent)
    }
  }, [existingContent])

  const loadExistingContent = (content: Content) => {
    setIsActive(content.isActive)
    setPriority(content.priority.toString())

    switch (content.type) {
      case ContentType.SPEND_OFFER:
        setCardName(content.cardName)
        setBankName(content.bankName)
        setRewardAmount(content.reward.amount.toString())
        setRewardDescription(content.reward.description)
        setSpendAmount(content.spendRequired.amount.toString())
        setSpendDescription(content.spendRequired.description)
        setDifficulty(content.difficulty)
        setRequirements(content.requirements.map(r => r.description).join('\n'))
        setRegistrationDetails(content.registrationDetails)
        setFinePrint(content.finePrint.join('\n'))
        break

      case ContentType.LTF_CARD:
        setCardName(content.cardName)
        setBankName(content.bankName)
        setMainBenefit(content.mainBenefit)
        setCtaText(content.ctaText)
        setCtaUrl(content.ctaUrl || '')
        setBenefits(JSON.stringify(content.benefits, null, 2))
        setZeroFeeExplanation(content.zeroFeeExplanation)
        break

      case ContentType.PREMIUM_CAMPAIGN:
        setCardName(content.cardName)
        setBankName(content.bankName)
        setMainOffer(content.mainOffer)
        setOfferPercentage(content.offerPercentage?.toString() || '')
        setKeyBenefitVisual(content.keyBenefitVisual)
        setBenefits(JSON.stringify(content.benefits, null, 2))
        setWarningNotes(content.warningNotes.join('\n'))
        break

      case ContentType.STACKING_HACK:
        setStackName(content.stackName)
        setFinalPercentage(content.finalPercentage.toString())
        setNumberOfSteps(content.numberOfSteps.toString())
        setCategory(content.category || '')
        setSteps(JSON.stringify(content.steps, null, 2))
        break

      case ContentType.TRANSFER_BONUS:
        setFromProgram(content.fromProgram)
        setToProgram(content.toProgram)
        setBonusPercentage(content.bonusPercentage.toString())
        setTransferRoute(content.transferRoute)
        break

      case ContentType.STATUS_OFFER:
        setStatusName(content.statusName)
        setProgramName(content.programName)
        setCardRequired(content.cardRequired)
        setIsInstant(content.isInstant)
        setKeyBenefit(content.keyBenefit)
        setStatusTier(content.statusTier)
        break
    }
  }

  const handleSave = async () => {
    try {
      const baseContent = {
        type: contentType,
        isActive,
        priority: parseInt(priority) || 0,
      }

      let contentData: Partial<Content>

      switch (contentType) {
        case ContentType.SPEND_OFFER:
          contentData = {
            ...baseContent,
            cardName,
            bankName,
            reward: {
              amount: parseFloat(rewardAmount) || 0,
              currency: 'INR',
              type: 'voucher',
              description: rewardDescription,
            },
            spendRequired: {
              amount: parseFloat(spendAmount) || 0,
              currency: 'INR',
              description: spendDescription,
            },
            difficulty,
            requirements: requirements.split('\n').map((desc, i) => ({
              step: i + 1,
              description: desc.trim(),
            })),
            registrationDetails,
            finePrint: finePrint.split('\n').map(s => s.trim()),
          } as Partial<SpendOffer>
          break

        case ContentType.LTF_CARD:
          contentData = {
            ...baseContent,
            cardName,
            bankName,
            isLifetimeFree: true,
            mainBenefit,
            ctaText,
            ctaUrl,
            benefits: benefits ? JSON.parse(benefits) : [],
            zeroFeeExplanation,
            eligibilityCriteria: [],
            termsAndConditions: [],
          } as Partial<LTFCard>
          break

        case ContentType.PREMIUM_CAMPAIGN:
          contentData = {
            ...baseContent,
            cardName,
            bankName,
            mainOffer,
            offerPercentage: offerPercentage ? parseFloat(offerPercentage) : undefined,
            keyBenefitVisual,
            isPremium: true,
            benefits: benefits ? JSON.parse(benefits) : [],
            warningNotes: warningNotes.split('\n').map(s => s.trim()),
            calculations: [],
            eligibility: [],
          } as Partial<PremiumCampaign>
          break

        case ContentType.STACKING_HACK:
          contentData = {
            ...baseContent,
            stackName,
            finalPercentage: parseFloat(finalPercentage) || 0,
            numberOfSteps: parseInt(numberOfSteps) || 0,
            isProTip: true,
            category,
            steps: steps ? JSON.parse(steps) : [],
            calculationBreakdown: [],
            requiredCards: [],
            requiredAccounts: [],
            estimatedValue: {
              amount: 0,
              currency: 'INR',
              description: '',
            },
            examples: [],
          } as Partial<StackingHack>
          break

        case ContentType.TRANSFER_BONUS:
          contentData = {
            ...baseContent,
            fromProgram,
            toProgram,
            bonusPercentage: parseFloat(bonusPercentage) || 0,
            transferRoute,
            exampleCalculations: [],
            detailedTerms: [],
            transferSteps: [],
            limitations: [],
            bestUses: [],
          } as Partial<TransferBonus>
          break

        case ContentType.STATUS_OFFER:
          contentData = {
            ...baseContent,
            statusName,
            programName,
            cardRequired,
            isInstant,
            keyBenefit,
            statusTier,
            fullBenefits: [],
            enrollmentSteps: [],
            requirements: [],
            valuationExamples: [],
          } as Partial<StatusOffer>
          break

        default:
          throw new Error('Invalid content type')
      }

      if (isEditMode && contentId) {
        await updateContent(contentId, contentData)
        updateContentInStore(contentId, contentData)
        Alert.alert('Success', 'Content updated successfully')
      } else {
        const newContent = await createContent(contentData as any)
        addContent(newContent)
        Alert.alert('Success', 'Content created successfully')
      }

      navigation.goBack()
    } catch (error) {
      Alert.alert('Error', (error as Error).message)
    }
  }

  const renderTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Content Type</Text>
      <View style={styles.typeButtons}>
        {Object.values(ContentType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              contentType === type && styles.typeButtonActive,
            ]}
            onPress={() => setContentType(type)}
            disabled={isEditMode}
          >
            <Text
              style={[
                styles.typeButtonText,
                contentType === type && styles.typeButtonTextActive,
              ]}
            >
              {type.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderCommonFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Common Settings</Text>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Active</Text>
        <Switch
          value={isActive}
          onValueChange={setIsActive}
          trackColor={{ false: '#767577', true: Theme.colors.primary }}
          thumbColor={isActive ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Priority (for sorting)</Text>
        <TextInput
          style={styles.input}
          value={priority}
          onChangeText={setPriority}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderSpendOfferFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Spend Offer Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Card Name *</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder="e.g., HDFC Infinia"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bank Name *</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="e.g., HDFC Bank"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Reward Amount *</Text>
        <TextInput
          style={styles.input}
          value={rewardAmount}
          onChangeText={setRewardAmount}
          placeholder="500"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Reward Description *</Text>
        <TextInput
          style={styles.input}
          value={rewardDescription}
          onChangeText={setRewardDescription}
          placeholder="e.g., ₹500 voucher"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Spend Required Amount *</Text>
        <TextInput
          style={styles.input}
          value={spendAmount}
          onChangeText={setSpendAmount}
          placeholder="5000"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Spend Description *</Text>
        <TextInput
          style={styles.input}
          value={spendDescription}
          onChangeText={setSpendDescription}
          placeholder="e.g., ₹5K"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyButtons}>
          {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                difficulty === level && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty(level)}
            >
              <Text
                style={[
                  styles.difficultyButtonText,
                  difficulty === level && styles.difficultyButtonTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Requirements (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={requirements}
          onChangeText={setRequirements}
          placeholder="Step 1: Register\nStep 2: Spend\nStep 3: Claim"
          multiline
          numberOfLines={4}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Registration Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={registrationDetails}
          onChangeText={setRegistrationDetails}
          placeholder="How to register for this offer..."
          multiline
          numberOfLines={3}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Fine Print (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={finePrint}
          onChangeText={setFinePrint}
          placeholder="Terms and conditions..."
          multiline
          numberOfLines={3}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderLTFCardFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>LTF Card Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Card Name *</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder="e.g., Amazon Pay ICICI"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bank Name *</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="e.g., ICICI Bank"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Main Benefit *</Text>
        <TextInput
          style={styles.input}
          value={mainBenefit}
          onChangeText={setMainBenefit}
          placeholder="e.g., 5% on Flipkart"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CTA Text</Text>
        <TextInput
          style={styles.input}
          value={ctaText}
          onChangeText={setCtaText}
          placeholder="Apply Free"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CTA URL</Text>
        <TextInput
          style={styles.input}
          value={ctaUrl}
          onChangeText={setCtaUrl}
          placeholder="https://..."
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Benefits (JSON format)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={benefits}
          onChangeText={setBenefits}
          placeholder='[{"id":"1","title":"Benefit 1","description":"..."}]'
          multiline
          numberOfLines={6}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Zero Fee Explanation</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={zeroFeeExplanation}
          onChangeText={setZeroFeeExplanation}
          placeholder="Why this card is lifetime free..."
          multiline
          numberOfLines={3}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderPremiumCampaignFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Premium Campaign Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Card Name *</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
          placeholder="e.g., Amex Platinum"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bank Name *</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="e.g., American Express"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Main Offer *</Text>
        <TextInput
          style={styles.input}
          value={mainOffer}
          onChangeText={setMainOffer}
          placeholder="e.g., 50% off upgrade"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Offer Percentage</Text>
        <TextInput
          style={styles.input}
          value={offerPercentage}
          onChangeText={setOfferPercentage}
          placeholder="50"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Key Benefit Visual</Text>
        <TextInput
          style={styles.input}
          value={keyBenefitVisual}
          onChangeText={setKeyBenefitVisual}
          placeholder="URL or description"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Benefits (JSON format)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={benefits}
          onChangeText={setBenefits}
          placeholder='[{"id":"1","title":"Benefit 1","description":"..."}]'
          multiline
          numberOfLines={6}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Warning Notes (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={warningNotes}
          onChangeText={setWarningNotes}
          placeholder="Important warnings..."
          multiline
          numberOfLines={3}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderStackingHackFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Stacking Hack Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Stack Name *</Text>
        <TextInput
          style={styles.input}
          value={stackName}
          onChangeText={setStackName}
          placeholder="e.g., Flipkart Triple Stack"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Final Percentage *</Text>
        <TextInput
          style={styles.input}
          value={finalPercentage}
          onChangeText={setFinalPercentage}
          placeholder="12.5"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Number of Steps *</Text>
        <TextInput
          style={styles.input}
          value={numberOfSteps}
          onChangeText={setNumberOfSteps}
          placeholder="3"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g., E-commerce, Travel, Dining"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Steps (JSON format)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={steps}
          onChangeText={setSteps}
          placeholder='[{"stepNumber":1,"title":"...","description":"...","percentageContribution":5}]'
          multiline
          numberOfLines={6}
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderTransferBonusFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Transfer Bonus Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>From Program *</Text>
        <TextInput
          style={styles.input}
          value={fromProgram}
          onChangeText={setFromProgram}
          placeholder="e.g., HSBC"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>To Program *</Text>
        <TextInput
          style={styles.input}
          value={toProgram}
          onChangeText={setToProgram}
          placeholder="e.g., Marriott"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Bonus Percentage *</Text>
        <TextInput
          style={styles.input}
          value={bonusPercentage}
          onChangeText={setBonusPercentage}
          placeholder="40"
          keyboardType="numeric"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Transfer Route *</Text>
        <TextInput
          style={styles.input}
          value={transferRoute}
          onChangeText={setTransferRoute}
          placeholder="e.g., HSBC → Marriott"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>
    </View>
  )

  const renderStatusOfferFields = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Status Offer Details</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Status Name *</Text>
        <TextInput
          style={styles.input}
          value={statusName}
          onChangeText={setStatusName}
          placeholder="e.g., Marriott Gold"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Program Name *</Text>
        <TextInput
          style={styles.input}
          value={programName}
          onChangeText={setProgramName}
          placeholder="e.g., Marriott Bonvoy"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Card Required *</Text>
        <TextInput
          style={styles.input}
          value={cardRequired}
          onChangeText={setCardRequired}
          placeholder="e.g., Amex Platinum"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Instant Status</Text>
        <Switch
          value={isInstant}
          onValueChange={setIsInstant}
          trackColor={{ false: '#767577', true: Theme.colors.primary }}
          thumbColor={isInstant ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Key Benefit *</Text>
        <TextInput
          style={styles.input}
          value={keyBenefit}
          onChangeText={setKeyBenefit}
          placeholder="e.g., 25% bonus points"
          placeholderTextColor={Theme.colors.text.tertiary}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Status Tier</Text>
        <View style={styles.tierButtons}>
          {(['Silver', 'Gold', 'Platinum', 'Diamond', 'Other'] as const).map((tier) => (
            <TouchableOpacity
              key={tier}
              style={[
                styles.tierButton,
                statusTier === tier && styles.tierButtonActive,
              ]}
              onPress={() => setStatusTier(tier)}
            >
              <Text
                style={[
                  styles.tierButtonText,
                  statusTier === tier && styles.tierButtonTextActive,
                ]}
              >
                {tier}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )

  const renderTypeSpecificFields = () => {
    switch (contentType) {
      case ContentType.SPEND_OFFER:
        return renderSpendOfferFields()
      case ContentType.LTF_CARD:
        return renderLTFCardFields()
      case ContentType.PREMIUM_CAMPAIGN:
        return renderPremiumCampaignFields()
      case ContentType.STACKING_HACK:
        return renderStackingHackFields()
      case ContentType.TRANSFER_BONUS:
        return renderTransferBonusFields()
      case ContentType.STATUS_OFFER:
        return renderStatusOfferFields()
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditMode ? 'Edit Content' : 'Create New Content'}
          </Text>
        </View>

        {!isEditMode && renderTypeSelector()}
        {renderCommonFields()}
        {renderTypeSpecificFields()}

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              {isEditMode ? 'Update' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
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
  },
  section: {
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  field: {
    marginBottom: Theme.spacing.md,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  label: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
    fontWeight: '600',
  },
  input: {
    ...Theme.typography.body,
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    color: Theme.colors.text.primary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  typeButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  typeButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  typeButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  difficultyButton: {
    flex: 1,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  difficultyButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.text.secondary,
  },
  difficultyButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tierButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  tierButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  tierButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  tierButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.text.secondary,
  },
  tierButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  button: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  cancelButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.text.primary,
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
  },
  saveButtonText: {
    ...Theme.typography.button,
    color: '#FFFFFF',
  },
})
