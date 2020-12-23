import { DataContext } from './context/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'
import { Backdrop, CircularProgress } from '@material-ui/core'

function App() {

  const {token, signIn, signOut, userId, ready} = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Backdrop open={ready}>
            <CircularProgress color="inherit" />
          </Backdrop>

  }

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
