import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { Todo } from "../../components/todo/todo"
import { v4 as uuidv4 } from "uuid"




const initialState = [] as Todo[];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers:{
    addTodo:{
        reducer: (state, action: PayloadAction<Todo>)=> {
            state.push(action.payload);
        },
        prepare: (title: string)=> ({
            payload:{
                id:uuidv4(),
                title,
                completed: false,
            } as Todo,
             
        }),
    },
      removeTodo(state, action: PayloadAction<string>) {
        const index = state.findIndex((todo)=> todo.id === action.payload)
      state.splice(index, 1)
      },

      completeTodo(state, action: PayloadAction<{completed: boolean; id:string}> ) {
        const index = state.findIndex((todo)=> todo.id === action.payload.id)
        state[index].completed = action.payload.completed
      },
  },
})

export const {addTodo, removeTodo, completeTodo} = todoSlice.actions;
export default todoSlice.reducer;