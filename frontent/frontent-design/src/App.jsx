import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProviders } from '@/context/AppProviders'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import ScrollToTop from '@/components/common/ScrollToTop'
import MainLayout from '@/layouts/MainLayout'

const LoadingScreen = lazy(() => import('@/components/common/LoadingScreen'))
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails'))
const Contact = lazy(() => import('@/pages/Contact'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Login = lazy(() => import('@/pages/Login'))
const Signup = lazy(() => import('@/pages/Signup'))
const OtpVerification = lazy(() => import('@/pages/OtpVerification'))
const ClientEnquiry = lazy(() => import('@/pages/ClientEnquiry'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass-panel px-8 py-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">Loading</p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--color-text)]">Composing Next Scene</h2>
      </div>
    </div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <AppProviders>
      {showIntro ? (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={() => setShowIntro(false)} />
        </Suspense>
      ) : null}
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-otp" element={<OtpVerification />} />
              <Route path="/client-enquiry" element={<ClientEnquiry />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
