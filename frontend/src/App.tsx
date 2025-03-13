
import Header from './components/Header/Header'
import SubHeader from './components/SubHeader/SubHeader'
import Content from './components/Content/Content'
import './styles/dashboard.css'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);


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