"use client";

import dynamic from "next/dynamic";

export const BuildingScene = dynamic(() => import("./BuildingScene"), { ssr: false });
