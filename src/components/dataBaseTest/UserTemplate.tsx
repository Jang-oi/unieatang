import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  useInterviewQuizQuery,
  READ_INTERVIEW_QUIZ,
  useInterviewQuizMutation,
} from '../../hooks/dbQuerys/useInterviewQuiz';
import { InterviewQuizType } from '../../types/interviewQuizType';
import { useInterviewQuizTypesQuery } from '../../hooks/dbQuerys/useInterviewQuizTypes';
import { userSettingState } from '../../recoil/settings/atom';
import { customerCRUDModalState, interviewQuizCRUDModalState, userCRUDModalState } from '../../recoil/db/atom';

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
  Textarea,
  Typography,
} from '@mui/joy';

import LoadingComponent from '../common/LoadingComponent';
import { SnackbarType } from '../common/UniSnackbar';
import { snackbarState } from '../../recoil/snackbar/atom';
import { READ_USER, useUserMutation, useUserQuery } from '../../hooks/dbQuerys/useUser';
import { UserType } from '../../types/userType';
import { READ_CUSTOMER_LIST, useCustomerListMutation } from '../../hooks/dbQuerys/useCustomerList';
import { customerTypeOptionData, emptyObject } from '../../utils/commonUits';

interface UserData {
  [key: string]: string;
}

const UserCRUDModal = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const [userCURDModal, setUserCURDModal] = useRecoilState(userCRUDModalState);
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);

  const queryClient = useQueryClient();
  const onSuccessFn = (response: any) => {
    setUserCURDModal({ createMode: false, showModal: false, userData: {} });
    queryClient.invalidateQueries({ queryKey: [READ_USER] });
    setSnackbarOption({ ...snackbarOption, open: true, message: response.returnMessage });
  };
  const { createMode, showModal, userData } = userCURDModal as any;
  const { mutate } = useUserMutation({ onSuccessFn });

  const initialCustomerData = {
    _id: '',
    USER_NAME: '',
    USER_ID: '',
    USER_HOSTNAME: '',
    USER_MAIL: '',
    USER_POSISTION: '',
    USER_GROUP: '',
    USER_ROLE: '',
    USER_NICKNAME: '',
  };
  const [userInput, setUserInput] = useState<UserData>(initialCustomerData);

  const onUserInputHandler = (event: any) => {
    const { id, value } = event.currentTarget;
    setUserInput({ ...userInput, [id]: value });
  };

  useEffect(() => {
    if (emptyObject(userData)) {
      setUserInput(initialCustomerData);
    } else {
      setUserInput({ ...userInput, ...userData });
    }
  }, [userData]);

  const onCustomerCreateHandler = (event: any) => {
    const buttonId = event.target.id;
    if (buttonId === 'create') {
      delete userInput['_id'];
    } else {
      userInput['id'] = userInput['_id'];
      delete userInput['_id'];
    }
    mutate({ type: buttonId === 'create' ? 'C' : 'U', data: { tableData: [userInput] } });
  };

  const onCustomerDeleteHandler = () => {
    mutate({
      type: 'D',
      data: {
        tableData: [
          {
            id: userData._id,
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
    <Modal open={showModal} onClose={() => setUserCURDModal({ ...userCURDModal, showModal: false, userData: {} })}>
      <ModalDialog>
        <DialogTitle>{createMode ? '유저 추가' : '유저 수정 및 삭제'}</DialogTitle>
        <Stack spacing={2}>
          <Input
            sx={{ width: '40vw' }}
            placeholder={'ID를 입력해주세요.'}
            id={'USER_ID'}
            value={userInput.USER_ID}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'이름를 입력해주세요.'}
            id={'USER_NAME'}
            value={userInput.USER_NAME}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'HOST NAME을 입력해주세요.'}
            id={'USER_HOSTNAME'}
            value={userInput.USER_HOSTNAME}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'메일을 입력해주세요.'}
            id={'USER_MAIL'}
            value={userInput.USER_MAIL}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'직책을 입력해주세요.'}
            id={'USER_POSISTION'}
            value={userInput.USER_POSISTION}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'팀을 입력해주세요.'}
            id={'USER_GROUP'}
            value={userInput.USER_GROUP}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'권한을 입력해주세요.'}
            id={'USER_ROLE'}
            value={userInput.USER_ROLE}
            onChange={onUserInputHandler}
          />
          <Input
            sx={{ width: '40vw' }}
            placeholder={'닉네임을 입력해주세요.'}
            id={'USER_NICKNAME'}
            value={userInput.USER_NICKNAME}
            onChange={onUserInputHandler}
          />
        </Stack>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px' }}>{buttonRender()}</Box>
      </ModalDialog>
    </Modal>
  );
};
const UserTable = () => {
  const setUserCURDModal = useSetRecoilState(userCRUDModalState);
  const [userData, setUserData] = useState([]);
  const { isLoading, data } = useUserQuery();

  // useEffect(() => {
  //   if (data) {
  //     setUserData(data.data.tableData);
  //   }
  // }, [data]);
  // if (isLoading) return <LoadingComponent />;

  return (
    <>
      <Table sx={{ mt: '30px', textAlign: 'center', fontSize: '15px', width: '73vw' }} borderAxis="both" stickyHeader>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>이름</th>
            <th style={{ width: '50%' }}>Host Name</th>
          </tr>
        </thead>
        {/*<tbody>{userData && userData.map((userItem: UserType) => <tr key={userItem._id}>{userItem}</tr>)}</tbody>*/}
      </Table>
    </>
  );
};

const UserTemplate = () => {
  const { themeColor } = useRecoilValue(userSettingState);
  const setUserCURDModal = useSetRecoilState(userCRUDModalState);

  return (
    <>
      <Button
        color={themeColor}
        id={'create'}
        onClick={() => {
          setUserCURDModal({ createMode: true, showModal: true, userData: {} });
        }}
      >
        Create
      </Button>
      <UserTable />
      <UserCRUDModal />
    </>
  );
};

export default UserTemplate;
