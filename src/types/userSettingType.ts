/**
 * themeColor: 테마 색상;
 * bgColor?: 배경 색;
 * fontColor?: 폰트 색;
 */
export type userSettingType = {
  themeColor: 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | undefined;
  bgColor: string;
  fontColor: string;
};
