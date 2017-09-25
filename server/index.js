const express = require('express');
const path = require('path');
const port = 1337;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(port, function() {
  console.log(`Server now listening on port ${port}!`);
})