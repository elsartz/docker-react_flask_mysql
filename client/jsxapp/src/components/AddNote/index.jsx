import React from "react";
import { Input, InputLabel, TextField, FormControl, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

let content = ''
export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', content: '' };
    }


    async handleSubmit(e) {
        e.preventDefault();

        const title = document.querySelector('Input[name="title"]').value;

        if (title === '' || content === '') {
          return alert('Please fill in all fields');
        }

        const response = await fetch(`http://localhost:5000/notes`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log('Note added');
          window.location.reload();
        }
    }

    render() {
        return (
            <form className="form-input" onSubmit={this.handleSubmit}>
              <div className="div">
              <FormControl>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input type="text" name="title" />
              </FormControl>
              </div>
              <br/>
              <div className="div">
              <FormControl>
                  <TextField 
                    multiline={true}
                    rows={10}
                    // fullWidth={true}
                    className="custom-textfield"
                    label="Content" 
                    name="content" 
                    variant="outlined" 
                    onChange={(event) => content = event.target.value}
                  />
              </FormControl>
              </div>
              <br/>
              <div className="flex-row justify-space-around">
                <Button 
                  size="small"
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                  type="submit">Add Note</Button>
              </div>
              
            </form>
            
        );
    }
}
