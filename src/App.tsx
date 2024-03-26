import "./App.css"
import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import Menu from "./components/menuBar/Menu"
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
