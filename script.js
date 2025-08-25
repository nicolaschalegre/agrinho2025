
const token = "BrpkvYsCXZxnUXqa7zDn1dWrEfGMQrHs";
const url = "https://blynk.cloud/external/api/get";

async function fetchData() {
  const endpoints = {
    temp: "v1",
    umidade: "v2",
    nivel: "v3",
    solo: "v4"
  };

  for (let key in endpoints) {
    try {
      const res = await fetch(`${url}?token=${token}&${endpoints[key]}`);
      const data = await res.text();
      document.getElementById(key).innerText = key === "temp" ? `${data} °C` : `${data} %`;
    } catch (e) {
      document.getElementById(key).innerText = "--";
    }
  }
}

fetchData();
setInterval(fetchData, 5000);
