import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext';
import Background from './util/background';
import Toggle from './components/ThemeToggle';

ReactDOM.render(
    <StrictMode>
        <ThemeProvider>
            <Background>
                <div className="absolute right-0 top-0 mt-5 md:mt-5">
                    <Toggle />
                </div>
                <App />
            
                <div className="flex flex-col w-full mt-8 h-auto footer dark:border-t dark:border-zinc-700 dark:bg-zinc-900 shadow-lg">
                    <Footer/>
                </div>
            </Background>
        </ThemeProvider>,
    </StrictMode>, document.getElementById('root')
);

serviceWorker.unregister();
