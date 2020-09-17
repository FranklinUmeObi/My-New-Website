import React from 'react'
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


import "./boxSelect.css";
import data from '../Data/CourseData.json'

function Sem2List(props) {

  const toMap1 = props.state.selected.slice(15, 23);
  const toMap2 = props.state.selected.slice(23, 28);

  function onUpdateItem(event, i) {
    event.persist()
    props.setState(state => {
     const selected = state.selected.map((item, index) => {
       if (index === i) {
         return event.target.checked;
       }
       return item});
     return {selected};
   });
 };

  const checkbox1 = toMap1.map((checked, index) => (
      <FormControlLabel className={"box" + (index % 2 + 1)}
      control={
        <Checkbox
          checked={props.state.selected[index+ 15]}
          onChange={(e) => {onUpdateItem(e, index+15)}}
          name={"box" + index} />
      }
      label= {data.Courses[index+ 15].name}
      key={index + 15}/>

  ));

  const checkbox2 = toMap2.map((checked, index) => (
      <FormControlLabel className={"box" + (index % 2 + 1)}
      control=
      {
        <Checkbox
          checked={props.state.selected[index+23]}
          onChange={(e) => {onUpdateItem(e, index+23)}}
          name={"box" + index} />
      }
      label= {data.Courses[index+ 23].name}
      key={index + 23}/>

  ));

    return (
      <div className="boxSelectInput">
      <div className="boxes">
        <h2 className="boxHeader">Business</h2>
        <FormGroup className="boxesGroup">
          {checkbox1}
        </FormGroup>
      </div>

      <div className="boxes">
        <h2 className="boxHeader">Computer Science</h2>
        <FormGroup className="boxesGroup">
        {checkbox2}
        </FormGroup>
        </div>
      </div>
    )
}

export default Sem2List
