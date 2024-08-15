import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createApi } from 'unsplash-js';

import TodoCard from "./TodoCard/TodoCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

const unsplash = createApi({
  accessKey: ''
});

function App() {
  
  const [cards, setCards] = useState(new Array<string>())
  const [cardToDelete, setCardToDelete] = useState<string>('')
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setCards([...cards.filter(card => card !== cardToDelete)])
  }, [cardToDelete, setCards])

  useEffect(() => {
    unsplash.photos.getRandom({
      orientation: 'landscape',
      topicIds: ['wallpapers']
    }).then(results => {
      if (!Array.isArray(results.response)){
        setImageUrl(results.response?.urls.regular ?? '')
      }
    })
  }, [])

  const myStyle = {
    backgroundImage:
        `url('${imageUrl}')`,
    height: "100dvh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "aqua"
}

  const textInput = useRef<TextFieldProps>(null);

  const handleKeyDown = useCallback((keyDownEvent: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyDownEvent.key === 'Enter'){
      setCardToDelete('')
      setCards([...cards, textInput.current!.value as string])
      textInput.current!.value = ''
    }
  }, [setCardToDelete, setCards, textInput])

  return (
    <div style={myStyle} className="homeContainer">
      <div id="rootContainer">
        {cards.length < 3 && <TextField 
          id="outlined-basic" 
          label="Task" 
          variant="standard" 
          margin="normal" 
          inputRef={textInput} 
          fullWidth 
          onKeyDown={e => handleKeyDown(e)}
        />}
        <br/>
        <div>
          {cards.map((cardContent, i) => <TodoCard 
            content={cardContent} 
            key={i} 
            deleteCardCallback={setCardToDelete}
            />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
