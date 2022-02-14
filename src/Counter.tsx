import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => setCount((c) => c + 1)}>Count {count}</button>
    </div>
  );
};

export { Counter };
