import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css"
import {BookShow, Home, MovieDetails} from '../src/pages/Home';
import { Register } from '../src/pages/Register';
import { Login } from '../src/pages/Login';
import {Admin} from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoutes';
import {Provider} from 'react-redux'
import store from './redux/store';
import { Partner } from './pages/Partner';
import { ForgetPassword, ResetPassword, User } from './pages/User';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute>
                <Admin/>
              </ProtectedRoute>}
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute>
                <User/>
              </ProtectedRoute>}
          />
          <Route 
            path='/partner' 
            element={
              <ProtectedRoute>
                <Partner/>
              </ProtectedRoute>}
          />
          <Route
            path='/movie/:id'
            element={
              <ProtectedRoute>
                <MovieDetails/>
              </ProtectedRoute>
            }/>
          <Route
            path='/book-show/:id'
            element={
              <ProtectedRoute>
                <BookShow/>
              </ProtectedRoute>
            }
          />
          <Route 
            path='/forget'
            element={<ForgetPassword/>}
          />
          <Route 
          path='/reset/:email'
          element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
