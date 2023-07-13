import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/users';

const app = express()

// ------ Middleware ------ //
// Logging (global)
app.use(morgan('dev'))

// Allows client to send json
app.use(express.json())

// Allows client to send query string (route params)
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use((req, res, next) => {
    req.shhhh_secret = 'doggy';
    next();
})

// ------------------------ //

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'hello' })
})

app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin)

// Global error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.json({ message: `had an error: ${err.message}` })
})

export default app;