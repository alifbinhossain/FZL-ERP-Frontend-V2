import { cn } from '@/lib/utils';

import SidebarHeader from './sidebar-header';
import SidebarMenu from './sidebar-menu';
import SidebarLogout from './sidebar-logout';

const SidebarContent = () => {
	return (
		<aside
			className={cn('relative flex h-full w-full flex-col bg-primary')}>
			<SidebarHeader />
			<SidebarMenu />
			<div className='p-4'>
				<SidebarLogout />
			</div>
		</aside>
	);
};

export default SidebarContent;
