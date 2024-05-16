import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster, toast } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
    <Toaster richColors={true} expand={false} position="bottom-right" theme="light" />
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Fragment>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
