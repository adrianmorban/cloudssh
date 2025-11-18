import { Outlet } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function RootLayout() {
  return (
    <div className="bg-bg-primary h-screen">
      <main className="flex h-full">
        <Sidebar />
        <section className='w-full'>
          <Navbar />
          <div className='p-8'>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  )
}
