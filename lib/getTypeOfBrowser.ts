// ===== Type definitions =====
interface UAInfo {
  browser: string;
  version: string;
  os: string;
}

// ===== Helper =====
function getVersion(ua: string, key: string): string {
  const match = ua.match(new RegExp(`${key}/([\\d\\.]+)`, "i"));
  return match ? match[1] : "";
}

// ===== Main parser =====
function parseUserAgent(ua: string): UAInfo {
  ua = ua.toLowerCase(); // case-insensitive

  const result: UAInfo = { browser: "Unknown", version: "", os: "Unknown" };

  // ===== DETECT OS =====
  if (ua.includes("windows nt 10.0")) result.os = "Windows 10";
  else if (ua.includes("windows nt 11.0")) result.os = "Windows 11";
  else if (ua.includes("mac os x")) result.os = "MacOS";
  else if (ua.includes("android")) result.os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) result.os = "iOS";
  else if (ua.includes("linux")) result.os = "Linux";

  // ===== DETECT BROWSER =====
  if (ua.includes("edg/")) {
    result.browser = "Edge";
    result.version = getVersion(ua, "edg");
  } else if (ua.includes("opr/")) {
    result.browser = "Opera";
    result.version = getVersion(ua, "opr");
  } else if (ua.includes("chrome/")) {
    result.browser = "Chrome";
    result.version = getVersion(ua, "chrome");
  } else if (ua.includes("firefox/")) {
    result.browser = "Firefox";
    result.version = getVersion(ua, "firefox");
  } else if (ua.includes("safari/")) {
    result.browser = "Safari";
    result.version = getVersion(ua, "version");
  }

  return result;
}
