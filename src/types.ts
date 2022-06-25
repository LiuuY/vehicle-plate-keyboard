import React from 'react';

export interface KeyboardProps {
  visible: boolean;
  done: () => void;
  onChange?: (text: string) => void;
  confirmButtonStyle?: React.CSSProperties;
  cellTextStyle?: React.CSSProperties;
  value: string;
  confirmButtonText?: string;
}
