import {MenuTypes} from "../types/menuTypes";

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

export const menuData: MenuTypes[] = [
    {menu: 'Home', url: '/'},
    {menu: 'HyperV', url: '/HyperV'},
    {menu: 'Interview Quiz', url: '/InterviewQuiz'},
    {menu: 'Calendar', url: '/Calendar'},
    {menu: 'Lab', childMenu: ['DB_TEST'], childUrl: ['/lab/dbtest']},
    {menu: 'Settings', url: '/Settings'}
];

export const bottomMenuData: MenuTypes[] = [
    {menu: 'Support', url: 'https://114.unipost.co.kr:8543/'},
    {menu: 'GroupWare', url: 'https://unipost.hanbiro.net/'},
    {menu: 'Git Lab', url: 'http://unidocu/gitlab/'},
    {menu: 'RedMine', url: 'https://unidocu.unipost.co.kr/redmine/'},
    {menu: 'Real Grid', url: 'https://service.realgrid.com/'}
]
