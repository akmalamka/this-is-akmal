export default function CoreRotatingTextCursor({ text }: { text: string }) {
  return (
    <>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Red circle background */}
        <circle cx="100" cy="100" r="90" fill="red" />
      </svg>

      {/* Rotating text on top using absolute positioning */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full absolute top-0 left-0 animate-[spin_6s_linear_infinite]"
      >
        <defs>
          {/* Smaller radius = padding inward */}
          <path
            id="textCircle"
            d="
              M 100,100
              m -65,0
              a 65,65 0 1,1 130,0
              a 65,65 0 1,1 -130,0
            "
          />
        </defs>

        <text className="font-sans text-[14px] fill-white">
          <textPath href="#textCircle" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </>
  );
}
