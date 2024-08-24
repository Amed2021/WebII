import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';

export const ContextPage = (child) => {
  return (
    <BrowserRouter>
      <UserProvider>
        {child}
      </UserProvider>
    </BrowserRouter>
  );
}
