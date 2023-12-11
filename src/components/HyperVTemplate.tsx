import {Input} from "@mui/joy";
import {ChangeEvent, useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {HyperVBoardColumn} from "../types/hypervTypes";
import BasicSkeleton from "./common/BasicSkeleton";
import HyperVTable from "./HyperVTable";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import DangerousIcon from '@mui/icons-material/Dangerous';
import {useHyperVQuery} from "../hooks/useHyperVQuery";

const socket = io('http://local-prd-proxy:3001', {transports: ['websocket']});

export default function HyperVTemplate() {

    const [searchValue, setSearchValue] = useState<string>('')
    const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const query = useHyperVQuery();
    const [hyperVData, setHyperVData] = useState<HyperVBoardColumn[]>([]);

    const handleSessionData = (data: HyperVBoardColumn[]) => {
        setHyperVData((prevData) => [...prevData, ...data]);
    };

    useEffect(() => {
        socket.on('sessionData', handleSessionData);
        if (query.data) {
            handleSessionData(query.data.data);
        }
        return () => {
            socket.off('sessionData', handleSessionData);
        };
    }, [query.data]);

    if (!hyperVData || hyperVData.length === 0) return (<BasicSkeleton/>)

    const filteredBoardData = hyperVData.filter((boardItem) => boardItem?.customer.toLowerCase().includes(searchValue.toLowerCase()));
    const sortedBoardData = filteredBoardData.sort((a, b) => a.customer.localeCompare(b.customer));

    return (
        <Box sx={{overflow: 'auto', maxHeight:'85vh'}}>
            <Input placeholder="고객사명 입력" variant="outlined" color="neutral" sx={{width: '20vw', marginBottom: '30px'}}
                   value={searchValue} onChange={onSearchHandler}/>
            <Typography
                color="danger"
                level="title-lg"
                variant="soft"
                sx={{width:'35vw', marginBottom:'20px'}}
            >
                <DangerousIcon/>
                고객사 방화벽, VPN 정책 등에 따라 연결상태가 정상적이지 않을 수 있음!!
            </Typography>
            <HyperVTable hyperVData={sortedBoardData}/>
        </Box>
    )
}