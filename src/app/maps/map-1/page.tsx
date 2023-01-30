"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// const WIDTH = 1440;
const WIDTH = 1000;
// const HEIGHT = 723;
const HEIGHT = 502;

const REGIONS = [
  "Adirondacks",
  "Appalachian-(Cumberland-and-Alleghany)-Mountains",
  "Basin-and-Range",
  "Black-Belt",
  "Black-Hills",
  "Bluegrass-Basin",
  "Blue-Ridges_Smoky-Mountains",
  "Cape-Cod",
  "Cascade-Mountains",
  "Catskills",
  "Central-Valley",
  "Coast-Ranges",
  "Colorado-Plateau",
  "Columbia-Plateau",
  "Death-Valley",
  "Delmarva-Peninsula",
  "Driftless-Area",
  "Florida-Keys",
  "Front-Range",
  "Grand-Canyon",
  "Grand-Tetons",
  "Idaho-Batholith",
  "Llano-Estacado",
  "Lower-Mississippi-River-Basin",
  "Missouri-Plateau",
  "Mojave-Desert",
  "Nashville-Basin",
  "Ouachita-Mountains",
  "Outer-Banks",
  "Ozark-Plateau",
  "Piedmont",
  "Ridge-And-Valley",
  "Sand-Hills",
  "Sangre-de-Cristo-Mountains",
  "Sea-Islands",
  "Snake-River-Lava-Plain",
  "Sierra-Nevada-Mountains",
  "Sonoran-Desert",
  "St.-Lawrence-Lowlands",
  "Texas-Hill-Country",
  "Wasatch-Mountains",
  "Willamette-Valley",
  "Yazoo+Mississippi-Delta",
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
        src={"/Map_1/RegionsOutline/" + region + ".png"}
        alt={region + " outline"}
        width={WIDTH}
        height={HEIGHT}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="RegionFill"
        src={"/Map_1/Regions/" + region + ".png"}
        alt={region + " fill"}
        width={WIDTH}
        height={HEIGHT}
        style={{ opacity: fillOpacity / 100 }}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="Label"
        src={"/Map_1/Labels/" + region + ".png"}
        alt={region + " label"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || showLabelGlow}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="LabelWithGlow"
        src={"/Map_1/LabelsOuterGlow/" + region + ".png"}
        alt={region + " label with glow"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || !showLabelGlow}
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
    <div className="flex flex-col gap-1 pt-20">
      <h1 className="text-3xl self-center">Map Test 1 (North American Geography)</h1>
      {/* controls */}
      <div className="flex flex-row gap-8 p-4 items-center">
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
      <div className="flex flex-row">
        <div className="relative max-w-max">
          <Image
            src="/Map_1/Background.png"
            alt="background"
            width={WIDTH}
            height={HEIGHT}
            priority
          />
          <RegionImages
            region="Adirondacks"
            visible={regionsVisible["Adirondacks" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Appalachian-(Cumberland-and-Alleghany)-Mountains"
            visible={
              regionsVisible[
                "Appalachian-(Cumberland-and-Alleghany)-Mountains" as keyof typeof regionsVisible
              ]
            }
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Basin-and-Range"
            visible={regionsVisible["Basin-and-Range" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Black-Belt"
            visible={regionsVisible["Black-Belt" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Black-Hills"
            visible={regionsVisible["Black-Hills" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Blue-Ridges_Smoky-Mountains"
            visible={regionsVisible["Blue-Ridges_Smoky-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Bluegrass-Basin"
            visible={regionsVisible["Bluegrass-Basin" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Cape-Cod"
            visible={regionsVisible["Cape-Cod" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Cascade-Mountains"
            visible={regionsVisible["Cascade-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Catskills"
            visible={regionsVisible["Catskills" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Central-Valley"
            visible={regionsVisible["Central-Valley" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Coast-Ranges"
            visible={regionsVisible["Coast-Ranges" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Colorado-Plateau"
            visible={regionsVisible["Colorado-Plateau" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Columbia-Plateau"
            visible={regionsVisible["Columbia-Plateau" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Death-Valley"
            visible={regionsVisible["Death-Valley" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Delmarva-Peninsula"
            visible={regionsVisible["Delmarva-Peninsula" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Driftless-Area"
            visible={regionsVisible["Driftless-Area" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Florida-Keys"
            visible={regionsVisible["Florida-Keys" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Front-Range"
            visible={regionsVisible["Front-Range" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Grand-Canyon"
            visible={regionsVisible["Grand-Canyon" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Grand-Tetons"
            visible={regionsVisible["Grand-Tetons" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Idaho-Batholith"
            visible={regionsVisible["Idaho-Batholith" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Llano-Estacado"
            visible={regionsVisible["Llano-Estacado" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lower-Mississippi-River-Basin"
            visible={regionsVisible["Lower-Mississippi-River-Basin" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Missouri-Plateau"
            visible={regionsVisible["Missouri-Plateau" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Mojave-Desert"
            visible={regionsVisible["Mojave-Desert" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nashville-Basin"
            visible={regionsVisible["Nashville-Basin" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ouachita-Mountains"
            visible={regionsVisible["Ouachita-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Outer-Banks"
            visible={regionsVisible["Outer-Banks" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ozark-Plateau"
            visible={regionsVisible["Ozark-Plateau" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Piedmont"
            visible={regionsVisible["Piedmont" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ridge-And-Valley"
            visible={regionsVisible["Ridge-And-Valley" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sand-Hills"
            visible={regionsVisible["Sand-Hills" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sangre-de-Cristo-Mountains"
            visible={regionsVisible["Sangre-de-Cristo-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sea-Islands"
            visible={regionsVisible["Sea-Islands" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Snake-River-Lava-Plain"
            visible={regionsVisible["Snake-River-Lava-Plain" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sierra-Nevada-Mountains"
            visible={regionsVisible["Sierra-Nevada-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sonoran-Desert"
            visible={regionsVisible["Sonoran-Desert" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="St.-Lawrence-Lowlands"
            visible={regionsVisible["St.-Lawrence-Lowlands" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Texas-Hill-Country"
            visible={regionsVisible["Texas-Hill-Country" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Wasatch-Mountains"
            visible={regionsVisible["Wasatch-Mountains" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Willamette-Valley"
            visible={regionsVisible["Willamette-Valley" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Yazoo+Mississippi-Delta"
            visible={regionsVisible["Yazoo+Mississippi-Delta" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
        </div>
        {/* checkboxes */}
        <div className="overflow-y-scroll overflow-x-hidden h-[60vh]">
          <ul className="ml-4">
            <Checkbox region="Adirondacks" />
            <Checkbox region="Appalachian-(Cumberland-and-Alleghany)-Mountains" />
            <Checkbox region="Basin-and-Range" />
            <Checkbox region="Black-Belt" />
            <Checkbox region="Black-Hills" />
            <Checkbox region="Blue-Ridges_Smoky-Mountains" />
            <Checkbox region="Bluegrass-Basin" />
            <Checkbox region="Cape-Cod" />
            <Checkbox region="Cascade-Mountains" />
            <Checkbox region="Catskills" />
            <Checkbox region="Central-Valley" />
            <Checkbox region="Coast-Ranges" />
            <Checkbox region="Colorado-Plateau" />
            <Checkbox region="Columbia-Plateau" />
            <Checkbox region="Death-Valley" />
            <Checkbox region="Delmarva-Peninsula" />
            <Checkbox region="Driftless-Area" />
            <Checkbox region="Florida-Keys" />
            <Checkbox region="Front-Range" />
            <Checkbox region="Grand-Canyon" />
            <Checkbox region="Grand-Tetons" />
            <Checkbox region="Idaho-Batholith" />
            <Checkbox region="Llano-Estacado" />
            <Checkbox region="Lower-Mississippi-River-Basin" />
            <Checkbox region="Missouri-Plateau" />
            <Checkbox region="Mojave-Desert" />
            <Checkbox region="Nashville-Basin" />
            <Checkbox region="Ouachita-Mountains" />
            <Checkbox region="Outer-Banks" />
            <Checkbox region="Ozark-Plateau" />
            <Checkbox region="Piedmont" />
            <Checkbox region="Ridge-And-Valley" />
            <Checkbox region="Sand-Hills" />
            <Checkbox region="Sangre-de-Cristo-Mountains" />
            <Checkbox region="Sea-Islands" />
            <Checkbox region="Snake-River-Lava-Plain" />
            <Checkbox region="Sierra-Nevada-Mountains" />
            <Checkbox region="Sonoran-Desert" />
            <Checkbox region="St.-Lawrence-Lowlands" />
            <Checkbox region="Texas-Hill-Country" />
            <Checkbox region="Wasatch-Mountains" />
            <Checkbox region="Willamette-Valley" />
            <Checkbox region="Yazoo+Mississippi-Delta" />
          </ul>
        </div>
      </div>
      <button className="bg-blue-400 p-8" onClick={highlightRandomRegion}>
        Highlight random region (Spacebar)
      </button>
    </div>
  );
}
