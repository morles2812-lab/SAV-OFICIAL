import type { SVGProps } from 'react';

export function Tiktok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H12v6a2.5 2.5 0 1 0 5 0V7.5a7.5 7.5 0 0 0-5.52-7.3" />
      <path d="M12 12.5a2.5 2.5 0 1 0-5 0v6a2.5 2.5 0 1 0 5 0" />
    </svg>
  );
}
