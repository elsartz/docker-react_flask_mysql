import React from "react";
import axios from 'axios';

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', content: '' };
    }

    async handleSubmit(e) {
        e.preventDefault();

        const title = document.querySelector('input[name="title"]').value;
        const content = document.querySelector('textarea[name="content"]').value;
      
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
               <div><span>Title <input type="text" name="title" /></span></div>
               <div><textarea rows='8' cols='55' className="form-textarea" name="content" /></div>             
                <button type="submit">Add Note</button>
            </form>
        );
    }
}
