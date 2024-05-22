import './App.css'
import RegisterForm from './components/Form'
import Header from './components/Header'
// import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className='wrapper_app'>
     <Header/>
     {/* <LoginForm/> */}
     <RegisterForm/>
    </div>
  )
}

export default App
