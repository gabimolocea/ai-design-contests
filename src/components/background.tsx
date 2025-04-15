'use client'

export function LumaStyleBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30" />
      
      
      {/* Animated blobs */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-[100px]" />
    </div>
  )
}