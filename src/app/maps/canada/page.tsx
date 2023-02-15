"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WIDTH = 800;

// doesn't matter
const HEIGHT = 200;

const REGIONS = [
  "Alberta",
  "British-Columbia",
  "Manitoba",
  "New-Brunswick",
  "Newfoundland-and-Labrador",
  "Northwest-Territories",
  "Nova-Scotia",
  "Nunavut",
  "Ontario",
  "Prince-Edward-Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

interface MyComponentProps {
  region: string;
  visible: boolean;
  showLabel: boolean;
  showLabelGlow: boolean;
  fillOpacity: number;
}

function RegionImages({
  region,
  visible,
  showLabel,
  showLabelGlow,
  fillOpacity,
}: MyComponentProps) {
  return (
    <div style={visible ? { opacity: 100 } : { opacity: 0 }}>
      {/* one Image component for each thing (Outline, Fill, Label, LabelWithGlow) */}
      {/* each image is wrapped with a memoized component, image should NEVER be refetched */}
      {/* the memoized component only changes when the effecting props change */}
      {/* ex. when fillOpacity changes, the RegionFill ImageWrapper is the ONLY thing that should rerender */}
      <Image
        className="absolute left-0 top-0"
        itemID="Outline"
        src={"/Canada_map/RegionsOutline/" + region + ".png"}
        alt={region + " outline"}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
        unoptimized
      />
      <Image
        className="absolute left-0 top-0"
        itemID="RegionFill"
        src={"/Canada_map/Regions/" + region + ".png"}
        alt={region + " fill"}
        width={WIDTH}
        height={HEIGHT}
        style={{ opacity: fillOpacity / 100 }}
        draggable={false}
        unoptimized
      />
      <Image
        className="absolute left-0 top-0"
        itemID="Label"
        src={"/Canada_map/Labels/" + region + ".png"}
        alt={region + " label"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || showLabelGlow}
        draggable={false}
        unoptimized
      />
      <Image
        className="absolute left-0 top-0"
        itemID="LabelWithGlow"
        src={"/Canada_map/LabelsOuterGlow/" + region + ".png"}
        alt={region + " label with glow"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || !showLabelGlow}
        draggable={false}
        unoptimized
      />
    </div>
  );
}

export default function Page() {
  // temp so ts can infer the type
  const [regionsVisible, setRegionsVisible] = useState({
    temp: true,
  });
  const [showLabels, setShowLabels] = useState(true);
  const [showLabelsGlow, setShowLabelsGlow] = useState(true);
  const [fillOpacity, setFillOpacity] = useState(50);

  useEffect(() => {
    // redefining highlightRandomRegion to prevent errors
    const highlight = () => {
      const newRegionsVisible = { temp: false };

      const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];

      newRegionsVisible[randomRegion as keyof typeof regionsVisible] = true;

      setRegionsVisible(newRegionsVisible);
    };
    const detectKeyDown = (e: KeyboardEvent) => {
      if (e.key == " ") {
        // prevents activating other buttons if selected
        e.preventDefault();
        highlight();
      } else if (e.key == "l") {
        setShowLabels(!showLabels);
      }
    };
    document.addEventListener("keydown", detectKeyDown, true);

    return function cleanup() {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, [showLabels]);

  const checkboxChanged = (region: string, e: any) => {
    // replaces spaces with hyphens (' ' -> '-') and slashes to underscores ('/' -> '_')
    const convertedRegion = region.replace(/\s+/g, "-").replace(/\//g, "_");

    // copy regionsVisible
    const newRegionsVisible = { ...regionsVisible };

    // set object's value for the region field to e.target.checked value
    // ex. checkbox is checked (true) for region 'Adirondacks'
    // set newRegionsVisible.Adirondacks = true
    // reion as keyof typeof regionsVisible is required for ts to let us index by a dynamic value
    newRegionsVisible[convertedRegion as keyof typeof regionsVisible] = e.target.checked;

    setRegionsVisible(newRegionsVisible);
  };

  const highlightRandomRegion = () => {
    const newRegionsVisible = { temp: false };

    const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];

    newRegionsVisible[randomRegion as keyof typeof regionsVisible] = true;

    setRegionsVisible(newRegionsVisible);
  };

  const Checkbox = ({ region }: { region: string }) => {
    const convertedRegion = region.replace(/-/g, " ").replace(/_/g, "/").replace(/\+/g, "-");

    return (
      <li>
        <input
          className="mr-2"
          type="checkbox"
          checked={regionsVisible[region as keyof typeof regionsVisible]}
          onChange={(e) => checkboxChanged(region, e)}
        />
        {convertedRegion}
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-1 pt-20 px-8 md:px-20">
      <h1 className="text-3xl self-center">Canadian Territories and Provinces Map</h1>
      {/* controls */}
      <div className="flex flex-col md:flex-row gap-8 p-4 items-center">
        {/* show labels checkbox */}
        <div className="flex items-center">
          <input
            id="label-visibility-checkbox"
            type="checkbox"
            checked={showLabels}
            className="w-4 h-4 text-blue-600 rounded bg-gray-700 border-gray-600"
            onChange={(e) => setShowLabels(e.target.checked)}
          />
          <label htmlFor="label-visibility-checkbox" className="ml-2 text-sm font-medium">
            Show Labels (&apos;L&apos;)
          </label>
        </div>
        {/* label outline checkbox */}
        <div className="flex items-center">
          <input
            id="label-outlines-checkbox"
            type="checkbox"
            checked={showLabelsGlow}
            className="w-4 h-4 text-blue-600 rounded bg-gray-700 border-gray-600"
            onChange={(e) => setShowLabelsGlow(e.target.checked)}
          />
          <label htmlFor="label-outlines-checkbox" className="ml-2 text-sm font-medium">
            Show Labels Outline
          </label>
        </div>
        {/* fill opacity slider */}
        <div className="flex items-center gap-2">
          <label htmlFor="opacity-range" className="text-sm font-medium">
            Fill Opacity
          </label>
          <input
            id="opacity-range"
            type="range"
            value={fillOpacity}
            onChange={(e) => setFillOpacity(parseInt(e.target.value))}
            className=" h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          />
        </div>
      </div>

      {/* image part */}
      <div className="flex flex-col md:flex-row">
        <div className="relative max-w-max">
          <Image
            src="/Canada_map/Background.png"
            alt="background"
            width={WIDTH}
            height={HEIGHT}
            priority
            draggable={false}
            unoptimized
          />
          <RegionImages
            region="Alberta"
            visible={regionsVisible["Alberta" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="British-Columbia"
            visible={regionsVisible["British-Columbia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Manitoba"
            visible={regionsVisible["Manitoba" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-Brunswick"
            visible={regionsVisible["New-Brunswick" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Newfoundland-and-Labrador"
            visible={regionsVisible["Newfoundland-and-Labrador" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Northwest-Territories"
            visible={regionsVisible["Northwest-Territories" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nova-Scotia"
            visible={regionsVisible["Nova-Scotia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nunavut"
            visible={regionsVisible["Nunavut" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ontario"
            visible={regionsVisible["Ontario" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Prince-Edward-Island"
            visible={regionsVisible["Prince-Edward-Island" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Quebec"
            visible={regionsVisible["Quebec" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Saskatchewan"
            visible={regionsVisible["Saskatchewan" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Yukon"
            visible={regionsVisible["Yukon" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
        </div>
        {/* checkboxes */}
        <div className="border border-slate-600 mt-2 md:mt-0 md:ml-2 overflow-y-hidden overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden md:h-[55vh]">
          <ul className="ml-4 flex flex-row gap-2 md:inline-block">
            <Checkbox region="Alberta" />
            <Checkbox region="British-Columbia" />
            <Checkbox region="Manitoba" />
            <Checkbox region="New-Brunswick" />
            <Checkbox region="Newfoundland-and-Labrador" />
            <Checkbox region="Northwest-Territories" />
            <Checkbox region="Nova-Scotia" />
            <Checkbox region="Nunavut" />
            <Checkbox region="Ontario" />
            <Checkbox region="Prince-Edward-Island" />
            <Checkbox region="Quebec" />
            <Checkbox region="Saskatchewan" />
            <Checkbox region="Yukon" />
          </ul>
        </div>
      </div>
      <button className="bg-blue-400 p-8" onClick={highlightRandomRegion}>
        Highlight random region (Spacebar)
      </button>
    </div>
  );
}
