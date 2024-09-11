import { useContext } from 'react';
import { SidebarContext } from '.';

const useSidebar = () => {
  return useContext(SidebarContext);
};

export default useSidebar;
