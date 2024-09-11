import useLayout from '@/contexts/layout/useLayout';
import { cn } from '@/lib/utils';
import { matchUrl } from '@/utils';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

const variants = {
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	initial: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

interface ISidebarFileProps {
	path: string;
	name: string;
}

const SidebarFile: React.FC<ISidebarFileProps> = ({ path, name }) => {
	const { setSidebarOpen } = useLayout();
	const { pathname } = useLocation();

	return (
		<motion.li variants={variants} initial='initial' animate='animate'>
			<NavLink
				onClick={() => setSidebarOpen(false)}
				to={path}
				className={({ isActive }) =>
					cn(
						'relative flex w-full gap-2 rounded-r-md border-l-[3px] border-none px-4 py-2 text-sm font-normal transition-colors duration-200',
						isActive || matchUrl(path, pathname)
							? 'text-primary-content bg-gradient-to-r from-accent/10 to-accent/30 font-medium'
							: 'text-primary-content/70 hover:text-primary-content hover:bg-secondary/20'
					)
				}>
				<span className='block w-full truncate'>{name}</span>

				{matchUrl(path, pathname) ? (
					<motion.div
						className='absolute inset-0 h-full w-[3px] bg-accent'
						layoutId='active-sidebar-item'
					/>
				) : null}
			</NavLink>
		</motion.li>
	);
};

export default SidebarFile;
