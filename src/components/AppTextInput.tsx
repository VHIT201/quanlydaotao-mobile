import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

export interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  password?: boolean;
  disabled?: boolean;
  maxLength?: number;
  multiline?: boolean;
  inputType?: 'text' | 'email' | 'phone' | 'number';
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  password,
  disabled,
  maxLength,
  multiline,
  inputType = 'text',
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Keyboard type
  let keyboardType: TextInputProps['keyboardType'] = 'default';
  if (inputType === 'email') keyboardType = 'email-address';
  if (inputType === 'phone') keyboardType = 'phone-pad';
  if (inputType === 'number') keyboardType = 'numeric';

  return (
    <View style={styles.wrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrap, error && styles.inputWrapError, disabled && styles.inputWrapDisabled]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          {...props}
          style={[styles.input, password && styles.inputPassword, leftIcon && {paddingLeft: 44}, rightIcon && {paddingRight: 44}, style]}
          secureTextEntry={password && !showPassword}
          editable={!disabled}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          placeholderTextColor="#94a3b8"
          accessibilityLabel={label}
        />
        {password ? (
          <TouchableOpacity
            style={styles.eyeBtnAbs}
            onPress={() => setShowPassword(v => !v)}
            activeOpacity={0.7}
            accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>
      {helper && !error && <Text style={styles.helper}>{helper}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { width: '100%', marginBottom: 18 },
  label: { fontWeight: '700', color: '#0f172a', marginBottom: 6, fontSize: 15 },
  inputWrap: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6eefc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapError: { borderColor: '#ef4444' },
  inputWrapDisabled: { backgroundColor: '#f1f5f9' },
  input: {
    flex: 1,
    padding: 13,
    fontSize: 16,
    color: '#0f172a',
  },
  inputPassword: { paddingRight: 44 },
  leftIcon: { position: 'absolute', left: 8, top: 0, height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  rightIcon: { position: 'absolute', right: 8, top: 0, height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  eyeBtnAbs: {
    position: 'absolute',
    right: 8,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    padding: 8,
    zIndex: 2,
  },
  helper: { color: '#64748b', fontSize: 13, marginTop: 4 },
  error: { color: '#ef4444', fontWeight: '700', marginTop: 4, fontSize: 13 },
});

export default AppTextInput;
