const app = require('../index')

const PORT = Number(process.env.PORT) || 5110

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
