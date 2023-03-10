import React from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [] };
    }

    async componentDidMount() {
        // axios.get('http://localhost:5000/notes')
        //     .then(res => {
        //         this.setState({ notes: res.data });
        //     });
        const response = await fetch('http://localhost:5000/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
        if (response.ok) {
            const notes = await response.json();
            this.setState({ notes });
            console.log(notes)
        }
    }

    async handleDelete(e) {
        e.preventDefault();

        const id = e.target.parentNode.id;
// console.log(e.target.parentNode);
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Note deleted');
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="list-group">
                {this.state.notes.map(note => (
                    <div id={note.id} className="list-item flex-row justify-space-between align-center" key={note.id}><h3 className="text-uppercase">{note.title}</h3>
                    <p>{note.content}</p>
                    {/* <button className="btn icon-danger" onClick={this.handleDelete}>Delete</button> */}
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={this.handleDelete}>Delete</Button>

                    
                    </div>
                    
                ))}
            </div>
        );
    }
}
