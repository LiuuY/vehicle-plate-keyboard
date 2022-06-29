import React from 'react';

export interface KeyboardProps {
  visible: boolean;
  value: string;
  done: () => void;
  onChange?: (text: string) => void;
  confirmButtonStyle?: React.CSSProperties;
  cellTextStyle?: React.CSSProperties;
  confirmButtonText?: string;
}
