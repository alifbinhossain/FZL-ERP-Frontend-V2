import { IRoute } from '@/types';

import SidebarFile from './file';
import SidebarFolder from './folder';

const SidebarItem: React.FC<IRoute> = ({ path, name, children, disableCollapse }) => {
	return children ? (
		<SidebarFolder path={path} name={name} disableCollapse={disableCollapse}>
			{children}
		</SidebarFolder>
	) : (
		<SidebarFile path={path} name={name} />
	);
};

export default SidebarItem;
