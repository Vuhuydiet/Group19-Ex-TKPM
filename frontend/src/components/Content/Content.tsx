import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home';
import StudentList from '../../pages/Student/StudentList/StudentList';
// import StudentImportForm from '../../pages/Student/Form/StudentImportForm/StudentImportForm';
import CategoryManagement from '../../pages/Category/Management/CategoryManagement';
import ModuleList from '../../pages/Module/ModuleList/ModuleList';
// import PrerequisiteSelector from '../../pages/Module/Form/PrerequisiteSelector/PrerequisiteSelector';
import RegisterList from '../../pages/Register/RegisterList/RegisterList';
import ClassList from '../../pages/Class/ClassList/ClassList';

function Content() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/student' element={<StudentList />} />
                <Route path='/category' element={<CategoryManagement />} />
                <Route path='/module' element={<ModuleList />} />
                <Route path='/module/register' element={<RegisterList />} />
                <Route path='/class' element={<ClassList />} />
            </Routes>
        </>
    )
}

export default Content;