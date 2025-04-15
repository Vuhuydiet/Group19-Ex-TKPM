import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home';
import StudentList from '../../pages/Student/StudentList/StudentList';
import StudentImportForm from '../../pages/Student/Form/StudentImportForm/StudentImportForm';
import CategoryManagement from '../../pages/Category/Management/CategoryManagement';
import ModuleList from '../../pages/Module/ModuleList/ModuleList';
import PrerequisiteSelector from '../../pages/Module/Form/PrerequisiteSelector/PrerequisiteSelector';

function Content() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/student' element={<StudentList />} />
                <Route path='/student/import' element={<StudentImportForm />} />
                <Route path='/category' element={<CategoryManagement />} />
                <Route path='/module' element={<ModuleList />} />
                <Route path='/test' element={<PrerequisiteSelector />} />
            </Routes>
        </>
    )
}

export default Content;