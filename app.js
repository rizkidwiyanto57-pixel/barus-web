const API_URL =
"https://script.google.com/macros/s/AKfycbyTTv4-Wh--1U3szdDZKjl2IOTuMW52b-BDRVFQ7NJPXe5tc4NcAbSdXnTD7wGBHIeA/exec?action=dashboard";

async function loadDashboard() {

  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    // KPI

    document.getElementById("openCase").textContent =
      data.kpi.belumProgress +
      data.kpi.doneEmail;

    document.getElementById("belumProgress").textContent =
      data.kpi.belumProgress;

    document.getElementById("doneEmail").textContent =
      data.kpi.doneEmail;

    document.getElementById("approveCase").textContent =
      data.kpi.approveCase;

    document.getElementById("clearCase").textContent =
      data.kpi.clearCase;

    // Last Update

    document.getElementById("lastUpdate")
      .textContent =
      "Last Update : " +
      new Date(data.generatedAt)
      .toLocaleString("id-ID");

    // Charts

    createBrandChart(data.brand);

    createStatusChart(data.status);

    createDepartmentChart(data.department);

    createAgingChart(data.aging);

    // Table

    createTop20Table(data.top20);

  }

  catch(error) {

    console.error(error);

    document.getElementById("lastUpdate")
      .textContent =
      "⚠️ Gagal terhubung ke API";

  }

}

function createBrandChart(brandData) {

  const top10 =
    brandData.slice(0, 10);

  new Chart(

    document.getElementById("brandChart"),

    {

      type: "bar",

      data: {

        labels:
          top10.map(x => x.label),

        datasets: [

          {

            label: "Case",

            data:
              top10.map(x => x.value)

          }

        ]

      }

    }

  );

}

function createStatusChart(statusData) {

  new Chart(

    document.getElementById("statusChart"),

    {

      type: "pie",

      data: {

        labels:
          statusData.map(x => x.label),

        datasets: [

          {

            data:
              statusData.map(x => x.value)

          }

        ]

      }

    }

  );

}

function createDepartmentChart(departmentData) {

  new Chart(

    document.getElementById("departmentChart"),

    {

      type: "bar",

      data: {

        labels:
          departmentData.map(x => x.label),

        datasets: [

          {

            label: "Case",

            data:
              departmentData.map(x => x.value)

          }

        ]

      },

      options: {

        indexAxis: "y"

      }

    }

  );

}

function createAgingChart(agingData) {

  new Chart(

    document.getElementById("agingChart"),

    {

      type: "bar",

      data: {

        labels:
          agingData.map(x => x.label),

        datasets: [

          {

            label: "Case",

            data:
              agingData.map(x => x.value)

          }

        ]

      }

    }

  );

}

function createTop20Table(top20) {

  const tbody =
    document.querySelector("#oldestTable tbody");

  tbody.innerHTML = "";

  top20.forEach(row => {

    const tr =
      document.createElement("tr");

    row.forEach(cell => {

      const td =
        document.createElement("td");

      td.textContent = cell;

      tr.appendChild(td);

    });

    tbody.appendChild(tr);

  });

}

loadDashboard();

setInterval(() => {

  location.reload();

}, 60000);