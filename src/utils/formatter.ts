export class Formatter {
  static currency(value: number, decimal: number = 2): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: decimal,
    }).format(value);
  }

  static image(value: string): string {
    return value.startsWith("http") ? value : `${import.meta.env.PUBLIC_URL}/images/products/${value}`;
  }
}
