import { useLocation } from 'react-router-dom';

import BrandLogo from '@/components/brand-logo';
import GlobalBreadcrumbs from '@/components/global-breadcrumbs';

import { cn } from '@/lib/utils';

import SidebarCollapse from '../sidebar/sidebar-collapse';
import SidebarMobileToggle from '../sidebar/sidebar-mobile-toggle';

const Navbar = () => {
	const { pathname } = useLocation();
	const homePage = pathname === '/';
	return (
		<div className='w-full border-b'>
			<div className='flex flex-col'>
				<div
					className={cn(
						'flex items-center justify-between gap-4 border-b bg-background px-4 py-2 md:hidden',
						homePage && 'border-none'
					)}>
					<BrandLogo className={'w-fit text-primary'} />
					<SidebarMobileToggle />
				</div>

				<div
					className={cn(
						'flex items-center gap-6 bg-base-200 px-4 py-2 md:px-0 md:py-0',
						pathname === '/' && 'hidden md:block'
					)}>
					<div className='hidden h-full w-fit items-center border-r border-secondary/10 p-4 md:flex'>
						<SidebarCollapse />
					</div>
					{!homePage && <GlobalBreadcrumbs />}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
