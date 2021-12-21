const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const noteRoutes = require('./routes/noteRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', noteRoutes);

app.listen(PORT, () => console.log(`API server now on port http://localhost:${PORT}!`));