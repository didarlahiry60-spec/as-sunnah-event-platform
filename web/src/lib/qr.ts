import QRCode from "qrcode";

/**
 * QR Code Generator for As-Sunnah Foundation Venue Passes
 */

export interface QrCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Generates an SVG string representation of a QR code
 */
export async function generateQrCodeSvg(
  text: string,
  options?: QrCodeOptions
): Promise<string> {
  const defaultOptions: QRCode.QRCodeToStringOptions = {
    type: "svg",
    width: options?.width ?? 220,
    margin: options?.margin ?? 1,
    color: {
      dark: options?.color?.dark ?? "#04180F", // brand-950
      light: options?.color?.light ?? "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  };

  return QRCode.toString(text, defaultOptions);
}

/**
 * Generates a base64 DataURL (image/png) for a QR code
 */
export async function generateQrCodeDataUrl(
  text: string,
  options?: QrCodeOptions
): Promise<string> {
  const defaultOptions: QRCode.QRCodeToDataURLOptions = {
    width: options?.width ?? 220,
    margin: options?.margin ?? 1,
    color: {
      dark: options?.color?.dark ?? "#04180F",
      light: options?.color?.light ?? "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  };

  return QRCode.toDataURL(text, defaultOptions);
}

/**
 * Constructs the canonical verification URL encoded in the QR code
 */
export function buildPassVerificationUrl(qrToken: string, baseUrl?: string): string {
  const origin = baseUrl || process.env.APP_URL || "https://assunnah.foundation";
  return `${origin}/checkin?token=${encodeURIComponent(qrToken)}`;
}
