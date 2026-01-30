export interface ReleaseCharacterDTO {
  id?: number | null;
  name: string;
  display_name: string;
  gender?: string | null;
  description?: string | null;
  primary_image?: string | null;
  alt_names?: string | null;
  notes?: string | null;
}
