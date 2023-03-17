import { useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {TextField} from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemSecondaryAction } from '@mui/material';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { addTodo, removeTodo, completeTodo } from "./store/todo/todoSlice";


function App() {

   const [todoTitle, setTodoTitle] = useState("");
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();


  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center", marginTop: '3rem'}} variant="h4">
        TypeScript List
      </Typography>
       <BoxShadow>
       <TextField
        variant="outlined"
        label="To Do Item"
        fullWidth
        onChange={(e) => setTodoTitle(e.target.value)}
        value={todoTitle}
      />
      <Button
        variant="contained"
        color="info"
        fullWidth
        onClick={() => {
          dispatch(addTodo(todoTitle));
          setTodoTitle("");
        }}
      >
        Add 
      </Button>
       </BoxShadow>
      <StyleList>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </ListItemText>
            <StyleAction>
              <RestoreFromTrashIcon
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
              </RestoreFromTrashIcon>
              <Checkbox
                edge="end"
                sx={{
                  color:pink[800],
                  '&.Mui-checked':{
                    color:pink[600],
                  },
                }}
                value={todo.completed}
                onChange={() => {
                  dispatch(
                    completeTodo({ completed: !todo.completed, id: todo.id })
                  );
                }}
              />
            </StyleAction>
          </ListItem>
        ))}
      </StyleList>
    </Container>
  );
}

export default App;

const StyleList = styled(List)({
    backgroundColor:'#1bd4ac',
    display: 'flex',
    marginTop: '0.5rem',
    flexDirection:'column',
    borderRadius: '9px',
   
})
const StyleAction = styled(ListItemSecondaryAction)({
  display: 'flex',
  alignItems: 'center', 
})
const BoxShadow = styled('div')({
  webkitBoxShadow: '15px 17px 27px -8px rgba(34, 60, 80, 0.31)',
  mozBoxShadow:' 15px 17px 27px -8px rgba(34, 60, 80, 0.31)',
  boxShadow: '15px 17px 27px -8px rgba(34, 60, 80, 0.31)',
})


