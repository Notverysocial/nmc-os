export default function ScanLines() {
  return (
    <>
      {/* Static grid-like scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ 
          zIndex: 2, 
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,43,80,0.1) 2px, rgba(26,43,80,0.1) 4px)' 
        }} 
      />
      {/* Periodic sweep line */}
      <div 
        className="fixed left-0 right-0 h-[100px] pointer-events-none animate-scan-sweep opacity-[0.07]"
        style={{
          zIndex: 3,
          background: 'linear-gradient(to bottom, transparent, rgba(26,43,80,0.4), transparent)',
        }}
      />
    </>
  );
}
