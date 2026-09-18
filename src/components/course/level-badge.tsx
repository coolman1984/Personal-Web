/** شارة المستوى بلونه. */
import { getIcon } from "@/lib/icon";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { Badge } from "@/components/ui/badge";
import { levelAccent } from "@/lib/tokens";
import type { LevelId } from "@/types";

const levelIcons: Record<LevelId, string> = {
  beginner: "Sprout",
  intermediate: "Layers",
  advanced: "Crown",
};

export function LevelBadge({
  level,
  size = "sm",
  showIcon = true,
}: {
  level: LevelId;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}) {
  const Icon = getIcon(levelIcons[level]);
  return (
    <Badge tone={levelAccent[level]} size={size} icon={showIcon ? <Icon /> : undefined}>
      {levelShortLabel[level]}
    </Badge>
  );
}

export { levelIcons, accentFor };
