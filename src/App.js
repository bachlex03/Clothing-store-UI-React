import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';

import { Default } from './layouts';
import { Fragment, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = Default;

              if (route.layout) {
                Layout = route.layout;
              } else {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  path={route.path}
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
