import React from 'react';
import {Select, Option} from "@mui/joy";
import {useRecoilState} from "recoil";
import {userSettingState} from "../recoil/settings/atom";
import {userSettingType} from "../types/userSettingType";

const Settings = () => {

    const [userSetting, setUserSetting] = useRecoilState<userSettingType>(userSettingState);
    // const resetInterviewSelect = useResetRecoilState(userSettingState);


    const handleChange = (event: React.SyntheticEvent | null, color: string | null) => {
        // primary = #185EA5

        if (color) {
            setUserSetting({...userSetting, color});
        }
    };

    const {color} = userSetting;

    return (
        <Select defaultValue={color} onChange={handleChange} sx={{width: '40vw'}}>
            <Option value="neutral">Neutral</Option>
            <Option value="primary">Primary</Option>
            <Option value="danger">Danger</Option>
            <Option value="success">Success</Option>
            <Option value="warning">Warning</Option>
        </Select>
    );
};

export default Settings;