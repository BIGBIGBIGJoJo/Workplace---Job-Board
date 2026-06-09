import React from 'react'
import { Link } from 'react-router-dom'

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Jobs", to: "/jobs" },
      { label: "About", to: "/about" },
      { label: "Profile", to: "/profile" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/signing" },
      { label: "Forgot password", to: "/forgot-password" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">Workplace</h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              A full-stack job board demo for candidate search, account flows, and employer operations.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-gray-300 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/BIGBIGBIGJoJo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-300 transition hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-400">&copy; Workplace by JoJo 2026</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
