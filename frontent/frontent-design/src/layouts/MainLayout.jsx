import { lazy, Suspense } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { pageVariants } from '@/animations/pageVariants'
import ScrollProgress from '@/components/common/ScrollProgress'
import Footer from '@/components/navigation/Footer'
import Navbar from '@/components/navigation/Navbar'

const SpaceBackground = lazy(() => import('@/three/SpaceBackground'))
const CustomCursor = lazy(() => import('@/components/common/CustomCursor'))

function MainLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Suspense fallback={null}>
        <SpaceBackground />
        <CustomCursor />
      </Suspense>
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <Motion.main
          key={location.pathname}
          className="content-layer mx-auto w-full max-w-7xl px-4 pb-10 pt-8 md:px-8 md:pt-12"
          initial={pageVariants.initial}
          animate={pageVariants.animate}
          exit={pageVariants.exit}
        >
          <Outlet />
        </Motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default MainLayout
