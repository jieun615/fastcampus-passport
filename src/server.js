const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

mongoose.connect(`mongodb+srv://RJ36l5:vsaHikMWieXgVdx1@cluster0.vwbpndz.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/static", express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});