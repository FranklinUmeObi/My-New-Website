import React from "react";

import Button from '@material-ui/core/Button';

import "./boxSelect.css";
import data from '../Data/CourseData.json'

import CardList from './cardList'
import Sem1List from './sem1List'
import Sem2List from './sem2List'



function BoxSelect(props) {

  //--------------------------------------------------
  //State
  const [state, setState] = React.useState(
    {
      selected: 
      [false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false ],
      listVisibility:false
    }
  );


//--------------------------------------------------
//Functions

  const onShow = event => {
    setState({...state, listVisibility: true});
  }



//--------------------------------------------------
//Semester 1 Checkboxes

  if (props.semester === "1")
  {
    return (
      <div className="boxSelect">

        <Sem1List state={state} setState={setState}/>

        <div className="buttonContainer">
          <Button className="button" size="large" onClick={onShow} variant="contained" color="secondary">
            Submit
          </Button>
        </div>

        <CardList show={state.listVisibility} course={data} state={state}/>

      </div>
    );
  }





  //--------------------------------------------------
  //Semester 2 Checkboxes

  else {
    return(
      <div className="boxSelect">
        <Sem2List state={state} setState={setState}/>

        <div className="buttonContainer">
          <Button className="button" size="large" onClick={onShow} variant="contained" color="secondary">
            Submit
          </Button>
        </div>

        <CardList show={state.listVisibility} course={data} state={state}/>

      </div>
    );
  }
}



export default BoxSelect;
