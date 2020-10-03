import React from 'react'
import './core.css';

import UserSelect from '../userSelect'

function Header() {
    return ( 
      <div className="moduleChooser">
        <UserSelect/>
        <section>
          <svg className="wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" d="M0,32L60,69.3C120,107,240,181,360,181.3C480,181,600,107,720,90.7C840,75,960,117,1080,144C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </section>
      </div>
    )
}

export default Header