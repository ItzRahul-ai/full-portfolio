const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const dataFilePath = path.join(__dirname, 'data.json')

function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password)).digest('hex')
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createToken(user) {
  return Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      issuedAt: Date.now(),
    }),
  ).toString('base64')
}

function createDefaultState() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@dipcoder.dev').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  return {
    users: [
      {
        id: 'user-admin',
        name: 'Dip Coder',
        email: adminEmail,
        passwordHash: hashPassword(adminPassword),
        role: 'admin',
        verified: true,
        createdAt: '2026-03-09',
      },
    ],
    projects: [
      {
        id: 'candid-custard-portfolio',
        slug: 'candid-custard-portfolio',
        title: 'Candid Custard Experience',
        client: 'Personal Showcase',
        category: 'Developer Portfolio',
        year: '2026',
        status: 'completed',
        summary: 'A polished portfolio interface with modern layout rhythm and animated presentation.',
        challenge: 'Create a clean personal brand site that still feels interactive and memorable.',
        solution: 'Built focused page flow with subtle motion, clear information hierarchy, and responsive behavior.',
        impact: 'Improved first impression quality and project presentation confidence.',
        tags: ['React', 'UI Design', 'Animation'],
        gradientFrom: '#6ac2ff',
        gradientTo: '#9077ff',
        liveUrl: 'https://candid-custard-f55954.netlify.app/',
        visuals: ['Landing composition', 'Animated section transitions', 'Responsive content layout'],
      },
      {
        id: 'magical-moxie-showcase',
        slug: 'magical-moxie-showcase',
        title: 'Magical Moxie Showcase',
        client: 'Creative Build',
        category: 'Interactive Website',
        year: '2026',
        status: 'completed',
        summary: 'An energetic web experience balancing playful visuals and performance.',
        challenge: 'Maintain visual richness without harming load speed and readability.',
        solution: 'Used lightweight animation patterns and clean component structure for scalable updates.',
        impact: 'Delivered a highly engaging browsing experience with stable responsiveness.',
        tags: ['Frontend', 'Framer Motion', 'UX'],
        gradientFrom: '#40d4bf',
        gradientTo: '#64a2ff',
        liveUrl: 'https://magical-moxie-30e0fd.netlify.app/',
        visuals: ['Immersive hero area', 'Interactive cards', 'Motion-driven storytelling'],
      },
      {
        id: 'golden-raindrop-work',
        slug: 'golden-raindrop-work',
        title: 'Golden Raindrop Project',
        client: 'Concept Release',
        category: 'Frontend Concept',
        year: '2026',
        status: 'completed',
        summary: 'A vivid frontend concept blending elegant structure with smooth interaction design.',
        challenge: 'Ship a premium look while preserving maintainable and readable code.',
        solution: 'Structured reusable sections and polished transitions with mobile-first adjustments.',
        impact: 'Created a portfolio-ready concept suitable for live client demos.',
        tags: ['React', 'Tailwind', 'Responsive'],
        gradientFrom: '#f9aa56',
        gradientTo: '#f06f83',
        liveUrl: 'https://golden-raindrop-0acda1.netlify.app/',
        visuals: ['Premium color direction', 'Interactive layout blocks', 'Refined mobile adaptation'],
      },
    ],
    enquiries: [
      {
        id: 'ENQ-2401',
        reference: 'ENQ-2401',
        type: 'project',
        name: 'Ananya Sen',
        email: 'ananya@atlascommerce.io',
        phone: '9876543210',
        company: 'Atlas Commerce',
        service: 'Experience Engineering',
        budget: '$12k - $25k',
        message: 'Looking for a complete redesign of our B2B dashboard.',
        status: 'reviewing',
        createdAt: '2026-03-04',
      },
    ],
  }
}

function writeState(state) {
  fs.writeFileSync(dataFilePath, JSON.stringify(state, null, 2))
}

function readState() {
  if (!fs.existsSync(dataFilePath)) {
    const defaultState = createDefaultState()
    writeState(defaultState)
    return defaultState
  }

  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  const parsedState = JSON.parse(fileContents)

  return {
    users: Array.isArray(parsedState.users) ? parsedState.users : [],
    projects: Array.isArray(parsedState.projects) ? parsedState.projects : [],
    enquiries: Array.isArray(parsedState.enquiries) ? parsedState.enquiries : [],
  }
}

function updateState(mutator) {
  const state = readState()
  const nextState = mutator(state) || state
  writeState(nextState)
  return nextState
}

function listProjects() {
  return readState().projects
}

