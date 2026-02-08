
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PetsIcon from "@mui/icons-material/Pets";
import ImageIcon from "@mui/icons-material/Image";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

const colors = {
  background: "#0d0d0f",
  surface: "#1a1a1e",
  textPrimary: "#f5f5f7",
  textSecondary: "#8a8a8f",
  accentPrimary: "#9d4edd",
  accentSecondary: "#c77dff",
  border: "#2a2a2e",
  silver: "#a0a0a8",
};

const WordmarkDoubleRule = ({ onClick }: { onClick?: () => void }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    cursor: onClick ? "pointer" : "default",
  }}>
    <span style={{
      width: "100%",
      height: "1px",
      backgroundColor: colors.border,
    }} />
    <span style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
      color: colors.textPrimary,
      padding: "0 8px",
    }}>
      MONSTRINO
    </span>
    <span style={{
      width: "100%",
      height: "1px",
      backgroundColor: colors.border,
    }} />
  </div>
);

const CollectorHubHeader = () => {
  const navigate = useNavigate();
  const navIcons = [
    { icon: GridViewIcon, label: "Releases", path: "/catalog/r" },
    { icon: PersonIcon, label: "Characters", path: "/catalog/c" },
    { icon: MenuBookIcon, label: "Series", path: "/catalog/s" },
    { icon: PetsIcon, label: "Pets", path: "/catalog/p" },
    { icon: ImageIcon, label: "Media", disabled: true },
  ];

  const styles = {
    header: {
      backgroundColor: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      padding: "0 24px",
      height: "72px",
    } as React.CSSProperties,
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      height: "100%",
      display: "flex",
      alignItems: "center",
      gap: "24px",
    } as React.CSSProperties,
    logo: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: "20px",
      fontWeight: 600,
      color: colors.accentPrimary,
      flexShrink: 0,
    } as React.CSSProperties,
    hubButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "40px",
      padding: "0 16px",
      backgroundColor: colors.accentPrimary,
      border: "none",
      borderRadius: "8px",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 600,
      fontFamily: "'Inter', system-ui, sans-serif",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      flexShrink: 0,
    } as React.CSSProperties,
    navSection: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      flex: 1,
    } as React.CSSProperties,
    navIconButton: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    } as React.CSSProperties,
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    } as React.CSSProperties,
    searchWrapper: {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,
    searchInput: {
      width: "240px",
      height: "40px",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      padding: "0 12px 0 40px",
      color: colors.textPrimary,
      fontSize: "14px",
      fontFamily: "'Inter', system-ui, sans-serif",
      outline: "none",
    } as React.CSSProperties,
    searchIcon: {
      position: "absolute" as const,
      left: "12px",
      pointerEvents: "none" as const,
    } as React.CSSProperties,
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      paddingLeft: "16px",
      borderLeft: `1px solid ${colors.border}`,
    } as React.CSSProperties,
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <WordmarkDoubleRule onClick={() => navigate("/")} />
        
        <button
          type="button"
          style={styles.hubButton}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentSecondary}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.accentPrimary}
          onClick={() => navigate("/catalog/r")}
        >
          <GroupsIcon sx={{ fontSize: 16, color: "currentColor" }} />
          Collectors Hub
        </button>

        <nav style={styles.navSection}>
          {navIcons.map(({ icon: Icon, label, path, disabled }) => (
            <button
              type="button"
              key={label} 
              style={styles.navIconButton} 
              title={label}
              aria-label={label}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surface}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              onClick={() => path && navigate(path)}
              disabled={disabled || !path}
            >
              <Icon sx={{ fontSize: 20, color: colors.textSecondary }} />
            </button>
          ))}
        </nav>

        <div style={styles.rightSection}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}><SearchIcon sx={{ fontSize: 18, color: colors.textSecondary }} /></span>
            <input type="text" placeholder="Search archive..." style={styles.searchInput} />
          </div>
          
          <div style={styles.userSection}>
            <button type="button" style={{ ...styles.navIconButton, width: "36px", height: "36px" }}>
              <NotificationsNoneIcon sx={{ fontSize: 18, color: colors.textSecondary }} />
            </button>
            <div style={styles.avatar}><PersonOutlineIcon sx={{ fontSize: 18, color: colors.textSecondary }} /></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CollectorHubHeader;
