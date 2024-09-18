import { motion } from 'framer-motion';
import { PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react';
import { useLayout } from '@/hooks';

import { buttonVariants } from '@/components/ui/button';

const SidebarCollapse = () => {
	const { isCollapsed, setIsCollapsed } = useLayout();
	return (
		<motion.button
			aria-label='Collapse Sidebar'
			whileTap={{ scale: 0.9 }}
			className={buttonVariants({
				variant: 'ghost',
				size: 'icon',
				className: 'text-secondary',
			})}
			onClick={() => {
				setIsCollapsed((prev) => !prev);
			}}>
			{isCollapsed ? (
				<PanelLeftOpenIcon className='size-6' />
			) : (
				<PanelRightOpenIcon className='size-6' />
			)}
		</motion.button>
	);
};

export default SidebarCollapse;
