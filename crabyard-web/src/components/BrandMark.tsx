import BlueCrabLogo from "./BlueCrabLogo";

type Props = {
  size?: number;
  gap?: string;
  yardClassName?: string;
  className?: string;
  monochrome?: boolean;
};

export default function BrandMark({
  size = 22,
  gap = "0.2em",
  yardClassName = "text-white",
  className = "",
  monochrome = false,
}: Props) {
  return (
    <span
      className={`inline-flex items-center align-middle leading-none ${className}`}
      style={{ gap }}
      aria-label="Blue Crab Yard"
    >
      <BlueCrabLogo size={size} monochrome={monochrome} />
      <span className={`font-semibold tracking-tight ${yardClassName}`}>Yard</span>
    </span>
  );
}
