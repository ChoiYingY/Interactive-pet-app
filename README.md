# Getting Started with the project

The development of the app involves with the use of software such as Blender for creating 3D model, as well as JavaScript and its associated frameworks/runtime environment, including React.js, Express.js and Node.js. Speechly API is used for speech-to-text conveby recording user’s audio through microphone and convert to speech

## How to run this project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `cd server` and `nodemon server.js`

Open another tab on your terminal and change your current directory to server. Then you will start the Node.js application by executing the server.js file. This application will help on backend server side & provide this web app a real-time communication support. The bot will fail to analyze your text tone without this step.

## App functionality overview
1. You can click on buttons to change costume / rename your pet on home page
2. You can play game w/ the bot, which knows how to block your move!
3. You can send message to the bot by input from keyboard or recording speech (press on the mic button). The Bot will reply back based on the type of your message (case insensitive):<br>
   a) Commands:<br>
      <ul>
        <li>Play tic-tac-toe: by entering message such as 'game' / 'tic-tac-toe' / 'tic tac toe' / "let's play game" / "lets play tic-tac-toe", etc. </li>
        <li>Ask date: by entering message such as 'date' / 'day' / "what's the date" / "whats todays date" / "what is todays date?", etc. </li>
        <li>Ask time: by entering message such as 'time' / "what's the current time" / "whats the time" / "what is the current time?", etc. </li>
      </ul>
   b) Greetings/Questions:<br>
      <ul>
        <li>Greet 1: by entering message such as 'hi' / 'hello', etc. </li>
        <li>Greet 2: by entering message such as 'how are you feeling' / 'how r u doing?', etc. </li>
        <li>Farewell: by entering message such as 'bye' / 'goodbye', 'farewell', etc. </li>
        <li>Introduction 1 (ask name): by entering message such as 'name' / 'whats your name?' / 'what is your name????', etc. </li>
        <li>Introduction 2 (provide name): by entering message such as 'my name is (insert_your_name)'</li>
      </ul>
   c) Analyze text tone:<br>
      <ul>
        <li>Positive: if your message has an overall positive word choice</li>
        <li>Negative: if your message has an overall negative word choice</li>
        <li>Neutral: if your message has neither positive or negative word choice</li>
      </ul>