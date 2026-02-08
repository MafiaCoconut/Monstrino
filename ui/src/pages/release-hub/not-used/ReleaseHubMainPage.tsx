import { ReleaseHubLayout } from "@/layouts";
import { useNavigate } from "react-router-dom";

export function ReleaseHubPage() {
  const navigate = useNavigate();

  return (
    <ReleaseHubLayout
      onOpenRelease={(id) => {
        navigate(`/releases/${id}`);
      }}
    />
  );
}
