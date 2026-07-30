import { styled } from "@mui/material";

const labels: Record<string, string> = {
  administrator: "시스템 관리자",
  manager: "관리자",
  executive: "경영진",
  staff: "운영자",
  guest: "게스트",
  system: "테스트용",
};

const Badge = styled("span", {
  shouldForwardProp: (prop) => prop !== "$profile",
})<{ $profile: boolean }>(({ $profile }) => ({
  display: "inline-flex",
  width: "max-content",
  height: $profile ? "22px" : "18px",
  padding: "0 4px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  fontSize: $profile ? "16px" : "12px",
  fontWeight: 600,
  "&.administrator": { color: "#173CBA", backgroundColor: "#EAEFFF" },
  "&.manager": { color: "#3A57E8", backgroundColor: "#F1F4FE" },
  "&.executive": { color: "#B44CF9", backgroundColor: "#F8EEFF" },
  "&.staff": { color: "#15A46E", backgroundColor: "#F0FBF7" },
  "&.guest": { color: "#7C8694", backgroundColor: "#F2F3F4" },
}));

export interface RoleBadgeProps {
  role: string;
  profile?: boolean;
  label?: string;
}

export const RoleBadge = ({ role, profile = false, label }: RoleBadgeProps) => (
  <Badge className={role} $profile={profile}>
    {label ?? labels[role] ?? role}
  </Badge>
);
