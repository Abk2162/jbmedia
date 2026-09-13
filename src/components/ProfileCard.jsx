export default function ProfileCard({ name, role, portrait, person }) {
  const finalName = name || person?.name || "Leader Name";
  const finalRole = role || person?.role || "Club Role";
  const finalPortrait = portrait || person?.portrait || null;

  return (
    <div className="group relative rounded-3xl border border-white/10 hover:border-gold-500/40 bg-gradient-to-b from-[#141b2b] via-[#0d131f] to-[#070a12] overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.85)] flex flex-col justify-between h-[450px] sm:h-[480px] w-full">
      {/* Soft ambient backlighting matching the reference card */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header: Name and Post at the top, centered, clean and neat */}
      <div className="relative z-10 pt-7 sm:pt-8 px-6 text-center flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold-200 transition-colors">
          {finalName}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-gold-300/80 transition-colors mt-1 tracking-wide">
          {finalRole}
        </p>
      </div>

      {/* Portrait area: Centered and grounded at the bottom edge */}
      <div className="relative z-10 w-full flex-1 flex items-end justify-center overflow-hidden px-4">
        {finalPortrait ? (
          <img
            src={finalPortrait}
            alt={finalName}
            loading="lazy"
            className="w-full h-full max-h-[330px] sm:max-h-[360px] object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 font-bold text-2xl mb-12">
            {finalName.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}

