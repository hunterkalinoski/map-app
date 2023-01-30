import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center pt-8">
      <h1 className="text-3xl">Select a Map</h1>

      <ul className="gap-8 grid grid-rows-2 grid-cols-2">
        <Link href="/maps/map-1">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Map Test 1 (North American Geography)</h2>
            <Image src="/Map_1/Background.png" alt="Map 1 background" width={400} height={250} />
          </li>
        </Link>
        <Link href="/maps/test-2">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Map Test 2 (Native American Places)</h2>
            <Image src="/Map_1/Background.png" alt="Map 1 background" width={400} height={250} />
          </li>
        </Link>
        <Link href="/maps/states">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>US States Map</h2>
            <Image src="/Map_1/Background.png" alt="Map 1 background" width={400} height={250} />
          </li>
        </Link>
        <Link href="/maps/canada">
          <li className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700">
            <h2>Canadian Territories and Provinces Map</h2>
            <Image src="/Map_1/Background.png" alt="Map 1 background" width={400} height={250} />
          </li>
        </Link>
      </ul>
    </div>
  );
}
