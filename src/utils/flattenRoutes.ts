function flattenRoutes(routes: any[]) {
	const flattenedArray: any[] = [];

	function flattenRecursive(route: any) {
		if (!route) {
			return;
		}

		flattenedArray.push(route);

		if (route.children) {
			route.children.forEach((child: any) => flattenRecursive(child));
		}
	}

	routes.forEach((item) => flattenRecursive(item));

	return flattenedArray;
}

export default flattenRoutes;
