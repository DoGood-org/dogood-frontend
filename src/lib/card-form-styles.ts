export const CARD_FORM_OVERRIDE_CLASSES = `
  /* INPUT BASE STYLES */
  [&_input]:border 
  [&_input]:border-[#111113]
  [&_input]:bg-[#ffffff]
  [&_input]:py-3 
  [&_input]:px-4
  [&_input]:h-auto
  [&_input]:text-base
  [&_input]:text-[#010101]

  /* INPUT FOCUS STYLES */
  [&_input]:ring-0       
  
  /* INPUT CLEANUP STYLES */
  [&_input]:rounded-sm 
  [&_input]:shadow-none
  [&_input]:outline-none

  /* DIV RELATIVE STYLES */
  [&_div.relative]:border
  [&_div.relative]:border-[#111113] 
  [&_div.relative]:bg-[#ffffff]
  [&_div.relative]:h-12
  [&_div.relative]:p-3
  [&_div.relative]:rounded-sm

[&_.w-\[175px\]]:(border border-[#111113] bg-[#ffffff])
[&_.w-\[133px\]]:(border border-[#111113] bg-[#ffffff])
`;
