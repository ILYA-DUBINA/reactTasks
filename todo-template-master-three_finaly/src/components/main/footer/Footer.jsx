import React from "react"

import TasksFilter from "./TasksFilter";

const Footer = (props) => {

   return (
      <>
        <footer className="footer">
            <span className="todo-count">{props.allActiveItem} items left</span>
            <TasksFilter filter={props.filter}
                         onFilterChange={props.onFilterChange} />
            <button className="clear-completed"
                     onClick={props.allDeletedItems}>Clear completed</button>
         </footer>
      </>
   )
}

export default Footer;