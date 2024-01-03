import React from 'react';
import {Box, Stack} from "@mui/joy";
import CrudButtonBox from "./CrudButtonBox";
import {QuizInput, QuizTable} from "./QuizCRUD";
import {CustomerInput, CustomerTable} from "./CustomerCRUD";
import {HolidayInput, HolidayTable} from "./HolidayCRUD";

interface DBFormProps {
    optionValue: string,
}

const DbForm = ({optionValue}: DBFormProps) => {

    const getDBCrudInput = () => {
        switch (optionValue) {
            case 'Quiz' :
                return <QuizInput/>
            case 'Customer' :
                return <CustomerInput/>
            case 'Holiday' :
                return <HolidayInput/>
        }
    }

    const getDBReadTable = () => {
        switch (optionValue) {
            case 'Quiz' :
                return <QuizTable/>
            case 'Customer' :
                return <CustomerTable/>
            case 'Holiday' :
                return <HolidayTable/>
        }
    }

    return (
        <Box sx={{overflow: 'auto', maxHeight: '85vh', width: '100%'}}>
            <Stack spacing={1}>
                {getDBCrudInput()}
            </Stack>
            {getDBReadTable()}
        </Box>
    );
};

export default DbForm;