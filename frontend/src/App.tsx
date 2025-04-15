
import Header from './components/Header/Header'
import SubHeader from './components/SubHeader/SubHeader'
import Content from './components/Content/Content'
import './styles/dashboard.css'
import { useEffect, useState } from 'react'
// import { addStudent, Student } from './services/studentAPIServices'

function App() {
  const [isAuthenticated, _setIsAuthenticated] = useState(true);


  useEffect(() => {
    // const studentList = mockStudentsList;
    // const fetchData = async () => {

    //   try {
    //     studentList.forEach(async (student: Student) => {
    //       await addStudent(student);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchData();
  }
    , []);

  return (
    <>
      <div id="dashboard">
        {isAuthenticated &&
          <>
            <div className="dashboard__left">
              <Header />
            </div>

            <div className="dashboard__right">
              <SubHeader />
              <div className="dashboard__data">
                <Content />
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App;