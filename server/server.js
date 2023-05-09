const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const Sentiment = require('sentiment');

dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/emotion',
    async function(req, res){
        try{
            const { msg } = req.body;
            console.log(msg);

            const sentiment = new Sentiment();
            const score = sentiment.analyze(msg);

            console.log(score)

            return res.status(200).json({
                success: true,
                result: score
            })
        }
        catch(err){
            console.error(err);
            return res.status(500).json({ 
                errorMsg: err
            });
        }
    }   
)

app.post('/joke',
    async function(req, res){
        try{
            axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode').then(response => {
                const jokeStruct = response.data;
                var joke = '';

                if(jokeStruct.error){
                    return res.status(500).json({ 
                        errorMsg: "No joke is found."
                    });
                }
                console.log(jokeStruct);
                if(jokeStruct.type === 'twopart'){
                    joke = jokeStruct.setup + '\n' + jokeStruct.delivery;
                }
                else if(jokeStruct.type === 'single'){
                    joke = jokeStruct.joke;
                }
                return res.status(200).json({
                    success: true,
                    joke: joke
                })
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ 
                    errorMsg: err
                });
            });
        }
        catch(err){
            console.error(err);
            return res.status(500).json({ 
                errorMsg: err
            });
        }
    }   
)

app.listen(PORT, () => console.log(`Server running on on port ${PORT}`))