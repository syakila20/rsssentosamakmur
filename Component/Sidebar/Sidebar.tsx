// "use client";
// import { useState } from "react";
// import SvgChevronLeft from "@/Icon/Chevron";
// import SidebarItem from "./SidebarItem";
// import { useMediaQuery } from "@/lib/useMediaQuery";
// import { ICON_MAP } from "@/Icon/IcoMap";
// import { ISidebarMenu, SIDEBAR_MENU } from "@/Component/Sidebar/menu";

// const Sidebar = () => {
//   const isMobile = useMediaQuery()?.isMobile;
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   return (
//     <>
//       {/* Overlay */}
//       {isMobile && mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//           sticky md:static z-50 h-screen bg-white/20 shadow-2xl text-sky-800
//           transition-all duration-300
//           ${
//             isMobile
//               ? mobileOpen
//                 ? "left-0 w-64"
//                 : "-left-full w-64"
//               : collapsed
//                 ? "w-16"
//                 : "w-64"
//           }
//         `}
//       >
//         <div className="h-14 flex items-center justify-between px-4 border-slate-800">
//           {!collapsed && <span className="font-bold">MyApp</span>}

//           {!isMobile && (
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden md:block"
//             >
//               <SvgChevronLeft
//                 height="27px"
//                 className={`transition-transform cursor-pointer ${
//                   collapsed ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//           )}

//           {/* {isMobile && <button onClick={() => setMobileOpen(false)}>✕</button>} */}
//         </div>

//         <nav className="px-2 py-1 ">
//           {SIDEBAR_MENU.map((menu: ISidebarMenu) => (
//             <SidebarItem
//               key={menu.label}
//               label={menu.label || ""}
//               path={menu.path}
//               icon={ICON_MAP[menu.icon]}
//               collapsed={!isMobile && collapsed}
//               childrenItems={menu.children}
//             />
//           ))}
//         </nav>
//       </aside>

//       {/* Burger */}
//       {isMobile && (
//         <button
//           onClick={() => setMobileOpen(true)}
//           className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white p-3 rounded-full"
//         >
//           ☰
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;

"use client";

import { SIDEBAR_MENU } from "./menu";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "./SidebarContext";
import SvgArrow from "@/Icon/Arrow";
import SvgMenu from "@/Icon/Menu";

export default function Sidebar() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="
          fixed top-4 left-4 md:hidden
          z-50 p-2 rounded-lg
          bg-[#F8F8F8] shadow
        "
      >
        <SvgMenu />
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0
          z-50 h-screen bg-white/40 border-r
          transition-all duration-300

          ${collapsed ? "w-20" : "w-64"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          {!collapsed && (
            <span className="font-bold text-slate-700">MyApp</span>
          )}
        </div>

        {/* MENU */}
        <nav className="p-2 space-y-1">
          {SIDEBAR_MENU.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
}
