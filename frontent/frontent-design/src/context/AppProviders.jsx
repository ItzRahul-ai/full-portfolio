import { PortfolioProvider } from '@/context/PortfolioContext'
import { ThemeProvider } from '@/context/ThemeContext'

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>{children}</PortfolioProvider>
    </ThemeProvider>
  )
}
