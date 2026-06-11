import React from 'react'

const Footer = () => {
  return (
    <div>
         {/* Footer */}
      <footer  className="bg-black px-6 md:px-12 py-10 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#f0ede8]/25">
        <span className="font-serif-disp text-xl">
          Split
          <em className="text-[#c9a96e] not-italic">wise</em>
        </span>

        <nav className="flex gap-6">
          {["Privacy", "Terms", "Help"].map((l) => (
            <a
              key={l}
              href="#"
              className="hover:text-[#f0ede8]/50 transition-colors font-dm"
            >
              {l}
            </a>
          ))}
        </nav>

        <p className="font-dm">© 2026 Splitwise.</p>
      </footer>
    </div>
  )
}

export default Footer