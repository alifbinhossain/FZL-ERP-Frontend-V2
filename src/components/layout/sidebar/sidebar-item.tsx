import SidebarFile from './sidebar-file';
import SidebarFolder from './sidebar-folder';

interface ISidebarItemProps {
	path: string;
	name: string;
	children?: any;
	disableCollapse?: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
	path,
	name,
	children,
	disableCollapse,
}) => {
	return children ? (
		<SidebarFolder
			path={path}
			name={name}
			disableCollapse={disableCollapse}>
			{children}
		</SidebarFolder>
	) : (
		<SidebarFile path={path} name={name} />
	);
};

export default SidebarItem;
