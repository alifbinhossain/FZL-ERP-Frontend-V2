import React from 'react';
import { Button } from './components/ui/button';

const App = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello</h1>
      <Button variant={'outline'}>Click me</Button>
    </div>
  );
};

export default App;
