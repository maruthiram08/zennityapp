/**
 * OfferForm Component - Form for creating and editing offers
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '../../constants/Theme';
import Button from '../Button';
import {
  Offer,
  CreateOfferInput,
  Partner,
  PartnerType,
  OfferLink,
} from '../../models/Offer';

interface OfferFormProps {
  offer?: Offer;
  onSubmit: (data: CreateOfferInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const OfferForm: React.FC<OfferFormProps> = ({
  offer,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState(offer?.title || '');
  const [shortDescription, setShortDescription] = useState(
    offer?.shortDescription || ''
  );
  const [fullDescription, setFullDescription] = useState(
    offer?.fullDescription || ''
  );
  const [expiryDate, setExpiryDate] = useState(
    offer?.expiryDate ? new Date(offer.expiryDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [links, setLinks] = useState<OfferLink[]>(offer?.links || []);
  const [partners, setPartners] = useState<Partner[]>(offer?.partners || []);
  const [category, setCategory] = useState(offer?.category || '');
  const [tags, setTags] = useState<string[]>(offer?.tags || []);
  const [imageUrl, setImageUrl] = useState(offer?.imageUrl || '');

  // Link form state
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [linkType, setLinkType] = useState<OfferLink['type']>('website');

  // Partner form state
  const [partnerName, setPartnerName] = useState('');
  const [partnerType, setPartnerType] = useState<PartnerType>(PartnerType.BANK);

  const handleAddLink = () => {
    if (linkUrl && linkLabel) {
      setLinks([...links, { url: linkUrl, label: linkLabel, type: linkType }]);
      setLinkUrl('');
      setLinkLabel('');
      setLinkType('website');
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleAddPartner = () => {
    if (partnerName) {
      const newPartner: Partner = {
        id: Date.now().toString(),
        name: partnerName,
        type: partnerType,
      };
      setPartners([...partners, newPartner]);
      setPartnerName('');
      setPartnerType(PartnerType.BANK);
    }
  };

  const handleRemovePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    const data: CreateOfferInput = {
      title,
      shortDescription,
      fullDescription: fullDescription || undefined,
      links,
      expiryDate,
      partners,
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
      imageUrl: imageUrl || undefined,
    };

    onSubmit(data);
  };

  const isValid =
    title.trim() &&
    shortDescription.trim() &&
    links.length > 0 &&
    partners.length > 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Title <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter offer title"
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>

      {/* Short Description */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Short Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={shortDescription}
          onChangeText={setShortDescription}
          placeholder="Brief description for card display"
          placeholderTextColor={Theme.colors.textTertiary}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Full Description */}
      <View style={styles.section}>
        <Text style={styles.label}>Full Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={fullDescription}
          onChangeText={setFullDescription}
          placeholder="Detailed description"
          placeholderTextColor={Theme.colors.textTertiary}
          multiline
          numberOfLines={5}
        />
      </View>

      {/* Expiry Date */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Expiry Date <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={Theme.colors.primary}
          />
          <Text style={styles.dateText}>{expiryDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={expiryDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) {
                setExpiryDate(selectedDate);
              }
            }}
            minimumDate={new Date()}
          />
        )}
      </View>

      {/* Links Section */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Links <Text style={styles.required}>*</Text>
        </Text>

        {/* Add Link Form */}
        <View style={styles.addForm}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            value={linkLabel}
            onChangeText={setLinkLabel}
            placeholder="Label (e.g., Apply Now)"
            placeholderTextColor={Theme.colors.textTertiary}
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            value={linkUrl}
            onChangeText={setLinkUrl}
            placeholder="URL"
            placeholderTextColor={Theme.colors.textTertiary}
            autoCapitalize="none"
            keyboardType="url"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddLink}>
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Links List */}
        {links.map((link, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialCommunityIcons
                name="link"
                size={16}
                color={Theme.colors.primary}
              />
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{link.label}</Text>
                <Text style={styles.listItemSubtitle} numberOfLines={1}>
                  {link.url}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveLink(index)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={Theme.colors.error}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Partners Section */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Partners <Text style={styles.required}>*</Text>
        </Text>

        {/* Add Partner Form */}
        <View style={styles.addForm}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            value={partnerName}
            onChangeText={setPartnerName}
            placeholder="Partner name"
            placeholderTextColor={Theme.colors.textTertiary}
          />
          <View style={[styles.input, styles.picker]}>
            <Text style={styles.pickerText}>{partnerType}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPartner}>
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Partners List */}
        {partners.map((partner) => (
          <View key={partner.id} style={styles.listItem}>
            <View style={styles.listItemContent}>
              <MaterialCommunityIcons
                name="handshake"
                size={16}
                color={Theme.colors.primary}
              />
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{partner.name}</Text>
                <Text style={styles.listItemSubtitle}>{partner.type}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemovePartner(partner.id)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={Theme.colors.error}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Category */}
      <View style={styles.section}>
        <Text style={styles.label}>Category (Optional)</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g., Credit Cards, Travel, Dining"
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>

      {/* Image URL */}
      <View style={styles.section}>
        <Text style={styles.label}>Image URL (Optional)</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://example.com/image.jpg"
          placeholderTextColor={Theme.colors.textTertiary}
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Button
          text="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          text={offer ? 'Update Offer' : 'Create Offer'}
          onPress={handleSubmit}
          disabled={!isValid || isSubmitting}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    ...Theme.typography.label,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
    fontWeight: '600',
  },
  required: {
    color: Theme.colors.error,
  },
  input: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.typography.body,
    color: Theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  smallInput: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    gap: Theme.spacing.sm,
  },
  dateText: {
    ...Theme.typography.body,
    color: Theme.colors.textPrimary,
  },
  addForm: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    justifyContent: 'center',
    width: 100,
  },
  pickerText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
  },
  listItemText: {
    flex: 1,
  },
  listItemTitle: {
    ...Theme.typography.body,
    color: Theme.colors.textPrimary,
    fontWeight: '600',
  },
  listItemSubtitle: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  buttons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  button: {
    flex: 1,
  },
});

export default OfferForm;
