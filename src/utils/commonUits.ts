import {MenuTypes} from '../types/menuTypes';

export function openNewTab(url: string) {
  const newTab = window.open(url, '_blank');
  if (newTab) {
    newTab.focus();
  } else {
    console.error('팝업이 차단되었거나 새 탭을 열 수 없습니다.');
  }
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

type removeArr = {
  [key: string]: string;
};

export const removeDuplicates = (array: removeArr[], key: string) => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
};

export const getColorWithTheme = (theme: string) => {
  switch (theme) {
    case 'neutral':
      return {fontColor: '#171A1C', bgColor: '#FBFCFE'};
    case 'primary':
      return {fontColor: '#FFFFFF', bgColor: '#185EA5'};
    case 'danger':
      return {fontColor: '#FFFFFF', bgColor: '#A51818'};
    case 'success':
      return {fontColor: '#FFFFFF', bgColor: '#136C13'};
    case 'warning':
      return {fontColor: '#FFFFFF', bgColor: '#72430D'};
    default:
      return {fontColor: '#171A1C', bgColor: '#555E68'};
  }
};

export const menuData: MenuTypes[] = [
  {menu: 'Interview Quiz', url: '/'},
];

export const bottomMenuData: MenuTypes[] = [
];

export const dbOptionData: {optionValue: string}[] = [{optionValue: 'Quiz'}, {optionValue: 'Customer'}, {optionValue: 'Holiday'}];
