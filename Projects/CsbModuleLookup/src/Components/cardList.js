import React from "react";

import "./cardList.css";
import Card from "./card";

function CardList(props) {
  const cards = props.course.Courses.map(courseData => (
    <Card key={courseData.id} id={courseData.id}
      module={courseData.name} students={courseData.students}
      state={props.state} />
  ));

  if (props.show === true) {
    return (
      <div className="mainContainer">
        <h2 className="mainContainer__text">Selected Modules</h2>
        <div>
          <ul className="cardsContainer">{cards}</ul>
        </div>
      </div>
    );
  } else {
  }
  return <div />;
}

export default CardList;