function listEnquiries() {
  return readState().enquiries
}

function findUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  return readState().users.find((user) => user.email === normalizedEmail) || null
}

function createUser({ name, email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const user = {
    id: `user-${Date.now()}`,
    name: String(name || '').trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role: normalizedEmail === (process.env.ADMIN_EMAIL || 'admin@dipcoder.dev').trim().toLowerCase() ? 'admin' : 'user',
    verified: true,
    createdAt: new Date().toISOString().slice(0, 10),
  }

  updateState((state) => {
    state.users.unshift(user)
    return state
  })

  return user
}

function normalizeProjectInput(input = {}, fallbackId = '') {
  const title = String(input.title || input.name || 'Untitled Project').trim()
  const id = String(input.id || input.slug || fallbackId || slugify(title) || `project-${Date.now()}`)
  return {
    id,
    slug: String(input.slug || id),
    title,
    client: String(input.client || input.clientName || 'Unknown Client'),
    category: String(input.category || 'Web Project'),
    year: String(input.year || new Date().getFullYear()),
    status: String(input.status || 'draft'),
    summary: String(input.summary || input.description || ''),
    challenge: String(input.challenge || ''),
    solution: String(input.solution || ''),
    impact: String(input.impact || ''),
    tags: Array.isArray(input.tags) ? input.tags : [],
    gradientFrom: String(input.gradientFrom || '#57b8ff'),
    gradientTo: String(input.gradientTo || '#9f7cff'),
    liveUrl: String(input.liveUrl || input.url || ''),
    visuals: Array.isArray(input.visuals) ? input.visuals : [],
  }
}

function createProject(input) {
  const project = normalizeProjectInput(input)

  updateState((state) => {
    state.projects.unshift(project)
    return state
  })

  return project
}

function updateProject(id, input, options = {}) {
  const targetId = String(id)
  const { replace = false } = options
  let updatedProject = null

  updateState((state) => {
    const index = state.projects.findIndex((project) => project.id === targetId || project.slug === targetId)

    if (index === -1) {
      return state
    }

    const currentProject = state.projects[index]
    updatedProject = replace
      ? normalizeProjectInput(input, currentProject.id)
      : { ...currentProject, ...input, id: currentProject.id, slug: currentProject.slug }

    state.projects[index] = updatedProject
    return state
  })

  return updatedProject
}

function deleteProject(id) {
  const targetId = String(id)
  let removed = false

  updateState((state) => {
    const nextProjects = state.projects.filter((project) => project.id !== targetId && project.slug !== targetId)
    removed = nextProjects.length !== state.projects.length
    state.projects = nextProjects
    return state
  })

  return removed
}

function normalizeEnquiryInput(input = {}, fallbackReference = '') {
  const reference = String(input.reference || input.id || fallbackReference || `ENQ-${Date.now()}`)
  return {
    id: reference,
    reference,
    type: String(input.type || 'general'),
    name: String(input.name || ''),
    email: String(input.email || ''),
    phone: String(input.phone || ''),
    company: String(input.company || ''),
    service: String(input.service || ''),
    budget: String(input.budget || ''),
    message: String(input.message || ''),
    status: String(input.status || 'new'),
    createdAt: String(input.createdAt || new Date().toISOString().slice(0, 10)),
  }
}

function createEnquiry(input) {
  const enquiry = normalizeEnquiryInput(input)

  updateState((state) => {
    state.enquiries.unshift(enquiry)
    return state
  })

  return enquiry
}

function updateEnquiry(id, input, options = {}) {
  const targetId = String(id)
  const { replace = false } = options
  let updatedEnquiry = null

  updateState((state) => {
    const index = state.enquiries.findIndex(
      (enquiry) => enquiry.id === targetId || enquiry.reference === targetId,
    )

    if (index === -1) {
      return state
    }

    const currentEnquiry = state.enquiries[index]
    updatedEnquiry = replace
      ? normalizeEnquiryInput(input, currentEnquiry.reference)
      : { ...currentEnquiry, ...input, id: currentEnquiry.id, reference: currentEnquiry.reference }

    state.enquiries[index] = updatedEnquiry
    return state
  })

  return updatedEnquiry
}

function findEnquiryByReference(reference) {
  const normalizedReference = String(reference || '').trim().toLowerCase()
  return (
    readState().enquiries.find(
      (enquiry) => String(enquiry.reference || '').trim().toLowerCase() === normalizedReference,
    ) || null
  )
}

module.exports = {
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
}

readState()
