import React, { Component } from 'react';
import axios from 'axios';

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      sent: false,
      FailedToSend: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    axios({
      method: "POST",
      url:"http://localhost:4444/api/send",
      data: {
        name: name,
        email: email,
        message: message
      }
    }).then((response)=>{
        this.setState({ loading: true });
        if (response.data === 'Success') {
          this.setState({
            loading: false,
            sent: true
          })
          console.log("Message Sent");
          this.resetForm();
        }
        else if(response.data !== 'Success') {
          this.setState({
            loading: false,
            FailedToSend: true
          })
          console.log("Message failed to send.");
        }
    })
  }

  resetForm() {
    document.getElementById('contact-form').reset();
  }

  render() {

    const { loading, sent, FailedToSend } = this.state;

    function Submit() {
      if(loading) {
        return "...Loading";
      }
      else if(sent) {
        return "Message Sent!";
      }
      else if(FailedToSend){
        return "Send Failed";
      }
    }

    return(
      <div className="contact-form-container">
        <h2 className="text-center">Get in Touch</h2>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
            <input type="text" className="form-control" id="name" placeholder="Name"/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="5" id="message" placeholder="Message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <h3>{Submit()}</h3>
        </form>

      </div>
    );
  }
}

export default ContactForm;
