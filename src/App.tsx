import "./App.css"
import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
