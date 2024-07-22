const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/expense', expenseRoutes);
// Define a root route

app.use(express.static('public'));

//app.get('/', (req, res) => {
 // res.send('Welcome to the Expense Tracker API');
//});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
