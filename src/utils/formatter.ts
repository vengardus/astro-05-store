export class Formatter {
  static currency(value: number, decimal: number = 2): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: decimal,
    }).format(value);
  }
}
