declare module 'flubber' {
  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: {
      maxSegmentLength?: number;
      string?: boolean;
    }
  ): (t: number) => string;

  export function toPath(
    shape: Array<[number, number]> | string,
    options?: {
      maxSegmentLength?: number;
    }
  ): string;

  export function fromCircle(
    x: number,
    y: number,
    radius: number,
    options?: {
      maxSegmentLength?: number;
    }
  ): string;

  export function toCircle(
    shape: Array<[number, number]> | string,
    x: number,
    y: number,
    radius: number,
    options?: {
      maxSegmentLength?: number;
    }
  ): string;

  export function separate(
    fromShape: string,
    toShapes: string[],
    options?: {
      maxSegmentLength?: number;
      string?: boolean;
    }
  ): Array<(t: number) => string>;

  export function combine(
    fromShapes: string[],
    toShape: string,
    options?: {
      maxSegmentLength?: number;
      string?: boolean;
    }
  ): Array<(t: number) => string>;
} 