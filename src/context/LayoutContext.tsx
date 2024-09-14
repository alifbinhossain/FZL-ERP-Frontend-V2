import { useAuth } from '@/hooks';
import { createContext, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ILayoutContext {
	isCollapsed: boolean;
	setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext({} as ILayoutContext);

interface ILayoutProps {
	children: React.ReactNode;
}

const LayoutProvider: React.FC<ILayoutProps> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);

	const value = useMemo((): ILayoutContext => {
		return {
			isCollapsed,
			setIsCollapsed,
			sidebarOpen,
			setSidebarOpen,
		};
	}, [isCollapsed, sidebarOpen]);

	// Get the authentication state from the context
	const { signed, loading } = useAuth();

	// Render a loading indicator while authentication is in progress
	if (loading) {
		return <span className='loading loading-dots loading-lg z-50' />;
	}

	// If the user is not signed in, redirect to the login page
	if (!signed) {
		return <Navigate to='/login' replace={true} />;
	}

	return (
		<LayoutContext.Provider value={value}>
			{children}
		</LayoutContext.Provider>
	);
};

export default LayoutProvider;
