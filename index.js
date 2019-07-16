const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const { USER, PASS } = require('./config');

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});

app.post('/api/send', (req, res) => {
  var data = req.body;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
  });

  var mailOptions = {
    from: data.email,
    to: USER,
    subject: 'Contact Form',
    html: `<p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Message: ${data.message}</p>`
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if(error) {
      res.send(error)
    } else {
      res.send('Success')
    }
  });

})

app.listen(port, () => {
  console.log('We are live on port 4444');
});
