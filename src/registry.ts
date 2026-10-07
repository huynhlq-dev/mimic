import type { ComponentType } from "react";

export interface InvitationMeta {
  title: string;
  description?: string;
}

interface InvitationModule {
  default: ComponentType;
  meta: InvitationMeta;
}

export interface Invitation {
  slug: string;
  meta: InvitationMeta;
  Component: ComponentType;
}

// Every folder src/invitations/<slug>/index.tsx is picked up automatically.
// Folders starting with "_" (e.g. _template) are ignored.
const modules = import.meta.glob<InvitationModule>("./invitations/*/index.tsx", {
  eager: true,
});

export const invitations: Invitation[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/")[2],
    meta: mod.meta,
    Component: mod.default,
  }))
  .filter((i) => !i.slug.startsWith("_"))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const findInvitation = (slug: string | undefined) =>
  invitations.find((i) => i.slug === slug);
