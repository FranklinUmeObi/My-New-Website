import React, { useState } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import BoxSelect from './boxSelect'


import "./userSelect.css";

function UserSelect(props) {
  const [value, setValue] = useState('1');
  const handleChange = (event) =>
  {
    setValue(event.target.value);
  };
  return (
    <div className="userSelect">
      <FormControl component="fieldset">
        
        <FormLabel component="legend">Select a Semester to check</FormLabel>
        <RadioGroup className="radioButtonGroup" row aria-label="Semester" name="Semester" value={value} onChange={handleChange}>
          <FormControlLabel className="radioButton" value="1" control={<Radio/>} label="Semester 1" />
          <FormControlLabel className="radioButton" value="2" control={<Radio/>} label="Semester 2" />
        </RadioGroup>

      </FormControl>

      <h3>Select the modules you would like to search below</h3>
      <BoxSelect semester = {value}/>
    </div>

  );
}

export default UserSelect;
