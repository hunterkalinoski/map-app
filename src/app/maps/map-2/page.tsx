"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WIDTH = 800;

// doesn't matter
const HEIGHT = 200;

const REGIONS = [
  "Atchafalaya-River",
  "Bay-of-Fundy",
  "Bonneville-Salt-Flats",
  "Chesapeake-Bay",
  "Columbia-River",
  "Delaware-Bay",
  "Erie-Canal",
  "Great-Salt-Lake",
  "Hoover-Dam",
  "Hudson-Bay",
  "Illinois-River",
  "Navajo-Nation",
  "Lake-Erie",
  "Lake-Huron",
  "Lake-Michigan",
  "Lake-Okeechobee",
  "Lake-Pontchartrain",
  "Lake-Superior",
  "Mississippi-River",
  "Missouri-River",
  "Ohio-River",
  "Puget-Sound",
  "Rio-Grande",
  "Snake-River",
  "St.-Lawrence-River",
  "Tennessee-River",
  "The-Bayou",
  "The-Everglades",
  "The-Fall-Line",
  "The-Finger-Lakes",
  "Tidewater-Virginia",
  "Yellowstone-National-Park",
  "Yosemite-National-Park",
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
        src={"/Map_2/RegionsOutline/" + region + ".png"}
        alt={region + " outline"}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="RegionFill"
        src={"/Map_2/Regions/" + region + ".png"}
        alt={region + " fill"}
        width={WIDTH}
        height={HEIGHT}
        style={{ opacity: fillOpacity / 100 }}
        draggable={false}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="Label"
        src={"/Map_2/Labels/" + region + ".png"}
        alt={region + " label"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || showLabelGlow}
        draggable={false}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="LabelWithGlow"
        src={"/Map_2/LabelsOuterGlow/" + region + ".png"}
        alt={region + " label with glow"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || !showLabelGlow}
        draggable={false}
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
      <h1 className="text-3xl self-center">Map Test 2 (Native American Places + Water)</h1>
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
            src="/Map_2/Background.png"
            alt="background"
            width={WIDTH}
            height={HEIGHT}
            priority
            draggable={false}
          />
          <RegionImages
            region="Atchafalaya-River"
            visible={regionsVisible["Atchafalaya-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Bay-of-Fundy"
            visible={regionsVisible["Bay-of-Fundy" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Bonneville-Salt-Flats"
            visible={regionsVisible["Bonneville-Salt-Flats" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Chesapeake-Bay"
            visible={regionsVisible["Chesapeake-Bay" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Columbia-River"
            visible={regionsVisible["Columbia-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Delaware-Bay"
            visible={regionsVisible["Delaware-Bay" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Erie-Canal"
            visible={regionsVisible["Erie-Canal" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Great-Salt-Lake"
            visible={regionsVisible["Great-Salt-Lake" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Hoover-Dam"
            visible={regionsVisible["Hoover-Dam" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Hudson-Bay"
            visible={regionsVisible["Hudson-Bay" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Illinois-River"
            visible={regionsVisible["Illinois-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Navajo-Nation"
            visible={regionsVisible["Navajo-Nation" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Erie"
            visible={regionsVisible["Lake-Erie" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Huron"
            visible={regionsVisible["Lake-Huron" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Michigan"
            visible={regionsVisible["Lake-Michigan" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Okeechobee"
            visible={regionsVisible["Lake-Okeechobee" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Pontchartrain"
            visible={regionsVisible["Lake-Pontchartrain" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lake-Superior"
            visible={regionsVisible["Lake-Superior" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Mississippi-River"
            visible={regionsVisible["Mississippi-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Missouri-River"
            visible={regionsVisible["Missouri-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ohio-River"
            visible={regionsVisible["Ohio-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Puget-Sound"
            visible={regionsVisible["Puget-Sound" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Rio-Grande"
            visible={regionsVisible["Rio-Grande" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Snake-River"
            visible={regionsVisible["Snake-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="St.-Lawrence-River"
            visible={regionsVisible["St.-Lawrence-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tennessee-River"
            visible={regionsVisible["Tennessee-River" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="The-Bayou"
            visible={regionsVisible["The-Bayou" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="The-Everglades"
            visible={regionsVisible["The-Everglades" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="The-Fall-Line"
            visible={regionsVisible["The-Fall-Line" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="The-Finger-Lakes"
            visible={regionsVisible["The-Finger-Lakes" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tidewater-Virginia"
            visible={regionsVisible["Tidewater-Virginia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Yellowstone-National-Park"
            visible={regionsVisible["Yellowstone-National-Park" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Yosemite-National-Park"
            visible={regionsVisible["Yosemite-National-Park" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
        </div>
        {/* checkboxes */}
        <div className="border border-slate-600 mt-2 md:mt-0 md:ml-2 overflow-y-hidden overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden md:h-[55vh]">
          <ul className="ml-4 flex flex-row gap-2 md:inline-block">
            <Checkbox region="Atchafalaya-River" />
            <Checkbox region="Bay-of-Fundy" />
            <Checkbox region="Bonneville-Salt-Flats" />
            <Checkbox region="Chesapeake-Bay" />
            <Checkbox region="Columbia-River" />
            <Checkbox region="Delaware-Bay" />
            <Checkbox region="Erie-Canal" />
            <Checkbox region="Great-Salt-Lake" />
            <Checkbox region="Hoover-Dam" />
            <Checkbox region="Hudson-Bay" />
            <Checkbox region="Illinois-River" />
            <Checkbox region="Navajo-Nation" />
            <Checkbox region="Lake-Erie" />
            <Checkbox region="Lake-Huron" />
            <Checkbox region="Lake-Michigan" />
            <Checkbox region="Lake-Okeechobee" />
            <Checkbox region="Lake-Pontchartrain" />
            <Checkbox region="Lake-Superior" />
            <Checkbox region="Mississippi-River" />
            <Checkbox region="Missouri-River" />
            <Checkbox region="Ohio-River" />
            <Checkbox region="Puget-Sound" />
            <Checkbox region="Rio-Grande" />
            <Checkbox region="Snake-River" />
            <Checkbox region="St.-Lawrence-River" />
            <Checkbox region="Tennessee-River" />
            <Checkbox region="The-Bayou" />
            <Checkbox region="The-Everglades" />
            <Checkbox region="The-Fall-Line" />
            <Checkbox region="The-Finger-Lakes" />
            <Checkbox region="Tidewater-Virginia" />
            <Checkbox region="Yellowstone-National-Park" />
            <Checkbox region="Yosemite-National-Park" />
          </ul>
        </div>
      </div>
      <button className="bg-blue-400 p-8" onClick={highlightRandomRegion}>
        Highlight random region (Spacebar)
      </button>
    </div>
  );
}
