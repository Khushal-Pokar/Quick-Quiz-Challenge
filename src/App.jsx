import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Categories from './components/Categories'
import Difficulty from './components/Difficulty'
import Quiz from './components/Quiz'

function App() {

  return (
    <>
      <div className="title">
        <h1>Quick Quiz Challenge</h1>
      </div>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/difficulty/:category_id" element={<Difficulty />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App
