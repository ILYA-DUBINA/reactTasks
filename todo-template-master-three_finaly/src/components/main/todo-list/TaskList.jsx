import React, { Component } from "react"

import Task from "./Task";

export default class TaskList extends Component {

   render(){
      let { todos, onDeleted, onToggleItem } = this.props;
      let elements = todos.map((item) => {         
         const { id, ...itemProps} = item;

         return (
            <Task 
            key={id} 
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleItem={() => onToggleItem(id)}
            />
         );
      });

      return (
         <>
            <ul className="todo-list">
               { elements }
            </ul>
         </>
      );
   }
}

