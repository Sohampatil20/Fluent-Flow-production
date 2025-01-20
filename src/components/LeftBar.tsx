import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";

// SVG Components
const LeftBarMoreMenuSvg = (props: ComponentProps<"svg">) => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
    <circle
      cx="23"
      cy="23"
      r="19"
      fill="#CE82FF"
      stroke="#CE82FF"
      strokeWidth="2"
    />
    <circle cx="15" cy="23" r="2" fill="white" />
    <circle cx="23" cy="23" r="2" fill="white" />
    <circle cx="31" cy="23" r="2" fill="white" />
  </svg>
);

const TranslatorIconSvg = (props: ComponentProps<"svg">) => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
    <circle
      cx="23"
      cy="23"
      r="19"
      fill="#58CC02"
      stroke="#58CC02"
      strokeWidth="2"
    />
    <text x="23" y="27" textAnchor="middle" fontSize="10" fill="white">
      T
    </text>
  </svg>
);

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const logOut = useBoundStore((x) => x.logOut);
  const [moreMenuShown, setMoreMenuShown] = useState(false);
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");
  const [sidebarVisible] = useState(false); // Visibility toggle

  const bottomBarItems = useBottomBarItems();

  const updatedBottomBarItems = [
    ...bottomBarItems.slice(0, 1),
    {
      name: "Translator",
      href: "https://translator-soham-2024.web.app",
      icon: <TranslatorIconSvg />,
    },
    ...bottomBarItems.slice(1),
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-0 hidden flex-col gap-5 border-r-2 border-[#e5e5e5] bg-white p-3 md:flex lg:w-64 lg:p-5">
  <Link
    href="/learn"
    className="mb-5 ml-5 mt-5 hidden text-3xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-lg lg:block"
  >
    Fluent Flow
  </Link>
      <nav
        className={[
          "fixed bottom-0 left-0 top-0 z-20 flex-col gap-5 border-r-2 bg-gradient-to-b from-[#58cc02] to-[#84d8ff] p-3 text-white transition-transform duration-300",
          sidebarVisible ? "translate-x-0" : "-translate-x-full",
          "lg:flex lg:translate-x-0 lg:w-64 lg:p-5",
        ].join(" ")}
      >
        <button
           className="mb-5 ml-5 mt-5 hidden text-3xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white text-shadow-lg lg:block"
         
        >
          Fluent Flow
        </button>
        <ul className="flex flex-col items-stretch gap-3">
          {updatedBottomBarItems.map((item) => (
            <li key={item.href} className="flex flex-1">
              {item.name === selectedTab ? (
                <Link
                  href={item.href}
                  className="flex grow items-center gap-3 rounded-xl border-2 border-white bg-white px-2 py-1 text-sm font-bold uppercase text-[#58cc02]"
                >
                  {item.icon}{" "}
                  <span className="sr-only lg:not-sr-only">{item.name}</span>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="flex grow items-center gap-3 rounded-xl px-2 py-1 text-sm font-bold uppercase text-white hover:bg-white hover:text-[#58cc02]"
                >
                  {item.icon}{" "}
                  <span className="sr-only lg:not-sr-only">{item.name}</span>
                </Link>
              )}
            </li>
          ))}

          <div
            className="relative flex grow cursor-default items-center gap-3 rounded-xl px-2 py-1 font-bold uppercase hover:bg-white hover:text-[#58cc02]"
            onClick={() => setMoreMenuShown((x) => !x)}
            onMouseEnter={() => setMoreMenuShown(true)}
            onMouseLeave={() => setMoreMenuShown(false)}
            role="button"
            tabIndex={0}
          >
            <LeftBarMoreMenuSvg />{" "}
            <span className="hidden text-sm lg:inline">More</span>
            <div
              className={[
                "absolute left-full top-[-10px] min-w-[300px] rounded-2xl border-2 border-gray-300 bg-white text-left text-gray-400",
                moreMenuShown ? "" : "hidden",
              ].join(" ")}
            >
              <div className="flex flex-col py-2">{/* Other content */}</div>
              <div className="flex flex-col border-t-2 border-gray-300 py-2">
                
                <Link
                  className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                  href="/settings/account"
                >
                  Settings
                </Link>
                <Link href="https://fluent-flow-production.vercel.app/" passHref>
                  <button
                    className="px-5 py-2 text-left uppercase hover:bg-gray-100"
                    onClick={logOut}
                  >
                    Sign out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </ul>
      </nav>

      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </nav>
  </>
  );
};
