import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './pages/routes'
import { useAuth } from './hooks/auth.hook'
import { Loader } from './components/Loader'
import { Menu } from './components/Menu'

function App() {
  const { token, login, logout, userId, isReady } = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if (!isReady) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuth,
      }}>
      <Router>
        {isAuth && <Menu />}
        {routes}
      </Router>{' '}
    </AuthContext.Provider>
  )
}

export default App
