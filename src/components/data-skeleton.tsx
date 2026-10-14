"use client";

import type { ReactNode } from "react";
import { Skeleton, configureBoneyard, type SkeletonProps } from "boneyard-js/react";
import "@/bones/registry";
import { cn } from "@/lib/utils";

configureBoneyard({
  animate: "shimmer",
  stagger: false,
  color: "#e9edf2",
  shimmerColor: "#f8e6de",
  darkColor: "#1a3150",
  darkShimmerColor: "#24426b",
  speed: "1.6s",
  transition: 250,
  select: "viewport",
});

type DataSkeletonProps = Pick<
  SkeletonProps,
  "name" | "loading" | "fixture" | "className" | "snapshotConfig"
> & {
  children: ReactNode;
  fallbackClassName?: string;
};

export function DataSkeleton({
  name,
  loading,
  fixture,
  className,
  snapshotConfig,
  fallbackClassName,
  children,
}: DataSkeletonProps) {
  return (
    <Skeleton
      name={name}
      loading={loading}
      fixture={fixture}
      animate="shimmer"
      stagger={false}
      select="viewport"
      snapshotConfig={{
        excludeSelectors: ['[aria-hidden="true"]', "[data-no-skeleton]"],
        ...snapshotConfig,
      }}
      className={className}
      fallback={
        <div
          aria-hidden
          className={cn(
            "rounded-xl bg-[linear-gradient(110deg,#e9edf2_30%,#f8e6de_50%,#e9edf2_70%)] bg-size-[200%_100%]",
            fallbackClassName,
          )}
        />
      }
    >
      {children}
    </Skeleton>
  );
}
