import React from 'react';
import Box from "@mui/joy/Box";
import {Button} from "@mui/joy";
import {useRecoilValue} from "recoil";
import {userSettingState} from "../../recoil/settings/atom";

const CrudButtonBox = () => {
    const {color} = useRecoilValue(userSettingState);

    const onCRUDButtonHandler = (event : React.MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = event.currentTarget;
    }

    return (
        <>
            <Box sx={{display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px'}}>
                <Button type="submit" color={color} id={"Create"} onClick={onCRUDButtonHandler}>Create</Button>
                <Button type="submit" color={color} id={"Update"} onClick={onCRUDButtonHandler}>Update</Button>
                <Button type="submit" color={color} id={"Delete"} onClick={onCRUDButtonHandler}>Delete</Button>
            </Box>
        </>
    );
};

export default CrudButtonBox;