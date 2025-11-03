const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Sync all models automatically
sequelize.sync({ alter: true }).then(() => {
  console.log(' All models synchronized');
});

app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));




app.get('/', (req, res) => {
    console.log(' Backend Working!!');
    res.send(' CRM Backend API is running successfully!');
  });

  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
