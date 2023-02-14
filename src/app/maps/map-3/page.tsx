"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WIDTH = 800;

// doesn't matter
const HEIGHT = 200;

const REGIONS = [
  "Albany,-NY",
  "Albuquerque,-NM",
  "Anchorage,-AK",
  "Atlanta,-GA",
  "Austin,-TX",
  "Baltimore,-MD",
  "Baton-Rouge,-LA",
  "Birmingham,-AL",
  "Boise,-ID",
  "Boston,-MA",
  "Buffalo,-NY",
  "Calgary,-AB",
  "Charleston,-SC",
  "Charlotte,-NC",
  "Chattanooga,-TN",
  "Chicago,-IL",
  "Cincinnati,-OH",
  "Cleveland,-OH",
  "Columbus,-OH",
  "Dallas-&-Fort-Worth,-TX",
  "Denver,-CO",
  "Detroit,-MI",
  "Duluth,-MN",
  "Edmonton,-AB",
  "El-Paso,-TX",
  "Green-Bay,-WI",
  "Greensboro-&-Winston+Salem,-NC",
  "Hartford,-CT",
  "Houston,-TX",
  "Indianapolis,-IN",
  "Jackson,-MS",
  "Jacksonville,-FL",
  "Kansas-City,-MO",
  "Knoxville,-TN",
  "Las-Vegas,-NV",
  "Lexington,-KY",
  "Little-Rock,-AR",
  "Los-Angeles,-CA",
  "Louisville,-KY",
  "Memphis,-TN",
  "Miami,-FL",
  "Milwaukee,-WI",
  "Minneapolis-&-St.-Paul,-MN",
  "Mobile,-AL",
  "Montgomery,-AL",
  "Montreal,-QC",
  "Nashville,-TN",
  "New-York,-NY",
  "New-Orleans,-LA",
  "Norfolk,-VA",
  "Oakland,-CA",
  "Oklahoma-City,-OK",
  "Omaha,-NB",
  "Orlando,-FL",
  "Ottawa,-ON",
  "Philadelphia,-PA",
  "Phoenix,-AZ",
  "Pittsburgh,-PA",
  "Portland,-OR",
  "Providence,-RI",
  "Quebec-City,-QC",
  "Raleigh-&-Durham,-NC",
  "Reno,-NV",
  "Richmond,-VA",
  "Rochester,-NY",
  "Sacramento,-CA",
  "Salt-Lake-City,-UT",
  "San-Antonio,-TX",
  "San-Diego,-CA",
  "San-Francisco,-CA",
  "San-Jose,-CA",
  "Santa-Fe,-NM",
  "Savannah,-GA",
  "Seattle,-WA",
  "Spokane,-WA",
  "Springfield,-MA",
  "St.-Louis,-MO",
  "Syracuse,-NY",
  "Tampa-&-St.-Petersburg,-FL",
  "Toledo,-OH",
  "Toronto,-ON",
  "Tucson,-AZ",
  "Tulsa,-OK",
  "Vancouver,-BC",
  "Washington,-DC",
  "Winnipeg,-MB",
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
  // remove the last 4 chars in region (for example: ',-AL' gets removed)
  const convertedRegion = region.slice(0, -4);

  return (
    <div style={visible ? { opacity: 100 } : { opacity: 0 }}>
      {/* one Image component for each thing (Outline, Fill, Label, LabelWithGlow) */}
      {/* each image is wrapped with a memoized component, image should NEVER be refetched */}
      {/* the memoized component only changes when the effecting props change */}
      {/* ex. when fillOpacity changes, the RegionFill ImageWrapper is the ONLY thing that should rerender */}
      <Image
        className="absolute left-0 top-0"
        itemID="Outline"
        src={"/Map_3/RegionsOutline/" + convertedRegion + ".png"}
        alt={convertedRegion + " outline"}
        width={WIDTH}
        height={HEIGHT}
        draggable={false}
      />
      {/* This map doesn't have region fills */}
      {/* <Image
        className="absolute left-0 top-0"
        itemID="RegionFill"
        src={"/Map_3/Regions/" + convertedRegion + ".png"}
        alt={convertedRegion + " fill"}
        width={WIDTH}
        height={HEIGHT}
        style={{ opacity: fillOpacity / 100 }}
        draggable={false}
      /> */}
      <Image
        className="absolute left-0 top-0"
        itemID="Label"
        src={"/Map_3/Labels/" + convertedRegion + ".png"}
        alt={convertedRegion + " label"}
        width={WIDTH}
        height={HEIGHT}
        hidden={!showLabel || showLabelGlow}
        draggable={false}
      />
      <Image
        className="absolute left-0 top-0"
        itemID="LabelWithGlow"
        src={"/Map_3/LabelsOuterGlow/" + convertedRegion + ".png"}
        alt={convertedRegion + " label with glow"}
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
      <h1 className="text-3xl self-center">Map Test 3 (North American Cities)</h1>
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
            src="/Map_3/Background.png"
            alt="background"
            width={WIDTH}
            height={HEIGHT}
            priority
            draggable={false}
          />
          <RegionImages
            region="Albany,-NY"
            visible={regionsVisible["Albany,-NY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Albuquerque,-NM"
            visible={regionsVisible["Albuquerque,-NM" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Anchorage,-AK"
            visible={regionsVisible["Anchorage,-AK" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Atlanta,-GA"
            visible={regionsVisible["Atlanta,-GA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Austin,-TX"
            visible={regionsVisible["Austin,-TX" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Baltimore,-MD"
            visible={regionsVisible["Baltimore,-MD" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Baton-Rouge,-LA"
            visible={regionsVisible["Baton-Rouge,-LA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Birmingham,-AL"
            visible={regionsVisible["Birmingham,-AL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Boise,-ID"
            visible={regionsVisible["Boise,-ID" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Boston,-MA"
            visible={regionsVisible["Boston,-MA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Buffalo,-NY"
            visible={regionsVisible["Buffalo,-NY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Calgary,-AB"
            visible={regionsVisible["Calgary,-AB" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Charleston,-SC"
            visible={regionsVisible["Charleston,-SC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Charlotte,-NC"
            visible={regionsVisible["Charlotte,-NC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Chattanooga,-TN"
            visible={regionsVisible["Chattanooga,-TN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Chicago,-IL"
            visible={regionsVisible["Chicago,-IL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Cincinnati,-OH"
            visible={regionsVisible["Cincinnati,-OH" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Cleveland,-OH"
            visible={regionsVisible["Cleveland,-OH" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Columbus,-OH"
            visible={regionsVisible["Columbus,-OH" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Dallas-&-Fort-Worth,-TX"
            visible={regionsVisible["Dallas-&-Fort-Worth,-TX" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Denver,-CO"
            visible={regionsVisible["Denver,-CO" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Detroit,-MI"
            visible={regionsVisible["Detroit,-MI" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Duluth,-MN"
            visible={regionsVisible["Duluth,-MN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Edmonton,-AB"
            visible={regionsVisible["Edmonton,-AB" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="El-Paso,-TX"
            visible={regionsVisible["El-Paso,-TX" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Green-Bay,-WI"
            visible={regionsVisible["Green-Bay,-WI" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Greensboro-&-Winston+Salem,-NC"
            visible={
              regionsVisible["Greensboro-&-Winston+Salem,-NC" as keyof typeof regionsVisible]
            }
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Hartford,-CT"
            visible={regionsVisible["Hartford,-CT" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Houston,-TX"
            visible={regionsVisible["Houston,-TX" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Indianapolis,-IN"
            visible={regionsVisible["Indianapolis,-IN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Jackson,-MS"
            visible={regionsVisible["Jackson,-MS" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Jacksonville,-FL"
            visible={regionsVisible["Jacksonville,-FL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Kansas-City,-MO"
            visible={regionsVisible["Kansas-City,-MO" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Knoxville,-TN"
            visible={regionsVisible["Knoxville,-TN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Las-Vegas,-NV"
            visible={regionsVisible["Las-Vegas,-NV" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Lexington,-KY"
            visible={regionsVisible["Lexington,-KY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Little-Rock,-AR"
            visible={regionsVisible["Little-Rock,-AR" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Los-Angeles,-CA"
            visible={regionsVisible["Los-Angeles,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Louisville,-KY"
            visible={regionsVisible["Louisville,-KY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Memphis,-TN"
            visible={regionsVisible["Memphis,-TN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Miami,-FL"
            visible={regionsVisible["Miami,-FL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Milwaukee,-WI"
            visible={regionsVisible["Milwaukee,-WI" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Minneapolis-&-St.-Paul,-MN"
            visible={regionsVisible["Minneapolis-&-St.-Paul,-MN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Mobile,-AL"
            visible={regionsVisible["Mobile,-AL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Montgomery,-AL"
            visible={regionsVisible["Montgomery,-AL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Montreal,-QC"
            visible={regionsVisible["Montreal,-QC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Nashville,-TN"
            visible={regionsVisible["Nashville,-TN" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-York,-NY"
            visible={regionsVisible["New-York,-NY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="New-Orleans,-LA"
            visible={regionsVisible["New-Orleans,-LA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Norfolk,-VA"
            visible={regionsVisible["Norfolk,-VA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Oakland,-CA"
            visible={regionsVisible["Oakland,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Oklahoma-City,-OK"
            visible={regionsVisible["Oklahoma-City,-OK" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Omaha,-NB"
            visible={regionsVisible["Omaha,-NB" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Orlando,-FL"
            visible={regionsVisible["Orlando,-FL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Ottawa,-ON"
            visible={regionsVisible["Ottawa,-ON" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Philadelphia,-PA"
            visible={regionsVisible["Philadelphia,-PA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Phoenix,-AZ"
            visible={regionsVisible["Phoenix,-AZ" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Pittsburgh,-PA"
            visible={regionsVisible["Pittsburgh,-PA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Portland,-OR"
            visible={regionsVisible["Portland,-OR" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Providence,-RI"
            visible={regionsVisible["Providence,-RI" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Quebec-City,-QC"
            visible={regionsVisible["Quebec-City,-QC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Raleigh-&-Durham,-NC"
            visible={regionsVisible["Raleigh-&-Durham,-NC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Reno,-NV"
            visible={regionsVisible["Reno,-NV" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Richmond,-VA"
            visible={regionsVisible["Richmond,-VA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Rochester,-NY"
            visible={regionsVisible["Rochester,-NY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Sacramento,-CA"
            visible={regionsVisible["Sacramento,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Salt-Lake-City,-UT"
            visible={regionsVisible["Salt-Lake-City,-UT" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="San-Antonio,-TX"
            visible={regionsVisible["San-Antonio,-TX" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="San-Diego,-CA"
            visible={regionsVisible["San-Diego,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="San-Francisco,-CA"
            visible={regionsVisible["San-Francisco,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="San-Jose,-CA"
            visible={regionsVisible["San-Jose,-CA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Santa-Fe,-NM"
            visible={regionsVisible["Santa-Fe,-NM" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Savannah,-GA"
            visible={regionsVisible["Savannah,-GA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Seattle,-WA"
            visible={regionsVisible["Seattle,-WA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Spokane,-WA"
            visible={regionsVisible["Spokane,-WA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Springfield,-MA"
            visible={regionsVisible["Springfield,-MA" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="St.-Louis,-MO"
            visible={regionsVisible["St.-Louis,-MO" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Syracuse,-NY"
            visible={regionsVisible["Syracuse,-NY" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tampa-&-St.-Petersburg,-FL"
            visible={regionsVisible["Tampa-&-St.-Petersburg,-FL" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Toledo,-OH"
            visible={regionsVisible["Toledo,-OH" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Toronto,-ON"
            visible={regionsVisible["Toronto,-ON" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tucson,-AZ"
            visible={regionsVisible["Tucson,-AZ" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Tulsa,-OK"
            visible={regionsVisible["Tulsa,-OK" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Vancouver,-BC"
            visible={regionsVisible["Vancouver,-BC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Washington,-DC"
            visible={regionsVisible["Washington,-DC" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
          <RegionImages
            region="Winnipeg,-MB"
            visible={regionsVisible["Winnipeg,-MB" as keyof typeof regionsVisible]}
            showLabel={showLabels}
            showLabelGlow={showLabelsGlow}
            fillOpacity={fillOpacity}
          />
        </div>
        {/* checkboxes */}
        <div className="border border-slate-600 mt-2 md:mt-0 md:ml-2 overflow-y-hidden overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden md:h-[55vh]">
          <ul className="ml-4 flex flex-row gap-2 md:inline-block">
            <Checkbox region="Albany,-NY" />
            <Checkbox region="Albuquerque,-NM" />
            <Checkbox region="Anchorage,-AK" />
            <Checkbox region="Atlanta,-GA" />
            <Checkbox region="Austin,-TX" />
            <Checkbox region="Baltimore,-MD" />
            <Checkbox region="Baton-Rouge,-LA" />
            <Checkbox region="Birmingham,-AL" />
            <Checkbox region="Boise,-ID" />
            <Checkbox region="Boston,-MA" />
            <Checkbox region="Buffalo,-NY" />
            <Checkbox region="Calgary,-AB" />
            <Checkbox region="Charleston,-SC" />
            <Checkbox region="Charlotte,-NC" />
            <Checkbox region="Chattanooga,-TN" />
            <Checkbox region="Chicago,-IL" />
            <Checkbox region="Cincinnati,-OH" />
            <Checkbox region="Cleveland,-OH" />
            <Checkbox region="Columbus,-OH" />
            <Checkbox region="Dallas-&-Fort-Worth,-TX" />
            <Checkbox region="Denver,-CO" />
            <Checkbox region="Detroit,-MI" />
            <Checkbox region="Duluth,-MN" />
            <Checkbox region="Edmonton,-AB" />
            <Checkbox region="El-Paso,-TX" />
            <Checkbox region="Green-Bay,-WI" />
            <Checkbox region="Greensboro-&-Winston+Salem,-NC" />
            <Checkbox region="Hartford,-CT" />
            <Checkbox region="Houston,-TX" />
            <Checkbox region="Indianapolis,-IN" />
            <Checkbox region="Jackson,-MS" />
            <Checkbox region="Jacksonville,-FL" />
            <Checkbox region="Kansas-City,-MO" />
            <Checkbox region="Knoxville,-TN" />
            <Checkbox region="Las-Vegas,-NV" />
            <Checkbox region="Lexington,-KY" />
            <Checkbox region="Little-Rock,-AR" />
            <Checkbox region="Los-Angeles,-CA" />
            <Checkbox region="Louisville,-KY" />
            <Checkbox region="Memphis,-TN" />
            <Checkbox region="Miami,-FL" />
            <Checkbox region="Milwaukee,-WI" />
            <Checkbox region="Minneapolis-&-St.-Paul,-MN" />
            <Checkbox region="Mobile,-AL" />
            <Checkbox region="Montgomery,-AL" />
            <Checkbox region="Montreal,-QC" />
            <Checkbox region="Nashville,-TN" />
            <Checkbox region="New-York,-NY" />
            <Checkbox region="New-Orleans,-LA" />
            <Checkbox region="Norfolk,-VA" />
            <Checkbox region="Oakland,-CA" />
            <Checkbox region="Oklahoma-City,-OK" />
            <Checkbox region="Omaha,-NB" />
            <Checkbox region="Orlando,-FL" />
            <Checkbox region="Ottawa,-ON" />
            <Checkbox region="Philadelphia,-PA" />
            <Checkbox region="Phoenix,-AZ" />
            <Checkbox region="Pittsburgh,-PA" />
            <Checkbox region="Portland,-OR" />
            <Checkbox region="Providence,-RI" />
            <Checkbox region="Quebec-City,-QC" />
            <Checkbox region="Raleigh-&-Durham,-NC" />
            <Checkbox region="Reno,-NV" />
            <Checkbox region="Richmond,-VA" />
            <Checkbox region="Rochester,-NY" />
            <Checkbox region="Sacramento,-CA" />
            <Checkbox region="Salt-Lake-City,-UT" />
            <Checkbox region="San-Antonio,-TX" />
            <Checkbox region="San-Diego,-CA" />
            <Checkbox region="San-Francisco,-CA" />
            <Checkbox region="San-Jose,-CA" />
            <Checkbox region="Santa-Fe,-NM" />
            <Checkbox region="Savannah,-GA" />
            <Checkbox region="Seattle,-WA" />
            <Checkbox region="Spokane,-WA" />
            <Checkbox region="Springfield,-MA" />
            <Checkbox region="St.-Louis,-MO" />
            <Checkbox region="Syracuse,-NY" />
            <Checkbox region="Tampa-&-St.-Petersburg,-FL" />
            <Checkbox region="Toledo,-OH" />
            <Checkbox region="Toronto,-ON" />
            <Checkbox region="Tucson,-AZ" />
            <Checkbox region="Tulsa,-OK" />
            <Checkbox region="Vancouver,-BC" />
            <Checkbox region="Washington,-DC" />
            <Checkbox region="Winnipeg,-MB" />
          </ul>
        </div>
      </div>
      <button className="bg-blue-400 p-8" onClick={highlightRandomRegion}>
        Highlight random region (Spacebar)
      </button>
    </div>
  );
}
