import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

function Content() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/student' element={<h1>Student</h1>} />
            </Routes>
        </>
    )
}

export default Content;