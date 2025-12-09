'use client'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-2">Elegant Steel Hardware</h3>
            <p className="text-slate-400 text-sm">Professional fabrication management system</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Powered By</h3>
            <p className="text-slate-400 text-sm">Kelly Operating Systems (KellyOS)</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Contact</h3>
            <p className="text-slate-400 text-sm">📞 0798293831</p>
          </div>
        </div>
        <div className="border-t border-slate-700/50 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 Elegant Steel Hardware. System powered by KellyOS. Contact: 0798293831
          </p>
        </div>
      </div>
    </footer>
  )
}
