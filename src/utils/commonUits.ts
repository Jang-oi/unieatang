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

export const emptyObject = (object: Record<string, any>) => {
  return Object.entries(object).length === 0;
};

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
  { menu: 'HyperV', url: '/' },
  { menu: 'OTP List', url: '/OtpList' },
  { menu: 'Customer List', url: '/CustomerList' },
  { menu: 'License', url: '/License' },
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
  { optionValue: 'User' },
];

export const customerTypeOptionData: { _id: string; type: string; text: string }[] = [
  { _id: '99', type: '99', text: '전체' },
  { _id: '1', type: '01', text: '1팀' },
  { _id: '2', type: '02', text: '2팀' },
  { _id: '3', type: '03', text: '3팀' },
  { _id: '4', type: '04', text: '4팀' },
];

export const otpListData = [
  { customer: 'PI첨단소재', secret: 'DLYATX7ORBQJ45HG', mobile: 3, user: 'web', team: '2' },
  { customer: 'FNU', secret: 'LBJEOTCKGY3EOUKPINCVCUSTIU', mobile: 3, user: '200624_1' },
  { customer: 'SK스토아', secret: 'AWCT76FED6PBJUJJ', mobile: 3, user: 'SAP1002' },
  { customer: 'SK스토아', secret: 'BNCR7FFYWD6OKZRJ', mobile: 3, user: 'SAP1003' },
  { customer: 'SK스토아', secret: 'OV3MHCXDU35AOWCT', mobile: 3, user: 'SAP1004' },
  { customer: '11번가', secret: '47NQJAWXLWSZ2CWI', mobile: 3, user: 'PP00449' },
  { customer: '한화케미칼', secret: '6B4ZATPBWVBLFRMA', mobile: 3, user: 'jaehyun.k' },
  { customer: '오뚜기', secret: 'PEZU2NDBGI2DMVTR', mobile: 3, user: 'sap10' },
  {
    customer: '경동',
    secret: '5KXAXDG5JZNECFL4CPQY6VOBDJ7EZWBAQUY3ZHKUPPIHQV7YVG22KS2234CYENPU',
    mobile: 3,
    user: 'Amazon_Web_Services',
  },
  { customer: '네트웍스', secret: 'K5JUETKGIJHUSSZXJ5GFGVKKGU', mobile: 3, user: 'SKNETWORKS-91112216' },
  { customer: '보령', secret: 'SOXBEJ5OMGVZEDQS', mobile: 3, user: 'unipost1' },
  { customer: '보령', secret: 'GPGQJU5X6OFD4UP5', mobile: 3, user: 'unipost2' },
  { customer: '엘오티베큠', secret: 'HFAHASR6SJMYTF3ZVVTOZSLXVOGR6FZK', mobile: 3, user: 'unipost6' },
  { customer: '엘오티베큠', secret: 'FXDOLE4QJ4BYI6C2I7G4SHMVWW7ARLII', mobile: 3, user: 'unipost7' },
  { customer: '엘오티베큠', secret: 'OPOLQE6YEUEGASTZVL56KS6MG6RLDTPG', mobile: 3, user: 'unipost8' },
  { customer: '엘오티베큠', secret: 'OL4K343DACKTMWNUORCOR4OUL2DZOBK3', mobile: 3, user: 'unipost9' },
  { customer: '에센코어', secret: 'GRIDMMRTJNIE2WSFGRJEUWJVLE', mobile: 3, user: 'ESNSVPN01' },
  { customer: '무신사', secret: 'KRLE4VCEKVHDKQKLIFNEGUSYKM', mobile: 3, user: 'mssvpn.corp.musinsa' },
  { customer: '캐논', secret: 'LJLTMMSOJBDTORJXGMZTGQSOJQ', mobile: 2, user: 'DEV006' },
  {
    customer: '아모레퍼시픽',
    secret: 'JNLTKU2ZKBEU2SZSIRDTMNCHLJCUGQKE',
    mobile: 2,
    user: 'AC931418@stg-pam.amorepacific.com',
  },
  {
    customer: 'Amazon Web Services',
    secret: 'FWVXA3U4OKTX6MHQK6DAMZMUWFYLHFHC2PIQKGXB3KWHTEFYCXNE3TG6WMZ44M2J',
    mobile: 2,
    user: 'aws_etax@756456552999',
  },
  { customer: '아모레퍼시픽', secret: '52OKVQO6JBTUEAEZ', mobile: 2, user: 'AC913715' },
  {
    customer: '아모레퍼시픽',
    secret: 'K5MFCQSTIFBFCSCXGU2VOU2YKYZU4MZS',
    mobile: 2,
    user: 'AC931418@prd-pem.amorepacific.com',
  },
  { customer: '11번가 OTP', secret: '6RIXSL64SMNLTM25', mobile: 2, user: 'PP23171' },
  { customer: '아모레퍼시픽', secret: 'IFBTSMJTG4YTKQLNN5ZGKLKHN5XWO3DFFVHVIUA', mobile: 2, user: 'AC913715' },
  { customer: '아모레퍼시픽', secret: '3LMZE2CDXZD7AZLB', mobile: 2, user: 'AC931418' },
  { customer: '??', secret: '4L7UVDVYT3FFJSD6WAYZJ57XU7TNNFM6', mobile: '?', user: '헬로베어' },
  { customer: '42dot.okta.com', secret: 'SF4ZGWWQ4YPX2FL4', mobile: 3, user: 'younghoon.jang@42dot.io' },
  { customer: 'SK스퀘어', secret: 'KP6BKPUTKMTR5MX3', mobile: 5, user: 'Q00440' },
  { customer: '티맵', secret: 'CS6LQ3ZLPDM5INBJ', mobile: 5, user: 'server_tmap' },
  { customer: '캐논', secret: 'GJFVASSWLBFUUTJTGJMVIRJUGM', mobile: 5, user: 'dev005' },
  { customer: 'SK스퀘어', secret: 'SGSSEZ4QKWSXWPPY', mobile: 5, user: 'Q00439' },
  { customer: '롯데알미늄', secret: 'JA2U4NSTJRIUSQSCJNFFEWKWGY', mobile: 5, user: 'LANIS-DOM-unipost_usr2' },
  { customer: '롯데알미늄', secret: 'GZMDEQKBK5HTKSSGJZKEIT2QKI', mobile: 3, user: 'LANIS-DOM-unipost_usr1' },
  { customer: '유베이스', secret: '2D3QQWWA5QQTFRFI', mobile: 3, user: 'uni005-SecuwaySSL' },
];

export const BASE_URL = 'http://192.168.12.199';
