import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function HubLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
