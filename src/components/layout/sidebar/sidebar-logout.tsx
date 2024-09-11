import User from '@/components/user';
import useAuth from '@/contexts/auth/useAuth';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const SidebarLogout = () => {
	const { logout } = useAuth();

	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			className='text-primary-content flex w-full items-center gap-3 rounded-md bg-gradient-to-r from-accent/10 to-accent/30 px-5 py-2 text-left text-sm font-normal'
			onClick={logout}>
			<LogOut className='text-primary-content size-6' />
			<User />
		</motion.button>
	);
};

export default SidebarLogout;
