import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center pt-20 mb-8 mx-8">
      <h1 className="text-3xl">Select a Map</h1>

      <ul className="gap-8 grid grid-rows-2 md:grid-cols-2">
        <Link href="/maps/map-1">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Map Test 1 (North American Geography)</h2>
            <div className="bg-white flex items-center h-[200px] md:h-[300px] rounded-lg">
              <Image src="/Map_1/Background.png" alt="Map 1 background" width={400} height={200} />
            </div>
          </li>
        </Link>
        <Link href="/maps/map-2">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Map Test 2 (Native American Places + Water)</h2>
            <div className="bg-white flex items-center h-[200px] md:h-[300px] rounded-lg">
              <Image src="/Map_2/Background.png" alt="Map 2 background" width={400} height={200} />
            </div>
          </li>
        </Link>
        <Link href="/maps/map-3">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Map Test 3 (North American Cities)</h2>
            <div className="bg-white flex items-center h-[200px] md:h-[300px] rounded-lg">
              <Image src="/Map_3/Background.png" alt="Map 3 background" width={400} height={200} />
            </div>
          </li>
        </Link>
        <Link href="/maps/states">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>US States Map</h2>
            <div className="bg-white flex items-center h-[200px] md:h-[300px] rounded-lg">
              <Image
                src="/States_map/Background.png"
                alt="States Map background"
                width={400}
                height={200}
              />
            </div>
          </li>
        </Link>
        <Link href="/maps/canada">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Canadian Territories and Provinces Map</h2>
            <div className="bg-white flex items-center h-[200px] md:h-[300px] rounded-lg">
              <Image
                src="/Canada_map/Background.png"
                alt="Canada map background"
                width={400}
                height={200}
              />
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
