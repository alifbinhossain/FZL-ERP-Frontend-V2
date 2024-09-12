import { motion } from 'framer-motion';
import { CopyMinus, X } from 'lucide-react';
import useLayout from '@/contexts/layout/useLayout';
import useSidebar from '@/contexts/sidebar/useSidebar';
import BrandLogo from '@/components/brand-logo';

const SidebarHeader = () => {
	const { setSidebarOpen } = useLayout();
	const { setIsCloseAll } = useSidebar();

	return (
		<div>
			<div className='relative border-b border-border/10 px-4 py-6'>
				<BrandLogo />

				<button
					className='btn btn-square btn-ghost btn-sm absolute right-4 top-4 text-white md:hidden'
					onClick={() => setSidebarOpen(false)}>
					<X />
				</button>
			</div>

			<div className='flex justify-end px-2 py-2'>
				<div
					className='tooltip tooltip-left tooltip-secondary md:tooltip-bottom'
					data-tip='Collapse Folders'>
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsCloseAll((prev) => !prev)}
						className='text- btn btn-square btn-ghost btn-sm text-primary-foreground/70'>
						<CopyMinus className='size-4' />
					</motion.button>
				</div>
			</div>
		</div>
	);
};

export default SidebarHeader;
