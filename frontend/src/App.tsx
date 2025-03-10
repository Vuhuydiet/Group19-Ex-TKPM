
import Header from './Header'
import SubHeader from './SubHeader'
import Content from './Content'
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