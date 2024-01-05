/**
 * id : 고유 식별 값
 * customer : 고객사
 * hostName : 호스트 네임
 * isConnect : 사용 여부
 * clientHostName : 접속자 HostName
 * currentTime : 접속 시간
 */
export type HyperVBoardColumn = {
  id: number;
  customer: string;
  hostName: string;
  isConnect: boolean;
  clientHostName: string;
  currentTime: string;
};
