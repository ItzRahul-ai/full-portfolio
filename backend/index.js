require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {
  createEnquiry,
  createProject,
  createToken,
  createUser,
  deleteProject,
  findEnquiryByReference,
  findUserByEmail,
  hashPassword,
  listEnquiries,
  listProjects,
  updateEnquiry,
  updateProject,
} = require('./data/store')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend server is running')
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/login', (req, res) => {
  const { email = '', password = '' } = req.body || {}
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: 'Email and password required.' })
  }

  const user = findUserByEmail(normalizedEmail)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  if (user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ message: 'Wrong password.' })
  }

  return res.json({
    message: 'Login successful.',
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

app.post('/api/auth/signup', (req, res) => {
  const { name = '', email = '', password = '' } = req.body || {}
  const normalizedEmail = email.trim().toLowerCase()

  if (!name.trim() || !normalizedEmail || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  if (findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  const user = createUser({
    name: name.trim(),
    email: normalizedEmail,
    password,
  })

  return res.status(201).json({
    message: 'Signup successful.',
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

app.post('/api/auth/otp', (req, res) => {
  const { email = '', otp = '' } = req.body || {}
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail || !otp.trim()) {
    return res.status(400).json({ message: 'Email and OTP are required.' })
  }

  const user = findUserByEmail(normalizedEmail)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  if (otp.trim() !== '123456') {
    return res.status(400).json({ message: 'Invalid OTP. Use 123456 for local development.' })
  }

  return res.json({
    message: 'OTP verified successfully.',
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

app.get('/api/projects', (req, res) => {
  res.json({ projects: listProjects() })
})

app.post('/api/projects', (req, res) => {
  const project = createProject(req.body || {})
  res.status(201).json({ message: 'Project created.', project })
})

app.put('/api/projects/:id', (req, res) => {
  const project = updateProject(req.params.id, req.body || {}, { replace: true })

  if (!project) {
    return res.status(404).json({ message: 'Project not found.' })
  }

  return res.json({ message: 'Project updated.', project })
})

app.patch('/api/projects/:id', (req, res) => {
  const project = updateProject(req.params.id, req.body || {}, { replace: false })

  if (!project) {
    return res.status(404).json({ message: 'Project not found.' })
  }

  return res.json({ message: 'Project updated.', project })
})

app.delete('/api/projects/:id', (req, res) => {
  const removed = deleteProject(req.params.id)

  if (!removed) {
    return res.status(404).json({ message: 'Project not found.' })
  }

  return res.json({ message: 'Project deleted.', id: req.params.id })
})

app.get('/api/enquiries', (req, res) => {
  res.json({ enquiries: listEnquiries() })
})

app.post('/api/enquiries', (req, res) => {
  const enquiry = createEnquiry(req.body || {})
  res.status(201).json({ message: 'Enquiry submitted.', enquiry })
})

app.put('/api/enquiries/:id', (req, res) => {
  const enquiry = updateEnquiry(req.params.id, req.body || {}, { replace: true })

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  return res.json({ message: 'Enquiry updated.', enquiry })
})

app.patch('/api/enquiries/:id', (req, res) => {
  const enquiry = updateEnquiry(req.params.id, req.body || {}, { replace: false })

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  return res.json({ message: 'Enquiry updated.', enquiry })
})

app.get('/api/enquiries/reference/:reference', (req, res) => {
  const enquiry = findEnquiryByReference(req.params.reference)

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  return res.json({ enquiry })
})

module.exports = app
