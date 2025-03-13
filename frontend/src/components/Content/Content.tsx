import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home';
import StudentList from '../../pages/Student/StudentList/StudentList';
import StudentImportForm from '../../pages/Student/StudentImportForm/StudentImportForm';

function Content() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/student' element={<StudentList />} />
                <Route path='/student/import' element={<StudentImportForm />} />
            </Routes>
        </>
    )
}

export default Content;