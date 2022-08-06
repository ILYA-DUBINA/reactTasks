import React, { Component } from "react";

export default class Task extends Component{

   render(){
      let { id, name, description, onDeleted, onToggleItem, completed} = this.props;

      if(completed){
         name = 'completed';
      }
      
      return (
         <>
            <li key={id} className={name}>
               <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label onClick={ onToggleItem } >
                     <span className="description">{description}</span>
                     <span className="created"> task created {new Date().getMinutes()} minutes ago</span>
                  </label>
                  <button className="icon icon-edit"></button>
                  <button className="icon icon-destroy" onClick={onDeleted}></button>               
               </div>
               {name === 'editing' ? <input type="text" className="edit" defaultValue="Editing task" /> : null}
            </li>
         </>
      )
   }
}