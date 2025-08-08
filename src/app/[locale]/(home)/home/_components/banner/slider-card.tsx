interface SliderCardProps {
  title: string;
  subtitle: string;
  isActive: boolean;
  imageSrc: string;
}

export default function SliderCard({
  title,
  subtitle,
  isActive,
  imageSrc,
}: SliderCardProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-full aspect-[1.8/1] rounded-2xl md:rounded-4xl overflow-hidden  transition-all duration-300 ease-in-out
        ${isActive ? "" : "border border-gray-200"}
      `}
      style={{
        background: `url(${imageSrc}) no-repeat center center / cover`, // lightgray 50%
      }}
    >
      {/* Gradient border for active state */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl md:rounded-4xl"
          style={{
            padding: "2px", // This creates the border effect
            background:
              "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <h3 className="text-lg font-bold">Fanverse</h3>
        <div>
          <h4 className="text-2xl font-bold mb-2">{title}</h4>
          <p className="text-sm opacity-80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
