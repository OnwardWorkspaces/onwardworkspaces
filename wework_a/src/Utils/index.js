export const projectName = "Onward Workspace";
export const themeColor = "#603813";
// export const API_URL = "http://192.168.29.185:8082/"
// export const API_URL = "http://192.168.1.50:8082/";
// export const API_URL = "http://192.168.218.231:8082/";
export const API_URL = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:8083/`
  : "http://localhost:8083/";

export const dummySeo = `<title>Onward Workspace</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta property="og:type" content="website">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:url" content="">
<meta property="og:image" content="">
<meta name="robots" content="index, follow">
<link rel="canonical" href="">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`;