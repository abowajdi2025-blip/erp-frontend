export interface MenuItem {
  key: string;
  label: string;
  icon: any;
  items: string[];
}

export interface KPIStat {
  title: string;
  value: string | number;
  icon: any;
  trend?: number;
}