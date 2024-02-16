import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { customerCRUDModalState } from '../../recoil/db/atom';
import LoadingComponent from '../common/LoadingComponent';
import {
  Box,
  Button,
  DialogTitle,
  Input,
  Modal,
  ModalDialog,
  Option,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  Typography,
} from '@mui/joy';
import { userSettingState } from '../../recoil/settings/atom';
import {
  READ_CUSTOMER_LIST,
  useCustomerListMutation,
  useCustomerListQuery,
} from '../../hooks/dbQuerys/useCustomerList';
import { SnackbarType } from '../common/UniSnackbar';
import { snackbarState } from '../../recoil/snackbar/atom';
import { useQueryClient } from '@tanstack/react-query';
import { customerTypeOptionData, emptyObject } from '../../utils/commonUits';

interface CustomerData {
  [key: string]: string;
}

const CustomerCRUDModal = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const [customerCURDModal, setCustomerCURDModal] = useRecoilState(customerCRUDModalState);
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);

  const queryClient = useQueryClient();
  const onSuccessFn = (response: any) => {
    setCustomerCURDModal({ createMode: false, showModal: false, customerData: {} });
    queryClient.invalidateQueries({ queryKey: [READ_CUSTOMER_LIST] });
    setSnackbarOption({ ...snackbarOption, open: true, message: response.returnMessage });
  };
  const { createMode, showModal, customerData } = customerCURDModal as any;
  const { mutate } = useCustomerListMutation({ onSuccessFn });

  const initialCustomerData = {
    _id: '',
    team: '',
    code: '',
    text: '',
    type: '',
    version: '',
    sshType: '',
    ip: '',
  };
  const [customerInput, setCustomerInput] = useState<CustomerData>(initialCustomerData);

  const [typeOption, setTypeOption] = useState<string>('전체');
  const onTypeHandler = (event: any, optionValue: string | null) => {
    if (optionValue) {
      setTypeOption(optionValue);
      setCustomerInput({ ...customerInput, team: optionValue.replace('팀', '') });
    }
  };

  const onCustomerInputHandler = (event: any) => {
    const { id, value } = event.currentTarget;
    setCustomerInput({ ...customerInput, [id]: value });
  };

  const filterCustomerTypeData = customerTypeOptionData.filter((item) => item.text !== '전체');

  useEffect(() => {
    if (emptyObject(customerData)) {
      setCustomerInput(initialCustomerData);
    } else {
      setCustomerInput({ ...customerInput, ...customerData });
    }
    setTypeOption(`${customerData.team}팀`);
  }, [customerData]);

  const isCustomerDataValidate = (inputData: CustomerData): boolean => {
    for (const key in inputData) {
      if (key !== '_id' && inputData[key] === '') {
        return false;
      }
    }
    return true;
  };

  const onCustomerCreateHandler = (event: any) => {
    if (!isCustomerDataValidate(customerInput)) {
      setSnackbarOption({ ...snackbarOption, open: true, message: '입력되지 않은 값이 존재합니다.' });
    } else {
      const buttonId = event.target.id;
      if (buttonId === 'create') delete customerInput['_id'];
      mutate({ type: buttonId === 'create' ? 'C' : 'U', data: { tableData: [customerInput] } });
    }
  };

  const onCustomerDeleteHandler = () => {
    mutate({
      type: 'D',
      data: {
        tableData: [
          {
            id: customerData._id,
          },
        ],
      },
    });
  };

  const buttonRender = () => {
    if (createMode) {
      return (
        <Button type="submit" color={themeColor} id={'create'} onClick={onCustomerCreateHandler}>
          Create
        </Button>
      );
    } else {
      return (
        <>
          <Button type="submit" color={themeColor} id={'update'} onClick={onCustomerCreateHandler}>
            Update
          </Button>
          <Button type="submit" color={themeColor} id={'delete'} onClick={onCustomerDeleteHandler}>
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <Modal open={showModal} onClose={() => setCustomerCURDModal({ ...customerCURDModal, showModal: false })}>
      <ModalDialog>
        <DialogTitle>{createMode ? '고객사 추가' : '고객사 수정 및 삭제'}</DialogTitle>
        <Stack spacing={2}>
          <Select
            value={typeOption}
            sx={{ width: '30vw', mb: '40px' }}
            onChange={onTypeHandler}
            placeholder={'팀을 선택 해주세요.'}
          >
            {filterCustomerTypeData &&
              filterCustomerTypeData.map((optionItem, optionIndex) => (
                <Option key={optionItem._id} value={optionItem.text}>
                  {optionItem.text}
                </Option>
              ))}
          </Select>
          <Input
            sx={{ width: '40vw' }}
            placeholder={'코드를 입력해주세요.'}
            id={'code'}
            value={customerInput.code}
            onChange={onCustomerInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'고객사명를 입력해주세요.'}
            id={'text'}
            value={customerInput.text}
            onChange={onCustomerInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'버전을 입력해주세요.'}
            id={'version'}
            value={customerInput.version}
            onChange={onCustomerInputHandler}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontSize="sm">운영 종류 :</Typography>
            <RadioGroup orientation="horizontal" value={customerInput.type} onChange={onCustomerInputHandler}>
              <Radio id={'type'} value="M" label="운영" color={themeColor} />
              <Radio id={'type'} value="S" label="월 계약 업체" color={themeColor} />
              {/*<Radio value="?" label="하자보수" color={themeColor} />*/}
            </RadioGroup>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontSize="sm">SSH 사용 유무 :</Typography>
            <RadioGroup orientation="horizontal" value={customerInput.sshType} onChange={onCustomerInputHandler}>
              <Radio id={'sshType'} value="Y" label="사용" color={themeColor} />
              <Radio id={'sshType'} value="N" label="미사용" color={themeColor} />
            </RadioGroup>
          </Box>
          <Input
            sx={{ width: '40vw' }}
            placeholder={'IP를 입력해주세요.'}
            id={'ip'}
            value={customerInput.ip}
            onChange={onCustomerInputHandler}
          />
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px' }}>{buttonRender()}</Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
interface CustomerTableProps {
  currentTypeOption: string;
}

const CustomerTable = ({ currentTypeOption }: CustomerTableProps) => {
  const setCustomerModal = useSetRecoilState(customerCRUDModalState);
  const [filteredCustomerData, setFilteredCustomerData] = useState([]);
  const { isLoading, data } = useCustomerListQuery();

  useEffect(() => {
    if (currentTypeOption && data) {
      const customerData = data.data.tableData;

      if (currentTypeOption === '전체') {
        setFilteredCustomerData(customerData);
      } else {
        setFilteredCustomerData(customerData.filter((item: any) => item.team === currentTypeOption.replace('팀', '')));
      }
    }
  }, [currentTypeOption, data]);

  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <Table sx={{ mt: '30px', textAlign: 'center', fontSize: '15px', width: '73vw' }} borderAxis="both" stickyHeader>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>팀</th>
            <th style={{ width: '10%' }}>코드</th>
            <th style={{ width: '20%' }}>고객사명</th>
            <th style={{ width: '5%' }}>타입</th>
            <th style={{ width: '10%' }}>버전</th>
            <th style={{ width: '10%' }}>SSH 사용 유무</th>
            <th style={{ width: '10%' }}>IP</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomerData &&
            filteredCustomerData.map((customerItem: any) => (
              <tr key={customerItem._id}>
                <td>{customerItem.team}</td>
                <td
                  style={{ color: '#0079F4', cursor: 'pointer' }}
                  onClick={() =>
                    setCustomerModal({
                      createMode: false,
                      showModal: true,
                      customerData: customerItem,
                    })
                  }
                >
                  {customerItem.code}
                </td>
                <td>{customerItem.text}</td>
                <td>{customerItem.type === 'M' ? '운영' : '월 계약'}</td>
                <td>{customerItem.version}</td>
                <td>{customerItem.sshType === 'Y' ? '시용' : '미사용'}</td>
                <td>{customerItem.ip}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

const CustomerTemplate = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const [typeOption, setTypeOption] = useState<string>('전체');
  const setCustomerModal = useSetRecoilState(customerCRUDModalState);

  const onTypeHandler = (event: any, optionValue: string | null) => {
    if (optionValue) setTypeOption(optionValue);
  };

  return (
    <>
      <Button
        color={themeColor}
        id={'create'}
        onClick={() => {
          setCustomerModal({ createMode: true, showModal: true, customerData: {} });
        }}
      >
        Create
      </Button>
      <Select value={typeOption} sx={{ width: '30vw', mt: '40px' }} onChange={onTypeHandler}>
        {customerTypeOptionData &&
          customerTypeOptionData.map((optionItem, optionIndex) => (
            <Option key={optionIndex} value={optionItem.text}>
              {optionItem.text}
            </Option>
          ))}
      </Select>
      <CustomerTable currentTypeOption={typeOption} />
      <CustomerCRUDModal />
    </>
  );
};

export default CustomerTemplate;
