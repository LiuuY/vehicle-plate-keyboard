import React from 'react';

export interface KeyboardProps {
  visible: boolean;
  done: () => void;
  onChange?: (text: string) => void;
  confirmButtonStyle?: React.CSSProperties;
  cellTextStyle?: React.CSSProperties;
  value?: string;
  confirmButtonText?: string;
  safeArea?: boolean;
}

export interface KeyboardState {
  showKeyboard: boolean;
  keyboardOffsetProgress: number;
}

export interface KeyboardCellProps {
  cell: string;
  cellTextStyle?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (cell: string) => void;
  type: keyboardCellType;
}

export type keyboardCellType = 'province' | 'normal' | 'character';
