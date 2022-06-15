import React from 'react';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

export default {
	newTitle: 'EditableSpan Component',
	component: EditableSpan
}

const onChangeTitleCallback = action("Change Status");

export const TaskBaseExample = () => {
	return <>
		<EditableSpan title={'title span'} onChange={onChangeTitleCallback} />
	</>
}