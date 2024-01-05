/**
 * type : 'C','R','U','D'
 * name : fetch ID, 서버 호출 네이밍 
 * data : 서버 호출 파라미터
 */
export type RequestAxiosTypes = {
    type: string;
    name: string;
    data?: RequestAxiosData;
}

/**
 * tableData : 배열 형태 파라미터
 * [key: string] : any 키 배열 형태의 파라미터
 */
interface RequestAxiosData {
    tableData?: [];
    [key: string]: any;
}

export interface ResponseAxiosTypes {
    returnErrorCode: '';
    returnErrorMessage: '';
    returnMessage: '',
    data: {
        tableData: any[];
        [key: string]: any;
    }
}