// // // Importing Modules
// // const express = require('express');
// // const path = require('path')
// // const cors = require('cors')
// // const jwt = require('jsonwebtoken')
// // const imageRouter = require('./routes/imageRouter.js')
// // const authRouter = require('./routes/authRouter.js')
// // // Middleware
// // const app = express();
// // app.use('/images', express.static(path.join(__dirname, "/uploads")))

// // app.use(cors({ origin: true }))
// // app.use(express.json())

// // app.use('/api/v1/auth', authRouter)

// // app.use((req, res, next) => {
// //     let token = req.headers.authorization
// //     if (token && token.startsWith('Bearer')) {
// //         token = token.split(' ')[1]

// //         try {
// //             jwt.verify(token, process.env.SECRET)
// //             next()
// //         } catch (e) {
// //             console.log(e)
// //             return res.status(401).json({
// //                 message: 'Unauthorized'
// //             })
// //         }

// //     }

// // })

// // app.use('/api/v1/images', imageRouter)

// // module.exports = app



const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const imageRouter = require('./routes/imageRouter');
const authRouter = require('./routes/authRouter');
const contactRouter = require('./routes/contactRoutes'); 

const app = express();
app.use('/images', express.static(path.join(__dirname, "/uploads")));

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        console.log('Received token:', token);

        try {
            jwt.verify(token, process.env.SECRET);
            next();
        } catch (e) {
            console.log('JWT verification error:', e);
            return res.status(401).json({
                message: 'Unauthorized',
                error: e.message
            });
        }
    } else {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
});

app.use('/api/v1/images', imageRouter);
app.use('/api/v1/contact', contactRouter); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Please try again.' });
});

module.exports = app;
