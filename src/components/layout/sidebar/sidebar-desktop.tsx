import { motion } from 'framer-motion';

import SidebarContent from './sidebar-content';
import { useLayout } from '@/hooks';

const SidebarDesktop = () => {
	const { isCollapsed } = useLayout();
	return (
		<motion.div
			initial='open'
			variants={{
				open: { opacity: 1, width: '18rem' },
				closed: { opacity: 1, width: 0, overflow: 'hidden' },
			}}
			animate={isCollapsed ? 'closed' : 'open'}>
			<SidebarContent />
		</motion.div>
	);
};

export default SidebarDesktop;
