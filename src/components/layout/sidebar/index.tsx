import { useMediaQuery } from '@uidotdev/usehooks';

import { SidebarProvider } from '@/context';
import SidebarDesktop from './sidebar-desktop';
import SidebarMobile from './sidebar-mobile';

const Sidebar = () => {
	const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
	return (
		<SidebarProvider>
			{!isSmallDevice && <SidebarDesktop />}
			{isSmallDevice && <SidebarMobile />}
		</SidebarProvider>
	);
};

export default Sidebar;
