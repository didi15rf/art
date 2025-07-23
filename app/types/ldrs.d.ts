declare global {
  namespace JSX {
    interface IntrinsicElements {
      'l-trefoil': {
        size?: string | number;
        stroke?: string | number;
        'stroke-length'?: string | number;
        'bg-opacity'?: string | number;
        speed?: string | number;
        color?: string | number;
      };
    }
  }
}

export {};
