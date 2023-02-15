import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center pt-20 mb-8 mx-8">
      <h1 className="text-3xl">Select a Map</h1>

      <ul className="gap-8 grid md:grid-cols-2">
        <Link
          href="/maps/map-1"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 flex flex-grow"
        >
          <li className="flex flex-col items-center gap-2">
            <h2 className="text-center">Map Test 1 (North American Geography)</h2>
            <div className="bg-white rounded-lg flex items-center flex-grow">
              <Image
                className="rounded-lg"
                src="/Map_1/Background.png"
                alt="Map 1 background"
                width={400}
                height={200}
                unoptimized
              />
            </div>
          </li>
        </Link>
        <Link
          href="/maps/map-2"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 flex flex-grow"
        >
          <li className="flex flex-col items-center gap-2">
            <h2 className="text-center">Map Test 2 (Native American Places + Water)</h2>
            <div className="bg-white rounded-lg flex items-center flex-grow">
              <Image
                className="rounded-lg"
                src="/Map_2/Background.png"
                alt="Map 2 background"
                width={400}
                height={200}
                unoptimized
              />
            </div>
          </li>
        </Link>
        <Link
          href="/maps/map-3"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 flex flex-grow"
        >
          <li className="flex flex-col items-center gap-2">
            <h2 className="text-center">Map Test 3 (North American Cities)</h2>
            <div className="bg-white rounded-lg flex items-center flex-grow">
              <Image
                className="rounded-lg"
                src="/Map_3/Background.png"
                alt="Map 3 background"
                width={400}
                height={200}
                unoptimized
              />
            </div>
          </li>
        </Link>
        <Link
          href="/maps/states"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 flex flex-grow"
        >
          <li className="flex flex-col items-center gap-2">
            <h2 className="text-center">US States Map</h2>
            <div className="bg-white rounded-lg flex items-center flex-grow">
              <Image
                className="rounded-lg"
                src="/States_map/Background.png"
                alt="States Map background"
                width={400}
                height={200}
                unoptimized
              />
            </div>
          </li>
        </Link>
        <Link
          href="/maps/canada"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 flex flex-grow"
        >
          <li className="flex flex-col items-center gap-2">
            <h2 className="text-center">Canadian Territories and Provinces Map</h2>
            <div className="bg-white rounded-lg flex items-center flex-grow">
              <Image
                className="rounded-lg"
                src="/Canada_map/Background.png"
                alt="Canada map background"
                width={400}
                height={200}
                unoptimized
              />
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
