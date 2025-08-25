import { useState }    from 'react';
import { useNavigate } from 'react-router-dom';

// 아이콘들을 가져옵니다.
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ApiIcon         from '@mui/icons-material/Api';
import AutorenewIcon   from '@mui/icons-material/Autorenew';

export function useDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const topMenuItems = [
    { text: 'Api',   icon: <ApiIcon />,       path: '/dashboard/Api' },
    { text: 'Proxy', icon: <AutorenewIcon />, path: '/dashboard/Proxy' },
  ];

   const bottomMenuItems = [
    { text: 'Setting', icon: <Brightness5Icon />, path: '/dashboard/setting' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    topMenuItems,
    bottomMenuItems,
    handleMenuClick,
  };
}