import { Outlet } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function RootLayout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
