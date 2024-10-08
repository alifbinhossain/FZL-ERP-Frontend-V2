import { useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';

const useSidebar = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error('useSidebar must be used within an SidebarProvider');
	}

	return context;
};

export default useSidebar;
