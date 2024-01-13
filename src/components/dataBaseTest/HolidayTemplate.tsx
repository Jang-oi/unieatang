import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { READ_HOLIDAY, useHolidayMutation, useHolidayQuery } from '../../hooks/dbQuerys/useHoliday';
import { UniCalendarType } from '../../types/calendarTypes';
import { userSettingState } from '../../recoil/settings/atom';
import { holidayCRUDModalState } from '../../recoil/db/atom';
import { formatDate } from '../../utils/commonUits';

import { Box, Button, DialogTitle, FormLabel, Input, Modal, ModalDialog, Table } from '@mui/joy';

import LoadingComponent from '../common/LoadingComponent';

const HolidayTable = () => {
  const setHolidayCURDModal = useSetRecoilState(holidayCRUDModalState);

  const { isLoading, data } = useHolidayQuery();
  if (isLoading) return <LoadingComponent />;
  const holidayData = data.data;

  return (
    <Table sx={{ marginTop: '30px' }}>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>START</th>
          <th>END</th>
        </tr>
      </thead>
      <tbody>
        {holidayData &&
          holidayData.tableData.map((holidayItem: UniCalendarType) => (
            <tr key={holidayItem._id}>
              <td
                style={{ color: '#0079F4', cursor: 'pointer' }}
                onClick={() =>
                  setHolidayCURDModal({
                    createMode: false,
                    showModal: true,
                    holidayData: holidayItem,
                  })
                }
              >
                {holidayItem.title}
              </td>
              <td>{holidayItem.start}</td>
              <td>{holidayItem.end}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const HolidayCRUDModal = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const [holidayCURDModal, setHolidayCURDModal] = useRecoilState(holidayCRUDModalState);

  const queryClient = useQueryClient();
  const onSuccessFn = (response: any) => {
    setHolidayCURDModal({ createMode: false, showModal: false, holidayData: {} });
    queryClient.invalidateQueries({ queryKey: [READ_HOLIDAY] });
    alert(response.returnMessage);
  };

  const { createMode, showModal, holidayData } = holidayCURDModal as any;
  const { mutate } = useHolidayMutation({ onSuccessFn });

  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (holidayData) {
      setFromDate(holidayData.start || formatDate(new Date()));
      setToDate(holidayData.end || formatDate(new Date()));
      setTitle(holidayData.title || '');
    }
  }, [holidayData]);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event: any) => {
    const { id, value } = event.target;
    switch (id) {
      case 'fromDate':
        setFromDate(value);
        break;
      case 'toDate':
        setToDate(value);
        break;
      default:
        break;
    }
  };

  const onHolidayCreateHandler = () => {
    mutate({
      type: 'C',
      data: {
        tableData: [
          {
            start: fromDate,
            end: toDate,
            title,
          },
        ],
      },
    });
  };

  const onHolidayDeleteHandler = () => {
    mutate({
      type: 'D',
      data: {
        tableData: [
          {
            id: holidayData._id,
          },
        ],
      },
    });
  };

  const buttonRender = () => {
    if (createMode) {
      return (
        <Button type="submit" color={themeColor} id={'create'} onClick={onHolidayCreateHandler}>
          Create
        </Button>
      );
    } else {
      return (
        <>
          {/*          <Button type="submit" color={color} id={'update'} onClick={onQuizUpdateHandler}>
            Update
          </Button>*/}
          <Button type="submit" color={themeColor} id={'delete'} onClick={onHolidayDeleteHandler}>
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <Modal open={showModal} onClose={() => setHolidayCURDModal({ ...holidayCURDModal, showModal: false })}>
      <ModalDialog>
        <DialogTitle>{createMode ? '공휴일 추가' : '공휴일 수정 및 삭제'}</DialogTitle>
        <FormLabel>From</FormLabel>
        <Input type="date" id="fromDate" sx={{ width: '15vw' }} value={fromDate} onChange={handleDateChange} />
        <FormLabel>To</FormLabel>
        <Input type="date" id="toDate" sx={{ width: '15vw' }} value={toDate} onChange={handleDateChange} />
        <Input
          placeholder="타이틀을 입력해주세요."
          name="Name"
          fullWidth
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
        />
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px' }}>{buttonRender()}</Box>
      </ModalDialog>
    </Modal>
  );
};

const HolidayTemplate = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const setHolidayCURDModal = useSetRecoilState(holidayCRUDModalState);

  return (
    <>
      <Button
        color={themeColor}
        id={'create'}
        onClick={() => {
          setHolidayCURDModal({ createMode: true, showModal: true, holidayData: {} });
        }}
      >
        Create
      </Button>
      <HolidayTable />
      <HolidayCRUDModal />
    </>
  );
};

export default HolidayTemplate;
