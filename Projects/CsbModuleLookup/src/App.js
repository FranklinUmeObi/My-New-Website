import React from 'react';
import './App.css';
import UserSelect from './Components/userSelect'

function App() {
  return (<div className="App">
    <div className="header">
      <h1 className="header__text">CSB Course Module Lookup</h1>
      <section>
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path className="wavePath" fill="#fff" d="M0,160L26.7,181.3C53.3,203,107,245,160,240C213.3,235,267,181,320,149.3C373.3,117,427,107,480,117.3C533.3,128,587,160,640,186.7C693.3,213,747,235,800,240C853.3,245,907,235,960,208C1013.3,181,1067,139,1120,149.3C1173.3,160,1227,224,1280,224C1333.3,224,1387,160,1413,128L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
        </svg>

      </section>
    </div>
    <div className="moduleChooser">
      <UserSelect/>
      <section>
        <svg className="wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" d="M0,32L60,69.3C120,107,240,181,360,181.3C480,181,600,107,720,90.7C840,75,960,117,1080,144C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </section>
    </div>
    <div className="footer">
      <p>© Franklin Ume Obiekwe. All rights reserved.</p>
    </div>
  </div>);
}

export default App;
