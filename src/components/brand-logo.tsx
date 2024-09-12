import { cn } from '@/lib/utils';
import { sidebarRoutes } from '@/routes';
import { NavLink } from 'react-router-dom';

interface IBrandLogoProps {
	className?: string;
}

const BrandLogo: React.FC<IBrandLogoProps> = ({ className, ...props }) => {
	const route = sidebarRoutes[0];

	return (
		<NavLink
			className={cn(
				'flex items-center justify-center text-2xl font-bold text-primary-foreground md:text-4xl',
				className
			)}
			to={route.path!}
			{...props}>
			FZL
		</NavLink>
	);
};

export default BrandLogo;
