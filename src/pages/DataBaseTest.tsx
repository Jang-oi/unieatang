import {Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Table} from "@mui/joy";
import {Fragment, useState} from "react";
import Box from "@mui/joy/Box";
import {useCalendarQuery} from "../hooks/useCalendarQuery";
import {formatDate} from "../utils/commonUits";
import {axiosDB} from "../utils/axios";

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

    const onHolidayButtonHandler = (event: any) => {
        const {id, value} = event.target;
        if (id === 'Create') {
            axiosDB('holiday', {
                type: 'C',
                data: {
                    tableData: [],
                    stringData: {
                        start: fromDate,
                        end: toDate,
                        title,
                    }
                }
            }).then(() => {
                setTitle('');
            });
        } else if (id === 'Delete') {
            axiosDB('holiday', {
                type: 'D',
                data: {
                    tableData: [],
                    stringData: {
                        id: selectedRow
                    }
                }
            });
        }else if (id === 'Update') {
            axiosDB('holiday', {
                type: 'U',
                data: {
                    tableData: [],
                    stringData: {
                        id: selectedRow,
                        start: fromDate,
                        end: toDate,
                        title,
                    }
                }
            });
        }
    }

    const {data} = useCalendarQuery();

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
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </FormControl>
                <Box sx={{display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px'}}>
                    <Button id={"Create"} onClick={onHolidayButtonHandler}>Create</Button>
                    <Button id={"Update"} onClick={onHolidayButtonHandler}>Update</Button>
                    <Button id={"Delete"} onClick={onHolidayButtonHandler}>Delete</Button>
                </Box>
            </Stack>
            <Table sx={{marginTop: '30px'}}>
                <thead>
                <tr>
                    <th style={{width: '5%'}}>SELECT</th>
                    <th>TITLE</th>
                    <th>START</th>
                    <th>END</th>
                </tr>
                </thead>
                <tbody>
                {data?.data && data?.data.tableData.map((row: any) => (
                    <tr key={row._id}>
                        <td>
                            <RadioGroup name="radio-buttons-group" value={selectedRow}>
                                <Radio value={row._id} variant="outlined" onClick={handleRadioChange}/>
                            </RadioGroup>
                        </td>
                        <td>{row.title}</td>
                        <td>{row.start}</td>
                        <td>{row.end}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default DataBaseTest;