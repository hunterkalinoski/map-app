"use client";

import Image from "next/image";
import { memo } from "react";
import { useEffect, useState } from "react";

const WIDTH = "1440";
const HEIGHT = "723";

const REGIONS = [
  "Adirondacks",
  "Appalachian (Cumberland and Alleghany) Mountains",
  "Basin and Range",
  "Black Belt",
  "Black Hills",
  "Bluegrass Basin",
  "Blue Ridges/Smoky Mountains",
  "Cape Cod",
  "Cascade Mountains",
  "Catskills",
  "Central Valley",
  "Coast Ranges",
  "Colorado Plateau",
  "Columbia Plateau",
  "Death Valley",
  "Delmarva Peninsula",
  "Driftless Area",
  "Florida Keys",
  "Front Range",
  "Grand Canyon",
  "Grand Tetons",
  "Idaho Batholith",
  "Llano Estacado",
  "Lower Mississippi River Valley",
  "Missouri Plateau",
  "Mojave Desert",
  "Nashville Basin",
  "Ouachita Mountains",
  "Outer Banks",
  "Ozark Plateau",
  "Piedmont",
  "Ridge and Valley",
  "Sand Hills",
  "Sangre de Cristo Mountains",
  "Sea Islands",
  "Snake River Lava Plain",
  "Sierra Nevada Mountains",
  "Sonoran Desert",
  "St. Lawrence Lowlands",
  "Texas Hill Country",
  "Wasatch Mountains",
  "Willamette Valley",
  "Yazoo-Mississippi Delta",
];

export default function MapImages({ regions }: { regions: string[] }) {
  const [showLabels, setShowLabels] = useState(true);
  const [showLabelOutlines, setShowLabelOutlines] = useState(true);
  const [fillOpacity, setFillOpacity] = useState(50);

  console.log(showLabels, showLabelOutlines);

  return (
    <div className="flex flex-col">
      <div>
        <button className="bg-blue-400 p-8" onClick={() => setShowLabels(!showLabels)}>
          Switch Label Visibility
        </button>
        <button
          className="bg-blue-500 p-8"
          onClick={() => setShowLabelOutlines(!showLabelOutlines)}
        >
          Switch Show Label Outlines
        </button>
        <label
          htmlFor="opacity-range"
          className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Fill Opacity
        </label>
        <input
          id="opacity-range"
          type="range"
          value={fillOpacity}
          onChange={(e) => setFillOpacity(parseInt(e.target.value))}
          className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        ></input>
      </div>

      <div className="relative max-w-max flex flex-row">
        <Image
          src="/Map_1/Background.png"
          alt="background"
          width={WIDTH}
          height={HEIGHT}
          priority
        />
        {regions.map((region, index) => {
          const labelSrc = "/Map_1/Labels/" + region + ".png";
          const labelOutlinedSrc = "/Map_1/LabelsOuterGlow/" + region + ".png";
          const regionOutlineSrc = "/Map_1/RegionsOutline/" + region + ".png";
          const regionFillSrc = "/Map_1/Regions/" + region + ".png";
          return (
            <div key={region}>
              {/* Region label image */}
              {showLabels && !showLabelOutlines && (
                <Image
                  className="absolute top-0 left-0"
                  src={labelSrc}
                  alt={region + " label"}
                  width={WIDTH}
                  height={HEIGHT}
                />
              )}
              {showLabels && showLabelOutlines && (
                <Image
                  className="absolute top-0 left-0"
                  src={labelOutlinedSrc}
                  alt={region + " label"}
                  width={WIDTH}
                  height={HEIGHT}
                />
              )}
              {/* Region outline image */}
              {fillOpacity !== 100 && (
                <Image
                  className="absolute top-0 left-0"
                  src={regionOutlineSrc}
                  alt={region + " region"}
                  width={WIDTH}
                  height={HEIGHT}
                />
              )}
              {/* Region fill image */}
              {fillOpacity !== 0 && (
                <div style={{ opacity: fillOpacity / 100 }}>
                  <Image
                    className="absolute top-0 left-0"
                    src={regionFillSrc}
                    alt={region + " region"}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
