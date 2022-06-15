import React from 'react';
import FullInput from './FullInput';
import { action } from '@storybook/addon-actions';

export default {
	newTitle: 'AddItemForm Component',
	component: FullInput
}

const callback = action("Button 'add' was pressed inside the form");

export const FullInputBaseExample = (props: any) => {
	return <FullInput callBack={callback} />
}