import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function not(a, b) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}

// ✅ 1. 부모로부터 onTargetColumnsChange 함수를 prop으로 받습니다.
export default function ColumnTransferList({ columns, onTargetColumnsChange }) {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    // 새 테이블이 로드되면 목록을 초기화하는 useEffect
    useEffect(() => {
        setLeft(columns || []);
        setRight([]);
        setChecked([]);
    }, [columns]);

    // ✅ 2. right 상태가 변경될 때마다 부모 컴포넌트에 알리는 useEffect
    // 이것이 "state를 부모로 끌어올리는(lifting state up)" 핵심 로직입니다.
    useEffect(() => {
        if (onTargetColumnsChange) {
            onTargetColumnsChange(right);
        }
    }, [right, onTargetColumnsChange]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (title, items) => (
        <Paper sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            color: 'white' 
        }}>
            <Typography sx={{ p: 1.5 }}>{title}</Typography>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List dense component="div" role="list">
                    {items.map((value) => (
                        <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': `transfer-list-item-${value}-label` }}
                                    sx={{ color: 'white' }}
                                />
                            </ListItemIcon>
                            <ListItemText id={`transfer-list-item-${value}-label`} primary={value} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Paper>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                gap: 2,
            }}
        >
            <Box sx={{ flex: 1, height: '100%', minWidth: 0 }}>
                {customList('일반 값 유지', left)}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button sx={{my: 0.5, color: 'white'}} onClick={handleAllRight} disabled={left.length === 0}>≫</Button>
                <Button sx={{my: 0.5, color: 'white'}} onClick={handleCheckedRight} disabled={leftChecked.length === 0}>&gt;</Button>
                <Button sx={{my: 0.5, color: 'white'}} onClick={handleCheckedLeft} disabled={rightChecked.length === 0}>&lt;</Button>
                <Button sx={{my: 0.5, color: 'white'}} onClick={handleAllLeft} disabled={right.length === 0}>≪</Button>
            </Box>
            <Box sx={{ flex: 1, height: '100%', minWidth: 0 }}>
                {customList('암호화', right)}
            </Box>
        </Box>
    );
}