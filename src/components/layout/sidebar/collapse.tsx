import { motion } from 'framer-motion';
import { PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react';
import useLayout from '@/hooks/useLayout';

import TooltipWrapper from '@/components/others/tooltip-wrapper';
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
			<TooltipWrapper message='Toggle Sidebar (Ctrl+Q)'>
				{isCollapsed ? <PanelLeftOpenIcon className='size-6' /> : <PanelRightOpenIcon className='size-6' />}
			</TooltipWrapper>
		</motion.button>
	);
};

export default SidebarCollapse;
