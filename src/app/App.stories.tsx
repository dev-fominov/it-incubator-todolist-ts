import React from 'react';
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecarator';
import App from './App';

export default {
	newTitle: 'App Component',
	component: App,
	decorators:[ReduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
	return <App demo={true}  />
}