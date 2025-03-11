import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home';
import StudentList from '../../pages/Student/StudentList/StudentList';

function Content() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/student' element={<StudentList />} />
            </Routes>
        </>
    )
}

export default Content;