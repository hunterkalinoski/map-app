"use client";

import MapImages from "@/components/MapImages";
import { useState } from "react";

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
  "Lower Mississippi River Basin",
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

export default function Home() {
  const [regions, setRegions] = useState<string[]>([]);

  const checkboxChanged = (region: string, e: any) => {
    // replaces spaces with hyphens (' ' -> '-') and slashes to underscores ('/' -> '_')
    const convertedRegion = region.replace(/\s+/g, "-").replace(/\//g, "_");

    // if unchecking the checkbox, remove region from array
    let newRegions;
    if (!e.target.checked) {
      newRegions = [...regions];
      const regionIndex = newRegions.indexOf(convertedRegion);
      // if region was found, remove it (will most of the time be found)
      if (regionIndex > -1) {
        newRegions.splice(regionIndex, 1);
      }
      setRegions(newRegions);
    }
    // else, add region to array
    else {
      newRegions = [...regions, convertedRegion];
      setRegions(newRegions);
    }
  };

  return (
    <main>
      <div className="flex flex-row">
        <MapImages regions={regions} />
        {/* 1440 x 723 */}
        <div className="max-h-[723px] overflow-y-scroll">
          <ul className="ml-4">
            {REGIONS.map((region, i) => {
              return (
                <li key={region}>
                  <input type="checkbox" onChange={(e) => checkboxChanged(region, e)} />
                  {" " + region}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
