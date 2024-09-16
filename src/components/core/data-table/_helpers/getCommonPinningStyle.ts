import { type Column } from '@tanstack/react-table';

import { colors } from '@/config/tailwind';

export function getCommonPinningStyles<TData>({
	column,
	withBorder = true,
	isHeader = false,
}: {
	column: Column<TData>;
	/**
	 * Whether to show a box shadow on the right side of the last left pinned column or the left side of the first right pinned column.
	 * This is useful for creating a border between the pinned columns and the scrollable columns.
	 * @default false
	 */
	withBorder?: boolean;
	isHeader?: boolean;
}): React.CSSProperties {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === 'left' && column.getIsLastColumn('left');
	const isFirstRightPinnedColumn =
		isPinned === 'right' && column.getIsFirstColumn('right');

	return {
		boxShadow: withBorder
			? isLastLeftPinnedColumn
				? `-4px 0 40px -4px ${colors.BORDER} inset`
				: isFirstRightPinnedColumn
					? `4px 0 3px -3px ${colors.BORDER}  inset`
					: undefined
			: undefined,
		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
		right:
			isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		background: isHeader ? colors.BASE_200 : colors.BASE_150,
		width: column.getSize(),
		zIndex: isPinned ? 10 : 0,
	};
}
