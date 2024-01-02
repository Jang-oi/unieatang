import {Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Table} from "@mui/joy";
import {Fragment, useState} from "react";
import Box from "@mui/joy/Box";
import {useCalendarQuery} from "../hooks/useCalendarQuery";
import {formatDate} from "../utils/commonUits";
import {useRecoilValue} from "recoil";
import {userSettingState} from "../recoil/settings/atom";
// import {axiosDB} from "../utils/axios";

const DataBaseTest = () => {

    const [fromDate, setFromDate] = useState(formatDate(new Date()));
    const [toDate, setToDate] = useState(formatDate(new Date()));
    const [title, setTitle] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRadioChange = (event: any) => {
        setSelectedRow(event.target.value);
    };

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleDateChange = (event: any) => {
        const {id, value} = event.target;
        switch (id) {
            case "fromDate" :
                setFromDate(value)
                break;
            case "toDate" :
                setToDate(value)
                break;
            default :
                break;
        }
    };
    const {color} = useRecoilValue(userSettingState);

    const onHolidayButtonHandler = () =>{

    }

    return (
        <Fragment>
            <Stack spacing={5} direction="row" sx={{marginBottom: '30px'}}>
                <FormLabel>
                    From
                </FormLabel>
                <Input
                    type="date"
                    id="fromDate"
                    sx={{width: '15vw'}}
                    slotProps={{
                        input: {
                            min: '2023-01-01',
                            max: '2999-12-31',
                        }
                    }}
                    value={fromDate}
                    onChange={handleDateChange}
                />
                <FormLabel>
                    To
                </FormLabel>
                <Input
                    type="date"
                    id="toDate"
                    sx={{width: '15vw'}}
                    value={toDate}
                    onChange={handleDateChange}
                />
            </Stack>
            <Stack>
                <FormControl id="Id" required size="lg" color="primary">
                    <FormLabel>
                        Title
                    </FormLabel>
                    <Input
                        placeholder="Title Input"
                        name="Name"
                        type="tel"
                        fullWidth
                        color={color}
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </FormControl>
                <Box sx={{display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px'}}>
                    <Button color={color} id={"Create"} onClick={onHolidayButtonHandler}>Create</Button>
                    <Button color={color} id={"Update"} onClick={onHolidayButtonHandler}>Update</Button>
                    <Button color={color} id={"Delete"} onClick={onHolidayButtonHandler}>Delete</Button>
                </Box>
            </Stack>
        </Fragment>
    );
};

export default DataBaseTest;