import { MantineProvider } from '@mantine/core';
import React from 'react';

export const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>Generic react app template</div>
    </MantineProvider>
  );
}

export default App;
