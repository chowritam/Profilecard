/**
 * @figmaAssetKey 430ce6ee4bfdef3e78b42b654acbcfc8beef32c1
 */
function Ellipse1({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute right-0 size-[140px] top-1/2 translate-y-[-50%]">
        <div className="absolute inset-[-2.86%_-7.14%_-11.43%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 160">
            <g filter="url(#filter0_d_1_22)" id="Ellipse 1">
              <circle cx="80" cy="74" fill="var(--fill-0, #230000)" r="70" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="160" id="filter0_d_1_22" width="160" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_22" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_22" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative shadow-[20px_0px_20px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="absolute bg-[#5c0000] h-[400px] left-0 rounded-[20px] top-0 w-[306px]" />
      <Ellipse1 className="absolute left-[83px] size-[140px] top-[60px]" />
    </div>
  );
}