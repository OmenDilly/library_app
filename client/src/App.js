import { DataContext } from './context/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'

function App() {

  const {token, signIn, signOut, userId} = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  return (
    <DataContext.Provider
      value={{
        token,
        signIn,
        signOut,
        userId,
        isAuthenticated
      }}
    >
      <Router>
        <div className="App">
          {routes}  
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App
