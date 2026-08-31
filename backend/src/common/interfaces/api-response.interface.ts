export interface ApiResponse<T> {
  success: boolean; // true = siker, false = hiba
  statusCode: number; // HTTP státuszkód (pl.: 200, 201, 400, 404, 500)
  timestamp: string; // ISO időbélyeg
  path: string; // Az érintett API endpoint (pl. "/api/vehicles")
  message: string | string[]; // Emberi fogyasztásra alkalmas üzenetek
  data?: T; // Az adat amit visszaküldünk siker esetén.
}
