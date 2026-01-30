export interface ReleaseSeriesDTO {
  id?: number | null;
  name: string;
  display_name: string;
  description?: string | null;
  series_type: string;
  primary_image?: string | null;
  parent_id?: number | null;
}
