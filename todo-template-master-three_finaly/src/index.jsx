import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import NewTaskForm from './components/header/NewTaskForm';
import Footer from './components/main/footer/Footer';
import TaskList from './components/main/todo-list/TaskList';

class AppContent extends Component {
   maxId = 100;

   state = {
      arrayElements: [
         this.createTodoItem('Completed task'),
         this.createTodoItem('Editing task', 'editing'),
         this.createTodoItem('Active task') 
      ],  
      term: '',
      filter: null
   }


   createTodoItem(description, name) {
      return {
         description: description,
         name: name,         
         id: this.maxId++
      }
   }

   deletedItem = (id) => {
      this.setState(({ arrayElements }) => {
         // const newArrayElements = arrayElements.filter((item) => id !== item.id);
         const idx = arrayElements.findIndex((el) => el.id === id);
  
         const newArrayElements = [
            ...arrayElements.slice(0, idx),
             ...arrayElements.slice(idx + 1)
         ];
         
         return {
            arrayElements: newArrayElements
         }
      })
   }
   allDeletedItems = () => {
      this.setState(({ arrayElements }) => {       
  
         const newArrayElements = [
            ...arrayElements.slice(arrayElements[0], arrayElements[arrayElements.length-1])         
         ];
         
         return {
            arrayElements: newArrayElements
         }
      })
   }

   addItem = (description, name) => {
      const newItem = this.createTodoItem(description, name);

      this.setState(({arrayElements}) => {

         const newArr = [
            ...arrayElements,
            newItem
         ];

         return {
            arrayElements: newArr
         };
      });
   }

   onToggleItem = (id) => {
      this.setState(({arrayElements}) => {
         const idx = arrayElements.findIndex((el) => el.id === id);

         const oldItem = arrayElements[idx];
         const newItem = {...oldItem,
                     completed:!oldItem.completed};


         const newArrayElements = [
            ...arrayElements.slice(0, idx),
            newItem,
            ...arrayElements.slice(idx + 1)
         ];
         
         return {
            arrayElements:newArrayElements
         }
      });
   }
   onFilterChange = (filter) => {
      this.setState({ filter });
   }

   search(items, term) {
      if(term.length === 0){
         return items;
      }

      return items.filter((item) => {
         return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
      })
   }
   filter(items, filter) {
      switch(filter){
         case undefined:
            return items.filter((item) => !item.completed);
         case 'completed':
            return items.filter((item) => item.completed);
         default:
            return items;
      }
   }


   render() {
      const{arrayElements, term, filter} = this.state;

      const allActiveItemsVisible = this.filter(this.search(arrayElements, term), filter);
      const toggleItem = this.state.arrayElements.filter((item) => item.completed).length;
      const toggleItemEditing = this.state.arrayElements.filter((item) => item.name === 'editing').length;
      const allActiveItem = this.state.arrayElements.length - toggleItem - toggleItemEditing;
      
      return (
         <>
            <NewTaskForm addItemElementForm={this.addItem}/>
            <section className="main">
               <TaskList 
               todos={allActiveItemsVisible}
               onDeleted={this.deletedItem}
               onToggleItem={this.onToggleItem} 
               />               
               <Footer allActiveItem = {allActiveItem}
                        filter = {filter}
                        onFilterChange={this.onFilterChange}
                       allDeletedItems = {this.allDeletedItems} />
            </section>
         </>
      );
   }   
}

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));
root.render(<AppContent/>);

