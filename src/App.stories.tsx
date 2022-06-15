import React from 'react';
import { action } from '@storybook/addon-actions';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecarator';

export default {
	newTitle: 'App Component',
	component: App,
	decorators:[ReduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
	return <App />
}