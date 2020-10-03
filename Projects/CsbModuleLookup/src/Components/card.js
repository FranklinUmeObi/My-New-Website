import React from "react";
import "./card.css";

function Card(props) {

  const students = props.students.map((student, index) => (
    <li className="cardText" key={index}>{student}</li>));


  let items = [...props.state.selected];

  let ids = [];

  for (var i = 0; i < items.length - 1; i++) {
    if (items[i] === true) ids.push(i);
  }



if (ids.includes(props.id -1)) {
  return (<div className="card">
    <div className="cardImg">
      <div className="cardTitleContainer">
        <h2 className="cardTitle">{props.module}</h2>
      </div>
    </div>
    <div className="cardTextContainer">
      <h2 className="cardTextTitle">Students</h2>
      <ul className="textContainer">{students}</ul>
    </div>

  </div>);
} else {
  return(
    <div className="errCont">
    
    </div>
  )
}

}

export default Card;
