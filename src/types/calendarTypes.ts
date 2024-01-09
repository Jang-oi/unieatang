/**
 * title: 일정 제목 (당번),
 * color: 일정 색상,
 * type : 일정 타입 (마트, 일정 등)
 * allDay : 종일인지
 * start: 시작 날짜 (당번일),
 * end?: 끝 날짜,
 */
export interface UniCalendarType {
  _id: string;
  title: string;
  start: string;
  type: string;
  allDay?: boolean;
  end?: string;
  color?: string;
}
