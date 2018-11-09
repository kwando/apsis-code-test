const createServer = require('./createServer');
const port = parseInt(process.env.PORT || "4005");

const server = createServer();


server.listen(port, ()=>{
  console.log(`bowling score server started on port ${port}`)
});