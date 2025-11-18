import { RouterProvider } from '@tanstack/react-router'
import { router } from './router/router'
import './style.css'

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
