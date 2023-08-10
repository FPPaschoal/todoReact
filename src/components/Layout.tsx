import { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export function Layout() {
  return (
    <div className="h-screen pt-16">
      <div className="mx-auto mb-5 max-w-2xl rounded-[30px] bg-white px-7 pb-16 pt-10">
        <header className="flex w-full items-center py-5">
          <h1 className="animate-rotate bg-red-400 text-3xl">To Do List</h1>

          <LinkNavegador to="/" className="ml-auto">
            Home Page
          </LinkNavegador>
          <LinkNavegador to="/about">About Page</LinkNavegador>
          <LinkNavegador to="/teste">Teste Page</LinkNavegador>
        </header>

        <hr />

        <Outlet />
      </div>
    </div>
  )
}

function LinkNavegador({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <NavLink to={to} className={twMerge('group ml-4 text-lg aria-[current=page]:text-blue-600', className)}>
      {children}
      <div className="h-px w-0 bg-black transition-all duration-300 ease-out group-hover:w-full group-aria-[current=page]:w-full"></div>
    </NavLink>
  )
}
