/**
 * menu 메뉴명
 * url 메뉴에 해당하는 URL
 * childMenu 하위 메뉴명
 * childUrl 하위 메뉴 URL
 */
export type MenuTypes = {
  menu: string;
  url?: string;
  childMenu?: string[];
  childUrl?: string[];
};
