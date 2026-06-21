import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { theme } from '../constants/theme';

interface CardActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

interface CardProps extends CardActionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style, onEdit, onDelete }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>{children}</View>
      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
              <Ionicons name="pencil" size={20} color={theme.colors.subtext} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
              <Ionicons name="trash" size={20} color={theme.colors.error} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  actionBtn: {
    padding: theme.spacing.sm,
  },
});