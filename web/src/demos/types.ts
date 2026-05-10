import type { ComponentType } from "react";

export type DemoEntry = {
  id: string;
  title: string;
  description?: string;
  Component: ComponentType;
};
