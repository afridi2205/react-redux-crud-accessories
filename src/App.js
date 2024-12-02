import { HeaderComponent } from './common/header';
import { MainContent } from './common/main-content';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store';
import {Provider} from 'react-redux';
import './App.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <HeaderComponent />
          <MainContent />
          {/* <ViewProductComponent /> */}
        {/* <FooterComponent /> */}
        </Router>
      </div>
    </Provider>
  );
}
