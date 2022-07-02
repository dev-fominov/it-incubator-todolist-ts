import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import App from './app/App';

// const container = document.getElementById('app');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<App />);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));

serviceWorker.unregister();
