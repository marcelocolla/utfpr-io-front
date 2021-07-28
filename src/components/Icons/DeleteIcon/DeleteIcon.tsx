type DeleteIconProps = {
  color: string;
};

export const DeleteIcon = ({ color }: DeleteIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 64 64">
        <path
          fill="#010101"
          fillOpacity="0.1"
          stroke={color}
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M49,62H15a3,3,0,0,1-3-3V10H52V59A3,3,0,0,1,49,62Z"/>
            <line x1="6" x2="58" y1="10" y2="10" fill="#010101" stroke={color} strokeMiterlimit="10" strokeWidth="4"/>
        <path
          fill="#010101"
          fillOpacity="0.1"
          stroke={color}
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M38,2H26a2,2,0,0,0-2,2v6H40V4A2,2,0,0,0,38,2Z"/>
            <line x1="24" x2="24" y1="20" y2="52" fill="#010101" stroke={color} strokeMiterlimit="10" strokeWidth="4"/>
            <line x1="32" x2="32" y1="20" y2="52" fill="#010101" stroke={color} strokeMiterlimit="10" strokeWidth="4"/>
            <line x1="40" x2="40" y1="20" y2="52" fill="#010101" stroke={color} strokeMiterlimit="10" strokeWidth="4"/>
    </svg>
  );
};
