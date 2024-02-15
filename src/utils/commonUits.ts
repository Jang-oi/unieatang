import { MenuTypes } from '../types/menuTypes';

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
      return { fontColor: '#171A1C', bgColor: '#FBFCFE' };
    case 'primary':
      return { fontColor: '#FFFFFF', bgColor: '#185EA5' };
    case 'danger':
      return { fontColor: '#FFFFFF', bgColor: '#A51818' };
    case 'success':
      return { fontColor: '#FFFFFF', bgColor: '#136C13' };
    case 'warning':
      return { fontColor: '#FFFFFF', bgColor: '#72430D' };
    default:
      return { fontColor: '#171A1C', bgColor: '#555E68' };
  }
};

export const menuData: MenuTypes[] = [
  { menu: 'Home', url: '/' },
  { menu: 'HyperV', url: '/HyperV' },
  { menu: 'Customer List', url: '/CustomerList' },
  { menu: 'License', url: '/License' },
  { menu: 'Calendar', url: '/Calendar' },
  {
    menu: 'Interview Quiz',
    childMenu: ['Quiz', 'SubmitList'],
    childUrl: ['/InterviewQuiz/quiz', '/InterviewQuiz/submitList'],
  },
  { menu: 'Lab', childMenu: ['DB'], childUrl: ['/Lab/db'] },
  { menu: 'Settings', url: '/Settings' },
];

export const bottomMenuData: MenuTypes[] = [
  { menu: 'Support', url: 'https://114.unipost.co.kr:8543/' },
  { menu: 'GroupWare', url: 'https://unipost.hanbiro.net/' },
  { menu: 'Git Lab', url: 'http://unidocu/gitlab/' },
  { menu: 'RedMine', url: 'https://unidocu.unipost.co.kr/redmine/' },
  { menu: 'Real Grid', url: 'https://service.realgrid.com/' },
];

export const dbOptionData: { optionValue: string }[] = [
  { optionValue: 'Quiz' },
  { optionValue: 'Customer' },
  { optionValue: 'Holiday' },
];

export const customerTypeOptionData: { _id: string; type: string; text: string }[] = [
  { _id: '99', type: '99', text: '전체' },
  { _id: '1', type: '01', text: '1팀' },
  { _id: '2', type: '02', text: '2팀' },
  { _id: '3', type: '03', text: '3팀' },
  { _id: '4', type: '04', text: '4팀' },
];
