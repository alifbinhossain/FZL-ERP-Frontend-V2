import useAuth from '@/contexts/auth/useAuth';

export default function useAccess(key: string) {
	const { canAccess } = useAuth();

	if (!canAccess) return [];

	return canAccess[key] || [];
}
