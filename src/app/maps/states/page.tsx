"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WIDTH = 800;

// doesn't matter
const HEIGHT = 200;

const REGIONS = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New-Hampshire",
  "New-Jersey",
  "New-Mexico",
  "New-York",
  "North-Carolina",
  "North-Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode-Island",
  "South-Carolina",
  "South-Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West-Virginia",
  "Wisconsin",
  "Wyoming",
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
        src={"/States_map/RegionsOutline/" + region + ".png"}
        alt={region + " outline"}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
        unoptimized
      />
      <Image
        className="absolute left-0 top-0"
        itemID="RegionFill"
        src={"/States_map/Regions/" + region + ".png"}
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
        src={"/States_map/Labels/" + region + ".png"}
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
        src={"/States_map/LabelsOuterGlow/" + region + ".png"}
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
      <h1 className="text-3xl self-center">US States Map</h1>
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
            src="/States_map/Background.png"
            alt="background"
            width={WIDTH}
            height={HEIGHT}
            priority
            draggable={false}
            unoptimized
          />
          <RegionImages
            region="Alabama"
            visible={regionsVisible["Alabama" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Alaska"
            visible={regionsVisible["Alaska" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Arizona"
            visible={regionsVisible["Arizona" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Arkansas"
            visible={regionsVisible["Arkansas" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="California"
            visible={regionsVisible["California" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Colorado"
            visible={regionsVisible["Colorado" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Connecticut"
            visible={regionsVisible["Connecticut" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Delaware"
            visible={regionsVisible["Delaware" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Florida"
            visible={regionsVisible["Florida" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Georgia"
            visible={regionsVisible["Georgia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Hawaii"
            visible={regionsVisible["Hawaii" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Idaho"
            visible={regionsVisible["Idaho" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Illinois"
            visible={regionsVisible["Illinois" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Indiana"
            visible={regionsVisible["Indiana" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Iowa"
            visible={regionsVisible["Iowa" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Kansas"
            visible={regionsVisible["Kansas" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Kentucky"
            visible={regionsVisible["Kentucky" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Louisiana"
            visible={regionsVisible["Louisiana" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Maine"
            visible={regionsVisible["Maine" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Maryland"
            visible={regionsVisible["Maryland" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Massachusetts"
            visible={regionsVisible["Massachusetts" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Michigan"
            visible={regionsVisible["Michigan" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Minnesota"
            visible={regionsVisible["Minnesota" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Mississippi"
            visible={regionsVisible["Mississippi" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Missouri"
            visible={regionsVisible["Missouri" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Montana"
            visible={regionsVisible["Montana" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nebraska"
            visible={regionsVisible["Nebraska" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nevada"
            visible={regionsVisible["Nevada" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-Hampshire"
            visible={regionsVisible["New-Hampshire" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-Jersey"
            visible={regionsVisible["New-Jersey" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-Mexico"
            visible={regionsVisible["New-Mexico" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-York"
            visible={regionsVisible["New-York" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="North-Carolina"
            visible={regionsVisible["North-Carolina" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="North-Dakota"
            visible={regionsVisible["North-Dakota" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ohio"
            visible={regionsVisible["Ohio" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Oklahoma"
            visible={regionsVisible["Oklahoma" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Oregon"
            visible={regionsVisible["Oregon" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Pennsylvania"
            visible={regionsVisible["Pennsylvania" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Rhode-Island"
            visible={regionsVisible["Rhode-Island" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="South-Carolina"
            visible={regionsVisible["South-Carolina" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="South-Dakota"
            visible={regionsVisible["South-Dakota" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tennessee"
            visible={regionsVisible["Tennessee" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Texas"
            visible={regionsVisible["Texas" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Utah"
            visible={regionsVisible["Utah" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Vermont"
            visible={regionsVisible["Vermont" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Virginia"
            visible={regionsVisible["Virginia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Washington"
            visible={regionsVisible["Washington" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="West-Virginia"
            visible={regionsVisible["West-Virginia" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Wisconsin"
            visible={regionsVisible["Wisconsin" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />{" "}
          <RegionImages
            region="Wyoming"
            visible={regionsVisible["Wyoming" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
        </div>
        {/* checkboxes */}
        <div className="border border-slate-600 mt-2 md:mt-0 md:ml-2 overflow-y-hidden overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden md:h-[55vh]">
          <ul className="ml-4 flex flex-row gap-2 md:inline-block">
            <Checkbox region="Alabama" />
            <Checkbox region="Alaska" />
            <Checkbox region="Arizona" />
            <Checkbox region="Arkansas" />
            <Checkbox region="California" />
            <Checkbox region="Colorado" />
            <Checkbox region="Connecticut" />
            <Checkbox region="Delaware" />
            <Checkbox region="Florida" />
            <Checkbox region="Georgia" />
            <Checkbox region="Hawaii" />
            <Checkbox region="Idaho" />
            <Checkbox region="Illinois" />
            <Checkbox region="Indiana" />
            <Checkbox region="Iowa" />
            <Checkbox region="Kansas" />
            <Checkbox region="Kentucky" />
            <Checkbox region="Louisiana" />
            <Checkbox region="Maine" />
            <Checkbox region="Maryland" />
            <Checkbox region="Massachusetts" />
            <Checkbox region="Michigan" />
            <Checkbox region="Minnesota" />
            <Checkbox region="Mississippi" />
            <Checkbox region="Missouri" />
            <Checkbox region="Montana" />
            <Checkbox region="Nebraska" />
            <Checkbox region="Nevada" />
            <Checkbox region="New-Hampshire" />
            <Checkbox region="New-Jersey" />
            <Checkbox region="New-Mexico" />
            <Checkbox region="New-York" />
            <Checkbox region="North-Carolina" />
            <Checkbox region="North-Dakota" />
            <Checkbox region="Ohio" />
            <Checkbox region="Oklahoma" />
            <Checkbox region="Oregon" />
            <Checkbox region="Pennsylvania" />
            <Checkbox region="Rhode-Island" />
            <Checkbox region="South-Carolina" />
            <Checkbox region="South-Dakota" />
            <Checkbox region="Tennessee" />
            <Checkbox region="Texas" />
            <Checkbox region="Utah" />
            <Checkbox region="Vermont" />
            <Checkbox region="Virginia" />
            <Checkbox region="Washington" />
            <Checkbox region="West-Virginia" />
            <Checkbox region="Wisconsin" />
            <Checkbox region="Wyoming" />
          </ul>
        </div>
      </div>
      <button className="bg-blue-400 p-8" onClick={highlightRandomRegion}>
        Highlight random region (Spacebar)
      </button>
    </div>
  );
}
