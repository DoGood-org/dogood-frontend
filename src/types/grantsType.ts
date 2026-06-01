export interface IGrantsItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}
export interface IGrantsList {
  items: IGrantsItem[];
  className?: string;
}
