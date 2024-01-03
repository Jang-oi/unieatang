import React from 'react';
import Box from "@mui/joy/Box";
import {Button} from "@mui/joy";
import {useRecoilValue} from "recoil";
import {userSettingState} from "../../recoil/settings/atom";

interface CRUDButtonEventType {
    create : () => void;
}

const CrudButtonBox = ({create} : CRUDButtonEventType) => {
    const {color} = useRecoilValue(userSettingState);

    const onCRUDButtonHandler = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        switch (button.id) {
            case 'create':
                create();
                break;
            case 'update':
                // Update 작업 수행
                break;
            case 'delete':
                // Delete 작업 수행
                break;
            default:
                break;
        }

    }

    return (
        <>
            <Box sx={{display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px'}}>
                <Button type="submit" color={color} id={"create"} onClick={onCRUDButtonHandler}>Create</Button>
                {/*<Button type="submit" color={color} id={"update"} onClick={onCRUDButtonHandler}>Update</Button>*/}
                {/*<Button type="submit" color={color} id={"delete"} onClick={onCRUDButtonHandler}>Delete</Button>*/}
            </Box>
        </>
    );
};

export default CrudButtonBox;