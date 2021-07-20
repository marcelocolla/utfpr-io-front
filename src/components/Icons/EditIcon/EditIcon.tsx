type EditIconProps = {
  color: string;
};

export const EditIcon = ({ color }: EditIconProps) => {
  return (
    <svg
      id="i-edit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32" 
      fill="#000"
      fill-opacity="0.1"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2">
        <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
    </svg>
  );
};
